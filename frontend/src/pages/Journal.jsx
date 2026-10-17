import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES } from "@/data/articles";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";

/* ───────────────── CATEGORY TAGGING ───────────────── */

const CATEGORY_MAP = {
  "the-concierge": ["how-to-plan-a-golf-trip-to-mexico"],
  "founders-journal": ["the-bachelor-trip-cabo"],
};

const articleHasCategory = (article, category) => {
  if (category === "all") return true;
  return (CATEGORY_MAP[category] || []).includes(article.slug);
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "the-concierge", label: "Travel Concierge" },
  { key: "founders-journal", label: "Founders Journal" },
];

/* Brief context per category — shown when a filter is selected */
const CATEGORY_CONTEXT = {
  all:
    "Every course review, golf trip guide, and insider take on golf in Mexico — all in one place.",
  "the-concierge":
    "Obsessive attention to detail for the traveling golfer. Insider intelligence, travel logistics, and the information you need to navigate your trip like a professional.",
  "founders-journal":
    "First-person field notes from Pablo and José — the trips, the people, and the decisions behind Golf in Mexico°.",
};

/* ───────────────── INTRO + FILTERS ───────────────── */

const JournalIntro = ({ category, setCategory }) => {
  const activeLabel = CATEGORIES.find((c) => c.key === category)?.label || "All";
  const context = CATEGORY_CONTEXT[category] || CATEGORY_CONTEXT.all;

  return (
    <section
      data-testid="journal-intro"
      className="bg-[var(--c-off-white)] pt-32 md:pt-40 pb-12 md:pb-16 border-b border-[var(--c-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <h1 className="font-display font-light text-[var(--c-text)] leading-[1.02] tracking-tight text-5xl md:text-7xl mb-10 md:mb-12">
          The Journal<span className="text-[var(--c-gold)]">.</span>
        </h1>
        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12" data-testid="journal-categories">
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

        {/* CONTEXT — changes with selected category */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                data-testid="category-context"
                className="font-body font-light text-[var(--c-text-mid)] text-lg md:text-xl leading-[1.7] max-w-[58ch]"
              >
                <span className="font-display italic text-[var(--c-gold)] not-italic-em">
                  {activeLabel}.
                </span>{" "}
                {context}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
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

/* ───────────────── ARTICLE CARD (framed) ───────────────── */

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
  useSeo({
    title: "The Journal: Mexico Golf Guides & Stories | GOLF° IN MEXICO°",
    description:
      "Editorial stories, trip playbooks, and course intelligence for golf in Mexico — written by people who plan and play it.",
    canonical: "/journal",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Journal", path: "/journal" },
    ]),
  });
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const validKeys = ["all", "the-concierge", "founders-journal"];
  const [category, setCategory] = useState(
    initialCategory && validKeys.includes(initialCategory) ? initialCategory : "all"
  );

  const filtered = useMemo(() => ARTICLES.filter((a) => articleHasCategory(a, category)), [category]);

  return (
    <main data-testid="page-journal" className="relative bg-[var(--c-off-white)] pb-0">
      <JournalIntro
        category={category}
        setCategory={setCategory}
      />

      {/* Article grid */}
      <section data-testid="journal-grid" className="pt-14 md:pt-20 pb-24 md:pb-32">
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
                New articles publish weekly, written by Pablo and José. Subscribe below and you&apos;ll be the first to know.
              </p>
            </div>
          ) : (
            <>
              {category === "all" && filtered[0]?.slug === "the-bachelor-trip-cabo" && (
                <FeaturedCard a={filtered[0]} />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {(category === "all" && filtered[0]?.slug === "the-bachelor-trip-cabo"
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
