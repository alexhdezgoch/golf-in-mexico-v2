import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      data-testid="reading-progress"
      aria-hidden
      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[101] h-[2px] bg-gold pointer-events-none"
    />
  );
};

export default ReadingProgress;
