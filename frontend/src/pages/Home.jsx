import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Parallax from "@/components/Parallax";
import TeamEditorial from "@/components/TeamEditorial";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-overhead-view-of-a-rocky-coast-and-waves-crashing-51502-large.mp4";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=80";

const MANIFESTO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-cliff-with-trees-and-the-ocean-49635-large.mp4";

const MANIFESTO_POSTER =
  "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2000&q=80";

const MANIFESTO_WORDS = [
  { word: "Golf.", italic: false },
  { word: "Hospitality.", italic: false },
  { word: "Culture.", italic: false },
  { word: "One round.", italic: true },
];

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


      {/* EDITORIAL STATEMENT — N° 01 The Premise (video manifesto) */}
      <section
        data-testid="statement-section"
        className="relative w-full overflow-hidden bg-ink min-h-[100svh] flex"
      >
        <video
          data-testid="statement-video"
          className="absolute inset-0 w-full h-full object-cover editorial-img"
          src={MANIFESTO_VIDEO}
          poster={MANIFESTO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Overlays for contrast */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/75" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-28 flex flex-col justify-between gap-16 md:gap-20">
          {/* Top kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            <span
              data-testid="statement-kicker"
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
            >
              N° 01 — The Premise
            </span>
          </motion.div>

          {/* Center: sequential words */}
          <h2
            data-testid="manifesto-words"
            className="font-display font-light text-cream leading-[0.98] tracking-tight text-[14vw] md:text-[9vw] lg:text-[8.5rem] max-w-[14ch]"
          >
            {MANIFESTO_WORDS.map((w, i) => (
              <motion.span
                key={w.word}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1.1,
                  delay: 0.4 + i * 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${w.italic ? "italic text-gold" : ""}`}
              >
                {w.word}
              </motion.span>
            ))}
          </h2>

          {/* Bottom: subtitle + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.4 + MANIFESTO_WORDS.length * 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-12 gap-6 md:gap-12 items-end"
          >
            <p className="col-span-12 md:col-span-7 font-body font-light text-cream/85 text-base md:text-lg leading-relaxed max-w-xl">
              Half a million golfers a year ask about México.{" "}
              <span className="text-cream">We write for every one of them</span>{" "}
              — from the course, to the table, to the country.
            </p>

            <div className="col-span-12 md:col-span-5 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-5 sm:gap-8">
              <Link
                to="/journal"
                data-testid="statement-cta-journal"
                className="group inline-flex items-center gap-4 bg-cream text-ink px-7 md:px-9 py-5 md:py-6 hover:bg-gold hover:text-ink transition-colors duration-500 self-start"
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
                className="group font-mono text-[11px] uppercase tracking-wide-editorial text-cream/85 hover:text-cream editorial-link inline-flex items-center gap-2 self-start sm:self-auto"
              >
                Read about the founders
                <span className="font-mono text-[11px] transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* N° 02 — Team & Editorial tabs */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
