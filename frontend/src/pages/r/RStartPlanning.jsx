import { useEffect } from "react";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";
import { CONCIERGE_CALL_URL, EMAIL, WHATSAPP_URL } from "@/data/siteNav";
import { trackEvent } from "@/lib/analytics";
import { TitleBlock } from "@/components/reverie/R";

/* /start-planning (2026-11-04): the ads funnel. Option A, the one we recommend, is a 15-minute call booked right here
   (Calendly inline, the user's embed settings in the site's colours); option B is the trip builder, for golfers still
   exploring. Set like the Contact page. Out of the sitemap and noindex, so it never competes with /contact. */
const CALENDAR_SRC = `${CONCIERGE_CALL_URL}?${new URLSearchParams({
  embed_domain: "golf-in-mexico.com",
  embed_type: "Inline",
  hide_event_type_details: "1",
  hide_gdpr_banner: "1",
  background_color: "fbf9f3",
  text_color: "3d392c",
  primary_color: "1e392b",
})}`;

/* Relationship first (the user, 2026-11-05): trust in our judgment and process, transparent quotes, a relationship for life.
   Brief, said by Pablo, to the golfer (not to a group). */
const QUOTE = "No two trips are alike, so we don’t send copy-paste quotes. In a short call we get to know you and the trip you have in mind, and you see how we work: our judgment, our process and every number, with nothing hidden. That is where the relationship starts.";

const Calendar = () => {
  // A booked time is the conversion: the same event the site's call buttons send, with this page as its source.
  useEffect(() => {
    const booked = (e) => {
      if (typeof e.origin === "string" && e.origin.endsWith("calendly.com") && e.data?.event === "calendly.event_scheduled") trackEvent("book_call_click", { source: "start_planning_booked" });
    };
    window.addEventListener("message", booked);
    return () => window.removeEventListener("message", booked);
  }, []);
  return (
    <div className="mx-auto max-w-[1000px] bg-white border-[10px] border-[#e8e4d6] min-h-[700px]">
      <iframe title="Book a 15-minute call with Pablo De La Mora" src={CALENDAR_SRC} className="w-full h-[760px] md:h-[700px] border-0" loading="lazy" />
    </div>
  );
};

const RStartPlanning = () => {
  useSeo({
    title: "Start Planning Your Mexico Golf Trip | GOLF° IN MEXICO°",
    description: "Every trip starts with a conversation: book 10 to 15 minutes with Pablo. Still exploring? Build your trip in the trip builder and get your best match.",
    canonical: "/start-planning",
    noindex: true,
    jsonLd: [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Start planning", path: "/start-planning" }])],
  });

  return (
    <main data-testid="page-start-planning" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <TitleBlock eyebrow="Plan your golf trip" title="Every trip starts with a conversation.">
        <p className="r-body text-[15px] max-w-[560px]">Book 10 to 15 minutes with Pablo at a time that suits you.</p>
      </TitleBlock>

      <section data-testid="start-planning-call" className="px-5 md:px-10 pb-[100px]">
        <figure data-testid="start-planning-quote" className="mx-auto max-w-[760px] mb-8 md:mb-14 flex flex-col items-center text-center gap-4 md:gap-5">
          <blockquote className="r-title normal-case text-[17px] md:text-[23px] leading-[1.4] text-[var(--r-green)]">“{QUOTE}”</blockquote>
          <figcaption className="r-eyebrow text-[var(--r-ink-soft)]">Pablo De La Mora · Founder of GOLF° IN MEXICO°, golf agent</figcaption>
        </figure>
        <Calendar />
      </section>

      <section data-testid="start-planning-explore" className="bg-[var(--r-green)] text-[var(--r-cream)] px-5 md:px-10 py-[90px]">
        <div className="max-w-[640px] mx-auto flex flex-col items-center text-center gap-5">
          <h2 className="r-title text-[24px] md:text-[28px]">Still exploring?</h2>
          <p className="r-body text-[14px] opacity-90">Build your trip in the trip builder. When you finish, you get your best match from the more than 40 trips we’ve curated.</p>
          <a href="/trip-builder" data-track="trip_builder_click" data-track-id="start-planning" className="r-btn r-btn-light mt-2">Open the trip builder</a>
          <p className="r-body text-[14px] opacity-90 mt-2">
            Prefer to write?{" "}
            <a href={`mailto:${EMAIL}`} data-track="contact_email" data-track-id="start-planning" className="r-link">{EMAIL}</a>
            {" · "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-track-id="start-planning" className="r-link">WhatsApp</a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RStartPlanning;
