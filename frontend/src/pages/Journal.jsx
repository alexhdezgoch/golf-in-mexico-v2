import { motion } from "framer-motion";

const GRID = [
  {
    url:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1600&q=80",
    label: "Diamante, Los Cabos",
    issue: "N° 001 · Field Notes",
    title: "On the morning wind at Cabo del Sol",
  },
  {
    url:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=80",
    label: "El Camaleón, Mayakoba",
    issue: "N° 001 · Course",
    title: "Eighteen holes of jungle and cenote",
  },
  {
    url:
      "https://images.unsplash.com/photo-1514480573427-1f96cbed6a27?auto=format&fit=crop&w=1600&q=80",
    label: "Vidanta, Vallarta",
    issue: "N° 001 · Tournament",
    title: "Notes from Mexico Open week",
  },
  {
    url:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=80",
    label: "Punta Mita, Nayarit",
    issue: "N° 001 · Travel",
    title: "Three days, two courses, one tail of wind",
  },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const Journal = () => {
  return (
    <main data-testid="page-journal" className="relative bg-cream">
      {/* Header */}
      <section className="pt-44 md:pt-52 pb-16 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Chapter — Journal
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
              Long-form essays, photo studies, and quiet dispatches from courses
              along both coasts. Released four times a year, in print and here.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Article grid (behind overlay) */}
      <section
        data-testid="journal-grid"
        className="relative pb-32 md:pb-44"
        aria-hidden="true"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12">
          {GRID.map((a, i) => {
            const colSpan = i % 3 === 0 ? "md:col-span-8" : "md:col-span-4";
            const offset = i === 1 ? "md:mt-24" : i === 3 ? "md:mt-12" : "";
            return (
              <article
                key={i}
                data-testid={`journal-card-${i + 1}`}
                className={`col-span-12 ${colSpan} ${offset}`}
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={a.url}
                    alt={a.label}
                    className="w-full h-full object-cover editorial-img"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                      {a.issue}
                    </span>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl font-light text-ink leading-tight max-w-md">
                      {a.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                  {a.label}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Coming Soon overlay — deliberate editorial pause */}
      <motion.div
        data-testid="coming-soon-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[80] flex items-center justify-center backdrop-blur-[14px] bg-cream/72"
        style={{ pointerEvents: "auto" }}
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2 hidden md:flex items-end">
            <span className="vertical-rl font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              Issue N° 001 · In Preparation
            </span>
          </div>

          <div className="col-span-12 md:col-span-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
            >
              — A deliberate pause —
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              data-testid="coming-soon-title"
              className="mt-8 font-display font-light text-ink text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight"
            >
              The journal <br />
              <span className="italic">is coming.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-10 font-body font-light text-ink/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            >
              We are writing it the way the courses deserve to be written about
              — slowly. The first issue arrives this season. Until then, this
              page will wait, beautifully, in its absence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-14 flex flex-col items-center gap-5"
            >
              <span className="block w-px h-12 bg-ink/30" />
              <a
                href="/"
                data-testid="coming-soon-home-link"
                className="editorial-link font-mono text-[11px] uppercase tracking-wide-editorial text-ink"
              >
                Return to the cover
              </a>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-2 hidden md:flex items-end justify-end">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              MMXXV
            </span>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Journal;
