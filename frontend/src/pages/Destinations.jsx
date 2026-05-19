import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import NotifyModal from "@/components/NotifyModal";
import HorizontalSlider from "@/components/HorizontalSlider";

/* ------------------------------ DATA ------------------------------ */

const HERO_IMG =
  "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2400&q=85";

const DIVIDER_IMG_1 =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

const DIVIDER_IMG_2 =
  "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2400&q=85";

export const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    tagline: "Pacific cliffs meet the Sea of Cortez.",
    courses: "12+",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1600&q=85",
    live: true,
    href: "/destinations/los-cabos",
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    tagline: "Tropical golf meets surf culture.",
    courses: "7+",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1600&q=85",
    live: true,
    href: "/destinations/punta-mita",
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    region: "Valle de México",
    tagline: "Historic clubs at 7,350 ft.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1600&q=85",
    live: true,
    href: "/destinations/mexico-city",
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    tagline: "Jungle fairways, mountain greens.",
    courses: "6+",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
  {
    slug: "riviera-maya",
    name: "Cancún · Riviera Maya",
    region: "Quintana Roo",
    tagline: "Limestone fairways, Caribbean light.",
    courses: "10+",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
  {
    slug: "unique",
    name: "Unique Destinations",
    region: "Across México",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
];

/* ------------------------------- ICONS ------------------------------- */

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-[9px] h-[9px]">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const TagPill = ({ children, variant = "default" }) => {
  const cls =
    variant === "gold"
      ? "tag-pill tag-pill--gold"
      : variant === "ink"
      ? "tag-pill tag-pill--ink"
      : variant === "forest"
      ? "tag-pill tag-pill--forest"
      : "tag-pill";
  return (
    <span className={cls}>
      <PlusIcon />
      {children}
    </span>
  );
};

/* ------------------------------- HERO ------------------------------- */

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} data-testid="destinations-hero" className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={HERO_IMG} alt="México golf destinations" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-cream leading-[0.92] tracking-tight text-[4rem] sm:text-8xl md:text-[8.5rem] lg:text-[11rem]"
        >
          Destinations<span className="text-gold">°</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display italic font-light text-cream/80 text-lg md:text-2xl max-w-2xl"
        >
          Six regions. Fifty-plus courses. One country worth a lifetime.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/70"
      >
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-10 bg-cream/50"
        />
      </motion.div>
    </section>
  );
};

/* ----------------------- PHOTO DIVIDER ----------------------- */

const PhotoDivider = ({ image, testId = "destinations-divider" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} data-testid={testId} className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-ink/15" />
      </motion.div>
    </section>
  );
};

/* ----------------------- INTRO ON DARK ----------------------- */

const Intro = () => (
  <section data-testid="destinations-intro" className="bg-ink text-cream py-24 md:py-32 relative">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between border-b border-cream/15 pb-3 mb-10">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
          — On the Map
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
          Six regions
        </span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-light text-cream leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-5xl"
      >
        From Pacific cliffs <span className="italic text-gold">to limestone fairways.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 font-body font-light text-cream/75 text-base md:text-lg max-w-2xl leading-relaxed"
      >
        Browse our curated map of golf regions across México. Three are live — three more arriving with their own dedicated guides.
      </motion.p>
    </div>
  </section>
);

/* ----------------------- REGIONS SLIDER ----------------------- */

const RegionCard = ({ r, onNotify }) => {
  const inner = (
    <div className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-ink">
        <img
          src={r.image}
          alt={r.name}
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {r.live ? <TagPill variant="forest">Live</TagPill> : <TagPill variant="gold">Soon</TagPill>}
          <TagPill variant="ink">{r.courses}</TagPill>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-cream/65">{r.region}</span>
          <h3 className="mt-1 font-display font-light text-cream leading-[1.05] tracking-tight text-2xl md:text-3xl">
            {r.name}
          </h3>
          <p className="mt-1.5 font-display italic font-light text-cream/75 text-sm leading-snug">{r.tagline}</p>
        </div>
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-gold/0 group-hover:ring-2 group-hover:ring-gold/40 transition-all duration-500" />
      </div>
    </div>
  );

  return (
    <div className="shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]" data-testid={`region-${r.slug}`}>
      {r.live ? (
        <Link to={r.href} data-testid={`region-link-${r.slug}`} className="block">
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={() => onNotify(r.name)} data-testid={`region-notify-${r.slug}`} className="text-left w-full block">
          {inner}
        </button>
      )}
    </div>
  );
};

const RegionsSection = ({ onNotify }) => (
  <section id="regions" data-testid="regions-section" className="bg-cream pt-24 md:pt-32 pb-24 md:pb-32">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
            — Explore Our Regions
          </span>
          <h2 className="mt-3 font-display font-light text-ink leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl">
            Six regions, <span className="italic text-gold">one country.</span>
          </h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted md:pb-2">
          {REGIONS.length} destinations · 50+ courses
        </span>
      </div>

      <HorizontalSlider testId="regions-slider" arrowOffset={-30}>
        {REGIONS.map((r) => (
          <RegionCard key={r.slug} r={r} onNotify={onNotify} />
        ))}
      </HorizontalSlider>
    </div>
  </section>
);

/* ----------------------- CONTRAST INVITATION ----------------------- */

const ClosingInvite = () => (
  <section data-testid="destinations-closing" className="bg-ink text-cream py-24 md:py-32">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">— A Personal Note</span>
      <h2 className="mt-6 font-display font-light leading-[1] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
        Tell us where you&apos;d like to play. <span className="italic text-gold">We&apos;ll write the week.</span>
      </h2>
      <p className="mt-7 font-body font-light text-cream/65 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
        Every itinerary is built from the courses themselves — never from a catalogue.
      </p>
    </div>
  </section>
);

/* ----------------------------- PAGE ----------------------------- */

const Destinations = () => {
  const [notify, setNotify] = useState(null);
  return (
    <main data-testid="page-destinations" className="relative bg-cream">
      {/* 1. Cinematic hero */}
      <Hero />

      {/* 2. Photo divider (full-bleed parallax) */}
      <PhotoDivider image={DIVIDER_IMG_1} testId="destinations-divider-1" />

      {/* 3. Dark intro band — contrast */}
      <Intro />

      {/* 4. Another photo divider */}
      <PhotoDivider image={DIVIDER_IMG_2} testId="destinations-divider-2" />

      {/* 5. Regions slider */}
      <RegionsSection onNotify={(name) => setNotify(name)} />

      {/* 6. Closing invitation on dark for contrast */}
      <ClosingInvite />

      <NotifyModal open={!!notify} onClose={() => setNotify(null)} region={notify || ""} />
    </main>
  );
};

export default Destinations;
