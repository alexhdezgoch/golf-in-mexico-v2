import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Notify modal — reusable "Stay in the know" capture for regions in preparation.
 */
const NotifyModal = ({ open, onClose, region }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to backend
    setSubmitted(true);
    setTimeout(() => onClose && onClose(), 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="notify-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-ink/55 backdrop-blur-sm flex items-center justify-center px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-cream p-8 md:p-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-testid="notify-modal-close"
              className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center text-ink/55 hover:text-ink transition-colors"
            >
              ×
            </button>

            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
              {region} · In Preparation
            </span>
            <h3 className="mt-4 font-display font-light text-ink text-3xl md:text-4xl leading-[1.1] tracking-tight">
              Stay in the know.
            </h3>
            <p className="mt-4 font-body font-light text-ink/70 text-sm md:text-base leading-relaxed">
              Be the first to read our editorial hub on{" "}
              <span className="text-ink">{region}</span> — courses, costs,
              and the people behind the round. We publish region by region.
            </p>

            <form onSubmit={submit} data-testid="notify-form" className="mt-8">
              <div className="relative flex flex-wrap items-end gap-3 border-b border-ink/30 pb-3 focus-within:border-gold transition-colors">
                <label
                  htmlFor="notify-email"
                  className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted pb-1"
                >
                  Email
                </label>
                <input
                  id="notify-email"
                  type="email"
                  required
                  data-testid="notify-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 min-w-0 bg-transparent border-0 outline-none font-body text-base text-ink placeholder:text-ink/30 py-1"
                />
                <button
                  type="submit"
                  data-testid="notify-submit"
                  className="font-mono text-[11px] uppercase tracking-wide-editorial text-ink hover:text-gold transition-colors pb-1"
                >
                  Notify me →
                </button>
              </div>
              <div className="mt-3 h-5">
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
                  >
                    Noted — we'll write first.
                  </motion.span>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotifyModal;
