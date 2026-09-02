import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FoundersGallery from "@/components/FoundersGallery";
import { useSeo, orgSchema, webSiteSchema } from "@/hooks/useSeo";

const HERO_VIDEO_MP4 = "/video/hero.mp4";
const HERO_VIDEO_WEBM = "/video/hero.webm";

const HERO_POSTER =
  "/images/e60z74y2-golf-in-mexico-5.webp";

const HOME_DIVIDER_IMG =
  "/images/nsvdb584-golfinmexico-014.webp";

const HOME_VIDEO_SRC = "/video/home.mp4";
const HOME_VIDEO_SRC_WEBM = "/video/home.webm";

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
        data-testid="home-section-heading"
        className="font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-6xl max-w-[20ch] mb-10 md:mb-14"
      >
        Everything you need to know <em className="italic text-[var(--c-gold)]">before you play Mexico.</em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        data-testid="home-statement"
        className="font-body font-light text-[var(--c-text-mid)] leading-[1.7] text-lg md:text-xl max-w-[52ch] mb-6 md:mb-8"
      >
        The only guide to Mexican golf written by people who&apos;ve played
        it, planned it, and lived it — from elite courses to the experiences
        that make the trip worth taking.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        data-testid="home-video-frame"
        className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--c-green-deep)] rounded-sm shadow-[0_40px_100px_-40px_rgba(15,36,25,0.5)]"
      >
        <video
          data-testid="home-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HOME_VIDEO_SRC_WEBM} type="video/webm" />
          <source src={HOME_VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Subtle gradient frame so the video doesn't fight the cream background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,0) 60%, rgba(15,36,25,0.18) 100%)",
          }}
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
      className="relative aspect-[3/2] sm:aspect-auto sm:h-[80vh] sm:min-h-[520px] w-full overflow-hidden bg-[var(--c-green-deep)]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src={HOME_DIVIDER_IMG}
          alt="Cinematic Mexico golf landscape"
          className="w-full h-full object-cover object-center md:scale-110 md:[object-position:left_center]"
        />
        <div className="absolute inset-0 bg-[rgba(15,36,25,0.18)]" />
      </motion.div>
    </section>
  );
};

/* ─────────────── PAGE ─────────────── */

const Home = () => {
  const heroVideoRef = useRef(null);

  useSeo({
    title: "Golf in Mexico° — The best golf in Mexico",
    description:
      "The only editorial guide to golf in Mexico — courses, costs, logistics, and bespoke trips across Los Cabos, Punta Mita, Mexico City and beyond. By Pablo De La Mora & José Islas.",
    canonical: "/",
    jsonLd: [orgSchema(), webSiteSchema()],
  });

  // Nudge autoplay across browsers: muted+playsInline lets most autoplay, but
  // iOS/Safari can need an explicit play() once data is ready. (Low Power Mode
  // still blocks autoplay at the OS level — the poster + tap-to-play covers that.)
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <main data-testid="page-home" className="relative">
      {/* HERO — full-bleed video, H1 only */}
      <section
        data-testid="hero-section"
        className="relative h-[100svh] w-full overflow-hidden bg-[var(--c-green-deep)]"
      >
        <video
          ref={heroVideoRef}
          data-testid="hero-video"
          className="absolute inset-0 w-full h-full object-cover editorial-img"
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          {/* WebM first (smaller, Chrome/Firefox); iOS Safari skips it and uses the MP4 fallback */}
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* H1 + CTA */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            data-testid="hero-wordmark"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-normal text-white leading-[1.02] tracking-tight text-[9vw] md:text-[6.2vw] lg:text-[5.6rem] max-w-[18ch] mx-auto"
          >
            There is no golf destination{" "}
            <span className="italic text-[var(--c-gold)]">like Mexico.</span>
          </motion.h1>

          {/* Deliberately a plain <p>, not a motion element: the prerenderer captures
              the entry animation's initial frame, so a motion wrapper would ship this
              crawler-visible sub-line inside style="opacity: 0" markup. See the same
              rule documented above StatementAndVideo's guides paragraph pattern. */}
          <p
            data-testid="hero-subline"
            className="mt-6 md:mt-8 font-body font-light text-white/85 text-base md:text-lg max-w-[42ch] mx-auto"
          >
            Curated experiences, planned by a tour agent and a tour pro.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/golf-packages"
              data-testid="hero-cta-discover"
              className="group mt-10 md:mt-14 inline-flex items-center gap-3 border border-[var(--c-gold)] text-white px-7 md:px-9 py-4 md:py-[18px] rounded-sm font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] hover:bg-[var(--c-gold)] hover:text-[var(--c-green-deep)] transition-colors duration-500"
            >
              Discover your golf experience
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL STATEMENT + VIDEO BOX */}
      <StatementAndVideo />

      {/* CINEMATIC DIVIDER */}
      <HomeDivider />

      {/* FOUNDERS · Visual sliders only · full editorial bios live on /about */}
      <FoundersGallery />
    </main>
  );
};

export default Home;
