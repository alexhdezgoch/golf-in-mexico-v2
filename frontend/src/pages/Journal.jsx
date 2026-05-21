import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ARTICLES, DESTINATION_ORDER } from "@/data/articles";

/* ───────────────── HERO ───────────────── */

const Hero = () => (
  <section
    data-testid="journal-hero"
    className="pt-40 md:pt-48 pb-20 md:pb-28"
  >
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-8"
      >
        Journal
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-4xl md:text-6xl lg:text-[5rem] max-w-[18ch]"
      >
        Quiet entries from <em className="italic text-[var(--c-gold)]">inside the ropes.</em>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-10 font-body text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-xl"
      >
        Travel essays, course encounters, and the slow unfolding of the
        Mexican season. Written between rounds. Read at your own pace.
      </motion.p>
    </div>
  </section>
);

/* ───────────────── ARTICLE CARD (auwa-style) ───────────────── */

const Card = ({ a }) => (
  <article data-testid={`journal-card-${a.slug}`}>
    <Link to={`/journal/${a.slug}`} className="group block">
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

/* ───────────────── DESTINATION SECTION ───────────────── */

const DestinationSection = ({ slug, label, articles, index }) => (
  <section
    data-testid={`journal-section-${slug}`}
    className="pt-24 md:pt-32 first:pt-0"
  >
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline justify-between mb-12 md:mb-16"
      >
        <h2 className="font-display font-normal text-[var(--c-text)] leading-tight tracking-tight text-2xl md:text-4xl">
          <span className="font-mono text-[var(--c-text-muted)] text-sm md:text-base mr-3 align-baseline">
            {String(index + 1).padStart(2, "0")} /
          </span>
          {label}.
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
          {articles.length} {articles.length === 1 ? "entry" : "entries"}
        </span>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
        {articles.map((a, i) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.85,
              delay: 0.08 * (i % 3),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Card a={a} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────── PULL QUOTE ───────────────── */

const PullQuote = () => (
  <section className="pt-32 md:pt-40 pb-12">
    <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display italic font-normal text-[var(--c-text-mid)] text-2xl md:text-3xl lg:text-4xl leading-[1.45]"
      >
        &ldquo;Every course in México tells you something — if you
        arrive quietly enough to listen.&rdquo;
      </motion.p>
    </div>
  </section>
);

/* ───────────────── CLOSING ───────────────── */

const Closing = () => (
  <section className="pt-20 md:pt-24 pb-32 md:pb-40">
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
        More to come
      </span>
      <h2 className="font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-3xl md:text-5xl max-w-[20ch] mx-auto">
        New entries arrive with the season.
      </h2>
      <Link
        to="/destinations"
        data-testid="journal-closing-cta"
        className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-green-mid)] hover:text-[var(--c-gold)] transition-colors duration-500"
      >
        Explore destinations
        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  </section>
);

/* ───────────────── PAGE ───────────────── */

const Journal = () => {
  const grouped = DESTINATION_ORDER.map((g) => ({
    ...g,
    articles: ARTICLES.filter((a) => a.destination === g.slug),
  })).filter((g) => g.articles.length > 0);

  return (
    <main data-testid="page-journal" className="relative bg-[var(--c-off-white)]">
      <Hero />
      {grouped.map((g, i) => (
        <DestinationSection
          key={g.slug}
          slug={g.slug}
          label={g.label}
          articles={g.articles}
          index={i}
        />
      ))}
      <PullQuote />
      <Closing />
    </main>
  );
};

export default Journal;
