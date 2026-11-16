import { useState } from "react";
import { useSeo, breadcrumbSchema, articleSchema, faqSchema } from "@/hooks/useSeo";
import { GuideVoices, voicesSchema } from "@/components/reverie/GuideVoices";
import siteCourses from "@/data/siteCourses.json";
import tripsEn from "@/data/rtrips.json";
import tripsEsRaw from "@/data/es/rtrips.json";
import GUIDE_ES_RAW from "@/data/es/guide-los-cabos.json";
import { useLang, altLinks, localize, tripTypeLabel, esData, toMXN, MXN_NOTE } from "@/i18n";

const tripsEs = esData(tripsEsRaw);
const GUIDE_ES = esData(GUIDE_ES_RAW);
import { ARTICLES } from "@/data/articles";
import { CABO } from "@/data/rcabo";
import { GUIDE } from "@/data/rcaboGuide";
import { TOURNAMENTS, TOURNAMENTS_ES, noGD } from "@/data/rtournaments";
import { GUIDE_AUTHORS } from "@/data/authors";
import { trackLead } from "@/lib/analytics";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { FORM_KEYS } from "@/config/hubspot";
import ConsentNotice from "@/components/ConsentNotice";
import { GuideOverview, GuideCosts, GuideLogistics } from "@/components/reverie/GuideDepth";
import { PhotoHero, TitleBlock, SectionIntro, CardRail, Card, Split, SoftenedCall, Board, Sources, Concierge } from "@/components/reverie/R";

/* Los Cabos guide, short version (rediseno-sitio/proof-seo-los-cabos.md, 2026-11-03). The guide owns "golf in Cabo /
   which courses / which is best / which can I play" (~13,000 searches a month). Course names, course prices and the
   long course notes belong to each course page; packages and trip budgets to the golf-packages landing and /trips.
   So: one line per course with a link, no course name as a heading, no "packages" or "trip" in headings.
   Every sentence comes from the published guide (rcaboGuide.js, corrected 2026-11-03) or the verified months. */

const course = (slug) => siteCourses.courses.find((c) => c.slug === slug);
const byName = (n) => GUIDE.courses.find((c) => c.name === n);
const STATUS = { best: "First choice", good: "Transition", storm: "Hurricane season" };
const faq = (start) => GUIDE.faqs.find(([q]) => q.startsWith(start));

const ANSWER = "Los Cabos has 18 active championship golf courses — with 5 more under construction — along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Green fees range from $260 to $700 USD per round depending on course and season, with October through May delivering peak conditions.";

const CAN_PLAY = [
  ["Open to visitors", ["Solmar Golf Links", "Cabo del Sol Course", "Puerto Los Cabos", "Club Campestre San José", "Cabo Real", "Oleada Golf Links"], "Oleada: subject to outside-player availability."],
  ["Hotel guests", ["Quivira", "Twin Dolphin", "Chileno Bay", "Diamante Dunes", "El Cardonal", "Palmilla"], "Quivira: Pueblo Bonito Oceanfront. Twin Dolphin: Montage Los Cabos. Chileno Bay: Auberge Chileno Bay. Diamante: guests and members. Palmilla: One&Only guests, on the Arroyo nine during the 2026 renovation."],
  ["Members only", ["Cove Club", "El Dorado"], "Members and member-sponsored guests."],
];

const BEST = noGD(faq("Which is the best course")[1]);
const ACCESS = "Private access here works on two routes: stay at the right hotel, or know the right member. The fastest way in is to book the matching resort.";

const FAQS = [
  ["Which golf courses in Los Cabos can I play?", `${ACCESS} Open to visitors: Solmar, Cabo del Sol Course, Puerto Los Cabos, Club Campestre, Cabo Real and Oleada (subject to availability). Hotel guests: Quivira, Twin Dolphin, Chileno Bay, Diamante Dunes, El Cardonal and Palmilla, where One&Only guests play the Arroyo nine during the 2026 renovation. Members only: Cove Club and El Dorado.`],
  ["Which is the best course in Los Cabos?", BEST],
  faq("What is the best time"),
  ["How much does a round of golf cost near luxury resorts in Los Cabos?", "Green fees range from $260 at Cabo Real and Club Campestre San José to $700 at Twin Dolphin, caddie included. Quivira publishes $360–$465 from October to May and $306–$395 from June to September, with cart, practice facility and food included. Green fees as of 2026, confirmed in writing before you book."],
  faq("How do I get access"),
  faq("Do I need to bring"),
  ["How do I get to the golf courses?", GUIDE.logistics[1][1]],
  faq("Do I need to tip"),
  faq("Is it safe"),
  // Guide-level questions production ranked with, back on 2026-11-05 (course-specific ones stay on the course pages).
  faq("Are the courses walkable"),
  [faq("Why do so many golfers choose")[0], noGD(faq("Why do so many golfers choose")[1]).replace(/^Four of Mexico's top 10 courses\. /, "")],
  [faq("What are the best golf courses in Cabo San Lucas")[0], noGD(faq("What are the best golf courses in Cabo San Lucas")[1])],
  ["How much does a golf trip to Los Cabos cost?", "The main variables are hotel choice and course selection. Green fees range from $260 at Cabo Real and Club Campestre San José to $700 at Twin Dolphin, caddie included. Green fees as of 2026, confirmed in writing before you book.", { href: "/destinations/los-cabos/golf-packages", label: "Los Cabos golf packages" }],
];

// The production guide's overview, what moves the price and Getting there (2026-11-05), from rcaboGuide.js.
const OVERVIEW = { label: "The corridor", pre: "Los Cabos golf —", em: "what you need to understand first.", paragraphs: GUIDE.overview.map((p) => noGD(p)) };
const COSTS = { label: "The math", pre: "In Los Cabos,", em: "the base camp sets the price.", callouts: [["The luxury variable", GUIDE.luxury], ["The twilight advantage", GUIDE.twilight]] };
const LOGISTICS = { label: "On the ground", pre: "Getting there", em: "and between courses.", items: GUIDE.logistics };

/* The guide in Spanish (user, 2026-11-16): the same sentences, in Spanish. The guide data comes from src/data/es. */
const STATUS_ES = { best: "Primera opción", good: "Transición", storm: "Temporada de huracanes" };
const MONTHS_ES = [
  ["Ene", "Ventana de invierno de primera opción; la oficina de turismo describe diciembre–febrero como agradablemente fresco."],
  ["Feb", "Ventana de invierno de primera opción; lleva una capa extra para las horas más frescas."],
  ["Mar", "Ventana de primavera de primera opción; la guía oficial describe condiciones más cálidas que en invierno."],
  ["Abr", "Ventana de primavera de primera opción."],
  ["May", "Transición más calurosa; la temporada de huracanes del Pacífico oriental empieza el 15 de mayo."],
  ["Jun", "Planeación de temporada calurosa; mantén flexibilidad por clima y cancelaciones."],
  ["Jul", "Dentro de la temporada oficial de huracanes del Pacífico oriental."],
  ["Ago", "Dentro de la temporada de huracanes."],
  ["Sep", "Dentro de la temporada de huracanes; los arreglos flexibles siguen siendo importantes."],
  ["Oct", "La guía de turismo describe temperaturas más suaves, pero la temporada de huracanes continúa."],
  ["Nov", "Transición; la temporada de huracanes continúa hasta el 30 de noviembre."],
  ["Dic", "Ventana de invierno de primera opción, fuera de las fechas oficiales de la temporada de huracanes."],
];
const ANSWER_ES_USD = "Los Cabos tiene 18 campos de campeonato en operación, y 5 más en construcción, a lo largo de un tramo espectacular de 20 millas donde el desierto de Sonora se encuentra con el Mar de Cortés. Los green fees van de $260 a $700 USD por ronda según el campo y la temporada, y de octubre a mayo las condiciones están en su mejor momento.";
const ANSWER_ES = toMXN(ANSWER_ES_USD);
const ACCESS_ES = "El acceso privado aquí funciona por dos caminos: hospedarte en el hotel correcto o conocer al socio correcto. La forma más rápida de entrar es reservar el resort que le corresponde.";
const CAN_PLAY_ES = [
  ["Abiertos al público", CAN_PLAY[0][1], "Oleada: sujeto a disponibilidad para jugadores externos."],
  ["Huéspedes de hotel", CAN_PLAY[1][1], "Quivira: Pueblo Bonito Oceanfront. Twin Dolphin: Montage Los Cabos. Chileno Bay: Auberge Chileno Bay. Diamante: huéspedes y socios. Palmilla: huéspedes de One&Only, en el nueve Arroyo durante la renovación de 2026."],
  ["Solo socios", CAN_PLAY[2][1], "Socios e invitados de socios."],
];

const Newsletter = ({ id, es }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { submit, submitting, error, honeypotProps } = useHubspotForm(FORM_KEYS.hub_playbook);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(await submit({ email, region: "los-cabos" }))) return;
    setSent(true);
    trackLead({ form: FORM_KEYS.hub_playbook, placement: id, region: "los-cabos" });
  };
  return (
    <section data-testid={id} className="px-5 md:px-10 py-[70px] bg-[var(--r-cream-2)]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-[520px] flex flex-col gap-3">
          <p className="r-title text-[20px] md:text-[22px] text-[var(--r-green)]">{es ? "Entérate de lo nuevo del golf en Cabo." : "Stay in the loop on Cabo golf."}</p>
          <p className="r-body text-[14px]">{(es ? GUIDE_ES : GUIDE).newsletter}</p>
        </div>
        <div className="flex flex-col gap-3 md:w-[420px]">
          {sent ? (
            <p className="r-title text-[16px] text-[var(--r-green)]">{es ? "Ya estás en la lista." : "You're on the list."}</p>
          ) : (
            <form onSubmit={onSubmit} className="flex gap-2">
              <input {...honeypotProps} name="company_website" />
              <label htmlFor={`${id}-email`} className="sr-only">{es ? "Correo" : "Email"}</label>
              <input id={`${id}-email`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={es ? "tu@correo.com" : "your@email.com"} className="flex-1 min-w-0 bg-white border border-[rgba(30,57,43,0.25)] focus:border-[var(--r-green)] px-4 py-3 text-[14px] outline-none" />
              <button type="submit" disabled={submitting} className="r-btn disabled:opacity-60">{submitting ? "…" : es ? "Quiero recibirlo" : "Keep me in the loop"}</button>
            </form>
          )}
          {error && !sent && <p className="text-[12px] text-[#a3352b]">{error}</p>}
          {!sent && <ConsentNotice tone="light" testid={`${id}-consent`} className="max-w-sm" />}
        </div>
      </div>
    </section>
  );
};

/* The Spanish questions, built from the Spanish guide by the position of each English question. */
const faqEs = (start) => GUIDE_ES.faqs[GUIDE.faqs.findIndex(([q]) => q.startsWith(start))];
const BEST_ES = noGD(faqEs("Which is the best course")[1]);
const FAQS_ES_USD = [
  ["¿Qué campos de golf puedo jugar en Los Cabos?", `${ACCESS_ES} Abiertos al público: Solmar, Cabo del Sol Course, Puerto Los Cabos, Club Campestre, Cabo Real y Oleada (sujeto a disponibilidad). Huéspedes de hotel: Quivira, Twin Dolphin, Chileno Bay, Diamante Dunes, El Cardonal y Palmilla, donde los huéspedes de One&Only juegan el nueve Arroyo durante la renovación de 2026. Solo socios: Cove Club y El Dorado.`],
  ["¿Cuál es el mejor campo de Los Cabos?", BEST_ES],
  faqEs("What is the best time"),
  ["¿Cuánto cuesta una ronda de golf cerca de los resorts de lujo en Los Cabos?", "Los green fees van de $260 en Cabo Real y Club Campestre San José a $700 en Twin Dolphin, con caddie incluido. Quivira publica $360–$465 de octubre a mayo y $306–$395 de junio a septiembre, con carrito, área de práctica y comida incluidos. Green fees de 2026, confirmados por escrito antes de reservar."],
  faqEs("How do I get access"),
  faqEs("Do I need to bring"),
  ["¿Cómo llego a los campos de golf?", GUIDE_ES.logistics[1][1]],
  faqEs("Do I need to tip"),
  faqEs("Is it safe"),
  faqEs("Are the courses walkable"),
  [faqEs("Why do so many golfers choose")[0], noGD(faqEs("Why do so many golfers choose")[1]).replace(/^[^.]*\b10\b[^.]*México\.\s/, "")],
  [faqEs("What are the best golf courses in Cabo San Lucas")[0], noGD(faqEs("What are the best golf courses in Cabo San Lucas")[1])],
  ["¿Cuánto cuesta un viaje de golf a Los Cabos?", "Las variables principales son el hotel y los campos que elijas. Los green fees van de $260 en Cabo Real y Club Campestre San José a $700 en Twin Dolphin, con caddie incluido. Green fees de 2026, confirmados por escrito antes de reservar.", { href: "/destinations/los-cabos/golf-packages", label: "Paquetes de golf en Los Cabos" }],
];
const FAQS_ES = FAQS_ES_USD.map(([q, a, more]) => [q, toMXN(a), more].filter(Boolean));

const RGuideLosCabos = () => {
  const lang = useLang();
  const es = lang === "es";
  const L = (p) => localize(p, lang);
  const G = es ? GUIDE_ES : GUIDE;
  const T = es ? TOURNAMENTS_ES : TOURNAMENTS;
  const trips = es ? tripsEs : tripsEn;
  const faqs = es ? FAQS_ES : FAQS;
  const best = es ? BEST_ES : BEST;
  const canPlay = es ? CAN_PLAY_ES : CAN_PLAY;
  const overview = es ? { label: "El corredor", pre: "Golf en Los Cabos:", em: "lo que necesitas entender primero.", paragraphs: GUIDE_ES.overview.map((p) => noGD(p)) } : OVERVIEW;
  const costs = es ? { label: "Los números", pre: "En Los Cabos,", em: "el hotel base define el precio.", callouts: [["La variable del lujo", GUIDE_ES.luxury], ["La ventaja del twilight", GUIDE_ES.twilight]] } : COSTS;
  const logistics = es ? { label: "En el terreno", pre: "Cómo llegar", em: "y moverte entre campos.", items: GUIDE_ES.logistics } : LOGISTICS;
  useSeo({
    title: es ? "Campos de golf en Cabo San Lucas | Diamante, Quivira y Cabo del Sol" : "Cabo San Lucas Golf Courses | Diamante, Quivira & Cabo del Sol",
    description: es
      ? "El Cardonal de Tiger Woods y las dunas de Diamante, Nicklaus en los acantilados de Quivira: 18 campos en Los Cabos, y cuáles están abiertos al público o piden ser huésped."
      : "Tiger Woods's El Cardonal and the dunes at Diamante, Nicklaus on the cliffs at Quivira: 18 Los Cabos courses, and which open to visitors or need a room key.",
    canonical: L("/destinations/los-cabos"),
    alternates: altLinks("/destinations/los-cabos"),
    image: "/og/guide-los-cabos.jpg",
    jsonLd: [
      articleSchema({
        headline: es ? "Campos de golf en Cabo San Lucas: precios y acceso" : "Cabo San Lucas Golf Courses: Prices & Access",
        description: es ? ANSWER_ES : ANSWER,
        path: L("/destinations/los-cabos"),
        image: "/images/los-cabos/hero-dunes-fairway.webp",
        authors: GUIDE_AUTHORS,
        datePublished: "2026-05-01",
        dateModified: "2026-11-03",
      }),
      breadcrumbSchema([{ name: es ? "Inicio" : "Home", path: L("/") }, { name: es ? "Destinos" : "Destinations", path: L("/destinations") }, { name: "Los Cabos", path: L("/destinations/los-cabos") }]),
      faqSchema(faqs.map(([q, a]) => ({ q, a }))),
      ...voicesSchema("los-cabos"),
    ],
  });
  const caboTrips = trips.filter((t) => t.destination === "Los Cabos");
  const bachelor = ARTICLES.find((a) => a.slug === "the-bachelor-trip-cabo");
  const linked = GUIDE.courses.filter((c) => c.slug && course(c.slug));
  const link = (name) => {
    const c = byName(name);
    const s = c?.slug && course(c.slug);
    return s ? <a href={s.href} className="underline underline-offset-2 hover:opacity-70">{name}</a> : name;
  };

  return (
    <main data-testid="page-guide" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image="/images/w5pux6b7-golfinmexico-156.webp" alt={es ? "Golfistas en un fairway entre dunas en Los Cabos" : "Golfers on a dune-lined fairway in Los Cabos"} />

      {/* 1 · The answer, in two sentences, with three facts */}
      <TitleBlock eyebrow={es ? "Guía de destino · Los Cabos" : "Destination guide · Los Cabos"} title={es ? "Golf en Los Cabos" : "Golf in Los Cabos"} facts={es ? [["Campos", "18 en operación · 5 en construcción"], ["Green fees", toMXN("$260 – $700 por ronda")], ["Mejores meses", "Octubre – mayo"]] : [["Courses", "18 active · 5 under construction"], ["Green fees", "$260 – $700 per round"], ["Best months", "October – May"]]}>
        <p className="r-body text-[16px] max-w-[700px]">{es ? ANSWER_ES : ANSWER}</p>
        <p className="text-[12px] text-[var(--r-ink-soft)]">{G.byline} · {es ? "Actualizado" : "Updated"} {G.updated}</p>
      </TitleBlock>

      {/* 1b · The agent and the player (2026-11-05) */}
      <GuideVoices slug="los-cabos" />

      {/* 2 · The courses: one line each, every name linked to its own page */}
      <section id="courses" data-testid="guide-courses" className="pb-[100px] scroll-mt-24">
        <SectionIntro title={es ? "Campos de golf en Los Cabos: green fees y acceso" : "Los Cabos golf courses, green fees and access"} />
        <div className="mt-[50px]">
          <Board
            caption={es ? "Campos de golf en Los Cabos: diseño, quién puede jugar, green fee y torneos profesionales" : "Los Cabos golf courses: design, who can play, green fee and professional tournaments hosted"}
            head={es ? ["Campo", "Diseño", "Quién puede jugar", "Green fee", "Sede de tour"] : ["Course", "Design", "Who can play", "Green fee", "Tour venue"]}
            rows={G.courses.map((c) => [link(c.name), c.design, c.access, c.fee, T[c.slug] ? (es ? "Sí" : "Yes") : "—"])}
            wide
          />
          <p className="r-body text-[12px] text-center text-[var(--r-ink-soft)] mt-5 px-6">{es ? `${G.feesNote} ${MXN_NOTE}` : G.feesNote}</p>
        </div>
        <div className="mt-[70px]">
          <CardRail label={es ? "Campos de Los Cabos" : "Los Cabos course pages"}>
            {linked.map((c) => {
              const s = course(c.slug);
              const design = (G.courses.find((x) => x.slug === c.slug) || c).design;
              return <Card titleAs="span" key={c.slug} href={s.href} image={s.photo?.src} credit={s.photo?.credit} eyebrow={design} title={c.name} cta={es ? "Ver campo" : "View course"} />;
            })}
          </CardRail>
        </div>
      </section>

      {/* 3 · Which can I play? (the Reddit and "cabo public golf courses" question) */}
      <section data-testid="guide-access" className="py-[100px] bg-[var(--r-cream-2)] px-5 md:px-10">
        <SectionIntro title={es ? "¿Qué campos puedo jugar?" : "Which courses can I play?"}>{es ? ACCESS_ES : ACCESS}</SectionIntro>
        <div className="mt-[50px] mx-auto max-w-[1100px] grid gap-10 md:grid-cols-3">
          {canPlay.map(([k, names, note]) => (
            <div key={k} className="flex flex-col gap-3 border-t-2 border-[var(--r-green)] pt-5">
              <h3 className="r-title text-[16px] text-[var(--r-green)]">{k}</h3>
              <ul className="flex flex-col gap-1.5 r-body text-[15px] text-[var(--r-green)]">
                {names.map((n) => <li key={n}>{link(n)}</li>)}
              </ul>
              <p className="r-body text-[13px] text-[var(--r-ink-soft)]">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <GuideOverview {...overview} />
      <GuideCosts {...costs} link={<a href="/destinations/los-cabos/golf-packages" className="r-link self-start text-[var(--r-green)]">{es ? "Paquetes de golf en Los Cabos" : "Los Cabos golf packages"}</a>} />

      {/* 4 · Which is the best? */}
      <Split id="guide-best" image="/images/d3b1vfc5-gim-stills-36.webp" alt={es ? "Un green frente al mar en Los Cabos" : "An oceanfront green in Los Cabos"} flip>
        <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">{es ? "¿Cuál es el mejor campo de Los Cabos?" : "Which is the best course in Los Cabos?"}</h2>
        <p className="r-body">{best}</p>
        <div className="flex flex-col gap-3 border-t border-[rgba(30,57,43,0.2)] pt-4">
          <h3 className="r-title text-[15px] text-[var(--r-green)]">{es ? "¿Qué campos han sido sede de torneos profesionales?" : "Which courses have hosted professional tournaments?"}</h3>
          {GUIDE.courses.filter((c) => T[c.slug]).map((c) => (
            <p key={c.slug} className="r-body text-[14px]"><span className="font-semibold text-[var(--r-green)]">{link(c.name)}</span> — {T[c.slug]}</p>
          ))}
        </div>
      </Split>

      {/* 5 · When to go */}
      <section id="season" data-testid="guide-months" className="py-[100px] scroll-mt-24">
        <SectionIntro title={es ? "Cuándo jugar." : "When to play."}>{es ? faqEs("What is the best time")[1] : faq("What is the best time")[1]}</SectionIntro>
        <div className="mt-[50px] px-5 md:px-10">
          <div className="mx-auto max-w-[1100px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 border-[10px] border-[#e8e4d6] bg-white">
            {CABO.months.map(([m0, s, note0], i) => { const [m, note] = es ? MONTHS_ES[i] : [m0, note0]; return (
              <div key={m} className="border border-[#ddd8c8] p-4 flex flex-col gap-2 min-h-[150px]">
                <span className="r-title text-[15px] text-[var(--r-green)]">{m}</span>
                <span className={`text-[12px] font-semibold uppercase tracking-[0.06em] ${s === "storm" ? "text-[#a3352b]" : "text-[var(--r-green)]"}`}>{(es ? STATUS_ES : STATUS)[s]}</span>
                <span className="r-body text-[12px] leading-snug">{note}</span>
              </div>
            ); })}
          </div>
        </div>
      </section>

      <GuideLogistics {...logistics} />

      {/* 6 · Questions (FAQPage) */}
      <section id="faq" data-testid="guide-faq" className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 py-[90px] md:py-[110px]">
        <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
          <h2 className="r-title text-[26px] md:text-[34px]">{es ? "Tus preguntas, respondidas." : "Your questions, answered."}</h2>
          <div className="w-full mt-6 text-left border-t border-[rgba(251,249,243,0.25)]">
            {faqs.slice(3).map(([q, a, more]) => (
              <details key={q} className="group border-b border-[rgba(251,249,243,0.25)]">
                <summary className="r-hit cursor-pointer list-none flex justify-between gap-6 py-5 r-title text-[14px]">
                  <h3>{q}</h3><span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="r-body text-[15px] pb-5 opacity-90">{a}{more && <> {es ? "Presupuestos completos:" : "Full trip budgets:"} <a href={more.href} className="underline underline-offset-2">{more.label}</a>.</>}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Where to go next: links only, their text lives on their own pages */}
      <section data-testid="guide-next" className="py-[100px]">
        <SectionIntro as="p" title={es ? "Explora viajes" : "Explore trips"} link={<a href={L("/trips")} className="r-link text-[var(--r-green)]">{es ? "Todos los viajes" : "All trips"}</a>} />
        <div className="mt-[60px]">
          <CardRail label={es ? "Viajes en Los Cabos" : "Los Cabos trips"}>
            {caboTrips.map((t) => <Card titleAs="span" key={t.slug} href={L(`/trips/${t.slug}`)} image={t.photo || t.image} credit={t.photo ? t.photoCredit : undefined} eyebrow={tripTypeLabel(t.type, lang)} title={t.title} cta={es ? "Ver viaje" : "View trip"} />)}
            {bachelor && <Card titleAs="span" href={`/journal/${bachelor.slug}`} image={bachelor.heroImage} eyebrow="Journal" title={bachelor.title} cta={es ? "Leer (en inglés)" : "Read more"} />}
          </CardRail>
        </div>
      </section>

      <Newsletter id="guide-loop" es={es} />

      <SoftenedCall id="guide-close" image="/images/mmtjphx0-gim-stills-33.webp" titleAs="p" title={es ? "Planeación gratis hasta que tu viaje de golf quede perfecto." : "Free planning until your golf trip is right."}>
        <p className="r-body text-[14px]">{es ? "Beneficios que no consigues reservando directo. Planeado por un agente de golf y un golfista profesional mexicanos." : "Perks you won't get booking direct. Planned by a golf agent and a pro golfer from Mexico."}</p>
        <Concierge id="guide-close" className="r-btn r-btn-light mt-2" />
      </SoftenedCall>

      <div className="pt-16">
        <Sources items={G.sources} note={es ? "Fuentes web revisadas el 3 de noviembre de 2026. El acceso y las tarifas pueden cambiar." : "Web sources checked on November 3, 2026. Access and rates can change."} />
      </div>
    </main>
  );
};

export default RGuideLosCabos;
