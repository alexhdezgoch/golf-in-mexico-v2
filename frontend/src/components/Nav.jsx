import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/journal", label: "Journal" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const onDarkHero = isHome && !scrolled;

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
          ? "py-3 bg-cream/85 backdrop-blur-md border-b hairline"
          : "py-6 md:py-8 bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center leading-none"
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
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `editorial-link font-mono text-[11px] uppercase tracking-wide-editorial transition-colors ${
                  onDarkHero
                    ? isActive
                      ? "text-cream"
                      : "text-cream/60 hover:text-cream"
                    : isActive
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
          <span className={`h-3 w-px ${onDarkHero ? "bg-cream/20" : "bg-ink/15"}`} />
          <div className="flex items-center gap-3">
            {[
              { href: "https://www.facebook.com/", label: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.87v-6.98H8v-2.89h2.4V9.41c0-2.38 1.42-3.69 3.58-3.69 1.04 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.49v1.78h2.63l-.42 2.89H13.4v6.98A10 10 0 0 0 22 12Z" },
              { href: "https://www.instagram.com/", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.22-2.04.37-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.32.97-.37 2.04-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.07.22 1.65.37 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.32 2.04.37 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.07-.05 1.65-.22 2.04-.37.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.32-.97.37-2.04.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.07-.22-1.65-.37-2.04a3.41 3.41 0 0 0-.83-1.27 3.41 3.41 0 0 0-1.27-.83c-.39-.15-.97-.32-2.04-.37-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.4a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" },
              { href: "https://www.linkedin.com/", label: "LinkedIn", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05A3.74 3.74 0 0 1 16.2 8.7c3.6 0 4.26 2.37 4.26 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-testid={`nav-social-${s.label.toLowerCase()}`}
                className={`group inline-flex items-center justify-center transition-colors ${
                  onDarkHero ? "text-cream/65 hover:text-cream" : "text-ink/60 hover:text-ink"
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
          className={`md:hidden font-mono text-[11px] uppercase tracking-wide-editorial ${
            onDarkHero ? "text-cream" : "text-ink"
          }`}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        data-testid="nav-mobile-drawer"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 pt-8 pb-10 flex flex-col gap-6 bg-cream/95 backdrop-blur-md border-t hairline">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `font-display text-3xl tracking-tight ${
                  isActive ? "text-ink" : "text-muted"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
