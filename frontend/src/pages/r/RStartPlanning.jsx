import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";
import { CONCIERGE_CALL_URL, EMAIL, WHATSAPP_URL } from "@/data/siteNav";
import { trackEvent } from "@/lib/analytics";
import { TitleBlock } from "@/components/reverie/R";
import { useLang, altLinks } from "@/i18n";

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
const QUOTE_ES = "No hay dos viajes iguales, por eso no mandamos cotizaciones de copiar y pegar. En una llamada corta te conocemos a ti y al viaje que tienes en mente, y ves cómo trabajamos: nuestro criterio, nuestro proceso y cada número, sin nada escondido. Ahí empieza la relación.";
const QUOTE = "No two trips are alike, so we don’t send copy-paste quotes. In a short call we get to know you and the trip you have in mind, and you see how we work: our judgment, our process and every number, with nothing hidden. That is where the relationship starts.";

/* The calendar opens as a pop-up (user, 2026-11-16): loaded only when opened, closed with Esc, the ✕ or a click outside. */
const CalendarDialog = ({ open, onClose, es }) => {
  const closeBtn = useRef(null);
  // A booked time is the conversion: call_scheduled, with this page as its source (the call buttons send book_call_click on click).
  useEffect(() => {
    const booked = (e) => {
      if (typeof e.origin === "string" && e.origin.endsWith("calendly.com") && e.data?.event === "calendly.event_scheduled") trackEvent("call_scheduled", { source: "start_planning_booked" });
    };
    window.addEventListener("message", booked);
    return () => window.removeEventListener("message", booked);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis && window.__lenis.stop();
    closeBtn.current && closeBtn.current.focus();
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = prev;
      window.__lenis && window.__lenis.start();
    };
  }, [open, onClose]);
  if (!open) return null;
  // Mounted on <body>: an ancestor with a transform would otherwise trap the fixed overlay under the header.
  return createPortal(
    <div data-testid="start-planning-calendar" role="dialog" aria-modal="true" aria-label={es ? "Agenda una llamada de 15 minutos con Pablo De La Mora" : "Book a 15-minute call with Pablo De La Mora"} className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(20,24,18,0.6)] p-3 md:p-8" onClick={onClose}>
      <div data-lenis-prevent className="w-full max-w-[1000px] max-h-full flex flex-col bg-[#fbf9f3]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 pl-5 pr-2 h-12 border-b border-[rgba(30,57,43,0.15)] shrink-0">
          <span className="r-eyebrow text-[var(--r-ink-soft)]">{es ? "Llamada de 15 minutos con Pablo" : "15-minute call with Pablo"}</span>
          <button ref={closeBtn} type="button" onClick={onClose} aria-label={es ? "Cerrar" : "Close"} className="w-10 h-10 flex items-center justify-center text-[var(--r-green)] text-[18px]">✕</button>
        </div>
        <iframe title={es ? "Agenda una llamada de 15 minutos con Pablo De La Mora" : "Book a 15-minute call with Pablo De La Mora"} src={CALENDAR_SRC} className="block w-full h-[calc(100svh-24px-48px)] md:h-[min(700px,calc(100vh-64px-48px))] border-0" />
      </div>
    </div>,
    document.body
  );
};

const RStartPlanning = () => {
  const es = useLang() === "es";
  const [cal, setCal] = useState(false);
  const closeCal = useRef(() => setCal(false)).current;
  useSeo({
    title: es ? "Empieza a planear tu viaje de golf a México | GOLF° IN MEXICO°" : "Start Planning Your Mexico Golf Trip | GOLF° IN MEXICO°",
    description: es ? "Dos formas de empezar tu viaje de golf a México: una llamada de 15 minutos con Pablo, o 6 preguntas rápidas en el trip builder para tu mejor opción entre más de 40 viajes curados." : "Two ways to start your Mexico golf trip: a 15-minute call with Pablo, or 6 quick questions in the trip builder for your best match from 40+ curated trips.",
    canonical: es ? "/es/start-planning" : "/start-planning",
    alternates: altLinks("/start-planning"),
    noindex: true,
    jsonLd: [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Start planning", path: "/start-planning" }])],
  });

  return (
    <main data-testid="page-start-planning" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <TitleBlock eyebrow={es ? "Planea tu viaje de golf" : "Plan your golf trip"} title={es ? "Todo viaje empieza con una conversación." : "Every trip starts with a conversation."}>
        <p className="r-body text-[15px] max-w-[560px]">{es ? "Dos formas de empezar." : "Two ways to start."}</p>
      </TitleBlock>

      {/* Redesign (user, 2026-11-16: "más intuitivo y sencillo"): one choice, two large cards, each wholly clickable,
          with a photo, a short title, what happens next and one action. Pablo's quote sits under both. */}
      <section data-testid="start-planning-options" className="px-5 md:px-10 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1100px] grid gap-12 md:grid-cols-2 md:gap-[30px]">
          <button type="button" data-testid="start-planning-option-call" onClick={() => (trackEvent("book_call_click", { source: "start-planning-option" }), setCal(true))} className="group flex flex-col text-left w-full">
            <span className="block overflow-hidden aspect-[4/3] bg-[var(--r-cream-2)]">
              <img src="/founders/pablo/05.jpg" alt={es ? "Pablo De La Mora con dos jugadores en un evento de la USGA" : "Pablo De La Mora with two players at a USGA event"} width="769" height="1024" className="w-full h-full object-cover object-[center_40%] transition-transform duration-[900ms] group-hover:scale-[1.04]" />
            </span>
            <span className="r-title text-[24px] md:text-[28px] text-[var(--r-green)] mt-6">{es ? "Habla con Pablo" : "Talk to Pablo"}</span>
            <span className="r-body text-[15px] mt-2">{es ? "Llamada de 15 minutos · propuesta en 36 horas" : "15-minute call · proposal within 36 hours"}</span>
            <span data-testid="start-planning-open-calendar" className="r-btn self-start mt-5">{es ? "Elige un horario" : "Pick a time"}</span>
          </button>
          <a href="/trip-builder" data-testid="start-planning-option-form" data-track="trip_builder_click" data-track-id="start-planning" className="group flex flex-col text-left w-full">
            <span className="block overflow-hidden aspect-[4/3] bg-[var(--r-cream-2)]">
              <img src="/images/punta-mita/punta-mita-pacifico-island-green-shoreline.webp" alt={es ? "El green en la isla de Pacífico, Punta Mita" : "The island green at Pacífico, Punta Mita"} className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
            </span>
            <span className="r-title text-[24px] md:text-[28px] text-[var(--r-green)] mt-6">{es ? "Ármalo tú mismo" : "Build it yourself"}</span>
            <span className="r-body text-[15px] mt-2">{es ? "6 preguntas rápidas · tu mejor opción entre más de 40 viajes curados" : "6 quick questions · your best match from 40+ curated trips"}</span>
            <span className="r-btn self-start mt-5">{es ? "Armar mi viaje" : "Build my trip"}</span>
          </a>
        </div>
      </section>

      <section data-testid="start-planning-quote" className="px-6 pb-[100px]">
        <figure className="mx-auto max-w-[760px] flex flex-col items-center text-center gap-4 border-t border-[rgba(30,57,43,0.2)] pt-14">
          <blockquote className="r-body font-semibold text-[17px] md:text-[20px] leading-[1.5] text-[var(--r-green)]">“{es ? QUOTE_ES : QUOTE}”</blockquote>
          <figcaption className="r-eyebrow text-[var(--r-ink-soft)]">{es ? "Pablo De La Mora · Fundador de GOLF° IN MEXICO°, agente de golf" : "Pablo De La Mora · Founder of GOLF° IN MEXICO°, golf agent"}</figcaption>
        </figure>
        <p className="mt-12 text-center r-body text-[14px] text-[var(--r-ink-soft)]">
          {es ? "¿Prefieres escribir?" : "Prefer to write?"}{" "}
          <a href={`mailto:${EMAIL}`} data-track="contact_email" data-track-id="start-planning" className="r-link">{EMAIL}</a>
          {" · "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-track-id="start-planning" className="r-link">WhatsApp</a>
        </p>
      </section>
      <CalendarDialog open={cal} onClose={closeCal} es={es} />
    </main>
  );
};

export default RStartPlanning;
