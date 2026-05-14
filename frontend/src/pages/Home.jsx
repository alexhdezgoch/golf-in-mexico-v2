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
              Field notes, course reviews, and the trips that make it worth the
              flight — written from the courses themselves. From Los Cabos to
              the Riviera Maya, by invitation.
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
              N° 01 — The Full Guides
            </motion.span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              The full guides to the three best{" "}
              <span className="italic">golf regions</span> in México.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed"
            >
              Los Cabos · Puerto Vallarta & Punta Mita · Riviera Maya. Three
              long-form briefs we wrote ourselves — every course, every wind,
              every table to ask for after the round. Free. No spam.
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
                  Send me the guides
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
                    Noted. The three guides are on their way.
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

      {/* EDITORIAL STATEMENT — A land of contrasts */}
      <section
        data-testid="statement-section"
        className="relative bg-cream border-t hairline py-28 md:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              N° 03 — A statement
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
              Every course is carved into a geography that defies imagination —
              between volcanoes overlooking the highlands, coasts where the
              Pacific crashes against volcanic rock, and deserts that bloom with
              impossible vegetation.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              Here, the fairway isn't turf on dirt. It is a dialogue between the
              architect and the landscape. In Los Cabos, the courses embrace the
              Sonoran desert. In the Riviera Maya, the greens carve their way
              through cenotes and jungle. This is a land of contrasts —
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
                Golf in México is not tourism. It is immersion — the
                understanding that a culture can elevate the game into something
                you will not find anywhere else in the world.
              </p>
            </motion.blockquote>
          </div>
        </div>
      </section>
      {/* PILLARS — What we cover */}
      <section
        data-testid="pillars-section"
        className="relative bg-cream border-t hairline pt-24 md:pt-36 pb-32 md:pb-44"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <motion.span
                {...fade}
                className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
              >
                N° 04 — What we cover
              </motion.span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <motion.h2
                {...fade}
                className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
              >
                Three pillars. <br className="hidden md:block" />
                Nothing else <span className="italic">distracts us.</span>
              </motion.h2>
              <motion.p
                {...fade}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Everything we write, photograph, and arrange falls inside one of
                these three. The rest is somebody else's job.
              </motion.p>
            </div>
          </div>

          <ul className="grid grid-cols-12 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-20">
            {[
              {
                num: "I",
                name: "Golf",
                tag: "The Course",
                img: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=80",
                line: "Courses, architecture, the lines a great hole draws on the land. We walk every fairway before we write about it.",
              },
              {
                num: "II",
                name: "People",
                tag: "Las Personas",
                img: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1400&q=80",
                line: "Caddies, members, head pros, designers, friends of the house. Golf in México is played by hand, and remembered by name.",
              },
              {
                num: "III",
                name: "Cultura",
                tag: "The Country",
                img: "https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?auto=format&fit=crop&w=1400&q=80",
                line: "Food, mezcal, music, the hour before dinner. The country that surrounds the eighteen holes — and the reason the flight is worth it.",
              },
            ].map((p, i) => (
              <motion.li
                key={p.num}
                {...fade}
                transition={{
                  duration: 1,
                  delay: 0.1 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`pillar-${p.name.toLowerCase()}`}
                className="col-span-12 md:col-span-4 group"
              >
                <div className="aspect-[3/4] w-full overflow-hidden mb-8">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover editorial-img transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-start justify-between gap-6 border-t hairline pt-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                      Pillar · {p.num}
                    </span>
                    <h3 className="mt-4 font-display text-4xl md:text-5xl font-light tracking-tight text-ink leading-[1]">
                      {p.name}
                    </h3>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                      {p.tag}
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-body font-light text-ink/80 text-base md:text-lg leading-[1.7]">
                  {p.line}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 md:mt-28 font-display italic font-light text-ink text-2xl md:text-4xl leading-[1.2] tracking-tight max-w-3xl"
          >
            “We do not sell tee times. We arrange the four mornings that will
            decide what you think of México for the rest of your life.”
          </motion.p>
        </div>
      </section>

      {/* PHILOSOPHY — what this is, what it isn't */}
      <section
        data-testid="philosophy-section"
        className="relative bg-ink text-cream py-32 md:py-44 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/60"
            >
              N° 05 — Manifesto
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-cream text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              The discipline of the <span className="italic">no.</span>
            </motion.h2>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <motion.div
                {...fade}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                  This is
                </span>
                <ul className="mt-6 space-y-4 font-body font-light text-cream/85 text-lg leading-[1.6]">
                  <li>An editorial journal, written from the courses themselves.</li>
                  <li>A short list of trips, arranged by hand.</li>
                  <li>A field guide to courses worth the flight.</li>
                  <li>A standing invitation, by name.</li>
                </ul>
              </motion.div>
              <motion.div
                {...fade}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/50">
                  This is not
                </span>
                <ul className="mt-6 space-y-4 font-body font-light text-cream/55 text-lg leading-[1.6]">
                  <li>A tee-time marketplace.</li>
                  <li>A travel agency.</li>
                  <li>A newsletter.</li>
                  <li>A list of every course in México.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
