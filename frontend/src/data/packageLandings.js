/* ═══════════════════════════════════════════════════════════════════
   PACKAGE LANDINGS — the transactional "book a golf trip" pages.

   Same data contract as landings.js (pages/Landing.jsx renders both).
   Split into its own module only because these five are one template with
   five fills, while the Punta Mita landings are bespoke comparison pages.

   SOURCE: "PAQUETES LP", UX Redesign v5 · The Dossier, Pablo De La Mora,
   2026-08. Copy is the client's under scope v2; structure, meta and internal
   links are ours (precedent: 15e48b8).

   PRICE CLAIMS — read before editing:
     - Tier prices are Pablo's and are NOT derivable from anything else we
       publish. They ship with his own "indicative" disclaimer attached and
       are flagged for his VoBo. Do not restate them elsewhere on the site
       until he confirms they are quotable.
     - The savings figure is $750. Pablo's HTML animated a counter to 750 but
       its reduced-motion fallback was hard-coded to "$1,500+", so anyone with
       that accessibility setting saw double the real number. One value here,
       rendered identically for everyone.
     - $750 is currently the SAME on Cancun, Los Cabos and Puerto Vallarta,
       whose tiers differ by up to $1,130. Pending a base case from Pablo
       (per room or per person, against what), so it is stated as a flat
       figure with no "+" and no superlative.

   OMITTED — deliberately, do not "restore":
     - Five FAQ answers reading "Answer pending — real data needed" (3 on the
       national page, 2 on Mexico City). They are Pablo's own TODO markers.
       Publishing them would put "Answer pending" into FAQPage schema for AI
       engines to cite. Same precedent as the VERIFY gate on the non-golfer
       article (2026-07-14).
   ═══════════════════════════════════════════════════════════════════ */

/* Identical on every package page in Pablo's set. */
const CONCIERGE = [
  { day: "01 · Tee times", body: "Booked and matched to your group, regardless of destination." },
  { day: "02 · Itinerary", body: "Built around golf first, everything else sequenced around it." },
  { day: "03 · Private transport", body: "Airport pick up." },
  { day: "04 · Curated dining", body: "From Michelin-rated spots to local hidden gems." },
  { day: "05 · Single contact", body: "One dedicated point of contact for everything." },
];

const OPERATORS = [
  {
    name: "Golf in Mexico",
    role: "Plans the golf, arranges rounds, builds the itinerary, runs the concierge desk, and holds the booking.",
  },
  {
    name: "Our private villas and partner hotels",
    role: "Operate the hotel booking, and provide the staff, golf carts, and on-property amenities.",
  },
];

const OPERATORS_NOTE = "You know who handles what before paying anything.";

/* Compliance-shaped. Ships verbatim. */
const BILLING_DISCLAIMER =
  "Golf in Mexico charges only for golf-related services — green fees, bilingual booking and hosting, and optional cart rentals. Every non-golf element (accommodation, dining, and private transport) is provided and billed directly by our separately licensed local partners. Sample packages are illustrative; prices are indicative and shown in USD. Your final quote is tailored to your group and preferred dates.";

const PERKS = ["Better tee time rates", "Airport pick-up", "Full-time concierge"];

const SAVINGS = {
  amount: "$750",
  note: "Typical saving per room when the trip is booked through Golf in Mexico rather than piece by piece.",
};

const BYLINE = "Pablo De La Mora · PGA / LPGA / WTA agent, 5+ years · Golf in Mexico";

const PROBLEM = {
  contrastLabel: "Why book with us",
  contrastH2Pre: "No 14 browser tabs, no dying group chats,",
  contrastH2Em: "no hidden markup.",
  contrastParagraphs: [
    "Give us your dates, budget, and handicaps. We unlock real inventory, transparent pricing, and a Tour-level itinerary tailored to your group.",
  ],
};

const tierCards = (photos, tiers) =>
  tiers.map((t, i) => ({ ...t, photo: photos[i % photos.length] }));

/* ─────────────────────────── CANCUN ─────────────────────────── */

const CANCUN_PHOTOS = [
  "/images/e9jy3mtt-6d0178a2-8a06-4752-bbe4-3ae6b5a70413-1-105-c.webp",
  "/images/newnok86-b9ce778b-517c-4a10-8f13-e5b8156efb2c-1-105-c.webp",
  "/images/jsn8nf92-edf7bcf8-0376-48ee-9113-e1bddba9cb45-1-105-c.webp",
  "/images/soiqih16-92f4cd01-830e-40d0-b77b-71a908b90e27-1-105-c.webp",
];

const CANCUN = {
  slug: "golf-packages",
  hub: "cancun-riviera-maya",
  hubName: "Cancun · Riviera Maya",
  name: "Cancun golf packages",

  seoTitle: "Cancun Golf Packages — Book Your Golf Trip | Golf in Mexico°",
  seoDescription:
    "A Cancun golf trip priced, assembled and booked by a former PGA Tour agent. Three package tiers, airport transfer included, all three Cancun courses in one trip.",

  heroLabel: "Cancun · Golf packages",
  h1Pre: "Cancun golf package —",
  h1Em: "book your trip with our exclusive perks.",
  heroAnswer:
    "We have tailored a golf trip designed to deliver maximum value for your Cancun golf trip — priced, assembled, and booked directly by a former PGA Tour agent rather than a call center representative reading from a rate card.",
  heroPhotos: CANCUN_PHOTOS,
  heroAlt: "Golf course fairway on the Cancun and Riviera Maya coast.",
  heroPerks: PERKS,
  ctaPrimary: "Claim preferred rates",
  ctaNote: "Pablo answers himself. No call required to get a proposal.",
  byline: BYLINE,

  ...PROBLEM,

  includedLabel: "The packages",
  includedH2Pre: "Three ways to play Cancun,",
  includedH2Em: "priced per person.",
  packages: tierCards(CANCUN_PHOTOS, [
    {
      tier: "Premium",
      name: "Luxury Stay",
      blurb: "Premium hotels, fine dining and the best courses.",
      includes: ["Top region courses", "5-star hotels", "Fine dining", "Private driver", "Golf concierge 24/7"],
      price: "$4,900",
      priceNote: "Per person · indicative",
    },
    {
      tier: "Golf-forward",
      name: "Golf Every Day",
      blurb: "Built for the group that came to play, not to lounge.",
      includes: ["Top region courses", "Premium Airbnb or hotel", "Local cuisine & spots", "Airport pickup", "Golf concierge 24/7"],
      price: "$3,900",
      priceNote: "Per person · indicative",
    },
    {
      tier: "Value",
      name: "Golf & Beach",
      blurb: "For the trip that isn't only about golf.",
      includes: ["Value-tier courses", "Boutique stay", "Shared ground transport", "Local dining picks", "Beach & resort days built in"],
      price: "$2,200",
      priceNote: "Per person · indicative",
    },
  ]),

  savings: SAVINGS,

  itineraryLabel: "Golf concierge",
  itineraryH2Pre: "Curated travel",
  itineraryH2Em: "from end to end.",
  itinerary: CONCIERGE,

  operatorsLabel: "Two operators, direct transparency",
  operatorsH2Pre: "Who does",
  operatorsH2Em: "what.",
  operators: OPERATORS,
  operatorsNote: OPERATORS_NOTE,
  operatorsDisclaimer: BILLING_DISCLAIMER,

  faqs: [
    {
      q: "How many courses can I combine in one trip?",
      a: "Most groups play two to three rounds across 4 nights. All three Cancun courses can be combined in a single trip — we sequence them so you're not backtracking across the region.",
    },
    {
      q: "What's the best season to play Cancun golf?",
      a: "November through April is peak season — cooler temperatures, firmer greens, higher rates. May through October runs cheaper with a higher chance of afternoon rain; mornings are still reliably playable.",
    },
    {
      q: "Is airport transfer included?",
      a: "Yes, on every package tier — round-trip transfer between Cancun International Airport and your resort is built into the price shown above.",
    },
  ],

  closingH2Pre: "Let's talk.",
  closingH2Em: "Fifteen minutes to align your trip.",
  closingBody:
    "We value relationships over forms. Tell us your dates, your group, and your handicaps, and we'll come back with a proposal for the whole trip.",

  relatedReads: [
    {
      to: "/destinations/cancun-riviera-maya",
      anchor: "the Cancun and Riviera Maya guide",
      note: "The courses, the corridor, and how the all-inclusive maths actually works.",
    },
  ],
};

/* ─────────────────────────── LOS CABOS ─────────────────────────── */

/* NOTE: this sits UNDER the existing /destinations/los-cabos hub rather than
   replacing it. Los Cabos is the one destination that already has a full
   custom page, so the LP takes the transactional slot and the hub keeps the
   informational one — the SEM/SEO split from the 2026-08-10 call. */

const CABO_PHOTOS = [
  "/images/0wyp4brb-cabo-photo.webp",
  "/images/d3b1vfc5-gim-stills-36.webp",
  "/images/w9zxd211-palmilla.webp",
  "/images/0vavic1n-solmar-links.webp",
];

const LOS_CABOS = {
  slug: "golf-packages",
  hub: "los-cabos",
  hubName: "Los Cabos",
  name: "Los Cabos golf packages",

  seoTitle: "Cabo Golf Packages — Book Your Golf Trip | Golf in Mexico°",
  seoDescription:
    "A Los Cabos golf trip priced, assembled and booked by a former PGA Tour agent. Three package tiers across a 20-mile corridor of Nicklaus, Woods, Norman and Fazio designs.",

  heroLabel: "Los Cabos · Golf packages",
  h1Pre: "Cabo golf package —",
  h1Em: "book your trip with our exclusive perks.",
  heroAnswer:
    "We have tailored a golf trip designed to deliver maximum value for your Cabo golf trip — priced, assembled, and booked directly by a former PGA Tour agent rather than a call center representative reading from a rate card.",
  heroPhotos: CABO_PHOTOS,
  heroAlt: "Oceanfront golf hole on the Los Cabos corridor.",
  heroPerks: PERKS,
  ctaPrimary: "Claim preferred rates",
  ctaNote: "Pablo answers himself. No call required to get a proposal.",
  byline: BYLINE,

  contrastLabel: "The experience",
  contrastH2Pre: "Mexico's highest concentration",
  contrastH2Em: "of signature oceanfront golf.",
  contrastParagraphs: [
    "Cabo holds Mexico's highest concentration of signature oceanfront golf. Book it once, repeat it every year.",
    "Give us your dates, budget, and handicaps. We unlock real inventory, transparent pricing, and a Tour-level itinerary tailored to your group.",
  ],

  includedLabel: "The packages",
  includedH2Pre: "Three ways to play Los Cabos,",
  includedH2Em: "priced per person.",
  packages: tierCards(CABO_PHOTOS, [
    {
      tier: "Premium",
      name: "Luxury Stay",
      blurb: "Premium hotels, fine dining and the best courses.",
      includes: ["Top region courses", "5-star hotels", "Fine dining", "Private driver", "Golf concierge 24/7"],
      price: "$5,580",
      priceNote: "Per person · indicative",
    },
    {
      tier: "Golf-forward",
      name: "Golf Every Day",
      blurb: "Built for the group that came to play, not to lounge.",
      includes: ["Top region courses", "Premium Airbnb or hotel", "Local cuisine & spots", "Airport pickup", "Golf concierge 24/7"],
      price: "$3,900",
      priceNote: "Per person · indicative",
    },
    {
      tier: "Value",
      name: "Golf & Beach",
      blurb: "For the trip that isn't only about golf.",
      includes: ["Value-tier courses", "Boutique stay", "Shared ground transport", "Local dining picks", "Beach & resort days built in"],
      price: "$2,500",
      priceNote: "Per person · indicative",
    },
  ]),

  savings: SAVINGS,

  itineraryLabel: "Golf concierge",
  itineraryH2Pre: "Curated travel",
  itineraryH2Em: "from end to end.",
  itinerary: CONCIERGE,

  operatorsLabel: "Two operators, direct transparency",
  operatorsH2Pre: "Who does",
  operatorsH2Em: "what.",
  operators: OPERATORS,
  operatorsNote: OPERATORS_NOTE,
  operatorsDisclaimer: BILLING_DISCLAIMER,

  faqs: [
    {
      q: "Can I play the signature courses if I'm not staying at the right resort?",
      a: "Access is arranged through our relationships — ask us before assuming a course is unavailable.",
    },
    {
      q: "Why do so many golfers choose Los Cabos?",
      a: "Three courses on Golf Digest's World 100 Greatest list. Seven of Mexico's top 10 courses. Championship designs by Nicklaus, Woods, Norman, Love III and Fazio — in one 20-mile corridor. 350 sunny days a year, per the Los Cabos Tourism Board. Direct flights from 30+ US cities; the flight from LAX is under three hours, shorter than driving from Los Angeles to Palm Springs.",
    },
    {
      q: "Is it safe to travel to Los Cabos?",
      a: "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent security infrastructure — the destination has invested close to $50 million in security upgrades and operates a real-time network with local hotels. Standard travel precautions apply, as with any international destination. The 38% repeat-visitor rate among luxury travelers is one of the strongest signals of destination confidence.",
    },
  ],

  closingH2Pre: "Let's talk.",
  closingH2Em: "Fifteen minutes to align your trip.",
  closingBody:
    "We value relationships over forms. Tell us your dates, your group, and your handicaps, and we'll come back with a proposal for the whole trip.",

  relatedReads: [
    {
      to: "/destinations/los-cabos",
      anchor: "the full Los Cabos guide",
      note: "Every course on the corridor, green fees, and when to go.",
    },
  ],
};

/* ─────────────────────── PUERTO VALLARTA ─────────────────────── */

const PV_PHOTOS = [
  "/images/3z3gpvuk-81f3f231-303b-42ae-969b-440d82c25c70-1-105-c.webp",
  "/images/jbqxmvek-b9218c30-f95e-41c2-a24a-a9867eb4de7c-1-105-c.webp",
  "/images/4snhxxzm-e8cf1585-fc08-494c-ad51-ecf8f27b8f26-1-105-c.webp",
  "/images/wqf7n1js-fa4fd2fc-6222-4e3b-ad57-f9cc947b5aeb-1-105-c.webp",
];

const PUERTO_VALLARTA = {
  slug: "golf-packages",
  hub: "puerto-vallarta",
  hubName: "Puerto Vallarta",
  name: "Puerto Vallarta golf packages",

  seoTitle: "Puerto Vallarta Golf Packages — Book Your Trip | Golf in Mexico°",
  seoDescription:
    "A Puerto Vallarta golf trip priced and booked by a former PGA Tour agent. Seven courses within 45 minutes of PVR, including the Mexico Open venue at Vidanta.",

  heroLabel: "Puerto Vallarta · Golf packages",
  h1Pre: "Puerto Vallarta golf package —",
  h1Em: "book your trip with our exclusive perks.",
  heroAnswer:
    "We have tailored a golf trip designed to deliver maximum value for your Puerto Vallarta golf trip — priced, assembled, and booked directly by a former PGA Tour agent rather than a call center representative reading from a rate card.",
  heroPhotos: PV_PHOTOS,
  heroAlt: "Golf course framed by jungle and the Banderas Bay coastline.",
  heroPerks: PERKS,
  ctaPrimary: "Claim preferred rates",
  ctaNote: "Pablo answers himself. No call required to get a proposal.",
  byline: BYLINE,

  contrastLabel: "The experience",
  contrastH2Pre: "The region's only PGA Tour venue,",
  contrastH2Em: "plus Nicklaus and Weiskopf side by side.",
  contrastParagraphs: [
    "Puerto Vallarta holds the region's only PGA Tour venue, plus Nicklaus and Weiskopf side by side at Vista Vallarta. Book it once, repeat it every year.",
    "Give us your dates, budget, and handicaps. We unlock real inventory, transparent pricing, and a Tour-level itinerary tailored to your group.",
  ],

  includedLabel: "The packages",
  includedH2Pre: "Three ways to play Puerto Vallarta,",
  includedH2Em: "priced per person.",
  packages: tierCards(PV_PHOTOS, [
    {
      tier: "Premium",
      name: "Luxury Stay",
      blurb: "Premium hotels, fine dining and the best courses — including the PGA Tour venue at Vidanta.",
      includes: ["Vidanta Norman Course + Vista Vallarta", "5-star hotels", "Fine dining", "Private driver", "Golf concierge 24/7"],
      price: "$4,450",
      priceNote: "Per person · indicative",
    },
    {
      tier: "Golf-forward",
      name: "Golf Every Day",
      blurb: "Built for the group that came to play, not to lounge.",
      includes: ["Vista Vallarta (Nicklaus & Weiskopf)", "Premium Airbnb or hotel", "Local cuisine & spots", "Airport pickup", "Golf concierge 24/7"],
      price: "$3,150",
      priceNote: "Per person · indicative",
    },
    {
      tier: "Value",
      name: "Golf & Beach",
      blurb: "For the trip that isn't only about golf.",
      includes: ["Marina Vallarta or Flamingos", "Boutique stay", "Shared ground transport", "Local dining picks", "Beach & resort days built in"],
      price: "$1,950",
      priceNote: "Per person · indicative",
    },
  ]),

  savings: SAVINGS,

  itineraryLabel: "Golf concierge",
  itineraryH2Pre: "Curated travel",
  itineraryH2Em: "from end to end.",
  itinerary: CONCIERGE,

  operatorsLabel: "Two operators, direct transparency",
  operatorsH2Pre: "Who does",
  operatorsH2Em: "what.",
  operators: OPERATORS,
  operatorsNote: OPERATORS_NOTE,
  operatorsDisclaimer: BILLING_DISCLAIMER,

  faqs: [
    {
      q: "Can I play the signature courses if I'm not staying at the right resort?",
      a: "Access is arranged through our relationships — ask us before assuming a course is unavailable.",
    },
    {
      q: "Why do so many golfers choose Puerto Vallarta?",
      a: "Seven courses across three zones, including the only active PGA Tour venue in Puerto Vallarta — the Vidanta Norman Course, host of the Mexico Open since 2022. Signature designs by Jack Nicklaus, Tom Weiskopf, Greg Norman, Robert von Hagge, Joe Finger, and Percy Clifford, all within 45 minutes of PVR airport. The dry season, November through May, delivers consistent, near-daily sun.",
    },
    {
      q: "Is it safe to travel to Puerto Vallarta?",
      a: "Yes. Puerto Vallarta and the Riviera Nayarit corridor are among Mexico's most established tourist destinations, with a resort and golf infrastructure built over decades. Standard travel precautions apply, as with any international destination.",
    },
  ],

  closingH2Pre: "Let's talk.",
  closingH2Em: "Fifteen minutes to align your trip.",
  closingBody:
    "We value relationships over forms. Tell us your dates, your group, and your handicaps, and we'll come back with a proposal for the whole trip.",

  relatedReads: [
    {
      to: "/destinations/puerto-vallarta",
      anchor: "the Puerto Vallarta golf guide",
      note: "All seven courses on the bay, green fees, and the corridor map.",
    },
  ],
};

/* ─────────────────────── MEXICO CITY (waitlist) ─────────────────────── */

/* Not a booking page. No tiers, no prices, no savings banner — Pablo is
   explicit that CDMX access does not exist yet and this page exists to prove
   demand. Two of his four FAQ answers read "Answer pending"; those are
   omitted rather than shipped into schema. */

const CDMX_PHOTOS = [
  "/images/duzvawrv-img-3845.webp",
  "/images/7240pgi5-screenshot-2026-06-10-at-1-53-33-p-m.webp",
  "/images/3npawpvw-screenshot-2026-06-10-at-1-53-50-p-m.webp",
];

const MEXICO_CITY = {
  slug: "private-access",
  hub: "mexico-city",
  hubName: "Mexico City",
  name: "Mexico City private access",

  seoTitle: "Mexico City Private Golf Access — Join the List | Golf in Mexico°",
  seoDescription:
    "Mexico City's best golf is private, member-guest only. We're building the relationships to open those gates. Join the list and you hear first.",

  heroLabel: "Mexico City · The opportunity",
  h1Pre: "Mexico City's best golf",
  h1Em: "isn't public — yet.",
  heroAnswer:
    "We're building the relationships to open the doors of Mexico City's private, member-guest clubs — the same way we already have in Los Cabos.",
  heroPhotos: CDMX_PHOTOS,
  heroAlt: "Tree-lined fairway at a private club in the Mexico City valley.",
  ctaPrimary: "Join the list",
  ctaNote: "No commitment. It tells us there's demand, and puts you first in line.",
  byline: BYLINE,

  contrastLabel: "The opportunity",
  contrastH2Pre: "Mexico City's best golf isn't public.",
  contrastH2Em: "We're working on that.",
  contrastParagraphs: [
    "Clubs here have hosted the biggest names in the sport — Tiger Woods, Dustin Johnson, the WGC-Mexico Championship — and they don't open their gates to outside golfers. We're building the relationships to change that for Mexico City, the way we already have in Los Cabos.",
  ],

  accessLabel: "Not yet bookable",
  accessH2Pre: "Why this isn't",
  accessH2Em: "a booking page yet.",
  accessParagraphs: [
    "Most of our destinations, you can book today. Mexico City is different — the courses that matter here are private, member-guest clubs, some public. No rack rate, no outside bookings, no amount of calling changes that.",
    "Getting access to a club like that isn't a transaction. It's a relationship, and relationships get built faster when there's real demand standing behind them. That's what this page is for.",
    "Leave your info and you're on the list. As we lock in access, you hear first — and you'll have already told us exactly what kind of trip you're waiting for.",
  ],

  itineraryLabel: "Golf concierge",
  itineraryH2Pre: "Curated travel",
  itineraryH2Em: "from end to end.",
  itinerary: CONCIERGE,

  operatorsLabel: "Two operators, direct transparency",
  operatorsH2Pre: "Who does",
  operatorsH2Em: "what.",
  operators: OPERATORS,
  operatorsNote: OPERATORS_NOTE,
  operatorsDisclaimer: BILLING_DISCLAIMER,

  /* Two of Pablo's four answers were "Answer pending" and are held back. */
  faqs: [
    {
      q: "Can I play a Mexico City golf course today?",
      a: "Semi-private and public options exist — the private member clubs are what we're building access to.",
    },
    {
      q: "Does signing up commit me to anything?",
      a: "No — it tells us there's demand, and puts you first in line when access opens.",
    },
  ],

  closingH2Pre: "Join the list.",
  closingH2Em: "You hear first.",
  closingBody:
    "Tell us what kind of trip you're waiting for. As we lock in access, you'll already be on the list — and we'll already know what you want.",

  relatedReads: [
    {
      to: "/destinations/mexico-city",
      anchor: "the Mexico City golf guide",
      note: "The clubs, the altitude, and how access actually works today.",
    },
  ],
};

/* ─────────────────────── NATIONAL (no parent hub) ─────────────────────── */

/* Sits above every destination, so it gets its own top-level route rather
   than replacing the homepage — the homepage carries the brand intro and the
   existing equity. Three of Pablo's four FAQ answers read "Answer pending"
   and are omitted. */

/* Four regions, four real photographs — this page argues "one country, five
   ways to play", so the hero should show the country rather than the mark.
   NB: /images/e60z74y2-golf-in-mexico-5.webp is a 3KB brand graphic used as
   filler elsewhere in the data, NOT photography. Never use it as a hero. */
const NATIONAL_PHOTOS = [
  "/images/punta-mita/punta-mita-pacifico-tail-of-the-whale-island-green-aerial.webp",
  "/images/0wyp4brb-cabo-photo.webp",
  "/images/3z3gpvuk-81f3f231-303b-42ae-969b-440d82c25c70-1-105-c.webp",
  "/images/e9jy3mtt-6d0178a2-8a06-4752-bbe4-3ae6b5a70413-1-105-c.webp",
];

const NATIONAL = {
  slug: "golf-packages",
  hub: null,
  path: "/golf-packages",
  hubName: "Mexico",
  name: "Mexico golf packages",

  seoTitle: "Mexico Golf Packages — Plan Your Trip | Golf in Mexico°",
  seoDescription:
    "Five regions, one operator. Founded by a former PGA Tour agent and a Mexican Tour pro, Golf in Mexico matches your group to the right destination before you book the wrong one.",

  heroLabel: "Mexico · The country",
  h1Pre: "Why is Mexico",
  h1Em: "the best golf destination?",
  heroAnswer:
    "No other country offers this exact formula: championship designer architecture, legendary hospitality, incredible gastronomy, and unbeatable value. Golf in Mexico was founded by a former PGA Tour agent and a Mexican Tour pro to guide you to the best golf experiences in Mexico.",
  heroPhotos: NATIONAL_PHOTOS,
  heroAlt: "The Tail of the Whale island green at Pacifico, Punta Mita, ringed by Pacific surf.",
  ctaPrimary: "Plan my trip",
  ctaNote: "Pablo answers himself. No call required to get a proposal.",
  byline: BYLINE,

  contrastLabel: "One country, five ways to play",
  contrastH2Pre: "Same country,",
  contrastH2Em: "different trips.",
  contrastParagraphs: [
    "Mexico City is the one nobody's chasing yet — private member clubs where public access simply doesn't exist. We're the first operator unlocking direct access to CDMX's exclusive gates, pairing historic Tour fairways with experiences that match them.",
    "Punta Mita, in Riviera Nayarit, is the next step up — accessible resort-town courses with the option to reach into signature layouts nearby.",
    "Los Cabos is championship golf — signature designer courses, higher ticket, built for golfers who've already decided the round is the main point of the trip.",
    "Cancun is resort golf — all-inclusive, built for families and mixed groups who want the round to fit around everything else.",
    "Unique Destinations — we also manage handpicked courses worth the flight, outside the four main regions.",
    "We've played all of it. Tell us what matters most to your group and we'll tell you where to go, not just what to book.",
  ],

  accessLabel: "The real problem",
  accessH2Pre: "The problem golfers",
  accessH2Em: "actually have.",
  accessParagraphs: [
    "Planning a golf trip to Mexico means fighting total regional fragmentation. You end up with twenty browser tabs open, conflicting forum advice, and a trip that dies in the group chat because nobody knows which coast actually matches your group's budget and handicap spread.",
    "A sports agent and a Mexican Tour pro have walked over 60 fairways across every region in the country. We don't just push inventory — we match your group to the right destination before you build the wrong itinerary.",
    "Tell us your dates, budget, and group profile, and we'll tell you exactly where to fly, how to optimize your spend, and get your whole trip arranged from inside the ropes.",
  ],

  itineraryLabel: "Wherever you end up",
  itineraryH2Pre: "Everything, handled —",
  itineraryH2Em: "wherever you end up.",
  itinerary: CONCIERGE,

  operatorsLabel: "Two operators, direct transparency",
  operatorsH2Pre: "Who does",
  operatorsH2Em: "what.",
  operators: OPERATORS,
  operatorsNote: OPERATORS_NOTE,
  operatorsDisclaimer: BILLING_DISCLAIMER,

  /* Three of Pablo's four answers were "Answer pending" and are held back. */
  faqs: [
    {
      q: "Which destination is best for a first golf trip to Mexico?",
      a: "Depends on your group and budget — this is exactly what we help you figure out.",
    },
  ],

  closingH2Pre: "Talk to someone.",
  closingH2Em: "We'll tell you where to go.",
  closingBody:
    "Tell us your dates, your budget, and your group profile. We'll come back with the region that fits and a proposal for the whole trip.",

  relatedReads: [
    { to: "/destinations/los-cabos", anchor: "Los Cabos", note: "Championship golf across a 20-mile corridor." },
    { to: "/destinations/punta-mita", anchor: "Punta Mita", note: "Two Nicklaus courses on a private peninsula." },
    { to: "/destinations/cancun-riviera-maya", anchor: "Cancun and the Riviera Maya", note: "Resort golf, built around the all-inclusive." },
    { to: "/destinations/puerto-vallarta", anchor: "Puerto Vallarta", note: "Seven courses and the Mexico Open venue." },
  ],
};

export const PACKAGE_LANDINGS = [CANCUN, LOS_CABOS, PUERTO_VALLARTA, MEXICO_CITY, NATIONAL];

export default PACKAGE_LANDINGS;
