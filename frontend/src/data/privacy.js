// Privacy policy content — the single source of truth for /privacy (EN) and
// /aviso-de-privacidad (ES). Both routes render the same component from this
// data, so the two languages cannot drift apart.
//
// WHAT THIS MUST STAY IN SYNC WITH — if any of these change, update this file:
//   - src/lib/analytics.js  → the trackers we load (GA4/GTM, Meta Pixel, Clarity)
//   - src/config/hubspot.js → the live lead forms (HUBSPOT_FORMS)
//   - src/lib/attribution.js → the UTM/click-id params we stash
//   - src/lib/hubspot.js    → the hutk cookie + pageUri context sent with leads
//
// Section shape:
//   { id, heading, body: [paragraph, ...], list?: [{ term, def }] | [string] }

// Last substantive revision of the policy text. Shown to the reader and used as
// the JSON-LD dateModified — bump it whenever the wording below changes.
export const PRIVACY_UPDATED = "2026-07-24";

export const PRIVACY_EMAIL = "hello@golf-in-mexico.com";

// Human-readable date per locale, from PRIVACY_UPDATED (no timezone drift: we
// parse the parts rather than letting Date() reinterpret the string as UTC).
const formatUpdated = (locale) => {
  const [y, m, d] = PRIVACY_UPDATED.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ─────────────────────────────── ENGLISH ───────────────────────────────

const EN = {
  locale: "en",
  path: "/privacy",
  altPath: "/aviso-de-privacidad",
  altLabel: "Leer en español",
  seoTitle: "Privacy Policy — Golf in Mexico°",
  seoDescription:
    "How Golf in Mexico° collects, uses, and protects your personal data: the forms we run, the analytics we load (GA4, Meta Pixel, Microsoft Clarity), cookies, and how to exercise your privacy rights.",
  eyebrow: "Legal",
  title: "Privacy",
  titleEm: "Policy",
  updatedLabel: "Last updated",
  updated: formatUpdated("en"),
  tocLabel: "On this page",
  intro:
    "Golf in Mexico° is an editorial guide and a bespoke trip-planning service. We collect personal data in two places only: the forms you choose to fill in, and the analytics that measure how the site is used. This page explains exactly what is collected, who receives it, how long we keep it, and how to make us delete it.",
  sections: [
    {
      id: "controller",
      heading: "Who is responsible for your data",
      body: [
        "Golf in Mexico° (“Golf in Mexico”, “we”, “us”) is the data controller — the responsable in the sense of Mexico's Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) — for the personal data collected through golf-in-mexico.com.",
        `You can reach us about anything on this page at ${PRIVACY_EMAIL}. We answer privacy requests ourselves; there is no help desk in between.`,
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect, and where",
      body: [
        "Every piece of personal data we hold about you comes from one of the forms below. None of them is required to read the site — you can browse every guide and article without giving us anything.",
      ],
      list: [
        {
          term: "Newsletter signup (site footer, articles, destination guides)",
          def: "Your email address.",
        },
        {
          term: "Trip Builder (/trip-builder)",
          def: "Your name, email address, and phone number, plus the trip details you enter: destinations, trip type, preferred months, trip length, package, and budget range. If you leave the wizard part-way after entering your contact details, we keep what you had entered up to that point.",
        },
        {
          term: "Trip Builder exit capture",
          def: "Your email address and the trip preferences you had selected before leaving.",
        },
        {
          term: "Destination waitlist / guide requests",
          def: "Your email address and the destination or region you asked about.",
        },
        {
          term: "General inquiries",
          def: "Your email address and any details you include.",
        },
      ],
    },
    {
      id: "technical-data",
      heading: "Technical and usage data",
      body: [
        "Alongside form data, the analytics tools described below record technical information automatically: your IP address (used to approximate your city or country, then discarded by the provider), device and browser type, screen size, referring website, the pages you view and how long you spend on them, and your clicks and scrolling.",
        "When you arrive from a campaign link, we also store the campaign parameters on that URL — utm_source, utm_medium, utm_campaign, utm_term, utm_content — and the Google (gclid) and Meta (fbclid) click identifiers. These sit in your browser's session storage for the duration of your visit and are attached to a form submission if you make one, so we know which channel brought you. Close the tab and they are gone.",
      ],
    },
    {
      id: "why",
      heading: "Why we use it",
      body: ["We use your data for these purposes and no others:"],
      list: [
        {
          term: "To answer you and plan your trip",
          def: "Replying to inquiries, building trip proposals, and following up on a request you started.",
        },
        {
          term: "To send the newsletter",
          def: "Only if you asked for it. Every email carries a one-click unsubscribe link.",
        },
        {
          term: "To understand and improve the site",
          def: "Aggregate analytics — which guides get read, where people drop off, what breaks on which device.",
        },
        {
          term: "To measure our advertising",
          def: "Attributing signups to the campaign that produced them.",
        },
      ],
      after: [
        "We do not sell your personal data, we do not rent or trade our contact lists, and we do not use your data to make automated decisions about you.",
      ],
    },
    {
      id: "third-parties",
      heading: "Who else receives it",
      body: [
        "We run a small stack of third-party services. Each one is named here with what it receives. All of them are established providers operating under their own privacy terms, and several process data on servers in the United States — by using the site you acknowledge that transfer.",
      ],
      list: [
        {
          term: "HubSpot (CRM and email)",
          def: "Receives every form submission and stores it as a contact record. HubSpot also sets a cookie (hutk) that links your later visits to your contact record, and receives the page URL you submitted from.",
        },
        {
          term: "Google Analytics 4 (via Google Tag Manager)",
          def: "Receives page views, events, and the technical data above. Used for aggregate traffic measurement.",
        },
        {
          term: "Meta Pixel (Facebook / Instagram)",
          def: "Receives page views and lead events so we can measure and target advertising on Meta platforms.",
        },
        {
          term: "Microsoft Clarity",
          def: "Records session replays and heatmaps — a reconstruction of your mouse movement, clicks, and scrolling on the page. Clarity masks text input by default, so what you type into a form is not captured in the replay.",
        },
        {
          term: "Vercel (hosting)",
          def: "Serves the site and keeps standard server logs, including IP addresses, for security and performance.",
        },
      ],
      after: [
        "We will also disclose data where the law requires it — a valid order from a competent authority — and we would tell you unless legally barred from doing so.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and similar technologies",
      body: [
        "The services above set cookies and use your browser's local and session storage. In practical terms there are three kinds: strictly necessary storage that makes the site work (for example, remembering that you have already seen the intro animation), analytics cookies from Google Analytics and Microsoft Clarity, and advertising cookies from Meta and HubSpot.",
        "We do not currently show a cookie consent banner, which means analytics and advertising cookies load when you arrive. If you would rather not be measured, you have direct control:",
      ],
      list: [
        "Block or delete cookies in your browser settings — every major browser can do this per-site.",
        "Turn on “Do Not Track” or use a tracker-blocking extension; our analytics and pixel scripts are blocked by all of the common ones.",
        "Opt out of Google Analytics specifically with Google's browser add-on at tools.google.com/dlpage/gaoptout.",
        "Manage Meta ad personalisation in your Facebook or Instagram account settings.",
      ],
      after: [
        "Blocking any of this has no effect on the site's content or on your ability to contact us.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      body: [
        "Trip and inquiry data stays in our CRM for as long as the conversation is live and for up to 24 months afterwards, so that a returning traveller does not have to start over. Newsletter subscribers are kept until they unsubscribe. Analytics data follows each provider's own retention window — 14 months for Google Analytics, 30 days for Microsoft Clarity session recordings.",
        "You can shorten any of this by asking us to delete your data, which we do without argument.",
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      body: [
        "Under the LFPDPPP you hold what Mexican law calls your derechos ARCO — the right to Access the data we hold about you, to Rectify it if it is wrong, to Cancel it (have it deleted), and to Object to a particular use. You may also withdraw consent at any time, and limit the use or disclosure of your data.",
        "If you are in the European Economic Area or the United Kingdom, the equivalent GDPR rights apply, including data portability and the right to lodge a complaint with your supervisory authority. If you are a California resident, you have the CCPA rights to know, delete, and opt out of sale — and, as stated above, we do not sell personal data.",
        `To exercise any of these, email ${PRIVACY_EMAIL} and tell us what you want done. We do not require a form or a particular format. We will confirm your identity, act within 20 business days, and never charge you for it.`,
      ],
    },
    {
      id: "security",
      heading: "How we protect it",
      body: [
        "The site is served over HTTPS only. Form submissions travel encrypted to HubSpot, and access to the CRM is limited to the two founders and restricted by two-factor authentication. We keep no separate database of our own and no copies of your data outside the services named above.",
        "No system is perfect. If a breach ever affected your data, we would notify you and the relevant authority as the law requires.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      body: [
        "The site is aimed at adults planning golf travel. We do not knowingly collect data from anyone under 18. If a minor's data has reached us, write to us and we will delete it.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: [
        "When we add a tool or change how we use data, we update this page and move the “last updated” date at the top. Material changes will be announced in the newsletter. The version you are reading now is the one that applies.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        `Questions, corrections, deletions, or a complaint about how we have handled your data — write to ${PRIVACY_EMAIL}. A real person reads it.`,
        "If you are not satisfied with our answer, you may file a complaint with Mexico's data-protection authority.",
      ],
    },
  ],
};

// ─────────────────────────────── ESPAÑOL ───────────────────────────────
// Written natively for a Mexican reader against LFPDPPP vocabulary — not a
// translation of the English above. Same facts, same order.

const ES = {
  locale: "es",
  path: "/aviso-de-privacidad",
  altPath: "/privacy",
  altLabel: "Read in English",
  seoTitle: "Aviso de Privacidad — Golf in Mexico°",
  seoDescription:
    "Cómo Golf in Mexico° recaba, usa y protege tus datos personales: los formularios del sitio, las herramientas de analítica (GA4, Meta Pixel, Microsoft Clarity), las cookies y cómo ejercer tus derechos ARCO.",
  eyebrow: "Legal",
  title: "Aviso de",
  titleEm: "Privacidad",
  updatedLabel: "Última actualización",
  updated: formatUpdated("es"),
  tocLabel: "En esta página",
  intro:
    "Golf in Mexico° es una guía editorial y un servicio de planeación de viajes de golf a la medida. Recabamos datos personales únicamente en dos lugares: los formularios que tú decides llenar y las herramientas que miden el uso del sitio. Aquí te explicamos qué se recaba, quién lo recibe, cuánto tiempo lo conservamos y cómo pedirnos que lo eliminemos.",
  sections: [
    {
      id: "controller",
      heading: "Quién es el responsable de tus datos",
      body: [
        "Golf in Mexico° (“Golf in Mexico”, “nosotros”) es el responsable del tratamiento de los datos personales recabados a través de golf-in-mexico.com, en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.",
        `Para cualquier tema de este aviso escríbenos a ${PRIVACY_EMAIL}. Las solicitudes de privacidad las atendemos nosotros mismos; no hay mesa de ayuda de por medio.`,
      ],
    },
    {
      id: "what-we-collect",
      heading: "Qué datos recabamos y dónde",
      body: [
        "Todos los datos personales que tenemos de ti provienen de alguno de los formularios siguientes. Ninguno es obligatorio para leer el sitio: puedes consultar todas las guías y artículos sin darnos nada.",
      ],
      list: [
        {
          term: "Suscripción al newsletter (pie de página, artículos, guías de destino)",
          def: "Tu correo electrónico.",
        },
        {
          term: "Trip Builder (/trip-builder)",
          def: "Tu nombre, correo electrónico y teléfono, además de los datos del viaje que capturas: destinos, tipo de viaje, meses preferidos, duración, paquete y rango de presupuesto. Si abandonas el proceso después de dejar tus datos de contacto, conservamos lo que hubieras capturado hasta ese punto.",
        },
        {
          term: "Captura de salida del Trip Builder",
          def: "Tu correo electrónico y las preferencias de viaje que habías seleccionado antes de salir.",
        },
        {
          term: "Lista de espera de destinos y solicitudes de guías",
          def: "Tu correo electrónico y el destino o región sobre el que preguntaste.",
        },
        {
          term: "Consultas generales",
          def: "Tu correo electrónico y los datos que decidas incluir.",
        },
      ],
    },
    {
      id: "technical-data",
      heading: "Datos técnicos y de navegación",
      body: [
        "Además de los formularios, las herramientas descritas más abajo registran de forma automática información técnica: tu dirección IP (usada para aproximar tu ciudad o país y después descartada por el proveedor), tipo de dispositivo y navegador, tamaño de pantalla, sitio de procedencia, las páginas que ves y el tiempo que pasas en ellas, y tus clics y desplazamiento.",
        "Si llegas desde un enlace de campaña, también guardamos los parámetros de esa URL —utm_source, utm_medium, utm_campaign, utm_term, utm_content— y los identificadores de clic de Google (gclid) y Meta (fbclid). Viven en el almacenamiento de sesión de tu navegador durante tu visita y se adjuntan a un formulario si lo envías, para saber qué canal te trajo. Al cerrar la pestaña desaparecen.",
      ],
    },
    {
      id: "why",
      heading: "Para qué los usamos",
      body: ["Usamos tus datos para estas finalidades y ninguna otra:"],
      list: [
        {
          term: "Atenderte y planear tu viaje",
          def: "Responder consultas, armar propuestas de viaje y dar seguimiento a una solicitud que iniciaste.",
        },
        {
          term: "Enviarte el newsletter",
          def: "Solo si lo pediste. Cada correo incluye un enlace de baja de un clic.",
        },
        {
          term: "Entender y mejorar el sitio",
          def: "Analítica agregada: qué guías se leen, dónde abandona la gente, qué se rompe en cada dispositivo.",
        },
        {
          term: "Medir nuestra publicidad",
          def: "Atribuir los registros a la campaña que los generó.",
        },
      ],
      after: [
        "No vendemos tus datos personales, no rentamos ni intercambiamos nuestras listas de contactos, y no usamos tus datos para tomar decisiones automatizadas sobre ti.",
      ],
    },
    {
      id: "third-parties",
      heading: "Quién más los recibe",
      body: [
        "Operamos con un conjunto reducido de servicios de terceros. Cada uno se nombra aquí junto con lo que recibe. Todos son proveedores establecidos que operan bajo sus propios términos de privacidad, y varios tratan datos en servidores ubicados en Estados Unidos: al usar el sitio reconoces esa transferencia.",
      ],
      list: [
        {
          term: "HubSpot (CRM y correo)",
          def: "Recibe todos los envíos de formularios y los guarda como registro de contacto. HubSpot también coloca una cookie (hutk) que vincula tus visitas posteriores con ese registro, y recibe la URL desde la que enviaste el formulario.",
        },
        {
          term: "Google Analytics 4 (vía Google Tag Manager)",
          def: "Recibe vistas de página, eventos y los datos técnicos descritos arriba. Se usa para medición de tráfico agregada.",
        },
        {
          term: "Meta Pixel (Facebook / Instagram)",
          def: "Recibe vistas de página y eventos de registro para medir y segmentar publicidad en las plataformas de Meta.",
        },
        {
          term: "Microsoft Clarity",
          def: "Graba repeticiones de sesión y mapas de calor: una reconstrucción del movimiento del cursor, clics y desplazamiento en la página. Clarity oculta por defecto el texto que capturas, por lo que lo que escribes en un formulario no queda en la grabación.",
        },
        {
          term: "Vercel (hospedaje)",
          def: "Sirve el sitio y conserva registros de servidor estándar, incluidas direcciones IP, por seguridad y desempeño.",
        },
      ],
      after: [
        "También revelaremos datos cuando la ley lo exija —una orden válida de autoridad competente— y te lo haríamos saber salvo que estemos legalmente impedidos.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies y tecnologías similares",
      body: [
        "Los servicios anteriores usan cookies y el almacenamiento local y de sesión de tu navegador. En la práctica hay tres tipos: almacenamiento estrictamente necesario para que el sitio funcione (por ejemplo, recordar que ya viste la animación de entrada), cookies de analítica de Google Analytics y Microsoft Clarity, y cookies de publicidad de Meta y HubSpot.",
        "Hoy no mostramos un banner de consentimiento de cookies, lo que significa que las cookies de analítica y publicidad se cargan al entrar. Si prefieres no ser medido, tienes control directo:",
      ],
      list: [
        "Bloquea o elimina cookies desde la configuración de tu navegador; todos los navegadores principales permiten hacerlo sitio por sitio.",
        "Activa “Do Not Track” o usa una extensión que bloquee rastreadores: nuestros scripts de analítica y el pixel son bloqueados por todas las extensiones comunes.",
        "Excluye Google Analytics con el complemento oficial en tools.google.com/dlpage/gaoptout.",
        "Administra la personalización de anuncios de Meta en la configuración de tu cuenta de Facebook o Instagram.",
      ],
      after: [
        "Bloquear cualquiera de estas cosas no afecta el contenido del sitio ni tu posibilidad de contactarnos.",
      ],
    },
    {
      id: "retention",
      heading: "Cuánto tiempo los conservamos",
      body: [
        "Los datos de viaje y consultas permanecen en nuestro CRM mientras la conversación esté activa y hasta 24 meses después, para que un viajero que regresa no tenga que empezar de cero. Los suscriptores del newsletter se conservan hasta que se dan de baja. Los datos de analítica siguen la ventana de retención de cada proveedor: 14 meses en Google Analytics y 30 días para las grabaciones de sesión de Microsoft Clarity.",
        "Puedes acortar cualquiera de estos plazos pidiéndonos que eliminemos tus datos, lo cual hacemos sin discutir.",
      ],
    },
    {
      id: "rights",
      heading: "Tus derechos ARCO",
      body: [
        "Conforme a la LFPDPPP tienes derecho a Acceder a los datos que tenemos de ti, Rectificarlos si son incorrectos, Cancelarlos (que los eliminemos) y Oponerte a un uso específico. También puedes revocar tu consentimiento en cualquier momento y limitar el uso o divulgación de tus datos.",
        "Si te encuentras en el Espacio Económico Europeo o el Reino Unido aplican los derechos equivalentes del GDPR, incluida la portabilidad y el derecho a presentar una reclamación ante tu autoridad de control. Si eres residente de California, tienes los derechos de la CCPA a saber, eliminar y oponerte a la venta de datos —y, como dijimos, no vendemos datos personales.",
        `Para ejercer cualquiera de estos derechos escribe a ${PRIVACY_EMAIL} indicando qué quieres que hagamos. No exigimos un formato ni un formulario específico. Confirmaremos tu identidad, actuaremos dentro de 20 días hábiles y no te cobraremos nada.`,
      ],
    },
    {
      id: "security",
      heading: "Cómo los protegemos",
      body: [
        "El sitio se sirve exclusivamente por HTTPS. Los envíos de formularios viajan cifrados hacia HubSpot y el acceso al CRM está limitado a los dos fundadores y protegido con autenticación de dos factores. No mantenemos una base de datos propia aparte ni copias de tus datos fuera de los servicios ya nombrados.",
        "Ningún sistema es perfecto. Si alguna vez una vulneración afectara tus datos, te lo notificaríamos a ti y a la autoridad correspondiente conforme a la ley.",
      ],
    },
    {
      id: "children",
      heading: "Menores de edad",
      body: [
        "El sitio está dirigido a adultos que planean viajes de golf. No recabamos a sabiendas datos de personas menores de 18 años. Si los datos de un menor llegaron a nosotros, escríbenos y los eliminaremos.",
      ],
    },
    {
      id: "changes",
      heading: "Cambios a este aviso",
      body: [
        "Cuando agreguemos una herramienta o cambiemos el uso de los datos, actualizaremos esta página y moveremos la fecha de “última actualización” del inicio. Los cambios sustanciales se anunciarán en el newsletter. La versión que estás leyendo es la vigente.",
      ],
    },
    {
      id: "contact",
      heading: "Contacto",
      body: [
        `Dudas, correcciones, eliminaciones o una queja sobre cómo manejamos tus datos: escribe a ${PRIVACY_EMAIL}. Lo lee una persona real.`,
        "Si nuestra respuesta no te satisface, puedes presentar una queja ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).",
      ],
    },
  ],
};

export const PRIVACY_CONTENT = { en: EN, es: ES };

export const getPrivacyContent = (locale) => PRIVACY_CONTENT[locale] || EN;
