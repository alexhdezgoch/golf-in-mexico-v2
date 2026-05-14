import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      data-testid="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[9999] bg-cream flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left center" }}
          className="loader-bar w-[180px] md:w-[260px]"
        />
        <span className="font-mono text-[10px] tracking-wide-editorial uppercase text-muted">
          Golf in Mexico°
        </span>
      </div>
    </motion.div>
  );
};

export default Loader;
