import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useInquiry } from "@/context/Inquiry";

const links = [];

const DESTINATIONS = [
  { slug: "los-cabos", name: "Los Cabos", region: "Baja California Sur", live: true, href: "/destinations/los-cabos" },
  { slug: "punta-mita", name: "Punta Mita", region: "Riviera Nayarit", live: true, href: "/destinations/punta-mita" },
  { slug: "mexico-city", name: "Mexico City", region: "Valle de México", live: true, href: "/destinations/mexico-city" },
  { slug: "puerto-vallarta", name: "Puerto Vallarta", region: "Bahía de Banderas", live: true, href: "/destinations/puerto-vallarta" },
  { slug: "cancun-riviera-maya", name: "Cancún · Riviera Maya", region: "Quintana Roo", live: true, href: "/destinations/cancun-riviera-maya" },
  { slug: "unique-destinations", name: "Unique Destinations", region: "Across México", live: true, href: "/destinations/unique-destinations" },
];

const SOCIALS = [
  { href: "https://www.facebook.com/", label: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.87v-6.98H8v-2.89h2.4V9.41c0-2.38 1.42-3.69 3.58-3.69 1.04 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.49v1.78h2.63l-.42 2.89H13.4v6.98A10 10 0 0 0 22 12Z" },
  { href: "https://www.instagram.com/", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.22-2.04.37-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.32.97-.37 2.04-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.07.22 1.65.37 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.32 2.04.37 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.07-.05 1.65-.22 2.04-.37.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.32-.97.37-2.04.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.07-.22-1.65-.37-2.04a3.41 3.41 0 0 0-.83-1.27 3.41 3.41 0 0 0-1.27-.83c-.39-.15-.97-.32-2.04-.37-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.4a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" },
  { href: "https://www.linkedin.com/", label: "LinkedIn", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05A3.74 3.74 0 0 1 16.2 8.7c3.6 0 4.26 2.37 4.26 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const onDarkHero = isHome && !scrolled;
  const { openInquiry } = useInquiry();

  const scrollToFounders = () => {
    const el = document.getElementById("founders");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      scrollToFounders();
    } else {
      navigate("/#founders");
    }
  };

  useEffect(() => {
    if (isHome && location.hash === "#founders") {
      // Wait briefly for layout
      setTimeout(scrollToFounders, 200);
    }
  }, [isHome, location.hash, location.key]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-nav"
      className={`nav-base fixed top-0 left-0 right-0 z-[100] ${
        scrolled
          ? "py-3 bg-cream/70 backdrop-blur-xl border-b hairline"
          : "py-5 md:py-7 bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center leading-none shrink-0"
        >
          <img
            src="/logo-wordmark.png"
            alt="Golf in Mexico°"
            className={`h-5 md:h-6 w-auto transition-[filter] duration-500 ${
              onDarkHero ? "" : "invert"
            }`}
            style={{ mixBlendMode: onDarkHero ? "screen" : "multiply" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {/* Destinations dropdown — first */}
          <div
            className="relative"
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <NavLink
              to="/destinations"
              data-testid="nav-link-destinations"
              className={({ isActive }) =>
                `nav-link-modern font-mono text-[11px] uppercase tracking-wide-editorial transition-colors duration-300 inline-flex items-center gap-1.5 ${
                  onDarkHero
                    ? isActive || destOpen
                      ? "text-cream is-active"
                      : "text-cream/65 hover:text-cream"
                    : isActive || destOpen
                      ? "text-ink is-active"
                      : "text-muted hover:text-ink"
                }`
              }
            >
              Destinations
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${destOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </NavLink>

            {destOpen && (
              <div
                data-testid="nav-destinations-dropdown"
                className="absolute left-0 top-full pt-3"
              >
                <ul className="min-w-[280px] bg-cream border border-ink/10 shadow-2xl rounded-2xl overflow-hidden p-2">
                  {DESTINATIONS.map((d) => (
                    <li key={d.slug}>
                      <Link
                        to={d.href}
                        data-testid={`nav-destination-${d.slug}`}
                        className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-ink/5 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-display text-base text-ink leading-tight">
                            {d.name}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted mt-0.5">
                            {d.region}
                          </span>
                        </div>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wide-editorial ${
                            d.live ? "text-forest" : "text-gold"
                          }`}
                        >
                          {d.live ? "Live" : "Soon"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Journal */}
          <NavLink
            to="/journal"
            data-testid="nav-link-journal"
            className={({ isActive }) =>
              `nav-link-modern font-mono text-[11px] uppercase tracking-wide-editorial transition-colors duration-300 ${
                onDarkHero
                  ? isActive
                    ? "text-cream is-active"
                    : "text-cream/65 hover:text-cream"
                  : isActive
                    ? "text-ink is-active"
                    : "text-muted hover:text-ink"
              }`
            }
          >
            Journal
          </NavLink>

          {/* About — scrolls to founders */}
          <a
            href="/#founders"
            onClick={handleAboutClick}
            data-testid="nav-link-about"
            className={`nav-link-modern font-mono text-[11px] uppercase tracking-wide-editorial transition-colors duration-300 ${
              onDarkHero ? "text-cream/65 hover:text-cream" : "text-muted hover:text-ink"
            }`}
          >
            About
          </a>

          {/* Contact — mailto */}
          <a
            href="mailto:hello@golf-in-mexico.com"
            data-testid="nav-link-contact"
            className={`nav-link-modern font-mono text-[11px] uppercase tracking-wide-editorial transition-colors duration-300 ${
              onDarkHero ? "text-cream/65 hover:text-cream" : "text-muted hover:text-ink"
            }`}
          >
            Contact
          </a>

          {/* Inquire CTA — premium magnetic-style button */}
          <button
            type="button"
            onClick={openInquiry}
            data-testid="nav-inquire-cta"
            className={`group relative inline-flex items-center gap-2 rounded-full pl-4 pr-3.5 py-2 font-mono text-[11px] uppercase tracking-wide-editorial transition-all duration-500 ${
              onDarkHero
                ? "bg-gold text-ink hover:bg-cream hover:text-ink"
                : "bg-ink text-cream hover:bg-gold hover:text-ink"
            }`}
          >
            <span className="relative">Inquire</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ink/15 text-current transition-transform duration-500 group-hover:rotate-45">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>

          {/* Divider */}
          <span className={`h-3 w-px ${onDarkHero ? "bg-cream/20" : "bg-ink/15"}`} />

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-testid={`nav-social-${s.label.toLowerCase()}`}
                className={`group inline-flex items-center justify-center transition-colors duration-300 ${
                  onDarkHero ? "text-cream/55 hover:text-gold" : "text-ink/55 hover:text-gold"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide-editorial ${
            onDarkHero ? "text-cream" : "text-ink"
          }`}
          aria-label="Toggle menu"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="relative flex flex-col gap-1.5">
            <span className={`block h-px w-5 bg-current transition-transform duration-300 ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block h-px w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        data-testid="nav-mobile-drawer"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 pt-8 pb-12 flex flex-col gap-5 bg-cream/95 backdrop-blur-xl border-t hairline">
          <NavLink
            to="/destinations"
            data-testid="nav-mobile-link-destinations"
            className={({ isActive }) =>
              `font-display text-4xl tracking-tight leading-none ${
                isActive ? "text-ink" : "text-muted"
              }`
            }
          >
            Destinations
            <span className="font-display italic text-gold">°</span>
          </NavLink>
          <NavLink
            to="/journal"
            data-testid="nav-mobile-link-journal"
            className={({ isActive }) =>
              `font-display text-4xl tracking-tight leading-none ${
                isActive ? "text-ink" : "text-muted"
              }`
            }
          >
            Journal
            <span className="font-display italic text-gold"> °</span>
          </NavLink>
          <a
            href="/#founders"
            onClick={handleAboutClick}
            data-testid="nav-mobile-link-about"
            className="font-display text-4xl tracking-tight leading-none text-muted"
          >
            About
          </a>
          <a
            href="mailto:hello@golf-in-mexico.com"
            data-testid="nav-mobile-link-contact"
            className="font-display text-4xl tracking-tight leading-none text-muted"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openInquiry();
            }}
            data-testid="nav-mobile-inquire"
            className="mt-3 self-start inline-flex items-center gap-2 rounded-full bg-ink text-cream pl-5 pr-4 py-3 font-mono text-[11px] uppercase tracking-wide-editorial"
          >
            Inquire
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cream/15">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
          <div className="mt-6 flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-ink/55 hover:text-gold transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
