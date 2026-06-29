import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/useSeo";

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
    name: "Couples Golf",
    tagline: "A trip for the two of you or other couple friends.",
    description:
      "A complete itinerary for two or more couple travelers — tee times paired with spa days, intimate restaurants, and the rounds that play just as well at sunset as they do at sunrise.",
    image:
      "/images/yszj15ke-willdwind-william-martret-9c-w8jfuhtw-unsplash.webp",
  },
  {
    slug: "bachelor-trip",
    type: "bachelor",
    name: "Bachelor Trip",
    tagline: "The bucket-list group event.",
    description:
      "Tournament-format itineraries for a group of friends. Members-only courses, private homes, group transport, and off-course experiences.",
    image:
      "/images/fhv2viqt-d14f99ba-7f14-4273-bcd5-ef597df7f5cb-1-105-c.webp",
  },
  {
    slug: "family-friends",
    type: "family",
    name: "Family or Friends",
    tagline: "Golf for the trip everybody enjoys.",
    description:
      "A trip built around the golfer without sacrificing what everyone else came for. Resorts, beach time, kid-friendly logistics, and routings that respect every handicap.",
    image:
      "/images/39q8yutm-lhc-services-richmond-va-gr1v3si-xau-unsplash.webp",
  },
  {
    slug: "corporate-retreat",
    type: "corporate",
    name: "Corporate Retreat",
    tagline: "An offsite that closes deals.",
    description:
      "Tournament logistics for executive groups. Private clubs that open their gates for the day, named contacts at every venue, and a closing dinner that lands the conversation you flew here to have.",
    image:
      "/images/w9mm3zx2-dean-5yxjpt-tcao-unsplash.webp",
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
        className="mt-8 md:mt-10 font-body font-light text-white/75 text-base md:text-lg leading-[1.7] max-w-xl"
      >
        We build four kinds of Mexico golf trips. Pick the one that fits — your
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
    className="relative w-full overflow-hidden bg-[var(--c-green-deep)] min-h-[100svh] sm:min-h-[100svh] md:min-h-0 md:h-[780px] lg:h-[860px]"
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
      {/* Photo covers the full card. Bottom-anchored dark gradient only for text legibility. */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] sm:h-[55%] md:h-[52%] bg-gradient-to-t from-black/85 via-black/55 to-transparent" />
    </Link>

    {/* Content pinned to the bottom on every viewport */}
    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-10 md:p-12 lg:p-16 pointer-events-none">
      <div className="max-w-[1100px] w-full mx-auto pointer-events-none">
        <h2 className="font-display font-normal text-white leading-[1.02] tracking-tight text-4xl md:text-6xl lg:text-[4.5rem] max-w-[14ch] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
          {e.name}
        </h2>

        <p className="mt-4 md:mt-5 font-display italic font-normal text-[var(--c-gold)] text-lg md:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
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

const Experience = () => {
  useSeo({
    title: "Golf Experiences in Mexico — Couples, Bachelor, Family & Corporate",
    description:
      "Choose your trip: couples golf, bachelor tournaments, family or friends, and corporate retreats — bespoke Mexico golf itineraries built around the golfer.",
    canonical: "/experience",
  });
  return (
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
        <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] mb-8">
          Not sure which fits?{" "}
          <em className="italic text-[var(--c-gold)]">Tell us anyway.</em>
        </h2>
        <p className="font-body font-light text-white/80 text-base md:text-lg leading-[1.75] mb-10">
          Start a blank proposal and Pablo will reach out within the first 48 hours to scope the trip with you.
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
};

export default Experience;
