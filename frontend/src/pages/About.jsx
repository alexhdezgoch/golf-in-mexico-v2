import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeamEditorial from "@/components/TeamEditorial";

/* ═══════════════════════════════════════════════════════════════════
   About · /about
   Founder gallery + full editorial bios live on the homepage. This
   page focuses on the brand mission and the three editorial pillars.
   ═══════════════════════════════════════════════════════════════════ */

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

    {/* ── FULL EDITORIAL · The Agent · The Player · The Collaboration ──
        Built directly under the hero so the brand mission lands first,
        then opens straight into the three named bios. ── */}
    <TeamEditorial />

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
