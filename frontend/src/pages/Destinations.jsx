import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import NotifyModal from "@/components/NotifyModal";
import HorizontalSlider from "@/components/HorizontalSlider";

/* ------------------------------ DATA ------------------------------ */

const HERO_IMG =
  "https://images.pexels.com/photos/35918456/pexels-photo-35918456.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85";

const DIVIDER_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

export const REGIONS = [
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
    name: "Unique Destinations",
    region: "Across México",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    courses: "8+",
    image:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
];

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
    <section
      ref={ref}
      data-testid="destinations-hero"
      className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-ink text-cream"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={HERO_IMG} alt="México golf cinematic" className="w-full h-full object-cover scale-110" />
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

/* ----------------------- DESTINATIONS SCROLL HUB ----------------------- */

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
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">{t.label}</span>
          <h2 className="font-display font-light text-cream leading-[0.95] tracking-tight text-6xl md:text-8xl lg:text-9xl">
            {t.title}<span className="text-gold">.</span>
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

  useEffect(() => {
    THEMES.forEach((t) => {
      const img = new Image();
      img.src = t.image;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          }
        });
        if (best) setActiveIdx(Number(best.target.dataset.index));
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: "-15% 0px -15% 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div data-testid="destinations-scroll" className="relative bg-ink text-cream">
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
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/55" />
        </div>

        {/* Progress indicator */}
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
                  activeIdx === i ? "w-2.5 h-2.5 bg-gold" : "w-1.5 h-1.5 bg-cream/40"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 -mt-[100vh]">
        {THEMES.map((t, i) => (
          <ThemeSection key={t.id} t={t} index={i} registerRef={registerRef} />
        ))}
      </div>
    </div>
  );
};

/* ----------------------- SECTION DIVIDER ----------------------- */

const SectionDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      data-testid="destinations-divider"
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
        <img src={DIVIDER_IMG} alt="" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-ink/15" />
      </motion.div>
    </section>
  );
};

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
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
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

/* ----------------------------- PAGE ----------------------------- */

const Destinations = () => {
  const [notify, setNotify] = useState(null);
  return (
    <main data-testid="page-destinations" className="relative bg-cream">
      <Hero />
      <DestinationsScroll />
      <SectionDivider />
      <RegionsSection onNotify={(name) => setNotify(name)} />
      <NotifyModal open={!!notify} onClose={() => setNotify(null)} region={notify || ""} />
    </main>
  );
};

export default Destinations;
