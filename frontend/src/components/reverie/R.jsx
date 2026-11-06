import { useEffect, useRef, useState } from "react";
import { CONCIERGE_CALL_URL, START_PLANNING_URL } from "@/data/siteNav";

/* The Reverie system, shared by every redesigned page: measurements taken from reveriesafaris.com at 1440px
   (40px margins, 425px text column beside a 900×600 picture, 414×561 cards 30px apart), titles in Inter 800 caps,
   deep green button, the brand's G° as monogram, and the Masters-style board for golf data. */

export const Concierge = ({ id, className = "r-btn" }) => (
  <a href={START_PLANNING_URL} data-track="landing_explore" data-track-id={`start-planning-${id}`} className={className}>
    Book with Golf Concierge
  </a>
);

export const Monogram = () => (
  <span aria-hidden="true" className="inline-flex w-[58px] h-[58px] rounded-full border border-current items-center justify-center font-extrabold text-[20px] leading-none">
    G<span className="text-[var(--g-gold)] text-[14px] -mt-2">°</span>
  </span>
);

/* Full-screen opening picture (Reverie's destination and home openings). */
export const PhotoHero = ({ image, alt = "", testid = "hero-section", credit, children }) => (
  <section data-testid={testid} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[var(--r-green)]">
    <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    {credit && <span className="absolute left-3 bottom-3 z-[1] text-[11px] text-white/85 bg-black/30 px-1.5 py-0.5">Photo: {credit}</span>}
    {children}
  </section>
);

/* Centred title block with up to three facts (Reverie's itinerary heading: Length · Destinations · Best time). */
export const TitleBlock = ({ eyebrow, title, facts = [], children, h = "h1" }) => {
  const H = h;
  return (
    <section className="px-6 pt-[140px] md:pt-[160px] pb-[60px] md:pb-[80px]">
      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center gap-5">
        {eyebrow && <span className="r-eyebrow text-[var(--r-ink-soft)]">{eyebrow}</span>}
        <H className="r-title text-[30px] md:text-[42px] text-[var(--r-green)]">{title}</H>
        {children}
        {facts.length > 0 && (
          <dl className="mt-8 grid gap-8 sm:grid-cols-3 w-full max-w-[760px]">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-2">
                <dt className="r-eyebrow text-[var(--r-ink-soft)]">{k}</dt>
                <dd className="r-body text-[15px] text-[var(--r-green)]">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

export const SectionIntro = ({ title, children, link, as = "h2" }) => {
  const H = as;
  return (
    <div className="max-w-[866px] mx-auto px-6 flex flex-col items-center text-center gap-5">
      <H className="r-title text-[26px] md:text-[34px] text-[var(--r-green)]">{title}</H>
      {children && <div className="r-body text-[14px] max-w-[600px]">{children}</div>}
      {link}
    </div>
  );
};

/* Row of cards with a thin progress line underneath (Reverie's journeys and destinations). */
export const CardRail = ({ label, children }) => {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const on = () => setP(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    on();
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);
  return (
    <div>
      <div ref={ref} data-lenis-prevent-horizontal role="list" aria-label={label} className="flex gap-[30px] overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 md:px-[80px] scroll-px-5 md:scroll-px-[80px]">
        {children}
      </div>
      <div aria-hidden="true" className="mx-auto mt-14 w-[180px] h-[2px] bg-[rgba(30,57,43,0.15)]">
        <div className="h-full bg-[var(--r-green)]" style={{ width: "36%", transform: `translateX(${p * (100 / 0.36 - 100)}%)` }} />
      </div>
    </div>
  );
};

export const Card = ({ href, image, eyebrow, title, text, cta, credit, titleAs: T = "h3" }) => (
  <a role="listitem" href={href || undefined} className="group snap-start shrink-0 w-[78vw] sm:w-[44vw] lg:w-[414px] flex flex-col">
    <div className="relative aspect-[414/561] overflow-hidden bg-[var(--r-cream-2)]">
      {image && <img src={image} alt={typeof title === "string" ? title : ""} loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />}
      {credit && <span className="absolute left-2 bottom-2 text-[11px] text-white/85 bg-black/30 px-1.5 py-0.5">Photo: {credit}</span>}
    </div>
    {eyebrow && <span className="r-eyebrow text-[var(--r-ink-soft)] mt-6">{eyebrow}</span>}
    <T className={`r-title text-[19px] text-[var(--r-green)] ${eyebrow ? "mt-3" : "mt-6"}`}>{title}</T>
    {text && <span className="r-body text-[14px] mt-3 line-clamp-6">{text}</span>}
    {cta && <span className="r-link self-start text-[var(--r-green)] mt-5">{cta}</span>}
  </a>
);

/* Text beside a 900×600 picture. With `flip` the picture comes first. */
export const Split = ({ id, image, alt, flip, credit, position, children }) => {
  const text = <div className="md:w-[425px] md:shrink-0 flex flex-col gap-5">{children}</div>;
  const pic = (
    <figure className="md:w-[62.5%]">
      <img src={image} alt={alt} loading="lazy" className="w-full aspect-[3/2] object-cover" style={position ? { objectPosition: position } : undefined} />
      {credit && <figcaption className="mt-2 text-[11px] text-[var(--r-ink-soft)]">Photo: {credit}</figcaption>}
    </figure>
  );
  return (
    <section data-testid={id} className="px-5 md:px-10 py-16 md:py-[100px]">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        {flip ? pic : text}
        {flip ? text : pic}
      </div>
    </section>
  );
};

export const FullBleed = ({ image }) => (
  <div aria-hidden="true" className="h-[62vh] md:h-[100vh] max-h-[961px] overflow-hidden">
    <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
  </div>
);

export const GreenBand = ({ id, children }) => (
  <section data-testid={id} className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 py-[90px] md:py-[110px]">
    <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">{children}</div>
  </section>
);

export const SoftenedCall = ({ id, image, title, children, titleAs: T = "h2" }) => (
  <section data-testid={id} className="relative overflow-hidden text-[var(--r-cream)]">
    <img src={image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-110 blur-[14px]" />
    <div aria-hidden="true" className="absolute inset-0 bg-[rgba(20,24,18,0.38)]" />
    <div className="relative max-w-[560px] mx-auto px-6 py-28 md:py-[150px] flex flex-col items-center text-center gap-6">
      <Monogram />
      <T className="r-title text-[26px] md:text-[34px]">{title}</T>
      {children}
    </div>
  </section>
);

/* The Masters board: white board, green capitals, names on plates, figures in slots. */
export const Board = ({ caption, head, rows, wide }) => (
  <div className="px-5 md:px-10">
    <div className={`mx-auto overflow-x-auto ${wide ? "max-w-[1240px]" : "max-w-[1100px]"}`}>
      <table className="w-full min-w-[760px] border-collapse bg-white text-[var(--r-green)] border-[10px] border-[#e8e4d6]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h + i} scope="col" className={`px-3 py-3 r-title text-[12px] tracking-[0.06em] border border-[#ddd8c8] ${i === 0 ? "text-left" : "text-center"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="odd:bg-white even:bg-[#faf8f1]">
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" className="px-3 py-2.5 text-left border border-[#ddd8c8]">
                    <span className="r-title text-[13px]">{c}</span>
                  </th>
                ) : (
                  <td key={ci} className="px-3 py-2.5 text-center text-[13px] font-semibold tabular-nums border border-[#ddd8c8]">{c}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const Sources = ({ items, note }) => (
  <section className="px-5 md:px-10 pb-16">
    <div className="max-w-[1100px] mx-auto border-t border-[rgba(30,57,43,0.15)] pt-8 flex flex-col gap-3">
      <span className="r-eyebrow text-[var(--r-ink-soft)]">Sources</span>
      {note && <p className="r-body text-[13px]">{note}</p>}
      <ul className="flex flex-col gap-1.5">
        {items.map(([label, href]) => (
          <li key={href} className="r-body text-[13px]">
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
