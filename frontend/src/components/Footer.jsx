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
      {/* Newsletter strip */}
      <div
        data-testid="footer-newsletter"
        className="border-b border-cream/10"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
              The Newsletter
            </span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-cream text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl"
            >
              Coming to México, or planning a round?{" "}
              <span className="italic">Begin here.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-body font-light text-cream/60 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Editorial dispatches, course reviews, and travel notes — written
              by Pablo and José.
            </motion.p>

            <form
              onSubmit={onSubmit}
              data-testid="email-capture-form"
              className="mt-12 max-w-xl"
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
                  Connect with us
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
              <div className="mt-4 h-5">
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
      </div>

      {/* Brand · Navigation · Contact */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16 grid grid-cols-12 gap-y-16 gap-x-8">
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

        <nav className="col-span-6 md:col-span-3 lg:col-span-4">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            Navigation
          </span>
          <ul className="mt-16 md:mt-24 space-y-10 md:space-y-12">
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

        <div className="col-span-6 md:col-span-4 lg:col-span-4">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            Contact
          </span>
          <ul className="mt-16 md:mt-24 space-y-10 md:space-y-12">
            <li>
              <a
                href="mailto:hello@golf-in-mexico.com"
                data-testid="footer-link-email"
                className="font-body font-light text-cream/85 text-base hover:text-cream editorial-link"
              >
                hello@golf-in-mexico.com
              </a>
            </li>
            <li className="font-body font-light text-cream/85 text-base">
              Los Cabos, B.C.S., México
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
            © {year} Golf in Mexico° · golf-in-mexico.com
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
            Pablo De La Mora · José Islas
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
