// Writes public/search-index.json: the one search index both apps read (the site search overlay in this site and in the trip
// builder app). Run before the build; it uses only this site's own data files.
import fs from "node:fs";
const root = new URL("../src/data/", import.meta.url);
const courses = JSON.parse(fs.readFileSync(new URL("siteCourses.json", root), "utf8")).courses;
const trips = JSON.parse(fs.readFileSync(new URL("rtrips.json", root), "utf8"));
const { ARTICLES } = await import(new URL("articles.js", root));
const nav = fs.readFileSync(new URL("siteNav.js", root), "utf8");
const DEST = [...nav.matchAll(/\{ label: "([^"]+)", region: "([^"]+)", to: "([^"]+)"/g)].map((m) => ({ kind: "Guide", title: m[1], meta: m[2], href: m[3] }));
const rows = [
  ...DEST,
  ...courses.map((c) => ({ kind: "Course", title: c.name, meta: [c.place, c.architect].filter(Boolean).join(" · "), href: c.href })),
  ...ARTICLES.map((a) => ({ kind: "Journal", title: a.title, meta: a.subtitle || "", href: `/journal/${a.slug}` })),
  ...trips.map((t) => ({ kind: "Trip", title: t.title, meta: `${t.type} · ${t.destination}`, href: `/trips/${t.slug}` })),
  { kind: "Page", title: "Plan my trip", meta: "Trip builder", href: "/trip-builder" },
  { kind: "Page", title: "All courses", meta: "Every course we plan", href: "/courses" },
  { kind: "Page", title: "Curated Trips", meta: "Trips by type", href: "/trips" },
  { kind: "Page", title: "About", meta: "Pablo De La Mora and José Islas", href: "/about" },
  { kind: "Page", title: "Contact", meta: "Talk to us", href: "/contact" },
];
fs.writeFileSync(new URL("../public/search-index.json", import.meta.url), JSON.stringify(rows));
console.log(`search-index.json: ${rows.length} rows`);
