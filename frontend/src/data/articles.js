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
    title: "How I Planned My Bachelor Golf Trip in Cabo San Lucas as a Tour Agent",
    h1: "How I Planned My Bachelor Golf Trip in Cabo San Lucas as a Tour Agent",
    subtitle: "Twelve men. Four days. Two rounds at Solmar and Diamante Dunes. How this trip became the exact operational blueprint for Golf in Mexico.",
    metaTitle: "Bachelor Golf Trip Cabo — Solmar & Diamante Dunes | Golf in Mexico°",
    metaDescription: "A Tour agent's first-person account of a twelve-man bachelor golf trip to Cabo — Solmar Links and members-only Diamante Dunes — and how it sparked Golf in Mexico.",
    excerpt: "Twelve men. Four days. Two rounds at Solmar and Diamante Dunes. How this trip became the exact operational blueprint for Golf in Mexico.",
    heroImage: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wyp4brb_CABO%20PHOTO.png",
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 480,
    readTimeMinutes: 7,
    updated: "May 2026",
    body: [
      { type: "p", text: "Every brand has an origin story. Ours did not start in a boardroom; it started at the end of my own bachelor trip back in August 2025." },
      { type: "p", text: "It all started when I began looking for options for my closest friends to have a great time. At some point, the idea hit me: I've been inside the Tour ecosystem building relationships for years, why don't I create a bucket-list golf trip for my own bachelor party?" },
      { type: "p", text: "I was getting married in Oaxaca, so I didn't want my guys spending a fortune on another destination. Cabo was the clear answer. I wanted to build the entire itinerary around excellent golf, quality hospitality, and the ultimate bachelor golf trip in Cabo San Lucas." },
      { type: "p", text: "I ran the numbers and saw that the nightly room rate was the heaviest part of the cost breakdown. So, I reached out to the husband of my wife's best friend, and he rented us his childhood home—the very first house built in Cabo del Sol, a twenty-five-year-old property belonging to his family." },
      { type: "p", text: "Ten guys, four days, and a dedicated house staff that included a private chef, the house caretaker, and daily cleaning service. The house is called Naah Payill." },
      { type: "p", text: "The personal touch of the service was everything—they knew exactly when to serve dinner and when to leave the group alone. That caliber of hospitality is what elevates a standard itinerary into a premium experience. Recognizing the rarity of that authentic Mexican hospitality was the first spark." },
      { type: "image", src: "/articles/bachelor-trip/01-house.jpg", caption: "Naah Payill · Cabo del Sol · The first house ever built on the property", alt: "Naah Payill house entry with flamboyán tree" },
      { type: "h2", text: "Thursday: The Twilight Tee Time at Solmar" },
      { type: "p", text: "A few of the guys flew in with me for the first tee time at Solmar. We caught the 7:00 AM flight from Mexico City, arrived for breakfast at the house, and headed straight to the course." },
      { type: "p", text: "When we arrived, the property felt brand new. The pro shop was immaculate and fully stocked." },
      { type: "p", text: "A friend of mine knew the starter from Mayakoba—they used to play soccer together during the pandemic—and that's exactly how premium access works down here: relationships built in unexpected places." },
      { type: "p", text: "Solmar delivered on every front for a large group, starting right at the practice range. The routing takes you through massive sand dunes where the horizon is nothing but sky and sand, before suddenly dropping onto the Pacific coastline." },
      { type: "image", src: "/articles/bachelor-trip/02-solmar-dunes.jpg", caption: "Solmar Links · #14 dropping into the Pacific", alt: "Solmar Links hole 14 with Pacific Ocean and sand dunes" },
      { type: "p", text: "They filmed scenes from Troy near these dunes, and walking the fairways, you understand why. With premium comfort stations and drinks bundled directly into the green fee, the value equation is outstanding for a golf group." },
      { type: "p", text: "We finished our round, and I hosted the official kickoff to the trip with a surf and turf dinner back at the house, with the whole group finally together." },
      { type: "h2", text: "Friday's Main Event: A Twelve-Man Tournament at Members-Only Diamante Dunes" },
      { type: "p", text: "Friday was the anchor of the trip: a twelve-man tournament at Diamante Dunes. I had contacted the Head Pro months in advance to request access, and he allowed three foursomes. An amazing gesture." },
      { type: "image", src: "/articles/bachelor-trip/05-diamante-tee.jpg", caption: "Diamante Dunes · Davis Love III · #1 in Mexico per Golf Digest", alt: "Player teeing off at Diamante Dunes with sand dunes behind" },
      { type: "p", text: "The Dunes course sits on an entirely different tier. Golf Digest consistently ranks it as the number one course in Mexico, and I would not argue the point. The links-style layout works with the natural topography in a way I had never experienced before. The higher-handicap players in my bachelor party preferred Solmar because it was more forgiving, but Diamante is a demanding, shot-maker's layout. For me, it is the most extraordinary golf course I have ever played in Mexico." },
      { type: "image", src: "/articles/bachelor-trip/04-diamante-group.jpg", caption: "The twelve-man tournament walking the fairway", alt: "Group of golfers walking a Diamante Dunes fairway" },
      { type: "p", text: "I chose a Ryder Cup format, six against six. The losing group paid for dinner. I also handed out individual prizes—a signed flag from my years working on Tour and a few premium polos I acquired for the event." },
      { type: "p", text: "Absolute bucket-list execution. But pulling it off made me realize how much insider intelligence is required to engineer a seamless, tour-level experience for a large group of guys." },
      { type: "p", text: "After the round, we headed back to the house where the chef served an incredible spread of fresh seafood he had bought at the market that morning. We rested up, then hit the town for a night out at Mezcal Bar and Bagatelle." },
      { type: "image", src: "/articles/bachelor-trip/03-bagatelle.jpg", caption: "Mezcal Bar · Copper lamps over the tequila bar", alt: "Mezcal Bar in Cabo with copper hanging lights" },
      { type: "divider" },
      { type: "h2", text: "Beyond the Fairways: The Birth of Golf in Mexico" },
      { type: "p", text: "The second half of the trip shifted to the bars, restaurants, and nightlife—the standard Cabo playbook." },
      { type: "p", text: "Sitting around the table for our final dinner, the realization hit me. I had just successfully executed a bucket-list trip where my friends didn't break the bank to experience one of the best golf destinations in Mexico. The reviews from the guys were ten out of ten. They were extremely happy. And for me, it unlocked exactly what I had been searching for: a way to stay within the golf industry and build a real business." },
      { type: "p", text: "That was the exact moment the concept for Golf in Mexico was born." },
    ],
    faqItems: [],
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
