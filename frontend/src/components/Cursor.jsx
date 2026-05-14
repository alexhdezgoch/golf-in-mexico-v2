import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setVisible(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target;
      const interactive = el.closest("a, button, input, [data-cursor='hover'], [role='button']");
      setHovering(!!interactive);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        aria-hidden
        data-testid="cursor-dot"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 44 : 8,
          height: hovering ? 44 : 8,
          backgroundColor: hovering ? "rgba(196, 162, 78, 0.18)" : "#1A1A18",
          borderColor: hovering ? "#C4A24E" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border mix-blend-normal"
      />
    </>
  );
};

export default Cursor;
