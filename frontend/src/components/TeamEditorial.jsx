import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AUTHORS = [
  {
    id: "pablo",
    name: "Pablo De La Mora",
    short: "Pablo",
    role: "Sports Agent · The Insider",
    differentiator:
      "An agent's view from inside the ropes — strategy, logistics, and the texture of travel done right.",
    photo: "/pablo.jpg",
    photoPosition: "center 22%",
    accent: "#2C4A2C",
    articles: [
      {
        title: "The bachelor trip in Cabo that became a business.",
        tag: "Los Cabos · Field Story",
        category: "Story",
        img:
          "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Inside the week of a Tour agent — what travel really costs.",
        tag: "PGA Tour · Notes",
        category: "Field Notes",
        img:
          "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Booking premium golf in México — the agent's playbook.",
        tag: "Travel · Guide",
        category: "Guide",
        img:
          "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "jose",
    name: "José Islas",
    short: "José",
    role: "Professional Golfer · The Player",
    differentiator:
      "A player's notes from inside the ropes — grass, lines, and the round each course actually wants you to play.",
    photo: "/jose.jpg",
    photoPosition: "center 22%",
    accent: "#C4A24E",
    articles: [
      {
        title: "Playing the WWT in Mayakoba — a player's diary.",
        tag: "Riviera Maya · Player Diary",
        category: "Diary",
        img:
          "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Notes on grass — why Mexican greens play different.",
        tag: "Agronomy · Field Notes",
        category: "Field Notes",
        img:
          "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "The 2023 US Amateur QF, from a Mexican kid's perspective.",
        tag: "US Amateur · Profile",
        category: "Profile",
        img:
          "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "gim",
    name: "Golf in Mexico°",
    short: "GIM",
    role: "Our Values",
    differentiator:
      "Three principles that shape every conversation, every guide, and every trip we touch.",
    photo: "/logo-wordmark.png",
    photoPosition: "center",
    accent: "#1A1A18",
    isMark: true,
    isValues: true,
    articles: [
      {
        title: "Professional Management",
        tag: "How we work",
        category: "Value · I",
        img:
          "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80",
        body:
          "We have worked around elite golfers and high-level Tour environments. The approach is simple: understand what you value, then design and execute every detail with structure — not improvisation.",
      },
      {
        title: "Destination Intelligence",
        tag: "What we know",
        category: "Value · II",
        img:
          "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80",
        body:
          "Six years traveling México's finest golf destinations have built trusted relationships across hospitality, golf, and logistics. We cut through generic packages and curate the right mix — course, stay, and flow — for each trip.",
      },
      {
        title: "Long-Term Relationships",
        tag: "Why we exist",
        category: "Value · III",
        img:
          "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=80",
        body:
          "This is not a booking platform. It is a relationship-driven practice. We work closely with every client so each trip builds trust — not just a transaction.",
      },
    ],
  },
];

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const TeamEditorial = () => {
  const [activeId, setActiveId] = useState("pablo");
  const active = AUTHORS.find((a) => a.id === activeId);

  return (
    <section
      data-testid="team-editorial-section"
      className="relative bg-cream border-t hairline py-24 md:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              N° 02 — The Team
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
            >
              Two players, two voices, and one editorial.{" "}
              <span className="italic">Choose where to begin.</span>
            </motion.h2>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
            >
              Each author writes from the inside. Pick a name to read three
              pieces that explain what they cover, and why.
            </motion.p>
          </div>
        </div>

        {/* Tabs */}
        <div
          data-testid="author-tabs"
          className="grid grid-cols-12 gap-3 md:gap-6 border-t border-ink/15 pt-6"
          role="tablist"
        >
          {AUTHORS.map((a) => {
            const isActive = a.id === activeId;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(a.id)}
                data-testid={`author-tab-${a.id}`}
                className={`col-span-12 md:col-span-4 group text-left flex items-center gap-4 py-4 border-t-2 transition-colors duration-500 ${
                  isActive
                    ? "border-ink text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
                style={isActive ? { borderColor: a.accent } : {}}
              >
                <span
                  className={`relative inline-flex shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ${
                    a.isMark ? "bg-ink p-2 flex items-center justify-center" : ""
                  }`}
                  style={{ outline: isActive ? `1px solid ${a.accent}` : "none", outlineOffset: 2 }}
                >
                  {a.isMark ? (
                    <img
                      src={a.photo}
                      alt={a.name}
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: "screen" }}
                    />
                  ) : (
                    <img
                      src={a.photo}
                      alt={a.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: a.photoPosition }}
                    />
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-xl md:text-2xl font-light leading-none tracking-tight">
                    {a.name}
                  </span>
                  <span
                    className="mt-1.5 font-mono text-[10px] uppercase tracking-wide-editorial"
                    style={{ color: isActive ? a.accent : undefined }}
                  >
                    {a.role}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Author differentiator + cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Differentiator */}
            <div className="mt-14 md:mt-20 grid grid-cols-12 gap-8 mb-12 md:mb-16">
              <div className="col-span-12 md:col-span-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: active.accent }}
                >
                  Now reading · {active.short}
                </span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="font-display italic font-light text-ink text-2xl md:text-3xl leading-[1.25] tracking-tight max-w-3xl">
                  {active.differentiator}
                </p>
              </div>
            </div>

            {/* Cards grid */}
            <ul className="grid grid-cols-12 gap-6 md:gap-8">
              {active.articles.map((article, i) => {
                const Wrapper = article.href ? Link : "div";
                const wrapperProps = article.href
                  ? { to: article.href }
                  : {};
                return (
                  <motion.li
                    key={`${active.id}-${i}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    data-testid={`team-article-${active.id}-${i + 1}`}
                    className="col-span-12 md:col-span-4 group"
                  >
                    <Wrapper {...wrapperProps} className="block">
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover editorial-img transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
                        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                          <span
                            className="self-start font-mono text-[10px] uppercase tracking-wide-editorial text-cream/90 border border-cream/40 px-2.5 py-1"
                          >
                            {article.category}
                          </span>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70">
                              {article.tag}
                            </span>
                            <h3 className="mt-2 font-display text-xl md:text-2xl font-light text-cream leading-[1.15] tracking-tight max-w-[18ch]">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between text-ink">
                        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                          By {active.short}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wide-editorial transition-transform duration-500 group-hover:translate-x-1">
                          {article.href ? "Read →" : "Soon"}
                        </span>
                      </div>
                    </Wrapper>
                  </motion.li>
                );
              })}
            </ul>

            {/* See all */}
            <div className="mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-ink/15 pt-6">
              <p className="font-display italic font-light text-ink text-lg md:text-2xl tracking-tight max-w-xl leading-[1.3]">
                Read the full archive of {active.short}'s pieces in the
                journal.
              </p>
              <Link
                to="/journal"
                data-testid={`team-author-cta-${active.id}`}
                className="group inline-flex items-center gap-3 border border-ink/40 px-5 py-3 hover:bg-ink hover:text-cream transition-colors duration-500"
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
                  All editorial pieces
                </span>
                <span className="font-mono text-[10px] transition-transform duration-500 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TeamEditorial;
