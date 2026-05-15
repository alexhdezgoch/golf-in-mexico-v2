import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { useInquiry } from "@/context/Inquiry";

/* ------------------------------ DATA ------------------------------ */

const CATEGORIES = [
  "All",
  "Region Hubs",
  "Destinations",
  "Field Notes",
  "Essays",
  "Player Diary",
  "Guides",
  "Films",
  "Interviews",
];

const HEROES = [
  {
    id: "cover-cabo",
    kicker: "Los Cabos · Region Hub",
    title: "Where to play in Los Cabos, hole by hole.",
    cta: "Read",
    image:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1400&q=85",
    href: "/journal/los-cabos",
    live: true,
  },
  {
    id: "editors",
    kicker: "The Masthead",
    title: "Two editors. One byline, signed.",
    cta: "Meet",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1400&q=85",
    href: null,
    anchor: "editors-section",
    live: true,
  },
  {
    id: "issue",
    kicker: "Vol. I · No. 01",
    title: "The inaugural issue.",
    cta: "Features",
    image:
      "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1400&q=85",
    href: null,
    anchor: "features-section",
    live: true,
  },
];

const FEATURES = [
  {
    slug: "los-cabos-four-mornings",
    kicker: "Los Cabos",
    title: "Where to play in Los Cabos, hole by hole.",
    excerpt:
      "Diamante's Dunes at dawn, Quivira at the cliff, El Camaleón at the marina, Cabo del Sol at sunset.",
    image:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    cat: "Region Hubs",
    live: true,
    href: "/journal/los-cabos",
  },
  {
    slug: "paspalum-notes",
    kicker: "Agronomy",
    title: "Notes on Grass",
    excerpt:
      "Paspalum holds the ball where bermuda releases it. A short piece on what your wedge actually has to do in México.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    cat: "Essays",
    live: false,
  },
  {
    slug: "agent-playbook",
    kicker: "Travel · México",
    title: "The Agent's Playbook",
    excerpt:
      "Booking premium golf in México. What you actually need: introductions, not allotments.",
    image:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85",
    cat: "Guides",
    live: false,
  },
  {
    slug: "us-amateur-2023",
    kicker: "U.S. Amateur · Cherry Hills",
    title: "Stranger at Cherry Hills",
    excerpt:
      "The 2023 U.S. Amateur quarterfinal, from a Mexican kid's perspective. What it takes — and what it costs.",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=85",
    cat: "Player Diary",
    live: false,
  },
];

const FEATURES_ROW_2 = [
  {
    slug: "mayakoba-wwt",
    kicker: "Riviera Maya",
    title: "Inside Mayakoba",
    excerpt:
      "A player's diary from the only PGA Tour event in México — what the broadcast does not show.",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85",
    cat: "Player Diary",
    live: false,
  },
  {
    slug: "punta-mita-tail",
    kicker: "Punta Mita",
    title: "Tail of the Whale",
    excerpt:
      "Nicklaus's island green, the Pacific against the rocks, and the round that puts everything else in scale.",
    image:
      "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85",
    cat: "Destinations",
    live: false,
  },
  {
    slug: "cdmx-altitude",
    kicker: "Ciudad de México",
    title: "Altitude, Eternal Spring",
    excerpt:
      "Historic private clubs at 7,350 feet. The ball flies fifteen percent farther — and the city plays louder.",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1200&q=85",
    cat: "Destinations",
    live: false,
  },
  {
    slug: "caddie-letter",
    kicker: "Open Letter",
    title: "A Letter to the Caddies",
    excerpt:
      "On the men and women who read the line before you do, and what we owe them past the eighteenth.",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85",
    cat: "Essays",
    live: false,
  },
];

const ISSUES = [
  { name: "Los Cabos", region: "Baja California Sur", image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=900&q=85", slug: "los-cabos", live: true },
  { name: "Punta Mita", region: "Riviera Nayarit", image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=900&q=85", slug: "punta-mita", live: false },
  { name: "Ciudad de México", region: "Valle de México", image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=900&q=85", slug: "cdmx", live: false },
  { name: "Riviera Maya", region: "Quintana Roo", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=900&q=85", slug: "riviera-maya", live: false },
];

const EDITORS = [
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

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ----------------------------- CARDS ----------------------------- */

const HeroTile = ({ tile, i }) => {
  const handleClick = (e) => {
    if (!tile.href && tile.anchor) {
      e.preventDefault();
      document.getElementById(tile.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const Tag = tile.href ? Link : "a";
  const props = tile.href ? { to: tile.href } : { href: "#", onClick: handleClick };

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`hero-tile-${tile.id}`}
      className="col-span-12 md:col-span-4 group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          <img
            src={tile.image}
            alt={tile.title}
            className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-5">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {tile.kicker}
          </span>
          <h3 className="mt-2 font-display font-light text-ink text-2xl md:text-3xl lg:text-4xl leading-[1.05] tracking-tight max-w-[18ch]">
            {tile.title}
          </h3>
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide-editorial text-ink editorial-link">
            {tile.cta}
            <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </Tag>
    </motion.li>
  );
};

const FeatureCard = ({ f, i }) => {
  const Tag = f.live && f.href ? Link : "div";
  const props = f.live && f.href ? { to: f.href } : {};
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`feature-${f.slug}`}
      className="col-span-12 sm:col-span-6 lg:col-span-3 group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-ink">
          <img
            src={f.image}
            alt={f.title}
            className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              f.live ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          {!f.live && (
            <div className="absolute inset-0 bg-cream/55 backdrop-blur-[2px] flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 border border-ink/30 px-3 py-1.5 bg-cream/70">
                In Preparation
              </span>
            </div>
          )}
        </div>
        <div className="mt-5">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            {f.kicker}
          </span>
          <h3
            className={`mt-2 font-display font-light text-2xl md:text-3xl leading-[1.05] tracking-tight max-w-[18ch] ${
              f.live ? "text-ink" : "text-ink/65"
            }`}
          >
            {f.title}
          </h3>
          <p className="mt-3 font-body font-light text-ink/65 text-sm leading-[1.65] max-w-md">
            {f.excerpt}
          </p>
        </div>
      </Tag>
    </motion.li>
  );
};

const BannerStrip = ({ image, kicker, title, cta, href, anchor, testid }) => {
  const handleClick = (e) => {
    if (!href && anchor) {
      e.preventDefault();
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const Tag = href ? Link : "a";
  const props = href ? { to: href } : { href: "#", onClick: handleClick };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      data-testid={testid}
      className="col-span-12 group"
    >
      <Tag {...props} className="block">
        <div className="relative aspect-[16/8] md:aspect-[21/8] w-full overflow-hidden bg-ink">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 px-6 md:px-12 flex items-center">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/80">
                {kicker}
              </span>
              <h3 className="mt-3 font-display font-light text-cream text-3xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
                {title}
              </h3>
              <span className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide-editorial text-cream editorial-link">
                {cta}
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Tag>
    </motion.div>
  );
};

/* --------------------------- SECTIONS --------------------------- */

const HeaderBar = ({ active, onChange }) => (
  <section
    data-testid="journal-header"
    className="bg-cream pt-44 md:pt-52 pb-10 md:pb-14"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <motion.h1
        {...fade}
        className="font-display font-light text-ink leading-[0.96] tracking-tight text-5xl md:text-7xl lg:text-[8rem]"
      >
        Features.
      </motion.h1>

      <motion.div
        {...fade}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 md:mt-16 flex items-center gap-x-6 gap-y-3 flex-wrap border-b hairline pb-5"
      >
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/45">
          —
        </span>
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          return (
            <button
              type="button"
              key={c}
              onClick={() => onChange(c)}
              data-testid={`cat-${c.toLowerCase().replace(/[\s·]+/g, "-")}`}
              className={`font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial transition-colors duration-300 ${
                isActive
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          );
        })}
      </motion.div>
    </div>
  </section>
);

const HeroRow = () => (
  <section className="bg-cream pb-16 md:pb-20">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <ul className="grid grid-cols-12 gap-8 md:gap-10">
        {HEROES.map((tile, i) => (
          <HeroTile key={tile.id} tile={tile} i={i} />
        ))}
      </ul>
    </div>
  </section>
);

const FeaturesGrid = ({ items, testid }) => (
  <section className="bg-cream pb-16 md:pb-20" data-testid={testid}>
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <ul className="grid grid-cols-12 gap-8 md:gap-10">
        {items.map((f, i) => (
          <FeatureCard key={f.slug} f={f} i={i} />
        ))}
      </ul>
    </div>
  </section>
);

const Banners = () => (
  <section className="bg-cream pb-16 md:pb-20">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-10 md:gap-12">
      <BannerStrip
        testid="banner-departments"
        kicker="Departments · México region by region"
        title="What's new — the destination hubs."
        cta="Browse hubs"
        anchor="issues-section"
        image="https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=2400&q=85"
      />
      <BannerStrip
        testid="banner-films"
        kicker="Films · Coming soon"
        title="Field reels. Stories that move."
        cta="See the reels"
        anchor="films-section"
        image="https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85"
      />
    </div>
  </section>
);

const FilmsSection = () => (
  <section
    id="films-section"
    data-testid="films-section"
    className="bg-cream pb-16 md:pb-20"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-5">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — Films
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          03 forthcoming · 2026
        </span>
      </div>
      <ul className="grid grid-cols-12 gap-8 md:gap-10">
        {[
          { id: "cabo", kicker: "Los Cabos · BCS", title: "Dawn over Diamante.", duration: "0:18" },
          { id: "mita", kicker: "Punta Mita · Nayarit", title: "Tail of the Whale.", duration: "0:24" },
          { id: "cdmx", kicker: "Ciudad de México · DF", title: "Altitude, eternal spring.", duration: "0:20" },
        ].map((r, i) => (
          <motion.li
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`reel-${r.id}`}
            className="col-span-12 md:col-span-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/40 via-ink to-ink" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,162,78,0.16),transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-cream/25 text-cream/75">
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
              </div>
            </div>
            <div className="mt-5">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                {r.kicker}
              </span>
              <h3 className="mt-2 font-display font-light text-ink text-2xl md:text-3xl leading-[1.05] tracking-tight">
                {r.title}
              </h3>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

const IssuesGrid = () => (
  <section
    id="issues-section"
    data-testid="issues-section"
    className="bg-cream pb-16 md:pb-20"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-5">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — Destinations
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          {ISSUES.length} regions · México
        </span>
      </div>
      <ul className="grid grid-cols-12 gap-8 md:gap-10">
        {ISSUES.map((iss, i) => {
          const Tag = iss.live ? Link : "div";
          const props = iss.live ? { to: `/journal/${iss.slug}` } : {};
          return (
            <motion.li
              key={iss.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`issue-${iss.slug}`}
              className="col-span-6 md:col-span-3 group"
            >
              <Tag {...props} className="block">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <img
                    src={iss.image}
                    alt={iss.name}
                    className={`absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      iss.live ? "group-hover:scale-[1.04]" : ""
                    }`}
                  />
                  {!iss.live && (
                    <div className="absolute inset-0 bg-cream/55 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 border border-ink/30 px-3 py-1.5 bg-cream/70">
                        Soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-display font-light text-ink text-xl md:text-2xl leading-tight tracking-tight">
                    {iss.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {iss.live ? "Read" : "Preview"}
                  </span>
                </div>
                <span className="block mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {iss.region}
                </span>
              </Tag>
            </motion.li>
          );
        })}
      </ul>
    </div>
  </section>
);

const EditorsSection = () => (
  <section
    id="editors-section"
    data-testid="editors-section"
    className="bg-cream pb-20 md:pb-28"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 border-b hairline pb-5">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
          — The Masthead
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          Editors · 2
        </span>
      </div>

      <ul className="grid grid-cols-12 gap-10 md:gap-16">
        {EDITORS.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`editor-${e.id}`}
            className="col-span-12 md:col-span-6"
          >
            <div className="grid grid-cols-12 gap-5 md:gap-8">
              <div className="col-span-5 md:col-span-4 relative aspect-[4/5] overflow-hidden bg-ink">
                <img
                  src={e.photo}
                  alt={e.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: e.photoPosition }}
                />
              </div>
              <div className="col-span-7 md:col-span-8">
                <span
                  className="font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: e.accent }}
                >
                  {e.role}
                </span>
                <h3 className="mt-2 font-display font-light text-ink text-2xl md:text-4xl leading-[1.05] tracking-tight">
                  {e.name}
                </h3>
                <p className="mt-4 font-body font-light text-ink/70 text-sm md:text-base leading-[1.7] max-w-md">
                  {e.bio}
                </p>
                <div className="mt-6 flex items-center justify-between border-t hairline pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {e.bylines} bylines
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
      className="bg-cream pb-24 md:pb-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12 items-end border-t hairline pt-16 md:pt-20">
        <div className="col-span-12 md:col-span-8">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">
            — Plan a Round
          </span>
          <motion.h2
            {...fade}
            className="mt-6 font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl"
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
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? FEATURES
      : FEATURES.filter((f) => f.cat === active);
  const filtered2 =
    active === "All"
      ? FEATURES_ROW_2
      : FEATURES_ROW_2.filter((f) => f.cat === active);

  return (
    <main data-testid="page-journal" className="relative bg-cream">
      <HeaderBar active={active} onChange={setActive} />
      <HeroRow />
      <FeaturesGrid items={filtered} testid="features-section" />
      <Banners />
      <FeaturesGrid items={filtered2} testid="features-section-2" />
      <FilmsSection />
      <IssuesGrid />
      <EditorsSection />
      <Colophon />
    </main>
  );
};

export default Journal;
