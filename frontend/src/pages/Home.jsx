import { useState } from "react";
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

        {/* Top corner label */}
        <div className="absolute top-24 md:top-28 left-6 md:left-12 z-10 flex items-center gap-3 text-cream/70">
          <span className="block w-6 h-px bg-cream/50" />
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
            Issue N° 001 · Coming Soon
          </span>
        </div>

        <div className="absolute top-24 md:top-28 right-6 md:right-12 z-10 text-cream/70 text-right">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
            19°25′N · 99°08′W
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wide-editorial text-cream/70">
              An editorial journal
            </span>
          </motion.div>

          <motion.h1
            data-testid="hero-wordmark"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-cream leading-[0.95] tracking-tight text-[14vw] md:text-[10vw] lg:text-[9rem]"
          >
            Golf <span className="italic font-light">in</span> Mexico
            <span className="text-gold align-top text-[0.4em] ml-1">°</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-14 md:mt-16 max-w-2xl"
          >
            <p
              data-testid="hero-headline"
              className="font-display italic font-light text-cream text-2xl md:text-4xl leading-[1.15] tracking-tight"
            >
              “The best golf in the world is in Mexico.”
            </p>
            <p
              data-testid="hero-subline"
              className="mt-8 font-body font-light text-cream/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
            >
              A journal about the courses, the people, and the trips that make it
              worth the flight.
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

      {/* INTRO / EMAIL CAPTURE */}
      <section
        data-testid="intro-section"
        className="relative bg-cream py-28 md:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              N° 01 — Subscribe
            </motion.span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              An <span className="italic">unhurried</span> dispatch from the
              fairways and coastlines of México.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed"
            >
              Four times a year. A field journal, never a newsletter. No banners,
              no schedules — only the work of looking closer.
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
                  Send
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
                    Noted. The first dispatch will find you.
                  </motion.span>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FOUNDERS — editorial cards */}
      <section
        data-testid="founders-section"
        className="relative bg-cream pb-32 md:pb-48"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-8 mb-20 md:mb-28">
            <div className="col-span-12 md:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                N° 02 — The Founders
              </span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
                Two men, <span className="italic">thirty courses</span>, and a
                country full of light.
              </h2>
            </div>
          </div>

          {/* Founder Pablo */}
          <article
            data-testid="founder-pablo"
            className="grid grid-cols-12 gap-8 md:gap-16 items-center mb-28 md:mb-40"
          >
            <div className="col-span-12 md:col-span-5">
              <Parallax distance={40} className="aspect-[4/5] w-full">
                <img
                  src={FOUNDER_PABLO}
                  alt="Pablo De La Mora portrait"
                  className="w-full h-full object-cover editorial-img"
                />
              </Parallax>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-8">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                Founder · I
              </span>
              <h3 className="mt-4 font-display text-4xl md:text-5xl font-light tracking-tight text-ink">
                Pablo De La Mora
              </h3>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                PGA Tour Agent · 30+ courses across México
              </p>
              <p className="mt-10 font-body font-light text-ink/80 text-base md:text-lg leading-[1.7] max-w-xl">
                He has walked every fairway worth walking from Los Cabos to the
                Riviera Maya. Pablo knows the courses by their wind and their
                hour, and the people who keep them by their first name.
              </p>
            </div>
          </article>

          {/* Founder José — reversed */}
          <article
            data-testid="founder-jose"
            className="grid grid-cols-12 gap-8 md:gap-16 items-center"
          >
            <div className="col-span-12 md:col-span-7 md:order-1 order-2 md:pr-8">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                Founder · II
              </span>
              <h3 className="mt-4 font-display text-4xl md:text-5xl font-light tracking-tight text-ink">
                José Islas
              </h3>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                US Amateur QF, 2023 · WWT Championship · Mexico Open at Vidanta
              </p>
              <p className="mt-10 font-body font-light text-ink/80 text-base md:text-lg leading-[1.7] max-w-xl">
                A player first, a host second. José competes where the rest of us
                only travel — and brings back the kind of stories you can only
                hear over a quiet dinner after eighteen holes.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 md:order-2 order-1">
              <Parallax distance={40} className="aspect-[4/5] w-full">
                <img
                  src={FOUNDER_JOSE}
                  alt="José Islas portrait"
                  className="w-full h-full object-cover editorial-img"
                />
              </Parallax>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
