import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Parallax from "@/components/Parallax";
import FoundersSlider from "@/components/FoundersSlider";
import { useInquiry } from "@/context/Inquiry";

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
  const { openInquiry } = useInquiry();

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
            An editorial brand, by invitation
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
              Punta Mita to the highlands of CDMX, by invitation.
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

      {/* PHASE 1 APERTURE — two ways to begin (no trip sales yet) */}
      <section
        data-testid="aperture-section"
        className="relative bg-cream border-b hairline py-24 md:py-32"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-8 mb-14 md:mb-20">
            <div className="col-span-12 md:col-span-3">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
              >
                Two ways to begin
              </motion.span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
              >
                We are not booking trips yet —{" "}
                <span className="italic">we are starting conversations.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 font-body font-light text-ink/70 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Choose how you'd like to meet us. Either way, Pablo or José
                reads what you send.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-10">
            {/* Card 1 — Submit an Inquiry (primary CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              data-testid="aperture-card-inquiry"
              className="col-span-12 md:col-span-7 group"
            >
              <button
                onClick={openInquiry}
                data-testid="aperture-cta-inquiry"
                className="block text-left w-full"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink">
                  <img
                    src="https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1800&q=80"
                    alt="A coastal fairway in México at golden hour"
                    className="w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                  <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-wide-editorial text-cream/85 inline-flex items-center gap-2">
                    <span className="block w-3 h-px bg-cream/85" />
                    Primary · By name
                  </span>
                </div>
                <div className="mt-7 flex items-start justify-between gap-6 border-t border-ink/15 pt-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                      01 · Conversation
                    </span>
                    <h3 className="mt-3 font-display text-3xl md:text-5xl font-light text-ink leading-[1.02] tracking-tight max-w-md">
                      Submit an inquiry.
                    </h3>
                    <p className="mt-5 font-body font-light text-ink/75 text-base md:text-lg leading-[1.65] max-w-lg">
                      Tell us what you are imagining — a region, a window, a
                      group. We reply within twenty-four hours, by name.
                      Nothing else.
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink shrink-0 pt-1 transition-transform duration-500 group-hover:translate-x-1">
                    Open the form →
                  </span>
                </div>
              </button>
            </motion.div>

            {/* Card 2 — Read the Journal (secondary CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              data-testid="aperture-card-journal"
              className="col-span-12 md:col-span-5 group"
            >
              <Link
                to="/journal/los-cabos"
                data-testid="aperture-cta-journal"
                className="block"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink">
                  <img
                    src="https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1600&q=80"
                    alt="Los Cabos golf course from above"
                    className="w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                  <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-wide-editorial text-cream/85 inline-flex items-center gap-2">
                    <span className="block w-3 h-px bg-cream/85" />
                    Hub N° 01 · Region
                  </span>
                </div>
                <div className="mt-7 flex items-start justify-between gap-6 border-t border-ink/15 pt-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                      02 · Editorial
                    </span>
                    <h3 className="mt-3 font-display text-3xl md:text-5xl font-light text-ink leading-[1.02] tracking-tight max-w-sm">
                      Read the journal.
                    </h3>
                    <p className="mt-5 font-body font-light text-ink/75 text-base md:text-lg leading-[1.65]">
                      Start with the long-form guide to Los Cabos — eight
                      courses, four architects, one peninsula.
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink shrink-0 pt-1 transition-transform duration-500 group-hover:translate-x-1">
                    Read →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
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
              N° 01 — Plan your trip
            </motion.span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              Visiting México, or <span className="italic">planning a round</span>?
              Talk to us first.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed"
            >
              Whether you are coming for a week or building a round into a
              longer trip, leave us your email. We'll send the details by
              hand — courses worth the flight, the tables to book, the wind
              on each tee — in our newsletter.
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
                    Noted. Pablo or José will be in touch.
                  </motion.span>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FOUNDERS — slider */}
      <FoundersSlider />

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
              Pacific crashes against volcanic rock, and deserts that bloom
              with impossible vegetation.
            </motion.p>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              Here, the fairway isn't turf on dirt. It is a dialogue between
              the architect and the landscape. In Los Cabos, the courses
              embrace the Sonoran desert. In Punta Mita, the greens reach
              into the Pacific. In the highlands of CDMX, you play at altitude,
              in eternal spring. This is a land of contrasts — played slowly.
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
    </main>
  );
};

export default Home;
