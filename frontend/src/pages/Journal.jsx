import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------ DATA ------------------------------ */

const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    courses: "12+",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=900&q=85",
    live: true,
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    courses: "7+",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "cdmx",
    name: "Mexico City",
    region: "Valle de México",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    courses: "6+",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "riviera-maya",
    name: "Riviera Maya",
    region: "Quintana Roo",
    courses: "10+",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "huatulco",
    name: "Huatulco",
    region: "Oaxaca",
    courses: "3+",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "bajio",
    name: "Bajío",
    region: "Querétaro · Guanajuato",
    courses: "5+",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
];

const FEATURED = [
  {
    id: "cabo-hub",
    title: "The Los Cabos Hub",
    sub: "Twelve championship courses, hole by hole.",
    cta: "Read",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=85",
    href: "/journal/los-cabos",
    live: true,
  },
  {
    id: "must-reads",
    title: "Editor's Desk: Vol. I",
    sub: "Must-reads from the inaugural issue.",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
    href: null,
    anchor: "must-reads",
    live: true,
  },
];

const CATEGORIES = [
  "All Categories",
  "Authors Journal",
  "Golf & Nature",
  "Hospitality",
  "Best Food",
  "Architecture",
  "Region Guides",
];

const AUTHORS = ["All Authors", "Pablo De La Mora", "José Islas"];

const MUST_READS = [
  {
    slug: "way-we-started",
    title: "The way we started this journal.",
    excerpt: "An origin note from the founders — why this exists, and who it's for.",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Authors Journal",
    author: "Pablo De La Mora",
    read: "5 min",
  },
  {
    slug: "professional-experience",
    title: "Our professional experience in Golf in México.",
    excerpt: "A decade across tour environments — what it taught us.",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85",
    pillar: "Authors Journal",
    author: "Pablo De La Mora",
    read: "8 min",
  },
  {
    slug: "curated-network",
    title: "Our curated network of properties.",
    excerpt: "Why we don't sell from a catalogue.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    pillar: "Hospitality",
    author: "Pablo De La Mora",
    read: "9 min",
  },
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to plan a golf trip to México.",
    excerpt: "Tee times, transfers, courses — the playbook for a frictionless week.",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85",
    pillar: "Region Guides",
    author: "Pablo De La Mora",
    read: "12 min",
  },
  {
    slug: "luxury-golf-vacation-mexico",
    title: "Luxury golf vacations in México.",
    excerpt: "What 'luxury' actually buys you here.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Hospitality",
    author: "Pablo De La Mora",
    read: "10 min",
  },
  {
    slug: "los-cabos-four-mornings",
    title: "Where to play in Los Cabos, hole by hole.",
    excerpt: "Four mornings, four courses — from Diamante to Cabo del Sol.",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Region Guides",
    author: "Pablo De La Mora",
    read: "12 min",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "paspalum-notes",
    title: "Notes on grass.",
    excerpt: "Paspalum holds the ball where bermuda releases it.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    pillar: "Golf & Nature",
    author: "José Islas",
    read: "6 min",
  },
  {
    slug: "us-amateur-2023",
    title: "Stranger at Cherry Hills.",
    excerpt: "The 2023 U.S. Amateur QF — from a Mexican kid's perspective.",
    image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85",
    pillar: "Authors Journal",
    author: "José Islas",
    read: "9 min",
  },
  {
    slug: "mayakoba-wwt",
    title: "Inside Mayakoba.",
    excerpt: "The only PGA Tour event in México — what the broadcast does not show.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Architecture",
    author: "José Islas",
    read: "11 min",
  },
  {
    slug: "best-table-cdmx",
    title: "The best table after eighteen in CDMX.",
    excerpt: "Where the round ends, the city begins.",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85",
    pillar: "Best Food",
    author: "Pablo De La Mora",
    read: "6 min",
  },
];

const PILLAR_CARDS = [
  {
    title: "Golf & Nature",
    body: "Paspalum, ocean spray, altitude, jungle.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Mexican Uniqueness",
    body: "Hospitality, table, and culture in one round.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "People behind the game",
    body: "Caddies, architects, agronomists, and friends.",
    image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1400&q=85",
  },
];

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ----------------------------- SLIDER PRIMITIVE ----------------------------- */

const HorizontalSlider = ({ children, testid, ariaLabel }) => {
  const ref = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="relative" data-testid={testid}>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className="flex flex-nowrap gap-5 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {/* Arrows */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Scroll previous"
          data-testid={`${testid}-prev`}
          className={`group inline-flex items-center justify-center w-11 h-11 border transition-colors duration-300 ${
            atStart
              ? "border-ink/15 text-ink/30 cursor-not-allowed"
              : "border-ink/30 text-ink hover:bg-ink hover:text-cream"
          }`}
        >
          <span className="font-mono text-base transition-transform duration-500 group-hover:-translate-x-0.5">
            ←
          </span>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Scroll next"
          data-testid={`${testid}-next`}
          className={`group inline-flex items-center justify-center w-11 h-11 border transition-colors duration-300 ${
            atEnd
              ? "border-ink/15 text-ink/30 cursor-not-allowed"
              : "border-ink/30 text-ink hover:bg-ink hover:text-cream"
          }`}
        >
          <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

/* ----------------------------- SECTIONS ----------------------------- */

const Header = ({ category, onCategoryChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <section
      data-testid="journal-header"
      className="bg-cream pt-44 md:pt-52 pb-12 md:pb-16"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.span
          {...fade}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
        >
          The Journal · Vol. I
        </motion.span>
        <motion.h1
          {...fade}
          transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-light text-ink leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[7.5rem]"
        >
          Features.
        </motion.h1>

        {/* Category dropdown */}
        <div className="mt-10 md:mt-14 border-t border-b border-ink/15">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="dropdown-category"
            className="w-full flex items-center justify-between py-5 md:py-6 group"
          >
            <div className="flex items-center gap-6">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                Category
              </span>
              <span className="font-display text-xl md:text-2xl font-light text-ink tracking-tight">
                {category}
              </span>
            </div>
            <span
              className={`font-mono text-base transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden
            >
              ↓
            </span>
          </button>
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                data-testid="dropdown-category-menu"
              >
                <div className="pb-5 flex flex-wrap gap-x-6 gap-y-3">
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => {
                          onCategoryChange(c);
                          setOpen(false);
                        }}
                        data-testid={`dropdown-cat-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        className={`font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial transition-colors ${
                          c === category ? "text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const FeaturedRow = () => (
  <section data-testid="featured-row" className="bg-cream pb-16 md:pb-24">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <ul className="grid grid-cols-12 gap-6 md:gap-8">
        {FEATURED.map((f, i) => {
          const handle = (e) => {
            if (!f.href && f.anchor) {
              e.preventDefault();
              document.getElementById(f.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          };
          const Tag = f.href ? Link : "a";
          const props = f.href ? { to: f.href } : { href: "#", onClick: handle };
          return (
            <motion.li
              key={f.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`featured-${f.id}`}
              className="col-span-12 md:col-span-6 group"
            >
              <Tag {...props} className="block">
                <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-ink">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-ink/35" />
                  <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <div className="max-w-md">
                      <h3 className="font-display font-light text-cream text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                        {f.title}
                      </h3>
                      <p className="mt-3 md:mt-4 font-body font-light text-cream/85 text-sm md:text-base leading-relaxed">
                        {f.sub}
                      </p>
                      <span className="mt-6 md:mt-8 inline-block font-display italic font-light text-cream text-base md:text-lg border-b border-cream/60 pb-0.5 transition-colors group-hover:border-gold group-hover:text-gold">
                        {f.cta}
                      </span>
                    </div>
                  </div>
                </div>
              </Tag>
            </motion.li>
          );
        })}
      </ul>
    </div>
  </section>
);

const RegionCard = ({ r }) => {
  const Tag = r.live ? Link : "div";
  const props = r.live ? { to: `/journal/${r.slug}` } : {};
  return (
    <Tag
      {...props}
      data-testid={`region-${r.slug}`}
      className="shrink-0 w-[210px] md:w-[260px] snap-start group block"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
        <img
          src={r.image}
          alt={r.name}
          className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            r.live ? "group-hover:scale-[1.04]" : ""
          }`}
        />
        {!r.live && (
          <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2 py-1">
            Soon
          </span>
        )}
        <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-ink/55 backdrop-blur-sm px-2 py-1">
          {r.courses}
        </span>
      </div>
      <div className="mt-3 md:mt-4">
        <h3 className="font-display font-light text-ink text-lg md:text-xl leading-tight tracking-tight">
          {r.name}
        </h3>
        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          {r.region}
        </span>
      </div>
    </Tag>
  );
};

const RegionsSlider = () => (
  <section
    data-testid="regions-section"
    className="bg-cream pb-16 md:pb-24 border-t hairline pt-16 md:pt-20"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
            — Destinations
          </span>
          <motion.h2
            {...fade}
            className="mt-4 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
          >
            Discover Golf Regions.
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-body font-light text-ink/65 text-sm md:text-base max-w-md leading-relaxed"
          >
            Seven editorial hubs. Swipe through México's golf coastlines.
          </motion.p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          {REGIONS.length} regions
        </span>
      </div>
      <HorizontalSlider testid="regions-slider" ariaLabel="Golf regions">
        {REGIONS.map((r) => (
          <RegionCard key={r.slug} r={r} />
        ))}
      </HorizontalSlider>
    </div>
  </section>
);

const MustReadCard = ({ a }) => {
  const Tag = a.live && a.href ? Link : "div";
  const props = a.live && a.href ? { to: a.href } : {};
  return (
    <Tag
      {...props}
      data-testid={`article-${a.slug}`}
      className="shrink-0 w-[280px] md:w-[340px] snap-start group block"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
        <img
          src={a.image}
          alt={a.title}
          className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            a.live ? "group-hover:scale-[1.04]" : ""
          }`}
        />
        <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2 py-1">
          {a.pillar}
        </span>
        {!a.live && (
          <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2 py-1">
            Soon
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3
          className={`font-display font-light text-xl md:text-2xl leading-[1.1] tracking-tight max-w-[22ch] ${
            a.live ? "text-ink" : "text-ink/80"
          }`}
        >
          {a.title}
        </h3>
        <p className="mt-2 font-body font-light text-ink/65 text-sm leading-[1.6] max-w-md">
          {a.excerpt}
        </p>
        <div className="mt-3 pt-3 border-t hairline flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            By {a.author.split(" ")[0]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {a.read}
          </span>
        </div>
      </div>
    </Tag>
  );
};

const MustReadsSlider = ({ category }) => {
  const [author, setAuthor] = useState("All Authors");
  const filtered = useMemo(() => {
    return MUST_READS.filter((a) => {
      const catOk = category === "All Categories" || a.pillar === category;
      const authorOk = author === "All Authors" || a.author === author;
      return catOk && authorOk;
    });
  }, [category, author]);

  return (
    <section
      id="must-reads"
      data-testid="must-reads"
      className="bg-cream pb-16 md:pb-24 border-t hairline pt-16 md:pt-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Editor's Desk
            </span>
            <motion.h2
              {...fade}
              className="mt-4 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl"
            >
              Must-reads from the new issue.
            </motion.h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {AUTHORS.map((a) => {
              const isActive = a === author;
              return (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAuthor(a)}
                  data-testid={`author-${a.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className={`font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial transition-colors ${
                    isActive ? "text-ink border-b-2 border-gold pb-1" : "text-muted hover:text-ink"
                  }`}
                >
                  {a}
                </button>
              );
            })}
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {filtered.length}
            </span>
          </div>
        </div>

        {filtered.length > 0 ? (
          <HorizontalSlider testid="must-reads-slider" ariaLabel="Must-read articles">
            {filtered.map((a) => (
              <MustReadCard key={a.slug} a={a} />
            ))}
          </HorizontalSlider>
        ) : (
          <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
            Nothing matches yet — try another filter.
          </p>
        )}
      </div>
    </section>
  );
};

const PillarsSection = () => (
  <section
    data-testid="pillars-section"
    className="bg-cream pb-24 md:pb-32 border-t hairline pt-16 md:pt-20"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — Pillars
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          What we write about
        </span>
      </div>
      <ul className="grid grid-cols-12 gap-5 md:gap-8">
        {PILLAR_CARDS.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`pillar-${p.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            className="col-span-12 md:col-span-4 group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-display font-light text-cream text-3xl md:text-4xl leading-[1.05] tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 font-body font-light text-cream/85 text-sm md:text-base leading-[1.6] max-w-md">
                  {p.body}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  const [category, setCategory] = useState("All Categories");

  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Header category={category} onCategoryChange={setCategory} />
      <FeaturedRow />
      <RegionsSlider />
      <MustReadsSlider category={category} />
      <PillarsSection />
    </main>
  );
};

export default Journal;
