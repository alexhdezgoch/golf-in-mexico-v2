import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TeamEditorial from "@/components/TeamEditorial";

const HERO_VIDEO =
  "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/5lehrm14_HERO%20VIDEO.mov";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=80";

const HOME_DIVIDER_IMG =
  "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85";

// ↓↓↓  Reemplaza con el ID de YouTube cuando lo tengas listo  ↓↓↓
const YOUTUBE_ID = "LXb3EKWsInQ";

/* ─────────────── EDITORIAL STATEMENT + VIDEO BOX ─────────────── */

const StatementAndVideo = () => (
  <section
    data-testid="home-video-box"
    className="bg-[var(--c-off-white)] py-28 md:py-40"
  >
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        data-testid="home-statement"
        className="font-display font-normal text-[var(--c-text)] leading-[1.25] tracking-tight text-xl md:text-2xl lg:text-[1.75rem] max-w-[52ch] mb-14 md:mb-20"
      >
        We are an editorial ecosystem covering Mexican golf nationwide —
        showcasing elite courses, designing bespoke experiences, and capturing
        the <em className="italic text-[var(--c-gold)]">food, architecture, hospitality, and people</em> who make it all possible.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
      {/* HERO — full-bleed video, H1 only */}
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
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* H1 only */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            data-testid="hero-wordmark"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-normal text-white leading-[1.02] tracking-tight text-[9vw] md:text-[6.2vw] lg:text-[5.6rem] max-w-[18ch] mx-auto"
          >
            The golf in México{" "}
            <span className="italic text-[var(--c-gold)]">you have not read about.</span>
          </motion.h1>
        </div>
      </section>

      {/* EDITORIAL STATEMENT + VIDEO BOX */}
      <StatementAndVideo />

      {/* CINEMATIC DIVIDER */}
      <HomeDivider />

      {/* FOUNDERS + VALUES */}
      <TeamEditorial />
    </main>
  );
};

export default Home;
