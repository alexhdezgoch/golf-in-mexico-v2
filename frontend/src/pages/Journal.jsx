import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { useInquiry } from "@/context/Inquiry";

/* ----------------------------- DATA ----------------------------- */

const ISSUE = {
  volume: "Vol. I",
  number: "No. 01",
  date: "MMXXVI · Inaugural Issue",
};

const COVER_FEATURE = {
  kicker: "Cover Feature · Region Hub",
  headline: "Where to play in Los Cabos, hole by hole.",
  dek:
    "Four mornings. Four courses. Diamante's Dunes at dawn, Quivira at the cliff, El Camaleón at the marina, Cabo del Sol at sunset. A short ledger of what the desert actually plays like — written from the back tee, not the brochure.",
  byline: "By Pablo De La Mora",
  date: "Filed · Spring 2026",
  read: "12 min read",
  image:
    "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2400&q=85",
  credit: "Photograph · Los Cabos, BCS",
  href: "/journal/los-cabos",
};

const DEPARTMENTS = [
  {
    slug: "los-cabos",
    region: "Baja California Sur",
    name: "Los Cabos",
    tagline: "Where the desert meets the sea.",
    summary:
      "Nicklaus, Tiger, and Davis Love III carved between the Sonoran Desert and the Sea of Cortez. Twelve championship courses, one season that earns the flight.",
    courses: "12+ Championship Courses",
    greenFees: "USD 250–450",
    season: "Oct — May",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2400&q=85",
    live: true,
    pieces: 4,
  },
  {
    slug: "punta-mita",
    region: "Riviera Nayarit",
    name: "Punta Mita",
    tagline: "Tropical golf meets surf culture.",
    summary:
      "Nicklaus's 'Tail of the Whale' island green, Norman's oceanfront Litibú, a Pacific that drafts how every round is paced.",
    courses: "7+ Championship Courses",
    greenFees: "USD 150–350",
    season: "Nov — April",
    image:
      "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2400&q=85",
    live: false,
    pieces: 0,
  },
  {
    slug: "cdmx",
    region: "Valle de México",
    name: "Ciudad de México",
    tagline: "Golf at seven thousand feet.",
    summary:
      "Historic private clubs at altitude, where the ball flies fifteen percent farther and a Michelin-starred dinner is always twenty minutes away.",
    courses: "8+ Championship Courses",
    greenFees: "USD 80–250",
    season: "Year-round",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2400&q=85",
    live: false,
    pieces: 0,
  },
];

const MASTHEAD = [
  {
    id: "pablo",
    name: "Pablo De La Mora",
    role: "Founding Editor · Sports Agent",
    bio: "Strategy and logistics from inside Tour environments.",
    bylines: 14,
    photo: "/pablo.jpg",
    photoPosition: "center 22%",
    accent: "#2C4A2C",
    socials: [
      { icon: Linkedin, href: "https://www.linkedin.com/in/pablodelamora/", label: "LinkedIn" },
      { icon: Instagram, href: "https://www.instagram.com/pablodelamora/", label: "Instagram" },
    ],
  },
  {
    id: "jose",
    name: "José Islas",
    role: "Player Correspondent · Pro Golfer",
    bio: "Files the player's notes from inside the ropes — junior to professional.",
    bylines: 9,
    photo: "/jose.jpg",
    photoPosition: "center 22%",
    accent: "#C4A24E",
    socials: [
      { icon: Instagram, href: "https://www.instagram.com/joseislasgolf/", label: "Instagram" },
    ],
  },
];

const REELS = [
  { id: "cabo", region: "Los Cabos · BCS", title: "Dawn over Diamante.", duration: "0:18" },
  { id: "mita", region: "Punta Mita · Nayarit", title: "Tail of the Whale.", duration: "0:24" },
  { id: "cdmx", region: "Ciudad de México · DF", title: "Altitude, eternal spring.", duration: "0:20" },
];

const FEATURES = [
  {
    slug: "paspalum-notes",
    label: "Essay",
    region: "Agronomy",
    title: "Notes on grass — why Mexican greens play different.",
    excerpt:
      "Paspalum holds the ball where bermuda releases it. A short piece on what your wedge actually has to do.",
    byline: "By José Islas",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "us-amateur-2023",
    label: "Player Diary",
    region: "U.S. Amateur · Cherry Hills",
    title: "The 2023 U.S. Amateur QF, from a Mexican kid's perspective.",
    excerpt:
      "What it takes to walk Cherry Hills with a Mexican flag on the bag — and what it costs.",
    byline: "By José Islas",
    read: "9 min",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "agent-playbook",
    label: "Guide",
    region: "Travel · México",
    title: "Booking premium golf in México — the agent's playbook.",
    excerpt:
      "What you actually need: introductions, not allotments. A short reference on private-club access.",
    byline: "By Pablo De La Mora",
    read: "7 min",
    image:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "mayakoba-wwt",
    label: "Profile",
    region: "Riviera Maya",
    title: "Inside the WWT Championship at Mayakoba.",
    excerpt:
      "A player's diary from the only PGA Tour event in México — what the broadcast does not show.",
    byline: "By José Islas",
    read: "11 min",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85",
  },
];

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

/* --------------------------- MAGAZINE PIECES --------------------------- */

const Masthead = () => (
  <section
    data-testid="journal-masthead"
    className="bg-cream pt-44 md:pt-48 pb-10 md:pb-14 border-b hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6">
        <motion.span
          {...fade}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
        >
          {ISSUE.volume} · {ISSUE.number}
        </motion.span>
        <motion.span
          {...fade}
          transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
        >
          {ISSUE.date}
        </motion.span>
        <motion.span
          {...fade}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
        >
          México · The Journal
        </motion.span>
      </div>

      <motion.h1
        {...fade}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 md:mt-20 font-display font-light text-ink leading-[0.94] tracking-tight text-6xl md:text-[10rem] lg:text-[14rem]"
      >
        The <span className="italic">Journal</span>.
      </motion.h1>

      <motion.p
        {...fade}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 md:mt-14 font-display italic font-light text-ink/75 text-xl md:text-3xl leading-[1.25] tracking-tight max-w-3xl"
      >
        Region departments, field essays, and player diaries — printed in
        cream, written from the courses themselves.
      </motion.p>
    </div>
  </section>
);

const CoverFeature = () => (
  <section
    data-testid="cover-feature"
    className="bg-cream pt-20 md:pt-28 pb-24 md:pb-32 border-b hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center gap-4 mb-10 md:mb-14">
        <span className="block w-10 h-px bg-ink/40" />
        <motion.span
          {...fade}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65"
        >
          {COVER_FEATURE.kicker}
        </motion.span>
      </div>

      <Link to={COVER_FEATURE.href} className="block group">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 lg:col-span-7 relative aspect-[4/5] md:aspect-[4/5] lg:aspect-[5/6] w-full overflow-hidden bg-ink">
            <motion.img
              initial={{ scale: 1.06, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              src={COVER_FEATURE.image}
              alt={COVER_FEATURE.headline}
              className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/85 bg-ink/45 backdrop-blur-sm px-2.5 py-1">
                {COVER_FEATURE.credit}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70 bg-ink/45 backdrop-blur-sm px-2.5 py-1">
                Fig. 01
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.h2
                {...fade}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-ink leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl"
              >
                {COVER_FEATURE.headline}
              </motion.h2>

              <motion.p
                {...fade}
                transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 md:mt-12 font-body font-light text-ink/80 text-base md:text-lg leading-[1.75] max-w-md"
              >
                <span className="font-display text-5xl md:text-6xl leading-none float-left mr-3 -mt-1 text-ink">
                  {COVER_FEATURE.dek.charAt(0)}
                </span>
                {COVER_FEATURE.dek.slice(1)}
              </motion.p>
            </div>

            <motion.div
              {...fade}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 md:mt-16 pt-6 border-t hairline flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <span className="block font-display italic font-light text-ink text-lg md:text-xl tracking-tight">
                  {COVER_FEATURE.byline}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {COVER_FEATURE.date} · {COVER_FEATURE.read}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink editorial-link transition-transform duration-500 group-hover:translate-x-1">
                Read the feature →
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </div>
  </section>
);

const DepartmentSlider = () => {
  const [idx, setIdx] = useState(0);
  const total = DEPARTMENTS.length;
  const goTo = (n) => setIdx(((n % total) + total) % total);
  const active = DEPARTMENTS[idx];

  return (
    <section
      data-testid="hubs-slider"
      className="bg-cream pt-20 md:pt-28 pb-16 md:pb-24 border-b hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Department header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="block w-10 h-px bg-ink/40" />
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65">
                Department · Regions
              </span>
            </div>
            <motion.h2
              {...fade}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl"
            >
              México, region by region.{" "}
              <span className="italic">Walked before written.</span>
            </motion.h2>
          </div>
          <div className="flex items-center gap-6">
            <span
              data-testid="slider-paginator"
              className="font-mono text-[11px] uppercase tracking-wide-editorial text-muted"
            >
              <span className="text-ink">
                {String(idx + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(idx - 1)}
                data-testid="slider-prev"
                aria-label="Previous department"
                className="group inline-flex items-center justify-center w-11 h-11 border border-ink/30 text-ink hover:bg-ink hover:text-cream transition-colors duration-500"
              >
                <span className="font-mono text-base transition-transform duration-500 group-hover:-translate-x-0.5">
                  ←
                </span>
              </button>
              <button
                type="button"
                onClick={() => goTo(idx + 1)}
                data-testid="slider-next"
                aria-label="Next department"
                className="group inline-flex items-center justify-center w-11 h-11 border border-ink/30 text-ink hover:bg-ink hover:text-cream transition-colors duration-500"
              >
                <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.article
            key={active.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`hub-slide-${active.slug}`}
            className="grid grid-cols-12 gap-8 md:gap-16"
          >
            <div className="col-span-12 lg:col-span-8 relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-ink">
              <motion.img
                key={`${active.slug}-img`}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
                src={active.image}
                alt={active.name}
                className="absolute inset-0 w-full h-full object-cover editorial-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/85 bg-ink/45 backdrop-blur-sm px-2.5 py-1">
                  Photograph · {active.region}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70 bg-ink/45 backdrop-blur-sm px-2.5 py-1">
                  Fig. {String(idx + 2).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                  Hub N° {String(idx + 1).padStart(2, "0")} · {active.region}
                </span>
                <h3 className="mt-4 font-display font-light text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                  {active.name}
                </h3>
                <p className="mt-6 font-display italic font-light text-ink/70 text-lg md:text-xl leading-[1.3] tracking-tight max-w-md">
                  {active.tagline}
                </p>
                <p className="mt-8 font-body font-light text-ink/80 text-base md:text-[17px] leading-[1.75] max-w-md">
                  {active.summary}
                </p>
              </div>

              {/* Specs ledger — printed-style */}
              <dl className="mt-10 md:mt-12 grid grid-cols-2 gap-y-4 gap-x-6 border-t hairline pt-5">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                    Courses
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide-editorial text-ink">
                    {active.courses}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                    Green Fees
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide-editorial text-ink">
                    {active.greenFees}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                    Season
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide-editorial text-ink">
                    {active.season}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                    Pieces
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide-editorial text-ink">
                    {active.live ? `${active.pieces} published` : "In preparation"}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                {active.live ? (
                  <Link
                    to={`/journal/${active.slug}`}
                    data-testid={`hub-cta-${active.slug}`}
                    className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide-editorial text-ink editorial-link"
                  >
                    Read the hub
                    <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    In preparation · Subscribe to be first
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Markers */}
        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-3 md:gap-6">
          {DEPARTMENTS.map((h, i) => {
            const isActive = i === idx;
            return (
              <button
                key={h.slug}
                type="button"
                onClick={() => goTo(i)}
                data-testid={`hub-marker-${h.slug}`}
                className="col-span-12 md:col-span-4 group text-left pt-3 border-t-2 transition-colors duration-500"
                style={{ borderColor: isActive ? "#C4A24E" : "rgba(26,26,24,0.15)" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  N° {String(i + 1).padStart(2, "0")} · {h.region}
                </span>
                <span
                  className={`mt-1 block font-display text-lg md:text-xl font-light tracking-tight transition-colors ${
                    isActive ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {h.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => {
  const [hero, ...rest] = FEATURES;
  return (
    <section
      data-testid="features-section"
      className="bg-cream pt-20 md:pt-28 pb-24 md:pb-32 border-b hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="flex items-center gap-4">
            <span className="block w-10 h-px bg-ink/40" />
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65">
              Features · In This Issue
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {FEATURES.length} pieces · forthcoming
          </span>
        </div>

        {/* Hero feature */}
        <motion.article
          {...fade}
          data-testid={`feature-hero-${hero.slug}`}
          className="grid grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-28"
        >
          <div className="col-span-12 lg:col-span-7 relative aspect-[4/5] overflow-hidden bg-ink group">
            <img
              src={hero.image}
              alt={hero.title}
              className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-cream/45 backdrop-blur-[2px] flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 border border-ink/30 px-3 py-1.5 bg-cream/70">
                In Preparation
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65 bg-cream/70 backdrop-blur-sm px-2.5 py-1">
                Photograph · {hero.region}
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                {hero.label} · {hero.region}
              </span>
              <h3 className="mt-5 font-display font-light text-ink/85 text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight">
                {hero.title}
              </h3>
              <p className="mt-10 font-body font-light text-ink/75 text-base md:text-lg leading-[1.75] max-w-md">
                <span className="font-display text-5xl leading-none float-left mr-3 -mt-1 text-ink">
                  {hero.excerpt.charAt(0)}
                </span>
                {hero.excerpt.slice(1)}
              </p>
            </div>
            <div className="mt-12 pt-5 border-t hairline flex items-end justify-between gap-4">
              <div>
                <span className="block font-display italic font-light text-ink text-base md:text-lg tracking-tight">
                  {hero.byline}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {hero.read} · Soon
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Grid of remaining features */}
        <ul className="grid grid-cols-12 gap-8 md:gap-12">
          {rest.map((f, i) => (
            <motion.li
              key={f.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`feature-${f.slug}`}
              className={`col-span-12 ${i === 0 ? "md:col-span-12" : "md:col-span-6"} group`}
            >
              <div
                className={`grid ${
                  i === 0
                    ? "grid-cols-12 gap-8 md:gap-16 items-start"
                    : "grid-cols-1"
                }`}
              >
                <div
                  className={`relative ${
                    i === 0 ? "col-span-12 md:col-span-7" : ""
                  } aspect-[5/6] md:aspect-[4/5] overflow-hidden bg-ink`}
                >
                  <img
                    src={f.image}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-cream/45 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 border border-ink/30 px-3 py-1.5 bg-cream/70">
                      In Preparation
                    </span>
                  </div>
                </div>
                <div className={`${i === 0 ? "col-span-12 md:col-span-5 md:pt-2" : "mt-5"}`}>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                    {f.label} · {f.region}
                  </span>
                  <h4
                    className={`mt-2 font-display font-light text-ink/85 ${
                      i === 0
                        ? "text-2xl md:text-4xl"
                        : "text-xl md:text-2xl"
                    } leading-[1.1] tracking-tight max-w-[22ch]`}
                  >
                    {f.title}
                  </h4>
                  <p className="mt-3 font-body font-light text-ink/65 text-sm md:text-[15px] leading-[1.7] max-w-md">
                    {f.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t hairline pt-3">
                    <span className="font-display italic font-light text-ink/70 text-sm tracking-tight">
                      {f.byline}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                      {f.read} · Soon
                    </span>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const FilmSection = () => (
  <section
    data-testid="reels-section"
    className="bg-cream pt-20 md:pt-28 pb-24 md:pb-32 border-b hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="block w-10 h-px bg-ink/40" />
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65">
              Department · Film
            </span>
          </div>
          <motion.h2
            {...fade}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
          >
            Field reels.{" "}
            <span className="italic">Shot where it happens.</span>
          </motion.h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          03 forthcoming · MMXXVI
        </span>
      </div>

      <ul className="grid grid-cols-12 gap-6 md:gap-10">
        {REELS.map((r, i) => (
          <motion.li
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`reel-${r.id}`}
            className="col-span-12 md:col-span-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/40 via-ink to-ink" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,162,78,0.16),transparent_55%)]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-cream/25 text-cream/75">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              </div>

              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/90 border border-cream/40 px-2.5 py-1">
                    Reel · Coming soon
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
                    {r.duration}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                    {r.region}
                  </span>
                  <p className="mt-2 font-display italic font-light text-cream text-xl md:text-2xl leading-[1.15] tracking-tight max-w-[18ch]">
                    {r.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

const MastheadCredits = () => (
  <section
    data-testid="editors-section"
    className="bg-cream pt-20 md:pt-28 pb-24 md:pb-32 border-b hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center gap-4 mb-12 md:mb-16">
        <span className="block w-10 h-px bg-ink/40" />
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65">
          Masthead · The Editors
        </span>
      </div>

      <motion.h2
        {...fade}
        className="font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl"
      >
        Two bylines.{" "}
        <span className="italic">Signed by name.</span>
      </motion.h2>

      <p className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed">
        Every piece in this journal carries one of two names — the agent or
        the player. Nothing aggregated, nothing ghostwritten.
      </p>

      <ul className="mt-16 md:mt-20 grid grid-cols-12 gap-10 md:gap-16 border-t hairline pt-12">
        {MASTHEAD.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`editor-${e.id}`}
            className="col-span-12 md:col-span-6"
          >
            <div className="grid grid-cols-12 gap-5 md:gap-8">
              <div className="col-span-4 md:col-span-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <img
                    src={e.photo}
                    alt={e.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: e.photoPosition }}
                  />
                </div>
                <span className="block mt-2 font-mono text-[9px] uppercase tracking-wide-editorial text-muted">
                  Fig. {String(i + 5).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-8 md:col-span-9">
                <span
                  className="font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: e.accent }}
                >
                  {e.role}
                </span>
                <h3 className="mt-3 font-display font-light text-ink text-3xl md:text-4xl leading-[1] tracking-tight">
                  {e.name}
                </h3>
                <p className="mt-5 font-display italic font-light text-ink/75 text-base md:text-lg leading-[1.4] tracking-tight max-w-md">
                  {e.bio}
                </p>
                <div className="mt-6 pt-4 border-t hairline flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {e.bylines} bylines · {ISSUE.volume}
                  </span>
                  <div className="flex items-center gap-2">
                    {e.socials.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${e.name} on ${s.label}`}
                          data-testid={`editor-${e.id}-${s.label.toLowerCase()}`}
                          className="group inline-flex items-center justify-center w-8 h-8 border border-ink/25 hover:border-ink transition-colors"
                        >
                          <Icon
                            className="w-3.5 h-3.5 text-ink/65 group-hover:text-ink transition-colors"
                            strokeWidth={1.4}
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

const Colophon = () => {
  const { openInquiry } = useInquiry();
  return (
    <section
      data-testid="plan-section"
      className="bg-cream py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="block w-10 h-px bg-ink/40" />
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/65">
            Colophon · Plan a Round
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl"
            >
              The journal is read.{" "}
              <span className="italic">The round is arranged.</span>
            </motion.h2>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body font-light text-ink/75 text-base md:text-lg leading-[1.75] max-w-xl"
            >
              When you are ready to play what you have read about, write to the
              editors. Pablo or José sends back a named itinerary within
              twenty-four hours — no call center, no deposit.
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <button
              type="button"
              onClick={openInquiry}
              data-testid="plan-cta-primary"
              className="group inline-flex items-center gap-4 bg-ink text-cream px-7 md:px-9 py-5 md:py-6 hover:bg-forest transition-colors duration-500"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                Write to the editors
              </span>
              <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>
            <span className="block mt-4 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              24h reply · 5 min form · No deposit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Masthead />
      <CoverFeature />
      <DepartmentSlider />
      <FeaturesGrid />
      <FilmSection />
      <MastheadCredits />
      <Colophon />
    </main>
  );
};

export default Journal;
