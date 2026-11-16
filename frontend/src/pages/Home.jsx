import { useEffect, useRef, useState } from "react";
import { useSeo, orgSchema, webSiteSchema } from "@/hooks/useSeo";
import { DESTINATIONS, CONCIERGE_CALL_URL, START_PLANNING_URL } from "@/data/siteNav";
import { useLang, localize, altLinks, placeLabel, cdmx } from "@/i18n";

/* The home in Spanish (user, 2026-11-16): the same blocks, the production copy in Spanish. Names of trips, hotels and
   places stay as they are. */
const ES_TRIPS = {
  "mexico-city-four-seasons-golf": { where: "Ciudad de México", stay: "Experiencia de golf en la Ciudad de México", line: "Ciudad, comida y golf en clubes privados en un solo viaje." },
  "los-cabos-nobu": { line: "Cómo jugar el campo #1 y un campo del PGA Tour." },
  "punta-mita-by-golfinmexico": { line: "Villas privadas con servicio completo de resort, de principio a fin." },
  "playa-del-carmen-alila-mayakoba-golf": { line: "Golf de campeonato en la Riviera Maya." },
  "cancun-moon-palace-all-inclusive-golf": { line: "Un paraíso todo incluido." },
  "san-miguel-luxury-hotel-golf": { line: "Ciudad destino #1: golf, vino y arte." },
  "los-cabos-cocobay": { line: "Villas para grupos grandes, con servicio." },
};

/* Home · rediseño 2026 · v7, in the reveriesafaris.com system, cut to six blocks: the film, the claim, the team, trips,
   destinations and the closing call. Every line is production copy, catalog data or the offer the user approved. */

const Concierge = ({ id, className = "r-btn", lang = "en" }) => (
  <a href={localize(START_PLANNING_URL, lang)} data-track="landing_explore" data-track-id={`start-planning-${id}`} className={className}>
    {lang === "es" ? "Agenda con Golf Concierge" : "Book with Golf Concierge"}
  </a>
);

const Monogram = () => (
  <span aria-hidden="true" className="inline-flex w-[58px] h-[58px] rounded-full border border-current items-center justify-center font-semibold text-[20px] leading-none">
    G<span className="text-[var(--g-gold)] text-[14px] -mt-2">°</span>
  </span>
);

const SectionIntro = ({ title, children, link }) => (
  <div className="max-w-[866px] mx-auto px-6 flex flex-col items-center text-center gap-5">
    <h2 className="r-title text-[26px] md:text-[34px] text-[var(--r-green)]">{title}</h2>
    {children && <p className="r-body text-[14px] max-w-[560px]">{children}</p>}
    {link}
  </div>
);

/* A row of 414×561 cards, 30px apart, starting 80px in, with a thin progress line underneath (Reverie's journeys). */
const CardRail = ({ label, children }) => {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const on = () => setP(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    on();
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);
  return (
    <div>
      <div ref={ref} data-lenis-prevent-horizontal role="list" aria-label={label} className="flex gap-[30px] overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scrollbar-hide px-5 md:px-[80px] scroll-px-5 md:scroll-px-[80px]">
        {children}
      </div>
      <div aria-hidden="true" className="mx-auto mt-14 w-[180px] h-[2px] bg-[rgba(30,57,43,0.15)]">
        <div className="h-full bg-[var(--r-green)]" style={{ width: "36%", transform: `translateX(${p * (100 / 0.36 - 100)}%)` }} />
      </div>
    </div>
  );
};

const Card = ({ href, image, eyebrow, title, text, cta, credit }) => (
  <a role="listitem" href={href} className="group snap-start shrink-0 w-[78vw] sm:w-[44vw] lg:w-[414px] flex flex-col">
    <div className="relative aspect-[414/561] overflow-hidden bg-[var(--r-cream-2)]">
      <img src={image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
      {credit && <span className="absolute left-2 bottom-2 text-[10px] text-white/85 bg-black/30 px-1.5 py-0.5">Photo: {credit}</span>}
    </div>
    {eyebrow && <span className="r-eyebrow text-[var(--r-ink-soft)] mt-6">{eyebrow}</span>}
    <span className={`r-title text-[19px] text-[var(--r-green)] ${eyebrow ? "mt-3" : "mt-6"}`}>{title}</span>
    {text && <span className="r-body text-[14px] mt-3">{text}</span>}
    <span className="r-link self-start text-[var(--r-green)] mt-5">{cta}</span>
  </a>
);

/* Text beside a 900×600 picture. With `flip` the picture comes first, on the left and on top on phones. */
const Split = ({ id, image, alt, flip, children }) => {
  const text = <div className="md:w-[425px] md:shrink-0 flex flex-col gap-5">{children}</div>;
  const pic = (
    <div className="md:w-[62.5%]">
      <img src={image} alt={alt} loading="lazy" className="w-full aspect-[3/2] object-cover" />
    </div>
  );
  return (
    <section data-testid={id} className="px-5 md:px-10 py-16 md:py-[100px]">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        {flip ? pic : text}
        {flip ? text : pic}
      </div>
    </section>
  );
};

const FullBleed = ({ image }) => (
  <div aria-hidden="true" className="h-[62vh] md:h-[100vh] max-h-[961px] overflow-hidden">
    <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
  </div>
);

const SoftenedCall = ({ id, image, title, children }) => (
  <section data-testid={id} className="relative overflow-hidden text-[var(--r-cream)]">
    <img src={image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-110 blur-[14px]" />
    <div aria-hidden="true" className="absolute inset-0 bg-[rgba(20,24,18,0.38)]" />
    <div className="relative max-w-[560px] mx-auto px-6 py-28 md:py-[150px] flex flex-col items-center text-center gap-6">
      <Monogram />
      <h2 className="r-title text-[26px] md:text-[34px]">{title}</h2>
      {children}
    </div>
  </section>
);

/* Sample trips from the catalog. Cabo Real is left off the course lines (closed for renovation). */
const TRIPS = [
  // The user's curated list and order, with its titles (2026-11-05). Two lines reworded to claims we can source.
  { slug: "mexico-city-four-seasons-golf", where: "Mexico City", stay: "Mexico City Golf Experience", line: "City, food and private-club golf in one trip.", image: "/media/stays/four-seasons-mexico-city/01.jpg", credit: "Four Seasons Hotel Mexico City" },
  { slug: "los-cabos-nobu", where: "Los Cabos", stay: "Nobu", line: "How to play the #1 course & a PGA Tour course.", image: "/media/stays/nobu-hotel-los-cabos/trip-card.jpg", credit: "Nobu Hotel Los Cabos" },
  { slug: "punta-mita-by-golfinmexico", where: "Punta Mita", stay: "Punta Mita Rentals", line: "Private villas with full resort service, end to end.", image: "/media/stays/punta-mita-rentals/01.jpg", credit: "Punta Mita Rentals" },
  { slug: "playa-del-carmen-alila-mayakoba-golf", where: "Riviera Maya", stay: "Mayakoba", line: "Championship golf in the Riviera Maya.", image: "/media/stays/alila-mayakoba/01.jpg", credit: "Alila Mayakoba" },
  { slug: "cancun-moon-palace-all-inclusive-golf", where: "Cancún", stay: "The Grand Moon Palace", line: "All-inclusive paradise.", image: "/media/stays/moon-palace-the-grand/01.jpg", credit: "Moon Palace The Grand – Cancun" },
  { slug: "san-miguel-luxury-hotel-golf", where: "San Miguel de Allende", stay: "San Miguel", line: "#1 destination city, golf, wine and art.", image: "/media/stays/rosewood-san-miguel-de-allende/trip-card.jpg", credit: "Rosewood San Miguel de Allende" },
  { slug: "los-cabos-cocobay", where: "Los Cabos", stay: "Los Cabos Cocobay", line: "Large group villas with service.", image: "/media/stays/cocobay-villa/08.jpg", credit: "Cocobay" },
];

const Home = () => {
  const lang = useLang();
  const es = lang === "es";
  useSeo({
    title: es ? "Viajes de golf curados y las mejores experiencias en México | GOLF° IN MEXICO°" : "Curated Golf Trips & Top Experiences in Mexico | GOLF° IN MEXICO°",
    description: es
      ? "Los mejores campos y experiencias de México, curados en persona por un agente de golf y un golfista profesional mexicanos, con el mejor valor para cada grupo."
      : "Mexico's top courses and experiences, curated firsthand by a golf agent and a pro golfer from Mexico, with the best value for every group.",
    canonical: es ? "/es" : "/",
    alternates: altLinks("/"),
    image: "/og/home.jpg",
    jsonLd: [orgSchema(), webSiteSchema()],
  });
  const film = useRef(null);
  useEffect(() => {
    const v = film.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);
  
  return (
    <main data-testid="page-home" className="relative bg-[var(--r-cream)] text-[var(--r-ink)]">
      {/* 1 · The film, alone */}
      <section data-testid="hero-section" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[var(--r-green)]">
        <video ref={film} data-testid="hero-video" className="absolute inset-0 w-full h-full object-cover" poster="/images/cover-poster.webp" autoPlay muted loop playsInline preload="auto">
          {/* COVER SILENT LAUNCH (user, 2026-11-12): 1080p on desktop, 720p on phones; the 4K master would be ~35 MB. */}
          <source src="/video/cover-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/video/cover-720.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 2 · The claim, on the green band (production home copy) */}
      <section data-testid="home-intro" className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 pt-[120px] md:pt-[148px] pb-[100px] md:pb-[120px]">
        <div className="max-w-[700px] mx-auto flex flex-col items-center text-center gap-6">
          {/* What it is, then the use case in gold; the service, then who plans it; one clear action (user, 2026-11-04). */}
          <h1 data-testid="hero-wordmark" className="r-title text-[28px] md:text-[38px] leading-[1.15]">
            {es ? "Curamos las mejores experiencias de golf" : "Curating the best golf experiences"}<br />
            <span className="text-[var(--g-gold)]">{es ? "en México." : "in Mexico."}</span>
          </h1>
          <p className="r-body text-[14px] max-w-[600px] opacity-90">
            {es
              ? "Viajes de golf a la medida de cualquier tipo de viaje, diseñados alrededor de los mejores campos y experiencias de México. Un agente de golf y un golfista profesional mexicanos, con el mejor valor para cada grupo."
              : "Golf trips personalized for any kind of trip, designed around Mexico's top courses and experiences. A golf agent and a pro golfer from Mexico, with the best value for every group."}
          </p>
          <a href="/trip-builder" data-track="trip_builder_click" data-track-id="home-intro" className="r-btn r-btn-light mt-3">{es ? "Planea mi viaje" : "Plan my trip"}</a>
        </div>
      </section>

      {/* 3 · Destinations (production /destinations title), right under the claim (user, 2026-11-04) */}
      <section data-testid="home-destinations" className="py-[100px] md:py-[120px]">
        <SectionIntro title={es ? "Destinos de golf en México." : "Golf destinations in Mexico."} link={<a href={localize("/destinations", lang)} className="r-link text-[var(--r-green)]">{es ? "Destinos" : "Destinations"}</a>} />
        <div className="mt-[60px]">
          <CardRail label="Destinations">
            {DESTINATIONS.map((d) => (
              <Card key={d.to} href={localize(d.to, lang)} image={d.image} title={placeLabel(d.label, lang)} text={d.region} cta={placeLabel(d.label.split(" ·")[0], lang)} />
            ))}
          </CardRail>
        </div>
      </section>

      {/* 3 · The team (production home copy): picture left, text right */}
      <Split id="home-team" image="/images/nsvdb584-golfinmexico-014.webp" alt="Pablo De La Mora and José Islas at Amanali" flip>
        <span className="r-eyebrow text-[var(--r-ink-soft)] flex flex-col gap-1.5">
          <span>{es ? "Pablo De La Mora · El Agente" : "Pablo De La Mora · The Agent"}</span>
          <span>{es ? "José Islas · El Jugador" : "José Islas · The Player"}</span>
        </span>
        <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">{es ? "Un agente y un pro de tour detrás de cada itinerario." : "An agent and a tour pro behind every itinerary."}</h2>
        <p className="r-body">{es
          ? "Lo que empezó dentro de los tours profesionales y los grandes campos del mundo se convirtió en un puente hacia las mejores experiencias de golf de México. Hoy juntamos años de conocimiento del golf para llevarte a los mejores campos, a joyas escondidas y a la hospitalidad por la que México es conocido."
          : "What began inside professional tours and global fairways has grown into a bridge to Mexico's finest golf experiences. Today, we combine years of golf insights to bring you the top courses, hidden gems and the hospitality this country is known for."}</p>
        <a href={localize("/about", lang)} className="r-link self-start text-[var(--r-green)] mt-2">{es ? "Nosotros" : "About"}</a>
      </Split>

      {/* The photo the user picked before the production-photo pass (user, 2026-11-05) */}
      <FullBleed image="/images/punta-mita/punta-mita-sunset-fairway-palms.webp" />

      {/* 4 · Trips from the catalog */}
      <section data-testid="home-trips" className="py-[100px] md:py-[120px]">
        <SectionIntro title={es ? "Explora viajes" : "Explore trips"} link={<a href="/trip-builder" className="r-link text-[var(--r-green)]">{es ? "Planea mi viaje" : "Plan my trip"}</a>} />
        <div className="mt-[60px]">
          <CardRail label="Trips">
            {TRIPS.map((t0) => { const t = es ? { ...t0, credit: cdmx(t0.credit), ...ES_TRIPS[t0.slug] } : t0; return (
              <Card key={t.slug} href={`/your-trip/${t.slug}?s=1`} image={t.image} credit={t.credit} eyebrow={t.where} title={t.stay} text={t.line} cta={es ? "Ver viaje" : "View trip"} />
            ); })}
          </CardRail>
        </div>
      </section>

      {/* 6 · Closing call: the offer the user approved (option B) */}
      <SoftenedCall id="home-close" image="/images/mmtjphx0-gim-stills-33.webp" title={es ? "Planeación gratis hasta que tu viaje de golf quede perfecto." : "Free planning until your golf trip is right."}>
        <p className="r-body text-[14px]">{es ? "Beneficios que no consigues reservando directo. Planeado por un agente de golf y un golfista profesional mexicanos." : "Perks you won't get booking direct. Planned by a golf agent and a pro golfer from Mexico."}</p>
        <Concierge id="home-close" className="r-btn r-btn-light mt-2" lang={lang} />
      </SoftenedCall>
    </main>
  );
};

export default Home;
