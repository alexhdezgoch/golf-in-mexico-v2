import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import HorizontalSlider from "@/components/HorizontalSlider";

/* ------------------------------ DATA ------------------------------ */

const HERO_IMG =
  "https://images.pexels.com/photos/35918456/pexels-photo-35918456.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85";

const DIVIDER_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

const THEMES = [
  {
    id: "golf",
    label: "01 — Golf",
    title: "Golf",
    body: "Iconic courses where tradition meets contemporary design.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "nature",
    label: "02 — Nature",
    title: "Nature",
    body: "Pristine landscapes where essence reveals itself.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "hospitality",
    label: "03 — Hospitality",
    title: "Hospitality",
    body: "Exceptional attention to every detail of your stay.",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "gastronomy",
    label: "04 — Gastronomy",
    title: "Gastronomy",
    body: "Flavors that tell the stories of each territory.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "architecture",
    label: "05 — Architecture",
    title: "Architecture",
    body: "Spaces designed as works of art, on & off course.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "people",
    label: "06 — People",
    title: "People",
    body: "The protagonists that make every experience unique.",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=2400&q=85",
  },
];

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
  { no: "N°01", title: "Founders' Volume", image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=900&q=85", palette: "#2C4A2C" },
  { no: "N°02", title: "Forthcoming · Spring", image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=900&q=85", palette: "#C4A24E" },
  { no: "N°03", title: "Forthcoming · Summer", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85", palette: "#1A1A18" },
  { no: "N°04", title: "Forthcoming · Fall", image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85", palette: "#2C4A2C" },
  { no: "N°05", title: "Forthcoming · Winter", image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=900&q=85", palette: "#C4A24E" },
  { no: "N°06", title: "Forthcoming · Annual", image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=900&q=85", palette: "#1A1A18" },
];

/* ------------------------------- HERO ------------------------------- */

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} data-testid="journal-hero" className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={HERO_IMG} alt="Cinematic México golf scene" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-cream leading-[0.92] tracking-tight text-[4rem] sm:text-8xl md:text-[8.5rem] lg:text-[11rem]"
        >
          The Journal<span className="text-gold">°</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display italic font-light text-cream/80 text-lg md:text-2xl max-w-2xl"
        >
          Six pillars. One country. Editorial stories from the courses themselves.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/70"
      >
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-10 bg-cream/50"
        />
      </motion.div>
    </section>
  );
};

/* ----------------------- IMMERSIVE PILLARS SCROLL ----------------------- */

const ThemeSection = ({ t, index, registerRef }) => {
  const align = index % 2 === 0 ? "items-start text-left" : "items-end text-right";
  return (
    <section
      ref={(el) => registerRef(el, index)}
      data-index={index}
      data-testid={`pillar-${t.id}`}
      className="relative h-[100vh] min-h-[640px] w-full flex flex-col justify-end pb-16 md:pb-24 pointer-events-none"
    >
      <div className={`max-w-[1440px] mx-auto px-6 md:px-16 w-full flex flex-col ${align}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-30%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl flex flex-col gap-5 pointer-events-auto ${index % 2 === 0 ? "" : "items-end"}`}
        >
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            {t.label}
          </span>
          <h2 className="font-display font-light text-cream leading-[0.95] tracking-tight text-6xl md:text-8xl lg:text-9xl">
            {t.title}<span className="text-gold">.</span>
          </h2>
          <p className="font-display italic font-light text-cream/90 text-xl md:text-2xl lg:text-3xl leading-snug max-w-xl">
            {t.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const PillarsScroll = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionsRef = useRef([]);

  const registerRef = (el, idx) => {
    if (el) sectionsRef.current[idx] = el;
  };

  useEffect(() => {
    THEMES.forEach((t) => {
      const img = new Image();
      img.src = t.image;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          }
        });
        if (best) setActiveIdx(Number(best.target.dataset.index));
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: "-15% 0px -15% 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div data-testid="pillars-scroll" className="relative bg-ink text-cream">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden z-0">
        <div className="absolute inset-0">
          {THEMES.map((t, i) => (
            <div
              key={t.id}
              aria-hidden="true"
              className="absolute inset-0 transition-opacity duration-[800ms]"
              style={{
                opacity: activeIdx === i ? 1 : 0,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <img src={t.image} alt="" className="w-full h-full object-cover scale-105" loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/55" />
        </div>

        {/* Progress indicator */}
        <div className="hidden md:flex absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20 pointer-events-none">
          {THEMES.map((t, i) => (
            <div key={t.id} className="flex items-center gap-3">
              <span
                className={`font-mono text-[9px] uppercase tracking-wide-editorial transition-all duration-500 ${
                  activeIdx === i ? "text-cream opacity-100" : "text-cream/40 opacity-60"
                }`}
                style={{ minWidth: 64 }}
              >
                {String(i + 1).padStart(2, "0")} · {t.title}
              </span>
              <span
                className={`block rounded-full transition-all duration-500 ${
                  activeIdx === i ? "w-2.5 h-2.5 bg-gold" : "w-1.5 h-1.5 bg-cream/40"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 -mt-[100vh]">
        {THEMES.map((t, i) => (
          <ThemeSection key={t.id} t={t} index={i} registerRef={registerRef} />
        ))}
      </div>
    </div>
  );
};

/* ------------------ FULL-BLEED PHOTO DIVIDER ------------------ */

const PhotoDivider = ({ image = DIVIDER_IMG, testId = "journal-divider" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section
      ref={ref}
      data-testid={testId}
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-ink/15" />
      </motion.div>
    </section>
  );
};

/* ------------------------- ARCHIVE INTRO ------------------------- */

const ArchiveIntro = () => (
  <section data-testid="archive-intro" className="bg-cream pt-24 md:pt-32 pb-12 md:pb-16">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between border-b hairline pb-3 mb-8">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink">
          The Archive · Volume 01
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          México · 2026
        </span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-light text-ink leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[6.5rem] max-w-5xl"
      >
        Editorial stories, <span className="italic text-gold">from the courses themselves.</span>
      </motion.h2>
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

/* ------------------------- ARTICLE CARDS ------------------------- */

const EditorArticleCard = ({ a }) => (
  <article data-testid={`article-${a.slug}`} className="shrink-0 snap-start w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] group">
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
            Editor&apos;s Desk: N°01
          </h2>
          <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-base">
            Must-reads from the new volume
          </p>
        </div>
        <a href="#editors-desk" className="hidden md:inline font-display italic text-ink/80 text-base md:text-lg editorial-link">
          All Features
        </a>
      </div>

      {articles.length > 0 ? (
        <HorizontalSlider testId="editors-desk-slider" arrowOffset={-80}>
          {articles.map((a) => <EditorArticleCard key={a.slug} a={a} />)}
        </HorizontalSlider>
      ) : (
        <p className="py-12 text-center font-display italic font-light text-ink/55 text-xl">
          Nothing matches yet — try another filter.
        </p>
      )}
    </div>
  </section>
);

const LongReads = ({ articles }) => (
  <section data-testid="long-reads" className="bg-ink text-cream pt-20 md:pt-28 pb-20 md:pb-28">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-3 md:pt-12">
          <h2 className="font-display font-light text-cream leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
            Long Reads
          </h2>
          <p className="mt-3 font-body font-light text-cream/65 text-sm md:text-base">
            Stories for a rain delay
          </p>
          <button
            type="button"
            data-testid="long-reads-all"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold text-ink px-6 py-3 font-mono text-[10px] uppercase tracking-wide-editorial hover:bg-cream hover:text-ink transition-colors duration-500"
          >
            All Features
          </button>
        </div>
        <div className="md:col-span-9">
          {articles.length > 0 ? (
            <HorizontalSlider testId="long-reads-slider" arrowOffset={-80}>
              {articles.map((a) => (
                <article key={`lr-${a.slug}`} data-testid={`article-lr-${a.slug}`} className="shrink-0 snap-start w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] group">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream/5">
                    <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
                  </div>
                  <h3 className="mt-5 font-display font-light text-cream text-2xl md:text-3xl leading-[1.1] tracking-tight">
                    {a.title.replace(/\.$/, "")}
                  </h3>
                  <p className="mt-3 font-display italic font-light text-cream/65 text-sm md:text-base leading-snug">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-cream/55">{a.author}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-cream/55">{a.read}</span>
                  </div>
                </article>
              ))}
            </HorizontalSlider>
          ) : (
            <p className="py-12 text-center font-display italic font-light text-cream/55 text-xl">
              Nothing matches yet — try another filter.
            </p>
          )}
        </div>
      </div>
    </div>
  </section>
);

const IssueCard = ({ issue }) => (
  <div data-testid={`issue-${issue.no.replace(/[^a-z0-9]/gi, "")}`} className="shrink-0 snap-start w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] group">
    <div className="relative aspect-[3/5] w-full overflow-hidden rounded-2xl" style={{ backgroundColor: issue.palette }}>
      <img src={issue.image} alt={`${issue.no} ${issue.title}`} className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
      <span className="absolute top-3 right-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-cream/95">
        <span className="font-display italic text-ink text-xs">J</span>
      </span>
    </div>
    <h3 className="mt-4 font-display font-light text-ink text-xl md:text-2xl">{issue.no}</h3>
    <p className="mt-1 font-mono text-[9px] uppercase tracking-wide-editorial text-muted">{issue.title}</p>
    <a href="#editors-desk" className="mt-2 inline-block font-display italic text-ink/80 text-sm editorial-link">Preview</a>
  </div>
);

const PastIssues = () => (
  <section data-testid="past-issues" className="bg-cream pt-20 md:pt-28 pb-20 md:pb-28">
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
        <a href="#editors-desk" className="hidden md:inline font-display italic text-ink/80 text-base md:text-lg editorial-link">
          View All Issues
        </a>
      </div>

      <HorizontalSlider testId="past-issues-slider" arrowOffset={-50}>
        {ISSUES.map((iss) => <IssueCard key={iss.no} issue={iss} />)}
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
      {/* 1. Cinematic hero */}
      <Hero />

      {/* 2. Immersive 6-pillar scroll experience */}
      <PillarsScroll />

      {/* 3. Photo divider */}
      <PhotoDivider testId="journal-divider-1" />

      {/* 4. Archive intro */}
      <ArchiveIntro />

      {/* 5. Category filter */}
      <CategoryBar pillar={pillar} setPillar={setPillar} author={author} setAuthor={setAuthor} />

      {/* 6. Editor's desk slider */}
      <EditorsDesk articles={filtered} />

      {/* 7. Long Reads dark band slider */}
      <LongReads articles={filtered} />

      {/* 8. Past Issues slider */}
      <PastIssues />
    </main>
  );
};

export default Journal;
