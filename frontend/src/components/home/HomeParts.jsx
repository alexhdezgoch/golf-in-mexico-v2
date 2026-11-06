import { useEffect, useRef, useState } from "react";
import siteCourses from "@/data/siteCourses.json";

/* Building blocks of the home, each taken from one reference:
   HeroSlider and Carousel from ferrari.com, Board from the Masters leaderboard, the cream card from The Golfer's Journal. */

export const Arrow = ({ dir = "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);

export const RoundLink = ({ href, children, className = "", ...rest }) => (
  <a href={href} className={`g-round ${className}`} {...rest}>
    {children}
    <span className="g-dot"><Arrow /></span>
  </a>
);

const Dots = ({ count, active, onPick, label }) => (
  <div className="flex items-center gap-2" role="group" aria-label={label}>
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onPick(i)}
        aria-label={`Show ${i + 1} of ${count}`}
        aria-pressed={active === i}
        className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-current" : "w-2 bg-current opacity-35 hover:opacity-70"}`}
      />
    ))}
  </div>
);

/* ── Ferrari hero: one slide at a time, label + short caps title + round button, dots underneath ── */
export const HeroSlider = ({ slides }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), slides[i].video ? 9000 : 6500);
    return () => clearTimeout(t);
  }, [i, paused, slides]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [i]);

  return (
    <section
      data-testid="hero-section"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[var(--g-night)] text-[var(--g-chalk)]"
    >
      {slides.map((s, n) => (
        <div
          key={s.title}
          aria-hidden={n !== i}
          className={`absolute inset-0 transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {s.video ? (
            <video ref={n === i ? videoRef : undefined} className="absolute inset-0 w-full h-full object-cover" poster={s.image} autoPlay muted loop playsInline preload="auto">
              <source src={s.video.webm} type="video/webm" />
              <source src={s.video.mp4} type="video/mp4" />
            </video>
          ) : (
            <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(8,21,15,0.8)] via-[rgba(8,21,15,0.15)] to-[rgba(8,21,15,0.35)]" />
          <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-28 px-6 flex flex-col items-center text-center gap-5">
            <span className="text-[13px] font-medium tracking-wide text-chalk/85">{s.label}</span>
            {n === 0 ? (
              <h1 data-testid="hero-wordmark" className="g-title text-[clamp(1.9rem,4.4vw,3.4rem)] max-w-[22ch]">{s.title}</h1>
            ) : (
              <h2 className="g-title text-[clamp(1.9rem,4.4vw,3.4rem)] max-w-[22ch]">{s.title}</h2>
            )}
            {s.sub && <p className="text-[15px] md:text-base font-light text-chalk/80 max-w-[46ch]">{s.sub}</p>}
            <div className="mt-2">{s.cta}</div>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-8 flex justify-center text-[var(--g-chalk)]">
        <Dots count={slides.length} active={i} onPick={setI} label="Hero slides" />
      </div>
    </section>
  );
};

/* ── Ferrari news carousel: text left, photograph right, arrows ── */
export const Carousel = ({ items, eyebrow, id }) => {
  const [i, setI] = useState(0);
  const go = (d) => setI((n) => (n + d + items.length) % items.length);
  const it = items[i];
  return (
    <div data-testid={id} className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
      <div className="flex items-start gap-5 md:gap-8 order-2 md:order-1">
        <button type="button" onClick={() => go(-1)} aria-label="Previous" className="hidden md:inline-flex mt-1 text-[var(--g-ink)] opacity-60 hover:opacity-100"><Arrow dir="left" /></button>
        <div className="flex flex-col gap-5 min-w-0">
          <span className="g-label text-[var(--g-fairway)]">{eyebrow} · {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <h3 className="g-title text-2xl md:text-[2rem] text-[var(--g-ink)]">{it.title}</h3>
          <p className="text-[16px] leading-relaxed text-[var(--g-ink)]/75 max-w-[44ch]">{it.text}</p>
          <div className="flex items-center gap-6 text-[var(--g-ink)]">
            <Dots count={items.length} active={i} onPick={setI} label={`${eyebrow} items`} />
            <button type="button" onClick={() => go(1)} aria-label="Next" className="md:hidden opacity-70"><Arrow /></button>
          </div>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden order-1 md:order-2 bg-[var(--g-chalk)]">
        {items.map((x, n) => (
          <img key={x.image} src={x.image} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`} />
        ))}
        <button type="button" onClick={() => go(1)} aria-label="Next" className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[var(--g-paper)] text-[var(--g-ink)] items-center justify-center hover:bg-white"><Arrow /></button>
      </div>
    </div>
  );
};

/* ── Masters leaderboard: destinations on a hand-operated board. Every figure is from our own course list or NOAA. ── */
const AIRPORTS = {
  "Los Cabos": "SJD",
  "Cancún / Riviera Maya": "CUN",
  "Punta Mita / Nayarit": "PVR",
  "Puerto Vallarta": "PVR",
  "Mexico City": "MEX",
  "San Miguel de Allende": "BJX",
  "Mérida": "MID",
  Costalegre: "PVR",
  Ensenada: "TIJ",
};
const GUIDES = {
  "Los Cabos": "/destinations/los-cabos",
  "Cancún / Riviera Maya": "/destinations/cancun-riviera-maya",
  "Punta Mita / Nayarit": "/destinations/punta-mita",
  "Puerto Vallarta": "/destinations/puerto-vallarta",
  "Mexico City": "/destinations/mexico-city",
};
// NOAA hurricane seasons: eastern Pacific May 15 – Nov 30, Atlantic (Caribbean) Jun 1 – Nov 30. Inland: none.
const BASIN = {
  "Los Cabos": "P", "Punta Mita / Nayarit": "P", "Puerto Vallarta": "P", Costalegre: "P", Ensenada: "P",
  "Cancún / Riviera Maya": "A", "Mérida": "A",
  "Mexico City": "-", "San Miguel de Allende": "-",
};
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const inSeason = (basin, m) => (basin === "P" ? m >= 4 && m <= 10 : basin === "A" ? m >= 5 && m <= 10 : false);

export const Board = () => {
  const ref = useRef(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLive(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rows = Object.keys(AIRPORTS)
    .map((place) => ({ place, courses: siteCourses.courses.filter((c) => c.place === place).length }))
    .filter((r) => r.courses > 0)
    .sort((a, b) => b.courses - a.courses);

  const cell = (content, key, delay) => (
    <span key={key} className={`g-slot ${live ? "g-flip" : ""}`} style={live ? { animationDelay: `${delay}ms` } : undefined}>
      {content}
    </span>
  );

  return (
    <div ref={ref} data-testid="home-board" className="overflow-x-auto">
      <table className="g-board w-full min-w-[860px] border-collapse text-[13px]">
        <caption className="sr-only">Golf destinations in Mexico: courses we plan, airport and hurricane season by month</caption>
        <thead>
          <tr className="text-[var(--g-fairway)]">
            <th scope="col" className="text-left px-4 py-3 g-title text-sm">Destination</th>
            <th scope="col" className="px-3 py-3 g-title text-sm">Courses</th>
            <th scope="col" className="px-3 py-3 g-title text-sm">Fly into</th>
            {MONTHS.map((m, k) => (
              <th key={`${m}${k}`} scope="col" className="px-1 py-3 g-title text-sm w-8">{m}</th>
            ))}
            <th scope="col" className="px-3 py-3 g-title text-sm">Guide</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={r.place}>
              <th scope="row" className="text-left px-4 py-2.5 g-title text-[15px] whitespace-nowrap">{r.place.replace(" / ", " · ")}</th>
              <td className="text-center px-3 text-[var(--g-fairway)] text-base">{cell(r.courses, "c", ri * 90)}</td>
              <td className="text-center px-3 text-base">{cell(AIRPORTS[r.place], "a", ri * 90 + 60)}</td>
              {MONTHS.map((m, k) => {
                const s = inSeason(BASIN[r.place], k);
                return (
                  <td key={k} className={`text-center ${s ? "text-[#b3342a]" : "text-[var(--g-fairway)]"}`}>
                    {cell(s ? "H" : "•", `m${k}`, ri * 90 + 120 + k * 25)}
                  </td>
                );
              })}
              <td className="text-center px-3">
                {GUIDES[r.place] ? (
                  <a href={GUIDES[r.place]} className="g-label text-[10px] text-[var(--g-fairway)] underline underline-offset-4">Open</a>
                ) : (
                  <a href="/destinations/unique-destinations" className="g-label text-[10px] text-[var(--g-fairway)] underline underline-offset-4">Open</a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-[12px] text-chalk/55">
        <span className="text-[#e0705f]">H</span> = hurricane season (NOAA)
      </p>
    </div>
  );
};
