import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2400&q=85";
const BODY_IMG_1 =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1600&q=80";
const BODY_IMG_2 =
  "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1600&q=80";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const LosCabos = () => {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    document.title =
      "Golf in Los Cabos — The Complete Guide | Golf in Mexico°";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "A long-form, written-from-the-fairway guide to golf in Los Cabos. Diamante, Cabo del Sol, Quivira, Cabo Real, Puerto Los Cabos — and how to play them well."
      );
    return () => {
      document.title = prevTitle;
      if (prevDesc) {
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", prevDesc);
      }
    };
  }, []);

  return (
    <main data-testid="page-los-cabos" className="relative bg-cream">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[78svh] md:h-[88svh] w-full overflow-hidden bg-ink">
          <img
            src={HERO}
            alt="Aerial of a coastal golf course in Los Cabos, Baja California Sur"
            className="absolute inset-0 w-full h-full object-cover editorial-img"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/65" />

          <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 md:pb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/75"
            >
              Hub N° 01 · Los Cabos · Baja California Sur
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display font-light text-cream leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-[7rem] max-w-5xl"
            >
              Golf in Los Cabos. <br />
              <span className="italic">The complete guide.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 font-body font-light text-cream/85 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              Where the Sonoran desert ends and the Pacific begins — eight
              courses, four architects, one of the most concentrated stretches
              of championship golf on the continent.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="border-b hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
          <div>
            <span className="block text-ink/40">Region</span>
            <span className="block mt-1 text-ink">Los Cabos · Baja Sur</span>
          </div>
          <div>
            <span className="block text-ink/40">Best months</span>
            <span className="block mt-1 text-ink">Nov — May</span>
          </div>
          <div>
            <span className="block text-ink/40">Courses covered</span>
            <span className="block mt-1 text-ink">Eight</span>
          </div>
          <div>
            <span className="block text-ink/40">Read</span>
            <span className="block mt-1 text-ink">8 min</span>
          </div>
        </div>
      </section>

      {/* LEAD */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              The setting
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9 max-w-3xl">
            <motion.p
              {...fade}
              className="font-display italic font-light text-ink text-3xl md:text-5xl leading-[1.15] tracking-tight"
            >
              Los Cabos is not a destination. It is{" "}
              <span className="not-italic">an argument</span> — that the desert
              and the sea can produce the most cinematic golf in the world,
              and that an afternoon there will change the way you think about
              the game.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 font-body font-light text-ink/85 text-lg md:text-xl leading-[1.75]"
            >
              At the southern tip of the Baja California peninsula, the Sonoran
              desert runs into the Pacific Ocean and the Sea of Cortez. The
              courses here are carved into that meeting — cardón cactus on one
              side, surf on the other, a sky that turns gold by four. Nicklaus,
              Norman, Dye, Fazio, Davis Love III and Tiger Woods all built here
              for a reason: there is nowhere quite like it to draw a golf hole.
            </motion.p>
          </div>
        </div>
      </section>

      {/* IMAGE 1 */}
      <section>
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
          <img
            src={BODY_IMG_1}
            alt="Los Cabos championship course at golden hour"
            className="w-full h-full object-cover editorial-img"
          />
        </div>
      </section>

      {/* COURSES */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              The courses
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9 max-w-3xl">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight"
            >
              Eight courses, four <span className="italic">architects</span>,
              one peninsula.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75]"
            >
              We have walked every one of them. These are the names that matter,
              and the line we would draw between them if you only had a week.
            </motion.p>

            <ul className="mt-14 divide-y divide-ink/15 border-t border-ink/15">
              {[
                {
                  name: "Diamante",
                  arch: "Davis Love III · Tiger Woods · Cabot",
                  note:
                    "The Dunes is unforgettable; El Cardonal is the warm-up no one warms up to; The Oasis is the headline.",
                },
                {
                  name: "Cabo del Sol",
                  arch: "Jack Nicklaus · Tom Weiskopf",
                  note:
                    "The Cove course delivers the three finishing holes Nicklaus called the best in the world — and he meant it.",
                },
                {
                  name: "Quivira",
                  arch: "Jack Nicklaus",
                  note:
                    "Cliffs, more cliffs, and a 4th hole that earns the price of the entire trip.",
                },
                {
                  name: "Cabo Real",
                  arch: "Robert Trent Jones II",
                  note:
                    "The classicist's choice. Sea of Cortez on the back nine and the most playable round of the eight.",
                },
                {
                  name: "Puerto Los Cabos",
                  arch: "Jack Nicklaus · Greg Norman",
                  note:
                    "Twenty-seven holes by two giants, an estuary, and the best halfway-house margarita in the region.",
                },
                {
                  name: "Club Campestre",
                  arch: "Jack Nicklaus",
                  note:
                    "Inland, high above town. Where the locals play and the wind shows up first.",
                },
              ].map((c, i) => (
                <motion.li
                  key={c.name}
                  {...fade}
                  transition={{
                    duration: 0.9,
                    delay: 0.05 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-12 gap-6 py-6"
                >
                  <span className="col-span-12 md:col-span-4 font-display text-2xl md:text-3xl font-light text-ink tracking-tight">
                    {c.name}
                  </span>
                  <span className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-wide-editorial text-gold pt-2">
                    {c.arch}
                  </span>
                  <span className="col-span-12 md:col-span-5 font-body font-light text-ink/75 text-base leading-[1.65]">
                    {c.note}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* IMAGE 2 */}
      <section>
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
          <img
            src={BODY_IMG_2}
            alt="Coastal hole in Los Cabos at sunset"
            className="w-full h-full object-cover editorial-img"
          />
        </div>
      </section>

      {/* WHEN TO PLAY */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              When to play
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9 max-w-3xl">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight"
            >
              Six dry months, one perfect week.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75]"
            >
              Los Cabos is in season from November to May — three hundred and
              fifty days of sun a year, but a real window of seventy-degree
              mornings and eighty-degree afternoons from December through April.
              The wind picks up after lunch; the best tee times are at sunrise,
              the second-best at the half-light of the last hour. Bring two
              gloves and a windshirt — the locals do.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75]"
            >
              Avoid September if you can — it is the wet end of the hurricane
              season, and the courses, while playable, are not at their
              cinematic best.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CLOSING + CTA */}
      <section className="bg-ink text-cream py-28 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/60">
              The trip
            </span>
            <h2 className="mt-6 font-display font-light text-cream text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
              The four mornings that will decide what you think of{" "}
              <span className="italic">Los Cabos.</span>
            </h2>
            <p className="mt-8 font-body font-light text-cream/80 text-lg md:text-xl leading-[1.75] max-w-2xl">
              We will arrange the courses, the caddies, the tables, and the
              hour-before-dinner mezcal. One quote, no marketplace. Pablo or
              José replies within twenty-four hours, by name.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link
              to="/about"
              data-testid="cta-plan-trip"
              className="inline-flex items-center gap-3 border-b border-gold/60 pb-1 font-mono text-[11px] uppercase tracking-wide-editorial text-cream hover:text-gold transition-colors"
            >
              Request a curated trip
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Next region */}
      <section className="py-20 md:py-28 border-t hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              Next
            </span>
          </div>
          <div className="col-span-12 md:col-span-6">
            <Link
              to="/journal"
              data-testid="link-back-journal"
              className="font-display italic font-light text-ink text-3xl md:text-5xl leading-[1.1] tracking-tight editorial-link"
            >
              Riviera Nayarit &amp; Punta Mita — in preparation.
            </Link>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <Link
              to="/journal"
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink editorial-link"
            >
              ← Back to the Journal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LosCabos;
