/**
 * generate-llms.mjs — single source of truth for the site's crawler text files.
 *
 * Reads the content data modules (src/data/hubs.js, src/data/articles.js) and
 * emits, into public/:
 *   - llms.txt        curated markdown index (the llmstxt.org convention)
 *   - llms-full.txt   full editorial corpus as clean markdown
 *   - sitemap.xml     every real route, lastmod from git per content file
 *
 * Why esbuild: `frontend` is a CommonJS CRA package, but the data files use ESM
 * `export const`. esbuild bundles each module to ESM in-memory; we write it to a
 * temp .mjs and import it. The data files have zero imports, so this is safe.
 *
 * Runs as the first step of `yarn build`, because it used to be manual-only and
 * the committed output silently drifted from the content for weeks — llms-full.txt
 * kept serving retired "download the guide" copy that the site no longer showed.
 * The original reason for keeping it out of `build` still stands, though: a failure
 * here must never block a deploy. So the build step is `|| true` — if this script
 * dies, the deploy proceeds with the committed files (the old behavior) and the
 * build log carries the error. Also run it directly with `yarn generate:seo`, and
 * commit the output so the files are correct even on a build that skipped it.
 */

import { build } from "esbuild";
import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "src", "data");
const PUBLIC = path.join(ROOT, "public");
const BASE = "https://golf-in-mexico.com";
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ---- sitemap lastmod ------------------------------------------------------
// lastmod must be the date the PAGE's content actually changed, never the build
// date. Stamping today on all 15 URLs every deploy tells Google 15 pages changed
// when none did, and Google openly discounts lastmod it finds unreliable — so a
// wrong date is worse than no date. We take it from git, per content file.
//
// This repo is a shallow clone (and Vercel's is shallower), so `git log` can
// collapse every file onto the deploy commit's date. That's the same lie in a
// different hat, so we detect it and omit lastmod instead. Omitted lastmod is
// well-defined: crawlers fall back to their own change detection.
//
// Two independent guards, because a shallow clone lies in two ways:
//   1. CLONE FLOOR (below). History stops at a boundary commit, so every file
//      whose last real change predates the boundary reports the BOUNDARY's date
//      instead of its own. Vercel's clone floored 8 URLs at 2026-07-14 when they
//      had really last changed 06-29/07-03 — dates plausible enough that nothing
//      downstream noticed. Any file sitting exactly on the floor is therefore
//      unknowable, and we omit its lastmod.
//   2. TOTAL COLLAPSE (further down). Every file lands on one date, or on none.
const gitDate = (relPath) => {
  // A route with no ROUTE_SOURCE entry lands here as undefined. Bail rather than
  // hand undefined to execFileSync, so adding a route without mapping it costs
  // that route its lastmod instead of throwing mid-build.
  if (!relPath) return null;
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", relPath], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim() || null;
  } catch {
    return null; // no git, no history for the path, or a detached build env
  }
};

// The clone floor: the date(s) of the commits where this clone's history is cut
// off, but ONLY when the repository is shallow. In a full clone the oldest commit
// is a real boundary of the project's own history, not of the clone, so a file
// legitimately dated there is telling the truth and must be left alone — hence
// the is-shallow gate.
//
// The floor is the BOUNDARY commit's date, not the oldest date in the clone. In a
// shallow clone the grafts are exactly the parentless commits, so ask git for
// those (plural: a merge inside the clone window can leave several). Taking the
// minimum date instead inverts the guard whenever dates aren't monotonic — the
// ordinary "branch merged a week after its commits were written" shape: with
// commits 01-11, 02-12, 03-13 plus a tip backdated to 01-01, a --depth 2 clone
// floors at the 03-13 boundary, yet the minimum is 01-01. That would null the one
// date that was TRUE and publish the two that were FALSE.
const cloneFloorDates = () => {
  const git = (args) => {
    try {
      return execFileSync("git", args, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    } catch {
      return null;
    }
  };
  if (git(["rev-parse", "--is-shallow-repository"]) !== "true") return null;
  const dates = (git(["log", "--max-parents=0", "--format=%cs", "HEAD"]) || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return dates.length ? new Set(dates) : null;
};

// Route content sources. A hub page's words live in hubs.js, not in the shared
// template that renders them, so that's the file whose date matters.
const ROUTE_SOURCE = {
  "/": "src/pages/Home.jsx",
  "/destinations": "src/pages/Destinations.jsx",
  "/journal": "src/pages/Journal.jsx",
  "/experience": "src/pages/Experience.jsx",
  "/trip-builder": "src/pages/TripBuilder.jsx",
  "/about": "src/pages/About.jsx",
  "/contact": "src/pages/Contact.jsx",
  // Both legal routes render from one bilingual content module, so they share
  // its date — the policy text is what changes, not the component.
  "/privacy": "src/data/privacy.js",
  "/aviso-de-privacidad": "src/data/privacy.js",
};
const HUB_SOURCE = "src/data/hubs.js";
const ARTICLE_SOURCE = "src/data/articles.js";
const LANDING_SOURCE = "src/data/landings.js";

// Load an ESM data module by bundling it to a temp file and importing it.
async function loadData(file) {
  const result = await build({
    entryPoints: [path.join(DATA, file)],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });
  const tmp = path.join(
    os.tmpdir(),
    `gimdata-${file.replace(/\W/g, "_")}-${process.pid}.mjs`,
  );
  fs.writeFileSync(tmp, result.outputFiles[0].text);
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

// ── static page copy that isn't in the data files ──────────────────────────
const SITE_SUMMARY =
  "Golf in Mexico° is the only editorial guide to golf in Mexico written by people who play it, plan it, and live it — sports agent Pablo De La Mora and professional golfer José Islas. Course intelligence, real green fees, costs, logistics, seasons, and bespoke trip planning across Los Cabos, Punta Mita, Mexico City, the Riviera Maya, Puerto Vallarta and beyond.";

const ABOUT = {
  hero: "Golf in Mexico° comes from Pablo De La Mora and José Islas — a sports agent and a professional golfer who together hold the relationships, the access, and the editorial voice that turn a Mexico golf trip into something different from what a tourism board can offer.",
  pillars: [
    {
      title: "Precision — in every itinerary.",
      body: "Our standards were forged on professional tours. From the first tee time to the final ride home, every course, hotel, and transfer is vetted, sequenced, and confirmed in writing — the same rigor expected by the world's best players, applied to your trip.",
    },
    {
      title: "Destination Intelligence — over a decade in the field.",
      body: "Over a decade spent scouting Mexico's most exclusive regions. We rely on genuine, boots-on-the-ground relationships to bypass the tourist noise and unlock the country's true hidden gems.",
    },
    {
      title: "Relationships That Open Doors — insider access, built over decades.",
      body: "Real access is relational, not transactional. Years of direct work with caddies, course directors, head pros, and resort operators means our clients get tee times, suites, and introductions that are not on any public booking platform. That network is the trip.",
    },
  ],
  founders: [
    {
      name: "Pablo De La Mora — The Agent (Sports Agent, 5+ years)",
      body: "Over the past 5 years my career has taken me inside the player-only areas of the PGA Tour, LIV Golf, and WTA events. Listen to almost any post-round interview and players say the same thing: the people driving Mexican hospitality are world-class. Add 50+ world-class designer golf courses, each shaped by its region's landscape, and no other country offers this exact blend. That is why I founded Golf in Mexico — to give you the experience I've enjoyed for 5 years: no generic itineraries, no opaque pricing, just honest opinions, genuine hidden gems, professional delivery, and the keys to bespoke experiences you won't find online.",
    },
    {
      name: "José Islas — The Player (professional golfer)",
      body: "The game found me at four. It took me through junior ranks, amateur fields, and professional tours across twenty countries. After all that global exposure, the journey taught me one thing with certainty: in Mexico the game is played differently — the only place that felt like arriving somewhere real. For a true golfer, our country is not just a stop on the itinerary. It is the destination itself. I'm here to show you exactly why.",
    },
  ],
};

const HOME_STATEMENT =
  "We uncover the best golf in Mexico. The only guide to Mexican golf written by people who've played it, planned it, and lived it — from elite courses to the experiences that make the trip worth taking.";

const CONTACT =
  "Talk golf with us. Reach the team by email for trip planning, press, or partnerships, or book a call to plan a trip directly. Plan a trip via the Trip Builder at /trip-builder.";

// ── markdown helpers ───────────────────────────────────────────────────────
const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const para = (s) => clean(s) + "\n\n";
// Truncate to <= n chars on a word boundary, with an ellipsis when cut.
const truncate = (s, n = 170) => {
  const c = clean(s);
  if (c.length <= n) return c;
  return c.slice(0, c.lastIndexOf(" ", n)).trim() + "…";
};

function renderHubFull(h) {
  const url = `${BASE}/destinations/${h.slug}`;
  let md = `## ${clean(h.name)} — ${clean(h.region)}\n\n`;
  md += `**URL:** ${url}\n\n`;
  if (h.seoDescription) md += para(h.seoDescription);
  if (h.heroAnswer) md += para(h.heroAnswer);

  if (Array.isArray(h.quickFacts) && h.quickFacts.length) {
    md += `### Quick facts\n\n`;
    for (const f of h.quickFacts) md += `- **${clean(f.label)}:** ${clean(f.value)}\n`;
    md += `\n`;
  }

  if (Array.isArray(h.overviewParagraphs) && h.overviewParagraphs.length) {
    md += `### Overview\n\n`;
    for (const p of h.overviewParagraphs) md += para(p);
  }

  if (Array.isArray(h.courses) && h.courses.length) {
    md += `### Courses\n\n`;
    if (h.coursesIntro) md += para(h.coursesIntro);
    for (const c of h.courses) {
      const meta = [c.specs, c.fee && `Green fee: ${c.fee}`, c.difficulty && `Difficulty ${c.difficulty}`, c.bestFor && `Best for: ${c.bestFor}`]
        .filter(Boolean)
        .map(clean)
        .join(" · ");
      md += `**${clean(c.name)}**` + (meta ? ` — ${meta}` : "") + `\n\n`;
      if (c.note) md += para(c.note);
      if (c.standout) md += para(`Standout: ${c.standout}`);
    }
  }

  if (Array.isArray(h.costs) && h.costs.length) {
    md += `### Costs\n\n`;
    if (h.costsIntro) md += para(h.costsIntro);
    for (const row of h.costs) {
      // row = [label, low, high, note]
      const [label, low, high, note] = row;
      md += `- ${clean(label)}: ${clean(low)}–${clean(high)}${note ? ` (${clean(note)})` : ""}\n`;
    }
    md += `\n`;
  }

  if (Array.isArray(h.callouts) && h.callouts.length) {
    md += `### Local knowledge\n\n`;
    for (const c of h.callouts) md += para(`${clean(c.label)}: ${c.body}`);
  }

  if (Array.isArray(h.logistics) && h.logistics.length) {
    md += `### Logistics\n\n`;
    for (const l of h.logistics) md += para(`${clean(l.title)}: ${l.body}`);
  }

  if (Array.isArray(h.seasonBlocks) && h.seasonBlocks.length) {
    md += `### When to play\n\n`;
    for (const s of h.seasonBlocks) md += para(`${clean(s.title)} (${clean(s.sub)}): ${s.body}`);
  }

  if (Array.isArray(h.faqs) && h.faqs.length) {
    md += `### FAQ\n\n`;
    for (const f of h.faqs) md += `**${clean(f.q)}**\n\n${para(f.a)}`;
  }

  return md.trim() + "\n";
}

function renderArticleFull(a) {
  const url = `${BASE}/journal/${a.slug}`;
  let md = `## ${clean(a.title)}\n\n`;
  md += `**URL:** ${url}\n\n`;
  const by = [a.author?.name, a.destinationLabel, a.updated, a.readTimeMinutes && `${a.readTimeMinutes} min read`]
    .filter(Boolean)
    .map(clean)
    .join(" · ");
  if (by) md += `*${by}*\n\n`;
  if (a.subtitle) md += para(a.subtitle);

  for (const block of a.body || []) {
    switch (block.type) {
      case "lead":
      case "p":
        md += para(block.text);
        break;
      case "h2":
        md += `### ${clean(block.text)}\n\n`;
        break;
      case "h3":
        md += `#### ${clean(block.text)}\n\n`;
        break;
      case "divider":
        md += `---\n\n`;
        break;
      case "list":
        for (const [idx, item] of (block.items || []).entries()) {
          const marker = block.ordered ? `${idx + 1}.` : "-";
          const line = item.title ? `**${clean(item.title)}** — ${clean(item.text || "")}` : clean(item.text || item);
          md += `${marker} ${line}\n`;
        }
        md += `\n`;
        break;
      case "columns":
        for (const col of block.columns || []) {
          md += `**${clean(col.heading)}:** `;
          md += (col.items || []).map((it) => `${clean(it.title)}${it.note ? ` (${clean(it.note)})` : ""}`).join(" · ");
          md += `\n\n`;
        }
        break;
      case "priceCards":
        for (const item of block.items || []) {
          md += `- **${clean(item.title)}** — ${clean(item.price || "")} ${clean(item.unit || "")}. ${clean(item.note || "")}\n`;
        }
        md += `\n`;
        break;
      case "callout":
        if (block.title) md += `**${clean(block.title)}**\n\n`;
        for (const item of block.items || []) {
          md += `- *${clean(item.term)}* — ${clean(item.def)}\n`;
        }
        md += `\n`;
        if (block.note) md += para(block.note);
        break;
      case "image":
        if (block.caption) md += `*${clean(block.caption)}*\n\n`;
        break;
      case "faq":
        md += `**${clean(block.q)}**\n\n${para(block.a)}`;
        break;
      case "cta":
        if (block.heading) md += para(`${clean(block.heading)} ${clean(block.text || "")}`);
        break;
      default:
        if (block.text) md += para(block.text);
    }
  }
  return md.trim() + "\n";
}

// Landing pages (data/landings.js) are transactional, so their corpus entry is
// the part an answer engine can actually use: the answer-first paragraph, the
// specs, the prose, and the FAQ. The form and the CTA copy are skipped.
function renderLandingFull(l) {
  let md = `## ${clean(l.name)} — ${clean(l.hubName)}\n\n`;
  md += `URL: ${BASE}/destinations/${l.hub}/${l.slug}\n\n`;
  md += para(l.heroAnswer);

  if (l.specs) {
    md += `### Specifications\n\n`;
    const [head, ...rows] = l.specs;
    for (const row of rows) {
      const cells = row
        .slice(1)
        .map((c, i) => `${clean(head[i + 1] || "")}: ${clean(c)}`)
        .join(" · ");
      md += `- ${clean(row[0])} — ${cells}\n`;
    }
    md += `\n`;
    if (l.specsNote) md += para(l.specsNote);
  }

  for (const key of ["contrastParagraphs", "accessParagraphs", "tournamentParagraphs"]) {
    if (l[key]) for (const p of l[key]) md += para(p);
  }
  if (l.calloutBody) md += para(`${clean(l.calloutLabel)}. ${clean(l.calloutBody)}`);
  if (l.included) {
    md += `### What's included\n\n`;
    for (const [t, b] of l.included) md += `- **${clean(t)}** — ${clean(b)}\n`;
    md += `\n`;
  }
  if (l.packages) {
    md += `### Packages\n\n`;
    for (const pkg of l.packages) {
      md += `**${clean(pkg.name)}** — ${clean(pkg.blurb)}\n`;
      md += `Includes: ${pkg.includes.map(clean).join(" · ")}.\n`;
      md += `${clean(pkg.price)}${pkg.priceNote ? ` (${clean(pkg.priceNote)})` : ""}.\n\n`;
    }
  }
  if (l.addOnBody) md += para(l.addOnBody);
  if (l.itinerary) for (const d of l.itinerary) md += para(`${clean(d.day)}. ${clean(d.body)}`);
  if (l.accessBody) md += para(l.accessBody);
  if (l.honestyBody) md += para(l.honestyBody);

  if (l.faqs?.length) {
    md += `### FAQ\n\n`;
    for (const f of l.faqs) md += `**${clean(f.q)}**\n\n${para(f.a)}`;
  }
  return md.trim() + "\n";
}

// ── build the three files ──────────────────────────────────────────────────
async function main() {
  const hubsMod = await loadData("hubs.js");
  const articlesMod = await loadData("articles.js");
  const landingsMod = await loadData("landings.js");
  const hubs = hubsMod.default || [];
  const articles = articlesMod.ARTICLES || [];
  const landings = landingsMod.default || [];

  // ---- llms.txt (curated index) ----
  let index = `# Golf in Mexico°\n\n> ${SITE_SUMMARY}\n\n`;
  index += `## Destinations\n\n`;
  for (const h of hubs) {
    const desc = truncate(h.seoDescription || h.heroAnswer);
    index += `- [${clean(h.name)} golf guide](${BASE}/destinations/${h.slug}): ${desc}\n`;
    for (const l of landings.filter((x) => x.hub === h.slug)) {
      index += `  - [${clean(l.name)}](${BASE}/destinations/${l.hub}/${l.slug}): ${truncate(
        l.seoDescription || l.heroAnswer,
      )}\n`;
    }
  }
  index += `\n## Journal\n\n`;
  for (const a of articles) {
    const desc = truncate(a.metaDescription || a.subtitle);
    index += `- [${clean(a.title)}](${BASE}/journal/${a.slug}): ${desc}\n`;
  }
  index += `\n## About\n\n`;
  index += `- [About Golf in Mexico°](${BASE}/about): The founders, the mission, and the three editorial pillars.\n`;
  index += `- [Experiences](${BASE}/experience): Couples, bachelor, family/friends, and corporate golf trips.\n`;
  index += `- [Plan a trip](${BASE}/trip-builder): Build a custom Mexico golf trip.\n`;
  index += `- [Contact](${BASE}/contact): Reach the team.\n`;
  index += `\n## Legal\n\n`;
  index += `- [Privacy Policy](${BASE}/privacy): What data the site collects, the third parties that receive it (HubSpot, Google Analytics 4, Meta Pixel, Microsoft Clarity, Vercel), retention periods, and how to exercise your privacy rights.\n`;
  index += `- [Aviso de Privacidad](${BASE}/aviso-de-privacidad): Spanish-language version of the privacy policy, written to Mexico's LFPDPPP (derechos ARCO).\n`;
  index += `\n## Full content\n\n`;
  index += `- [llms-full.txt](${BASE}/llms-full.txt): The complete text of every destination guide and article.\n`;

  // ---- llms-full.txt (full corpus) ----
  let full = `# Golf in Mexico° — Full Content\n\n> ${SITE_SUMMARY}\n\n`;
  full += `Source: ${BASE} · Generated ${TODAY}\n\n---\n\n`;

  full += `# About\n\n${para(HOME_STATEMENT)}${para(ABOUT.hero)}`;
  full += `## The three pillars\n\n`;
  for (const p of ABOUT.pillars) full += para(`${p.title} ${p.body}`);
  full += `## The founders\n\n`;
  for (const f of ABOUT.founders) full += `### ${f.name}\n\n${para(f.body)}`;
  full += `## Contact\n\n${para(CONTACT)}---\n\n`;

  full += `# Destination Guides\n\n`;
  for (const h of hubs) full += renderHubFull(h) + "\n---\n\n";

  if (landings.length) {
    full += `# Trip Pages\n\n`;
    for (const l of landings) full += renderLandingFull(l) + "\n---\n\n";
  }

  full += `# Journal\n\n`;
  for (const a of articles) full += renderArticleFull(a) + "\n---\n\n";

  // ---- sitemap.xml ----
  const staticRoutes = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/destinations", priority: "0.8", changefreq: "weekly" },
    { loc: "/journal", priority: "0.8", changefreq: "weekly" },
    { loc: "/experience", priority: "0.7", changefreq: "monthly" },
    { loc: "/trip-builder", priority: "0.7", changefreq: "monthly" },
    { loc: "/about", priority: "0.6", changefreq: "monthly" },
    { loc: "/contact", priority: "0.6", changefreq: "monthly" },
    // Legal. Low priority, but listed so crawlers (and the prerenderer, which
    // reads its route list from this sitemap) both pick them up.
    { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
    { loc: "/aviso-de-privacidad", priority: "0.3", changefreq: "yearly" },
  ].map((r) => ({ ...r, lastmod: gitDate(ROUTE_SOURCE[r.loc]) }));
  const hubLastmod = gitDate(HUB_SOURCE);
  const hubRoutes = hubs.map((h) => ({
    loc: `/destinations/${h.slug}`,
    priority: "0.9",
    changefreq: "monthly",
    lastmod: hubLastmod,
  }));
  const articleLastmod = gitDate(ARTICLE_SOURCE);
  const articleRoutes = articles.map((a) => ({
    loc: `/journal/${a.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: articleLastmod,
  }));
  // Landings are the paid-traffic destinations, so they rank above the hubs.
  const landingLastmod = gitDate(LANDING_SOURCE);
  const landingRoutes = landings.map((l) => ({
    loc: `/destinations/${l.hub}/${l.slug}`,
    priority: "0.9",
    changefreq: "monthly",
    lastmod: landingLastmod,
  }));
  const urls = [...staticRoutes, ...hubRoutes, ...landingRoutes, ...articleRoutes];

  // Guard 1 — clone floor. On a shallow clone, a date equal to a boundary
  // (graft) commit's date means "the history ran out here", not "the page changed
  // here". Omit those; keep the rest, which are still real.
  const floorDates = cloneFloorDates();
  let floorSuppressed = 0;
  if (floorDates) {
    for (const u of urls) {
      if (u.lastmod && floorDates.has(u.lastmod)) {
        u.lastmod = null;
        floorSuppressed += 1;
      }
    }
    if (floorSuppressed) {
      console.log(
        `⚠ shallow clone: history floored at ${[...floorDates].sort().join(", ")} — ` +
          `lastmod OMITTED on ${floorSuppressed} of ${urls.length} URLs ` +
          `(their real dates are not in this clone)`,
      );
    }
  }

  // Guard 2 — collapse check: if git handed back one date for everything (or
  // nothing at all), it isn't telling us when pages changed — it's telling us
  // when this clone was made. Drop lastmod entirely rather than publish that as fact.
  const distinctDates = new Set(urls.map((u) => u.lastmod).filter(Boolean));
  const lastmodTrustworthy = distinctDates.size > 1;
  if (!lastmodTrustworthy) {
    urls.forEach((u) => {
      u.lastmod = null;
    });
  }
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${BASE}${u.loc}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
          `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  fs.writeFileSync(path.join(PUBLIC, "llms.txt"), index.trim() + "\n");
  fs.writeFileSync(path.join(PUBLIC, "llms-full.txt"), full.trim() + "\n");
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);

  const words = full.split(/\s+/).filter(Boolean).length;
  console.log(
    `✓ llms.txt        (${hubs.length} destinations, ${landings.length} trip pages, ${articles.length} articles)`,
  );
  console.log(`✓ llms-full.txt   (~${words.toLocaleString()} words)`);
  console.log(
    `✓ sitemap.xml     (${urls.length} URLs, ` +
      (lastmodTrustworthy
        ? `lastmod from git: ${[...distinctDates].sort().join(", ")})`
        : `lastmod OMITTED — git gave ${distinctDates.size} distinct date(s), not enough to be honest)`),
  );
}

main().catch((err) => {
  console.error("generate-llms failed:", err);
  process.exit(1);
});
