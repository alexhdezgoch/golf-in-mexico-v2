import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ─────────────── DATA ─────────────── */

export const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    courses: "12+ Championship Courses",
    tagline: "Where the Desert Meets the Sea.",
    description:
      "Latin America's undisputed golf capital. Jack Nicklaus, Tiger Woods, and Davis Love III designed courses carved between the Sonoran Desert and the Sea of Cortez.",
    greenFees: "$250 – $450",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/los-cabos",
    blackbook: "/blackbook/los-cabos.pdf",
    blackbookLabel: "Download the 2026 Cabo Blackbook",
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    courses: "7+ Championship Courses",
    tagline: "Where the Jungle Meets the Pacific.",
    description:
      "Two Jack Nicklaus signature courses on a private peninsula, including the only natural island green in the world — the Tail of the Whale at Pacífico.",
    greenFees: "$280 – $420",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/punta-mita",
    blackbook: "/blackbook/punta-mita.pdf",
    blackbookLabel: "Download the 2026 Punta Mita Blackbook",
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    region: "Valle de México",
    courses: "8+ Historic Clubs",
    tagline: "Where Heritage Meets Altitude.",
    description:
      "Historic clubs at 7,350 feet — Chapultepec, Bosques, Club de Golf México. Tradition that pre-dates the modern resort era by half a century.",
    greenFees: "Members & guests",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/mexico-city",
    blackbook: "/blackbook/mexico-city.pdf",
    blackbookLabel: "Download the 2026 CDMX Blackbook",
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    courses: "6+ Courses",
    tagline: "Jungle Fairways, Mountain Greens.",
    description:
      "Greg Norman's Mandarina above the Pacific. Vista Vallarta hosting the WGC. Where the Sierra Madre drops into the sea.",
    greenFees: "$180 – $320",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/puerto-vallarta",
    blackbook: "/blackbook/puerto-vallarta.pdf",
    blackbookLabel: "Download the 2026 PV Blackbook",
  },
  {
    slug: "cancun-riviera-maya",
    name: "Cancún · Riviera Maya",
    region: "Quintana Roo",
    courses: "10+ Resort Courses",
    tagline: "Limestone Fairways, Caribbean Light.",
    description:
      "Greg Norman's El Camaleón at Mayakoba — first PGA Tour stop in México. Twelve resort courses along the world's second-longest reef.",
    greenFees: "$220 – $380",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/cancun-riviera-maya",
    blackbook: "/blackbook/cancun-riviera-maya.pdf",
    blackbookLabel: "Download the 2026 Riviera Maya Blackbook",
  },
  {
    slug: "unique-destinations",
    name: "Unique Destinations",
    region: "Across México",
    courses: "8+ Hidden Routings",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    description:
      "The routings most agents have never seen — colonial Bajío, Pacific Huatulco, Yucatán cenotes. For the golfer who has played the obvious places.",
    greenFees: "Varies by region",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=2000&q=85",
    live: true,
    href: "/destinations/unique-destinations",
    blackbook: "/blackbook/unique-destinations.pdf",
    blackbookLabel: "Download the 2026 Hidden Routings Blackbook",
  },
];

/* ─────────────── HEADER ─────────────── */

const DestinationsHeader = () => (
  <section
    data-testid="destinations-header"
    className="bg-[var(--c-green-deep)] text-white pt-40 md:pt-48 pb-20 md:pb-24"
  >
    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-gold)] mb-8 md:mb-10">
        Where to go
      </span>
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-normal text-white leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem] max-w-[14ch]"
      >
        Destinations<span className="text-[var(--c-gold)]">.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 md:mt-10 font-body font-light text-white/65 text-base md:text-lg leading-[1.7] max-w-xl"
      >
        Curated destination guides and fact-based intelligence for México&apos;s
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
      className="relative w-full overflow-hidden bg-[var(--c-green-deep)] aspect-[16/9] md:aspect-auto md:h-[640px]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-green-deep)]/95 via-[var(--c-green-deep)]/35 to-transparent" />
      </Link>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-12 lg:p-16 pointer-events-none">
        <div className="max-w-[1100px] w-full mx-auto pointer-events-none">
          {/* Top meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)]">
            <span>{d.region}</span>
            <span className="text-white/30">|</span>
            <span className="text-white/85">{d.courses}</span>
          </div>

          {/* Name */}
          <h2 className="font-display font-normal text-white leading-[1.02] tracking-tight text-4xl md:text-6xl lg:text-[4.5rem] max-w-[14ch]">
            {d.name}
          </h2>

          {/* Tagline */}
          <p className="mt-3 md:mt-4 font-display italic font-normal text-[var(--c-gold)] text-lg md:text-2xl">
            {d.tagline}
          </p>

          {/* Description */}
          <p className="mt-6 md:mt-7 font-body font-light text-white/65 text-sm md:text-[15px] leading-[1.7] max-w-2xl">
            {d.description}
          </p>

          {/* Green fees + CTAs */}
          <div className="mt-8 md:mt-10 pt-6 md:pt-7 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pointer-events-auto">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Green Fees
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--c-gold)]">
                {d.greenFees}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to={d.href}
                data-testid={`region-cta-explore-${d.slug}`}
                className="group inline-flex items-center justify-center gap-3 border border-white/70 hover:border-white text-white hover:bg-white hover:text-[var(--c-green-deep)] px-6 md:px-8 py-3 md:py-[14px] rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] transition-colors duration-500"
              >
                Explore
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>

              <button
                type="button"
                onClick={onDownload}
                data-testid={`region-cta-blackbook-${d.slug}`}
                className="group inline-flex items-center justify-center gap-2 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-5 md:px-7 py-3 md:py-[14px] rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 whitespace-nowrap"
              >
                <span>[ {d.blackbookLabel} ]</span>
              </button>
            </div>
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
