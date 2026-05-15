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
      {/* Newsletter — primary CTA, full width */}
      <div
        data-testid="footer-newsletter"
        className="border-b border-cream/10"
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="block w-6 h-px bg-gold" />
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
              The Newsletter
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl"
          >
            Coming to México, or planning a round?{" "}
            <span className="italic text-cream/80">Begin here.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-12 font-body font-light text-cream/60 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Editorial dispatches, course reviews, and travel notes — written by
            Pablo and José.
          </motion.p>

          <form
            onSubmit={onSubmit}
            data-testid="email-capture-form"
            className="mt-12 md:mt-16 max-w-2xl"
          >
            <div className="relative flex flex-wrap items-end gap-3 sm:gap-6 border-b border-cream/30 pb-3 focus-within:border-gold transition-colors">
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
                className="flex-1 min-w-0 bg-transparent border-0 outline-none font-body text-base md:text-lg text-cream placeholder:text-cream/30 py-1"
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

      {/* Brand + Nav + Contact — clean horizontal row */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:max-w-xs">
            <img
              src="/logo-wordmark.png"
              alt="Golf in Mexico°"
              data-testid="footer-wordmark"
              className="h-4 md:h-5 w-auto"
              style={{ mixBlendMode: "screen" }}
            />
            <p className="mt-6 font-body font-light text-cream/55 text-sm leading-[1.7]">
              An editorial dedicated to golf, culture, and the experience of
              playing México's finest courses.
            </p>
          </div>

          {/* Navigation — horizontal, tighter */}
          <nav className="flex flex-wrap items-start gap-x-8 gap-y-3 md:pt-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                data-testid={`footer-link-${l.label.toLowerCase().replace(/ /g, "-")}`}
                className="font-mono text-[11px] uppercase tracking-wide-editorial text-cream/75 hover:text-cream editorial-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3 md:items-end md:text-right md:pt-1">
            <a
              href="mailto:hello@golf-in-mexico.com"
              data-testid="footer-link-email"
              className="font-mono text-[11px] uppercase tracking-wide-editorial text-cream/85 hover:text-gold transition-colors editorial-link self-start md:self-auto"
            >
              hello@golf-in-mexico.com
            </a>
            <span
              data-testid="footer-coords"
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45"
            >
              22°53′N · 109°54′W
            </span>
          </div>
        </div>
      </div>

      {/* Bottom rule — minimal copyright */}
      <div className="border-t border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
            © {year} Golf in Mexico°
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/30 hidden sm:inline">
            MX · An editorial brand
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
