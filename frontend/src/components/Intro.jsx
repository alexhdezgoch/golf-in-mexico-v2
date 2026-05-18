import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Editorial intro sequence inspired by KRO Travel Engineering.
 * A slow, line-by-line reveal of a brand line, then a clean fade-out
 * onto the hero. Shown once per session.
 */
const LINES = [
  { text: "The best golf trip", italic: false },
  { text: "is in", italic: false },
  { text: "México.", italic: true },
];

const Intro = ({ onDone }) => {
  const [phase, setPhase] = useState("in"); // in -> out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 3600);
    const t2 = setTimeout(() => {
      try {
        sessionStorage.setItem("gim-intro-seen", "1");
      } catch (e) {
        // ignore storage errors
      }
      onDone && onDone();
    }, 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <motion.div
      data-testid="brand-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[9999] bg-cream text-ink flex flex-col"
    >
      {/* Corner: Loading mark */}
      <div className="px-6 md:px-12 pt-6 md:pt-8 flex items-start justify-between">
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted flex items-center gap-3"
        >
          <span className="block w-3 h-px bg-muted" />
          Loading
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted hidden md:block max-w-[42ch] text-right leading-relaxed"
        >
          An editorial dedicated to golf, culture, and the experience of playing México's finest courses. Shaped by founders with years in tour environments.
        </motion.span>
      </div>

      {/* Center: poetic 3-line reveal */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          {LINES.map((line, i) => (
            <div
              key={line.text}
              className="overflow-hidden py-2 md:py-3"
            >
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.55 + i * 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display font-light text-ink text-5xl md:text-7xl lg:text-[7.5rem] tracking-tight leading-[0.95] ${
                  line.italic ? "italic" : ""
                }`}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: wordmark + progress hairline */}
      <div className="px-6 md:px-12 pb-6 md:pb-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === "out" ? 1 : 0.95 }}
          transition={{ duration: 3.4, ease: [0.45, 0, 0.55, 1] }}
          style={{ transformOrigin: "left center" }}
          className="h-px bg-ink"
        />
        <div className="mt-5 flex items-end justify-between">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src="/logo-wordmark.png"
            alt="Golf in Mexico°"
            className="h-3 md:h-4 w-auto invert"
            style={{ mixBlendMode: "multiply" }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
          >
            golf-in-mexico.com
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default Intro;
