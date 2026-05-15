import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Parallax from "@/components/Parallax";
import TeamEditorial from "@/components/TeamEditorial";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-overhead-view-of-a-rocky-coast-and-waves-crashing-51502-large.mp4";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=80";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const Home = () => {
  return (
    <main data-testid="page-home" className="relative">
      {/* HERO */}
      <section
        data-testid="hero-section"
        className="relative h-[100svh] w-full overflow-hidden bg-ink"
      >
        <video
          data-testid="hero-video"
          className="absolute inset-0 w-full h-full object-cover editorial-img"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/55" />

        {/* Center content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            data-testid="hero-wordmark"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-cream leading-[0.96] tracking-tight text-[10vw] md:text-[7vw] lg:text-[6.5rem] max-w-[18ch] mx-auto"
          >
            The golf in México{" "}
            <span className="italic">you have not read about.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 md:mt-14 max-w-2xl"
          >
            <p
              data-testid="hero-subline"
              className="font-body font-light text-cream/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Shaped by years inside Tour environments. Destination guides,
              course reviews, and the field notes only insiders carry.
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/70"
        >
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-10 bg-cream/50"
          />
        </motion.div>
      </section>


      {/* EDITORIAL STATEMENT — Value proposition / 545,000 */}
      <section
        data-testid="statement-section"
        className="relative bg-cream py-28 md:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              N° 01 — The Premise
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.span
              {...fade}
              className="block font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
              data-testid="statement-kicker"
            >
              545,000 golfers a year · One editorial
            </motion.span>

            <motion.h2
              {...fade}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-5xl"
            >
              Half a million golfers a year ask about México.{" "}
              <span className="italic">
                We write for every one of them.
              </span>
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              From the single-handicap flying in for one tee time at Diamante,
              to the family weighing a week in Punta Mita, to the agent moving
              clients through Cabo — the question is the same. What is the
              round actually like, once you are here? This editorial answers
              it.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              Because in México, golf does not exist in isolation. It lives
              beside world-class hospitality and a culture that shapes how
              every round is played, eaten, and remembered. We have spent
              years inside all three — the course, the table, the country. One
              editorial. One round.
            </motion.p>

            <motion.blockquote
              {...fade}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 md:mt-20 max-w-3xl border-l-2 border-gold pl-6"
            >
              <p className="font-display italic font-light text-ink text-2xl md:text-4xl leading-[1.2] tracking-tight">
                Golf. Hospitality. Culture. In México they are not three
                industries — they are one round.
              </p>
            </motion.blockquote>

            <motion.div
              {...fade}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 md:mt-16 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            >
              <Link
                to="/journal"
                data-testid="statement-cta-journal"
                className="group inline-flex items-center gap-4 bg-ink text-cream px-7 md:px-9 py-5 md:py-6 hover:bg-forest transition-colors duration-500 self-start"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                  Enter the Journal
                </span>
                <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/about"
                data-testid="statement-cta-founders"
                className="group font-mono text-[11px] uppercase tracking-wide-editorial text-ink editorial-link inline-flex items-center gap-2 self-start sm:self-auto"
              >
                Read about the founders
                <span className="font-mono text-[11px] transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* N° 02 — Team & Editorial tabs */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
