/**
 * generate-llms.mjs — single source of truth for the site's crawler text files.
 *
 * Reads the content data modules (src/data/hubs.js, src/data/articles.js) and
 * emits, into public/:
 *   - llms.txt        curated markdown index (the llmstxt.org convention)
 *   - llms-full.txt   full editorial corpus as clean markdown
 *   - sitemap.xml     every real route, with today's lastmod
 *
 * Why esbuild: `frontend` is a CommonJS CRA package, but the data files use ESM
 * `export const`. esbuild bundles each module to ESM in-memory; we write it to a
 * temp .mjs and import it. The data files have zero imports, so this is safe.
 *
 * Run manually: `yarn generate:seo`. NOT wired into `build` so a failure here can
 * never block a deploy. Commit the generated output.
 */

import { build } from "esbuild";
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
      case "divider":
        md += `---\n\n`;
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

// ── build the three files ──────────────────────────────────────────────────
async function main() {
  const hubsMod = await loadData("hubs.js");
  const articlesMod = await loadData("articles.js");
  const hubs = hubsMod.default || [];
  const articles = articlesMod.ARTICLES || [];

  // ---- llms.txt (curated index) ----
  let index = `# Golf in Mexico°\n\n> ${SITE_SUMMARY}\n\n`;
  index += `## Destinations\n\n`;
  for (const h of hubs) {
    const desc = truncate(h.seoDescription || h.heroAnswer);
    index += `- [${clean(h.name)} golf guide](${BASE}/destinations/${h.slug}): ${desc}\n`;
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
  ];
  const hubRoutes = hubs.map((h) => ({
    loc: `/destinations/${h.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  }));
  const articleRoutes = articles.map((a) => ({
    loc: `/journal/${a.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));
  const urls = [...staticRoutes, ...hubRoutes, ...articleRoutes];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${BASE}${u.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  fs.writeFileSync(path.join(PUBLIC, "llms.txt"), index.trim() + "\n");
  fs.writeFileSync(path.join(PUBLIC, "llms-full.txt"), full.trim() + "\n");
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);

  const words = full.split(/\s+/).filter(Boolean).length;
  console.log(`✓ llms.txt        (${hubs.length} destinations, ${articles.length} articles)`);
  console.log(`✓ llms-full.txt   (~${words.toLocaleString()} words)`);
  console.log(`✓ sitemap.xml     (${urls.length} URLs, lastmod ${TODAY})`);
}

main().catch((err) => {
  console.error("generate-llms failed:", err);
  process.exit(1);
});
