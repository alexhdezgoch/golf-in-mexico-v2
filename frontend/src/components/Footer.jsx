import { useState } from "react";
import { Link } from "react-router-dom";
import { trackLead } from "@/lib/analytics";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import ConsentNotice from "@/components/ConsentNotice";
import siteCourses from "@/data/siteCourses.json";

/* The one footer of golf-in-mexico.com, kept compact. Its twin in the trip builder app (components/site/SiteFooter.tsx)
   renders the same markup on the pages that app serves, so it never changes as a visitor moves between them. Course lists
   and partners come from src/data/siteCourses.json, exported from the trip builder. */

const DESTINATIONS = [
  { label: "Los Cabos", to: "/destinations/los-cabos" },
  { label: "Punta Mita", to: "/destinations/punta-mita" },
  { label: "Mexico City", to: "/destinations/mexico-city" },
  { label: "Puerto Vallarta", to: "/destinations/puerto-vallarta" },
  { label: "Cancun · Riviera Maya", to: "/destinations/cancun-riviera-maya" },
  { label: "Unique Destinations", to: "/destinations/unique-destinations" },
];

// `href` = served by the trip builder app (a full page load); `to` = a page of this app.
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy", to: "/privacy", testId: "footer-link-privacy" },
  { label: "Aviso de Privacidad", to: "/aviso-de-privacidad", testId: "footer-link-privacy-es", lang: "es" },
  { label: "Terms", href: "/terms", testId: "footer-terms" },
  { label: "Photo credits", href: "/photo-credits", testId: "footer-photo-credits" },
];

const PLANNER_CALL_URL = "https://calendly.com/pablo-golf-in-mexico/trip-builder";
const FORA = {
  name: "Fora Travel, Inc.",
  registrations:
    "California Seller of Travel Registration No. 2151995-50, Florida Seller of Travel Registration No. ST43973, Washington UBI No. 605329242, British Columbia CPBC License No. 88694 and Ontario TICO Registration No. 50027942",
};
const COMPANY = "Soluciones Deportivas BKT, S.A.S. de C.V.";

const SOCIALS = [
  { href: "https://www.facebook.com/people/Golf-In-Mexico/61590265455260/", label: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.87v-6.98H8v-2.89h2.4V9.41c0-2.38 1.42-3.69 3.58-3.69 1.04 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.49v1.78h2.63l-.42 2.89H13.4v6.98A10 10 0 0 0 22 12Z" },
  { href: "https://www.instagram.com/golf.inmexico/", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.22-2.04.37-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.32.97-.37 2.04-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.07.22 1.65.37 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.32 2.04.37 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.07-.05 1.65-.22 2.04-.37.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.32-.97.37-2.04.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.07-.22-1.65-.37-2.04a3.41 3.41 0 0 0-.83-1.27 3.41 3.41 0 0 0-1.27-.83c-.39-.15-.97-.32-2.04-.37-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.4a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" },
  { href: "https://www.linkedin.com/company/golfinmexico/", label: "LinkedIn", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05A3.74 3.74 0 0 1 16.2 8.7c3.6 0 4.26 2.37 4.26 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" },
];

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]";
const LINK = "font-body font-light text-[14px] text-white/75 hover:text-[var(--c-gold)] transition-colors duration-300";
const MICRO = "font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 hover:text-[var(--c-gold)] transition-colors duration-300";

const NavItem = ({ l, className, testId }) =>
  l.href ? (
    <a href={l.href} className={className} data-testid={testId} lang={l.lang}>
      {l.label}
    </a>
  ) : (
    <Link to={l.to} className={className} data-testid={testId} lang={l.lang}>
      {l.label}
    </Link>
  );

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { submit, submitting, error, honeypotProps } = useHubspotForm("footer_newsletter");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email.trim().length <= 3) return;
    const ok = await submit({ email });
    if (!ok) return;
    setSubmitted(true);
    trackLead({ form: "footer_newsletter" });
  };

  return (
    <footer data-testid="site-footer" className="relative z-10 bg-[#0a0a0a] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div data-testid="footer-grid" className="grid gap-10 md:grid-cols-12 md:gap-8 py-12 md:py-14 border-b border-white/[0.08]">
          <div data-testid="footer-col-newsletter" className="md:col-span-5 flex flex-col gap-4">
            <img src="/logo-wordmark.png" alt="GOLF° IN MEXICO°" loading="lazy" className="h-7 w-auto self-start" />
            <h2 data-testid="footer-newsletter-headline" className="mt-2 font-display font-normal text-white text-lg leading-[1.2]">
              Stay <em className="italic text-[var(--c-gold)]">inside</em> the ropes.
            </h2>
            {!submitted ? (
              <form data-testid="newsletter-form" onSubmit={onSubmit} className="flex flex-col gap-2 max-w-sm">
                <input {...honeypotProps} name="company_website" />
                <div className="flex">
                  <label htmlFor="newsletter-email" className="sr-only">Email</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    autoComplete="email"
                    data-testid="newsletter-email-input"
                    className="flex-1 min-w-0 bg-white/[0.04] border border-white/15 focus:border-[var(--c-gold)] transition-colors duration-300 text-white placeholder:text-white/35 font-body text-sm px-3.5 py-2.5 rounded-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="newsletter-submit-button"
                    className="group inline-flex items-center justify-center bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-4 ml-2 rounded-sm font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "…" : "Subscribe"}
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </button>
                </div>
                {error && <span role="alert" className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-400">{error}</span>}
                <ConsentNotice tone="dark" testid="consent-notice-footer" className="mt-1" />
              </form>
            ) : (
              <p data-testid="newsletter-success" role="status" className="font-display italic font-normal text-[var(--c-gold)] text-base">
                On its way. Welcome to the room.
              </p>
            )}
            <div className="mt-1 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:bg-[var(--c-gold)] hover:border-[var(--c-gold)] hover:text-[var(--c-green-deep)] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div data-testid="footer-col-destinations" className="flex flex-col gap-3">
              <span className={LABEL}>Destinations</span>
              <ul className="flex flex-col gap-2">
                {DESTINATIONS.map((d) => (
                  <li key={d.label}>
                    <NavItem l={d} className={LINK} testId={`footer-dest-${d.label.toLowerCase().replace(/\s+/g, "-")}`} />
                  </li>
                ))}
              </ul>
            </div>
            <div data-testid="footer-col-nav" className="flex flex-col gap-3">
              <span className={LABEL}>Navigate</span>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <NavItem l={l} className={LINK} testId={`footer-link-${l.label.toLowerCase()}`} />
                  </li>
                ))}
                <li>
                  <a href="/trip-builder" data-testid="footer-plan-trip" className="font-body text-[14px] text-[var(--c-gold)] hover:text-[var(--c-gold-light)] transition-colors duration-300">
                    Explore trips →
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
              <span className={LABEL}>Talk to us</span>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href={PLANNER_CALL_URL} target="_blank" rel="noopener noreferrer" className={LINK} data-track="planner_call" data-track-id="footer" data-testid="footer-planner-link">
                    Book 15 minutes with Pablo
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@golf-in-mexico.com" className={LINK}>hello@golf-in-mexico.com</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div data-testid="footer-courses" className="py-10 border-b border-white/[0.08]">
          <h2 className={`${LABEL} mb-5`}>
            <a href="/courses" className="hover:text-[var(--c-gold-light)]">Courses°</a>
          </h2>
          <div className="grid gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {siteCourses.footer.map((g) => (
              <p key={g.label} className="font-body font-light text-[13px] leading-[1.75] text-white/55">
                <Link to={g.guide} className="mr-1.5 font-display text-[14px] font-normal text-white hover:text-[var(--c-gold)] transition-colors duration-300">
                  {g.label}
                </Link>
                {g.courses.map((c, i) => (
                  <span key={c.href}>
                    {i > 0 && <span aria-hidden="true"> · </span>}
                    <a href={c.href} className="hover:text-[var(--c-gold)] transition-colors duration-300">{c.name}</a>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        <div data-testid="footer-partners" className="py-8 border-b border-white/[0.08]">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4" aria-label="Who we work with">
            {siteCourses.partners.map((p) => (
              <li key={p.name}>
                <a href={p.href} target="_blank" rel="noopener" aria-label={`${p.name}: ${p.role}`} title={p.role} className="block opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <img src={p.logo} alt={p.name} loading="lazy" className={p.round ? "h-9 w-9 rounded-full grayscale" : "h-6 w-auto max-w-[7rem] object-contain brightness-0 invert"} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-7 flex flex-col gap-3">
          <p data-testid="footer-role" className="max-w-[110ch] font-body font-light text-[11px] leading-[1.6] text-white/40">
            GOLF° IN MEXICO° is a golf trip planning service, not a travel agency: we do not sell travel or take payment for it. Hotel stays are booked through {FORA.name}, of which we are an independent advisor, and villas with the
            properties that operate them; each one charges you directly. We charge only for planning. Prices on this site are planning estimates at published rates, taxes included, not offers: your written proposal confirms the
            price. Nothing is paid on this site. Course names, tournaments and rankings belong to their owners and are cited as facts; we are not affiliated with or endorsed by them. {FORA.name} is registered as a seller of travel:{" "}
            {FORA.registrations}.
          </p>
          <div data-testid="footer-copyright" className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              © {year} Golf<span className="text-[var(--c-gold)]">°</span> in Mexico<span className="text-[var(--c-gold)]">°</span>, operated by {COMPANY}
            </span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <NavItem l={l} className={MICRO} testId={l.testId} />
                </li>
              ))}
              <li>
                <button type="button" className={MICRO} onClick={() => window.dispatchEvent(new Event("gim-cookie-settings"))} data-testid="footer-cookie-settings">
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
