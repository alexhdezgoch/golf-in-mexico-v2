import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteSearch from "@/components/SiteSearch";
import { DESTINATIONS, CONCIERGE_CALL_URL, START_PLANNING_URL } from "@/data/siteNav";
import { useLang, localize, basePath, esPath, rememberLang, placeLabel } from "@/i18n";

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
  { label: "Home", es: "Inicio", to: "/" },
  { label: "Destinations", es: "Destinos", to: "/destinations", children: DESTINATIONS },
  { label: "Courses", es: "Campos", href: "/courses" },
  { label: "Curated Trips", es: "Viajes curados", to: "/trips" },
  { label: "Journal", es: "Journal", to: "/journal" },
  { label: "Gallery", es: "Galería", to: "/gallery" },
  { label: "About", es: "Nosotros", to: "/about" },
  { label: "Contact", es: "Contacto", to: "/contact" },
];

/* Interface words in both languages (user, 2026-11-16). */
const UI = {
  en: { menu: "Menu", close: "Close", all: "All", search: "Search", searchPh: "Courses, destinations, trips", searchLabel: "Search the site", cta: "Begin Planning", home: "GOLF° IN MEXICO° home", language: "Language" },
  es: { menu: "Menú", close: "Cerrar", all: "Todos los", search: "Buscar", searchPh: "Campos, destinos, viajes", searchLabel: "Buscar en el sitio", cta: "Empieza a planear", home: "Inicio de GOLF° IN MEXICO°", language: "Idioma" },
};

/* English / Español, in the menu (user, 2026-11-16). Each goes to the same page in the other language when it exists,
   otherwise to that language's home; the choice is remembered so the automatic switch never overrides it. */
const LangSwitch = ({ lang, onClose }) => {
  const { pathname } = useLocation();
  const base = basePath(pathname);
  const targets = { en: base, es: esPath(base) || "/es" };
  return (
    <div data-testid="nav-lang" className="flex flex-col gap-3">
      <span className="r-eyebrow text-[var(--r-ink-soft)]">{UI[lang].language}</span>
      <div className="flex items-center gap-5">
        {[["en", "English"], ["es", "Español"]].map(([code, name]) =>
          code === lang ? (
            <span key={code} aria-current="true" lang={code} className="r-title text-[18px] underline underline-offset-[6px] decoration-1">{name}</span>
          ) : (
            <Link key={code} to={targets[code]} lang={code} hrefLang={code} data-testid={`nav-lang-${code}`} onClick={() => (rememberLang(code), onClose())} className="r-title text-[18px] opacity-55 hover:opacity-100 transition-opacity">{name}</Link>
          )
        )}
      </div>
    </div>
  );
};

const Drawer = ({ open, onClose, onSearch }) => {
  const lang = useLang();
  const t = UI[lang];
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
        aria-label={t.menu}
        data-testid="nav-drawer"
        data-lenis-prevent
        className={`fixed left-0 top-0 bottom-0 z-[120] w-full max-w-[400px] bg-[var(--r-cream)] text-[var(--r-green)] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-7 pt-6 pb-12 flex flex-col gap-8">
          <button type="button" onClick={onClose} className="r-hit self-start flex items-center gap-3 r-eyebrow" data-testid="nav-drawer-close">
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-[12px]">✕</span>
            {t.close}
          </button>
          <nav aria-label="Main" className="flex flex-col">
            {MENU.map((m) => { const label = lang === "es" ? m.es : m.label; return (
              <div key={m.label} className="border-b border-[rgba(30,57,43,0.15)]">
                {m.children ? (
                  <>
                    <button type="button" onClick={() => setExpanded(expanded === m.label ? null : m.label)} aria-expanded={expanded === m.label} className="w-full flex items-center justify-between py-3 r-title text-[22px] text-left">
                      {label}
                      <Chevron open={expanded === m.label} />
                    </button>
                    {expanded === m.label && (
                      <ul className="pb-4 flex flex-col gap-2">
                        <li><Link to={m.to} onClick={onClose} className="r-body text-[15px] hover:opacity-60">{t.all} {label.toLowerCase()}</Link></li>
                        {m.children.map((c) => (
                          <li key={c.label}><Link to={localize(c.to, lang)} onClick={onClose} className="r-body text-[15px] hover:opacity-60">{placeLabel(c.label, lang)}</Link></li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : m.href ? (
                  <a href={m.href} className="block py-3 r-title text-[22px]">{label}</a>
                ) : (
                  <Link to={localize(m.to, lang)} onClick={onClose} className="block py-3 r-title text-[22px]">{label}</Link>
                )}
              </div>
            ); })}
          </nav>
          <form role="search" data-testid="nav-drawer-search-form" onSubmit={(e) => { e.preventDefault(); onSearch(String(new FormData(e.currentTarget).get("q") || "")); }} className="flex items-center gap-3 border-b border-[var(--r-green)]">
            <input name="q" type="search" placeholder={t.searchPh} aria-label={t.searchLabel} data-testid="nav-drawer-search-input" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-[var(--r-green)] outline-none placeholder:text-[var(--r-ink-soft)]" />
            <button type="submit" data-testid="nav-drawer-search" className="r-hit r-eyebrow">{t.search}</button>
          </form>
          <a href={localize(START_PLANNING_URL, lang)} data-track="landing_explore" data-track-id="start-planning-nav-drawer" data-testid="nav-drawer-cta" className="r-btn self-start">{t.cta}</a>
          <LangSwitch lang={lang} onClose={onClose} />
        </div>
      </aside>
    </>
  );
};

const Nav = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/es";
  const lang = useLang();
  const t = UI[lang];
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
            {t.menu}
          </button>
          <Link to={localize("/", lang)} data-testid="nav-logo" aria-label={t.home} className="r-hit justify-self-center">
            <Wordmark dark={overFilm} />
          </Link>
          <div className="justify-self-end flex items-center gap-5">
            <button type="button" onClick={() => (setSearchQ(""), setSearchOpen(true))} aria-label={t.search} data-testid="nav-search-mobile" className="r-hit md:hidden flex items-center justify-center w-10 h-10 -mr-2">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
            </button>
            <button type="button" onClick={() => (setSearchQ(""), setSearchOpen(true))} data-testid="nav-search" className="r-hit hidden md:inline r-eyebrow">{t.search}</button>
            <a
              href={localize(START_PLANNING_URL, lang)}
              data-track="landing_explore"
              data-track-id="start-planning-nav"
              data-testid="nav-concierge-cta"
              className={`hidden sm:inline-flex ${overFilm ? "r-btn r-btn-light" : "r-btn"}`}
            >
              {t.cta}
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
