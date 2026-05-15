import { motion } from "framer-motion";
import Parallax from "@/components/Parallax";

const FOUNDER_PABLO =
  "https://images.unsplash.com/photo-1601442705509-c6d748675f7f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600";
const FOUNDER_JOSE =
  "https://images.unsplash.com/photo-1613096108660-104d7e8b132a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const About = () => {
  return (
    <main data-testid="page-about" className="relative bg-cream">
      {/* Header */}
      <section className="relative pt-44 md:pt-52 pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Chapter — About
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h1
              {...fade}
              className="font-display font-light text-ink leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[7.5rem]"
            >
              Behind <span className="italic">the journal.</span>
            </motion.h1>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 max-w-2xl font-body font-light text-ink/75 text-lg md:text-xl leading-[1.6]"
            >
              Two friends who could not agree, for years, which course in México
              was the most beautiful. They began the journal to settle it. They
              have not.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="border-t hairline" />

      {/* Pablo */}
      <section
        data-testid="about-pablo"
        className="py-24 md:py-36 relative"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <Parallax distance={60} className="aspect-[4/5] w-full">
              <img
                src={FOUNDER_PABLO}
                alt="Pablo De La Mora"
                className="w-full h-full object-cover editorial-img"
              />
            </Parallax>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              Photographed for Golf in Mexico°
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 md:pl-12 md:pt-16">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
            >
              Founder · I
            </motion.span>
            <motion.h2
              {...fade}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-display font-light text-ink text-5xl md:text-6xl tracking-tight leading-[1]"
            >
              Pablo <br />
              <span className="italic">De La Mora.</span>
            </motion.h2>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Professional Sports Agent · PGA Tour · LPGA · WTA · PGA Tour Americas
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-prose"
            >
              <span className="font-display italic text-3xl md:text-4xl text-ink float-left mr-3 leading-[0.85] mt-1">
                P
              </span>
              ablo represents tour professionals as a vocation, and walks
              fairways as a habit. Five years inside the management of
              professional athletes have taken him from the Masters to TPC
              Sawgrass, from Roland Garros to Qatar 2022 — and to most of the
              regions in México worth knowing in between.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-prose"
            >
              He does not believe in best-of lists. He believes in the
              afternoon at Diamante when the wind comes off the Pacific and
              the gulls go quiet, and in the way a country reveals itself when
              you slow down enough to play it properly.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="border-t hairline" />

      {/* José */}
      <section
        data-testid="about-jose"
        className="py-24 md:py-36 relative"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6 md:order-2">
            <Parallax distance={60} className="aspect-[4/5] w-full">
              <img
                src={FOUNDER_JOSE}
                alt="José Islas"
                className="w-full h-full object-cover editorial-img"
              />
            </Parallax>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              Photographed for Golf in Mexico°
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 md:pr-12 md:pt-16 md:order-1">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
            >
              Founder · II
            </motion.span>
            <motion.h2
              {...fade}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-display font-light text-ink text-5xl md:text-6xl tracking-tight leading-[1]"
            >
              José <br />
              <span className="italic">Islas.</span>
            </motion.h2>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              4× winner Mexican Tour · US Amateur QF, 2023 · 3 PGA Tour starts
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-prose"
            >
              <span className="font-display italic text-3xl md:text-4xl text-ink float-left mr-3 leading-[0.85] mt-1">
                J
              </span>
              osé came of age inside the ropes. The quarterfinals at the US
              Amateur in 2023 — eighteen years old, on television, two over
              par. He came home, played the WWT in Mayakoba that November and
              the Mexico Open at Vidanta the following spring, and in between
              he understood that the country he had been representing was a
              country he had barely seen.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-prose"
            >
              He started keeping notes. The notes became the journal. He plays
              still, and travels still, and writes about the courses he loves
              the way he would write to a friend who had not yet been.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="border-t hairline" />

      {/* THE GIM PROMISE — counterpositioning, named-human trust */}
      <section
        data-testid="gim-promise"
        className="relative bg-ink text-cream py-28 md:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/60"
            >
              The GIM Promise
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-cream text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              Two names, <span className="italic">one</span> phone, zero
              outsourcing.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body font-light text-cream/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              Every trip we arrange is touched, walked, and confirmed by Pablo
              or José in person. No marketplace, no call centre, no
              sub-affiliate at check-in. If something is wrong at the tee, the
              person who answers the phone is the person who booked it.
            </motion.p>

            <ul className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
              {[
                {
                  k: "01",
                  t: "Walked before written",
                  d: "We do not write about a course we have not played.",
                },
                {
                  k: "02",
                  t: "By name, not by booking",
                  d: "Pablo or José replies within twenty-four hours, in your time zone.",
                },
                {
                  k: "03",
                  t: "Transparent pricing",
                  d: "Quoted once, in full — the way a private dinner is.",
                },
              ].map((p) => (
                <li
                  key={p.k}
                  data-testid={`promise-${p.k}`}
                  className="border-t border-cream/15 pt-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                    {p.k}
                  </span>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl font-light text-cream leading-tight">
                    {p.t}
                  </h3>
                  <p className="mt-3 font-body font-light text-cream/70 text-base leading-[1.6]">
                    {p.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t hairline" />

      {/* Closing */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Postscript
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.p
              {...fade}
              className="font-display font-light italic text-ink text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-3xl"
            >
              “This is not a travel agency. It is an editorial brand that
              happens to offer the occasional trip.”
            </motion.p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
