import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import FoundersGallery from "@/components/FoundersGallery";
import TeamEditorial from "@/components/TeamEditorial";
import { ARTICLES } from "@/data/articles";

const HERO_VIDEO =
  "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/5lehrm14_HERO%20VIDEO.mov";

const HERO_POSTER =
  "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/e60z74y2_Golf%C2%B0%20In%20Mexico%C2%B0%20%285%29.png";

const HOME_DIVIDER_IMG =
  "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/nsvdb584_GOLFINMEXICO-014.jpg";

const HOME_VIDEO_SRC = "/video/home.mp4";

/* ─────────────── LATEST FROM THE JOURNAL ─────────────── */

const LatestFromJournal = () => {
  const items = ARTICLES.slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section
      data-testid="home-latest-journal"
      className="bg-[var(--c-off-white)] border-t border-[var(--c-border)] py-20 md:py-28"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-3">
              From the Journal
            </span>
            <h2 className="font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-3xl md:text-4xl lg:text-5xl max-w-[22ch]">
              Latest reads from <em className="italic text-[var(--c-gold)]">inside the ropes.</em>
            </h2>
          </div>
          <Link
            to="/journal"
            data-testid="home-latest-view-all"
            className="group self-start md:self-auto inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-mid)] hover:text-[var(--c-gold)] transition-colors"
          >
            View all articles
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {items.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/journal/${a.slug}`}
                data-testid={`home-latest-card-${i}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-green-deep)] mb-5 rounded-sm">
                  <img
                    src={a.heroImage}
                    alt={a.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                {a.destinationLabel && (
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-2">
                    {a.destinationLabel}
                  </span>
                )}
                <h3 className="font-display font-normal text-[var(--c-text)] text-xl md:text-2xl leading-[1.2] tracking-tight mb-3 group-hover:text-[var(--c-gold)] transition-colors">
                  {a.title}
                </h3>
                <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.65]">
                  {a.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
        className="font-body font-light text-[var(--c-text-mid)] leading-[1.7] text-lg md:text-xl max-w-[52ch] mb-14 md:mb-20"
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
          src={HOME_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
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

        {/* H1 + CTA */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            data-testid="hero-wordmark"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-normal text-white leading-[1.02] tracking-tight text-[9vw] md:text-[6.2vw] lg:text-[5.6rem] max-w-[18ch] mx-auto"
          >
            We uncover{" "}
            <span className="italic text-[var(--c-gold)]">the best golf in Mexico.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/experience"
              data-testid="hero-cta-discover"
              className="group mt-10 md:mt-14 inline-flex items-center gap-3 border border-[var(--c-gold)] text-white px-7 md:px-9 py-4 md:py-[18px] rounded-sm font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] hover:bg-[var(--c-gold)] hover:text-[var(--c-green-deep)] transition-colors duration-500"
            >
              Discover your golf experience
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* LATEST FROM THE JOURNAL */}
      <LatestFromJournal />

      {/* EDITORIAL STATEMENT + VIDEO BOX */}
      <StatementAndVideo />

      {/* CINEMATIC DIVIDER */}
      <HomeDivider />

      {/* FOUNDERS · Visual sliders + full editorial bios (The Agent · The Player · The Collaboration) */}
      <FoundersGallery />
      <TeamEditorial />
    </main>
  );
};

export default Home;
