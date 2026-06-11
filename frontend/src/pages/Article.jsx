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
                The Mexico golf <span className="italic">planning guide</span>.
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

/* ───────────────── EXPLORE BY PILLAR — horizontal carousel ─────────────────
   Placeholder: one card per editorial pillar. Each links to the filtered
   Journal view. Once real posts are published, this can be swapped for
   per-pillar latest articles.
   ───────────────────────────────────────────────────────────────────────── */

const RECOMMENDED = [
  {
    title: "Golf",
    excerpt: "Gameplay, courses, design, history. The craft of the game in Mexico.",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/xzs0k4px_JOSE%20PHOTO1.jpeg",
    href: "/journal?category=golf",
  },
  {
    title: "Beyond the Course",
    excerpt: "Culture, food, design — the world that surrounds the round.",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/g6r7fp45_GOLFINMEXICO-062.jpg",
    href: "/journal?category=beyond-the-course",
  },
  {
    title: "Travel Concierge",
    excerpt: "Strategy briefs for booking the right course, season, and stay.",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wmultbm_DJI_0048.jpeg",
    href: "/journal?category=the-concierge",
  },
  {
    title: "The Collective",
    excerpt: "Voices from the people building golf in Mexico — operators, members, locals.",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/fhv2viqt_D14F99BA-7F14-4273-BCD5-EF597DF7F5CB_1_105_c.jpeg",
    href: "/journal?category=the-collective",
  },
  {
    title: "Founders Journal",
    excerpt: "Notes from Pablo and José — long-form essays on the trips that built GIM.",
    image: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wyp4brb_CABO%20PHOTO.png",
    href: "/journal?category=founders-journal",
  },
];

const RecommendedReads = () => {
  const scrollerRef = useRef(null);
  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-rr-card]");
    const distance = card ? card.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <section
      data-testid="recommended-reads"
      aria-label="Recommended reads"
      className="bg-cream py-24 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">
        {/* Heading column */}
        <div className="px-6 md:px-12 lg:pl-12 lg:pr-0">
          <h2 className="font-display font-light text-ink text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.1] tracking-tight mb-6">
            Explore by Pillar
          </h2>
          <p className="font-body font-light text-ink/70 text-sm md:text-base leading-[1.65] mb-8 max-w-[28ch]">
            Five editorial pillars guide everything we publish. Pick a thread and follow it.
          </p>
          <Link
            to="/journal"
            data-testid="rr-view-all"
            className="inline-flex items-center gap-2 bg-ink text-cream pl-6 pr-5 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-gold hover:text-ink transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollerRef}
            data-testid="rr-scroller"
            className="flex gap-6 overflow-x-auto pb-2 pr-6 md:pr-12 pl-6 lg:pl-0 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {RECOMMENDED.map((r, i) => (
              <Link
                key={i}
                to={r.href}
                data-rr-card
                data-testid={`rr-card-${i}`}
                className="group flex-none w-[260px] sm:w-[300px] md:w-[340px] snap-start"
              >
                <div className="relative aspect-[3/5] overflow-hidden bg-ink mb-5 rounded-sm">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="font-display font-light text-ink text-xl md:text-2xl leading-[1.15] tracking-tight mb-3 group-hover:text-gold transition-colors">
                  {r.title}
                </h3>
                <p className="font-body font-light text-ink/65 text-sm md:text-base leading-[1.55] max-w-[30ch]">
                  {r.excerpt}
                </p>
              </Link>
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Scroll right"
            data-testid="rr-next"
            onClick={() => scrollBy(1)}
            className="hidden md:flex absolute right-4 top-[28%] -translate-y-1/2 w-12 h-12 rounded-full bg-ink text-cream items-center justify-center hover:bg-gold hover:text-ink transition-colors shadow-lg"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          {/* Left arrow */}
          <button
            type="button"
            aria-label="Scroll left"
            data-testid="rr-prev"
            onClick={() => scrollBy(-1)}
            className="hidden md:flex absolute left-4 top-[28%] -translate-y-1/2 w-12 h-12 rounded-full bg-ink/85 text-cream items-center justify-center hover:bg-gold hover:text-ink transition-colors shadow-lg"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────── ARTICLE ───────────────────────────── */
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
      {/* ═════════ HERO — Full-bleed photo + minimal type (matches Destinations) ═════════ */}
      <header
        data-testid="article-hero"
        className="relative text-white overflow-hidden bg-[#0a1510]"
      >
        <img
          src={article.heroImage}
          alt={article.title}
          loading="eager"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.92) saturate(1.02)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(10,21,16,0.88) 0%, rgba(10,21,16,0.72) 35%, rgba(10,21,16,0.32) 65%, rgba(10,21,16,0.18) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,21,16,0.6) 0%, rgba(10,21,16,0) 100%)",
          }}
        />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          data-testid="article-breadcrumb"
          className="relative z-10 pt-32 md:pt-36 max-w-[1200px] mx-auto px-6 md:px-12 pb-6"
        >
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            <li><Link to="/" className="hover:text-[var(--c-gold)] transition-colors">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/journal" className="hover:text-[var(--c-gold)] transition-colors">Journal</Link></li>
            <li aria-hidden>›</li>
            <li className="text-[var(--c-gold)] truncate max-w-[260px] md:max-w-none">{article.destinationLabel}</li>
          </ol>
        </nav>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-20 md:pb-28 min-h-[60vh] md:min-h-[68vh] flex flex-col justify-end">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-white tracking-tight text-3xl md:text-5xl lg:text-[3.75rem] leading-[1.08] max-w-[22ch]"
            style={{ textShadow: "0 2px 24px rgba(10,21,16,0.45)" }}
          >
            {article.h1}
          </motion.h1>
          {article.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-8 font-body font-light text-white/85 text-base md:text-xl leading-[1.6] max-w-[640px]"
              style={{ textShadow: "0 1px 12px rgba(10,21,16,0.5)" }}
            >
              {article.subtitle}
            </motion.p>
          )}
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
            {article.readTimeMinutes} min read · Updated {article.updated}
          </p>

          {article.author && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-testid="article-byline"
              className="mt-6 flex items-center gap-4"
            >
              <img
                src={article.author.photo}
                alt={article.author.name}
                loading="lazy"
                data-testid="article-byline-photo"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              />
              <div className="leading-tight">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 mb-1">
                  Words by
                </p>
                <p
                  className="font-display text-white text-base md:text-lg"
                  data-testid="article-byline-name"
                >
                  {article.author.name}
                </p>
                {article.author.role && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-gold)] mt-0.5">
                    {article.author.role}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Body */}
      <section data-testid="article-body" className="bg-cream py-12 md:py-16">
        <Body blocks={article.body} destinationLabel={article.destinationLabel} />
      </section>

      {/* Recommended Reads — horizontal scroll carousel */}
      <RecommendedReads />

      {/* Scroll-triggered email capture */}
      <ScrollEmailCapture slug={article.slug} />
    </main>
  );
};

export default Article;
