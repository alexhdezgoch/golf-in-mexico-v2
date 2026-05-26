import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   About · /about
   Founder presentation with multi-photo gallery slider per founder.
   Counter "01 / 04" replaces the location badge.
   ═══════════════════════════════════════════════════════════════════ */

const FOUNDERS = [
  {
    slug: "pablo",
    name: "Pablo De La Mora",
    role: "The Agent",
    photos: [
      { src: "/founders/pablo/01.jpg" },
      { src: "/founders/pablo/02.jpg" },
      { src: "/founders/pablo/03.jpg" },
      { src: "/founders/pablo/04.jpg", position: "left center" },
      { src: "/founders/pablo/05.jpg" },
    ],
  },
  {
    slug: "jose",
    name: "José Islas",
    role: "The Pro Player",
    photos: [
      { src: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1531594896955-305789152ddc?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1400&q=85" },
      { src: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1400&q=85" },
    ],
  },
];

const StillSlider = ({ photos, name, testid }) => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === photos.length - 1 ? 0 : i + 1));
  const current = photos[idx];

  return (
    <div data-testid={testid}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[var(--c-green-deep)]">
        <motion.img
          key={idx}
          src={current.src}
          alt={`${name} — photo ${idx + 1} of ${photos.length}`}
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover editorial-img"
          style={{ objectPosition: current.position || "center center" }}
        />

        {/* Counter badge — replaces location */}
        <span
          data-testid={`${testid}-counter`}
          className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/95 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-sm"
        >
          {String(idx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>

        {/* Arrows — only show when more than 1 photo */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              data-testid={`${testid}-prev`}
              className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              data-testid={`${testid}-next`}
              className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {photos.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Go to photo ${i + 1}`}
              data-testid={`${testid}-dot-${i}`}
              className={`h-[2px] transition-all duration-300 ${i === idx ? "w-8 bg-[var(--c-gold)]" : "w-4 bg-[var(--c-border)] hover:bg-[var(--c-text-muted)]"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const About = () => (
  <main data-testid="page-about" className="bg-[var(--c-off-white)]">
    {/* ── HERO ── */}
    <header className="relative bg-[var(--c-off-white)] pt-32 md:pt-40 pb-16 md:pb-24 border-b border-[var(--c-border)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          About Golf in México°
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-[var(--c-text)] text-4xl md:text-6xl lg:text-[5rem] leading-[1.04] tracking-tight max-w-[18ch] mb-8"
        >
          Two Mexican golfers,{" "}
          <em className="italic text-[var(--c-gold)]">one editorial promise.</em>
        </motion.h1>
        <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[680px]">
          Golf in México° is{" "}
          <strong className="font-normal text-[var(--c-text)]">Pablo De La Mora</strong>{" "}
          and{" "}
          <strong className="font-normal text-[var(--c-text)]">José Islas</strong>{" "}
          — a sport agent and a professional golfer who together hold the
          relationships, the access, and the editorial voice that turn a
          México golf trip into something different from what a tourism board
          would build.
        </p>
      </div>
    </header>

    {/* ── FOUNDER GALLERIES ── */}
    <section className="py-20 md:py-32">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {FOUNDERS.map((f, i) => (
          <motion.article
            key={f.slug}
            id={f.slug}
            data-testid={`founder-${f.slug}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            itemScope
            itemType="https://schema.org/Person"
          >
            <StillSlider
              photos={f.photos}
              name={f.name}
              testid={`slider-${f.slug}`}
            />
            <h2
              className="mt-6 font-display font-light text-[var(--c-text)] text-2xl md:text-3xl tracking-tight mb-1"
              itemProp="name"
            >
              {f.name}
            </h2>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-gold)]"
              itemProp="jobTitle"
            >
              {f.role}
            </p>
          </motion.article>
        ))}
      </div>
    </section>

    {/* ── GET IN TOUCH FOOTER ── */}
    <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
      <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          Get in touch
        </span>
        <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8">
          Want to collaborate, share a story,{" "}
          <em className="italic text-[var(--c-gold)]">or just talk golf?</em>
        </h2>
        <p className="font-body font-light text-white/75 text-base md:text-lg leading-[1.75] mb-10">
          We&apos;re always looking for new courses to cover, people to
          interview, and stories worth telling.
        </p>
        <a
          href="mailto:hello@golf-in-mexico.com"
          data-testid="about-contact-cta"
          className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
        >
          Connect with us
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  </main>
);

export default About;
