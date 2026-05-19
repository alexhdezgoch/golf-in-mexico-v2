import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HorizontalSlider from "@/components/HorizontalSlider";

/* ------------------------------ DATA ------------------------------ */

const PILLAR_FILTERS = [
  "All",
  "Authors Journal",
  "Hospitality",
  "Region Guides",
  "Best Food",
  "Architecture",
  "Golf & Nature",
];

const AUTHORS = ["All", "Pablo De La Mora", "José Islas", "Golf In Mexico"];

const ARTICLES = [
  {
    slug: "why-pablo-started-this",
    title: "Why Pablo started this.",
    excerpt:
      "México is not a destination — it is an immersion. A founder's note on why we'd rather write than sell.",
    image:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1600&q=85",
    pillar: "Authors Journal",
    author: "Pablo De La Mora",
    read: "5 min",
    featured: true,
  },
  {
    slug: "why-jose-started-this",
    title: "Why José started this.",
    excerpt:
      "From the U.S. Amateur to the bunkers of Mayakoba — a player's note on the México that shaped his eye for the game.",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1600&q=85",
    pillar: "Authors Journal",
    author: "José Islas",
    read: "6 min",
  },
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to plan a golf trip to México.",
    excerpt:
      "The playbook for a frictionless week — courses, table, hotel, transit.",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1600&q=85",
    pillar: "Region Guides",
    author: "Golf In Mexico",
    read: "12 min",
  },
  {
    slug: "luxury-golf-vacation-mexico",
    title: "Luxury golf vacations in México.",
    excerpt: "What 'luxury' actually buys you here — and what it doesn't.",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85",
    pillar: "Hospitality",
    author: "Golf In Mexico",
    read: "10 min",
  },
];

const ISSUES = [
  {
    no: "N°01",
    title: "Founders' Volume",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=900&q=85",
    palette: "#2C4A2C",
  },
  {
    no: "N°02",
    title: "Forthcoming · Spring",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=900&q=85",
    palette: "#C4A24E",
  },
  {
    no: "N°03",
    title: "Forthcoming · Summer",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85",
    palette: "#1A1A18",
  },
  {
    no: "N°04",
    title: "Forthcoming · Fall",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85",
    palette: "#2C4A2C",
  },
  {
    no: "N°05",
    title: "Forthcoming · Winter",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=900&q=85",
    palette: "#C4A24E",
  },
  {
    no: "N°06",
    title: "Forthcoming · Annual",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=900&q=85",
    palette: "#1A1A18",
  },
];

const HIGHLIGHTS = [
  {
    slug: "founders-note",
    title: "Founders' Note",
    sub: "Why we'd rather write than sell",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    cta: "Read",
    href: "#editors-desk",
  },
  {
    slug: "destination-guides",
    title: "Destination Guides",
    sub: "Six regions, written from the courses themselves",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85",
    cta: "Explore",
    href: "/destinations",
  },
  {
    slug: "current-issue",
    title: "GIM N°01",
    sub: "Read the current issue",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    cta: "Features",
    href: "#editors-desk",
  },
];

/* ------------------------- HERO (compact) ------------------------- */

const Hero = () => (
  <section
    data-testid="journal-hero"
    className="bg-cream pt-36 md:pt-44 pb-12 md:pb-16"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between border-b hairline pb-3 mb-8">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink">
          The Journal · Volume 01
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          México · 2026
        </span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-light text-ink leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[6.5rem] max-w-5xl"
      >
        Editorial stories, <span className="italic text-gold">from the courses themselves.</span>
      </motion.h1>
    </div>
  </section>
);

/* ------------------------- HIGHLIGHTS (3 cards) ------------------------- */

const Highlights = () => (
  <section data-testid="journal-highlights" className="bg-cream pb-16 md:pb-24">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {HIGHLIGHTS.map((h, i) => {
          const isExternal = h.href.startsWith("/") || h.href.startsWith("http");
          const inner = (
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-ink">
              <img
                src={h.image}
                alt={h.title}
                className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="font-display font-light text-cream text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
                  {h.title}
                </h3>
                <p className="mt-3 font-display italic font-light text-cream/85 text-sm md:text-base max-w-xs leading-snug">
                  {h.sub}
                </p>
                <span className="mt-5 font-display italic text-cream text-sm md:text-base editorial-link">
                  {h.cta}
                </span>
              </div>
            </div>
          );
          return (
            <motion.div
              key={h.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`highlight-${h.slug}`}
            >
              {isExternal && h.href.startsWith("/") ? (
                <Link to={h.href}>{inner}</Link>
              ) : (
                <a href={h.href}>{inner}</a>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------- CATEGORY FILTER ------------------------- */

const CategoryBar = ({ pillar, setPillar, author, setAuthor }) => {
  const [pillarOpen, setPillarOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);

  return (
    <section data-testid="journal-category" className="bg-cream border-t hairline border-b hairline">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 md:py-7 flex flex-wrap items-center gap-x-10 gap-y-4">
        {/* Pillar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setPillarOpen((v) => !v); setAuthorOpen(false); }}
            data-testid="dropdown-pillar"
            className="inline-flex items-center gap-3 font-mono text-[11px] md:text-[12px] uppercase tracking-wide-editorial text-ink"
          >
            <span className="text-muted">Category</span>
            <span className="font-semibold">{pillar}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" className={`transition-transform duration-300 ${pillarOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <AnimatePresence>
            {pillarOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 left-0 mt-3 min-w-[240px] bg-cream border border-ink/15 shadow-2xl rounded-2xl overflow-hidden p-1.5"
              >
                {PILLAR_FILTERS.map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => { setPillar(p); setPillarOpen(false); }}
                      data-testid={`dropdown-pillar-${p.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${pillar === p ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"}`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <span className="hidden md:block h-3 w-px bg-ink/20" />

        {/* Author */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setAuthorOpen((v) => !v); setPillarOpen(false); }}
            data-testid="dropdown-author"
            className="inline-flex items-center gap-3 font-mono text-[11px] md:text-[12px] uppercase tracking-wide-editorial text-ink"
          >
            <span className="text-muted">Author</span>
            <span className="font-semibold">{author}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" className={`transition-transform duration-300 ${authorOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <AnimatePresence>
            {authorOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 left-0 mt-3 min-w-[240px] bg-cream border border-ink/15 shadow-2xl rounded-2xl overflow-hidden p-1.5"
              >
                {AUTHORS.map((a) => (
                  <li key={a}>
                    <button
                      type="button"
                      onClick={() => { setAuthor(a); setAuthorOpen(false); }}
                      data-testid={`dropdown-author-${a.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${author === a ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5"}`}
                    >
                      {a}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ------------------------- EDITOR'S DESK (slider) ------------------------- */

const EditorArticleCard = ({ a }) => (
  <article
    data-testid={`article-${a.slug}`}
    className="shrink-0 snap-start w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] group"
  >
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-ink">
      <img
        src={a.image}
        alt={a.title}
        className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />
    </div>
    <h3 className="mt-5 font-display font-light text-ink text-2xl md:text-3xl leading-[1.1] tracking-tight">
      {a.title.replace(/\.$/, "")}
    </h3>
    <p className="mt-3 font-display italic font-light text-ink/75 text-sm md:text-base leading-snug">
      {a.excerpt}
    </p>
    <div className="mt-4 flex items-center justify-between">
      <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">{a.author}</span>
      <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">{a.read}</span>
    </div>
  </article>
);

const EditorsDesk = ({ articles }) => (
  <section id="editors-desk" data-testid="editors-desk" className="bg-cream pt-20 md:pt-28 pb-12 md:pb-16">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <h2 className="font-display font-light text-ink leading-tight tracking-tight text-3xl md:text-5xl lg:text-6xl">
            Editor's Desk: N°01
          </h2>
          <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-base">
            Must-reads from the new volume
          </p>
        </div>
        <a
          href="#editors-desk"
          className="hidden md:inline font-display italic text-ink/80 text-base md:text-lg editorial-link"
        >
          All Features
        </a>
      </div>

      {articles.length > 0 ? (
        <HorizontalSlider testId="editors-desk-slider" arrowOffset={-80}>
          {articles.map((a) => (
            <EditorArticleCard key={a.slug} a={a} />
          ))}
        </HorizontalSlider>
      ) : (
        <p className="py-12 text-center font-display italic font-light text-ink/55 text-xl">
          Nothing matches yet — try another filter.
        </p>
      )}
    </div>
  </section>
);

/* ------------------------- LONG READS ------------------------- */

const LongReads = ({ articles }) => (
  <section data-testid="long-reads" className="bg-cream pt-12 md:pt-16 pb-16 md:pb-24">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left meta */}
        <div className="md:col-span-3 md:pt-12">
          <h2 className="font-display font-light text-ink leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
            Long Reads
          </h2>
          <p className="mt-3 font-body font-light text-ink/65 text-sm md:text-base">
            Stories for a rain delay
          </p>
          <button
            type="button"
            data-testid="long-reads-all"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 font-mono text-[10px] uppercase tracking-wide-editorial hover:bg-gold hover:text-ink transition-colors duration-500"
          >
            All Features
          </button>
        </div>
        {/* Right slider */}
        <div className="md:col-span-9">
          {articles.length > 0 ? (
            <HorizontalSlider testId="long-reads-slider" arrowOffset={-80}>
              {articles.map((a) => (
                <EditorArticleCard key={`lr-${a.slug}`} a={a} />
              ))}
            </HorizontalSlider>
          ) : (
            <p className="py-12 text-center font-display italic font-light text-ink/55 text-xl">
              Nothing matches yet — try another filter.
            </p>
          )}
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------- PAST ISSUES (covers) ------------------------- */

const IssueCard = ({ issue }) => (
  <div
    data-testid={`issue-${issue.no.replace(/[^a-z0-9]/gi, "")}`}
    className="shrink-0 snap-start w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] group"
  >
    <div
      className="relative aspect-[3/5] w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: issue.palette }}
    >
      <img
        src={issue.image}
        alt={`${issue.no} ${issue.title}`}
        className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <span className="absolute top-3 right-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-cream/95">
        <span className="font-display italic text-ink text-xs">J</span>
      </span>
    </div>
    <h3 className="mt-4 font-display font-light text-ink text-xl md:text-2xl">{issue.no}</h3>
    <p className="mt-1 font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
      {issue.title}
    </p>
    <a
      href="#editors-desk"
      className="mt-2 inline-block font-display italic text-ink/80 text-sm editorial-link"
    >
      Preview
    </a>
  </div>
);

const PastIssues = () => (
  <section data-testid="past-issues" className="bg-cream pt-16 md:pt-24 pb-20 md:pb-28 border-t hairline">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <h2 className="font-display font-light text-ink leading-tight tracking-tight text-3xl md:text-5xl lg:text-6xl">
            Past Issues
          </h2>
          <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-base">
            Look back through our issues archive
          </p>
        </div>
        <a
          href="#editors-desk"
          className="hidden md:inline font-display italic text-ink/80 text-base md:text-lg editorial-link"
        >
          View All Issues
        </a>
      </div>

      <HorizontalSlider testId="past-issues-slider" arrowOffset={-50}>
        {ISSUES.map((iss) => (
          <IssueCard key={iss.no} issue={iss} />
        ))}
      </HorizontalSlider>
    </div>
  </section>
);

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  const [pillar, setPillar] = useState("All");
  const [author, setAuthor] = useState("All");

  const filtered = useMemo(() => {
    let pool = [...ARTICLES];
    if (pillar !== "All") pool = pool.filter((a) => a.pillar === pillar);
    if (author !== "All") pool = pool.filter((a) => a.author === author);
    return pool;
  }, [pillar, author]);

  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Hero />
      <Highlights />
      <CategoryBar pillar={pillar} setPillar={setPillar} author={author} setAuthor={setAuthor} />
      <EditorsDesk articles={filtered} />
      <LongReads articles={filtered} />
      <PastIssues />
    </main>
  );
};

export default Journal;
