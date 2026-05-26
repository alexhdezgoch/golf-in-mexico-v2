import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES } from "@/data/articles";

/* ───────────────── CATEGORY TAGGING ───────────────── */

const CATEGORY_MAP = {
  golf: [],
  "beyond-the-course": [],
  "the-concierge": [],
  "the-collective": [],
  "founders-journal": ["the-bachelor-trip-cabo"],
};

const articleHasCategory = (article, category) => {
  if (category === "all") return true;
  return (CATEGORY_MAP[category] || []).includes(article.slug);
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "golf", label: "Golf" },
  { key: "beyond-the-course", label: "Beyond the Course" },
  { key: "the-concierge", label: "Travel Concierge" },
  { key: "the-collective", label: "The Collective" },
  { key: "founders-journal", label: "Founders Journal" },
];

/* ───────────────── PILLARS ───────────────── */

const PILLARS = [
  {
    id: "golf",
    number: "01 / 04",
    short: "Golf",
    title: "Golf",
    sub: "Radical honesty meets tour-level precision.",
    body:
      "Course reviews and insights from inside the ropes. We document the fairways, the design, and the playability with the exact same precision we use to scout a PGA Tour setup.",
    ctaLabel: "Read Golf Articles",
    ctaCategory: "golf",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: "beyond-the-course",
    number: "02 / 04",
    short: "Beyond the Course",
    title: "Beyond the Course",
    sub: "Defining Mexican uniqueness.",
    body:
      "The true essence of the country beyond the 18th hole. From world-class gastronomy to local hospitality, we highlight the cultural nuances and experiences you simply won't find on any other golf trip in the world.",
    ctaLabel: "Read Beyond the Course",
    ctaCategory: "beyond-the-course",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: "the-concierge",
    number: "03 / 04",
    short: "Travel Concierge",
    title: "Travel Concierge",
    sub: "Zero friction, complete access.",
    body:
      "Obsessive attention to detail for the traveling golfer. Insider intelligence, travel logistics, and the exact information you need to navigate your trip like a professional.",
    ctaLabel: "Read Travel Concierge",
    ctaCategory: "the-concierge",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: "the-collective",
    number: "04 / 04",
    short: "The Collective",
    title: "The Collective",
    sub: "Industry insiders, in their own words.",
    body:
      "A growing roster of voices from inside the game — caddies, course directors, designers, chefs, and the operators who shape every world-class round in México. Their stories, their craft, their perspective.",
    ctaLabel: "Read The Collective",
    ctaCategory: "the-collective",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85",
  },
];

/* ───────────────── HEADER ───────────────── */

const JournalHeader = ({ activePillar, setActivePillar, setCategory }) => {
  const pillar = PILLARS.find((p) => p.id === activePillar) || PILLARS[0];

  const onCTA = () => {
    setCategory(pillar.ctaCategory);
    document.querySelector("[data-testid='journal-grid']")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section data-testid="journal-header" className="pt-32 md:pt-36 pb-10 md:pb-14">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Top label */}
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)] mb-6 md:mb-8">
          The Journal
        </span>

        {/* Compact intro */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-16"
        >
          <h1 className="md:col-span-7 font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-2xl md:text-3xl lg:text-4xl">
            Traveling México through a <em className="italic text-[var(--c-gold)]">golfer&apos;s lens.</em>
          </h1>
          <div className="md:col-span-5 flex flex-col gap-4 md:pt-1">
            <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.7]">
              Four editorial pillars guide everything we publish — <em className="not-italic font-normal text-[var(--c-text)]">Golf</em>, <em className="not-italic font-normal text-[var(--c-text)]">Beyond the Course</em>, <em className="not-italic font-normal text-[var(--c-text)]">Travel Concierge</em>, and <em className="not-italic font-normal text-[var(--c-text)]">The Collective</em> — written by a tour agent, a professional golfer, and a growing roster of industry insiders who see the game differently.
            </p>
          </div>
        </motion.div>

        {/* Pillar tabs — top (founders style) */}
        <div
          data-testid="pillar-tabs"
          role="tablist"
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 border-b border-[var(--c-border)] pb-5 md:pb-6"
        >
          {PILLARS.map((p, i) => {
            const isActive = p.id === activePillar;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActivePillar(p.id)}
                data-testid={`pillar-tab-${p.id}`}
                className={`text-left flex items-center gap-2 md:gap-3 pt-3 border-t-2 transition-colors duration-500 ${
                  isActive ? "border-[var(--c-gold)]" : "border-transparent hover:border-[var(--c-border)]"
                }`}
              >
                <span
                  className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] ${
                    isActive ? "text-[var(--c-gold)]" : "text-[var(--c-text-muted)]"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`font-display font-normal text-sm md:text-lg tracking-tight truncate ${
                    isActive ? "text-[var(--c-text)]" : "text-[var(--c-text-muted)] group-hover:text-[var(--c-text)]"
                  }`}
                >
                  {p.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pillar panel — compact, founders-grid 3/9 */}
        <div className="mt-8 md:mt-10 min-h-[280px] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-6 md:gap-10"
            >
              {/* Left meta — small image + number + accent */}
              <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
                <div className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-[180px] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover editorial-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-green-deep)]/15 via-transparent to-[var(--c-green-deep)]/40" />
                  <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/90">
                    {pillar.number}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
                  N° 0{PILLARS.findIndex((p) => p.id === pillar.id) + 1} — Pillar
                </span>
              </div>

              {/* Right content */}
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-2xl md:text-4xl">
                  {pillar.title}
                </h2>
                <p className="mt-2 font-display italic font-normal text-[var(--c-gold)] text-base md:text-lg">
                  {pillar.sub}
                </p>
                <p className="mt-5 md:mt-6 font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.7] max-w-2xl">
                  {pillar.body}
                </p>
                <button
                  type="button"
                  onClick={onCTA}
                  data-testid={`pillar-cta-${pillar.id}`}
                  className="group mt-7 md:mt-8 inline-flex items-center gap-3 border border-[var(--c-green-deep)] text-[var(--c-green-deep)] hover:bg-[var(--c-green-deep)] hover:text-[var(--c-off-white)] px-6 py-3 rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] transition-colors duration-500"
                >
                  {pillar.ctaLabel}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── FILTER BAR + SEARCH ───────────────── */

const FilterBar = ({ category, setCategory, search, setSearch }) => {
  const [open, setOpen] = useState(true);
  const activeLabel = CATEGORIES.find((c) => c.key === category)?.label || "All";

  return (
    <section
      data-testid="journal-filter-bar"
      className="bg-[var(--c-off-white)] border-y border-[var(--c-border)] py-8 md:py-10 sticky top-[60px] md:top-[68px] z-30 backdrop-blur-xl"
      style={{ backgroundColor: "rgba(248,245,240,0.92)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="filter-toggle"
            className="flex items-baseline gap-3 group"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-text-muted)]">
              Category
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text)] group-hover:text-[var(--c-gold)] transition-colors">
              {activeLabel}
            </span>
            <span
              className={`font-mono text-[10px] text-[var(--c-text-muted)] transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              ∧
            </span>
          </button>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            data-testid="journal-search"
            className="hidden md:block w-72 bg-transparent border-b border-[var(--c-border)] focus:border-[var(--c-gold)] transition-colors text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm py-2 focus:outline-none"
          />
        </div>

        {/* Filter pills */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 md:gap-3 pb-1">
                {CATEGORIES.map((c) => {
                  const isActive = c.key === category;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setCategory(c.key)}
                      data-testid={`category-filter-${c.key}`}
                      className={`inline-flex items-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-sm border transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--c-green-deep)] text-[var(--c-off-white)] border-[var(--c-green-deep)]"
                          : "bg-transparent text-[var(--c-text-mid)] border-[var(--c-border)] hover:border-[var(--c-text)] hover:text-[var(--c-text)]"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Mobile search */}
              <div className="md:hidden pt-4">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  data-testid="journal-search-mobile"
                  className="w-full bg-transparent border-b border-[var(--c-border)] focus:border-[var(--c-gold)] transition-colors text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm py-2 focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ───────────────── FEATURED HERO CARD ───────────────── */

const FeaturedCard = ({ a }) => (
  <article data-testid={`journal-featured-${a.slug}`} className="mb-16 md:mb-24">
    <Link to={`/journal/${a.slug}`} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">
        <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
          <img
            src={a.heroImage}
            alt={a.title}
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-1.5 rounded-sm">
            Featured · Founders Journal
          </span>
        </div>
        <div className="lg:col-span-5">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] mb-4">
            {a.destinationLabel} · {a.readTimeMinutes} min read
          </span>
          <h2 className="font-display font-light text-[var(--c-text)] leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-[3.25rem] mb-5 group-hover:text-[var(--c-green-mid)] transition-colors duration-500">
            {a.title}<span className="text-[var(--c-gold)]">.</span>
          </h2>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7] mb-7 max-w-[44ch]">
            {a.excerpt}
          </p>
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-green-deep)] group-hover:gap-4 transition-all">
            Read the journal entry
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  </article>
);

/* ───────────────── ARTICLE CARD ───────────────── */

const Card = ({ a }) => (
  <article data-testid={`journal-card-${a.slug}`} className="h-full">
    <Link to={`/journal/${a.slug}`} className="group block h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
        <img
          src={a.heroImage}
          alt={a.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="pt-6 md:pt-7">
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] mb-3">
          {a.destinationLabel}
        </span>
        <h3 className="font-display font-normal text-[var(--c-text)] leading-[1.25] tracking-tight text-xl md:text-2xl max-w-[22ch] group-hover:text-[var(--c-green-mid)] transition-colors duration-500">
          {a.title}
        </h3>
        <p className="mt-3 font-body text-[var(--c-text-muted)] text-sm md:text-[15px] leading-[1.65] max-w-[34ch] line-clamp-2">
          {a.excerpt}
        </p>
      </div>
    </Link>
  </article>
);

/* ───────────────── PAGE ───────────────── */

const Journal = () => {
  const [activePillar, setActivePillar] = useState("golf");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (!articleHasCategory(a, category)) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        (a.excerpt || "").toLowerCase().includes(q) ||
        (a.destinationLabel || "").toLowerCase().includes(q)
      );
    });
  }, [category, search]);

  return (
    <main data-testid="page-journal" className="relative bg-[var(--c-off-white)] pb-24 md:pb-32">
      <JournalHeader
        activePillar={activePillar}
        setActivePillar={setActivePillar}
        setCategory={setCategory}
      />
      <FilterBar
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      {/* Article grid */}
      <section data-testid="journal-grid" className="pt-12 md:pt-16">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div
              data-testid="journal-empty"
              className="py-24 md:py-32 text-center max-w-xl mx-auto"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)] mb-6">
                Coming soon
              </span>
              <h3 className="font-display italic font-normal text-[var(--c-text)] text-2xl md:text-3xl leading-[1.3] mb-4">
                The first entries are being polished.
              </h3>
              <p className="font-body font-light text-[var(--c-text-muted)] text-sm md:text-base leading-[1.7]">
                New articles publish weekly, written by Pablo, José, and our
                collective. Subscribe below and you&apos;ll be the first to know.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Bachelor Trip article — only when 'all' is selected */}
              {category === "all" && !search && filtered[0]?.slug === "the-bachelor-trip-cabo" && (
                <FeaturedCard a={filtered[0]} />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-20">
                {(category === "all" && !search && filtered[0]?.slug === "the-bachelor-trip-cabo"
                  ? filtered.slice(1)
                  : filtered
                ).map((a, i) => (
                  <motion.div
                    key={a.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.06 * (i % 6),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Card a={a} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Journal;
