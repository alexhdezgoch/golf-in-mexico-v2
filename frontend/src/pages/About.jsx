import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   About · /about
   Minimal EEAT-focused founder presentation: contextual intro + a
   single portrait per founder. No bio walls, no sliders, no quotes —
   the photo is the proof of presence.
   ═══════════════════════════════════════════════════════════════════ */

const FOUNDERS = [
  {
    slug: "pablo",
    name: "Pablo De La Mora",
    role: "The Agent",
    location: "Querétaro, MX",
    portrait:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1400&q=85",
    portraitAlt: "Pablo De La Mora at a Mexican championship course",
  },
  {
    slug: "jose",
    name: "José Islas",
    role: "The Pro Player",
    location: "Los Cabos, MX",
    portrait:
      "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1400&q=85",
    portraitAlt: "José Islas during PGA Tour Latinoamérica qualifying",
  },
];

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

    {/* ── FOUNDER PORTRAITS ── */}
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
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[var(--c-green-deep)] mb-6">
              <img
                src={f.portrait}
                alt={f.portraitAlt}
                itemProp="image"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover editorial-img"
              />
              <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                {String(i + 1).padStart(2, "0")} · {f.location}
              </span>
            </div>
            <h2
              className="font-display font-light text-[var(--c-text)] text-2xl md:text-3xl tracking-tight mb-1"
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

    {/* ── EDITORIAL PROMISE FOOTER ── */}
    <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
      <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          The editorial promise
        </span>
        <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8">
          Written from inside México,{" "}
          <em className="italic text-[var(--c-gold)]">not from a desk.</em>
        </h2>
        <p className="font-body font-light text-white/75 text-base md:text-lg leading-[1.75] mb-10">
          We don&apos;t republish press releases. We don&apos;t accept comp
          rounds in exchange for coverage. If a course makes our roster, one of
          us walked it. If a hotel is in our itinerary, one of us stayed there.
          If a private club opens its gates to your group, the call came from
          our personal cell — not a help desk.
        </p>
        <Link
          to="/trip-builder"
          data-testid="about-trip-cta"
          className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
        >
          Start a Trip Proposal
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  </main>
);

export default About;
