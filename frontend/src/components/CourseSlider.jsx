import { useRef } from "react";
import siteCourses from "@/data/siteCourses.json";

const COURSE_PAGES = siteCourses.courses;

/**
 * The courses of a destination guide as a slider of cards, each linking to its course page (served by the trip
 * builder app, so the link is a full page load). The guide's own note on a course, when it has one, goes on its card.
 */

// The guide's region and the course pages that belong to it.
const REGIONS_OF_HUB = {
  "los-cabos": ["los-cabos"],
  "punta-mita": ["punta-mita"],
  "mexico-city": ["mexico-city"],
  "puerto-vallarta": ["puerto-vallarta"],
  "cancun-riviera-maya": ["cancun-riviera-maya"],
  "unique-destinations": ["san-miguel-de-allende", "merida", "costalegre", "ensenada", "multi-city"],
};

const STOP = new Set(["golf", "club", "course", "country", "the", "at", "de", "links", "beach", "resorts", "resort", "and", "y", "pga", "tour"]);
const words = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(" ")
    .filter((w) => w.length > 2 && !STOP.has(w));
const sameCourse = (a, b) => {
  const wa = words(a);
  const wb = new Set(words(b));
  // Every word of one name in the other: "Cabo Real" must not take Cabo del Sol's note for sharing "Cabo".
  return wa.length > 0 && wb.size > 0 && (wa.every((w) => wb.has(w)) || [...wb].every((w) => wa.includes(w)));
};
const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

const CourseSlider = ({ hubSlug, hubCourses = [] }) => {
  const track = useRef(null);
  const regions = REGIONS_OF_HUB[hubSlug] || [];
  // The region's courses, plus any the guide names that the trip builder files elsewhere (Mexico City's guide covers Valle de Bravo).
  // Each of the guide's courses lends its note to the one page that matches it best.
  const overlap = (a, b) => {
    const wa = new Set(words(a));
    const wb = new Set(words(b));
    return [...wa].filter((w) => wb.has(w)).length / new Set([...wa, ...wb]).size;
  };
  const noteOf = new Map();
  hubCourses.forEach((h) => {
    const best = COURSE_PAGES.filter((c) => sameCourse(c.name, h.name)).sort((x, y) => overlap(y.name, h.name) - overlap(x.name, h.name))[0];
    if (best && !noteOf.has(best.slug)) noteOf.set(best.slug, h.note);
  });
  const cards = COURSE_PAGES.filter((c) => regions.includes(c.region) || noteOf.has(c.slug)).map((c) => ({ ...c, note: noteOf.get(c.slug) }));
  if (!cards.length) return null;
  const by = (dir) => track.current?.scrollBy({ left: dir * Math.min(track.current.clientWidth * 0.85, 640), behavior: "smooth" });

  return (
    <div data-testid="lc-course-slider" className="relative">
      <ul ref={track} className="-mx-6 md:-mx-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:px-12 pb-4 [scrollbar-width:none]" aria-label="Courses">
        {cards.map((c) => (
          <li key={c.slug} className="w-[80%] shrink-0 snap-start sm:w-[22rem]">
            <a href={c.href} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 transition hover:bg-white/[0.1]" data-testid={`lc-course-card-${c.slug}`}>
              <span className="relative block aspect-[4/3] overflow-hidden bg-white/5">
                {c.photo && <img src={c.photo.src} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
                {c.label && <span className="absolute left-3 top-3 bg-[var(--c-gold)] px-2.5 py-1 font-body font-extrabold text-[14px] uppercase tracking-[0.03em] text-[var(--c-green-deep)]">{c.label}</span>}
              </span>
              <span className="block min-h-[1.5rem] px-5 pt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">{c.photo?.credit ? `Photo: ${c.photo.credit}` : ""}</span>
              <span className="flex flex-1 flex-col px-5 pb-5 pt-1">
                <span className="course-name block text-lg uppercase leading-tight tracking-wide text-white">{c.name}</span>
                <span className="mt-1 block font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--c-gold)]/85">{c.architect}</span>
                {c.note && <span className="mt-3 block text-[13px] leading-[1.6] text-white/70 line-clamp-3">{c.note}</span>}
                <span className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="font-mono text-[12px] font-bold text-[var(--c-gold)]">{c.guestsOnly ? "Hotel guests" : c.greenFee != null ? `${usd(c.greenFee)} green fee` : "Fee on request"}</span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/70 group-hover:text-white">View course →</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 hidden justify-end gap-2 md:flex">
        <button type="button" onClick={() => by(-1)} aria-label="Previous courses" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white hover:border-white">←</button>
        <button type="button" onClick={() => by(1)} aria-label="Next courses" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white hover:border-white">→</button>
      </div>
    </div>
  );
};

export default CourseSlider;
