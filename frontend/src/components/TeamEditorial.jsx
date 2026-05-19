import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

const PABLO = {
  id: "pablo",
  number: "N° 01",
  label: "The Agent",
  name: "Pablo De La Mora",
  short: "Pablo",
  roleParts: [
    { text: "PGA Tour", gold: true },
    { text: " · " },
    { text: "LPGA Tour", gold: true },
    { text: " · " },
    { text: "WTA", gold: true },
    { text: " Sports Agent" },
  ],
  photo: "/pablo.jpg",
  photoPosition: "center 22%",
  accent: "#2C4A2C",
  headline: ["Mexico Golf competes worldwide,", "just not many people know about it."],
  body: [
    "I've been to four PGA Tour events, three LIV Golf, one LPGA, and two ATP and WTA. Every locker room conversation has been similar: the courses are world-class, and the hospitality is top-notch. México offers an elite destination for an all-around trip.",
    "My experience over several years has led me to share my insights, connect people, and always create opportunities. This company is dedicated to promoting what I've enjoyed for the past decade — with insider knowledge and professional management.",
  ],
  signature: "Pablo De La Mora · CDMX",
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
  roleParts: [{ text: "Professional Golfer" }],
  photo: "/jose.jpg",
  photoPosition: "center 22%",
  accent: "#C4A24E",
  headline: ["Every course tells you", "what round it wants you to play."],
  body: [
    "Mexican courses speak a particular dialect. Paspalum that holds the ball. Greens that read the ocean. Altitudes that lie about distance. My role here is to translate — so you walk the first tee already knowing what the course is asking.",
    "A good round is not played against the course. It is played with it.",
  ],
  signature: "José Islas · Inside the ropes",
  socials: [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/joseislasgolf/", testid: "social-jose-instagram" },
  ],
};

const VALUES = [
  {
    mark: "/",
    title: "Attention to detail & professionalism",
    body:
      "Values shaped by years of working, training, and approaching everything in tour environments.",
  },
  {
    mark: "//",
    title: "Destination Intelligence",
    body:
      "Over a decade traveling across México's finest destinations. Local gems and key relationships.",
  },
  {
    mark: "///",
    title: "Long-Term Relationships",
    body:
      "We prioritize the well-being of our people and value assertive communication.",
  },
];

const GIM = {
  id: "gim",
  number: "N° 03",
  label: "The Media",
  name: "Golf in Mexico°",
  short: "GIM",
  roleParts: [{ text: "Our Values" }],
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

const TeamEditorial = () => {
  const [activeId, setActiveId] = useState("pablo");
  const active = TABS.find((t) => t.id === activeId);
  const isGIM = active.id === "gim";

  return (
    <section
      id="founders"
      data-testid="team-editorial-section"
      className="relative bg-cream border-t hairline scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Tabs */}
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
                style={{ borderColor: isActive ? t.accent : "transparent" }}
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
                    <img src={t.photo} alt={t.name} className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
                  ) : (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" style={{ objectPosition: t.photoPosition }} />
                  )}
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className={`font-mono text-[8px] md:text-[10px] uppercase tracking-wide-editorial ${isActive ? "" : "text-muted"}`} style={isActive ? { color: t.accent } : {}}>
                    {t.number} · {t.label}
                  </span>
                  <span className={`mt-0.5 md:mt-1 font-display text-sm md:text-xl font-light tracking-tight truncate ${isActive ? "text-ink" : "text-muted group-hover:text-ink"} transition-colors`}>
                    {t.short}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="mt-8 md:mt-12 min-h-[480px] md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} {...fadeUp} className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Left meta */}
              <div className="col-span-12 md:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {active.number} — {active.label}
                </span>
                <h3 className="mt-3 font-display text-xl md:text-2xl font-light text-ink tracking-tight">
                  {active.name}
                </h3>
                <span className="block mt-1 font-mono text-[10px] uppercase tracking-wide-editorial" style={{ color: active.accent }}>
                  {active.roleParts.map((p, idx) => (
                    <span key={idx} className={p.gold ? "text-gold" : ""}>
                      {p.text}
                    </span>
                  ))}
                </span>
              </div>

              {/* Right content */}
              <div className="col-span-12 md:col-span-9">
                <h3
                  data-testid={`manifesto-headline-${active.id}`}
                  className="font-display font-light text-ink text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-4xl"
                >
                  {active.headline[0]}
                  {active.headline[1] && (
                    <>
                      {" "}
                      <span className="italic">{active.headline[1]}</span>
                    </>
                  )}
                </h3>

                {!isGIM && (
                  <>
                    {active.body.map((p, i) => (
                      <p
                        key={i}
                        className={`${i === 0 ? "mt-6 md:mt-8" : "mt-4 md:mt-5"} font-body font-light text-ink/80 text-base md:text-lg leading-[1.7] max-w-2xl`}
                      >
                        {p}
                      </p>
                    ))}

                    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/15 pt-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                        <span className="font-display italic font-light text-ink/65 text-sm md:text-base">
                          — {active.signature}
                        </span>
                        {active.socials && active.socials.length > 0 && (
                          <div data-testid={`socials-${active.id}`} className="flex items-center gap-2">
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
                                  <Icon className="w-4 h-4 text-ink/65 group-hover:text-ink transition-colors" strokeWidth={1.4} />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {isGIM && (
                  <ul className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border-t border-b border-ink/10">
                    {VALUES.map((v, i) => (
                      <motion.li
                        key={v.mark}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                        data-testid={`gim-value-${i + 1}`}
                        className="bg-cream p-5 md:p-6 flex flex-col gap-3"
                      >
                        <span className="font-display font-light text-gold text-3xl md:text-4xl leading-none tracking-tight">
                          {v.mark}
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
