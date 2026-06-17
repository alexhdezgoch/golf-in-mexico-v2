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
    author: {
      name: "Pablo De La Mora",
      role: "Founder · GIM",
      photo: "/founders/pablo/01.jpg",
    },
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 480,
    readTimeMinutes: 7,
    updated: "May 2026",
    body: [
      { type: "lead", text: "Planning a bachelor golf trip to Cabo San Lucas for a large group? This is how I did it — from securing tee times at Diamante Dunes (the #1 golf course in Mexico according to Golf Digest) to running a 12-man Ryder Cup format with prizes." },
      { type: "p", text: "Every brand has an origin story. Ours did not start in a boardroom; it started at the end of my own bachelor trip back in August 2025." },
      { type: "p", text: "It all started when I began looking for options for my closest friends to have a great time. At some point, the idea hit me: I've been inside the professional golf ecosystem building relationships for years, why don't I create a bucket-list golf trip for my own bachelor party?" },
      { type: "p", text: "Cabo was the clear answer. I wanted to build the entire itinerary around excellent golf, quality hospitality, and the ultimate bachelor golf trip in Cabo San Lucas." },
      { type: "p", text: "I ran the numbers and saw that the nightly room rate was the heaviest part of the cost breakdown. So, I reached out to the husband of my wife's best friend, and he rented us his childhood home — the very first house built in Cabo del Sol, a twenty-five-year-old property belonging to his family." },
      { type: "p", text: "Twelve guys, four days, and a dedicated house staff that included a private chef, the house caretaker, and daily cleaning service. The house is called Naah Payill." },
      { type: "p", text: "The personal touch of the service was everything — they knew exactly when to serve dinner and when to leave the group alone. That caliber of hospitality is what elevates a standard itinerary into a premium experience and what Mexican hospitality is, lived through locals." },
      { type: "image", src: "/articles/bachelor-trip/01-house.jpg", caption: "Naah Payill · Cabo del Sol · The first house ever built on the property", alt: "Naah Payill house entry with flamboyán tree" },

      { type: "h2", text: "Thursday: Solmar Links — Where the Desert Drops into the Pacific" },
      { type: "p", text: "A few of the guys flew in with me for the first tee time at Solmar. We caught the 7:00 AM flight from Mexico City, arrived for breakfast at the house, and headed straight to the course." },
      { type: "p", text: "When we arrived, the property felt brand new. The pro shop was immaculate and fully stocked." },
      { type: "p", text: "A friend of mine knew the starter from Mayakoba — they used to play soccer together during the covid pandemic — and that's exactly how premium access works down here: relationships built in unexpected places." },
      { type: "p", text: "Solmar delivered on every front for a large group, starting right at the practice range. The routing takes you through massive sand dunes where the horizon is nothing but sky and sand, before suddenly dropping onto the Pacific coastline. They filmed scenes from Troy near these dunes, and walking the fairways, you understand why." },
      { type: "image", src: "/articles/bachelor-trip/02-solmar-dunes.jpg", caption: "Solmar Links · #14 dropping into the Pacific", alt: "Solmar Links hole 14 with Pacific Ocean and sand dunes" },
      { type: "p", text: "For groups specifically: Solmar is the most logistically friendly course on the Cabo corridor. Comfort stations and drinks are bundled directly into the green fee — which matters when you're managing 10–12 people across multiple carts. No one is running back to the clubhouse. The round stays tight." },
      { type: "p", text: "We finished our round, and I hosted the official kickoff to the trip with a surf and turf dinner back at the house, with the whole group finally together." },

      { type: "h2", text: "Friday: A 12-Man Tournament at Diamante Dunes — And How We Got In" },
      { type: "p", text: "Friday was the anchor of the trip: a twelve-man tournament at Diamante Dunes. I had contacted the Head Pro months in advance to request access, and he allowed three foursomes. An amazing gesture. We knew him from the PGA Tour tournament they host at El Cardonal. So my approach was to contact Tournament Operations and ask them to introduce me." },
      { type: "p", text: "This is the part most group organizers get wrong. Diamante Dunes is a private course — you cannot book it through any OTA. The only way in is a direct relationship with the club, or working through an operator who has one. I reached out four months before the trip. That window matters." },
      { type: "image", src: "/articles/bachelor-trip/05-diamante-tee.jpg", caption: "Diamante Dunes · Davis Love III · #1 in Mexico per Golf Digest", alt: "Player teeing off at Diamante Dunes with sand dunes behind" },
      { type: "p", text: "The Dunes course sits on an entirely different tier. Golf Digest consistently ranks it as the number one course in Mexico, and I would not argue the point. The links-style layout works with the natural topography in a way I had never experienced before. The higher-handicap players in my bachelor party preferred Solmar because it was more forgiving, but Diamante is a demanding, shot-maker's layout. For me, it is one of the most extraordinary golf courses I have ever played in Mexico." },
      { type: "image", src: "/articles/bachelor-trip/04-diamante-group.jpg", caption: "The twelve-man tournament walking the fairway", alt: "Group of golfers walking a Diamante Dunes fairway" },
      { type: "p", text: "I chose a Ryder Cup format, six against six. The losing group paid for dinner. I also handed out individual prizes — a course flag from my years working on Tour and a few premium polos I acquired for the event." },
      { type: "p", text: "Format tip for group organizers: Ryder Cup works better than stroke play for mixed-handicap groups because it keeps everyone invested even after a bad hole. We ran 6v6 with net scoring — the 22-handicapper contributed as much as the scratch golfer. If your group has a wide handicap spread, that format saves the day." },
      { type: "p", text: "After the round, we headed back to the house where the chef served an incredible spread of fresh seafood he had bought at the market that morning. We rested up, then hit the town for a night out at Mezcal Bar and Bagatelle." },
      { type: "image", src: "/articles/bachelor-trip/03-bagatelle.jpg", caption: "Mezcal Bar · Copper lamps over the tequila bar", alt: "Mezcal Bar in Cabo with copper hanging lights" },

      { type: "divider" },

      { type: "h2", text: "What This Trip Actually Cost — The Honest Breakdown" },
      { type: "p", text: "Ten people asked me after the trip what we spent. Here's the real number: $3,000 USD per person, all-in, for 4 nights." },
      { type: "p", text: "That includes everything — golf, house, food, flights, nights out. Nothing hidden. Here's how it breaks down:" },
      { type: "p", text: "The house: We split Naah Payill 12 ways. Each person paid roughly 11,000 MXN for 3 nights — which landed at about the same nightly rate as a mid-corridor hotel room, except we had a private chef, a caretaker, and daily cleaning. We ran 3 breakfasts, 2 lunches, and 1 dinner at the house, built around the nights we went out. Total food and alcohol at the house came to around 35,000 MXN — real quality, not catered trays." },
      { type: "p", text: "Solmar: $400 USD green fee. That sounds steep until you understand what's bundled — two drinks per comfort station, four stations on the course, so eight drinks total, plus food at each stop. For a bachelor group, the value equation is hard to beat. The round essentially pays for itself in food and drinks." },
      { type: "p", text: "Diamante Dunes: Private course. No public rate. We got in through a direct relationship with the Head Pro — four months of advance planning. I won't quote a price because it varies, but this is exactly the kind of access that requires an operator, not a booking platform." },
      { type: "p", text: "Flights: Most of the group flew Mexico City to SJD on the early morning flight. Under $200 round trip." },
      { type: "p", text: "Nights out: This is where Cabo gets you. Dinner and bars accounted for the biggest variable cost in the budget. The chef-at-home model absorbed a lot of it — we only went out for two full evenings." },
      { type: "p", text: "The comparison that matters: a standard premium trip on the Cabo corridor runs $3,600 USD per person in double occupancy at a corridor hotel — and that's before a single green fee. We came in $600 under that number, played Solmar and Diamante, ate better, and had a private house. The math works when you build the logistics correctly from the start." },

      { type: "h2", text: "The Part That Made Me Start Golf in Mexico" },
      { type: "p", text: "Sitting around the table for our final dinner, the realization hit me. I had just successfully executed a bucket-list trip where my friends didn't break the bank to experience one of the best golf destinations in Mexico. The reviews from the guys were ten out of ten." },
      { type: "p", text: "And for me, it unlocked exactly what I had been searching for: a way to stay within the golf industry and build a real business. That was the exact moment the concept for Golf in Mexico was born." },

      { type: "divider" },

      { type: "h2", text: "Plan Your Bachelor Golf Trip to Cabo" },
      { type: "faq", q: "How far in advance should I book tee times for a bachelor group in Cabo?", a: "For peak season (November–April), book 60–90 days out for public courses. For private or semi-private courses like Diamante, you need a direct relationship with the club — or an operator who has one. Don't leave this until 30 days before." },
      { type: "faq", q: "What's the best course format for a large mixed-handicap group?", a: "Ryder Cup or better ball. Stroke play punishes higher handicappers and kills the energy by hole 12. Team formats keep everyone in the game through 18." },
      { type: "faq", q: "How many rounds is realistic for a 4-day bachelor trip?", a: "Two rounds is the sweet spot — one day to settle in, two full days on the course, one day for recovery and nightlife. Three rounds in four days is doable but exhausting. We did two and nobody wanted to leave." },

      { type: "cta", eyebrow: "Running a group trip to Cabo?", heading: "Tell us your group, your courses, your dates.", text: "We'll handle the tee times, the access, and the logistics — you just show up.", href: "/trip-builder?type=bachelor", label: "Start planning your Cabo trip" },
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
