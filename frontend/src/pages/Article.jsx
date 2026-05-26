import { useState, useEffect, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getArticleBySlug, getRelatedArticles, ARTICLES } from "@/data/articles";

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

/* ----------------------------- BREADCRUMB ----------------------------- */

const Breadcrumb = ({ destination, destinationLabel, title }) => (
  <nav
    aria-label="Breadcrumb"
    data-testid="article-breadcrumb"
    className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
  >
    <ol className="flex flex-wrap items-center gap-2">
      <li>
        <Link to="/journal" className="hover:text-ink transition-colors">Golf in Mexico</Link>
      </li>
      <li aria-hidden>›</li>
      <li>
        <Link to={`/journal?destination=${destination}`} className="hover:text-ink transition-colors">
          {destinationLabel}
        </Link>
      </li>
      <li aria-hidden>›</li>
      <li className="text-ink/85 truncate max-w-[200px] md:max-w-none">{title}</li>
    </ol>
  </nav>
);

/* ------------------------------- INLINE CTA ------------------------------- */

const InlineCTA = ({ destinationLabel, testId }) => (
  <aside
    data-testid={testId}
    className="my-10 md:my-14 rounded-3xl border border-ink/15 bg-cream p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
  >
    <div>
      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
        — Ready to play
      </span>
      <h4 className="mt-2 font-display font-light text-ink text-2xl md:text-3xl leading-tight tracking-tight">
        Ready to plan your <span className="italic">{destinationLabel}</span> trip?
      </h4>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
      <button
        type="button"
        data-testid={`${testId}-whatsapp`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-5 py-3 font-mono text-[10px] uppercase tracking-wide-editorial hover:bg-ink transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.42ZM12.07 21.79h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.66-.24-.38a9.85 9.85 0 0 1-1.5-5.24c0-5.45 4.43-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.45 9.87-9.9 9.87Z" />
        </svg>
        WhatsApp
      </button>
      <button
        type="button"
        data-testid={`${testId}-tripplanner`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-5 py-3 font-mono text-[10px] uppercase tracking-wide-editorial hover:bg-gold hover:text-ink transition-colors"
      >
        Trip Planner →
      </button>
    </div>
  </aside>
);

/* ----------------------------- BODY RENDERER ----------------------------- */

const Body = ({ blocks, destinationLabel }) => {
  // Count H2s for inline CTA placement after #2 and #4
  let h2Count = 0;

  return (
    <div className="max-w-[680px] mx-auto px-6 md:px-0 font-body text-ink/85 text-base leading-[1.75]">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          h2Count += 1;
          const node = (
            <h2
              key={i}
              className="mt-10 md:mt-14 mb-4 font-display font-normal text-ink text-[22px] md:text-[26px] leading-tight tracking-tight"
            >
              {block.text}
            </h2>
          );
          // Inject inline CTA after second and fourth H2
          if (h2Count === 2 || h2Count === 4) {
            return (
              <div key={`wrap-${i}`}>
                {node}
              </div>
            );
          }
          return node;
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              className="mt-8 mb-3 font-body font-medium text-ink text-base md:text-[17px] tracking-tight"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "image") {
          // Edge-to-edge editorial image (breaks the 680px column)
          return (
            <figure key={i} className="my-12 md:my-16 -mx-6 md:-mx-[calc((100vw-680px)/2-60px)] md:max-w-[1200px] md:mx-auto">
              <div className="relative bg-forest overflow-hidden rounded-sm aspect-[16/10]">
                <img
                  src={block.src}
                  alt={block.alt || block.caption || ""}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55 italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.type === "pullquote") {
          return (
            <blockquote key={i} className="my-12 md:my-16 border-l-2 border-gold pl-6 md:pl-8 max-w-[640px]">
              <p className="font-display italic font-light text-ink text-2xl md:text-3xl leading-[1.4]">
                {block.text}
              </p>
              {block.cite && (
                <cite className="block mt-4 font-mono not-italic text-[10px] uppercase tracking-[0.16em] text-ink/55">
                  — {block.cite}
                </cite>
              )}
            </blockquote>
          );
        }
        if (block.type === "divider") {
          return (
            <div key={i} className="my-14 md:my-20 text-center text-gold font-mono text-lg tracking-[0.5em]">◆ ◆ ◆</div>
          );
        }
        // paragraph
        const p = (
          <p key={i} className="mt-4 first:mt-0">
            {block.text}
          </p>
        );
        // After the paragraph that follows the 2nd or 4th H2, render the CTA
        // (Simpler: render CTA right after each marked H2 paragraph block.)
        return p;
      })}

      {/* Inject CTAs at known positions: after 2nd & 4th H2 */}
      {h2Count >= 2 && <InlineCTA destinationLabel={destinationLabel} testId="inline-cta-1" />}
      {h2Count >= 4 && <InlineCTA destinationLabel={destinationLabel} testId="inline-cta-2" />}
    </div>
  );
};

/* ------------------------------- FAQ ------------------------------- */

const FAQ = ({ items }) => {
  const [open, setOpen] = useState(null);
  if (!items || items.length === 0) return null;
  return (
    <section data-testid="article-faq" className="max-w-[760px] mx-auto px-6 md:px-0 mt-14 md:mt-20">
      <h2 className="font-display font-normal text-ink text-2xl md:text-3xl mb-6 tracking-tight">
        Frequently asked
      </h2>
      <ul className="divide-y hairline border-t border-b hairline">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                data-testid={`faq-item-${i}`}
                className="w-full flex items-center justify-between gap-4 py-4 md:py-5 text-left"
              >
                <span className="font-display text-ink text-lg md:text-xl leading-snug pr-4">
                  {it.q}
                </span>
                <span className={`text-gold text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 font-body font-light text-ink/75 text-base leading-relaxed">
                      {it.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

/* --------------------------- CONTINUE READING --------------------------- */

const ContinueReading = ({ related, hubLabel, hubSlug }) => (
  <section data-testid="continue-reading" className="max-w-[1100px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
      — Continue reading
    </span>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
      <Link
        to={`/journal?destination=${hubSlug}`}
        data-testid="continue-hub"
        className="group block rounded-2xl border-2 border-ink bg-ink text-cream p-6 hover:border-gold transition-all duration-300"
      >
        <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-gold">Hub</span>
        <h3 className="mt-3 font-display font-light text-cream text-2xl md:text-3xl leading-tight tracking-tight group-hover:text-gold transition-colors">
          {hubLabel}°
        </h3>
        <p className="mt-2 font-body font-light text-cream/65 text-sm">
          All articles in this destination.
        </p>
        <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70 group-hover:text-gold transition-colors">
          Browse all →
        </span>
      </Link>
      {related.map((a) => (
        <Link
          key={a.slug}
          to={`/journal/${a.slug}`}
          data-testid={`continue-article-${a.slug}`}
          className="group block rounded-2xl border border-ink/15 bg-cream overflow-hidden hover:border-ink/40 transition-all duration-300"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
            <img
              src={a.heroImage}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          </div>
          <div className="p-5">
            <Badge>{a.articleType}</Badge>
            <h3 className="mt-3 font-display font-light text-ink text-xl leading-tight tracking-tight line-clamp-2 group-hover:text-gold transition-colors">
              {a.title}
            </h3>
            <span className="mt-3 inline-block font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
              {a.readTimeMinutes} min read
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

/* --------------------------- BOTTOM CTA --------------------------- */

const FooterCTA = ({ destinationLabel }) => (
  <section data-testid="article-footer-cta" className="mt-20 md:mt-32 bg-ink text-cream py-20 md:py-32">
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
        — Your move
      </span>
      <h2 className="mt-5 font-display font-light text-cream leading-[1] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-3xl mx-auto">
        Plan your <span className="italic text-gold">{destinationLabel}</span> golf trip.
      </h2>
      <p className="mt-6 font-body font-light text-cream/65 text-base md:text-lg max-w-xl mx-auto">
        Built around the courses you want to play and the tables you don&apos;t yet know.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          data-testid="footer-cta-tripplanner"
          className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-7 py-4 font-mono text-[11px] uppercase tracking-wide-editorial hover:bg-cream transition-colors"
        >
          Start planning →
        </button>
        <button
          type="button"
          data-testid="footer-cta-whatsapp"
          className="inline-flex items-center gap-2 rounded-full border border-cream/30 text-cream px-7 py-4 font-mono text-[11px] uppercase tracking-wide-editorial hover:bg-cream hover:text-ink transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.42ZM12.07 21.79h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.66-.24-.38a9.85 9.85 0 0 1-1.5-5.24c0-5.45 4.43-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.45 9.87-9.9 9.87Z" />
          </svg>
          WhatsApp us
        </button>
      </div>
    </div>
  </section>
);

/* --------------------- SCROLL-BASED EMAIL CAPTURE SLIDE --------------------- */

const ScrollEmailCapture = ({ slug }) => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const key = `gim-email-dismissed-${slug}`;
    try {
      const dismissedAt = Number(localStorage.getItem(key) || 0);
      if (dismissedAt && Date.now() - dismissedAt < 1000 * 60 * 60 * 24 * 7) return;
    } catch (e) {
      // ignore
    }

    const onScroll = () => {
      const h = document.documentElement;
      const scrollPct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (scrollPct >= 0.5) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(`gim-email-dismissed-${slug}`, String(Date.now()));
    } catch (e) {
      // ignore
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubmitted(true);
      setTimeout(dismiss, 2500);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          data-testid="scroll-email-capture"
          className="fixed bottom-20 right-4 md:right-8 z-40 w-[calc(100%-2rem)] md:w-[400px] bg-cream rounded-2xl border border-ink/15 shadow-2xl p-5 md:p-6"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            data-testid="scroll-email-dismiss"
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-ink/55 hover:text-ink hover:bg-ink/5 transition-colors"
          >
            ×
          </button>
          {!submitted ? (
            <>
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                Free guide
              </span>
              <h4 className="mt-2 font-display font-light text-ink text-xl md:text-2xl leading-tight tracking-tight">
                The México golf <span className="italic">planning guide</span>.
              </h4>
              <p className="mt-2 font-body font-light text-ink/65 text-sm">
                No spam. Only content worth your time.
              </p>
              <form onSubmit={onSubmit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-cream border-b border-ink/25 focus:border-gold focus:outline-none font-body text-sm py-1.5 text-ink placeholder:text-ink/35"
                />
                <button type="submit" className="rounded-full bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-wide-editorial hover:bg-gold hover:text-ink transition-colors">
                  Send →
                </button>
              </form>
            </>
          ) : (
            <p className="font-display italic text-gold text-lg py-3">
              On its way. Check your inbox.
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------- PAGE ------------------------------- */

const Article = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  // Hash-driven smooth scroll-to-top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [slug]);

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  const related = getRelatedArticles(article.relatedArticles);

  return (
    <main data-testid={`page-article-${article.slug}`} className="relative bg-cream pb-0">
      {/* SEO meta — react-helmet not installed; left as a TODO for integration phase */}

      {/* Top: breadcrumb */}
      <section className="pt-32 md:pt-40 pb-6 md:pb-8 bg-cream border-b hairline">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Breadcrumb
            destination={article.destination}
            destinationLabel={article.destinationLabel}
            title={article.title}
          />
        </div>
      </section>

      {/* Header */}
      <section data-testid="article-header" className="bg-cream pt-10 md:pt-14 pb-8 md:pb-12">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="outline">{article.destinationLabel}</Badge>
            {article.isGIMProperty ? (
              <Badge variant="property">GIM Property</Badge>
            ) : (
              <Badge variant="ink">{article.articleType}</Badge>
            )}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-ink leading-[1.04] tracking-tight text-4xl md:text-6xl lg:text-[5rem] max-w-4xl"
          >
            {article.h1}
          </motion.h1>
          <p className="mt-6 font-body font-light text-ink/65 text-lg md:text-xl max-w-3xl leading-relaxed">
            {article.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            <span>{article.readTimeMinutes} min read</span>
            <span className="block w-1 h-1 rounded-full bg-ink/30" />
            <span>{article.searchVolume.toLocaleString()} searches/mo</span>
            <span className="block w-1 h-1 rounded-full bg-ink/30" />
            <span>Updated {article.updated}</span>
          </div>
        </div>
        {/* Hero image */}
        <div className="mt-10 md:mt-14 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink">
            <img
              src={article.heroImage}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section data-testid="article-body" className="bg-cream py-12 md:py-16">
        <Body blocks={article.body} destinationLabel={article.destinationLabel} />
      </section>

      {/* FAQ (only if items) */}
      <FAQ items={article.faqItems} />

      {/* Continue reading */}
      <ContinueReading
        related={related}
        hubLabel={article.destinationLabel}
        hubSlug={article.destination}
      />

      {/* Footer CTA */}
      <FooterCTA destinationLabel={article.destinationLabel} />

      {/* Scroll-triggered email capture */}
      <ScrollEmailCapture slug={article.slug} />
    </main>
  );
};

export default Article;
