import { useState } from "react";
import { Link } from "react-router-dom";
import { trackLead } from "@/lib/analytics";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import ConsentNotice from "@/components/ConsentNotice";
import siteCourses from "@/data/siteCourses.json";
import { DESTINATIONS, TRIP_LINKS, COMPANY_LINKS, CONCIERGE_CALL_URL, START_PLANNING_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/data/siteNav";

/* The one footer, in the Reverie system: deep green, four link columns and the guide sign-up, trusted partners, the name set
   across the full width, then the legal block. Its twin in the trip builder app (components/site/SiteFooter.tsx) still has the previous layout. */

const LEGAL_LINKS = [
  { label: "Privacy", to: "/privacy", testId: "footer-link-privacy" },
  { label: "Aviso de Privacidad", to: "/aviso-de-privacidad", testId: "footer-link-privacy-es", lang: "es" },
  { label: "Terms", href: "/terms", testId: "footer-terms" },
  { label: "Photo credits", href: "/photo-credits", testId: "footer-photo-credits" },
];

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

const LABEL = "r-eyebrow text-[rgba(251,249,243,0.70)]";
const LINK = "r-body text-[14px] text-[var(--r-cream)] hover:opacity-65 transition-opacity duration-200";
const MICRO = "text-[12px] text-[rgba(251,249,243,0.55)] hover:text-[var(--r-cream)] transition-colors duration-200";

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
    <footer data-testid="site-footer" className="relative z-10 bg-[var(--r-green)] text-[var(--r-cream)]">
      <div className="px-5 md:px-10 pt-16 md:pt-20">
        <nav aria-label="Footer" data-testid="footer-grid" className="grid gap-12 grid-cols-2 lg:grid-cols-5">
          <div data-testid="footer-col-nav" className="flex flex-col gap-4">
            <span className={LABEL}>GOLF° IN MEXICO°</span>
            <ul className="flex flex-col gap-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}><NavItem l={l} className={LINK} testId={`footer-link-${l.label.toLowerCase()}`} /></li>
              ))}
              <li><a href="/trip-builder" data-testid="footer-plan-trip" className={LINK}>Plan my trip</a></li>
            </ul>
          </div>
          <div data-testid="footer-col-destinations" className="flex flex-col gap-4">
            <span className={LABEL}>Destinations</span>
            <ul className="flex flex-col gap-2">
              {DESTINATIONS.map((d) => (
                <li key={d.label}><NavItem l={d} className={LINK} /></li>
              ))}
            </ul>
          </div>
          <div data-testid="footer-col-trips" className="flex flex-col gap-4">
            <span className={LABEL}>Curated Trips</span>
            <ul className="flex flex-col gap-2">
              {TRIP_LINKS.map((e) => (
                <li key={e.label}><NavItem l={e} className={LINK} /></li>
              ))}
            </ul>
          </div>
          <div data-testid="footer-col-contact" className="flex flex-col gap-4">
            <span className={LABEL}>Talk to us</span>
            <ul className="flex flex-col gap-2">
              <li><a href={START_PLANNING_URL} className={LINK} data-track="landing_explore" data-track-id="start-planning-footer" data-testid="footer-planner-link">Book with Golf Concierge</a></li>
              <li><a href={`mailto:${EMAIL}`} className={LINK} data-track="contact_email" data-track-id="footer">{EMAIL}</a></li>
              <li><a href={`tel:${PHONE_TEL}`} className={LINK} data-track="contact_phone" data-track-id="footer">{PHONE_DISPLAY}</a></li>
              <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK} data-track="whatsapp" data-track-id="footer">WhatsApp</a></li>
              {SOCIALS.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" data-testid={`footer-social-${s.label.toLowerCase()}`} className={LINK}>{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div data-testid="footer-guide" className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <span className={LABEL}>The Mexico golf guide</span>
            {!submitted ? (
              <form data-testid="newsletter-form" onSubmit={onSubmit} className="flex flex-col gap-3">
                <input {...honeypotProps} name="company_website" />
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <div className="flex border-b border-[rgba(251,249,243,0.50)] focus-within:border-[var(--r-cream)]">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    data-testid="newsletter-email-input"
                    className="flex-1 min-w-0 bg-transparent py-2 text-[14px] font-light placeholder:text-[rgba(251,249,243,0.55)] focus:outline-none"
                  />
                  <button type="submit" disabled={submitting} data-testid="newsletter-submit-button" className="r-eyebrow disabled:opacity-60">
                    {submitting ? "…" : "Send"}
                  </button>
                </div>
                {error && <span role="alert" className="text-[13px] text-red-300">{error}</span>}
                <ConsentNotice tone="dark" testid="consent-notice-footer" className="mt-1" />
              </form>
            ) : (
              <p data-testid="newsletter-success" role="status" className="r-body">On its way. Welcome to the room.</p>
            )}
          </div>
        </nav>

        <div data-testid="footer-partners" className="mt-16 pt-12 border-t border-[rgba(251,249,243,0.15)] flex flex-col items-center gap-8">
          <span className={LABEL}>Trusted partners</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8" aria-label="Trusted partners">
            {siteCourses.partners.map((p) => (
              <li key={p.name}>
                <a href={p.href} target="_blank" rel="noopener" aria-label={`${p.name}: ${p.role}`} title={p.role} className="block opacity-75 hover:opacity-100 transition-opacity duration-300">
                  <img src={p.logo} alt={p.name} loading="lazy" className={p.round ? "h-10 w-10 rounded-full grayscale" : "h-7 w-auto max-w-[8rem] object-contain brightness-0 invert"} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img src="/logo-wordmark.png" alt="" aria-hidden="true" width="1280" height="200" className="mt-16 w-full h-auto opacity-[0.12] select-none" />

        <div className="py-8 flex flex-col items-center gap-4 text-center">
          <p data-testid="footer-role" className="max-w-[110ch] font-light text-[12px] leading-[1.7] text-[rgba(251,249,243,0.55)]">
            GOLF° IN MEXICO° works with licensed partners for hotels, villas, golf and transfers. Hotel stays are arranged through our travel partner {FORA.name}, of which we are an independent advisor ({FORA.registrations}). Villas, tee times and transfers are booked with the companies that operate them. Each is paid directly to that partner; we charge only for planning. Prices are estimates in USD, taxes included; your written proposal confirms the final price. Course names and tournaments belong to their owners, who do not endorse us.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.label}><NavItem l={l} className={MICRO} testId={l.testId} /></li>
            ))}
            <li>
              <button type="button" className={MICRO} onClick={() => window.dispatchEvent(new Event("gim-cookie-settings"))} data-testid="footer-cookie-settings">
                Cookie settings
              </button>
            </li>
          </ul>
          <span data-testid="footer-copyright" className="text-[12px] text-[rgba(251,249,243,0.45)]">
            © {year} GOLF° IN MEXICO°, operated by {COMPANY}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
