import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AUTHORS = [
  {
    id: "pablo",
    name: "Pablo De La Mora",
    short: "Pablo",
    role: "Sports Agent",
    label: "The Agent",
    number: "N° 02",
    photo: "/pablo.jpg",
    photoPosition: "center 22%",
    accent: "#2C4A2C",
    headline: ["Most golf trips fail", "before they begin."],
    italicWord: "before they begin.",
    body:
      "They are sold, not designed. The right tee time. The room two minutes from where you actually want to be. The car that does not wait. Done well, a golf trip stops being a logistics problem — and becomes the reason you book the next one.",
    quote:
      "My job is to remove every line between you and the round you came here for.",
    signature: "Pablo De La Mora · Los Cabos.",
    cta: "Read Pablo in the Journal",
  },
  {
    id: "jose",
    name: "José Islas",
    short: "José",
    role: "Professional Golfer",
    label: "The Player",
    number: "N° 03",
    photo: "/jose.jpg",
    photoPosition: "center 22%",
    accent: "#C4A24E",
    headline: ["Every course tells you what", "round it wants you to play."],
    italicWord: "round it wants you to play.",
    body:
      "Mexican courses speak a particular dialect. Paspalum that holds the ball. Greens that read the ocean. Altitudes that lie about distance. My role here is to translate — so you walk the first tee already knowing what the course is asking.",
    quote:
      "A good round is not played against the course. It is played with it.",
    signature: "José Islas · Inside the ropes.",
    cta: "Read José in the Journal",
  },
];

const VALUES = [
  {
    roman: "I",
    title: "Professional Management",
    body:
      "Built around elite golfers and Tour-level environments. Structure over improvisation.",
  },
  {
    roman: "II",
    title: "Destination Intelligence",
    body:
      "Six years across México's finest courses. Trusted relationships, never generic packages.",
  },
  {
    roman: "III",
    title: "Long-Term Relationships",
    body:
      "Not a booking platform. A practice. Every trip is the start of the next one.",
  },
];

const GIM = {
  id: "gim",
  name: "Golf in Mexico°",
  short: "GIM",
  role: "Our Values",
  label: "The Practice",
  number: "N° 04",
  photo: "/logo-wordmark.png",
  isMark: true,
  accent: "#1A1A18",
  headline: ["Three principles.", "Every trip, every story."],
  italicWord: "Every trip, every story.",
};

const TABS = [...AUTHORS, GIM];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const TeamEditorial = () => {
  const [activeId, setActiveId] = useState("pablo");
  const active = TABS.find((t) => t.id === activeId);
  const isGIM = active.id === "gim";

  return (
    <section
      data-testid="team-editorial-section"
      className="relative bg-cream border-t hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header row — tabs */}
        <div
          data-testid="author-tabs"
          role="tablist"
          className="grid grid-cols-3 gap-2 md:gap-6 border-b border-ink/15 pb-5 md:pb-6"
        >
          {TABS.map((t) => {
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(t.id)}
                data-testid={`author-tab-${t.id}`}
                className="group text-left flex items-center gap-2 md:gap-4 pt-3 border-t-2 transition-colors duration-500"
                style={{
                  borderColor: isActive ? t.accent : "transparent",
                }}
              >
                <span
                  className={`relative inline-flex shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden ${
                    t.isMark ? "bg-ink p-1.5 md:p-2 flex items-center justify-center" : ""
                  }`}
                  style={{
                    outline: isActive ? `1px solid ${t.accent}` : "none",
                    outlineOffset: 2,
                  }}
                >
                  {t.isMark ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: "screen" }}
                    />
                  ) : (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: t.photoPosition }}
                    />
                  )}
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span
                    className={`font-display text-sm md:text-xl font-light tracking-tight truncate ${
                      isActive ? "text-ink" : "text-muted group-hover:text-ink"
                    } transition-colors`}
                  >
                    {t.short}
                  </span>
                  <span
                    className="mt-0.5 md:mt-1 font-mono text-[8px] md:text-[10px] uppercase tracking-wide-editorial hidden sm:block"
                    style={{
                      color: isActive ? t.accent : undefined,
                    }}
                  >
                    {t.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="mt-8 md:mt-12 min-h-[480px] md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              {...fadeUp}
              className="grid grid-cols-12 gap-6 md:gap-10"
            >
              {/* Left meta */}
              <div className="col-span-12 md:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {active.number} — {active.label}
                </span>
                <div className="mt-3 md:mt-5 flex items-center gap-3">
                  <span className="font-display text-lg md:text-2xl font-light text-ink tracking-tight">
                    {active.name}
                  </span>
                </div>
                <span
                  className="block mt-1 font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: active.accent }}
                >
                  {active.role}
                </span>
              </div>

              {/* Right content */}
              <div className="col-span-12 md:col-span-9">
                <h3
                  data-testid={`manifesto-headline-${active.id}`}
                  className="font-display font-light text-ink text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-4xl"
                >
                  {active.headline[0]}{" "}
                  <span className="italic">{active.headline[1]}</span>
                </h3>

                {!isGIM && (
                  <>
                    <p className="mt-6 md:mt-8 font-body font-light text-ink/80 text-base md:text-lg leading-[1.7] max-w-2xl">
                      {active.body}
                    </p>

                    <blockquote
                      className="mt-6 md:mt-8 max-w-2xl pl-4 md:pl-5"
                      style={{ borderLeft: `2px solid ${active.accent}` }}
                    >
                      <p className="font-display italic font-light text-ink text-lg md:text-2xl leading-[1.3] tracking-tight">
                        {active.quote}
                      </p>
                    </blockquote>

                    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/15 pt-5">
                      <span className="font-display italic font-light text-ink/65 text-sm md:text-base">
                        — {active.signature}
                      </span>
                      <Link
                        to="/journal"
                        data-testid={`manifesto-cta-${active.id}`}
                        className="group inline-flex items-center gap-3 border border-ink/40 px-5 py-3 hover:bg-ink hover:text-cream transition-colors duration-500 self-start sm:self-auto"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
                          {active.cta}
                        </span>
                        <span className="font-mono text-[10px] transition-transform duration-500 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </>
                )}

                {isGIM && (
                  <>
                    <ul className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border-t border-b border-ink/10">
                      {VALUES.map((v, i) => (
                        <motion.li
                          key={v.roman}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.08 * i,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          data-testid={`gim-value-${i + 1}`}
                          className="bg-cream p-5 md:p-6 flex flex-col gap-3"
                        >
                          <span className="font-display italic font-light text-gold text-3xl md:text-4xl leading-none">
                            {v.roman}
                          </span>
                          <h4 className="font-display font-light text-ink text-lg md:text-xl leading-[1.15] tracking-tight">
                            {v.title}
                          </h4>
                          <p className="font-body font-light text-ink/70 text-sm md:text-[15px] leading-[1.6]">
                            {v.body}
                          </p>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-ink/15 pt-5">
                      <p className="font-display italic font-light text-ink/80 text-base md:text-lg leading-[1.35] tracking-tight max-w-md">
                        The full editorial lives in one place.
                      </p>
                      <Link
                        to="/journal"
                        data-testid="manifesto-cta-gim-journal"
                        className="group inline-flex items-center gap-3 bg-ink text-cream px-6 md:px-7 py-4 hover:bg-forest transition-colors duration-500 self-start sm:self-auto"
                      >
                        <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                          Enter the Journal
                        </span>
                        <span className="font-mono text-sm transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TeamEditorial;
