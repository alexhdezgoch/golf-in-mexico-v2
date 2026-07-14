/**
 * prerender.mjs — build-time static prerender for crawlers (Googlebot AND
 * JS-less AI bots: GPTBot, ClaudeBot, PerplexityBot, …).
 *
 * The site is a React 19 CRA SPA: the raw index.html ships an empty
 * <div id="root"></div>, so a non-JS crawler sees nothing but the JS shell.
 * This script runs the built app in a headless browser for every route in the
 * sitemap and writes the fully-rendered DOM (body content + JSON-LD injected by
 * src/hooks/useSeo.js) to build/<route>/index.html. Vercel serves a filesystem
 * match before the catch-all rewrite, so each prerendered file wins for its URL.
 *
 * Run after `yarn build` (wired as a build step / postbuild). It:
 *   1. serves ./build over http with SPA fallback to index.html,
 *   2. sets window.__PRERENDER__ = true before each navigation so App skips the
 *      Intro overlay and renders routes at their final (visible) state,
 *   3. waits for real body text + a JSON-LD script to be present,
 *   4. writes the captured HTML per route.
 *
 * Browser: bundled Chromium via `puppeteer`. Override with PUPPETEER_EXECUTABLE_PATH
 * (e.g. a system Chrome) when the bundled download is unavailable.
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const HOST = "127.0.0.1";

// Wait/settle knobs.
const NAV_TIMEOUT_MS = 30000;
const CONTENT_TIMEOUT_MS = 15000;
const MIN_ROOT_TEXT = 400; // chars of visible text that must be present
const SETTLE_MS = 350; // small pause after content is ready

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

// ── routes: parse build/sitemap.xml so this stays in sync with generate-llms ──
function readRoutes() {
  const xml = fs.readFileSync(path.join(BUILD, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const routes = locs.map((loc) => {
    try {
      return new URL(loc).pathname;
    } catch {
      return loc;
    }
  });
  // De-dupe, ensure "/" is present, keep deterministic order.
  return [...new Set(routes.length ? routes : ["/"])];
}

// ── tiny static server with SPA fallback ─────────────────────────────────────
function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = path.join(BUILD, urlPath);
    // Prevent path traversal outside BUILD.
    if (!filePath.startsWith(BUILD)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    let stat = fs.existsSync(filePath) && fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
      stat = fs.existsSync(filePath) && fs.statSync(filePath);
    }
    if (!stat || !stat.isFile()) {
      // SPA fallback: unknown route → serve the shell so the client router renders it.
      filePath = path.join(BUILD, "index.html");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, HOST, () => resolve({ server, port: server.address().port }));
  });
}

// Where a route's HTML file lives. "/" → build/index.html.
function outFileFor(route) {
  if (route === "/") return path.join(BUILD, "index.html");
  const clean = route.replace(/^\/+|\/+$/g, "");
  return path.join(BUILD, clean, "index.html");
}

async function launchBrowser() {
  // On Vercel the build image (AL2023) lacks the system shared libs puppeteer's
  // bundled Chromium needs (libnspr4.so etc.), so use @sparticuz/chromium, which
  // ships a self-contained Chromium build. Locally, puppeteer's own Chromium works.
  if (process.env.VERCEL) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: [...chromium.args, "--disable-dev-shm-usage"],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const opts = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    opts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  return puppeteer.launch(opts);
}

async function prerenderRoute(browser, base, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);

  // Flag the app as prerendering BEFORE any of its code runs.
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
    try {
      sessionStorage.setItem("gim-intro-seen", "1");
    } catch (e) {
      /* ignore */
    }
  });

  await page.goto(base + route, { waitUntil: "domcontentloaded" });

  // Wait until React has rendered real text into #root and useSeo has injected JSON-LD.
  await page.waitForFunction(
    (minText) => {
      const root = document.getElementById("root");
      const text = root ? (root.innerText || "").trim() : "";
      const hasLd = !!document.querySelector("script[type='application/ld+json']");
      return text.length >= minText && hasLd;
    },
    { timeout: CONTENT_TIMEOUT_MS },
    MIN_ROOT_TEXT,
  );

  await new Promise((r) => setTimeout(r, SETTLE_MS));

  const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
  await page.close();

  // STAGE the capture — do NOT write yet. Writing build/index.html mid-loop would
  // overwrite the pristine SPA shell that the fallback serves, contaminating every
  // subsequently-captured route (a route without its own useSeo would inherit
  // home's canonical/title/schema). main() flushes all writes after the full loop.
  const outFile = outFileFor(route);
  const ldCount = (html.match(/application\/ld\+json/g) || []).length;
  return { outFile, html, bytes: Buffer.byteLength(html), ldCount };
}

async function main() {
  if (!fs.existsSync(path.join(BUILD, "index.html"))) {
    throw new Error(`No build/index.html — run \`yarn build\` first.`);
  }
  const routes = readRoutes();
  const { server, port } = await startServer();
  const base = `http://${HOST}:${port}`;
  console.log(`prerender: serving ./build at ${base}, ${routes.length} routes`);

  const browser = await launchBrowser();
  let ok = 0;
  const failures = [];
  const staged = [];
  try {
    for (const route of routes) {
      try {
        const { outFile, html, bytes, ldCount } = await prerenderRoute(browser, base, route);
        staged.push({ outFile, html });
        ok += 1;
        console.log(`  ✓ ${route.padEnd(42)} ${bytes.toLocaleString()} bytes · ${ldCount} JSON-LD`);
      } catch (err) {
        failures.push(route);
        console.error(`  ✗ ${route} — ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  // Fail the build LOUDLY before writing anything if any route failed — never
  // ship a partial/contaminated set. The un-prerendered build/index.html shell
  // is left intact (site still works as a plain SPA) and Vercel fails the deploy.
  if (failures.length) {
    console.error(`prerender: FAILED routes: ${failures.join(", ")} — no files written`);
    process.exit(1);
  }
  // All routes captured from the pristine shell — now flush every file to disk.
  for (const { outFile, html } of staged) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
  }
  console.log(`prerender: ${ok}/${routes.length} routes written to build/`);
  process.exit(0);
}

main().catch((err) => {
  console.error("prerender failed:", err);
  process.exit(1);
});
