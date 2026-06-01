import { useState, useMemo, useRef } from "react";
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
    number: "01",
    title: "Golf",
    body:
      "Course reviews and insights from inside the ropes. The fairways, the design, the playability — documented with the same precision we use to scout a PGA Tour setup.",
    ctaCategory: "golf",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "beyond-the-course",
    number: "02",
    title: "Beyond the Course",
    body:
      "The true essence of the country beyond the 18th hole. World-class gastronomy, local hospitality, and cultural nuances you won't find on any other golf trip.",
    ctaCategory: "beyond-the-course",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "the-concierge",
    number: "03",
    title: "Travel Concierge",
    body:
      "Obsessive attention to detail for the traveling golfer. Insider intelligence, travel logistics, and the information you need to navigate your trip like a professional.",
    ctaCategory: "the-concierge",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "the-collective",
    number: "04",
    title: "The Collective",
    body:
      "Voices from inside the game — caddies, course directors, designers, chefs, and the operators who shape every world-class round in Mexico. Their stories, their craft.",
    ctaCategory: "the-collective",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1600&q=85",
  },
];

/* ───────────────── FILTER BAR (TOP) ───────────────── */

const FilterBar = ({ category, setCategory, search, setSearch }) => {
  const [open, setOpen] = useState(true);
  const activeLabel = CATEGORIES.find((c) => c.key === category)?.label || "All";

  return (
    <section
      data-testid="journal-filter-bar"
      className="bg-[var(--c-off-white)] border-b border-[var(--c-border)] pt-32 md:pt-36 pb-8 md:pb-10 sticky top-0 z-30 backdrop-blur-xl"
      style={{ backgroundColor: "rgba(248,245,240,0.92)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="filter-toggle"
            className="flex items-baseline gap-3 group"
          >
            <span className="font-display font-normal text-[var(--c-text)] text-xl md:text-2xl tracking-tight">
              Category
            </span>
            <span className="font-display italic text-[var(--c-gold)] text-lg md:text-xl">
              {activeLabel}
            </span>
            <span
              className={`text-[var(--c-text-muted)] transition-transform duration-300 text-base ${
                open ? "rotate-180" : ""
              }`}
            >
              ⌄
            </span>
          </button>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            data-testid="journal-search"
            className="hidden md:block w-72 bg-transparent border-b border-[var(--c-border)] focus:border-[var(--c-gold)] transition-colors text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base py-2 focus:outline-none"
          />
        </div>

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
                      className={`inline-flex items-center font-body text-sm md:text-base px-5 py-2.5 rounded-sm border transition-all duration-300 ${
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
                  className="w-full bg-transparent border-b border-[var(--c-border)] focus:border-[var(--c-gold)] transition-colors text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base py-2 focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ───────────────── INTRO + FOUR PILLARS SLIDER ───────────────── */

const PillarsIntro = ({ setCategory }) => {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-pillar-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section data-testid="journal-pillars" className="bg-[var(--c-off-white)] pt-14 md:pt-20 pb-12 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-6xl max-w-[20ch]"
        >
          Four editorial pillars guide <em className="italic text-[var(--c-gold)]">everything we publish.</em>
        </motion.h1>

        <div className="mt-10 md:mt-14 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous pillar"
            data-testid="pillar-prev"
            className="w-11 h-11 inline-flex items-center justify-center border border-[var(--c-border)] hover:border-[var(--c-text)] text-[var(--c-text)] transition-colors rounded-full"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next pillar"
            data-testid="pillar-next"
            className="w-11 h-11 inline-flex items-center justify-center border border-[var(--c-border)] hover:border-[var(--c-text)] text-[var(--c-text)] transition-colors rounded-full"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        data-testid="pillar-scroller"
        className="mt-6 md:mt-8 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-12 pb-6"
        style={{ scrollbarWidth: "none" }}
      >
        {PILLARS.map((p) => (
          <button
            key={p.id}
            type="button"
            data-pillar-card
            data-testid={`pillar-card-${p.id}`}
            onClick={() => {
              setCategory(p.ctaCategory);
              document.querySelector("[data-testid='journal-grid']")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="snap-start shrink-0 w-[78vw] sm:w-[60vw] md:w-[400px] text-left group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                {p.number}
              </span>
            </div>
            <h3 className="mt-5 font-display font-normal text-[var(--c-text)] text-2xl md:text-3xl leading-[1.15] tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 font-body font-light text-[var(--c-text-mid)] text-base leading-[1.7] max-w-[42ch]">
              {p.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-display italic text-[var(--c-green-deep)] text-base group-hover:text-[var(--c-gold)] transition-colors">
              Read
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>
        ))}
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
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-3 py-1.5 rounded-sm">
            Featured · Founders Journal
          </span>
        </div>
        <div className="lg:col-span-5">
          <h2 className="font-display font-light text-[var(--c-text)] leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-[3.25rem] mb-5 group-hover:text-[var(--c-green-mid)] transition-colors duration-500">
            {a.title}<span className="text-[var(--c-gold)]">.</span>
          </h2>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7] mb-7 max-w-[44ch]">
            {a.excerpt}
          </p>
          <span className="inline-flex items-center gap-3 font-display italic text-[var(--c-green-deep)] text-lg group-hover:gap-4 transition-all">
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
    <Link
      to={`/journal/${a.slug}`}
      className="group block h-full bg-white border border-[var(--c-border)] rounded-sm overflow-hidden hover:border-[var(--c-gold)] transition-colors duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--c-green-deep)]">
        <img
          src={a.heroImage}
          alt={a.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6 md:p-7">
        <h3 className="font-display font-normal text-[var(--c-text)] leading-[1.2] tracking-tight text-xl md:text-2xl group-hover:text-[var(--c-green-mid)] transition-colors duration-500">
          {a.title}
        </h3>
        <p className="mt-4 font-body font-light text-[var(--c-text-mid)] text-base leading-[1.65]">
          {a.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-display italic text-[var(--c-green-deep)] text-base group-hover:gap-3 transition-all">
          Read
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  </article>
);

/* ───────────────── PAGE ───────────────── */

const Journal = () => {
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
    <main data-testid="page-journal" className="relative bg-[var(--c-off-white)] pb-0">
      <FilterBar
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <PillarsIntro setCategory={setCategory} />

      {/* Article grid */}
      <section data-testid="journal-grid" className="pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div
              data-testid="journal-empty"
              className="py-24 md:py-32 text-center max-w-xl mx-auto"
            >
              <h3 className="font-display italic font-normal text-[var(--c-text)] text-2xl md:text-3xl leading-[1.3] mb-4">
                The first entries are being polished.
              </h3>
              <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7]">
                New articles publish weekly, written by Pablo, José, and our
                collective. Subscribe below and you&apos;ll be the first to know.
              </p>
            </div>
          ) : (
            <>
              {category === "all" && !search && filtered[0]?.slug === "the-bachelor-trip-cabo" && (
                <FeaturedCard a={filtered[0]} />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

      {/* GET IN TOUCH CTA */}
      <section data-testid="journal-get-in-touch" className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
            Get in <em className="italic text-[var(--c-gold)]">touch.</em>
          </h2>
          <p className="font-body font-light text-white/85 text-base md:text-lg leading-[1.75] mb-4 max-w-2xl mx-auto">
            Want to collaborate, share a story, or just talk golf?
          </p>
          <p className="font-body font-light text-white/85 text-base md:text-lg leading-[1.75] mb-10 max-w-2xl mx-auto">
            We&apos;re always looking for new courses to cover, people to interview, and stories worth telling.
          </p>
          <Link
            to="/contact"
            data-testid="journal-connect-cta"
            className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-9 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
          >
            Connect with us
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Journal;
