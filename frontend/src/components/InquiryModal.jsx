import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const REGIONS = [
  "Los Cabos",
  "Riviera Nayarit & Punta Mita",
  "Ciudad de México",
  "Open to suggestion",
];

const InquiryModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSent(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Design-only submission per current scope. Confirms the request.
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="inquiry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          data-testid="inquiry-modal"
          className="fixed inset-0 z-[200] bg-ink/55 backdrop-blur-md flex items-stretch md:items-center md:justify-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose && onClose();
          }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:max-w-[920px] md:my-12 bg-cream text-ink overflow-y-auto"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-ink/15">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                Submit an Inquiry · By name
              </span>
              <button
                onClick={onClose}
                data-testid="inquiry-close"
                aria-label="Close inquiry"
                className="font-mono text-[10px] uppercase tracking-wide-editorial text-ink editorial-link"
              >
                Close ✕
              </button>
            </div>

            {!sent ? (
              <form
                onSubmit={onSubmit}
                data-testid="inquiry-form"
                className="px-6 md:px-10 py-10 md:py-14"
              >
                <h3 className="font-display font-light text-ink text-3xl md:text-5xl tracking-tight leading-[1.05] max-w-xl">
                  Tell us what you are{" "}
                  <span className="italic">imagining.</span>
                </h3>
                <p className="mt-5 font-body font-light text-ink/70 text-base md:text-lg leading-relaxed max-w-xl">
                  Pablo or José will reply within twenty-four hours, by name.
                  We are not booking trips yet — we are starting conversations
                  with the right people.
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <Field
                    id="iq-name"
                    label="Name"
                    required
                    value={name}
                    onChange={setName}
                    placeholder="Your name"
                  />
                  <Field
                    id="iq-email"
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={setEmail}
                    placeholder="you@elsewhere.com"
                  />
                  <div>
                    <label
                      htmlFor="iq-region"
                      className="block font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
                    >
                      Region
                    </label>
                    <select
                      id="iq-region"
                      data-testid="inquiry-region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="mt-2 w-full bg-transparent border-0 border-b border-ink/40 focus:border-gold outline-none font-body text-base md:text-lg text-ink py-2"
                    >
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field
                    id="iq-when"
                    label="When"
                    value={when}
                    onChange={setWhen}
                    placeholder="Month or window"
                  />
                </div>

                <div className="mt-8">
                  <label
                    htmlFor="iq-note"
                    className="block font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
                  >
                    What you are imagining
                  </label>
                  <textarea
                    id="iq-note"
                    data-testid="inquiry-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="A long weekend, a course, a group — anything we should know."
                    className="mt-2 w-full bg-transparent border-0 border-b border-ink/40 focus:border-gold outline-none font-body text-base md:text-lg text-ink py-2 resize-none"
                  />
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted max-w-xs">
                    No marketplace. No call-center. Just Pablo and José.
                  </span>
                  <button
                    type="submit"
                    data-testid="inquiry-submit"
                    className="group inline-flex items-center gap-3 bg-ink text-cream px-6 py-3 hover:bg-forest transition-colors duration-500"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                      Send the inquiry
                    </span>
                    <span className="font-mono text-[11px] transition-transform duration-500 group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                data-testid="inquiry-confirmation"
                className="px-6 md:px-10 py-16 md:py-20"
              >
                <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                  Inquiry received
                </span>
                <h3 className="mt-5 font-display font-light italic text-ink text-3xl md:text-5xl tracking-tight leading-[1.1] max-w-2xl">
                  Noted, {name || "amigo"}. We'll write back, by hand.
                </h3>
                <p className="mt-6 font-body font-light text-ink/75 text-base md:text-lg leading-relaxed max-w-xl">
                  Pablo or José will reply within twenty-four hours. If the
                  timing is right, we will start arranging something for{" "}
                  <span className="text-ink">{region}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-12 font-mono text-[11px] uppercase tracking-wide-editorial text-ink editorial-link"
                >
                  Return to the journal →
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Field = ({ id, label, type = "text", value, onChange, placeholder, required }) => (
  <div>
    <label
      htmlFor={id}
      className="block font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
    >
      {label}
    </label>
    <input
      id={id}
      data-testid={id}
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-2 w-full bg-transparent border-0 border-b border-ink/40 focus:border-gold outline-none font-body text-base md:text-lg text-ink py-2"
    />
  </div>
);

export default InquiryModal;
