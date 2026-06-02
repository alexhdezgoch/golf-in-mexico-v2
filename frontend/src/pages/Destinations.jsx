import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ─────────────── DATA ─────────────── */

export const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    courses: "12+ Championship Courses",
    tagline: "The Championship Corridor.",
    description:
      "The absolute best golf in Latin America. Massive desert dunes meeting the Sea of Cortez—a landscape that comes with a premium price tag, but is worth every single penny.",
    greenFees: "$250 – $450",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/los-cabos",
    blackbook: "/blackbook/los-cabos.pdf",
    blackbookLabel: "Download the 2026 Cabo Travel Brief",
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    courses: "7+ Championship Courses",
    tagline: "Soft Luxury & Restricted Enclaves.",
    description:
      "Where the Sierra Madre jungle meets the Pacific. Five-star hospitality, exclusive gated communities, and some of the best oceanfront holes on the coast.",
    greenFees: "$280 – $420",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wmultbm_DJI_0048.jpeg",
    live: true,
    href: "/destinations/punta-mita",
    blackbook: "/blackbook/punta-mita.pdf",
    blackbookLabel: "Download the 2026 Nayarit Travel Brief",
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    region: "Valle de Mexico",
    courses: "8+ Historic Clubs",
    tagline: "Heritage & Altitude.",
    description:
      "Historic, private clubs at 7,350 feet. The ball flies 10% further here, and the golf culture goes back decades before the beach resorts even existed. You just need the right connection to play.",
    greenFees: "Members & guests",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/g6r7fp45_GOLFINMEXICO-062.jpg",
    live: true,
    href: "/destinations/mexico-city",
    blackbook: "/blackbook/mexico-city.pdf",
    blackbookLabel: "Download the 2026 Mexico City Travel Brief",
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    courses: "6+ Courses",
    tagline: "Jungle Topography & Elevation.",
    description:
      "Where the mountains drop into Banderas Bay. Fun, technical courses carved through the tropical jungle, offering some of the best elevation changes you'll ever play.",
    greenFees: "$180 – $320",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/gyf4bofm_D104455E-21A3-4A8E-8A51-72FDB3B5B227_1_105_c.jpeg",
    live: true,
    href: "/destinations/puerto-vallarta",
    blackbook: "/blackbook/puerto-vallarta.pdf",
    blackbookLabel: "Download the 2026 PV Travel Brief",
  },
  {
    slug: "cancun-riviera-maya",
    name: "Cancun · Riviera Maya",
    region: "Quintana Roo",
    courses: "10+ Resort Courses",
    tagline: "Limestone Fairways & Caribbean Trade Winds.",
    description:
      "Courses carved straight through the Yucatán mangroves. This region has the largest concentration of resort golf in the country, right next to the Caribbean Sea.",
    greenFees: "$220 – $380",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/xg8drvr6_IMG_3947.jpeg",
    live: true,
    href: "/destinations/cancun-riviera-maya",
    blackbook: "/blackbook/cancun-riviera-maya.pdf",
    blackbookLabel: "Download the 2026 Riviera Maya Travel Brief",
  },
  {
    slug: "unique-destinations",
    name: "Unique Destinations",
    region: "Across Mexico",
    courses: "8+ Hidden Routings",
    tagline: "The Uncharted Routings.",
    description:
      "Real info on the country's lesser-known courses. From colonial towns to quiet Pacific bays. Perfect if you've already played the major spots and want something different for your next trip.",
    greenFees: "Varies by region",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/dhz92vfa_GOLFINMEXICO-001%202.jpg",
    live: true,
    href: "/destinations/unique-destinations",
    blackbook: "/blackbook/unique-destinations.pdf",
    blackbookLabel: "Download the 2026 Hidden Routings Travel Brief",
  },
];

/* ─────────────── HEADER ─────────────── */

const DestinationsHeader = () => (
  <section
    data-testid="destinations-header"
    className="bg-[var(--c-green-deep)] text-white pt-40 md:pt-48 pb-20 md:pb-24"
  >
    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-normal text-white leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem] max-w-[16ch]"
      >
        Where to go<span className="text-[var(--c-gold)]">.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 md:mt-10 font-body font-light text-white/65 text-base md:text-lg leading-[1.7] max-w-xl"
      >
        Curated destination guides and fact-based intelligence for Mexico&apos;s
        premier golf regions.
      </motion.p>
    </div>
  </section>
);

/* ─────────────── DESTINATION CARD ─────────────── */

const DestinationCard = ({ d, index }) => {
  const onDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: wire to real PDF / lead-capture form
    window.open(d.blackbook, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        delay: 0.08 * (index % 3),
        ease: [0.16, 1, 0.3, 1],
      }}
      data-testid={`region-card-${d.slug}`}
      className="relative w-full overflow-hidden bg-[var(--c-green-deep)] min-h-[680px] sm:min-h-[640px] md:min-h-0 md:h-[640px]"
    >
      {/* Background image */}
      <Link
        to={d.href}
        data-testid={`region-link-${d.slug}`}
        className="absolute inset-0 group"
        aria-label={`Explore ${d.name}`}
      >
        <img
          src={d.image}
          alt={d.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        {/* Stronger contrast — base flat + heavy bottom gradient + corner vignette */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--c-green-deep)] via-[var(--c-green-deep)]/85 to-transparent" />
      </Link>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-12 lg:p-16 pointer-events-none">
        <div className="max-w-[1100px] w-full mx-auto pointer-events-none">
          {/* Top meta */}
          <div className="mb-4 md:mb-5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em]">
            <span className="text-[var(--c-gold)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{d.region}</span>
          </div>

          {/* Name */}
          <h2 className="font-display font-normal text-white leading-[1.02] tracking-tight text-4xl md:text-6xl lg:text-[4.5rem] max-w-[14ch] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
            {d.name}
          </h2>

          {/* Tagline */}
          <p className="mt-3 md:mt-4 font-display italic font-normal text-[var(--c-gold)] text-lg md:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            {d.tagline}
          </p>

          {/* Description */}
          <p className="mt-6 md:mt-7 font-body font-light text-white/90 text-sm md:text-[15px] leading-[1.7] max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            {d.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 md:mt-10 pt-6 md:pt-7 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto">
              <Link
                to={d.href}
                data-testid={`region-cta-explore-${d.slug}`}
                className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-[var(--c-green-deep)] px-6 md:px-8 py-3 md:py-[14px] rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] transition-colors duration-500"
              >
                Explore
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>

              <button
                type="button"
                onClick={onDownload}
                data-testid={`region-cta-blackbook-${d.slug}`}
                className="group inline-flex items-center justify-center gap-2 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-5 md:px-7 py-3 md:py-[14px] rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] font-bold transition-colors duration-300 whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              >
                <span>[ {d.blackbookLabel} ]</span>
              </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────── PAGE ─────────────── */

const Destinations = () => {
  return (
    <main data-testid="page-destinations" className="relative bg-[var(--c-off-white)]">
      <DestinationsHeader />

      <section
        id="regions"
        data-testid="regions-section"
        className="bg-[var(--c-green-deep)]"
      >
        <div className="flex flex-col gap-px bg-white/8">
          {REGIONS.map((d, i) => (
            <DestinationCard key={d.slug} d={d} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Destinations;
