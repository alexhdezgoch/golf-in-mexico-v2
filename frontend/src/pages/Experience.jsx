import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   Experience selector · /experience
   ICP pre-filter that sits between Home/Inquire CTAs and the Trip Builder.
   Same stacked-card pattern as /destinations.
   Each card routes to /trip-builder?type=<id>.
   ═══════════════════════════════════════════════════════════════════ */

const EXPERIENCES = [
  {
    slug: "couples-golf",
    type: "couples",
    label: "Two travelers",
    name: "Couples Golf",
    tagline: "A trip for the two of you.",
    description:
      "A complete itinerary for two travelers — tee times paired with spa days, intimate restaurants, and the rounds that play just as well at sunset as they do at sunrise.",
    image:
      "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85",
  },
  {
    slug: "bachelor-trip",
    type: "bachelor",
    label: "8–14 players",
    name: "Bachelor Trip",
    tagline: "The bucket-list group event.",
    description:
      "Tournament-format itineraries for a group of friends. Members-only courses, private homes, group transport, and a final dinner the loser pays for.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2000&q=85",
  },
  {
    slug: "family-friends",
    type: "family",
    label: "Multi-gen or kids included",
    name: "Family & Friends",
    tagline: "Golf for the trip everybody enjoys.",
    description:
      "A trip built around the golfer without sacrificing what everyone else came for. Resorts, beach time, kid-friendly logistics, and routings that respect every handicap.",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2000&q=85",
  },
  {
    slug: "corporate-retreat",
    type: "corporate",
    label: "12+ players · executive logistics",
    name: "Corporate Retreat",
    tagline: "An offsite that closes deals.",
    description:
      "Tournament logistics for executive groups. Private clubs that open their gates for the day, named contacts at every venue, and a closing dinner that lands the conversation you flew here to have.",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
  },
];

/* ─────────────── HERO ─────────────── */

const ExperienceHero = () => (
  <section
    data-testid="experience-hero"
    className="relative bg-[var(--c-green-deep)] text-white pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden"
  >
    {/* Subtle texture */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    />
    <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-gold)] mb-8 md:mb-10">
        Step 1 of 2 · Who&apos;s coming
      </span>
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-normal text-white leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem] max-w-[18ch]"
      >
        Pick your{" "}
        <em className="italic text-[var(--c-gold)]">experience.</em>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 md:mt-10 font-body font-light text-white/65 text-base md:text-lg leading-[1.7] max-w-xl"
      >
        We build four kinds of México golf trips. Pick the one that fits — your
        next step opens with the right itinerary already shaping up.
      </motion.p>
    </div>
  </section>
);

/* ─────────────── EXPERIENCE CARD ─────────────── */

const ExperienceCard = ({ e, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{
      duration: 0.9,
      delay: 0.08 * (index % 3),
      ease: [0.16, 1, 0.3, 1],
    }}
    data-testid={`experience-card-${e.slug}`}
    className="relative w-full overflow-hidden bg-[var(--c-green-deep)] min-h-[640px] sm:min-h-[600px] md:min-h-0 md:h-[600px]"
  >
    <Link
      to={`/trip-builder?type=${e.type}`}
      data-testid={`experience-link-${e.slug}`}
      className="absolute inset-0 group"
      aria-label={`Build a ${e.name} itinerary`}
    >
      <img
        src={e.image}
        alt={e.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--c-green-deep)] via-[var(--c-green-deep)]/85 to-transparent" />
    </Link>

    <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-12 lg:p-16 pointer-events-none">
      <div className="max-w-[1100px] w-full mx-auto pointer-events-none">
        <div className="mb-4 md:mb-5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em]">
          <span className="text-[var(--c-gold)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {e.label}
          </span>
        </div>

        <h2 className="font-display font-normal text-white leading-[1.02] tracking-tight text-4xl md:text-6xl lg:text-[4.5rem] max-w-[14ch] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
          {e.name}
        </h2>

        <p className="mt-3 md:mt-4 font-display italic font-normal text-[var(--c-gold)] text-lg md:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
          {e.tagline}
        </p>

        <p className="mt-6 md:mt-7 font-body font-light text-white/90 text-sm md:text-[15px] leading-[1.7] max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
          {e.description}
        </p>

        <div className="mt-8 md:mt-10 pt-6 md:pt-7 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto">
          <Link
            to={`/trip-builder?type=${e.type}`}
            data-testid={`experience-cta-${e.slug}`}
            className="group inline-flex items-center justify-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-6 md:px-8 py-3 md:py-[14px] rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
          >
            Start a {e.name} proposal
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  </motion.article>
);

/* ─────────────── PAGE ─────────────── */

const Experience = () => (
  <main data-testid="page-experience" className="relative bg-[var(--c-green-deep)]">
    <ExperienceHero />

    {/* Stacked cards */}
    <section data-testid="experience-grid" className="bg-[var(--c-green-deep)]">
      <div className="flex flex-col">
        {EXPERIENCES.map((e, i) => (
          <ExperienceCard key={e.slug} e={e} index={i} />
        ))}
      </div>
    </section>

    {/* Outro */}
    <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28 border-t border-white/10">
      <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          Not sure which fits?
        </span>
        <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] mb-8">
          Tell us anyway.{" "}
          <em className="italic text-[var(--c-gold)]">We&apos;ll figure it out together.</em>
        </h2>
        <p className="font-body font-light text-white/75 text-base md:text-lg leading-[1.75] mb-10">
          Start a blank proposal and Pablo or José will reach out within the
          first 24 hours to scope the trip with you.
        </p>
        <Link
          to="/trip-builder"
          data-testid="experience-skip-cta"
          className="group inline-flex items-center gap-3 border border-[var(--c-gold)] text-white hover:bg-[var(--c-gold)] hover:text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
        >
          Start a blank proposal
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  </main>
);

export default Experience;
