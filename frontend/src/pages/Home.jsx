import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

const WORD_HOLD_MS = 1700;

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const ManifestoCycle = () => {
  const [idx, setIdx] = useState(0);
  const [showOutro, setShowOutro] = useState(false);
  const isLast = idx === MANIFESTO_WORDS.length - 1;

  useEffect(() => {
    if (!isLast) {
      const t = setTimeout(() => setIdx((i) => i + 1), WORD_HOLD_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowOutro(true), WORD_HOLD_MS - 100);
    return () => clearTimeout(t);
  }, [idx, isLast]);

  const current = MANIFESTO_WORDS[idx];

  return (
    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-28 min-h-[100svh] flex flex-col items-center justify-between text-center">
      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="block w-6 h-px bg-gold" />
        <span
          data-testid="statement-kicker"
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
        >
          N° 01 — The Premise
        </span>
        <span className="block w-6 h-px bg-gold" />
      </motion.div>

      {/* Cycling word — centered, dominant */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[40vh]">
        <AnimatePresence mode="wait">
          <motion.h2
            key={current.word}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`manifesto-word-${idx}`}
            className={`font-display font-light leading-[0.96] tracking-tight text-[18vw] md:text-[12vw] lg:text-[11rem] ${
              current.italic ? "italic text-gold" : "text-cream"
            }`}
          >
            {current.word}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Outro — CTAs + tagline */}
      <div className="w-full min-h-[120px] md:min-h-[140px] flex items-end justify-center">
        <AnimatePresence>
          {showOutro && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8 md:gap-10"
              data-testid="manifesto-outro"
            >
              <p className="font-body font-light text-cream/80 text-base md:text-lg leading-relaxed max-w-xl">
                Half a million golfers a year ask about México.{" "}
                <span className="text-cream">We write for every one of them.</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
                <Link
                  to="/journal"
                  data-testid="statement-cta-journal"
                  className="group inline-flex items-center gap-4 bg-cream text-ink px-8 md:px-10 py-5 md:py-6 hover:bg-gold transition-colors duration-500"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                    Enter the Journal
                  </span>
                  <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .querySelector('[data-testid="team-editorial-section"]')
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  data-testid="statement-cta-founders"
                  className="group font-mono text-[11px] uppercase tracking-wide-editorial text-cream/85 hover:text-cream editorial-link inline-flex items-center gap-2"
                >
                  Meet the editors
                  <span className="font-mono text-[11px] transition-transform duration-500 group-hover:translate-x-0.5">
                    ↓
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
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
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/80" />

        {/* Cycling manifesto */}
        <ManifestoCycle />
      </section>

      {/* N° 02 — Team & Editorial tabs */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
