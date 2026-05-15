import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { useInquiry } from "@/context/Inquiry";

/* ----------------------------- DATA ----------------------------- */

const HUBS = [
  {
    slug: "los-cabos",
    region: "Baja California Sur",
    name: "Los Cabos",
    tagline: "Where the Desert Meets the Sea",
    summary:
      "Latin America's undisputed golf capital. Nicklaus, Tiger, and Davis Love III carved between the Sonoran Desert and the Sea of Cortez.",
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
    tagline: "Tropical Golf Meets Surf Culture",
    summary:
      "Nicklaus's legendary 'Tail of the Whale' island green, Norman's oceanfront Litibú, and a surf-to-sunset rhythm that defines México's Pacific.",
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
    tagline: "Golf at 7,350 Feet",
    summary:
      "Historic private clubs at altitude, where the ball flies 15% farther and a Michelin-starred dinner is always twenty minutes away.",
    courses: "8+ Championship Courses",
    greenFees: "USD 80–250",
    season: "Year-round",
    image:
      "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2400&q=85",
    live: false,
    pieces: 0,
  },
];

const EDITORS = [
  {
    id: "pablo",
    name: "Pablo De La Mora",
    role: "Sports Agent · The Insider",
    bio: "Strategy and logistics from inside Tour environments. He designs the round, the table, and the morning after.",
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
    role: "Professional Golfer · The Player",
    bio: "Walks the courses, reads the grass, files the player's notes from inside the ropes — junior, amateur, professional.",
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

const FIELD_NOTES = [
  {
    slug: "los-cabos-four-mornings",
    cat: "Region Hub",
    region: "Los Cabos",
    title: "Where to play in Los Cabos, hole by hole.",
    excerpt:
      "Four mornings. Four courses. Diamante's Dunes at dawn, Quivira at the cliff, El Camaleón at the marina, Cabo del Sol at sunset.",
    image:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1800&q=85",
    live: true,
    read: 12,
    href: "/journal/los-cabos",
  },
  {
    slug: "paspalum-notes",
    cat: "Field Notes",
    region: "Agronomy",
    title: "Notes on grass — why Mexican greens play different.",
    excerpt: "Paspalum holds the ball where bermuda releases it. A short piece on what your wedge actually has to do.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=80",
    live: false,
    read: 6,
  },
  {
    slug: "us-amateur-2023",
    cat: "Player Diary",
    region: "U.S. Amateur",
    title: "The 2023 U.S. Amateur QF, from a Mexican kid's perspective.",
    excerpt: "What it takes to walk Cherry Hills with a Mexican flag on the bag — and what it costs.",
    image:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1400&q=80",
    live: false,
    read: 9,
  },
  {
    slug: "agent-playbook",
    cat: "Guide",
    region: "Travel",
    title: "Booking premium golf in México — the agent's playbook.",
    excerpt: "What you actually need: introductions, not allotments. A short reference on private-club access.",
    image:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1400&q=80",
    live: false,
    read: 7,
  },
  {
    slug: "mayakoba-wwt",
    cat: "Profile",
    region: "Riviera Maya",
    title: "Inside the WWT Championship at Mayakoba.",
    excerpt: "A player's diary from the only PGA Tour event in México — what the broadcast does not show.",
    image:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1400&q=80",
    live: false,
    read: 11,
  },
];

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

/* --------------------------- SECTIONS --------------------------- */

const HubsSlider = () => {
  const [idx, setIdx] = useState(0);
  const total = HUBS.length;
  const containerRef = useRef(null);

  const goTo = (n) => setIdx(((n % total) + total) % total);
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  const active = HUBS[idx];

  return (
    <section
      data-testid="hubs-slider"
      className="relative bg-cream border-t hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Chapter N° 01 — Destination Hubs
            </motion.span>
            <motion.h2
              {...fade}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl"
            >
              México, region by region.{" "}
              <span className="italic">Walked before written.</span>
            </motion.h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <span
              data-testid="slider-paginator"
              className="font-mono text-[11px] uppercase tracking-wide-editorial text-muted"
            >
              <span className="text-ink">
                {String(idx + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Slide canvas */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-ink"
        style={{ minHeight: "min(78vh, 760px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={active.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`hub-slide-${active.slug}`}
            className="relative w-full"
            style={{ minHeight: "min(78vh, 760px)" }}
          >
            <motion.img
              key={`${active.slug}-img`}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
              src={active.image}
              alt={active.name}
              className="absolute inset-0 w-full h-full object-cover editorial-img"
            />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/30" />

            {/* Slide content */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-12 gap-8 h-full" style={{ minHeight: "min(78vh, 760px)" }}>
              <div className="col-span-12 flex flex-col justify-end h-full gap-10">
                {/* Top meta row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-12 gap-6 md:gap-8 border-b border-cream/15 pb-6"
                >
                  <div className="col-span-6 md:col-span-3">
                    <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
                      Region
                    </span>
                    <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-wide-editorial text-cream">
                      {active.region}
                    </span>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
                      Courses
                    </span>
                    <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-wide-editorial text-cream">
                      {active.courses}
                    </span>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
                      Green Fees
                    </span>
                    <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-wide-editorial text-cream">
                      {active.greenFees}
                    </span>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
                      Season
                    </span>
                    <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-wide-editorial text-cream">
                      {active.season}
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-12 gap-6 md:gap-12"
                >
                  <div className="col-span-12 md:col-span-7">
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                      Hub N° {String(idx + 1).padStart(2, "0")} · {active.tagline}
                    </span>
                    <h3 className="mt-5 font-display font-light text-cream leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[6rem]">
                      {active.name}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-5 md:pt-3 flex flex-col gap-6">
                    <p className="font-body font-light text-cream/85 text-base md:text-lg leading-[1.7] max-w-md">
                      {active.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      {active.live ? (
                        <Link
                          to={`/journal/${active.slug}`}
                          data-testid={`hub-cta-${active.slug}`}
                          className="group inline-flex items-center gap-3 bg-cream text-ink px-6 md:px-7 py-4 md:py-5 hover:bg-gold transition-colors duration-500"
                        >
                          <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                            Read the Hub
                          </span>
                          <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-3 border border-cream/40 px-6 md:px-7 py-4 md:py-5 font-mono text-[11px] uppercase tracking-wide-editorial text-cream/85">
                          In Preparation
                        </span>
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
                        {active.live
                          ? `${active.pieces} pieces published`
                          : "Subscribe to be first"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          data-testid="slider-prev"
          aria-label="Previous destination"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border border-cream/30 text-cream hover:bg-cream hover:text-ink transition-colors duration-500"
        >
          <span className="font-mono text-base md:text-lg transition-transform duration-500 group-hover:-translate-x-0.5">
            ←
          </span>
        </button>
        <button
          type="button"
          onClick={next}
          data-testid="slider-next"
          aria-label="Next destination"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border border-cream/30 text-cream hover:bg-cream hover:text-ink transition-colors duration-500"
        >
          <span className="font-mono text-base md:text-lg transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>

      {/* Bottom — tab markers */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 md:py-8 grid grid-cols-12 gap-3 md:gap-6 border-b hairline">
        {HUBS.map((h, i) => {
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
    </section>
  );
};

const EditorsSection = () => (
  <section
    data-testid="editors-section"
    className="bg-cream py-24 md:py-32"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-3">
          <motion.span
            {...fade}
            className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
          >
            Chapter N° 02 — The Editors
          </motion.span>
        </div>
        <div className="col-span-12 md:col-span-9">
          <motion.h2
            {...fade}
            className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
          >
            Two editors. Two voices.{" "}
            <span className="italic">One byline, signed.</span>
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Every piece in this journal carries one of two names — the agent
            or the player. Nothing aggregated, nothing ghostwritten.
          </motion.p>
        </div>
      </div>

      <ul className="grid grid-cols-12 gap-6 md:gap-10">
        {EDITORS.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`editor-${e.id}`}
            className="col-span-12 md:col-span-6"
          >
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 border-t hairline pt-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden">
                <img
                  src={e.photo}
                  alt={e.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: e.photoPosition }}
                />
                <span
                  className="absolute inset-0 ring-1"
                  style={{ boxShadow: `inset 0 0 0 1px ${e.accent}` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: e.accent }}
                >
                  {e.role}
                </span>
                <h3 className="mt-2 font-display font-light text-ink text-2xl md:text-3xl leading-tight tracking-tight">
                  {e.name}
                </h3>
                <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-base leading-[1.65] max-w-md">
                  {e.bio}
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {e.bylines} bylines
                  </span>
                  <span className="w-px h-3 bg-ink/20" />
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

const ReelsSection = () => (
  <section
    data-testid="reels-section"
    className="bg-cream py-24 md:py-32 border-t hairline"
  >
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
        <div className="col-span-12 md:col-span-8">
          <motion.span
            {...fade}
            className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
          >
            Chapter N° 03 — On Film
          </motion.span>
          <motion.h2
            {...fade}
            transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
          >
            Field reels.{" "}
            <span className="italic">Shot where it happens.</span>
          </motion.h2>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            03 forthcoming · 2026
          </span>
        </div>
      </div>

      <ul className="grid grid-cols-12 gap-6 md:gap-8">
        {REELS.map((r, i) => (
          <motion.li
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`reel-${r.id}`}
            className="col-span-12 md:col-span-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink border border-ink/15">
              {/* Placeholder visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest/35 via-ink to-ink" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,162,78,0.18),transparent_55%)]" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border border-cream/30 text-cream/80 backdrop-blur-sm">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              </div>

              {/* Frame chrome */}
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

const FieldNotesSection = () => {
  const [featured, ...rest] = FIELD_NOTES;

  const FeatureCard = (
    <article
      data-testid="field-note-featured"
      className="col-span-12 lg:col-span-8 group"
    >
      <Link to={featured.href} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/90 border border-cream/40 px-2.5 py-1 self-start">
              Latest · {featured.cat}
            </span>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                {featured.region} · {featured.read} min read
              </span>
              <h3 className="mt-3 font-display font-light text-cream text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl">
                {featured.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );

  return (
    <section
      data-testid="field-notes-section"
      className="bg-cream py-24 md:py-32 border-t hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
          <div className="col-span-12 md:col-span-8">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Chapter N° 04 — Field Notes
            </motion.span>
            <motion.h2
              {...fade}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
            >
              The editorial,{" "}
              <span className="italic">page by page.</span>
            </motion.h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              {FIELD_NOTES.length} pieces · ongoing
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {FeatureCard}

          <ul className="col-span-12 lg:col-span-4 flex flex-col divide-y hairline border-t border-b hairline">
            {rest.slice(0, 2).map((n) => (
              <li
                key={n.slug}
                data-testid={`field-note-side-${n.slug}`}
                className="py-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                  {n.cat} · {n.region}
                </span>
                <h4 className="mt-2 font-display font-light text-ink/85 text-lg md:text-xl leading-[1.2] tracking-tight">
                  {n.title}
                </h4>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {n.read} min · In Preparation
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    Soon
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {rest.slice(2).map((n, i) => (
            <motion.article
              key={n.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`field-note-${n.slug}`}
              className="col-span-12 md:col-span-6 lg:col-span-4 group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-full object-cover editorial-img transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-cream/55 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 border border-ink/30 px-3 py-1.5 bg-cream/70">
                    In Preparation
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                  {n.cat} · {n.region}
                </span>
                <h4 className="mt-2 font-display font-light text-ink/85 text-xl md:text-2xl leading-[1.15] tracking-tight max-w-[20ch]">
                  {n.title}
                </h4>
                <p className="mt-3 font-body font-light text-ink/65 text-sm leading-[1.6] max-w-md">
                  {n.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const PlanARoundSection = () => {
  const { openInquiry } = useInquiry();
  return (
    <section
      data-testid="plan-section"
      className="relative bg-ink text-cream py-24 md:py-32 border-t border-ink"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="col-span-12 md:col-span-7">
          <motion.span
            {...fade}
            className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
          >
            Chapter N° 05 — Plan a Round
          </motion.span>
          <motion.h2
            {...fade}
            transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-light text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl"
          >
            Two editors.{" "}
            <span className="italic">One reply, by name.</span>
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-body font-light text-cream/75 text-base md:text-lg leading-[1.7] max-w-xl"
          >
            Tell us where you want to play, who is coming, and what matters
            most. Pablo or José sends back a named itinerary within
            twenty-four hours. No call center. No deposit.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <button
              type="button"
              onClick={openInquiry}
              data-testid="plan-cta-primary"
              className="group inline-flex items-center gap-4 bg-cream text-ink px-7 md:px-9 py-5 md:py-6 hover:bg-gold transition-colors duration-500 self-start"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                Request a curated trip
              </span>
              <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
              24h reply · 5 min form · No deposit
            </span>
          </motion.div>
        </div>

        <motion.div
          {...fade}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-5"
        >
          <div className="border border-cream/15 p-8 md:p-10">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
              By signature
            </span>
            <ul className="mt-6 flex flex-col gap-6">
              {EDITORS.map((e) => (
                <li key={e.id} className="flex items-center gap-4">
                  <span
                    className="relative inline-flex w-12 h-12 rounded-full overflow-hidden"
                    style={{ outline: `1px solid ${e.accent}`, outlineOffset: 2 }}
                  >
                    <img
                      src={e.photo}
                      alt={e.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: e.photoPosition }}
                    />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-display text-base md:text-lg font-light text-cream tracking-tight">
                      {e.name}
                    </span>
                    <span
                      className="mt-0.5 font-mono text-[10px] uppercase tracking-wide-editorial"
                      style={{ color: e.accent }}
                    >
                      {e.role.split(" · ")[0]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <span className="block mt-8 pt-6 border-t border-cream/15 font-display italic font-light text-cream/80 text-base md:text-lg leading-[1.4]">
              Every reply lands in your inbox signed by one of us — not a
              shared address.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ----------------------------- PAGE ----------------------------- */

const Journal = () => {
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      {/* Hero */}
      <section className="pt-44 md:pt-52 pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Chapter — Journal · Vol. I
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h1
              {...fade}
              className="font-display font-light text-ink leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[7.5rem]"
            >
              The <span className="italic">field</span> journal.
            </motion.h1>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 max-w-xl font-body font-light text-ink/70 text-base md:text-lg leading-relaxed"
            >
              Region hubs, field notes, and reels — written from the courses
              themselves, by the editors who walk them. We publish slowly. One
              region at a time.
            </motion.p>
          </div>
        </div>
      </section>

      {/* N° 01 — Destination Hubs Slider */}
      <HubsSlider />

      {/* N° 02 — Editors */}
      <EditorsSection />

      {/* N° 03 — Reels */}
      <ReelsSection />

      {/* N° 04 — Field Notes grid */}
      <FieldNotesSection />

      {/* N° 05 — Plan a Round / Contact */}
      <PlanARoundSection />
    </main>
  );
};

export default Journal;
