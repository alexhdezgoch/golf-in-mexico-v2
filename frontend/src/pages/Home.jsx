import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Parallax from "@/components/Parallax";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-overhead-view-of-a-rocky-coast-and-waves-crashing-51502-large.mp4";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=80";

const FOUNDER_PABLO =
  "https://images.unsplash.com/photo-1601442705509-c6d748675f7f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400";
const FOUNDER_JOSE =
  "https://images.unsplash.com/photo-1613096108660-104d7e8b132a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const Home = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Visual-only per user request; brief confirmation.
    if (email.trim().length > 3) setSubmitted(true);
  };

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


      {/* EDITORIAL STATEMENT — A land of contrasts */}
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
              N° 01 — A statement
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl"
            >
              México is not just a golf <br className="hidden md:block" />
              destination. It is a{" "}
              <span className="italic">statement.</span>
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              Every course is carved into a geography of its own — volcanoes
              above the highlands, the Pacific against volcanic rock, deserts
              that bloom against the odds.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              The fairway is a dialogue between architect and landscape. In Los
              Cabos, with the Sonoran desert. In Punta Mita, with the Pacific.
              In CDMX, at altitude, in eternal spring. A country of contrasts —
              played slowly.
            </motion.p>

            <motion.blockquote
              {...fade}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 md:mt-20 max-w-3xl"
            >
              <span className="font-display italic text-gold text-5xl md:text-7xl leading-none block">
                “
              </span>
              <p className="mt-2 font-display italic font-light text-ink text-2xl md:text-4xl leading-[1.2] tracking-tight">
                Golf in México is not tourism. It is immersion — the moment a
                culture takes the game and makes it its own.
              </p>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* FOUNDERS — teaser (full detail lives in /about) */}
      <section
        data-testid="founders-teaser"
        className="relative bg-cream border-t hairline py-28 md:py-36"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              N° 02 — The Team
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl"
            >
              Two professionals of the Tour writing about{" "}
              <span className="italic">the country they grew up playing.</span>
            </motion.h2>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
            >
              An agent and a competitor — built on the inside of professional
              golf, now turning that access into a journal you can read.
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right">
            <motion.div
              {...fade}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/about"
                data-testid="founders-teaser-cta"
                className="group inline-flex items-center gap-3 border border-ink/40 px-5 py-3 hover:bg-ink hover:text-cream transition-colors duration-500"
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
                  Our story
                </span>
                <span className="font-mono text-[10px] transition-transform duration-500 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONNECT WITH US — email capture */}
      <section
        data-testid="intro-section"
        className="relative bg-cream border-t hairline py-28 md:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              N° 03 — Connect with us
            </motion.span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              Coming to México, or planning a round?{" "}
              <span className="italic">Begin here.</span>
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed"
            >
              Leave your email. The newsletter is written by Pablo and José —
              the courses worth the flight, the tables worth keeping, the wind
              on each tee.
            </motion.p>

            <motion.form
              {...fade}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={onSubmit}
              data-testid="email-capture-form"
              className="mt-16 max-w-xl"
            >
              <div className="relative flex flex-wrap items-end gap-3 sm:gap-6 border-b border-ink/40 pb-3 focus-within:border-gold transition-colors">
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted pb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  data-testid="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@elsewhere.com"
                  className="flex-1 min-w-0 bg-transparent border-0 outline-none font-body text-base md:text-lg text-ink placeholder:text-ink/30 py-1"
                />
                <button
                  type="submit"
                  data-testid="email-submit"
                  className="font-mono text-[11px] uppercase tracking-wide-editorial text-ink pb-1 group inline-flex items-center gap-2"
                >
                  Connect with us
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
              <div className="mt-4 h-5">
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-testid="email-confirmation"
                    className="font-mono text-[10px] uppercase tracking-wide-editorial text-forest"
                  >
                    Noted. The newsletter will find you.
                  </motion.span>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
