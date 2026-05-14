import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FOUNDERS = [
  {
    id: "pablo",
    roman: "I",
    name: "Pablo De La Mora",
    role: "El Estratega",
    role_en: "The Insider",
    title: "PGA Tour Agent",
    creds: [
      "PGA Tour Agent",
      "30+ courses walked",
      "Operator network across México",
    ],
    accent: "forest",
    photo:
      "https://images.unsplash.com/photo-1601442705509-c6d748675f7f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600",
    pull:
      "He has walked every fairway worth walking from Los Cabos to the Riviera Maya.",
    body:
      "Pablo represents tour professionals as a vocation and walks fairways as a habit. Thirty-plus courses, by his own count — each remembered the way other people remember meals: by the company, the weather, and the way the light fell on the fifteenth. If a course is worth the flight, he can tell you who built it, who looks after it, and who to ask for at the desk.",
  },
  {
    id: "jose",
    roman: "II",
    name: "José Islas",
    role: "El Competidor",
    role_en: "The Player",
    title: "Professional Golfer",
    creds: [
      "US Amateur · 2023 QF",
      "WWT Championship · Mayakoba",
      "Mexico Open at Vidanta",
    ],
    accent: "gold",
    photo:
      "https://images.unsplash.com/photo-1613096108660-104d7e8b132a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600",
    pull:
      "He competes where the rest of us only travel — and brings back the kind of stories you can only hear over a quiet dinner.",
    body:
      "José came of age inside the ropes. The quarterfinals at Cherry Hills in 2023 — eighteen years old, on television, two over par in a Texas heatwave. He came home and played the WWT in Mayakoba that November, and the Mexico Open at Vidanta the following spring. He started keeping notes. The notes became the journal.",
  },
];

const directions = { 1: 1, "-1": -1 };

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
      className="relative bg-cream pt-24 md:pt-36 pb-28 md:pb-40 overflow-hidden"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              N° 02 — The Founders
            </span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
              Two players, two voices — and the only three pillars{" "}
              <span className="italic">that matter.</span>
            </h2>
            <p className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed">
              Pablo and José have spent the better part of two decades inside
              the game in México — as agent, as competitor, as friend of the
              house. Together they cover the only three things worth covering:
              <span className="text-ink"> golf, people, cultura.</span>
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
                <div className="absolute -top-4 left-0 z-10">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wide-editorial"
                    style={{ color: accent }}
                  >
                    {current.role} · {current.role_en}
                  </span>
                </div>
                <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={current.photo}
                    alt={`${current.name} portrait`}
                    className="w-full h-full object-cover editorial-img"
                  />
                  {/* Roman numeral big mark */}
                  <span
                    className="absolute -left-2 -bottom-6 md:-bottom-10 font-display font-light leading-none pointer-events-none select-none"
                    style={{
                      color: accent,
                      fontSize: "clamp(8rem, 18vw, 16rem)",
                      mixBlendMode: "multiply",
                      opacity: 0.92,
                    }}
                  >
                    {current.roman}
                  </span>
                </div>
              </div>

              {/* Content column */}
              <div className="col-span-12 md:col-span-6 md:pl-4">
                <span
                  className="font-mono text-[10px] uppercase tracking-wide-editorial"
                  style={{ color: accent }}
                >
                  Founder · {current.roman}
                </span>
                <h3 className="mt-4 font-display text-5xl md:text-7xl font-light tracking-tight text-ink leading-[0.95]">
                  {current.name}
                </h3>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {current.title}
                </p>

                {/* Creds list */}
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

                {/* Pull quote with accent rule */}
                <div
                  className="mt-10 md:mt-12 pl-5 border-l-2"
                  style={{ borderColor: accent }}
                >
                  <p className="font-display italic font-light text-ink text-xl md:text-2xl leading-[1.3] max-w-md">
                    {current.pull}
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
            {/* Indicators */}
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

            {/* Counter + arrows */}
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
