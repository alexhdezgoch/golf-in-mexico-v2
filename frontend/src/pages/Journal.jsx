import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NotifyModal from "@/components/NotifyModal";

/* ------------------------------ DATA ------------------------------ */

const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    tagline: "Pacific cliffs meet the Sea of Cortez.",
    courses: "12+",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=900&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    tagline: "Tropical golf meets surf culture.",
    courses: "7+",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "cdmx",
    name: "Mexico City",
    region: "Valle de México",
    tagline: "Historic clubs at 7,350 ft.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=900&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    tagline: "Jungle fairways, mountain greens.",
    courses: "6+",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "riviera-maya",
    name: "Cancún · Riviera Maya",
    region: "Quintana Roo",
    tagline: "Limestone fairways, Caribbean light.",
    courses: "10+",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "unique",
    name: "Unique Golf Destinations",
    region: "Across México",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=900&q=85",
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
    pinned: true,
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
    pinned: true,
  },
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to plan a golf trip to México.",
    excerpt: "The playbook for a frictionless week — courses, table, hotel, transit.",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85",
    pillar: "Region Guides",
    author: "Golf In Mexico",
    read: "12 min",
    pinned: true,
  },
  {
    slug: "luxury-golf-vacation-mexico",
    title: "Luxury golf vacations in México.",
    excerpt: "What 'luxury' actually buys you here — and what it doesn't.",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Hospitality",
    author: "Golf In Mexico",
    read: "10 min",
    pinned: true,
  },
];

const PAGE_SIZE = 8;

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

/* ------------------------------- ICONS ------------------------------- */

const PlusIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className}>
    <path d="M12 5v14M5 12h14" />
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

/* ----------------------------- REGIONS ----------------------------- */

const RegionsRow = () => {
  const [notify, setNotify] = useState(null);

  return (
    <>
      <section
        id="regions-section"
        data-testid="regions-section"
        className="bg-cream pt-40 md:pt-48 pb-16 md:pb-24"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-10 border-b hairline pb-3">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Destination Hubs
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {REGIONS.length} destinations
            </span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {REGIONS.map((r, i) => {
              const inner = (
                <>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                      {r.live ? (
                        <TagPill variant="forest">Live</TagPill>
                      ) : (
                        <TagPill variant="gold">Soon</TagPill>
                      )}
                      <TagPill variant="ink">{r.courses}</TagPill>
                    </div>
                  </div>
                  <div className="mt-3 pb-2 border-b hairline">
                    <h3 className="font-display font-light text-ink text-base leading-[1.1] tracking-tight read-cta">
                      {r.name}
                    </h3>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                      {r.region}
                    </span>
                  </div>
                  <p className="mt-2 font-display italic font-light text-ink/65 text-xs leading-[1.35] hidden md:block">
                    {r.tagline}
                  </p>
                </>
              );

              return (
                <motion.li
                  key={r.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.75, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`region-${r.slug}`}
                  className="group"
                >
                  {r.live ? (
                    <Link
                      to={r.href}
                      data-testid={`region-link-${r.slug}`}
                      className="block"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setNotify(r.name)}
                      data-testid={`region-notify-${r.slug}`}
                      className="text-left w-full block"
                    >
                      {inner}
                    </button>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      <NotifyModal
        open={!!notify}
        onClose={() => setNotify(null)}
        region={notify || ""}
      />
    </>
  );
};

/* ----------------------------- MUST READS ----------------------------- */

const MustReadCard = ({ a, i }) => {
  const Tag = a.live && a.href ? Link : "div";
  const props = a.live && a.href ? { to: a.href } : {};
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`article-${a.slug}`}
      className="group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink">
          <img
            src={a.image}
            alt={a.title}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              a.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap max-w-[calc(100%-1rem)]">
            <TagPill variant="gold">{a.pillar}</TagPill>
            {a.pinned && <TagPill variant="ink">Must</TagPill>}
            {!a.live && !a.pinned && <TagPill>Soon</TagPill>}
            {a.live && <TagPill variant="forest">Live</TagPill>}
          </div>
        </div>
        <div className="mt-3 pb-2 border-b hairline">
          <h3
            className={`font-display font-light leading-[1.15] tracking-tight text-[15px] md:text-base read-cta ${
              a.live ? "text-ink" : "text-ink/85"
            }`}
          >
            {a.title}
          </h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/70 truncate">
            {a.author}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
            {a.read}
          </span>
        </div>
      </Tag>
    </motion.li>
  );
};

const MustReads = () => {
  const [pillar, setPillar] = useState("All");
  const [author, setAuthor] = useState("All");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [pillarOpen, setPillarOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);

  const filtered = useMemo(() => {
    const pinned = MUST_READS.filter((a) => a.pinned);
    const rest = MUST_READS.filter((a) => !a.pinned);
    let pool = [...pinned, ...rest];
    if (pillar !== "All") pool = pool.filter((a) => a.pillar === pillar);
    if (author !== "All") pool = pool.filter((a) => a.author === author);
    return pool;
  }, [pillar, author]);

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  const onPillar = (p) => { setPillar(p); setShown(PAGE_SIZE); setPillarOpen(false); };
  const onAuthor = (a) => { setAuthor(a); setShown(PAGE_SIZE); setAuthorOpen(false); };

  return (
    <section
      id="must-reads"
      data-testid="must-reads"
      className="bg-cream pb-20 md:pb-28 border-t hairline pt-14 md:pt-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12 border-b hairline pb-4">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Articles
            </span>
            <motion.h2
              {...fade}
              className="mt-3 font-display font-light text-ink text-3xl md:text-4xl leading-[1.05] tracking-tight"
            >
              Stories from the field.
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

            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted ml-1">
              {visible.length} / {filtered.length}
            </span>
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visible.map((a, i) => (<MustReadCard key={a.slug} a={a} i={i} />))}
          </ul>
        ) : (
          <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
            Nothing matches yet — try another filter.
          </p>
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
      className="relative bg-ink text-cream overflow-hidden py-6 md:py-7 border-y border-cream/10 marquee-pause"
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

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <RegionsRow />
      <MarqueeRibbon />
      <MustReads />
    </main>
  );
};

export default Journal;
