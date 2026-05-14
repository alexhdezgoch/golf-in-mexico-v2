import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HUBS = [
  {
    slug: "los-cabos",
    url:
      "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1600&q=80",
    label: "Los Cabos · Baja California Sur",
    issue: "Hub N° 01 · Region",
    title: "Where to play in Los Cabos, hole by hole.",
    live: true,
  },
  {
    slug: "puerto-vallarta",
    url:
      "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=80",
    label: "Puerto Vallarta · Jalisco",
    issue: "Hub N° 02 · Region",
    title: "Puerto Vallarta & Punta Mita — the long brief.",
    live: false,
  },
  {
    slug: "riviera-maya",
    url:
      "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=80",
    label: "Riviera Maya · Quintana Roo",
    issue: "Hub N° 03 · Region",
    title: "Riviera Maya: jungle, cenotes, and El Camaleón.",
    live: false,
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
      <section className="pt-44 md:pt-52 pb-16 md:pb-24">
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
              Long-form region hubs and field notes from courses along both
              coasts. We are publishing slowly — one region at a time, walked
              before written.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="border-t hairline" />

      {/* Region hubs grid */}
      <section
        data-testid="journal-grid"
        className="relative py-20 md:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12">
          {HUBS.map((a, i) => {
            const colSpan =
              i === 0 ? "md:col-span-8" : "md:col-span-4";
            const offset = i === 2 ? "md:mt-24" : "";
            const Wrapper = a.live ? Link : "div";
            const wrapperProps = a.live
              ? {
                  to: `/journal/${a.slug}`,
                  "data-testid": `journal-card-${i + 1}-link`,
                }
              : { "data-testid": `journal-card-${i + 1}-locked` };

            return (
              <motion.article
                key={a.slug}
                {...fade}
                transition={{
                  duration: 1,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`journal-card-${i + 1}`}
                className={`col-span-12 ${colSpan} ${offset} group`}
              >
                <Wrapper {...wrapperProps} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={a.url}
                      alt={a.label}
                      className={`w-full h-full object-cover editorial-img transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        a.live ? "group-hover:scale-[1.03]" : ""
                      }`}
                    />
                    {!a.live && (
                      <div className="absolute inset-0 bg-cream/55 backdrop-blur-[3px] flex items-center justify-center">
                        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink/80 border border-ink/30 px-3 py-1.5">
                          In Preparation
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                        {a.issue}
                      </span>
                      <h3
                        className={`mt-2 font-display text-2xl md:text-3xl font-light leading-tight max-w-md ${
                          a.live ? "text-ink" : "text-ink/55"
                        }`}
                      >
                        {a.title}
                      </h3>
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wide-editorial shrink-0 pt-1 transition-transform duration-500 ${
                        a.live
                          ? "text-ink group-hover:translate-x-1"
                          : "text-muted"
                      }`}
                    >
                      {a.live ? "Read →" : "Soon"}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {a.label}
                  </p>
                </Wrapper>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Field notes / future */}
      <section className="py-20 md:py-28 border-t hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              On the desk
            </span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="font-display italic font-light text-ink text-2xl md:text-4xl leading-[1.2] tracking-tight max-w-3xl">
              Puerto Vallarta arrives next, the Riviera Maya after that. Field
              notes, course reviews, and interviews — written from the courses
              themselves.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Journal;
