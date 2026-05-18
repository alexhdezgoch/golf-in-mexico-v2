import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    tagline: "Tropical golf meets surf culture.",
    courses: "7+",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "cdmx",
    name: "Mexico City",
    region: "Valle de México",
    tagline: "Historic clubs at 7,350 ft.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=900&q=85",
    live: false,
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
    name: "Cancún / Mayan Riviera",
    region: "Quintana Roo",
    tagline: "Limestone fairways, Caribbean light.",
    courses: "10+",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
];

const PILLARS = [
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
  {
    slug: "way-we-started",
    title: "The way we started this journal.",
    excerpt: "An origin note from the founders — why this exists, and who it's for.",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Authors Journal",
    author: "Pablo De La Mora",
    read: "5 min",
    pinned: true,
  },
  {
    slug: "professional-experience",
    title: "Our professional experience in Golf in México.",
    excerpt: "A decade across tour environments — what it taught us.",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85",
    pillar: "Authors Journal",
    author: "Pablo De La Mora",
    read: "8 min",
    pinned: true,
  },
  {
    slug: "curated-network",
    title: "Our curated network of properties.",
    excerpt: "Why we don't sell from a catalogue.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    pillar: "Hospitality",
    author: "Pablo De La Mora",
    read: "9 min",
    pinned: true,
  },
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to plan a golf trip to México.",
    excerpt: "Tee times, transfers, courses — the playbook.",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85",
    pillar: "Region Guides",
    author: "Pablo De La Mora",
    read: "12 min",
    pinned: true,
  },
  {
    slug: "luxury-golf-vacation-mexico",
    title: "Luxury golf vacations in México.",
    excerpt: "What 'luxury' actually buys you here.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Hospitality",
    author: "Pablo De La Mora",
    read: "10 min",
    pinned: true,
  },
  {
    slug: "los-cabos-four-mornings",
    title: "Where to play in Los Cabos, hole by hole.",
    excerpt: "Diamante's Dunes at dawn, Cabo del Sol at sunset.",
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
    excerpt: "The only PGA Tour event in México.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    pillar: "Architecture",
    author: "José Islas",
    read: "11 min",
  },
  {
    slug: "agent-playbook",
    title: "The agent's playbook.",
    excerpt: "What you actually need: introductions, not allotments.",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85",
    pillar: "Region Guides",
    author: "Pablo De La Mora",
    read: "7 min",
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
  {
    slug: "punta-mita-tail",
    title: "Tail of the Whale.",
    excerpt: "Nicklaus's island green, the Pacific against the rocks.",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85",
    pillar: "Architecture",
    author: "José Islas",
    read: "8 min",
  },
];

const PILLAR_CARDS = [
  {
    title: "Golf & Nature",
    body: "Paspalum, ocean spray, altitude, jungle. How México's landscape writes every round before you do.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Mexican Uniqueness",
    body: "Hospitality, table, and culture — the parts of the round that no other country compresses into eighteen holes.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "People behind the game",
    body: "Caddies, architects, agronomists, and friends. The names that make every fairway worth playing.",
    image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1400&q=85",
  },
];

const PAGE_SIZE = 8;

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ----------------------------- SECTIONS ----------------------------- */

const Overview = () => (
  <section
    data-testid="journal-overview"
    className="bg-cream pt-44 md:pt-52 pb-20 md:pb-28"
  >
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-3">
        <motion.span
          {...fade}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
        >
          The Journal · Hub
        </motion.span>
      </div>
      <div className="col-span-12 md:col-span-9">
        <motion.h1
          {...fade}
          className="font-display font-light text-ink leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl"
        >
          Golf in México,{" "}
          <span className="italic">from Pacific cliffs to limestone fairways.</span>
        </motion.h1>

        <motion.div
          {...fade}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 font-body font-light text-ink/75 text-base md:text-[17px] leading-[1.75] max-w-none"
        >
          <p>
            From Los Cabos' Pacific cliffs to Cancún's limestone fairways and
            Mexico City's high-altitude clubs, the country boasts over fifty
            championship courses across five regions. Architects like Nicklaus,
            Norman, Woods, Love III, and Weiskopf have shaped México's golf
            identity.
          </p>
          <p>
            México's golf history began in the mid-1940s with the opening of
            the first championship course. The modern resort era arrived fifty
            years later — when renowned architects designed courses from the
            Baja desert to the Caribbean.
          </p>
          <p>
            Luxury golf vacations in México combine rounds with oceanfront
            suites and the finest Latin American cuisine. All-inclusive
            packages close the price gap with Arizona or Florida.
          </p>
          <p>
            This guide provides a comprehensive map of México's golf regions,
            with pillar articles and a national directory of every
            worth-the-round course — from the Pacific to the Caribbean, sea
            level to seven thousand feet.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const RegionsRow = () => (
  <section
    data-testid="regions-section"
    className="bg-cream pb-20 md:pb-28 border-t hairline pt-16 md:pt-20"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-5">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — Regions
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          {REGIONS.length} regions · México
        </span>
      </div>
      <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {REGIONS.map((r, i) => {
          const Tag = r.live ? Link : "div";
          const props = r.live ? { to: `/journal/${r.slug}` } : {};
          return (
            <motion.li
              key={r.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`region-${r.slug}`}
              className="group"
            >
              <Tag {...props} className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
                  <img
                    src={r.image}
                    alt={r.name}
                    className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      r.live ? "group-hover:scale-[1.04]" : ""
                    }`}
                  />
                  {!r.live && (
                    <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2 py-0.5">
                      Soon
                    </span>
                  )}
                  <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-ink/55 backdrop-blur-sm px-2 py-0.5">
                    {r.courses}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-display font-light text-ink text-base md:text-lg leading-[1.1] tracking-tight">
                    {r.name}
                  </h3>
                  <span className="mt-0.5 block font-mono text-[9px] md:text-[10px] uppercase tracking-wide-editorial text-muted">
                    {r.region}
                  </span>
                  <p className="mt-1 font-display italic font-light text-ink/60 text-xs md:text-sm leading-[1.3] hidden md:block">
                    {r.tagline}
                  </p>
                </div>
              </Tag>
            </motion.li>
          );
        })}
      </ul>
    </div>
  </section>
);

const MustReadCard = ({ a, i }) => {
  const Tag = a.live && a.href ? Link : "div";
  const props = a.live && a.href ? { to: a.href } : {};
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`article-${a.slug}`}
      className="group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          <img
            src={a.image}
            alt={a.title}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              a.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2 py-0.5">
            {a.pillar}
          </span>
          {a.pinned && (
            <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-gold px-2 py-0.5">
              Must
            </span>
          )}
          {!a.live && !a.pinned && (
            <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2 py-0.5">
              Soon
            </span>
          )}
        </div>
        <div className="mt-3 md:mt-4">
          <h3
            className={`font-display font-light leading-[1.15] tracking-tight text-base md:text-lg ${
              a.live ? "text-ink" : "text-ink/80"
            }`}
          >
            {a.title}
          </h3>
          <p className="mt-1.5 font-body font-light text-ink/60 text-xs md:text-sm leading-[1.55] hidden md:block">
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

  const onChangePillar = (p) => { setPillar(p); setShown(PAGE_SIZE); setPillarOpen(false); };
  const onChangeAuthor = (a) => { setAuthor(a); setShown(PAGE_SIZE); setAuthorOpen(false); };

  return (
    <section
      data-testid="must-reads"
      className="bg-cream pb-20 md:pb-28 border-t hairline pt-16 md:pt-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-5">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Must Reads
            </span>
            <motion.h2
              {...fade}
              className="mt-4 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl"
            >
              Editor's desk.
            </motion.h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <button
                type="button"
                data-testid="dropdown-pillar"
                onClick={() => setPillarOpen((v) => !v)}
                className="inline-flex items-center gap-3 px-4 py-2.5 border border-ink/25 hover:border-ink font-mono text-[10px] uppercase tracking-wide-editorial text-ink bg-cream"
              >
                <span className="text-muted">Pillar</span>
                <span>{pillar}</span>
                <span className={`transition-transform duration-300 ${pillarOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {pillarOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 right-0 mt-1 min-w-[220px] bg-cream border border-ink/20 shadow-lg"
                  >
                    {PILLARS.map((p) => (
                      <li key={p}>
                        <button
                          type="button"
                          onClick={() => onChangePillar(p)}
                          data-testid={`dropdown-pillar-${p.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          className={`w-full text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${
                            pillar === p ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"
                          }`}
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
                className="inline-flex items-center gap-3 px-4 py-2.5 border border-ink/25 hover:border-ink font-mono text-[10px] uppercase tracking-wide-editorial text-ink bg-cream"
              >
                <span className="text-muted">Author</span>
                <span>{author}</span>
                <span className={`transition-transform duration-300 ${authorOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {authorOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 right-0 mt-1 min-w-[220px] bg-cream border border-ink/20 shadow-lg"
                  >
                    {AUTHORS.map((a) => (
                      <li key={a}>
                        <button
                          type="button"
                          onClick={() => onChangeAuthor(a)}
                          data-testid={`dropdown-author-${a.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          className={`w-full text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${
                            author === a ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"
                          }`}
                        >
                          {a}
                        </button>
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
            {visible.map((a, i) => (
              <MustReadCard key={a.slug} a={a} i={i} />
            ))}
          </ul>
        ) : (
          <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
            Nothing matches yet — try another filter.
          </p>
        )}

        {hasMore && (
          <div className="mt-12 md:mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              data-testid="must-reads-load-more"
              className="group inline-flex items-center gap-3 border border-ink/30 px-7 md:px-9 py-4 md:py-5 hover:bg-ink hover:text-cream transition-colors duration-500"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                Load more
              </span>
              <span className="font-mono text-base transition-transform duration-500 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
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
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-5">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — Pillars
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          What we write about
        </span>
      </div>
      <ul className="grid grid-cols-12 gap-6 md:gap-10">
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
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-display font-light text-cream text-3xl md:text-4xl leading-[1.05] tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 font-body font-light text-cream/85 text-sm md:text-base leading-[1.65] max-w-md">
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
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Overview />
      <RegionsRow />
      <MustReads />
      <PillarsSection />
    </main>
  );
};

export default Journal;
