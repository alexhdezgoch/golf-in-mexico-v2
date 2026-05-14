import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Subtle parallax wrapper for full-bleed images.
 * Translates child Y based on element's progress through the viewport.
 */
const Parallax = ({ children, distance = 80, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-12 -bottom-12">
        {children}
      </motion.div>
    </div>
  );
};

export default Parallax;
