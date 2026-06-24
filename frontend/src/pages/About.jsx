import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeamEditorial from "@/components/TeamEditorial";

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
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/xzs0k4px_JOSE%20PHOTO1.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/6pjb9z9s_JOSE%20PHOTO%202jpeg.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/55n1fq21_JOSE%20PHOTO3.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/13l2h84i_JOSE%20PHOTO4.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/zva8jb69_JOSE%20PHOTO5.jpeg" },
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
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--c-green-deep)]">
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
          About Golf in Mexico°
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
          Golf in Mexico° comes from{" "}
          <strong className="font-normal text-[var(--c-text)]">Pablo De La Mora</strong>{" "}
          and{" "}
          <strong className="font-normal text-[var(--c-text)]">José Islas</strong>{" "}
          — a sport agent and a professional golfer who together hold the
          relationships, the access, and the editorial voice that turn a
          Mexico golf trip into something different from what a tourism board
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

    {/* ── THREE PILLARS · OUR VALUES ── */}
    <section
      data-testid="about-pillars"
      className="bg-[var(--c-surface)] py-20 md:py-32"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          Three Pillars
        </span>
        <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.05] mb-12 md:mb-16 max-w-[22ch]">
          Our values<span className="text-[var(--c-gold)]">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {[
            {
              n: "/",
              title: "Precision",
              subtitle: "In every itinerary.",
              body:
                "Our standards were forged on professional tours. From the first tee time to the final ride home, every course, hotel, and transfer is vetted, sequenced, and confirmed in writing — the same rigor expected by the world's best players, applied to your trip.",
            },
            {
              n: "//",
              title: "Destination Intelligence",
              subtitle: "Over a decade in the field.",
              body:
                "Over a decade spent scouting Mexico's most exclusive regions. We rely on genuine, boots-on-the-ground relationships to bypass the tourist noise and unlock the country's true hidden gems.",
            },
            {
              n: "///",
              title: "Relationships That Open Doors",
              subtitle: "Insider access, built over decades.",
              body:
                "Real access is relational, not transactional. Years of direct work with caddies, course directors, head pros, and resort operators means our clients get tee times, suites, and introductions that are not on any public booking platform. That network is the trip.",
            },
          ].map((p, i) => (
            <motion.article
              key={p.n}
              data-testid={`pillar-${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[var(--c-gold)]/40 pt-6"
            >
              <div className="font-display font-light text-[var(--c-gold)] text-3xl md:text-4xl mb-5 leading-none">{p.n}</div>
              <h3 className="font-display font-normal text-[var(--c-text)] text-xl md:text-2xl leading-[1.15] mb-2">
                {p.title}
              </h3>
              <p className="font-display italic text-[var(--c-gold)] text-sm md:text-base leading-[1.4] mb-5">
                {p.subtitle}
              </p>
              <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.7]">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* ── FULL EDITORIAL · The Agent, The Player, The Collaboration ── */}
    <TeamEditorial />

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
