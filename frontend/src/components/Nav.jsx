import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteSearch from "@/components/SiteSearch";
import { DESTINATIONS, CONCIERGE_CALL_URL, START_PLANNING_URL } from "@/data/siteNav";

/* Header in the Reverie system: "Menu" on the left opens a cream side drawer, the wordmark sits in the centre, search,
   "Plan my trip" and the one green button on the right. Transparent over the home film, cream everywhere else. */

/* The brand's own logo (a white PNG): shown as is over the film, inverted to ink on the cream bar. */
const Wordmark = ({ dark }) => (
  <img src="/logo-wordmark.png" alt="GOLF° IN MEXICO°" width="1280" height="200" className={`h-[20px] md:h-[26px] w-auto transition-[filter] duration-300 ${dark ? "" : "invert"}`} />
);

const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const MENU = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations", children: DESTINATIONS },
  { label: "Courses", href: "/courses" },
  { label: "Curated Trips", to: "/trips" },
  { label: "Journal", to: "/journal" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Drawer = ({ open, onClose, onSearch }) => {
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <>
      <div aria-hidden="true" onClick={onClose} className={`fixed inset-0 z-[110] bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <aside
        aria-label="Menu"
        data-testid="nav-drawer"
        data-lenis-prevent
        className={`fixed left-0 top-0 bottom-0 z-[120] w-full max-w-[400px] bg-[var(--r-cream)] text-[var(--r-green)] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-7 pt-6 pb-12 flex flex-col gap-8">
          <button type="button" onClick={onClose} className="r-hit self-start flex items-center gap-3 r-eyebrow" data-testid="nav-drawer-close">
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-[12px]">✕</span>
            Close
          </button>
          <nav aria-label="Main" className="flex flex-col">
            {MENU.map((m) => (
              <div key={m.label} className="border-b border-[rgba(30,57,43,0.15)]">
                {m.children ? (
                  <>
                    <button type="button" onClick={() => setExpanded(expanded === m.label ? null : m.label)} aria-expanded={expanded === m.label} className="w-full flex items-center justify-between py-3 r-title text-[22px] text-left">
                      {m.label}
                      <Chevron open={expanded === m.label} />
                    </button>
                    {expanded === m.label && (
                      <ul className="pb-4 flex flex-col gap-2">
                        <li><Link to={m.to} onClick={onClose} className="r-body text-[15px] hover:opacity-60">All {m.label.toLowerCase()}</Link></li>
                        {m.children.map((c) => (
                          <li key={c.label}><Link to={c.to} onClick={onClose} className="r-body text-[15px] hover:opacity-60">{c.label}</Link></li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : m.href ? (
                  <a href={m.href} className="block py-3 r-title text-[22px]">{m.label}</a>
                ) : (
                  <Link to={m.to} onClick={onClose} className="block py-3 r-title text-[22px]">{m.label}</Link>
                )}
              </div>
            ))}
          </nav>
          <form role="search" data-testid="nav-drawer-search-form" onSubmit={(e) => { e.preventDefault(); onSearch(String(new FormData(e.currentTarget).get("q") || "")); }} className="flex items-center gap-3 border-b border-[var(--r-green)]">
            <input name="q" type="search" placeholder="Courses, destinations, trips" aria-label="Search the site" data-testid="nav-drawer-search-input" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-[var(--r-green)] outline-none placeholder:text-[var(--r-ink-soft)]" />
            <button type="submit" data-testid="nav-drawer-search" className="r-hit r-eyebrow">Search</button>
          </form>
          <a href={START_PLANNING_URL} data-track="landing_explore" data-track-id="start-planning-nav-drawer" data-testid="nav-drawer-cta" className="r-btn self-start">Begin Planning</a>
        </div>
      </aside>
    </>
  );
};

const Nav = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const close = useCallback(() => setOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);

  const overFilm = isHome && !scrolled;

  return (
    <>
      <header
        data-testid="site-nav"
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${overFilm ? "bg-transparent text-white" : "bg-[var(--r-cream)] text-[var(--r-green)]"}`}
      >
        <div className="px-5 md:px-10 h-[64px] md:h-[76px] grid grid-cols-[1fr_auto_1fr] items-center">
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} data-testid="nav-mobile-toggle" className="r-hit justify-self-start flex items-center gap-3 r-eyebrow">
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block w-5 h-px bg-current" />
              <span className="block w-5 h-px bg-current" />
            </span>
            Menu
          </button>
          <Link to="/" data-testid="nav-logo" aria-label="GOLF° IN MEXICO° home" className="r-hit justify-self-center">
            <Wordmark dark={overFilm} />
          </Link>
          <div className="justify-self-end flex items-center gap-5">
            <button type="button" onClick={() => (setSearchQ(""), setSearchOpen(true))} data-testid="nav-search" className="r-hit hidden md:inline r-eyebrow">Search</button>
            <a
              href={START_PLANNING_URL}
              data-track="landing_explore"
              data-track-id="start-planning-nav"
              data-testid="nav-concierge-cta"
              className={`hidden sm:inline-flex ${overFilm ? "r-btn r-btn-light" : "r-btn"}`}
            >
              Begin Planning
            </a>
          </div>
        </div>
      </header>
      <Drawer open={open} onClose={close} onSearch={(q) => (close(), setSearchQ(q), setSearchOpen(true))} />
      <SiteSearch open={searchOpen} onClose={closeSearch} initialQuery={searchQ} />
    </>
  );
};

export default Nav;
