/**
 * Vercel Routing Middleware — real 404s and Markdown negotiation.
 *
 * Why this exists: Vercel's Create React App preset rewrites every unknown path
 * to /index.html, so /anything answered 200 with the homepage (a soft 404).
 * The preset is re-detected from the react-scripts dependency, so it can't be
 * switched off in vercel.json; this middleware answers before it does.
 *
 *   unknown page path            → HTTP 404 (public/404.html, or Markdown)
 *   /  with Accept: text/markdown → the homepage as Markdown (public/index.md)
 *   everything else              → passes through untouched
 *
 * The list of real pages is this deployment's own /sitemap.xml. The prerenderer
 * reads the same file and fails the build if any route in it can't be rendered,
 * so "in the sitemap" and "has a page" are the same set. A page that should
 * exist but 404s is missing from scripts/generate-llms.mjs.
 *
 * Fails open: if the sitemap can't be read, nothing is blocked.
 *
 * No dependencies on purpose: `x-middleware-next` is the header Vercel's own
 * next() helper sets, and adding a package would mean touching yarn.lock.
 */

export const config = {
  // Page-like paths only: skip build assets, Vercel internals (/_vercel/…),
  // and anything with a file extension.
  matcher: ["/((?!static/|_|.*\\.[\\w]+$).*)"],
};

const SITE = "https://golf-in-mexico.com";
const MARKDOWN = "text/markdown; charset=utf-8";
// Marks the middleware's own subrequests so they are never intercepted.
const INTERNAL_HEADER = "x-gim-internal";

export const NOT_FOUND_MARKDOWN = `# 404 — Page not found

This page does not exist on Golf in Mexico°. It may have moved or the URL may be mistyped.

- Site index for agents: ${SITE}/llms.txt
- Full content: ${SITE}/llms-full.txt
- Every page: ${SITE}/sitemap.xml
- Homepage: ${SITE}/
`;

const NOT_FOUND_HTML_FALLBACK = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page not found | Golf in Mexico°</title></head><body><h1>Page not found</h1><p><a href="/">Back to the homepage</a></p></body></html>`;

// q-value a client gave a media type in its Accept header (0 if absent).
const quality = (accept, type) => {
  for (const part of String(accept || "").split(",")) {
    const [name, ...params] = part.trim().split(";");
    if (name.trim().toLowerCase() !== type) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const value = q ? parseFloat(q.slice(2)) : 1;
    return Number.isNaN(value) ? 1 : value;
  }
  return 0;
};

// True when the client asks for Markdown and doesn't rank HTML above it.
// Browsers never list text/markdown, so they always get HTML.
export const wantsMarkdown = (accept) => {
  const md = quality(accept, "text/markdown");
  return md > 0 && md >= quality(accept, "text/html");
};

// Compare paths the way the app's router does: case-insensitive, no trailing slash.
export const normalizePath = (pathname) => {
  let p = String(pathname || "/");
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep the raw path */
  }
  p = p.toLowerCase().replace(/\/+$/, "");
  return p === "" ? "/" : p;
};

export const parseSitemap = (xml) =>
  new Set(
    [...String(xml || "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try {
        return normalizePath(new URL(m[1].trim()).pathname);
      } catch {
        return normalizePath(m[1].trim());
      }
    }),
  );

// A deployment's static files never change, so each is read once per instance.
let routesPromise;
let notFoundHtmlPromise;

const internalFetch = (path, base) =>
  fetch(new URL(path, base), { headers: { [INTERNAL_HEADER]: "1" } });

const loadRoutes = (base) => {
  if (!routesPromise) {
    routesPromise = internalFetch("/sitemap.xml", base)
      .then((res) => (res.ok ? res.text() : ""))
      .then((xml) => {
        const routes = parseSitemap(xml);
        // An empty or homepage-less list means the sitemap is broken: don't trust it.
        if (!routes.has("/")) throw new Error("sitemap unusable");
        return routes;
      })
      .catch(() => {
        routesPromise = undefined; // retry on the next request
        return null;
      });
  }
  return routesPromise;
};

const loadNotFoundHtml = (base) => {
  if (!notFoundHtmlPromise) {
    notFoundHtmlPromise = internalFetch("/404.html", base)
      .then((res) => (res.ok ? res.text() : NOT_FOUND_HTML_FALLBACK))
      .catch(() => {
        notFoundHtmlPromise = undefined;
        return NOT_FOUND_HTML_FALLBACK;
      });
  }
  return notFoundHtmlPromise;
};

const next = () => new Response(null, { headers: { "x-middleware-next": "1" } });

const respond = (body, status, type) =>
  new Response(body, {
    status,
    headers: {
      "content-type": type,
      vary: "Accept",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });

export default async function middleware(request) {
  if (request.headers.get(INTERNAL_HEADER)) return next();
  if (!["GET", "HEAD"].includes(request.method)) return next();

  const url = new URL(request.url);
  const markdown = wantsMarkdown(request.headers.get("accept"));

  try {
    const routes = await loadRoutes(url);
    if (routes && !routes.has(normalizePath(url.pathname))) {
      return markdown
        ? respond(NOT_FOUND_MARKDOWN, 404, MARKDOWN)
        : respond(await loadNotFoundHtml(url), 404, "text/html; charset=utf-8");
    }

    if (markdown && url.pathname === "/") {
      const res = await internalFetch("/index.md", url);
      if (res.ok) return respond(await res.text(), 200, MARKDOWN);
    }
  } catch {
    // Never let this layer break a request — fall back to the normal response.
  }
  return next();
}
