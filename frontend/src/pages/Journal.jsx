import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ARTICLES,
  DESTINATIONS,
  TYPES,
  DESTINATION_ORDER,
  filterArticles,
  sortArticles,
} from "@/data/articles";

/* ---------------------------- BADGES & PILLS ---------------------------- */

const Badge = ({ children, variant = "default" }) => {
  const cls =
    variant === "property"
      ? "bg-gold text-ink"
      : variant === "outline"
      ? "bg-cream text-ink border border-ink/20"
      : variant === "ink"
      ? "bg-ink text-cream"
      : "bg-ink/8 text-ink";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wide-editorial ${cls}`}>
      {children}
    </span>
  );
};

const FilterPill = ({ active, label, onClick, testId }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    className={`inline-flex items-center rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wide-editorial transition-all duration-300 ${
      active
        ? "bg-ink text-cream border border-ink"
        : "bg-cream text-ink/65 border border-ink/15 hover:border-ink hover:text-ink"
    }`}
  >
    {label}
  </button>
);

/* ------------------------------- HEADER ------------------------------- */

const Header = () => (
  <section
    data-testid="journal-header"
    className="bg-cream pt-36 md:pt-44 pb-10 md:pb-14 border-b hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between border-b hairline pb-3 mb-8">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink">
          The Journal · Editorial Index
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          México · Volume 01
        </span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-light text-ink leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[6.5rem] max-w-5xl"
      >
        Field guides, <span className="italic text-gold">course by course.</span>
      </motion.h1>
      <p className="mt-6 font-body font-light text-ink/65 text-base md:text-lg max-w-2xl">
        Editorial guides organised by destination and purchase intent. No dates,
        no algorithms — just the playbook for the courses that matter.
      </p>
    </div>
  </section>
);

/* ------------------------------ FILTER BAR ------------------------------ */

const FilterBar = ({ dest, setDest, type, setType }) => (
  <section
    data-testid="journal-filters"
    className="sticky top-[64px] md:top-[80px] z-30 bg-cream/85 backdrop-blur-xl border-b hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 md:py-5">
      <div className="flex flex-col gap-3">
        {/* Row 1 — Destinations */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted shrink-0 mr-2">
            Destination
          </span>
          {DESTINATIONS.map((d) => (
            <FilterPill
              key={d.slug}
              active={dest === d.slug}
              label={d.label}
              testId={`pill-dest-${d.slug}`}
              onClick={() => setDest(d.slug)}
            />
          ))}
        </div>
        {/* Row 2 — Types */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted shrink-0 mr-2">
            Type
          </span>
          {TYPES.map((t) => (
            <FilterPill
              key={t.slug}
              active={type === t.slug}
              label={t.label}
              testId={`pill-type-${t.slug}`}
              onClick={() => setType(t.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------------------- FEATURED CARD ---------------------------- */

const FeaturedCard = ({ a }) => (
  <article data-testid={`featured-${a.slug}`}>
    <Link
      to={`/journal/${a.slug}`}
      className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-stretch"
    >
      {/* Left: text */}
      <div className="md:col-span-7 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-5">
          <Badge variant="outline">{a.destinationLabel}</Badge>
          {a.isGIMProperty ? (
            <Badge variant="property">GIM Property</Badge>
          ) : (
            <Badge variant="ink">{a.articleType}</Badge>
          )}
          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">— Featured</span>
        </div>
        <h2 className="font-display font-light text-ink leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-6xl group-hover:text-gold transition-colors duration-500">
          {a.title}
        </h2>
        <p className="mt-5 font-body font-light text-ink/70 text-base md:text-lg leading-relaxed max-w-xl">
          {a.excerpt}
        </p>
        <div className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          <span>{a.readTimeMinutes} min read</span>
          <span className="block w-1 h-1 rounded-full bg-ink/30" />
          <span>{a.searchVolume.toLocaleString()} searches/mo</span>
        </div>
      </div>
      {/* Right: image */}
      <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-[420px] overflow-hidden rounded-3xl bg-ink">
        <img
          src={a.heroImage}
          alt={a.title}
          className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
    </Link>
  </article>
);

/* ---------------------------- STANDARD CARD ---------------------------- */

const StandardCard = ({ a }) => {
  const isProp = a.isGIMProperty;
  return (
    <article data-testid={`article-card-${a.slug}`}>
      <Link
        to={`/journal/${a.slug}`}
        className={`group block rounded-2xl overflow-hidden bg-cream transition-all duration-300 ${
          isProp ? "border-2 border-gold" : "border border-ink/10 hover:border-ink/30"
        }`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          <img
            src={a.heroImage}
            alt={a.title}
            className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline">{a.destinationLabel}</Badge>
            {isProp ? (
              <Badge variant="property">GIM Property</Badge>
            ) : (
              <Badge>{a.articleType}</Badge>
            )}
          </div>
          <h3 className="font-display font-light text-ink leading-[1.2] tracking-tight text-lg line-clamp-2 group-hover:text-gold transition-colors duration-300">
            {a.title}
          </h3>
          <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
            <span>{a.readTimeMinutes} min</span>
            <span className="block w-0.5 h-0.5 rounded-full bg-ink/30" />
            <span>{a.searchVolume.toLocaleString()} / mo</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

/* --------------------------- DESTINATION GROUP --------------------------- */

const DestinationGroup = ({ slug, label, articles }) => (
  <section data-testid={`group-${slug}`} className="pt-14 md:pt-16">
    <div className="flex items-end justify-between border-b hairline pb-3 mb-8">
      <h2 className="font-display font-light text-ink leading-tight tracking-tight text-2xl md:text-4xl">
        {label}
      </h2>
      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
        {articles.length} {articles.length === 1 ? "article" : "articles"}
      </span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {articles.map((a) => (
        <StandardCard key={a.slug} a={a} />
      ))}
    </div>
  </section>
);

/* ----------------------- STICKY EMAIL CAPTURE BAR ----------------------- */

const StickyEmailBar = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) setSubmitted(true);
  };

  return (
    <div
      data-testid="journal-sticky-email"
      className="fixed bottom-0 left-0 right-0 z-40 bg-ink text-cream border-t border-cream/15 backdrop-blur-xl"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-3 md:py-4 flex items-center gap-3 md:gap-6">
        <span className="hidden md:inline font-display italic font-light text-cream text-lg md:text-xl flex-shrink-0">
          The free planning guide,
          <span className="text-gold"> on us.</span>
        </span>
        <span className="md:hidden font-mono text-[10px] uppercase tracking-wide-editorial text-gold flex-shrink-0">
          Free guide
        </span>
        {!submitted ? (
          <form onSubmit={onSubmit} className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="sticky-email-input"
              className="flex-1 min-w-0 bg-transparent border-b border-cream/30 focus:border-gold transition-colors text-cream placeholder:text-cream/40 font-body text-sm md:text-base py-1.5 focus:outline-none"
            />
            <button
              type="submit"
              data-testid="sticky-email-submit"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-4 md:px-5 py-2 md:py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial hover:bg-cream transition-colors duration-300 whitespace-nowrap"
            >
              Get the free guide
              <span>→</span>
            </button>
          </form>
        ) : (
          <span data-testid="sticky-email-success" className="font-display italic text-gold text-sm md:text-base">
            On its way. Check your inbox.
          </span>
        )}
      </div>
    </div>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  const [dest, setDest] = useState("all");
  const [type, setType] = useState("all");

  // Filter & sort
  const filtered = useMemo(() => sortArticles(filterArticles(ARTICLES, dest, type)), [dest, type]);

  // Featured = first result after filter
  const featured = filtered[0];
  const rest = filtered.slice(1);

  // Group rest by destination (planning always last)
  const grouped = useMemo(() => {
    const groups = DESTINATION_ORDER.map((g) => ({
      ...g,
      articles: rest.filter((a) => a.destination === g.slug),
    })).filter((g) => g.articles.length > 0);

    // If user filtered to a specific destination, keep group order but skip planning unless asked
    return groups;
  }, [rest]);

  return (
    <main data-testid="page-journal" className="relative bg-cream pb-32">
      <Header />
      <FilterBar dest={dest} setDest={setDest} type={type} setType={setType} />

      {/* Featured */}
      <section className="bg-cream pt-12 md:pt-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            {featured && (
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturedCard a={featured} />
              </motion.div>
            )}
            {!featured && (
              <p key="empty" className="py-24 text-center font-display italic font-light text-ink/55 text-2xl">
                Nothing matches yet — try another filter.
              </p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Grouped grid */}
      <section className="bg-cream pt-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {grouped.map((g) => (
            <DestinationGroup key={g.slug} slug={g.slug} label={g.label} articles={g.articles} />
          ))}
        </div>
      </section>

      <StickyEmailBar />
    </main>
  );
};

export default Journal;
