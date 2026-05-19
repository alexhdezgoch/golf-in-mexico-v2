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

const PILLARS = [
  {
    slug: "golf-nature",
    title: "Golf & Nature",
    body: "Paspalum, ocean spray, altitude, jungle.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "mexican-uniqueness",
    title: "Mexican Uniqueness",
    body: "Hospitality, table, and culture in one round.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "people-behind-game",
    title: "People Behind the Game",
    body: "Caddies, architects, agronomists, friends.",
    image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85",
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

const AUTHORS = ["All", "Pablo De La Mora", "José Islas"];

const MUST_READS = [
  { slug: "way-we-started", title: "The way we started this journal.", excerpt: "An origin note from the founders.", image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85", pillar: "Authors Journal", author: "Pablo De La Mora", read: "5 min", pinned: true },
  { slug: "professional-experience", title: "Our professional experience in Golf in México.", excerpt: "A decade across tour environments.", image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85", pillar: "Authors Journal", author: "Pablo De La Mora", read: "8 min", pinned: true },
  { slug: "curated-network", title: "Our curated network of properties.", excerpt: "Why we don't sell from a catalogue.", image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85", pillar: "Hospitality", author: "Pablo De La Mora", read: "9 min", pinned: true },
  { slug: "how-to-plan-a-golf-trip-to-mexico", title: "How to plan a golf trip to México.", excerpt: "The playbook for a frictionless week.", image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85", pillar: "Region Guides", author: "Pablo De La Mora", read: "12 min", pinned: true },
  { slug: "luxury-golf-vacation-mexico", title: "Luxury golf vacations in México.", excerpt: "What 'luxury' actually buys you here.", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85", pillar: "Hospitality", author: "Pablo De La Mora", read: "10 min", pinned: true },
  { slug: "los-cabos-four-mornings", title: "Where to play in Los Cabos, hole by hole.", excerpt: "Four mornings, four courses.", image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85", pillar: "Region Guides", author: "Pablo De La Mora", read: "12 min", live: true, href: "/journal/los-cabos" },
  { slug: "paspalum-notes", title: "Notes on grass.", excerpt: "Paspalum vs. bermuda — what your wedge does.", image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85", pillar: "Golf & Nature", author: "José Islas", read: "6 min" },
  { slug: "us-amateur-2023", title: "Stranger at Cherry Hills.", excerpt: "The 2023 U.S. Amateur, from a Mexican kid.", image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85", pillar: "Authors Journal", author: "José Islas", read: "9 min" },
  { slug: "mayakoba-wwt", title: "Inside Mayakoba.", excerpt: "Only PGA Tour event in México.", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85", pillar: "Architecture", author: "José Islas", read: "11 min" },
  { slug: "best-table-cdmx", title: "The best table after eighteen in CDMX.", excerpt: "Where the round ends, the city begins.", image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85", pillar: "Best Food", author: "Pablo De La Mora", read: "6 min" },
  { slug: "agent-playbook", title: "The agent's playbook.", excerpt: "Introductions, not allotments.", image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85", pillar: "Region Guides", author: "Pablo De La Mora", read: "7 min" },
  { slug: "punta-mita-tail", title: "Tail of the Whale.", excerpt: "Nicklaus's island green, Pacific rocks.", image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85", pillar: "Architecture", author: "José Islas", read: "8 min" },
];

const PAGE_SIZE = 8;

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

/* ----------------------------- SECTIONS ----------------------------- */

const Hero = () => (
  <section
    data-testid="journal-hero"
    className="bg-cream pt-44 md:pt-52 pb-12 md:pb-16"
  >
    <div className="max-w-[1280px] mx-auto px-6 md:px-12">
      <motion.span
        {...fade}
        className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
      >
        The Journal · Hub
      </motion.span>
      <motion.h1
        {...fade}
        transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 font-display font-light text-ink leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-4xl"
      >
        Golf in México,{" "}
        <span className="italic">from Pacific cliffs to limestone fairways.</span>
      </motion.h1>
      <motion.p
        {...fade}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 font-body font-light text-ink/70 text-base md:text-lg leading-relaxed max-w-2xl"
      >
        Over fifty championship courses across five regions — Nicklaus,
        Norman, Woods, Love III. Editorial guides written from the courses
        themselves.
      </motion.p>
    </div>
  </section>
);

const PillarReels = () => (
  <section
    data-testid="pillars-reels"
    className="bg-cream pb-16 md:pb-24"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — Editorial Pillars · Reels
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          3 forthcoming
        </span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {PILLARS.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`pillar-reel-${p.slug}`}
            className="group cursor-pointer editorial-card"
          >
            <div className="relative aspect-[16/10] md:aspect-[4/5] w-full overflow-hidden bg-ink">
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-cream/40 bg-ink/30 backdrop-blur-sm text-cream group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-colors duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>

              {/* Top label */}
              <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-ink/45 backdrop-blur-sm px-2 py-1">
                Reel · Coming soon
              </span>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-display font-light text-cream text-2xl md:text-3xl leading-[1.05] tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 font-body font-light text-cream/80 text-sm leading-[1.5] max-w-md">
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

const RegionsRow = () => {
  const [notify, setNotify] = useState(null); // region name

  return (
    <>
      <section
        data-testid="regions-section"
        className="bg-cream pb-16 md:pb-24 border-t hairline pt-14 md:pt-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-12 border-b hairline pb-4">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Regions
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {REGIONS.length} regions
            </span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {REGIONS.map((r, i) => {
              const inner = (
                <>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    {!r.live && (
                      <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/90 px-2 py-0.5">
                        Soon
                      </span>
                    )}
                    {r.live && (
                      <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-forest px-2 py-0.5">
                        Live
                      </span>
                    )}
                    <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-ink/55 backdrop-blur-sm px-2 py-0.5">
                      {r.courses}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-display font-light text-ink text-base leading-[1.1] tracking-tight read-cta">
                      {r.name}
                    </h3>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                      {r.region}
                    </span>
                    <p className="mt-1 font-display italic font-light text-ink/60 text-xs leading-[1.3] hidden md:block">
                      {r.tagline}
                    </p>
                  </div>
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
                      className="block editorial-card"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setNotify(r.name)}
                      data-testid={`region-notify-${r.slug}`}
                      className="text-left w-full block editorial-card"
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

const MustReadCard = ({ a, i }) => {
  const Tag = a.live && a.href ? Link : "div";
  const props = a.live && a.href ? { to: a.href } : {};
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`article-${a.slug}`}
      className="group"
    >
      <Tag {...props} className="block editorial-card">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          <img
            src={a.image}
            alt={a.title}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              a.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/90 px-2 py-0.5">
            {a.pillar}
          </span>
          {a.pinned && (
            <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-gold px-2 py-0.5">
              Must
            </span>
          )}
          {!a.live && !a.pinned && (
            <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/90 px-2 py-0.5">
              Soon
            </span>
          )}
        </div>
        <div className="mt-3">
          <h3
            className={`font-display font-light leading-[1.15] tracking-tight text-base md:text-lg read-cta ${
              a.live ? "text-ink" : "text-ink/80"
            }`}
          >
            {a.title}
          </h3>
          <p className="mt-1.5 font-body font-light text-ink/60 text-xs md:text-sm leading-[1.5] hidden md:block">
            {a.excerpt}
          </p>
          <div className="mt-2.5 pt-2 border-t hairline flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted truncate">
              {a.author.split(" ")[0]}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
              {a.read}
            </span>
          </div>
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
      data-testid="must-reads"
      className="bg-cream pb-20 md:pb-28 border-t hairline pt-14 md:pt-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12 border-b hairline pb-4">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Must Reads
            </span>
            <motion.h2
              {...fade}
              className="mt-3 font-display font-light text-ink text-3xl md:text-4xl leading-[1.05] tracking-tight"
            >
              Editor's desk.
            </motion.h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <button type="button" data-testid="dropdown-pillar" onClick={() => setPillarOpen((v) => !v)} className="inline-flex items-center gap-3 px-4 py-2.5 border border-ink/25 hover:border-ink font-mono text-[10px] uppercase tracking-wide-editorial text-ink bg-cream">
                <span className="text-muted">Pillar</span>
                <span>{pillar}</span>
                <span className={`transition-transform duration-300 ${pillarOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {pillarOpen && (
                  <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="absolute z-20 right-0 mt-1 min-w-[220px] bg-cream border border-ink/20 shadow-lg">
                    {PILLAR_FILTERS.map((p) => (
                      <li key={p}>
                        <button type="button" onClick={() => onPillar(p)} data-testid={`dropdown-pillar-${p.toLowerCase().replace(/[^a-z]+/g, "-")}`} className={`w-full text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${pillar === p ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"}`}>{p}</button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button type="button" data-testid="dropdown-author" onClick={() => setAuthorOpen((v) => !v)} className="inline-flex items-center gap-3 px-4 py-2.5 border border-ink/25 hover:border-ink font-mono text-[10px] uppercase tracking-wide-editorial text-ink bg-cream">
                <span className="text-muted">Author</span>
                <span>{author}</span>
                <span className={`transition-transform duration-300 ${authorOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {authorOpen && (
                  <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="absolute z-20 right-0 mt-1 min-w-[220px] bg-cream border border-ink/20 shadow-lg">
                    {AUTHORS.map((a) => (
                      <li key={a}>
                        <button type="button" onClick={() => onAuthor(a)} data-testid={`dropdown-author-${a.toLowerCase().replace(/[^a-z]+/g, "-")}`} className={`w-full text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${author === a ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"}`}>{a}</button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {visible.length} / {filtered.length}
            </span>
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((a, i) => (<MustReadCard key={a.slug} a={a} i={i} />))}
          </ul>
        ) : (
          <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
            Nothing matches yet — try another filter.
          </p>
        )}

        {hasMore && (
          <div className="mt-10 md:mt-14 flex justify-center">
            <button type="button" onClick={() => setShown((s) => s + PAGE_SIZE)} data-testid="must-reads-load-more" className="group btn-primary inline-flex items-center gap-3 border border-ink/30 px-7 md:px-9 py-4 md:py-5 hover:bg-ink hover:text-cream transition-colors duration-500">
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">Load more</span>
              <span className="font-mono text-base transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Hero />
      <PillarReels />
      <RegionsRow />
      <MustReads />
    </main>
  );
};

export default Journal;
