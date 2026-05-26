import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const PABLO = {
  id: "pablo",
  number: "N° 01",
  label: "The Agent",
  name: "Pablo De La Mora",
  short: "Pablo",
  credentials: [
    "PGA",
    "LPGA",
    "WTA",
    "Sports Agent +5 years",
  ],
  photo: "/pablo.jpg",
  photoPosition: "center 22%",
  accent: "#2C4A2C",
  quote: [
    "Millions of people plan a golf vacation every year.",
    "But I guarantee you will not find a destination that",
    "matches the quality and value that México offers.",
  ],
  body: [
    "Over the past 5 years, my career has taken me inside the player-only areas of the PGA Tour, LIV Golf, and WTA events. But this isn't just a locker room conversation. Listen to almost any post-round interview, and the players will tell you the exact same thing: the people driving Mexican hospitality are world-class.",
    "Now, add to the equation over 50+ renowned designer golf courses, each shaped by its region's unique landscape. No other country in the world offers this exact blend.",
    "That is why I founded Golf in México. I want to give you the exact experience I've enjoyed for the past 5 years. No generic itineraries or opaque pricing. Just honest opinions, genuine hidden gems, professional delivery, and the keys to bespoke experiences you simply won't find online.",
  ],
  signature: "— Pablo",
  socials: [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/pablodlm/", testid: "social-pablo-linkedin" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/pablodlmc/", testid: "social-pablo-instagram" },
  ],
};

const JOSE = {
  id: "jose",
  number: "N° 02",
  label: "The Player",
  name: "José Islas",
  short: "José",
  credentials: [
    "4 Wins · Mexican Tour",
    "3 PGA Tour starts",
    "1 KFT start",
    "2× World Amateur Team Championship",
    "2× Latin American Amateur",
    "2× US Amateur (R16 & R32)",
  ],
  photo: "/jose.jpg",
  photoPosition: "center 22%",
  accent: "#C4A24E",
  body: [
    "The game found me at four. It took me through junior ranks, amateur fields, and professional tours — across twenty countries.",
    "I've teed it up on the PGA Tour at Vidanta and Los Cabos, competed at TPC Sawgrass for the AJGA, and played two World Amateur Team Championships in France and Qatar, the Junior World Cup in Japan, as well as two US Amateurs at Oakmont Country Club and Cherry Hills. I've walked dozens of the world's most demanding fairways.",
    "But after all of that global exposure, the journey taught me one thing with absolute certainty: in México, the game is played differently. After traveling the world, this was the only place that felt like arriving somewhere real.",
    "For a true golfer, our country is not just a stop on the itinerary. It is the destination itself. I'm here to show you exactly why.",
  ],
  signature: "— José",
  socials: [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/joseislasgolf/", testid: "social-jose-instagram" },
  ],
};

const VALUES = [
  {
    mark: "/",
    title: "Tour-Level Precision",
    body:
      "Our standards were forged on professional tours. From the first tee time to the final itinerary, we approach every single detail with the exact rigor and professionalism expected by the world's best players.",
  },
  {
    mark: "//",
    title: "Destination Intelligence",
    body:
      "Over a decade spent scouting México's most exclusive regions. We rely on genuine, boots-on-the-ground relationships to bypass the tourist noise and unlock the country's true hidden gems.",
  },
  {
    mark: "///",
    title: "Long-Term Relationships",
    body:
      "Tourism is transactional; real access is relational. We don't do one-off deals. We build lasting bonds and fiercely take care of the people we work with. From local caddies to course directors, we prioritize radical honesty and mutual respect — because true insider experiences are built on decades of trust.",
  },
];

const GIM = {
  id: "gim",
  number: "N° 03",
  label: "The Collective",
  name: "Golf in Mexico°",
  short: "GIM",
  roleParts: [{ text: "Three principles" }],
  photo: "/logo-wordmark.png",
  isMark: true,
  accent: "#1A1A18",
  headline: ["Three principles."],
};

const TABS = [PABLO, JOSE, GIM];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const InsidersCTA = () => (
  <Link
    to="/about"
    data-testid="founders-cta-insiders"
    className="group mt-8 md:mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-green-mid)] hover:text-[var(--c-gold)] transition-colors duration-500 border-t border-[var(--c-border)] pt-6"
  >
    Meet the Founders
    <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
  </Link>
);

const TeamEditorial = () => {
  const [activeId, setActiveId] = useState("pablo");
  const active = TABS.find((t) => t.id === activeId);
  const isGIM = active.id === "gim";
  const isPablo = active.id === "pablo";

  return (
    <section
      id="founders"
      data-testid="team-editorial-section"
      className="relative bg-[var(--c-off-white)] border-t border-[var(--c-border)] scroll-mt-24"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Section headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          data-testid="founders-headline"
          className="font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-3xl md:text-5xl lg:text-6xl max-w-[22ch] mb-14 md:mb-20"
        >
          Built by the people <em className="italic text-[var(--c-gold)]">inside the ropes.</em>
        </motion.h2>

        {/* Tabs */}
        <div
          data-testid="author-tabs"
          role="tablist"
          className="grid grid-cols-3 gap-2 md:gap-6 border-b border-[var(--c-border)] pb-5 md:pb-6"
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
                style={{ borderColor: isActive ? t.accent : "transparent" }}
              >
                <span
                  className={`relative inline-flex shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden ${
                    t.isMark ? "bg-[var(--c-green-deep)] p-1.5 md:p-2 flex items-center justify-center" : ""
                  }`}
                  style={{
                    outline: isActive ? `1px solid ${t.accent}` : "none",
                    outlineOffset: 2,
                  }}
                >
                  {t.isMark ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
                  ) : (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" style={{ objectPosition: t.photoPosition }} />
                  )}
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span
                    className={`font-mono text-[8px] md:text-[10px] uppercase tracking-[0.16em] ${
                      isActive ? "" : "text-[var(--c-text-muted)]"
                    }`}
                    style={isActive ? { color: t.accent } : {}}
                  >
                    {t.number} · {t.label}
                  </span>
                  <span
                    className={`mt-0.5 md:mt-1 font-display text-sm md:text-xl font-normal tracking-tight truncate ${
                      isActive ? "text-[var(--c-text)]" : "text-[var(--c-text-muted)] group-hover:text-[var(--c-text)]"
                    } transition-colors`}
                  >
                    {t.short}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="mt-10 md:mt-14 min-h-[480px] md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} {...fadeUp} className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Left meta */}
              <div className="col-span-12 md:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
                  {active.number} — {active.label}
                </span>
                <h3 className="mt-3 font-display text-xl md:text-2xl font-normal text-[var(--c-text)] tracking-tight">
                  {active.name}
                </h3>
                {active.credentials && (
                  <ul
                    data-testid={`credentials-${active.id}`}
                    className="mt-4 space-y-1.5"
                  >
                    {active.credentials.map((c) => (
                      <li
                        key={c}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-gold)] leading-[1.6]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                {active.roleParts && (
                  <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: active.accent }}>
                    {active.roleParts.map((p, idx) => (
                      <span key={idx} className={p.gold ? "text-[var(--c-gold)]" : ""}>
                        {p.text}
                      </span>
                    ))}
                  </span>
                )}
              </div>

              {/* Right content */}
              <div className="col-span-12 md:col-span-9">
                {/* Pablo's pull quote */}
                {isPablo && (
                  <blockquote
                    data-testid="pablo-quote"
                    className="border-l-2 border-[var(--c-gold)] pl-6 md:pl-8 font-display italic font-normal text-[var(--c-text)] text-2xl md:text-4xl leading-[1.3] max-w-3xl"
                  >
                    &ldquo;{active.quote.join(" ")}&rdquo;
                  </blockquote>
                )}

                {/* José headline (no quote) */}
                {!isPablo && !isGIM && (
                  <h3
                    data-testid={`manifesto-headline-${active.id}`}
                    className="font-display font-normal text-[var(--c-text)] text-2xl md:text-4xl leading-[1.2] tracking-tight max-w-3xl"
                  >
                    The game is played <em className="italic text-[var(--c-gold)]">differently here.</em>
                  </h3>
                )}

                {isGIM && (
                  <h3
                    className="font-display font-normal text-[var(--c-text)] text-2xl md:text-4xl leading-[1.2] tracking-tight max-w-3xl"
                  >
                    Three <em className="italic text-[var(--c-gold)]">principles.</em>
                  </h3>
                )}

                {!isGIM && (
                  <>
                    {active.body.map((p, i) => (
                      <p
                        key={i}
                        className={`${i === 0 ? "mt-7 md:mt-9" : "mt-4 md:mt-5"} font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-2xl`}
                      >
                        {p}
                      </p>
                    ))}

                    {active.signature && (
                      <p
                        data-testid={`signature-${active.id}`}
                        className="mt-6 md:mt-8 font-display italic font-normal text-[var(--c-text)] text-lg md:text-xl"
                      >
                        {active.signature}
                      </p>
                    )}

                    {active.socials && active.socials.length > 0 && (
                      <div data-testid={`socials-${active.id}`} className="mt-8 md:mt-10 flex items-center gap-2">
                        {active.socials.map((s) => {
                          const Icon = s.icon;
                          return (
                            <a
                              key={s.label}
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${active.short} on ${s.label}`}
                              data-testid={s.testid}
                              className="group inline-flex items-center justify-center w-9 h-9 border transition-colors duration-300"
                              style={{ borderColor: `${active.accent}40` }}
                            >
                              <Icon className="w-4 h-4 text-[var(--c-text-mid)] group-hover:text-[var(--c-text)] transition-colors" strokeWidth={1.4} />
                            </a>
                          );
                        })}
                      </div>
                    )}

                    <InsidersCTA />
                  </>
                )}

                {isGIM && (
                  <ul className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--c-border)] border-t border-b border-[var(--c-border)]">
                    {VALUES.map((v, i) => (
                      <motion.li
                        key={v.mark}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                        data-testid={`gim-value-${i + 1}`}
                        className="bg-[var(--c-off-white)] p-6 md:p-7 flex flex-col gap-3"
                      >
                        <span className="font-display font-normal text-[var(--c-gold)] text-3xl md:text-4xl leading-none tracking-tight">
                          {v.mark}
                        </span>
                        <h4 className="font-display font-normal text-[var(--c-text)] text-lg md:text-xl leading-[1.2] tracking-tight">
                          {v.title}
                        </h4>
                        <p className="font-body font-light text-[var(--c-text-muted)] text-sm md:text-[15px] leading-[1.65]">
                          {v.body}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
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
