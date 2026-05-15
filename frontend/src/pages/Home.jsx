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

const MANIFESTO_LINES = [
  { text: "México is not just", italic: false },
  { text: "a golf destination.", italic: false },
];

const ManifestoCycle = () => {
  return (
    <section
      data-testid="statement-section"
      className="relative bg-cream py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
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

        {/* Headline */}
        <h2
          data-testid="manifesto-headline"
          className="mt-10 md:mt-14 font-display font-light text-ink leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[6.25rem] max-w-[16ch]"
        >
          {MANIFESTO_LINES.map((line, i) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                delay: 0.3 + i * 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`block ${line.italic ? "italic text-gold" : "text-ink"}`}
            >
              {line.text}
            </motion.span>
          ))}
        </h2>

        {/* Video box — horizontal 16:9 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.3, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          data-testid="statement-video-box"
          className="mt-16 md:mt-20 relative aspect-[16/9] w-full overflow-hidden bg-ink border border-ink/15 shadow-[0_40px_100px_-40px_rgba(26,26,24,0.45)]"
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
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
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
          <button
            type="button"
            onClick={() =>
              document
                .querySelector('[data-testid="team-editorial-section"]')
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            data-testid="statement-cta-founders"
            className="group inline-flex items-center gap-4 border border-ink/30 text-ink px-7 md:px-9 py-5 md:py-6 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-500 self-start"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
              Meet the Founders
            </span>
            <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
              ↓
            </span>
          </button>
        </motion.div>
      </div>
    </section>
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


      {/* EDITORIAL STATEMENT — N° 01 The Premise (with video box) */}
      <ManifestoCycle />

      {/* N° 02 — Team & Editorial tabs */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
