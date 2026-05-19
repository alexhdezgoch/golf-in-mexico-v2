import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import NotifyModal from "@/components/NotifyModal";

/* ------------------------------ DATA ------------------------------ */

const HERO_IMG =
  "https://images.pexels.com/photos/35918456/pexels-photo-35918456.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85";

const DIVIDER_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    tagline: "Pacific cliffs meet the Sea of Cortez.",
    courses: "12+",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1600&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    tagline: "Tropical golf meets surf culture.",
    courses: "7+",
    image:
      "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1600&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "cdmx",
    name: "Mexico City",
    region: "Valle de México",
    tagline: "Historic clubs at 7,350 ft.",
    courses: "8+",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1600&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    tagline: "Jungle fairways, mountain greens.",
    courses: "6+",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
  {
    slug: "riviera-maya",
    name: "Cancún · Riviera Maya",
    region: "Quintana Roo",
    tagline: "Limestone fairways, Caribbean light.",
    courses: "10+",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
  {
    slug: "unique",
    name: "Unique Golf Destinations",
    region: "Across México",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    courses: "8+",
    image:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
];

const PILLAR_FILTERS = [
  "All",
  "Authors Journal",
  "Golf & Nature",
  "Hospitality",
  "Best Food",
  "Architecture",
  "Region Guides",
];

const AUTHORS = ["All", "Pablo De La Mora", "José Islas", "Golf In Mexico"];

const MUST_READS = [
  {
    slug: "why-pablo-started-this",
    title: "Why Pablo started this.",
    excerpt:
      "México is not a destination — it is an immersion. A founder's note on why we'd rather write than sell, and why every round here is a chapter.",
    image:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1600&q=85",
    pillar: "Authors Journal",
    author: "Pablo De La Mora",
    read: "5 min",
    featured: true,
  },
  {
    slug: "why-jose-started-this",
    title: "Why José started this.",
    excerpt:
      "From the U.S. Amateur to the bunkers of Mayakoba — a player's note on the México that shaped his eye for the game.",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1600&q=85",
    pillar: "Authors Journal",
    author: "José Islas",
    read: "6 min",
  },
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to plan a golf trip to México.",
    excerpt: "The playbook for a frictionless week — courses, table, hotel, transit.",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1600&q=85",
    pillar: "Region Guides",
    author: "Golf In Mexico",
    read: "12 min",
  },
  {
    slug: "luxury-golf-vacation-mexico",
    title: "Luxury golf vacations in México.",
    excerpt: "What 'luxury' actually buys you here — and what it doesn't.",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85",
    pillar: "Hospitality",
    author: "Golf In Mexico",
    read: "10 min",
  },
];

const PAGE_SIZE = 8;

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ------------------------------- ICONS ------------------------------- */

const PlusIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------ TAG PILL ------------------------------ */

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
    <section
      ref={ref}
      data-testid="journal-hero"
      className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-ink text-cream"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src={HERO_IMG}
          alt="Cinematic golf course in México"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/80" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center"
      >
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
          Descubre experiencias únicas en cada región.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
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

/* ----------------------------- DESTINATION HUBS ----------------------------- */

const HubCard = ({ r, large, i }) => {
  const inner = (
    <div className="block group relative">
      <div
        className={`relative ${
          large ? "aspect-[16/11]" : "aspect-[4/5]"
        } w-full overflow-hidden rounded-3xl bg-ink`}
      >
        <img
          src={r.image}
          alt={r.name}
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* Gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

        {/* Tag pills */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {r.live ? (
            <TagPill variant="forest">Live</TagPill>
          ) : (
            <TagPill variant="gold">Soon</TagPill>
          )}
          <TagPill variant="ink">{r.courses}</TagPill>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wide-editorial text-cream/65">
                {r.region}
              </span>
              <h3
                className={`mt-1 font-display font-light text-cream leading-[1.02] tracking-tight ${
                  large ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
                }`}
              >
                {r.name}
              </h3>
              <p
                className={`mt-1.5 font-display italic font-light text-cream/70 ${
                  large ? "text-base md:text-lg" : "text-xs md:text-sm"
                } leading-snug`}
              >
                {r.tagline}
              </p>
            </div>
            {/* Magnetic arrow */}
            <span className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-full border border-cream/35 text-cream backdrop-blur-sm bg-ink/30 group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-all duration-500 group-hover:rotate-[-45deg] shrink-0">
              <ArrowIcon className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Subtle gold inner-stroke on hover */}
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-gold/0 group-hover:ring-2 group-hover:ring-gold/40 transition-all duration-500" />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`region-${r.slug}`}
    >
      {inner}
    </motion.div>
  );
};

const Hubs = ({ onNotify }) => {
  const [first, ...rest] = REGIONS;
  return (
    <section
      id="regions-section"
      data-testid="regions-section"
      className="bg-cream pt-24 md:pt-32 pb-20 md:pb-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-4">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Explora nuestras regiones
            </span>
            <motion.h2
              {...fade}
              className="mt-3 font-display font-light text-ink leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl"
            >
              Six regions, <span className="italic text-gold">one country.</span>
            </motion.h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted md:pb-2">
            {REGIONS.length} destinations · 50+ courses
          </span>
        </div>

        {/* Featured large + 2 medium row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Large featured */}
          <div className="lg:col-span-7">
            {first.live ? (
              <Link to={first.href} data-testid={`region-link-${first.slug}`}>
                <HubCard r={first} large i={0} />
              </Link>
            ) : (
              <button type="button" onClick={() => onNotify(first.name)} className="w-full text-left">
                <HubCard r={first} large i={0} />
              </button>
            )}
          </div>
          {/* Two medium stacked */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 md:gap-6">
            {rest.slice(0, 2).map((r, idx) => (
              <div key={r.slug}>
                {r.live ? (
                  <Link to={r.href} data-testid={`region-link-${r.slug}`}>
                    <HubCard r={r} i={idx + 1} />
                  </Link>
                ) : (
                  <button type="button" onClick={() => onNotify(r.name)} className="w-full text-left">
                    <HubCard r={r} i={idx + 1} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom three row */}
        <div className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          {rest.slice(2).map((r, idx) => (
            <div key={r.slug}>
              {r.live ? (
                <Link to={r.href} data-testid={`region-link-${r.slug}`}>
                  <HubCard r={r} i={idx + 3} />
                </Link>
              ) : (
                <button type="button" onClick={() => onNotify(r.name)} className="w-full text-left">
                  <HubCard r={r} i={idx + 3} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------ CINEMATIC SECTION DIVIDER ------------------------ */

const SectionDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      data-testid="journal-divider"
      className="relative h-[70vh] min-h-[460px] w-full overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
        <img
          src={DIVIDER_IMG}
          alt="México golf landscape"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-ink/15" />
      </motion.div>
    </section>
  );
};

/* ----------------------- DESTINATIONS SCROLL HUB ----------------------- */

const THEMES = [
  {
    id: "golf",
    label: "01 — Golf",
    title: "Golf",
    body: "Campos icónicos donde confluyen tradición y diseño.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "naturaleza",
    label: "02 — Naturaleza",
    title: "Naturaleza",
    body: "Espacios vírgenes donde la naturaleza es protagonista.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "hospitalidad",
    label: "03 — Hospitalidad",
    title: "Hospitalidad",
    body: "Atención excepcional en cada detalle de tu estancia.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "gastronomia",
    label: "04 — Gastronomía",
    title: "Gastronomía",
    body: "Sabores que cuentan historias de cada territorio.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "arquitectura",
    label: "05 — Arquitectura",
    title: "Arquitectura",
    body: "Espacios diseñados como obra de arte, on & off course.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "people",
    label: "06 — People",
    title: "People",
    body: "Los protagonistas que hacen única cada experiencia.",
    image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=2400&q=85",
  },
];

const ThemeSection = ({ t, index, registerRef }) => {
  const align = index % 2 === 0 ? "items-start text-left" : "items-end text-right";

  return (
    <section
      ref={(el) => registerRef(el, index)}
      data-index={index}
      data-testid={`theme-${t.id}`}
      className="relative h-[100vh] min-h-[640px] w-full flex flex-col justify-end pb-16 md:pb-24 pointer-events-none"
    >
      <div className={`max-w-[1440px] mx-auto px-6 md:px-16 w-full flex flex-col ${align}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-30%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl flex flex-col gap-5 pointer-events-auto ${index % 2 === 0 ? "" : "items-end"}`}
        >
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            {t.label}
          </span>
          <h2 className="font-display font-light text-cream leading-[0.95] tracking-tight text-6xl md:text-8xl lg:text-9xl">
            {t.title}
            <span className="text-gold">.</span>
          </h2>
          <p className="font-display italic font-light text-cream/90 text-xl md:text-2xl lg:text-3xl leading-snug max-w-xl">
            {t.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const DestinationsScroll = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionsRef = useRef([]);

  const registerRef = (el, idx) => {
    if (el) sectionsRef.current[idx] = el;
  };

  // Preload all theme images once on mount
  useEffect(() => {
    THEMES.forEach((t) => {
      const img = new Image();
      img.src = t.image;
    });
  }, []);

  // Intersection Observer — change background when a section reaches center of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let best = null;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          }
        });
        if (best) {
          const idx = Number(best.target.dataset.index);
          setActiveIdx(idx);
        }
      },
      {
        // Trigger when ~50% of a section is in view
        threshold: [0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -15% 0px",
      }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-testid="destinations-scroll"
      className="relative bg-ink text-cream"
    >
      {/* Sticky fixed background — crossfade between theme images */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden z-0">
        <div className="absolute inset-0">
          {THEMES.map((t, i) => (
            <div
              key={t.id}
              aria-hidden="true"
              className="absolute inset-0 transition-opacity duration-[800ms]"
              style={{
                opacity: activeIdx === i ? 1 : 0,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <img
                src={t.image}
                alt=""
                className="w-full h-full object-cover scale-105"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/55" />
        </div>

        {/* Progress indicator (vertical dots, right side) */}
        <div className="hidden md:flex absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20 pointer-events-none">
          {THEMES.map((t, i) => (
            <div key={t.id} className="flex items-center gap-3">
              <span
                className={`font-mono text-[9px] uppercase tracking-wide-editorial transition-all duration-500 ${
                  activeIdx === i ? "text-cream opacity-100" : "text-cream/40 opacity-60"
                }`}
                style={{ minWidth: 56 }}
              >
                {String(i + 1).padStart(2, "0")} · {t.title}
              </span>
              <span
                className={`block rounded-full transition-all duration-500 ${
                  activeIdx === i
                    ? "w-2.5 h-2.5 bg-gold"
                    : "w-1.5 h-1.5 bg-cream/40"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sections layered on top of sticky background (negative margin trick) */}
      <div className="relative z-10 -mt-[100vh]">
        {THEMES.map((t, i) => (
          <ThemeSection key={t.id} t={t} index={i} registerRef={registerRef} />
        ))}
      </div>
    </div>
  );
};

/* ----------------------------- MARQUEE RIBBON ----------------------------- */

const RIBBON_ITEMS = [
  "Editorial",
  "México°",
  "Field Notes",
  "Authors Journal",
  "Region Guides",
  "Hospitality",
  "Best Food",
  "Architecture",
  "Golf & Nature",
];

const MarqueeRibbon = () => {
  const items = [...RIBBON_ITEMS, ...RIBBON_ITEMS];
  return (
    <section
      data-testid="journal-ribbon"
      className="relative bg-cream text-ink overflow-hidden py-6 md:py-7 border-y hairline marquee-pause"
      aria-hidden="true"
    >
      <div className="marquee">
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-6 md:gap-10 px-6 md:px-10 font-display italic font-light text-3xl md:text-5xl whitespace-nowrap"
          >
            {t}
            <span className="text-gold not-italic font-mono text-base md:text-lg">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};

/* ----------------------------- ARTICLES ----------------------------- */

const FeaturedArticle = ({ a }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    data-testid={`article-${a.slug}`}
    className="group"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-stretch">
      <div className="md:col-span-7 relative aspect-[16/10] md:aspect-[3/2] overflow-hidden rounded-3xl bg-ink">
        <img
          src={a.image}
          alt={a.title}
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <TagPill variant="gold">Featured</TagPill>
          <TagPill variant="ink">{a.pillar}</TagPill>
        </div>
      </div>
      <div className="md:col-span-5 flex flex-col justify-between bg-ink text-cream p-7 md:p-10 rounded-3xl">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            ◦ N°01 · Founders&apos; Note
          </span>
          <h3 className="mt-4 font-display font-light leading-[1.02] tracking-tight text-3xl md:text-4xl lg:text-5xl">
            {a.title}
          </h3>
          <p className="mt-5 font-body font-light text-cream/75 text-sm md:text-base leading-relaxed max-w-md">
            {a.excerpt}
          </p>
        </div>
        <div className="mt-8 pt-5 border-t border-cream/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/65">By</span>
            <span className="font-display italic font-light text-cream text-base md:text-lg">{a.author}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/65">{a.read}</span>
        </div>
      </div>
    </div>
  </motion.article>
);

const ArticleCard = ({ a, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.85, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
    data-testid={`article-${a.slug}`}
    className="group block"
  >
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink">
      <img
        src={a.image}
        alt={a.title}
        className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
        <TagPill variant="gold">{a.pillar}</TagPill>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-light text-cream leading-[1.05] tracking-tight text-xl md:text-2xl">
              {a.title}
            </h3>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-cream/65">
                {a.author}
              </span>
              <span className="block w-1 h-1 rounded-full bg-cream/35" />
              <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-cream/65">
                {a.read}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-cream/35 text-cream backdrop-blur-sm bg-ink/30 group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-all duration-500 group-hover:rotate-[-45deg] shrink-0">
            <ArrowIcon className="w-4 h-4" />
          </span>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-gold/0 group-hover:ring-2 group-hover:ring-gold/40 transition-all duration-500" />
    </div>
  </motion.article>
);

const Articles = () => {
  const [pillar, setPillar] = useState("All");
  const [author, setAuthor] = useState("All");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [pillarOpen, setPillarOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);

  const filtered = useMemo(() => {
    let pool = [...MUST_READS];
    if (pillar !== "All") pool = pool.filter((a) => a.pillar === pillar);
    if (author !== "All") pool = pool.filter((a) => a.author === author);
    return pool;
  }, [pillar, author]);

  const featured = filtered.find((m) => m.featured);
  const grid = filtered.filter((m) => !m.featured);
  const visibleGrid = grid.slice(0, shown);
  const hasMore = grid.length > shown;

  const onPillar = (p) => { setPillar(p); setShown(PAGE_SIZE); setPillarOpen(false); };
  const onAuthor = (a) => { setAuthor(a); setShown(PAGE_SIZE); setAuthorOpen(false); };

  return (
    <section
      id="must-reads"
      data-testid="must-reads"
      className="bg-cream pt-24 md:pt-32 pb-24 md:pb-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-4">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Articles
            </span>
            <motion.h2
              {...fade}
              className="mt-3 font-display font-light text-ink leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl"
            >
              Stories <span className="italic text-gold">from the field.</span>
            </motion.h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <button
                type="button"
                data-testid="dropdown-pillar"
                onClick={() => setPillarOpen((v) => !v)}
                className={`glass-pill glass-pill--ink ${pillar !== "All" ? "glass-pill--active" : ""}`}
              >
                <span className="pill-dot" />
                <span className="opacity-70">Pillar</span>
                <span className="font-semibold">{pillar}</span>
                <span className={`transition-transform duration-300 ${pillarOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {pillarOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 right-0 mt-2 min-w-[240px] bg-cream border border-ink/15 shadow-2xl rounded-2xl overflow-hidden p-1.5"
                  >
                    {PILLAR_FILTERS.map((p) => (
                      <li key={p}>
                        <button
                          type="button"
                          onClick={() => onPillar(p)}
                          data-testid={`dropdown-pillar-${p.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${pillar === p ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"}`}
                        >
                          {p}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                type="button"
                data-testid="dropdown-author"
                onClick={() => setAuthorOpen((v) => !v)}
                className={`glass-pill glass-pill--ink ${author !== "All" ? "glass-pill--active" : ""}`}
              >
                <span className="pill-dot" />
                <span className="opacity-70">Author</span>
                <span className="font-semibold">{author}</span>
                <span className={`transition-transform duration-300 ${authorOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {authorOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 right-0 mt-2 min-w-[240px] bg-cream border border-ink/15 shadow-2xl rounded-2xl overflow-hidden p-1.5"
                  >
                    {AUTHORS.map((a) => (
                      <li key={a}>
                        <button
                          type="button"
                          onClick={() => onAuthor(a)}
                          data-testid={`dropdown-author-${a.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${author === a ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"}`}
                        >
                          {a}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Featured */}
        {featured && <FeaturedArticle a={featured} />}

        {/* Grid */}
        {visibleGrid.length > 0 ? (
          <ul className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {visibleGrid.map((a, i) => (
              <li key={a.slug}>
                <ArticleCard a={a} i={i} />
              </li>
            ))}
          </ul>
        ) : (
          !featured && (
            <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
              Nothing matches yet — try another filter.
            </p>
          )
        )}

        {hasMore && (
          <div className="mt-10 md:mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              data-testid="must-reads-load-more"
              className="glass-pill glass-pill--ink group"
            >
              <span className="pill-dot" />
              <span>Load more</span>
              <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  const [notify, setNotify] = useState(null);
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Hero />
      <DestinationsScroll />
      <SectionDivider />
      <Hubs onNotify={(name) => setNotify(name)} />
      <MarqueeRibbon />
      <Articles />
      <NotifyModal open={!!notify} onClose={() => setNotify(null)} region={notify || ""} />
    </main>
  );
};

export default Journal;
