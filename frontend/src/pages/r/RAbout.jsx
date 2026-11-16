import { useSeo, orgSchema } from "@/hooks/useSeo";
import { PhotoHero, Split, SoftenedCall, Concierge } from "@/components/reverie/R";
import { useLang, altLinks } from "@/i18n";

/* About, set like reveriesafaris.com/about (2026-11-03): one picture, a left-set intro, large pictures between short
   sections (values, how it works), one quote on its own, the founders' notes beside their portraits, partners, the call.
   Every word is the published About page and team bios (src/pages/About.jsx, src/components/TeamEditorial.jsx); the one
   change is the approved one: GIM Concierge shown as optional, without its price. */

const VALUES = [
  ["Precision", "In every itinerary.", "Our standards were forged on professional tours. From the first tee time to the final ride home, every course, hotel, and transfer is vetted, sequenced, and confirmed in writing — the same rigor expected by the world's best players, applied to your trip."],
  ["Destination Intelligence", "Boots on the ground.", "We scout Mexico’s golf regions in person and keep a network on the ground: caddies, course directors, head pros and resort operators. That is how we skip the tourist noise and open tee times, suites and introductions you won’t find on a booking platform."],
  ["Relationship First", "Trust, for life.", "We want you to trust our judgment and our process. Every quote is transparent, with no hidden amounts, and every trip is built to start a relationship that lasts well beyond one round."],
];

// The booking process in the user's words (2026-11-06): contact, a 10-minute call, the proposal in 36 hours, the trip run with perks.
const STEPS = [
  ["Tell us about your trip", "Send us a message, an email or a WhatsApp, or start in the trip builder."],
  ["A 10-minute call", "A short face-to-face call is the best way to personalize your trip: who is going, how you like to play and what matters most."],
  ["Your proposal in 36 hours", "Pablo sends a written proposal with the stay, the courses and the final price."],
  ["We run the trip, with perks you won't get booking direct", "Hotels are booked through Fora, with perks like breakfast or resort credit; private villas through our national and local partners. One contact from the first tee time until you are home."],
];

const PABLO = [
  "Over the past 5 years, my career has taken me inside the player-only areas of the PGA Tour, LIV Golf, and WTA events. But this isn't just a locker room conversation. Listen to almost any post-round interview, and the players will tell you the exact same thing: the people driving Mexican hospitality are exceptional.",
  "Now, add to the equation dozens of signature-designer golf courses, each shaped by its region's unique landscape. No other country in the world offers this exact blend.",
  "That is why I founded GOLF° IN MEXICO°. I want to give you the exact experience I've enjoyed for the past 5 years. No generic itineraries or opaque pricing. Just honest opinions, genuine hidden gems, professional delivery, and the keys to bespoke experiences you simply won't find online.",
];
const JOSE = [
  "The game found me at four. It took me through junior ranks, amateur fields, and professional tours — across twenty countries.",
  "I've teed it up on the PGA Tour at Vidanta and Los Cabos, competed at TPC Sawgrass for the AJGA, and played two World Amateur Team Championships in France and Qatar, the Junior World Cup in Japan, as well as two US Amateurs at Oakmont Country Club and Cherry Hills. I've walked dozens of the world's most demanding fairways.",
  "But after all of that global exposure, the journey taught me one thing with absolute certainty: in Mexico, the game is played differently. After traveling the world, this was the only place that felt like arriving somewhere real.",
  "For a true golfer, our country is not just a stop on the itinerary. It is the destination itself. I'm here to show you exactly why.",
];

/* The page in Spanish (user, 2026-11-16): the same words, in Spanish. */
const ES = {
  values: [
    ["Precisión", "", "Nuestros estándares se forjaron en los tours profesionales. Desde el primer tee time hasta el último traslado a casa, cada campo, hotel y traslado se revisa, se ordena y se confirma por escrito: el mismo rigor que esperan los mejores jugadores del mundo, aplicado a tu viaje."],
    ["Conocimiento del destino", "", "Recorremos en persona las regiones de golf de México y tenemos una red en el terreno: caddies, directores de campo, head pros y operadores de resorts. Así evitamos el ruido turístico y abrimos tee times, suites y contactos que no vas a encontrar en una plataforma de reservas."],
    ["La relación primero", "", "Queremos que confíes en nuestro criterio y en nuestro proceso. Cada cotización es transparente, sin montos escondidos, y cada viaje está hecho para empezar una relación que dure mucho más que una ronda."],
  ],
  steps: [
    ["Cuéntanos de tu viaje", "Mándanos un mensaje, un correo o un WhatsApp, o empieza en el trip builder."],
    ["Una llamada de 10 minutos", "Una llamada corta, cara a cara, es la mejor forma de personalizar tu viaje: quién va, cómo les gusta jugar y qué es lo más importante."],
    ["Tu propuesta en 36 horas", "Pablo te manda una propuesta por escrito con la estancia, los campos y el precio final."],
    ["Operamos el viaje, con beneficios que no consigues reservando directo", "Los hoteles se reservan a través de Fora, con beneficios como desayuno o crédito en el resort; las villas privadas, con nuestros socios nacionales y locales. Un solo contacto desde el primer tee time hasta que llegas a casa."],
  ],
  pablo: [
    "En los últimos 5 años, mi carrera me ha llevado a las áreas exclusivas para jugadores del PGA Tour, LIV Golf y eventos de la WTA. Pero esto no es solo plática de vestidor. Escucha casi cualquier entrevista después de una ronda y los jugadores te van a decir exactamente lo mismo: la gente detrás de la hospitalidad mexicana es excepcional.",
    "Ahora súmale decenas de campos de diseñadores de firma, cada uno moldeado por el paisaje único de su región. Ningún otro país del mundo ofrece esta misma mezcla.",
    "Por eso fundé GOLF° IN MEXICO°. Quiero darte exactamente la experiencia que he disfrutado estos 5 años. Sin itinerarios genéricos ni precios opacos. Solo opiniones honestas, joyas escondidas de verdad, una ejecución profesional y las llaves de experiencias a la medida que simplemente no vas a encontrar en internet.",
  ],
  jose: [
    "El juego me encontró a los cuatro años. Me llevó por las categorías juveniles, los torneos amateur y los tours profesionales, en veinte países.",
    "He jugado en el PGA Tour en Vidanta y Los Cabos, compití en TPC Sawgrass con la AJGA y jugué dos World Amateur Team Championships en Francia y Qatar, la Junior World Cup en Japón y dos US Amateurs en Oakmont Country Club y Cherry Hills. He caminado decenas de los fairways más exigentes del mundo.",
    "Pero después de toda esa experiencia global, el camino me enseñó una cosa con total certeza: en México, el juego se juega distinto. Después de recorrer el mundo, este fue el único lugar que se sintió como llegar a algo real.",
    "Para un golfista de verdad, nuestro país no es solo una parada en el itinerario. Es el destino en sí. Estoy aquí para mostrarte exactamente por qué.",
  ],
};

/* A large picture inside the page margins (Reverie's about page). */
const Picture = ({ src, alt = "", position = "center" }) => (
  <div className="px-5 md:px-10">
    <img src={src} alt={alt} loading="lazy" className="w-full aspect-[3/2] md:aspect-[16/9] object-cover" style={{ objectPosition: position }} />
  </div>
);

/* A short section of text, left-set, the page's reading measure. */
const Text = ({ id, title, children }) => (
  <section data-testid={id} className="px-5 md:px-10 py-[100px] md:py-[130px]">
    <div className="max-w-[760px] md:ml-[12%] flex flex-col gap-6">
      <h2 className="r-title text-[26px] md:text-[32px] text-[var(--r-green)]">{title}</h2>
      {children}
    </div>
  </section>
);

const RAbout = () => {
  const es = useLang() === "es";
  const values = es ? ES.values : VALUES;
  const steps = es ? ES.steps : STEPS;
  useSeo({
    title: es ? "Nosotros: Pablo De La Mora y José Islas | GOLF° IN MEXICO°" : "About Us: Pablo De La Mora & José Islas | GOLF° IN MEXICO°",
    description: es
      ? "Pablo De La Mora, agente deportivo dentro de eventos del PGA Tour, LIV Golf, LPGA y WTA, y José Islas, golfista profesional con cuatro victorias en el Tour mexicano, dirigen GOLF° IN MEXICO°."
      : "Pablo De La Mora, a sports agent inside PGA Tour, LIV Golf, LPGA and WTA events, and José Islas, a pro golfer with four Mexican Tour wins, run GOLF° IN MEXICO°.",
    canonical: es ? "/es/about" : "/about",
    alternates: altLinks("/about"),
    jsonLd: [
      orgSchema(),
      { "@context": "https://schema.org", "@type": "AboutPage", name: "About GOLF° IN MEXICO°", url: "https://golf-in-mexico.com/about", about: { "@type": "Organization", name: "GOLF° IN MEXICO°", url: "https://golf-in-mexico.com" } },
    ],
  });

  return (
    <main data-testid="page-about" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image="/images/nsvdb584-golfinmexico-014.webp" alt="Pablo De La Mora and José Islas at Amanali" />

      <section className="px-5 md:px-10 pt-[100px] md:pt-[130px] pb-[90px] md:pb-[120px]">
        <div className="max-w-[700px] md:ml-[12%] flex flex-col gap-5">
          <span className="r-eyebrow text-[var(--r-ink-soft)]">{es ? "Sobre GOLF° IN MEXICO°" : "About GOLF° IN MEXICO°"}</span>
          <h1 className="r-title text-[30px] md:text-[42px] text-[var(--r-green)]">{es ? "Hecho por la gente que está dentro de las cuerdas." : "Built by the people inside the ropes."}</h1>
          <p className="r-body text-[15px]">
            {es
              ? "GOLF° IN MEXICO° nace de Pablo De La Mora y José Islas: un agente deportivo y un golfista profesional que juntos tienen las relaciones, el acceso y la voz editorial que convierten un viaje de golf a México en algo distinto a lo que armaría una oficina de turismo."
              : "GOLF° IN MEXICO° comes from Pablo De La Mora and José Islas — a sport agent and a professional golfer who together hold the relationships, the access, and the editorial voice that turn a Mexico golf trip into something different from what a tourism board would build."}
          </p>
        </div>
      </section>

      <Picture src="/founders/pablo/02.jpg" alt={es ? "Un tee de salida en un evento del PGA TOUR" : "A tee box at a PGA TOUR event"} position="center 60%" />

      <Text id="about-pillars" title={es ? "Nuestros valores." : "Our values."}>
        {values.map(([t, , body]) => (
          <p key={t} className="r-body text-[15px]"><span className="font-semibold text-[var(--r-green)]">{t}.</span> {body}</p>
        ))}
      </Text>

      <Picture src="/images/d3b1vfc5-gim-stills-36.webp" alt={es ? "Un fairway en Los Cabos" : "A fairway in Los Cabos"} />

      <Text id="about-how-it-works" title={es ? "Cómo funciona reservar con nosotros." : "How booking with us works."}>
        {steps.map(([t, d]) => (
          <p key={t} className="r-body text-[15px]"><span className="font-semibold text-[var(--r-green)]">{t}.</span> {d}</p>
        ))}
        <Concierge id="about-how-it-works" className="r-btn self-start mt-2" />
      </Text>

      <section data-testid="about-quote" className="px-6 py-[100px] md:py-[130px] bg-[var(--r-cream-2)]">
        <figure className="max-w-[820px] mx-auto flex flex-col items-center text-center gap-6">
          <blockquote className="text-[22px] md:text-[28px] leading-[1.4] font-light text-[var(--r-green)]">
            {es
              ? "“Millones de personas planean unas vacaciones de golf cada año. Pero no vas a encontrar un destino que iguale la calidad y el valor que ofrece México.”"
              : "“Millions of people plan a golf vacation every year. But you will not find a destination that matches the quality and value that Mexico offers.”"}
          </blockquote>
          <figcaption className="r-eyebrow text-[var(--r-ink-soft)]">Pablo De La Mora</figcaption>
        </figure>
      </section>

      <Split id="about-pablo" image="/pablo.jpg" alt="Pablo De La Mora" position="center 18%" flip>
        <span className="r-eyebrow text-[var(--r-ink-soft)]">{es ? "El Agente" : "The Agent"}</span>
        <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">Pablo De La Mora</h2>
        {(es ? ES.pablo : PABLO).map((p) => <p key={p.slice(0, 24)} className="r-body">{p}</p>)}
      </Split>

      <Split id="about-jose" image="/jose.jpg" alt="José Islas" position="58% 35%">
        <span className="r-eyebrow text-[var(--r-ink-soft)]">{es ? "El Jugador" : "The Player"}</span>
        <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">José Islas</h2>
        {(es ? ES.jose : JOSE).map((p) => <p key={p.slice(0, 24)} className="r-body">{p}</p>)}
      </Split>

      <SoftenedCall id="about-contact" titleAs="h2" image="/images/xzs0k4px-jose-photo1.webp" title={es ? "¿Quieres colaborar, compartir una historia o solo platicar de golf?" : "Want to collaborate, share a story, or just talk golf?"}>
        <p className="r-body text-[14px]">{es ? "Siempre estamos buscando nuevos campos que cubrir, gente a quien entrevistar e historias que valga la pena contar." : "We're always looking for new courses to cover, people to interview, and stories worth telling."}</p>
        <a href="mailto:hello@golf-in-mexico.com" data-testid="about-contact-cta" data-track="contact_email" data-track-id="about" className="r-btn r-btn-light mt-2">{es ? "Escríbenos" : "Connect with us"}</a>
      </SoftenedCall>
    </main>
  );
};

export default RAbout;
