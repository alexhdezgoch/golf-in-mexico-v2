import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FOUNDERS = [
  {
    id: "pablo",
    roman: "I",
    name: "Pablo De La Mora",
    role: "El Estratega",
    role_en: "The Insider",
    title: "Professional Sports Agent",
    creds: [
      "Five years managing professional golfers and tennis players",
      "PGA Tour · LPGA · WTA · PGA Tour Americas · Mexican Tour",
      "The Masters · TPC Sawgrass · Roland Garros · Qatar 2022",
      "Ten-plus PGA / Korn Ferry / PGA Tour Americas events worked",
    ],
    accent: "forest",
    photo: "/pablo.jpg",
    photoPosition: "center 22%",
    pull:
      "I have arranged travel for professional golfers, their families, and their sponsors — disciplined budgets, considered choices, the best experience possible.",
    body:
      "Pablo represents tour professionals and has walked fairways outside the ropes for the better part of a decade. Each event opened a door — to a region, to a property, to the course pros who quietly run the place. He learned what a trip is supposed to feel like when it is arranged by someone who has been there first.",
  },
  {
    id: "jose",
    roman: "II",
    name: "José Islas",
    role: "El Competidor",
    role_en: "The Player",
    title: "Professional Golfer",
    creds: [
      "Four-time winner · Mexican Tour",
      "Three PGA Tour starts · One Korn Ferry · Five-plus PGA Tour Americas",
      "Record holder · US Amateur from Mexico · 2023 Quarterfinals",
      "Eighteen years inside Mexico's golf",
    ],
    accent: "gold",
    photo: "/jose.jpg",
    photoPosition: "center 22%",
    pull:
      "I have played golf in Mexico for eighteen years. I know the grass, the industry, and the round each visitor is actually here for.",
    body:
      "José came of age inside the ropes. He has been among Mexico's most consistent players at every stage — Junior, Amateur, Pro — and is still chasing full status on Tour. In the meantime, he laid the foundations of this project. We will be alongside him for what comes next.",
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const FoundersSlider = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);
  const total = FOUNDERS.length;

  const go = useCallback(
    (next) => {
      const target = (next + total) % total;
      setDir(target > index || (index === total - 1 && target === 0) ? 1 : -1);
      setIndex(target);
    },
    [index, total]
  );

  const onKey = useCallback(
    (e) => {
      if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    },
    [go, index]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const current = FOUNDERS[index];
  const accent = current.accent === "gold" ? "#C4A24E" : "#2C4A2C";

  return (
    <section
      data-testid="founders-section"
      className="relative bg-cream border-t hairline pt-24 md:pt-36 pb-28 md:pb-40 overflow-hidden"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header — Team intro */}
        <div className="grid grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              N° 02 — The Team
            </span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
              A team that has played PGA Tour events, traveled the Latin
              American Amateur circuit, and built a network across Mexico's{" "}
              <span className="italic">finest regions.</span>
            </h2>
            <p className="mt-8 font-body font-light text-ink/75 text-base md:text-lg max-w-2xl leading-relaxed">
              Pablo and José are colleagues in professional golf. They started
              this journal to share what they have learned inside the game — to
              be the local voice that turns an international visitor's round
              into something properly considered.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div
          data-testid="founders-slider"
          className="relative border-t border-ink/15 pt-10 md:pt-14"
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={current.id}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`founder-slide-${current.id}`}
              className="grid grid-cols-12 gap-8 md:gap-16 items-start"
            >
              {/* Photo column */}
              <div className="col-span-12 md:col-span-6 relative">
                <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={current.photo}
                    alt={`${current.name} portrait`}
                    style={{ objectPosition: current.photoPosition || "center" }}
                    className="w-full h-full object-cover editorial-img"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wide-editorial"
                    style={{ color: accent }}
                  >
                    {current.role} · {current.role_en}
                  </span>
                  <span
                    className="font-display font-light leading-none"
                    style={{ color: accent, fontSize: "2rem", opacity: 0.85 }}
                  >
                    {current.roman}
                  </span>
                </div>
              </div>

              {/* Content column */}
              <div className="col-span-12 md:col-span-6 md:pl-4 md:pt-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: accent }}
                >
                  Founder · {current.roman}
                </span>
                <h3 className="mt-4 font-display text-4xl md:text-6xl font-light tracking-tight text-ink leading-[1]">
                  {current.name}
                </h3>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {current.title}
                </p>

                <ul className="mt-6 space-y-3">
                  {current.creds.map((c) => (
                    <li
                      key={c}
                      className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-wide-editorial text-ink/80"
                    >
                      <span
                        className="inline-block w-3 h-px"
                        style={{ backgroundColor: accent }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-10 md:mt-12 pl-5 border-l-2"
                  style={{ borderColor: accent }}
                >
                  <p className="font-display italic font-light text-ink text-xl md:text-2xl leading-[1.3] max-w-md">
                    “{current.pull}”
                  </p>
                </div>

                <p className="mt-10 font-body font-light text-ink/80 text-base md:text-lg leading-[1.7] max-w-prose">
                  {current.body}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-14 md:mt-16 flex items-center justify-between gap-6 border-t border-ink/15 pt-6">
            <div className="flex items-center gap-6">
              {FOUNDERS.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  data-testid={`founder-indicator-${f.id}`}
                  aria-label={`Show ${f.name}`}
                  className="group flex items-center gap-3"
                >
                  <span
                    className={`block h-px transition-all duration-500 ${
                      i === index ? "w-14 bg-ink" : "w-8 bg-ink/30"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide-editorial transition-colors ${
                      i === index ? "text-ink" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} · {f.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted hidden sm:inline">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                onClick={() => go(index - 1)}
                data-testid="founder-prev"
                aria-label="Previous founder"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-ink/30 text-ink hover:bg-ink hover:text-cream transition-colors duration-500 inline-flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={() => go(index + 1)}
                data-testid="founder-next"
                aria-label="Next founder"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-ink/30 text-ink hover:bg-ink hover:text-cream transition-colors duration-500 inline-flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSlider;
