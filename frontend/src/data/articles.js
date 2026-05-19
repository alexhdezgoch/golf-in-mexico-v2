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
  // ------- LOS CABOS -------
  {
    slug: "golf-courses-cabo-san-lucas",
    title: "Golf Courses in Cabo San Lucas",
    h1: "Every Golf Course in Cabo San Lucas, Hole by Hole.",
    metaTitle: "Golf Courses in Cabo San Lucas — A 2026 Field Guide",
    metaDescription: "A hole-by-hole editorial guide to every championship course in Cabo San Lucas, written from the courses themselves.",
    excerpt: "Twelve championship courses, four mornings, one peninsula — the editorial guide to Cabo San Lucas, hole by hole.",
    heroImage: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "courses",
    isGIMProperty: false,
    searchVolume: 2900,
    readTimeMinutes: 12,
    updated: "January 2026",
    body: [
      { type: "p", text: "Cabo is not a single course — it is a corridor of twelve, strung along thirty kilometres of Pacific coastline. The wind picks up after eleven. The greens are paspalum. The architects are some of the best to ever shape soil." },
      { type: "h2", text: "Quivira Golf Club" },
      { type: "p", text: "Jack Nicklaus' signature design is built into a cliff. Holes 5 and 6 hang over the Pacific. Bring two extra sleeves." },
      { type: "h2", text: "Diamante Dunes" },
      { type: "p", text: "Davis Love III shaped a links course that plays harder than its yardage. The 16th green sits below sea level — the only one in Mexico." },
      { type: "h2", text: "Cabo del Sol — Ocean Course" },
      { type: "p", text: "Nicklaus called the closing stretch \"the three finest finishing holes in all of golf.\" Worth quoting." },
      { type: "h2", text: "Cabo Real" },
      { type: "p", text: "Robert Trent Jones II. Less manicured than its neighbours — more honest." },
    ],
    faqItems: [
      { q: "Best time to play in Cabo?", a: "October through May. Summers are technically open but green-speeds suffer and the swing humidity is unkind." },
      { q: "Is paspalum hard to read?", a: "Slower than bent or Bermuda. Take an extra club into greens and trust the line." },
    ],
    relatedArticles: ["los-cabos-luxury-packages", "solmar-golf-links"],
  },
  {
    slug: "solmar-golf-links",
    title: "Solmar Golf Links",
    h1: "Solmar Golf Links — The Quiet Pacific.",
    metaTitle: "Solmar Golf Links — Editorial Guide to the Greg Norman Course",
    metaDescription: "The editorial guide to Solmar Golf Links, the Greg Norman-designed Pacific course at Solmar Group's southern tip of Cabo San Lucas.",
    excerpt: "A Greg Norman-designed Pacific course where the desert ends and the ocean begins. Solmar Group's private door to Cabo.",
    heroImage: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "property",
    isGIMProperty: true,
    searchVolume: 720,
    readTimeMinutes: 8,
    updated: "February 2026",
    body: [
      { type: "p", text: "Solmar sits where the desert meets the Pacific — the Land's End side of Cabo where you can stand on the tenth tee and see the Arch. Norman routed eighteen holes that earn their reputation slowly." },
      { type: "h2", text: "The Course" },
      { type: "p", text: "7,200 yards of paspalum laid over volcanic terrain. Wind is the first defender; bunker placement is the second." },
    ],
    faqItems: [
      { q: "Who can play Solmar Golf Links?", a: "Resort and member access. We arrange tee times directly through Solmar Group hospitality." },
    ],
    relatedArticles: ["golf-courses-cabo-san-lucas", "los-cabos-luxury-packages"],
  },
  {
    slug: "los-cabos-luxury-packages",
    title: "Luxury Golf Packages in Los Cabos",
    h1: "Luxury Golf Packages in Los Cabos — What 'Luxury' Actually Buys.",
    metaTitle: "Luxury Golf Packages in Los Cabos 2026 — The Editorial Guide",
    metaDescription: "A frank guide to luxury golf packages in Los Cabos — what 'luxury' actually buys you here, and what it doesn't.",
    excerpt: "What 'luxury' actually buys you in Cabo — and what it doesn't. A frank guide to packages worth booking.",
    heroImage: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=2000&q=85",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "packages",
    isGIMProperty: false,
    searchVolume: 1400,
    readTimeMinutes: 10,
    updated: "February 2026",
    body: [
      { type: "p", text: "Luxury in Cabo means access — to courses with member-only tee times, to caddies who know the wind by the hour, to tables where you didn't make a reservation but you have one." },
      { type: "h2", text: "What a real package looks like" },
      { type: "p", text: "Five mornings of golf at four different courses, a private SUV at your disposal, dinners at three tables you wouldn't have found on your own, and a phone number you can call at any hour." },
    ],
    faqItems: [],
    relatedArticles: ["golf-courses-cabo-san-lucas", "how-to-plan-a-golf-trip-to-mexico"],
  },
  {
    slug: "los-cabos-cabo-real-vs-cabo-del-sol",
    title: "Cabo Real vs Cabo del Sol",
    h1: "Cabo Real vs Cabo del Sol — A Designer's Comparison.",
    metaTitle: "Cabo Real vs Cabo del Sol — Course Comparison Guide",
    metaDescription: "Robert Trent Jones II versus Jack Nicklaus. A frank, hole-by-hole comparison of two Los Cabos institutions.",
    excerpt: "Robert Trent Jones II vs Jack Nicklaus. A frank, hole-by-hole comparison of two Los Cabos institutions.",
    heroImage: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2000&q=85",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "comparison",
    isGIMProperty: false,
    searchVolume: 480,
    readTimeMinutes: 7,
    updated: "January 2026",
    body: [
      { type: "p", text: "Two ocean-front courses, two of the great architects, two very different rounds. Here's how each one plays — and which one you should book first." },
      { type: "h2", text: "Cabo Real (Robert Trent Jones II)" },
      { type: "p", text: "Older, weathered, honest. The wind is its main defender. Greens read slower than they look." },
      { type: "h2", text: "Cabo del Sol — Ocean Course (Nicklaus)" },
      { type: "p", text: "Three finishing holes on the Pacific. The 17th is the photograph. The 18th is the round." },
    ],
    faqItems: [],
    relatedArticles: ["golf-courses-cabo-san-lucas", "los-cabos-luxury-packages"],
  },

  // ------- PUNTA MITA -------
  {
    slug: "golf-courses-punta-mita",
    title: "Golf Courses in Punta Mita",
    h1: "Punta Mita's Two Nicklaus Courses, Tip to Tail.",
    metaTitle: "Punta Mita Golf Courses — Pacífico & Bahía Guide 2026",
    metaDescription: "An editorial guide to the two Jack Nicklaus courses at Punta Mita: Pacífico (with the Tail of the Whale) and Bahía.",
    excerpt: "Two Nicklaus courses, one peninsula. Pacífico holds the only natural island green in the world — the Tail of the Whale.",
    heroImage: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2000&q=85",
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "courses",
    isGIMProperty: false,
    searchVolume: 1900,
    readTimeMinutes: 11,
    updated: "February 2026",
    body: [
      { type: "p", text: "Punta Mita is a private peninsula north of Puerto Vallarta with two Nicklaus designs — both world-class, both members-only unless you know the right people. Pacífico is the one you've seen photographs of. The 3B optional green sits on a natural island reachable only at low tide. It's known as the Tail of the Whale." },
      { type: "h2", text: "Pacífico" },
      { type: "p", text: "7,014 yards. Eight holes on the Pacific. The Tail of the Whale is the most photographed par-3 in México." },
      { type: "h2", text: "Bahía" },
      { type: "p", text: "Slightly inland, slightly forgiving — until you reach the 12th, the only par-5 in México with a forced carry across an ocean inlet." },
    ],
    faqItems: [
      { q: "Can outside guests play Punta Mita?", a: "Only through the Four Seasons, St. Regis, or by member invitation. We coordinate through all three." },
    ],
    relatedArticles: ["mandarina-golf-course", "punta-mita-packages"],
  },
  {
    slug: "mandarina-golf-course",
    title: "Mandarina Golf Course",
    h1: "Mandarina — A Norman Course Above the Pacific.",
    metaTitle: "Mandarina Golf Course — Greg Norman Editorial Guide 2026",
    metaDescription: "The editorial guide to Mandarina Golf Course, the Greg Norman cliffside design north of Punta Mita.",
    excerpt: "A Greg Norman design above the jungle and the Pacific — and the new centrepiece of Riviera Nayarit golf.",
    heroImage: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=2000&q=85",
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "property",
    isGIMProperty: true,
    searchVolume: 560,
    readTimeMinutes: 8,
    updated: "February 2026",
    body: [
      { type: "p", text: "Mandarina sits forty minutes north of Punta Mita, on a cliff above the Pacific. The course threads through original jungle — the One&Only and Rosewood properties built the resort around the routing, not the other way around." },
      { type: "h2", text: "The Course" },
      { type: "p", text: "Greg Norman called it his finest tropical design. Six greens look at the ocean. Two play directly at it." },
    ],
    faqItems: [
      { q: "Where do you stay to play Mandarina?", a: "One&Only Mandarina or Rosewood Mandarina. We book either through direct GM contact." },
    ],
    relatedArticles: ["golf-courses-punta-mita", "punta-mita-packages"],
  },
  {
    slug: "punta-mita-packages",
    title: "Punta Mita Golf Packages",
    h1: "Punta Mita Golf Packages — Three Nights, Two Courses, One Peninsula.",
    metaTitle: "Punta Mita Golf Packages 2026 — Pacífico, Bahía, Mandarina",
    metaDescription: "An editorial guide to multi-day golf packages in Punta Mita — Pacífico, Bahía, and the Mandarina cliffside course.",
    excerpt: "Three nights, two Nicklaus courses, one Norman cliffside design. The Riviera Nayarit week, planned.",
    heroImage: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "packages",
    isGIMProperty: false,
    searchVolume: 880,
    readTimeMinutes: 9,
    updated: "January 2026",
    body: [
      { type: "p", text: "Three mornings, three courses, one peninsula. The Punta Mita week is the most compact golf-and-table itinerary in México." },
      { type: "h2", text: "Day One — Pacífico" },
      { type: "p", text: "Early tee time. Lunch overlooking the Tail of the Whale." },
      { type: "h2", text: "Day Two — Mandarina" },
      { type: "p", text: "Drive north, play above the jungle, lunch at One&Only." },
      { type: "h2", text: "Day Three — Bahía" },
      { type: "p", text: "Slower morning, sharper finish. Dinner at Carolina before the flight out." },
    ],
    faqItems: [],
    relatedArticles: ["golf-courses-punta-mita", "mandarina-golf-course"],
  },

  // ------- MEXICO CITY -------
  {
    slug: "golf-courses-mexico-city",
    title: "Golf Courses in Mexico City",
    h1: "Mexico City's Historic Clubs — Altitude, Tradition, Eight Iconic Routings.",
    metaTitle: "Golf Courses in Mexico City — Historic Clubs at 7,350 ft",
    metaDescription: "An editorial guide to Mexico City's historic golf clubs — Chapultepec, Bosques, Club de Golf México, and beyond.",
    excerpt: "At 7,350 feet, the ball flies. Mexico City's historic clubs trade ocean for altitude — and offer a different kind of round.",
    heroImage: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2000&q=85",
    destination: "mexico-city",
    destinationLabel: "Mexico City",
    articleType: "courses",
    isGIMProperty: false,
    searchVolume: 1100,
    readTimeMinutes: 10,
    updated: "January 2026",
    body: [
      { type: "p", text: "Mexico City's clubs do not market themselves. They are private, historic, and members-only. The best ones — Chapultepec, Bosques, Club de Golf México — pre-date the modern resort golf era by half a century." },
      { type: "h2", text: "Chapultepec Golf Club" },
      { type: "p", text: "Founded 1921. Hosted the WGC-Mexico Championship for five years. Tight, old-growth fairways inside the city limits." },
      { type: "h2", text: "Bosques de México" },
      { type: "p", text: "Set inside a private forest west of the city. The closest thing to a parkland course in México." },
      { type: "h2", text: "Club de Golf México" },
      { type: "p", text: "Hosted the World Cup in 1958. Percy Clifford routing. Still one of the great walks in the country." },
    ],
    faqItems: [
      { q: "Is altitude a factor at 7,350 ft?", a: "Yes — you will hit about 10% farther than at sea level. Adjust club selection, especially on approach shots." },
    ],
    relatedArticles: ["amanali-golf-club", "mexico-city-planning"],
  },
  {
    slug: "amanali-golf-club",
    title: "Amanali Golf Club",
    h1: "Amanali — The Lake Course Above Mexico City.",
    metaTitle: "Amanali Golf Club — Lake Course Editorial Guide 2026",
    metaDescription: "An editorial guide to Amanali Golf Club, the Tom Weiskopf lake course set in the highlands north of Mexico City.",
    excerpt: "A Tom Weiskopf lake course at 7,500 feet — the most cinematic round within an hour of Mexico City.",
    heroImage: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2000&q=85",
    destination: "mexico-city",
    destinationLabel: "Mexico City",
    articleType: "property",
    isGIMProperty: true,
    searchVolume: 410,
    readTimeMinutes: 7,
    updated: "February 2026",
    body: [
      { type: "p", text: "Amanali sits an hour north of the city, around a private lake at 7,500 feet. Tom Weiskopf routed eighteen holes that climb, fall, and circle the water. Three par-3s play directly at it." },
      { type: "h2", text: "The Course" },
      { type: "p", text: "Members-only. Stay at the on-site casitas; we coordinate the rest." },
    ],
    faqItems: [],
    relatedArticles: ["golf-courses-mexico-city", "mexico-city-planning"],
  },
  {
    slug: "mexico-city-planning",
    title: "Planning a Golf Week in Mexico City",
    h1: "How to Plan a Golf Week in Mexico City — Course, Table, Hotel.",
    metaTitle: "Mexico City Golf Week — Planning Guide 2026",
    metaDescription: "How to plan a five-day golf-and-table week in Mexico City — historic clubs, neighbourhood restaurants, hotel choice.",
    excerpt: "Five days, three historic clubs, the best tables in Polanco and Roma. The Mexico City week, planned.",
    heroImage: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2000&q=85",
    destination: "mexico-city",
    destinationLabel: "Mexico City",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 520,
    readTimeMinutes: 8,
    updated: "January 2026",
    body: [
      { type: "p", text: "Mexico City is a city first, golf destination second. The clubs are private; the tables are everywhere. We plan the week around both." },
      { type: "h2", text: "Where to Stay" },
      { type: "p", text: "Las Alcobas in Polanco. Or Brick Hotel in Roma. The neighbourhood matters more than the brand." },
      { type: "h2", text: "Where to Eat" },
      { type: "p", text: "Pujol after Chapultepec. Contramar at lunch. Quintonil if it's a Wednesday." },
    ],
    faqItems: [
      { q: "Best season for CDMX golf?", a: "October through April. Summers bring afternoon storms — golf in the morning, museums in the afternoon." },
    ],
    relatedArticles: ["golf-courses-mexico-city", "amanali-golf-club"],
  },

  // ------- PLANNING (always last) -------
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to Plan a Golf Trip to México",
    h1: "How to Plan a Golf Trip to México — The Playbook.",
    metaTitle: "How to Plan a Golf Trip to México — 2026 Editorial Playbook",
    metaDescription: "The editorial playbook for a frictionless golf week in México — courses, tables, hotel choice, transit, and tipping etiquette.",
    excerpt: "The playbook for a frictionless golf week in México — courses, table, hotel choice, transit, and the etiquette you should know.",
    heroImage: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2000&q=85",
    destination: "planning",
    destinationLabel: "Planning",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 1700,
    readTimeMinutes: 12,
    updated: "February 2026",
    body: [
      { type: "p", text: "Most golf trips to México fail in the small details — not the courses. The wrong hotel turns a good round into a long evening. The wrong table turns a good week into a forgettable one. Here's how we plan the small details." },
      { type: "h2", text: "Region first, courses second" },
      { type: "p", text: "Pick the region that fits the trip's mood — Cabo for big-name names, Punta Mita for privacy, CDMX for culture, Riviera Maya for warm-water golf." },
      { type: "h2", text: "Five mornings, four courses" },
      { type: "p", text: "The math: never play two days in a row at the same club. The body, the eye, and the local table all benefit from a day off." },
      { type: "h2", text: "Tipping is the local language" },
      { type: "p", text: "$30 USD per caddy. $5–10 USD to the bag drop. Round up at the table." },
      { type: "h2", text: "The week, planned" },
      { type: "p", text: "Tuesday in. Wednesday play. Thursday play. Friday off. Saturday play. Sunday play. Monday out." },
    ],
    faqItems: [
      { q: "How far in advance should I plan?", a: "Eight to twelve weeks for high season (December–April). Four weeks works for shoulder months." },
    ],
    relatedArticles: ["luxury-golf-vacation-mexico", "golf-courses-cabo-san-lucas"],
  },
  {
    slug: "luxury-golf-vacation-mexico",
    title: "Luxury Golf Vacations in México",
    h1: "Luxury Golf Vacations in México — What 'Luxury' Actually Buys.",
    metaTitle: "Luxury Golf Vacations México — 2026 Editorial Guide",
    metaDescription: "A frank guide to luxury golf vacations across México — what 'luxury' really buys, and what it doesn't.",
    excerpt: "What 'luxury' really buys you here — and what it doesn't. A frank guide across the country.",
    heroImage: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=2000&q=85",
    destination: "planning",
    destinationLabel: "Planning",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 1300,
    readTimeMinutes: 10,
    updated: "February 2026",
    body: [
      { type: "p", text: "Luxury in México is not the marble lobby. It is the person in your group chat who can move a tee time at nine on a Saturday." },
      { type: "h2", text: "What a real package buys you" },
      { type: "p", text: "Member-only access. A driver you trust. A table you didn't book. A round at 7:14 because that's when the wind hasn't picked up yet." },
      { type: "h2", text: "What it does not buy you" },
      { type: "p", text: "A guarantee. The Pacific does what it does." },
    ],
    faqItems: [],
    relatedArticles: ["how-to-plan-a-golf-trip-to-mexico", "los-cabos-luxury-packages"],
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
