import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NotifyModal from "@/components/NotifyModal";

/* ------------------------------ DATA ------------------------------ */

const HERO_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    tagline: "Pacific cliffs meet the Sea of Cortez.",
    courses: "12+",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=900&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    tagline: "Tropical golf meets surf culture.",
    courses: "7+",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "cdmx",
    name: "Mexico City",
    region: "Valle de México",
    tagline: "Historic clubs at 7,350 ft.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=900&q=85",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    tagline: "Jungle fairways, mountain greens.",
    courses: "6+",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "riviera-maya",
    name: "Cancún · Riviera Maya",
    region: "Quintana Roo",
    tagline: "Limestone fairways, Caribbean light.",
    courses: "10+",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
  {
    slug: "unique",
    name: "Unique Golf Destinations",
    region: "Across México",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    courses: "8+",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=900&q=85",
    live: false,
  },
];

const PILLARS = [
  {
    slug: "golf-nature",
    title: "Golf & Nature",
    body: "Paspalum, ocean spray, altitude, jungle.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "mexican-uniqueness",
    title: "Mexican Uniqueness",
    body: "Hospitality, table, and culture in one round.",
    image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "people-behind-game",
    title: "People Behind the Game",
    body: "Caddies, architects, agronomists, friends.",
    image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85",
  },
];

const PILLAR_FILTERS = [
  "All",
  "Authors Journal",
  "Golf & Nature",
  "Hospitality",
  "Best Food",
  "Architecture",
  "Region Guides",
];

const AUTHORS = ["All", "Pablo De La Mora", "José Islas"];

const MUST_READS = [
  { slug: "way-we-started", title: "The way we started this journal.", excerpt: "An origin note from the founders — why México, why now, and why we'd rather write than sell.", image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1600&q=85", pillar: "Authors Journal", author: "Pablo De La Mora", read: "5 min", pinned: true, featured: true },
  { slug: "professional-experience", title: "Our professional experience in Golf in México.", excerpt: "A decade across tour environments.", image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85", pillar: "Authors Journal", author: "Pablo De La Mora", read: "8 min", pinned: true },
  { slug: "curated-network", title: "Our curated network of properties.", excerpt: "Why we don't sell from a catalogue.", image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85", pillar: "Hospitality", author: "Pablo De La Mora", read: "9 min", pinned: true },
  { slug: "how-to-plan-a-golf-trip-to-mexico", title: "How to plan a golf trip to México.", excerpt: "The playbook for a frictionless week.", image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85", pillar: "Region Guides", author: "Pablo De La Mora", read: "12 min", pinned: true },
  { slug: "luxury-golf-vacation-mexico", title: "Luxury golf vacations in México.", excerpt: "What 'luxury' actually buys you here.", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85", pillar: "Hospitality", author: "Pablo De La Mora", read: "10 min", pinned: true },
  { slug: "los-cabos-four-mornings", title: "Where to play in Los Cabos, hole by hole.", excerpt: "Four mornings, four courses.", image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85", pillar: "Region Guides", author: "Pablo De La Mora", read: "12 min", live: true, href: "/journal/los-cabos" },
  { slug: "paspalum-notes", title: "Notes on grass.", excerpt: "Paspalum vs. bermuda — what your wedge does.", image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85", pillar: "Golf & Nature", author: "José Islas", read: "6 min" },
  { slug: "us-amateur-2023", title: "Stranger at Cherry Hills.", excerpt: "The 2023 U.S. Amateur, from a Mexican kid.", image: "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85", pillar: "Authors Journal", author: "José Islas", read: "9 min" },
  { slug: "mayakoba-wwt", title: "Inside Mayakoba.", excerpt: "Only PGA Tour event in México.", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85", pillar: "Architecture", author: "José Islas", read: "11 min" },
  { slug: "best-table-cdmx", title: "The best table after eighteen in CDMX.", excerpt: "Where the round ends, the city begins.", image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85", pillar: "Best Food", author: "Pablo De La Mora", read: "6 min" },
  { slug: "agent-playbook", title: "The agent's playbook.", excerpt: "Introductions, not allotments.", image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85", pillar: "Region Guides", author: "Pablo De La Mora", read: "7 min" },
  { slug: "punta-mita-tail", title: "Tail of the Whale.", excerpt: "Nicklaus's island green, Pacific rocks.", image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85", pillar: "Architecture", author: "José Islas", read: "8 min" },
];

const PAGE_SIZE = 8;

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

/* ------------------------------- ICONS ------------------------------- */

const PlusIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

/* ------------------------------ TAG PILL ------------------------------ */

const TagPill = ({ children, variant = "default" }) => {
  const cls =
    variant === "gold"
      ? "tag-pill tag-pill--gold"
      : variant === "ink"
      ? "tag-pill tag-pill--ink"
      : variant === "forest"
      ? "tag-pill tag-pill--forest"
      : "tag-pill";
  return (
    <span className={cls}>
      <PlusIcon />
      {children}
    </span>
  );
};

/* ------------------------------- HERO ------------------------------- */

const Hero = ({ featured, onSelectSection }) => (
  <section
    data-testid="journal-hero"
    className="relative h-[92vh] min-h-[680px] w-full overflow-hidden bg-ink text-cream"
  >
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src={HERO_IMG}
        alt="Aerial golf course in México"
        className="w-full h-full object-cover scale-105 editorial-img"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/15 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between pt-28 md:pt-32 pb-8 md:pb-10">
      {/* Top row */}
      <div className="flex items-center justify-between border-b border-cream/15 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70">
          — The Journal · Hub
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70">
          Vol. 01 · Editorial
        </span>
      </div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl"
      >
        <span className="font-mono text-[11px] uppercase tracking-wide-editorial text-gold">
          Welcome to
        </span>
        <h1 className="mt-5 headline-nrg text-cream text-[3.6rem] sm:text-7xl md:text-[7rem] lg:text-[9.5rem]">
          Golf in{" "}
          <span className="font-display italic font-light normal-case tracking-tight text-cream">
            México°
          </span>
        </h1>
        <p className="mt-7 font-body font-light text-cream/75 text-base md:text-lg max-w-2xl leading-relaxed">
          From Pacific cliffs to limestone fairways — over fifty championship
          courses, editorial guides written from the courses themselves.
        </p>
      </motion.div>

      {/* Bottom row: floating preview + section pills */}
      <div className="flex items-end justify-between gap-6">
        {/* Floating preview card */}
        <motion.button
          type="button"
          onClick={() => {
            const el = document.getElementById("featured-story");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          data-testid="hero-featured-preview"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex group items-stretch gap-3 text-left"
          aria-label="Read featured story"
        >
          <div className="w-[120px] h-[80px] rounded-2xl overflow-hidden border border-cream/20 shadow-2xl">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col justify-between py-1">
            <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-gold">
              Editor's pick · {featured.read}
            </span>
            <span className="font-display italic font-light text-cream text-sm leading-tight max-w-[180px] group-hover:text-gold transition-colors">
              {featured.title}
            </span>
          </div>
        </motion.button>

        {/* Section pills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="ml-auto"
        >
          <span className="block mb-3 text-right font-mono text-[10px] uppercase tracking-wide-editorial text-cream/65">
            Select Section
          </span>
          <div className="flex flex-wrap justify-end gap-2.5">
            {[
              { id: "featured-story", label: "Feature" },
              { id: "pillars-reels", label: "Pillars" },
              { id: "regions-section", label: "Regions" },
              { id: "must-reads", label: "Stories" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSection(s.id)}
                data-testid={`hero-pill-${s.id}`}
                className="glass-pill"
              >
                <span className="pill-dot" />
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ---------------------- FEATURED STORY ---------------------- */

const FeaturedStory = () => {
  const a = MUST_READS.find((m) => m.featured) || MUST_READS[0];
  return (
    <section
      id="featured-story"
      data-testid="featured-story"
      className="bg-cream pt-16 md:pt-24 pb-16 md:pb-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between gap-6 border-b hairline pb-3 mb-6 md:mb-8">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
            — Feature · N°01
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Editor's pick
          </span>
        </div>

        <motion.div
          {...fade}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch"
        >
          {/* Image */}
          <div className="md:col-span-7 relative aspect-[16/10] md:aspect-[3/2] overflow-hidden rounded-2xl bg-ink">
            <img
              src={a.image}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <TagPill variant="gold">Feature</TagPill>
              <TagPill variant="ink">{a.pillar}</TagPill>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-5 flex flex-col justify-between bg-ink text-cream p-6 md:p-10 rounded-2xl">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                Founders' Note
              </span>
              <h2 className="mt-4 font-display font-light leading-[1.02] tracking-tight text-3xl md:text-4xl lg:text-5xl">
                {a.title}
              </h2>
              <p className="mt-5 font-body font-light text-cream/75 text-sm md:text-base leading-relaxed max-w-md">
                {a.excerpt}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-cream/15 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70">
                  By
                </span>
                <span className="font-display italic font-light text-cream text-sm md:text-base">
                  {a.author}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70">
                {a.read} read
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------------------- PILLARS (dark band) ---------------------- */

const PillarReels = () => (
  <section
    id="pillars-reels"
    data-testid="pillars-reels"
    className="bg-ink text-cream py-16 md:py-24"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-8 md:mb-10 border-b border-cream/15 pb-3">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-gold">
          — Editorial Pillars · Reels
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
          3 forthcoming
        </span>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {PILLARS.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`pillar-reel-${p.slug}`}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-cream/5">
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

              {/* Top tag pills */}
              <div className="absolute top-3 left-3 flex gap-2">
                <TagPill variant="gold">Reel</TagPill>
                <TagPill>{p.title.split(" ")[0]}</TagPill>
              </div>

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-cream/40 bg-ink/30 backdrop-blur-sm text-cream group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-colors duration-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Below-image */}
            <div className="mt-4 flex items-start justify-between gap-4 pb-3 border-b border-cream/12">
              <div>
                <h3 className="font-display font-light text-cream text-xl md:text-2xl leading-[1.05] tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-1.5 font-body font-light text-cream/65 text-xs md:text-sm leading-[1.5] max-w-sm">
                  {p.body}
                </p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-gold whitespace-nowrap pt-1">
                N°0{i + 1}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

/* ----------------------------- REGIONS ----------------------------- */

const RegionsRow = () => {
  const [notify, setNotify] = useState(null);

  return (
    <>
      <section
        id="regions-section"
        data-testid="regions-section"
        className="bg-cream pb-16 md:pb-24 pt-14 md:pt-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-10 border-b hairline pb-3">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Regions · Five
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {REGIONS.length} regions
            </span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {REGIONS.map((r, i) => {
              const inner = (
                <>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                      {r.live ? (
                        <TagPill variant="forest">Live</TagPill>
                      ) : (
                        <TagPill variant="gold">Soon</TagPill>
                      )}
                      <TagPill variant="ink">{r.courses}</TagPill>
                    </div>
                  </div>
                  <div className="mt-3 pb-2 border-b hairline">
                    <h3 className="font-display font-light text-ink text-base leading-[1.1] tracking-tight read-cta">
                      {r.name}
                    </h3>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                      {r.region}
                    </span>
                  </div>
                  <p className="mt-2 font-display italic font-light text-ink/65 text-xs leading-[1.35] hidden md:block">
                    {r.tagline}
                  </p>
                </>
              );

              return (
                <motion.li
                  key={r.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.75, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`region-${r.slug}`}
                  className="group"
                >
                  {r.live ? (
                    <Link
                      to={r.href}
                      data-testid={`region-link-${r.slug}`}
                      className="block"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setNotify(r.name)}
                      data-testid={`region-notify-${r.slug}`}
                      className="text-left w-full block"
                    >
                      {inner}
                    </button>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      <NotifyModal
        open={!!notify}
        onClose={() => setNotify(null)}
        region={notify || ""}
      />
    </>
  );
};

/* ----------------------------- MUST READS ----------------------------- */

const MustReadCard = ({ a, i }) => {
  const Tag = a.live && a.href ? Link : "div";
  const props = a.live && a.href ? { to: a.href } : {};
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`article-${a.slug}`}
      className="group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink">
          <img
            src={a.image}
            alt={a.title}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              a.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap max-w-[calc(100%-1rem)]">
            <TagPill variant="gold">{a.pillar}</TagPill>
            {a.pinned && <TagPill variant="ink">Must</TagPill>}
            {!a.live && !a.pinned && <TagPill>Soon</TagPill>}
            {a.live && <TagPill variant="forest">Live</TagPill>}
          </div>
        </div>
        <div className="mt-3 pb-2 border-b hairline">
          <h3
            className={`font-display font-light leading-[1.15] tracking-tight text-[15px] md:text-base read-cta ${
              a.live ? "text-ink" : "text-ink/85"
            }`}
          >
            {a.title}
          </h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/70 truncate">
            {a.author}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
            {a.read}
          </span>
        </div>
      </Tag>
    </motion.li>
  );
};

const MustReads = () => {
  const [pillar, setPillar] = useState("All");
  const [author, setAuthor] = useState("All");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [pillarOpen, setPillarOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);

  const filtered = useMemo(() => {
    const base = MUST_READS.filter((a) => !a.featured);
    const pinned = base.filter((a) => a.pinned);
    const rest = base.filter((a) => !a.pinned);
    let pool = [...pinned, ...rest];
    if (pillar !== "All") pool = pool.filter((a) => a.pillar === pillar);
    if (author !== "All") pool = pool.filter((a) => a.author === author);
    return pool;
  }, [pillar, author]);

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  const onPillar = (p) => { setPillar(p); setShown(PAGE_SIZE); setPillarOpen(false); };
  const onAuthor = (a) => { setAuthor(a); setShown(PAGE_SIZE); setAuthorOpen(false); };

  return (
    <section
      id="must-reads"
      data-testid="must-reads"
      className="bg-cream pb-20 md:pb-28 border-t hairline pt-14 md:pt-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12 border-b hairline pb-4">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
              — Latest · Editor's desk
            </span>
            <motion.h2
              {...fade}
              className="mt-3 font-display font-light text-ink text-3xl md:text-4xl leading-[1.05] tracking-tight"
            >
              Stories from the field.
            </motion.h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <button
                type="button"
                data-testid="dropdown-pillar"
                onClick={() => setPillarOpen((v) => !v)}
                className={`glass-pill glass-pill--ink ${pillar !== "All" ? "glass-pill--active" : ""}`}
              >
                <span className="pill-dot" />
                <span className="opacity-70">Pillar</span>
                <span className="font-semibold">{pillar}</span>
                <span className={`transition-transform duration-300 ${pillarOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {pillarOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 right-0 mt-2 min-w-[240px] bg-cream border border-ink/15 shadow-2xl rounded-2xl overflow-hidden p-1.5"
                  >
                    {PILLAR_FILTERS.map((p) => (
                      <li key={p}>
                        <button
                          type="button"
                          onClick={() => onPillar(p)}
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

            <div className="relative">
              <button
                type="button"
                data-testid="dropdown-author"
                onClick={() => setAuthorOpen((v) => !v)}
                className={`glass-pill glass-pill--ink ${author !== "All" ? "glass-pill--active" : ""}`}
              >
                <span className="pill-dot" />
                <span className="opacity-70">Author</span>
                <span className="font-semibold">{author}</span>
                <span className={`transition-transform duration-300 ${authorOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
              <AnimatePresence>
                {authorOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 right-0 mt-2 min-w-[240px] bg-cream border border-ink/15 shadow-2xl rounded-2xl overflow-hidden p-1.5"
                  >
                    {AUTHORS.map((a) => (
                      <li key={a}>
                        <button
                          type="button"
                          onClick={() => onAuthor(a)}
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

            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted ml-1">
              {visible.length} / {filtered.length}
            </span>
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visible.map((a, i) => (<MustReadCard key={a.slug} a={a} i={i} />))}
          </ul>
        ) : (
          <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
            Nothing matches yet — try another filter.
          </p>
        )}

        {hasMore && (
          <div className="mt-10 md:mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              data-testid="must-reads-load-more"
              className="glass-pill glass-pill--ink group"
            >
              <span className="pill-dot" />
              <span>Load more</span>
              <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  const featured = MUST_READS.find((m) => m.featured) || MUST_READS[0];

  const onSelectSection = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Hero featured={featured} onSelectSection={onSelectSection} />
      <FeaturedStory />
      <PillarReels />
      <RegionsRow />
      <MustReads />
    </main>
  );
};

export default Journal;
