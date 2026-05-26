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
    title: "How My Bachelor Golf Trip in Cabo San Lucas Became the Blueprint for Golf in México",
    h1: "How My Bachelor Golf Trip in Cabo San Lucas Became the Blueprint for Golf in México",
    subtitle: "Ten guys. Four days. Two rounds at Solmar Links and Diamante Dunes. A firsthand look at the exact itinerary that sparked our platform.",
    metaTitle: "Bachelor Golf Trip Cabo San Lucas — Solmar & Diamante Dunes | Golf in México°",
    metaDescription: "A first-person account of a ten-man bachelor golf trip to Cabo San Lucas — Solmar Links and Diamante Dunes — and how it sparked the Golf in México platform.",
    excerpt: "Ten guys. Four days. Two rounds at Solmar Links and Diamante Dunes. A firsthand look at the exact itinerary that sparked our platform.",
    heroImage: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wyp4brb_CABO%20PHOTO.png",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 480,
    readTimeMinutes: 7,
    updated: "May 2026",
    body: [
      { type: "p", text: "Every brand has an origin story. Ours did not start in a boardroom; it started with the logistics of planning my own wedding." },
      { type: "p", text: "My fiancée and I were getting married in Oaxaca, so I didn't want my groomsmen spending a fortune on another destination. When looking for the perfect location, Cabo made perfect sense. I wanted to build the entire itinerary around the game, turning a standard weekend into a proper bachelor golf trip in Cabo San Lucas." },
      { type: "p", text: "We bypassed the crowded resorts and secured the first house ever built in Cabo del Sol, a twenty-five-year-old property belonging to a friend's family. Ten men, four days, and a private chef cooking with fresh local seafood we sourced ourselves." },
      { type: "p", text: "Juanito, the house caretaker from Oaxaca, had been managing the property since my friend's parents were young. His personal touch was everything—he knew exactly when to serve dinner and when to leave the group alone. That caliber of hospitality is what elevates a standard itinerary into a premium experience. Recognizing the rarity of that authentic Mexican hospitality was the first spark." },
      { type: "image", src: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85", caption: "Cabo del Sol · First house ever built on the property", alt: "Cabo del Sol house at sunset" },
      { type: "h2", text: "Thursday: The Value Play at Solmar Links" },
      { type: "p", text: "When moving a group of ten guys, managing logistics is everything. Thursday afternoon we played Solmar Links (formerly Rancho San Lucas). A friend of mine knew the starter from Mayakoba—they used to play soccer together during the pandemic—and that's exactly how premium access works down here: relationships built in unexpected places. Navigating that friction was exactly what we later realized players needed help with." },
      { type: "p", text: "Solmar delivered on every front for a large group. The routing takes you through massive sand dunes where the horizon is nothing but sky and sand, before suddenly dropping onto the Pacific coastline. They filmed scenes from Troy near these dunes, and walking the fairways, you understand why. With premium comfort stations and drinks bundled directly into the green fee, the value equation is outstanding for a bachelor group." },
      { type: "pullquote", text: "The Dunes course is on another level. It was the most extraordinary golf course I have ever played.", cite: "Pablo De La Mora" },
      { type: "h2", text: "Friday's Main Event: A Ten-Man Tournament at Diamante Dunes" },
      { type: "p", text: "Friday was the anchor of the trip: a ten-man tournament at Diamante Dunes. I contacted the Head Pro months in advance to lock in early morning tee times, and his staff executed the group logistics flawlessly." },
      { type: "image", src: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2000&q=85", caption: "Diamante Dunes · Davis Love III · #1 in Mexico per Golf Digest", alt: "Diamante Dunes fairway and bunkering" },
      { type: "p", text: "The Dunes course sits on an entirely different tier. Golf Digest consistently ranks it as the number one course in Mexico, and I would not argue the point. The links-style layout works with the natural topography in a way I had never experienced before. The higher-handicap players in my bachelor party preferred Solmar because it was more forgiving, but Diamante is a demanding, shot-maker's layout. For me, it was the most extraordinary golf course I have ever played." },
      { type: "p", text: "We closed out the trip with a Ryder Cup format, five against five. I handed out prizes—a signed flag from my years working on Tour and a few premium polos I acquired for the event. Absolute bucket-list execution. But pulling it off made me realize how much insider intelligence is required to engineer a seamless tour-level experience for a group of guys." },
      { type: "divider" },
      { type: "h2", text: "Beyond the Fairways: The Birth of Golf in México" },
      { type: "p", text: "The second half of the trip shifted to the bars, restaurants, and nightlife—the standard Cabo playbook. But here is the ground truth: downtown Cabo San Lucas caters heavily to the international tourist crowd. If you only stay inside that bubble, you miss the actual destination. The true magic is found beyond the resort gates, in the quiet corridors where the authentic local character and culinary scene take over." },
      { type: "p", text: "Sitting around the house on our final night, the realization hit me. There was no single platform that treated Mexican golf with the respect, precision, and authenticity it deserved. No one was telling the real story of the courses, the culture, or the group logistics from an insider's perspective." },
      { type: "p", text: "That was the exact moment the concept for Golf in México was born." },
      { type: "image", src: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2000&q=85", caption: "The Corridor · Beyond the obvious", alt: "Pacific coastline of Los Cabos" },
      { type: "p", text: "This destination has given me two unforgettable chapters so far. One professional, one deeply personal. Both were shaped by the same dramatic topography where the desert hits the Pacific, the unmatched warmth of the locals, and the fairways that remind you why you fell in love with this game in the first place." },
      { type: "p", text: "I will be back. But more importantly, this bachelor trip became the blueprint we now use to bring the rest of the world here." },
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
