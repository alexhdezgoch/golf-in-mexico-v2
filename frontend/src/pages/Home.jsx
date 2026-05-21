import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TeamEditorial from "@/components/TeamEditorial";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-overhead-view-of-a-rocky-coast-and-waves-crashing-51502-large.mp4";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=80";

const HOME_DIVIDER_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

// ↓↓↓  Reemplaza este ID con el de tu video de YouTube  ↓↓↓
const YOUTUBE_ID = "LXb3EKWsInQ";

/* ─────────────── VIDEO BOX (YouTube embed, auwa-style) ─────────────── */

const VideoBox = () => (
  <section
    data-testid="home-video-box"
    className="bg-[var(--c-off-white)] py-28 md:py-40"
  >
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14 md:mb-20"
      >
        <h2 className="font-display font-normal text-[var(--c-text)] leading-[1.1] tracking-tight text-3xl md:text-5xl lg:text-6xl">
          The art of <em className="italic text-[var(--c-gold)]">México°</em>, in motion.
        </h2>
        <p className="mt-6 font-body text-[var(--c-text-mid)] text-base md:text-lg max-w-xl mx-auto leading-[1.7]">
          A moving portrait of the courses, the light, and the country that
          makes the round worth the flight.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        data-testid="home-video-frame"
        className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--c-green-deep)] rounded-sm shadow-[0_40px_100px_-40px_rgba(15,36,25,0.5)]"
      >
        <iframe
          data-testid="home-youtube"
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1`}
          title="Golf in Mexico — Film"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>
    </div>
  </section>
);

/* ─────────────── CINEMATIC DIVIDER ─────────────── */

const HomeDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  return (
    <section
      ref={ref}
      data-testid="home-divider"
      className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-[var(--c-green-deep)]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src={HOME_DIVIDER_IMG}
          alt="Cinematic México golf landscape"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-[rgba(15,36,25,0.18)]" />
      </motion.div>
    </section>
  );
};

/* ─────────────── PAGE ─────────────── */

const Home = () => {
  return (
    <main data-testid="page-home" className="relative">
      {/* HERO */}
      <section
        data-testid="hero-section"
        className="relative h-[100svh] w-full overflow-hidden bg-[var(--c-green-deep)]"
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
        <div className="absolute inset-0 bg-[rgba(15,36,25,0.45)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,36,25,0.3)] via-transparent to-[rgba(15,36,25,0.55)]" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            data-testid="hero-wordmark"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-normal text-white leading-[0.96] tracking-tight text-[10vw] md:text-[7vw] lg:text-[6.5rem] max-w-[18ch] mx-auto"
          >
            The golf in México{" "}
            <span className="italic text-[var(--c-gold)]">you have not read about.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 md:mt-14 max-w-2xl"
          >
            <p
              data-testid="hero-subline"
              className="font-body font-light text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Golf in Mexico is not tourism. It's immersion. It's understanding
              that Mexican culture elevates the game into something you won't
              find anywhere else in the world.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/70"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-10 bg-white/50"
          />
        </motion.div>
      </section>

      {/* CLEAN SPACE + VIDEO BOX */}
      <VideoBox />

      {/* CINEMATIC DIVIDER */}
      <HomeDivider />

      {/* TEAM EDITORIAL */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
