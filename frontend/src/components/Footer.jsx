import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Editorial Pieces", to: "/journal" },
  { label: "Destinations", to: "/journal" },
  { label: "About", to: "/about" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) setSubmitted(true);
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative z-10 bg-ink text-cream"
    >
      {/* Top: brand · nav · newsletter */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16 grid grid-cols-12 gap-y-16 gap-x-8">
        {/* Brand */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <img
            src="/logo-wordmark.png"
            alt="Golf in Mexico°"
            data-testid="footer-wordmark"
            className="h-5 md:h-6 w-auto"
            style={{ mixBlendMode: "screen" }}
          />
          <p className="mt-20 md:mt-28 font-body font-light text-cream/55 text-base leading-[1.75] max-w-sm">
            An editorial dedicated to golf, culture, and the experience of
            playing México's finest courses.
          </p>
        </div>

        {/* Navigation */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            Navigation
          </span>
          <ul className="mt-16 md:mt-24 space-y-6 md:space-y-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/ /g, "-")}`}
                  className="font-body font-light text-cream/85 text-base hover:text-cream editorial-link"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter column */}
        <div
          data-testid="footer-newsletter"
          className="col-span-12 md:col-span-4 lg:col-span-5"
        >
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            The Newsletter
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-20 font-display font-light text-cream text-2xl md:text-3xl leading-[1.1] tracking-tight max-w-md"
          >
            Coming to México, or planning a round?{" "}
            <span className="italic">Begin here.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-body font-light text-cream/55 text-sm md:text-base leading-relaxed max-w-md"
          >
            Editorial dispatches, course reviews, and travel notes — written by
            Pablo and José.
          </motion.p>

          <form
            onSubmit={onSubmit}
            data-testid="email-capture-form"
            className="mt-8 max-w-md"
          >
            <div className="relative flex flex-wrap items-end gap-3 sm:gap-5 border-b border-cream/30 pb-2 focus-within:border-gold transition-colors">
              <label
                htmlFor="footer-email"
                className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55 pb-1"
              >
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                data-testid="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@elsewhere.com"
                className="flex-1 min-w-0 bg-transparent border-0 outline-none font-body text-base text-cream placeholder:text-cream/30 py-1"
              />
              <button
                type="submit"
                data-testid="email-submit"
                className="font-mono text-[11px] uppercase tracking-wide-editorial text-cream pb-1 group inline-flex items-center gap-2 hover:text-gold transition-colors"
              >
                Connect
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
            <div className="mt-3 h-5">
              {submitted && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-testid="email-confirmation"
                  className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
                >
                  Noted. The newsletter will find you.
                </motion.span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Bottom horizontal bar — contact left, copyright right */}
      <div className="border-t border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <a
              href="mailto:hello@golf-in-mexico.com"
              data-testid="footer-link-email"
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/85 hover:text-gold transition-colors editorial-link self-start"
            >
              hello@golf-in-mexico.com
            </a>
            <span
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45"
              data-testid="footer-coords"
            >
              22°53′N · 109°54′W
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
            © {year} Golf in Mexico° · Pablo De La Mora · José Islas
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
