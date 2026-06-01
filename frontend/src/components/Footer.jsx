import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Journal", to: "/journal" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/#founders" },
  { label: "Contact", to: "/contact" },
];

const LIVE_DESTINATIONS = [
  { label: "Los Cabos", to: "/destinations/los-cabos" },
  { label: "Punta Mita", to: "/destinations/punta-mita" },
  { label: "Mexico City", to: "/destinations/mexico-city" },
  { label: "Puerto Vallarta", to: "/destinations/puerto-vallarta" },
  { label: "Cancun · Riviera Maya", to: "/destinations/cancun-riviera-maya" },
  { label: "Unique Destinations", to: "/destinations/unique-destinations" },
];

const SOON_DESTINATIONS = [];

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
      className="relative z-10 bg-[#0a0a0a] text-white"
    >
      {/* ─────────── 3-COLUMN GRID ─────────── */}
      <div data-testid="footer-grid" className="border-b border-white/8">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* ── Col 1 — Newsletter + Brand ── */}
          <div data-testid="footer-col-newsletter" className="flex flex-col gap-5 md:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
              The Newsletter°
            </span>

            <h3
              data-testid="footer-newsletter-headline"
              className="font-display font-normal text-white text-lg md:text-xl leading-[1.2] tracking-tight"
            >
              Stay <em className="italic text-[var(--c-gold)]">inside</em> the ropes.
            </h3>

            <p className="font-body font-light text-white/55 text-xs md:text-[13px] leading-[1.65] max-w-sm">
              Tour-level insights, hidden gems, and the culture of Mexican golf
              — delivered straight to your inbox. No spam. Just signal.
            </p>

            {!submitted ? (
              <form
                data-testid="newsletter-form"
                onSubmit={onSubmit}
                className="flex flex-col gap-2 max-w-sm"
              >
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-testid="newsletter-email-input"
                    className="flex-1 min-w-0 bg-white/[0.04] border border-white/15 focus:border-[var(--c-gold)] transition-colors duration-300 text-white placeholder:text-white/35 font-body text-sm px-3.5 py-2.5 rounded-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    data-testid="newsletter-submit-button"
                    aria-label="Subscribe"
                    className="group inline-flex items-center justify-center bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-4 ml-2 rounded-sm font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 whitespace-nowrap"
                  >
                    Subscribe
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <p
                data-testid="newsletter-success"
                className="font-display italic font-normal text-[var(--c-gold)] text-base"
              >
                On its way. Welcome to the room.
              </p>
            )}

            {/* Socials only */}
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-white/70 hover:bg-[var(--c-gold)] hover:border-[var(--c-gold)] hover:text-[var(--c-green-deep)] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2 — Destinations ── */}
          <div data-testid="footer-col-destinations" className="flex flex-col gap-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
              Destinations
            </span>
            <ul className="flex flex-col gap-3">
              {LIVE_DESTINATIONS.map((d) => (
                <li key={d.label}>
                  <Link
                    to={d.to}
                    data-testid={`footer-dest-${d.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-display text-white text-lg md:text-xl hover:text-[var(--c-gold)] transition-colors duration-300"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
              {SOON_DESTINATIONS.map((d) => (
                <li key={d}>
                  <span className="font-display text-white/30 text-base md:text-lg">
                    {d} <em className="not-italic text-white/25 text-xs ml-1">— soon</em>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 — Navigate ── */}
          <div data-testid="footer-col-nav" className="flex flex-col gap-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
              Navigate
            </span>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => {
                if (l.label === "About") {
                  return (
                    <li key={l.label}>
                      <a
                        href="/#founders"
                        onClick={handleAboutClick}
                        data-testid="footer-link-about"
                        className="font-display text-white text-lg md:text-xl hover:text-[var(--c-gold)] transition-colors duration-300"
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                }
                if (l.external) {
                  return (
                    <li key={l.label}>
                      <a
                        href={l.to}
                        data-testid={`footer-link-${l.label.toLowerCase()}`}
                        className="font-display text-white text-lg md:text-xl hover:text-[var(--c-gold)] transition-colors duration-300"
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      data-testid={`footer-link-${l.label.toLowerCase()}`}
                      className="font-display text-white text-lg md:text-xl hover:text-[var(--c-gold)] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/experience"
              data-testid="footer-plan-trip"
              className="group mt-4 self-start inline-flex items-center gap-2 font-display italic font-normal text-[var(--c-gold)] text-lg md:text-xl hover:text-[var(--c-gold-light)] transition-colors duration-300"
            >
              Plan your trip
              <span className="not-italic transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────── BOTTOM BAR ─────────── */}
      <div
        data-testid="footer-copyright"
        className="max-w-[1240px] mx-auto px-6 md:px-12 py-6 md:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          © {year} Golf<span className="text-[var(--c-gold)]">°</span> in Mexico
          <span className="text-[var(--c-gold)]">°</span>. All rights reserved.
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          Crafted with care in Mexico
        </span>
      </div>
    </footer>
  );
};

export default Footer;
