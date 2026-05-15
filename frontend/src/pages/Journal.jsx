import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { useInquiry } from "@/context/Inquiry";

/* ------------------------------ DATA ------------------------------ */

const REGIONS = [
  {
    slug: "los-cabos",
    name: "Los Cabos",
    region: "Baja California Sur",
    tagline: "Where the desert meets the sea.",
    summary:
      "Latin America's undisputed golf capital. Nicklaus, Tiger, and Davis Love III carved between the Sonoran Desert and the Sea of Cortez.",
    courses: "12+ Championship Courses",
    greenFees: "USD 250–450",
    season: "Oct — May",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1600&q=85",
    live: true,
  },
  {
    slug: "punta-mita",
    name: "Punta Mita",
    region: "Riviera Nayarit",
    tagline: "Tropical golf meets surf culture.",
    summary:
      "Nicklaus's 'Tail of the Whale' island green, Norman's oceanfront Litibú, and a Pacific that drafts how every round is paced.",
    courses: "7+ Championship Courses",
    greenFees: "USD 150–350",
    season: "Nov — April",
    image:
      "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
  {
    slug: "cdmx",
    name: "Ciudad de México",
    region: "Valle de México",
    tagline: "Golf at seven thousand feet.",
    summary:
      "Historic private clubs at altitude, where the ball flies 15% farther and a Michelin-starred dinner is always twenty minutes away.",
    courses: "8+ Championship Courses",
    greenFees: "USD 80–250",
    season: "Year-round",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1600&q=85",
    live: false,
  },
];

const EDITORS = [
  {
    id: "pablo",
    name: "Pablo De La Mora",
    role: "Founding Editor · Sports Agent",
    bio: "Strategy and logistics from inside Tour environments.",
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
    bio: "Files the player's notes from inside the ropes.",
    photo: "/jose.jpg",
    photoPosition: "center 22%",
    accent: "#C4A24E",
    socials: [
      { icon: Instagram, href: "https://www.instagram.com/joseislasgolf/", label: "Instagram" },
    ],
  },
];

const ARTICLES = [
  {
    slug: "los-cabos-four-mornings",
    title: "Where to play in Los Cabos, hole by hole.",
    excerpt:
      "Four mornings, four courses. Diamante's Dunes at dawn, Quivira at the cliff, El Camaleón at the marina, Cabo del Sol at sunset.",
    image:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    category: "Region Hubs",
    author: "pablo",
    live: true,
    read: "12 min",
    href: "/journal/los-cabos",
  },
  {
    slug: "agent-playbook",
    title: "The Agent's Playbook.",
    excerpt:
      "Booking premium golf in México — what you actually need: introductions, not allotments.",
    image:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85",
    category: "Guides",
    author: "pablo",
    live: false,
    read: "7 min",
  },
  {
    slug: "cdmx-altitude",
    title: "Altitude, Eternal Spring.",
    excerpt:
      "Historic private clubs at 7,350 feet — the ball flies fifteen percent farther and the city plays louder.",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1200&q=85",
    category: "Destinations",
    author: "pablo",
    live: false,
    read: "9 min",
  },
  {
    slug: "paspalum-notes",
    title: "Notes on Grass.",
    excerpt:
      "Paspalum holds the ball where bermuda releases it. What your wedge actually has to do in México.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    category: "Essays",
    author: "jose",
    live: false,
    read: "6 min",
  },
  {
    slug: "us-amateur-2023",
    title: "Stranger at Cherry Hills.",
    excerpt:
      "The 2023 U.S. Amateur quarterfinal, from a Mexican kid's perspective. What it takes — and what it costs.",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85",
    category: "Player Diary",
    author: "jose",
    live: false,
    read: "9 min",
  },
  {
    slug: "mayakoba-wwt",
    title: "Inside Mayakoba.",
    excerpt:
      "A player's diary from the only PGA Tour event in México — what the broadcast does not show.",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    category: "Player Diary",
    author: "jose",
    live: false,
    read: "11 min",
  },
  {
    slug: "punta-mita-tail",
    title: "Tail of the Whale.",
    excerpt:
      "Nicklaus's island green, the Pacific against the rocks, and the round that puts everything in scale.",
    image:
      "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85",
    category: "Destinations",
    author: "pablo",
    live: false,
    read: "8 min",
  },
  {
    slug: "caddie-letter",
    title: "A Letter to the Caddies.",
    excerpt:
      "On the men and women who read the line before you do — and what we owe them past the eighteenth.",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85",
    category: "Essays",
    author: "jose",
    live: false,
    read: "5 min",
  },
];

const CATEGORIES = [
  "All",
  "Region Hubs",
  "Destinations",
  "Essays",
  "Player Diary",
  "Guides",
];

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ------------------------------ CARDS ------------------------------ */

const RegionTile = ({ r, i }) => {
  const Tag = r.live ? Link : "div";
  const props = r.live ? { to: `/journal/${r.slug}` } : {};
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`region-${r.slug}`}
      className="col-span-12 md:col-span-4 group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          <img
            src={r.image}
            alt={r.name}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              r.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          {!r.live && (
            <div className="absolute top-4 left-4">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-3 py-1.5">
                Coming Soon
              </span>
            </div>
          )}
        </div>
        <div className="mt-6">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {r.region}
          </span>
          <h3 className="mt-2 font-display font-light text-ink text-3xl md:text-4xl leading-[1.05] tracking-tight">
            {r.name}
          </h3>
          <p className="mt-3 font-display italic font-light text-ink/70 text-base md:text-lg leading-[1.35] tracking-tight max-w-[26ch]">
            {r.tagline}
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t hairline pt-4">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">Courses</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-ink">{r.courses.replace(" Championship Courses", "+")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">Fees</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-ink">{r.greenFees}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">Season</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-ink">{r.season}</dd>
            </div>
          </dl>
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide-editorial text-ink editorial-link">
            {r.live ? "Explore the hub" : "Subscribe to be first"}
            <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </Tag>
    </motion.li>
  );
};

const ArticleCard = ({ a, i, size = "md" }) => {
  const Tag = a.live && a.href ? Link : "div";
  const props = a.live && a.href ? { to: a.href } : {};
  const aspect = size === "lg" ? "aspect-[3/2]" : "aspect-[4/5]";
  const titleSize = size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`article-${a.slug}`}
      className="col-span-12 sm:col-span-6 lg:col-span-4 group"
    >
      <Tag {...props} className="block">
        <div className={`relative ${aspect} w-full overflow-hidden bg-ink`}>
          <img
            src={a.image}
            alt={a.title}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              a.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2.5 py-1">
            {a.category}
          </span>
          {!a.live && (
            <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 bg-cream/85 px-2.5 py-1">
              Soon
            </span>
          )}
        </div>
        <div className="mt-5">
          <h3
            className={`font-display font-light leading-[1.1] tracking-tight max-w-[20ch] ${titleSize} ${
              a.live ? "text-ink" : "text-ink/75"
            }`}
          >
            {a.title}
          </h3>
          <p className="mt-3 font-body font-light text-ink/65 text-sm md:text-[15px] leading-[1.7] max-w-md">
            {a.excerpt}
          </p>
          <div className="mt-4 pt-3 border-t hairline flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              By {a.author === "pablo" ? "Pablo De La Mora" : "José Islas"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {a.read}
            </span>
          </div>
        </div>
      </Tag>
    </motion.li>
  );
};

/* ----------------------------- SECTIONS ----------------------------- */

const Header = () => (
  <section
    data-testid="journal-header"
    className="bg-cream pt-44 md:pt-52 pb-16 md:pb-24"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-3">
        <motion.span
          {...fade}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
        >
          Journal · Vol. I
        </motion.span>
      </div>
      <div className="col-span-12 md:col-span-9">
        <motion.h1
          {...fade}
          className="font-display font-light text-ink leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[7.5rem]"
        >
          The <span className="italic">field</span> journal.
        </motion.h1>
        <motion.p
          {...fade}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
        >
          Region hubs, field essays, and player diaries — written from the
          courses themselves, by the editors who walk them.
        </motion.p>
      </div>
    </div>
  </section>
);

const RegionsSection = () => (
  <section
    data-testid="regions-section"
    className="bg-cream pb-20 md:pb-28 border-t hairline pt-20 md:pt-28"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Destinations
          </span>
          <motion.h2
            {...fade}
            className="mt-5 font-display font-light text-ink text-4xl md:text-6xl leading-[1.02] tracking-tight max-w-3xl"
          >
            Discover Golf Regions.
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Comprehensive, editorially-crafted guides to México's premier
            golf regions. Courses, costs, access rules, and the culture that
            makes each destination unique.
          </motion.p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          {REGIONS.length} regions · México
        </span>
      </div>
      <ul className="grid grid-cols-12 gap-8 md:gap-10">
        {REGIONS.map((r, i) => (
          <RegionTile key={r.slug} r={r} i={i} />
        ))}
      </ul>
    </div>
  </section>
);

const SuggestedBy = ({ editor, articles }) => (
  <section
    data-testid={`suggested-${editor.id}`}
    className="bg-cream pb-20 md:pb-28 border-t hairline pt-20 md:pt-28"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <div className="flex items-center gap-5">
          <span
            className="relative inline-flex w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0"
            style={{ outline: `1px solid ${editor.accent}`, outlineOffset: 3 }}
          >
            <img
              src={editor.photo}
              alt={editor.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: editor.photoPosition }}
            />
          </span>
          <div>
            <span
              className="font-mono text-[10px] uppercase tracking-wide-editorial"
              style={{ color: editor.accent }}
            >
              Suggested by · {editor.role.split(" · ")[1]}
            </span>
            <h2 className="mt-2 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight">
              {editor.name}'s picks.
            </h2>
            <p className="mt-2 font-display italic font-light text-ink/65 text-sm md:text-base leading-[1.4]">
              {editor.bio}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-1">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {articles.length} pieces curated
          </span>
          <div className="flex items-center gap-2">
            {editor.socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${editor.name} on ${s.label}`}
                  data-testid={`suggested-${editor.id}-${s.label.toLowerCase()}`}
                  className="group inline-flex items-center justify-center w-8 h-8 border border-ink/25 hover:border-ink transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-ink/65 group-hover:text-ink transition-colors" strokeWidth={1.4} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-12 gap-8 md:gap-10">
        {articles.map((a, i) => (
          <ArticleCard key={a.slug} a={a} i={i} />
        ))}
      </ul>
    </div>
  </section>
);

const AllArticles = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [activeAuthor, setActiveAuthor] = useState("all");

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const catOk = activeCat === "All" || a.category === activeCat;
      const authorOk = activeAuthor === "all" || a.author === activeAuthor;
      return catOk && authorOk;
    });
  }, [activeCat, activeAuthor]);

  return (
    <section
      data-testid="all-articles"
      className="bg-cream pb-24 md:pb-32 border-t hairline pt-20 md:pt-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              The Archive
            </span>
            <motion.h2
              {...fade}
              className="mt-5 font-display font-light text-ink text-4xl md:text-6xl leading-[1.02] tracking-tight"
            >
              Full articles.
            </motion.h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {filtered.length} of {ARTICLES.length} shown
          </span>
        </div>

        {/* Filter bar */}
        <div className="border-t hairline pt-5 mb-12 md:mb-14 flex flex-col gap-5">
          {/* Category chips */}
          <div className="flex items-center gap-x-3 gap-y-3 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted shrink-0">
              Category
            </span>
            {CATEGORIES.map((c) => {
              const isActive = c === activeCat;
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => setActiveCat(c)}
                  data-testid={`filter-cat-${c.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3.5 py-1.5 border font-mono text-[10px] uppercase tracking-wide-editorial transition-colors duration-300 ${
                    isActive
                      ? "bg-ink text-cream border-ink"
                      : "bg-transparent text-ink/70 border-ink/25 hover:border-ink hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Author photo filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted shrink-0">
              By editor
            </span>
            <button
              type="button"
              onClick={() => setActiveAuthor("all")}
              data-testid="filter-author-all"
              className={`px-3.5 py-1.5 border font-mono text-[10px] uppercase tracking-wide-editorial transition-colors duration-300 ${
                activeAuthor === "all"
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink/70 border-ink/25 hover:border-ink hover:text-ink"
              }`}
            >
              All
            </button>
            {EDITORS.map((e) => {
              const isActive = e.id === activeAuthor;
              return (
                <button
                  type="button"
                  key={e.id}
                  onClick={() => setActiveAuthor(e.id)}
                  data-testid={`filter-author-${e.id}`}
                  className={`inline-flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 border font-mono text-[10px] uppercase tracking-wide-editorial transition-colors duration-300 ${
                    isActive
                      ? "bg-ink text-cream border-ink"
                      : "bg-transparent text-ink/70 border-ink/25 hover:border-ink hover:text-ink"
                  }`}
                >
                  <span
                    className="relative inline-flex w-6 h-6 rounded-full overflow-hidden shrink-0"
                    style={{ outline: `1px solid ${e.accent}`, outlineOffset: 1 }}
                  >
                    <img
                      src={e.photo}
                      alt={e.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: e.photoPosition }}
                    />
                  </span>
                  {e.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="grid grid-cols-12 gap-8 md:gap-10">
            {filtered.map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </ul>
        ) : (
          <p className="py-20 text-center font-display italic font-light text-ink/55 text-xl md:text-2xl">
            Nothing here yet — try another filter.
          </p>
        )}
      </div>
    </section>
  );
};

const Colophon = () => {
  const { openInquiry } = useInquiry();
  return (
    <section
      data-testid="plan-section"
      className="bg-cream py-20 md:py-28 border-t hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12 items-end">
        <div className="col-span-12 md:col-span-8">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Plan a Round
          </span>
          <motion.h2
            {...fade}
            className="mt-5 font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl"
          >
            The journal is read.{" "}
            <span className="italic">The round is arranged.</span>
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-body font-light text-ink/70 text-base md:text-lg leading-[1.7] max-w-xl"
          >
            When you are ready to play what you have read about, write to the
            editors. Pablo or José replies within twenty-four hours — no call
            center, no deposit.
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
    </section>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  const pabloArticles = ARTICLES.filter((a) => a.author === "pablo").slice(0, 3);
  const joseArticles = ARTICLES.filter((a) => a.author === "jose").slice(0, 3);

  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <Header />
      <RegionsSection />
      <SuggestedBy editor={EDITORS[0]} articles={pabloArticles} />
      <SuggestedBy editor={EDITORS[1]} articles={joseArticles} />
      <AllArticles />
      <Colophon />
    </main>
  );
};

export default Journal;
