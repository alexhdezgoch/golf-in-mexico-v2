import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Journal", to: "/journal" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/#founders" },
];

const SOCIALS = [
  { href: "https://www.facebook.com/", label: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.87v-6.98H8v-2.89h2.4V9.41c0-2.38 1.42-3.69 3.58-3.69 1.04 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.49v1.78h2.63l-.42 2.89H13.4v6.98A10 10 0 0 0 22 12Z" },
  { href: "https://www.instagram.com/", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.22-2.04.37-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.32.97-.37 2.04-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.07.22 1.65.37 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.32 2.04.37 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.07-.05 1.65-.22 2.04-.37.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.32-.97.37-2.04.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.07-.22-1.65-.37-2.04a3.41 3.41 0 0 0-.83-1.27 3.41 3.41 0 0 0-1.27-.83c-.39-.15-.97-.32-2.04-.37-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.4a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" },
  { href: "https://www.linkedin.com/", label: "LinkedIn", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05A3.74 3.74 0 0 1 16.2 8.7c3.6 0 4.26 2.37 4.26 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) setSubmitted(true);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("founders")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#founders");
    }
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
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="block w-6 h-px bg-gold" />
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
              Newsletter
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-normal text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl"
          >
            Stay <span className="italic text-[var(--c-gold)]">inside the ropes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-8 font-body font-light text-cream/65 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            No spam. Only content worth your time.
          </motion.p>

          {!submitted ? (
            <form
              data-testid="newsletter-form"
              onSubmit={onSubmit}
              className="mt-10 md:mt-12 max-w-2xl"
            >
              <div className="relative flex items-center border-b border-cream/25 focus-within:border-gold transition-colors duration-300 pb-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="newsletter-email-input"
                  className="flex-1 bg-transparent text-cream placeholder:text-cream/35 font-body font-light text-lg md:text-xl py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  data-testid="newsletter-submit-button"
                  className="group flex items-center gap-3 pl-6 font-mono text-[11px] uppercase tracking-wide-editorial text-cream hover:text-gold transition-colors duration-300"
                >
                  <span>Subscribe</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <p
              data-testid="newsletter-success"
              className="mt-10 font-display italic font-light text-gold text-2xl md:text-3xl"
            >
              You&apos;re on the list. Welcome to the room.
            </p>
          )}
        </div>
      </div>

      {/* 3-column grid: Brand / Navigation / Contact + Social */}
      <div data-testid="footer-grid" className="border-b border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 — Brand */}
          <div data-testid="footer-col-brand" className="flex flex-col gap-6">
            <Link to="/" data-testid="footer-logo" className="inline-flex leading-none">
              <img src="/logo-wordmark.png" alt="Golf in Mexico°" className="h-6 w-auto invert opacity-90" style={{ mixBlendMode: "screen" }} />
            </Link>
            <p className="font-body font-light text-cream/60 text-sm leading-[1.7] max-w-sm">
              An editorial dedicated to golf, culture and the experience of
              playing at the finest courses in Mexico.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div data-testid="footer-col-nav" className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/40">
              Navigation
            </span>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  {l.label === "About" ? (
                    <a
                      href="/#founders"
                      onClick={handleAboutClick}
                      data-testid="footer-link-about"
                      className="font-display text-cream/85 hover:text-gold transition-colors duration-300 text-xl"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.to}
                      data-testid={`footer-link-${l.label.toLowerCase()}`}
                      className="font-display text-cream/85 hover:text-gold transition-colors duration-300 text-xl"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact + Social */}
          <div data-testid="footer-col-contact" className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/40">
                Contact
              </span>
              <a
                href="mailto:hello@golfinmexico.com"
                data-testid="footer-email"
                className="font-display text-cream/85 hover:text-gold transition-colors duration-300 text-xl break-all"
              >
                hello@golfinmexico.com
              </a>
              <span className="font-body font-light text-cream/55 text-sm leading-relaxed">
                Mexico City · Los Cabos
                <br />
                México
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/40">
                Social Media
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-testid={`footer-social-${s.label.toLowerCase()}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-cream/20 text-cream/80 hover:bg-gold hover:border-gold hover:text-ink transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div data-testid="footer-copyright" className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 md:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
          © {year} Golf<span className="text-gold">°</span> in Mexico
          <span className="text-gold">°</span>. All rights reserved.
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
          Crafted with care in México
        </span>
      </div>
    </footer>
  );
};

export default Footer;
