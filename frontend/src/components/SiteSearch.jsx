import { useEffect, useMemo, useRef, useState } from "react";
import siteCourses from "@/data/siteCourses.json";
import { ARTICLES } from "@/data/articles";
import { DESTINATIONS, TRIP_LINKS } from "@/data/siteNav";

/* Ferrari-style search: a light overlay with quick links by section and one featured story until the visitor types;
   then it searches guides, courses, articles and the main pages on the client. Every result is a plain link because
   course pages are served by the trip builder app (full page load). */

const normalize = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const buildIndex = () => [
  ...DESTINATIONS.map((d) => ({ kind: "Guide", title: d.label, meta: d.region, href: d.to })),
  ...siteCourses.courses.map((c) => ({ kind: "Course", title: c.name, meta: [c.place, c.architect].filter(Boolean).join(" · "), href: c.href })),
  ...ARTICLES.map((a) => ({ kind: "Journal", title: a.title, meta: a.subtitle || "", href: `/journal/${a.slug}` })),
  ...TRIP_LINKS.map((e) => ({ kind: "Trip", title: e.title, meta: e.label, href: e.to })),
  { kind: "Page", title: "Plan my trip", meta: "Trip builder", href: "/trip-builder" },
  { kind: "Page", title: "All courses", meta: "Every course we plan", href: "/courses" },
  { kind: "Page", title: "About", meta: "Pablo De La Mora and José Islas", href: "/about" },
  { kind: "Page", title: "Contact", meta: "Talk to us", href: "/contact" },
];

// Ferrari-style quick links shown before typing: one column per part of the site.
const QUICK = [
  { title: "Destinations", links: DESTINATIONS.map((d) => ({ label: d.label, href: d.to })) },
  {
    title: "Courses",
    links: ["el-camaleon-mayakoba", "solmar-golf-links", "palmilla-golf-club", "puerto-los-cabos-golf-club", "tpc-danzante-bay", "quivira-golf-club"]
      .map((slug) => siteCourses.courses.find((c) => c.slug === slug))
      .filter(Boolean)
      .map((c) => ({ label: c.name, href: c.href }))
      .concat([{ label: "All courses", href: "/courses" }]),
  },
  { title: "Plan", links: [{ label: "Curated Trips", href: "/trips" }, { label: "Plan my trip", href: "/trip-builder" }] },
];

const SiteSearch = ({ open, onClose, initialQuery = "" }) => {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    if (!open) return undefined;
    setQ(initialQuery);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, initialQuery]);

  const results = useMemo(() => {
    const n = normalize(q.trim());
    if (n.length < 2) return [];
    const words = n.split(/\s+/);
    return index
      .filter((r) => {
        const hay = normalize(`${r.title} ${r.meta} ${r.kind}`);
        return words.every((w) => hay.includes(w));
      })
      .slice(0, 12);
  }, [q, index]);

  if (!open) return null;

  const featured = ARTICLES[0];
  const showQuick = q.trim().length < 2;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      data-testid="site-search"
      data-lenis-prevent
      className="fixed inset-0 z-[200] bg-[var(--g-paper)] text-[var(--g-ink)] overflow-y-auto"
    >
      <div className="max-w-[1040px] mx-auto px-6 md:px-12 pt-8 pb-20 flex flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          data-testid="site-search-close"
          className="w-10 h-10 rounded-full border border-[var(--g-ink)]/25 flex items-center justify-center hover:bg-[var(--g-ink)] hover:text-[var(--g-paper)] transition-colors"
        >
          ✕
        </button>
        <div className="mt-10 w-full flex items-center gap-3 border border-[var(--g-ink)]/20 bg-white px-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <label htmlFor="site-search-input" className="sr-only">Search guides, courses and articles</label>
          <input
            id="site-search-input"
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a destination, course or article"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none py-4 text-base placeholder:text-[var(--g-ink)]/40"
          />
        </div>

        {showQuick ? (
          <>
            <div className="mt-12 w-full grid gap-10 sm:grid-cols-3">
              {QUICK.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <span className="g-title text-sm">{col.title}</span>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <a href={l.href} className="g-label text-[11px] text-[var(--g-ink)]/75 hover:text-[var(--g-ink)]">{l.label} ›</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {featured && (
              <a href={`/journal/${featured.slug}`} className="group mt-14 w-full grid gap-8 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:items-center">
                <div className="aspect-[16/9] overflow-hidden bg-[var(--g-chalk)]">
                  <img src={featured.heroImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="g-label text-[var(--g-fairway)]">Journal</span>
                  <span className="g-title text-xl">{featured.title}</span>
                  <span className="text-[15px] text-[var(--g-ink)]/70">{featured.subtitle}</span>
                  <span className="g-round mt-2">Read<span className="g-dot">›</span></span>
                </div>
              </a>
            )}
          </>
        ) : (
          <ul className="mt-10 w-full flex flex-col" data-testid="site-search-results">
            {results.map((r) => (
              <li key={`${r.kind}-${r.href}-${r.title}`} className="border-b border-[var(--g-ink)]/10">
                <a href={r.href} className="group grid grid-cols-[100px_minmax(0,1fr)] gap-4 py-4 items-baseline">
                  <span className="g-label text-[var(--g-fairway)]">{r.kind}</span>
                  <span className="min-w-0">
                    <span className="block text-lg group-hover:text-[var(--g-fairway)] transition-colors">{r.title}</span>
                    {r.meta && <span className="block text-sm text-[var(--g-ink)]/55 truncate">{r.meta}</span>}
                  </span>
                </a>
              </li>
            ))}
            {results.length === 0 && (
              <li className="py-6 text-[var(--g-ink)]/60">No results for “{q.trim()}”. Try a destination like Los Cabos or a course name.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SiteSearch;
