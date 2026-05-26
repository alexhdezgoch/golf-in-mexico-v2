// Editorial article dataset for /journal (no integrations).
// Ordering: destination filter > type priority > searchVolume desc.
// Type priority: property > courses > packages > comparison > planning.

export const DESTINATIONS = [
  { slug: "all", label: "All" },
  { slug: "los-cabos", label: "Los Cabos" },
  { slug: "punta-mita", label: "Punta Mita" },
  { slug: "mexico-city", label: "Mexico City" },
];

export const TYPES = [
  { slug: "all", label: "All" },
  { slug: "courses", label: "Courses" },
  { slug: "packages", label: "Packages" },
  { slug: "planning", label: "Planning" },
  { slug: "properties", label: "Properties" },
];

// articleType: courses | packages | planning | property | comparison
export const ARTICLES = [
  // ------- FEATURED · BACHELOR TRIP (FIRST-PERSON ESSAY) -------
  {
    slug: "the-bachelor-trip-cabo",
    title: "The Bachelor Trip",
    h1: "The Bachelor Trip.",
    metaTitle: "The Bachelor Trip — Cabo, Diamante Dunes & Solmar Links | Golf in México°",
    metaDescription: "A first-person account of a ten-man bachelor trip to Cabo: Solmar Golf Links, Diamante Dunes, a private chef from Oaxaca, and the connections that make Mexican golf what it is.",
    excerpt: "Ten men. Four days. Two rounds — Solmar Links and Diamante Dunes. A first-person account of how a Mexican golf trip is actually built.",
    heroImage: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wyp4brb_CABO%20PHOTO.png",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 480,
    readTimeMinutes: 7,
    updated: "May 2026",
    body: [
      { type: "p",         text: "Fast forward. I'm planning my bachelor trip, and I know exactly where to go." },
      { type: "p",         text: "My wedding was going to be in Oaxaca, so I didn't want my guys spending a fortune on another destination. Cabo made perfect sense — and I built the entire trip around golf. We rented the first house ever built in Cabo del Sol, about twenty-five years old, belonging to a friend's family. Ten men, four days, a private chef cooking with fresh seafood we bought ourselves." },
      { type: "p",         text: "Juanito, the house caretaker from Oaxaca, had been working there since my friend's parents were young, and his personal touch was everything — he knew when you wanted dinner, when you wanted to be left alone. That kind of service doesn't come from a hotel manual. It comes from years of caring." },
      { type: "image",     src: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85", caption: "Cabo del Sol · First house ever built on the property", alt: "Cabo del Sol house at sunset" },
      { type: "h2",        text: "Solmar Links — Thursday Afternoon" },
      { type: "p",         text: "Thursday afternoon we played Solmar Links, formerly Rancho San Lucas. A friend of mine knew the starter from Mayakoba — they used to play soccer together during COVID — and that's how a lot of Mexican golf works: connections built in the most unexpected places." },
      { type: "p",         text: "Solmar was a ten out of ten. The layout takes you through massive sand dunes where you can't see anything but sky and sand, and then suddenly the ocean appears. They filmed scenes from Troy near those dunes, and once you're there, you understand why. Comfort food stations on the course, drinks included in the green fee — the value is outstanding." },
      { type: "pullquote", text: "The Dunes course is on another level. It was the most extraordinary golf course I have ever played.", cite: "Pablo De La Mora" },
      { type: "h2",        text: "Diamante Dunes — Friday's Main Event" },
      { type: "p",         text: "Friday was the main event: a ten-man tournament at Diamante Dunes. I had written to the Golf Pro months in advance to secure early morning tee times, and his team made it happen beautifully." },
      { type: "image",     src: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2000&q=85", caption: "Diamante Dunes · Davis Love III · #1 in Mexico per Golf Digest", alt: "Diamante Dunes fairway and bunkering" },
      { type: "p",         text: "The Dunes course is on another level. Golf Digest ranks it the number one course in Mexico, and I wouldn't argue with that. The links-style layout follows the natural geography in a way I'd never experienced before. My friends — most of them amateurs — said they preferred Solmar, but I think that's because the Dunes was significantly harder. For me, it was the most extraordinary golf course I have ever played." },
      { type: "p",         text: "We finished with a Ryder Cup format, five against five. I gave out prizes — a signed flag from my years working in the industry and a couple of polos I'd gotten for the tournament. Bucket list, absolutely." },
      { type: "divider" },
      { type: "h2",        text: "Off the Beaten Path" },
      { type: "p",         text: "The second half of the bachelor trip was bars, restaurants, nightlife — the full Cabo experience. But I'll say this: downtown Cabo San Lucas caters heavily to international tourists, and if you stay only there, you'll miss the authenticity. The real magic is off the beaten path, in the corridors and quiet corners where the local character comes through." },
      { type: "p",         text: "That's what I want to build toward in my life — helping people discover the Mexico that exists beyond the obvious, especially through golf." },
      { type: "image",     src: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2000&q=85", caption: "The Corridor · Beyond the obvious", alt: "Pacific coastline of Los Cabos" },
      { type: "p",         text: "Cabo has given me two unforgettable chapters so far. One professional, one deeply personal. Both shaped by the same landscape where the desert meets the sea, the same warmth of the people who live there, and the same fairways that remind you why you fell in love with this game in the first place." },
      { type: "p",         text: "I know I'll be back. Cabo always has something waiting." },
    ],
    faqItems: [
      { q: "How do I book a tee time at Diamante Dunes for a private group?", a: "Diamante is a member-guest course — there is no public booking. The right path is a written request to the Golf Pro at least 90 days in advance, ideally through a relationship the club already recognizes. We do this regularly through our Bespoke Travel package." },
      { q: "Is Solmar Golf Links open to the public?",                       a: "Solmar is resort-priority — playable when you stay at any Solmar Group property. The starter and pro shop also accept walk-ups when availability allows, particularly afternoons in shoulder seasons." },
      { q: "Can you organize a similar bachelor trip for our group?",       a: "Yes — that is exactly what the Trip Builder is for. Tell us how many players, dates, and which courses matter to you; Pablo or José builds the itinerary in 48 hours." },
    ],
    relatedArticles: [],
  },
];

// Helper: ordered list of destinations to render
export const DESTINATION_ORDER = [
  { slug: "los-cabos", label: "Los Cabos" },
  { slug: "punta-mita", label: "Punta Mita · Riviera Nayarit" },
  { slug: "mexico-city", label: "Mexico City" },
  { slug: "planning", label: "Planning" },
];

const TYPE_PRIORITY = {
  property: 0,
  courses: 1,
  packages: 2,
  comparison: 3,
  planning: 4,
};

// Sort: isGIMProperty first within destination → type priority → searchVolume desc
export const sortArticles = (articles) => {
  return [...articles].sort((a, b) => {
    if (a.isGIMProperty !== b.isGIMProperty) return a.isGIMProperty ? -1 : 1;
    if (a.articleType !== b.articleType) return (TYPE_PRIORITY[a.articleType] ?? 99) - (TYPE_PRIORITY[b.articleType] ?? 99);
    return (b.searchVolume || 0) - (a.searchVolume || 0);
  });
};

export const filterArticles = (articles, destination, type) => {
  let pool = [...articles];
  if (destination !== "all") pool = pool.filter((a) => a.destination === destination);
  if (type !== "all") {
    if (type === "properties") pool = pool.filter((a) => a.articleType === "property");
    else pool = pool.filter((a) => a.articleType === type);
  }
  return pool;
};

export const getArticleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);
export const getRelatedArticles = (slugs = []) => slugs.map(getArticleBySlug).filter(Boolean);
