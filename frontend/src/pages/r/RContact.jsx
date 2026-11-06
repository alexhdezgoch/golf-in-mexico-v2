import { useEffect } from "react";
import { useSeo, breadcrumbSchema, SITE_URL } from "@/hooks/useSeo";
import { CONCIERGE_CALL_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/data/siteNav";
import { trackEvent } from "@/lib/analytics";
import { TitleBlock } from "@/components/reverie/R";

/* The call is booked on the page: Calendly inline, in the page's colours. A booked time is the conversion, so it is
   sent as book_call_click (source contact_booked), the same event the site's call buttons send. */
const CALENDAR_SRC = `${CONCIERGE_CALL_URL}?${new URLSearchParams({ embed_domain: "golf-in-mexico.com", embed_type: "Inline", hide_gdpr_banner: "1", background_color: "fbf9f3", text_color: "3d392c", primary_color: "1e392b" })}`;

const Calendar = () => {
  // The same markup on the server (prerender) and on the first client render, so the page hydrates cleanly.
  useEffect(() => {
    const booked = (e) => {
      if (typeof e.origin === "string" && e.origin.endsWith("calendly.com") && e.data?.event === "calendly.event_scheduled") trackEvent("book_call_click", { source: "contact_booked" });
    };
    window.addEventListener("message", booked);
    return () => window.removeEventListener("message", booked);
  }, []);
  return (
    <div className="mx-auto max-w-[1000px] bg-white border-[10px] border-[#e8e4d6] min-h-[700px]">
      <iframe title="Book a call with Pablo De La Mora" src={CALENDAR_SRC} className="w-full h-[760px] md:h-[700px] border-0" loading="lazy" />
    </div>
  );
};

/* Contact in the Reverie system: production copy ("Let's talk golf.", the email and call cards), the four channels. */

const RContact = () => {
  useSeo({
    title: "Contact Us: Plan Your Mexico Golf Trip | GOLF° IN MEXICO°",
    description: "Write to hello@golf-in-mexico.com or book a call with Pablo to plan your golf trip to Mexico: the courses, the stay and the dates, built around your pace.",
    canonical: "/contact",
    jsonLd: [
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
      // The same organization as the site-wide schema (useSeo orgSchema), by its @id (2026-11-04).
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact GOLF° IN MEXICO°",
        url: `${SITE_URL}/contact`,
        mainEntity: { "@id": `${SITE_URL}/#org` },
      },
    ],
  });
  return (
    <main data-testid="page-contact" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <TitleBlock eyebrow="Contact" title="Let's talk golf.">
        <p className="r-body text-[15px] max-w-[560px]">Drop us a line or book a 15-minute call. We answer every message ourselves — no assistants, no help desk.</p>
      </TitleBlock>

      <section data-testid="contact-calendar" className="px-5 md:px-10 pb-[100px]">
        <Calendar />
      </section>

      <section data-testid="contact-channels" className="bg-[var(--r-green)] text-[var(--r-cream)] px-5 md:px-10 py-[90px]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center gap-5">
          <h2 className="r-title text-[24px] md:text-[28px]">Write us an email.</h2>
          <p className="r-body text-[14px] max-w-[520px] opacity-90">For collaborations, story ideas, course recommendations, or anything else worth a thoughtful reply.</p>
          <dl className="mt-8 w-full grid gap-8 sm:grid-cols-3">
            {[
              ["Email", EMAIL, `mailto:${EMAIL}`, "contact_email"],
              ["Phone", PHONE_DISPLAY, `tel:${PHONE_TEL}`, "contact_phone"],
              ["WhatsApp", PHONE_DISPLAY, WHATSAPP_URL, "whatsapp"],
            ].map(([k, v, href, track]) => (
              <div key={k} className="flex flex-col gap-2 border-t border-[rgba(251,249,243,0.25)] pt-5">
                <dt className="r-eyebrow opacity-75">{k}</dt>
                <dd><a href={href} data-track={track} data-track-id="contact" target={k === "WhatsApp" ? "_blank" : undefined} rel="noopener noreferrer" className="r-link">{v}</a></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
};

export default RContact;
