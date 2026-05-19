import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TeamEditorial from "@/components/TeamEditorial";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-overhead-view-of-a-rocky-coast-and-waves-crashing-51502-large.mp4";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=80";

const MANIFESTO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-cliff-with-trees-and-the-ocean-49635-large.mp4";

const MANIFESTO_POSTER =
  "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2000&q=80";

const HOME_DIVIDER_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

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

        {/* CTA — Meet the Founders */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16"
        >
          <button
            type="button"
            onClick={() =>
              document
                .querySelector('[data-testid="team-editorial-section"]')
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            data-testid="statement-cta-founders"
            className="group inline-flex items-center gap-4 bg-ink text-cream px-7 md:px-9 py-5 md:py-6 hover:bg-forest transition-colors duration-500"
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

const HomeDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  return (
    <section
      ref={ref}
      data-testid="home-divider"
      className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-ink text-cream"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src={HOME_DIVIDER_IMG}
          alt="Cinematic México golf landscape"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/85" />
      </motion.div>

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-16">
        <div className="flex items-center justify-between border-b border-cream/15 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            — Interlude · N°02
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70">
            The Team Behind
          </span>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display font-light text-cream leading-[1.02] tracking-tight text-3xl md:text-5xl lg:text-6xl"
        >
          <span className="text-gold">&ldquo;</span>
          We don&apos;t sell trips. We make introductions — to courses, to
          caddies, to tables that turn a round into a chapter.
          <span className="text-gold">&rdquo;</span>
        </motion.blockquote>

        <div className="flex items-center justify-between border-t border-cream/15 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/65">
            Founders&apos; Note
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/65">
            ✦ Pablo &amp; José
          </span>
        </div>
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
              Golf in Mexico is not tourism. It's immersion. It's understanding
              that Mexican culture elevates the game into something you won't
              find anywhere else in the world.
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

      {/* CINEMATIC DIVIDER — Interlude with parallax */}
      <HomeDivider />

      {/* N° 02 — Team & Editorial tabs */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
