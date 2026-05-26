import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES } from "@/data/articles";

/* ───────────────── CATEGORY TAGGING ───────────────── */

const CATEGORY_MAP = {
  golf: [
    "solmar-golf-links",
    "golf-courses-cabo-san-lucas",
    "golf-courses-punta-mita",
    "golf-courses-mexico-city",
    "los-cabos-cabo-real-vs-cabo-del-sol",
    "los-cabos-luxury-packages",
    "punta-mita-packages",
    "mandarina-golf-course",
    "amanali-golf-club",
  ],
  "beyond-the-course": ["luxury-golf-vacation-mexico"],
  "the-concierge": ["how-to-plan-a-golf-trip-to-mexico", "mexico-city-planning"],
  "founders-journal": [],
};

const articleHasCategory = (article, category) => {
  if (category === "all") return true;
  return (CATEGORY_MAP[category] || []).includes(article.slug);
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "golf", label: "Golf" },
  { key: "beyond-the-course", label: "Beyond the Course" },
  { key: "the-concierge", label: "The Concierge" },
  { key: "founders-journal", label: "Founders Journal" },
];

/* ───────────────── PILLARS ───────────────── */

const PILLARS = [
  {
    id: "golf",
    number: "01 / 03",
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
    number: "02 / 03",
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
    number: "03 / 03",
    short: "The Concierge",
    title: "The Concierge",
    sub: "Zero friction, complete access.",
    body:
      "Obsessive attention to detail for the traveling golfer. Insider intelligence, travel logistics, and the exact information you need to navigate your trip like a professional.",
    ctaLabel: "Read The Concierge",
    ctaCategory: "the-concierge",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2000&q=85",
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
    <section data-testid="journal-header" className="pt-36 md:pt-44 pb-12 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Top label */}
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)] mb-10 md:mb-14">
          The Journal
        </span>

        {/* Intro block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20 md:mb-28"
        >
          <h1 className="font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-3xl md:text-5xl lg:text-[3.5rem] mb-8">
            Traveling México through a <em className="italic text-[var(--c-gold)]">golfer&apos;s lens.</em>
          </h1>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] mb-8 max-w-2xl">
            Founded on our firsthand perspective as a tour agent and a
            professional golfer, this space captures the raw essence of the
            country&apos;s landscape. A growing collective of industry leaders,
            colleagues, and creators who see the game differently.
          </p>
          <Link
            to="/trip-builder"
            data-testid="journal-intro-cta"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-green-mid)] hover:text-[var(--c-gold)] transition-colors duration-500"
          >
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            Build your trip with GIM
          </Link>
        </motion.div>

        {/* Pillar box — founders layout */}
        <div data-testid="journal-pillars" className="border-t border-[var(--c-border)] pt-12 md:pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              {/* LEFT — image with number */}
              <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="absolute inset-0 w-full h-full object-cover editorial-img"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-green-deep)]/15 via-transparent to-[var(--c-green-deep)]/40" />
                <span className="absolute top-5 left-5 md:top-7 md:left-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                  {pillar.number}
                </span>
                <span className="absolute bottom-5 right-5 md:bottom-7 md:right-7 font-display italic text-[var(--c-gold)] text-3xl md:text-4xl leading-none">
                  °
                </span>
              </div>

              {/* RIGHT — content */}
              <div className="md:col-span-7 md:pt-2">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-text-muted)] mb-4">
                  N° 0{PILLARS.findIndex((p) => p.id === pillar.id) + 1} — Pillar
                </span>
                <h2 className="font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-3xl md:text-5xl mb-3">
                  {pillar.title}
                </h2>
                <p className="font-display italic font-normal text-[var(--c-gold)] text-lg md:text-xl mb-6">
                  {pillar.sub}
                </p>
                <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-xl mb-10">
                  {pillar.body}
                </p>
                <button
                  type="button"
                  onClick={onCTA}
                  data-testid={`pillar-cta-${pillar.id}`}
                  className="group inline-flex items-center gap-3 border border-[var(--c-green-deep)] text-[var(--c-green-deep)] hover:bg-[var(--c-green-deep)] hover:text-[var(--c-off-white)] px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500"
                >
                  {pillar.ctaLabel}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom tabs */}
          <div
            data-testid="pillar-tabs"
            className="mt-12 md:mt-16 border-t border-[var(--c-border)] pt-5 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6"
          >
            {PILLARS.map((p, i) => {
              const isActive = p.id === activePillar;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePillar(p.id)}
                  data-testid={`pillar-tab-${p.id}`}
                  className={`text-left flex items-baseline gap-3 pt-4 border-t-2 transition-colors duration-500 ${
                    isActive
                      ? "border-[var(--c-gold)]"
                      : "border-transparent hover:border-[var(--c-border)]"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                      isActive ? "text-[var(--c-gold)]" : "text-[var(--c-text-muted)]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                      isActive ? "text-[var(--c-text)]" : "text-[var(--c-text-muted)]"
                    }`}
                  >
                    {p.short}
                  </span>
                </button>
              );
            })}
          </div>
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
    return ARTICLES.filter((a) => articleHasCategory(a, category)).filter((a) => {
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.destinationLabel.toLowerCase().includes(q)
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
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <p
              data-testid="journal-empty"
              className="py-24 text-center font-display italic font-normal text-[var(--c-text-muted)] text-xl md:text-2xl"
            >
              Nothing matches — try another filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
              {filtered.map((a, i) => (
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
          )}
        </div>
      </section>
    </main>
  );
};

export default Journal;
