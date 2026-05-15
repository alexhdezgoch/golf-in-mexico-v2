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
            className={`h-3.5 md:h-4 w-auto transition-[filter] duration-500 ${
              onDarkHero ? "" : "invert"
            }`}
            style={{ mixBlendMode: onDarkHero ? "screen" : "multiply" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
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
          <span
            className={`font-mono text-[10px] uppercase tracking-wide-editorial pl-6 border-l hairline ${
              onDarkHero ? "text-cream/45 border-cream/20" : "text-muted/70"
            }`}
          >
            MX · EST. 2025
          </span>
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
