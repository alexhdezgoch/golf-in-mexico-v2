/* ═══════════════════════════════════════════════════════════════════
   LANDING DATA — transactional pages that sit UNDER a destination hub.

   These differ from hubs (data/hubs.js) on purpose. A hub answers
   "what is this destination"; a landing answers one buying question and
   asks for the booking. Ads point here, so every landing carries an
   offer, a CTA above the fold, and a form — the hub carries neither.

   Route: /destinations/<hub>/<slug>  (see App.js)
   Picked up automatically by scripts/generate-llms.mjs → sitemap.xml,
   llms.txt, llms-full.txt, and therefore by the prerenderer.

   SOURCES for the Punta Mita copy below:
     - "Punta Mita — Inputs + E-E-A-T (v4)", Pablo De La Mora, 2026-08-12
     - GIM field research, Pablo De La Mora & José Islas
     - Green fee $325–$400 confirmed by Alex/GIM 2026-08-12 (supersedes the
       $345–$395 and $300–$380 figures that were on the site before).

   FACT NOTES — deliberate omissions, do not "fix" without a source:
     - Bahia's opening year is omitted. The site said 2005; GIM research says
       2008 or 2009 with sources in conflict. Omitted until settled.
     - Hole 3B is "the only NATURAL island green in golf". Not "the only island
       green in the world" — TPC Sawgrass 17 is an island green too.
     - 3B is reached across a natural stone causeway at low tide (visible in
       the aerial photography). Earlier copy said "by boat"; that was wrong.
     - No PMR-vs-hotel savings table here. The figures supplied did not carry
       units or a base case and did not reconcile to their own headline. A
       price claim on an ads landing page has to be substantiable — it goes in
       once Pablo confirms per-person / nights / rounds.
     - Photo → course attribution is unconfirmed for everything except 3B
       (definitively Pacifico). Captions stay course-neutral until Pablo labels
       the shoot. Do not assert "Bahia" on an image without that.
   ═══════════════════════════════════════════════════════════════════ */

const PENINSULA_ACCESS =
  "Four Seasons and St. Regis guests, Punta Mita villa renters, and residence owners.";

/* ─────────── PACÍFICO vs BAHÍA ─────────── */

const PACIFICO_BAHIA = {
  slug: "pacifico-bahia",
  hub: "punta-mita",
  hubName: "Punta Mita",
  name: "Pacífico vs Bahía",

  seoTitle: "Pacífico vs Bahía: Which Punta Mita Course to Play (2026) | Golf in Mexico°",
  seoDescription:
    "Two Jack Nicklaus Signature courses on the same peninsula, and they do not play alike. Specs, green fees $325–$400, the Tail of the Whale tide window, and how to get on.",

  heroLabel: "Punta Mita · Course Comparison",
  h1Pre: "Pacífico or Bahía —",
  h1Em: "which one do you play?",

  // Answer-first. The question in the title is settled inside 50 words.
  heroAnswer:
    "Play Pacífico for the ocean and the island green at 3B. Play Bahía for the tighter, more technical round through jungle. Both are Jack Nicklaus Signature courses on the same peninsula, both run $325–$400 for resort guests, and most golfers here play one of each.",

  heroPhoto: "/images/punta-mita/punta-mita-pacifico-tail-of-the-whale-island-green-aerial.webp",
  heroAlt:
    "Aerial view of the Tail of the Whale, hole 3B at Pacífico Course in Punta Mita — a natural island green ringed by surf, with the stone causeway visible at low tide.",

  ctaPrimary: "Plan the round",
  ctaNote: "Pablo answers himself. No call required to get a proposal.",

  /* Side-by-side specs. Every row is sourced; a cell we cannot source is "—". */
  specsLabel: "The specs",
  specsH2Pre: "Same architect,",
  specsH2Em: "two different arguments.",
  specs: [
    ["", "Pacífico", "Bahía"],
    ["Designer", "Jack Nicklaus Signature", "Jack Nicklaus Signature"],
    ["Opened", "1999", "—"],
    ["Par", "72", "72"],
    ["Yardage", "7,014", "—"],
    ["Holes on the Pacific", "8", "6"],
    ["The round", "Ocean wind, longer clubs", "Jungle corridors, shot-shaping"],
    ["Green fee", "$325 – $400", "$325 – $400"],
    ["Caddie", "Included at Four Seasons", "Included at Four Seasons"],
  ],
  specsNote:
    "Bahía's opening year and yardage are left blank on purpose — the available sources disagree, and we would rather leave a gap than publish a number you could catch us on.",

  contrastLabel: "The difference",
  contrastH2Pre: "One pulls you into the jungle.",
  contrastH2Em: "The other opens onto the Pacific.",
  contrastParagraphs: [
    "Pacífico faces the ocean from start to finish. Constant wind off Banderas Bay, longer club selections than the scorecard suggests, and the island green at 3B — visible only when the tide pulls back. Not every hole faces the water, but the ones that do carry the round.",
    "Bahía closes in. Tight corridors, shot-shaping on nearly every hole, bunkers deep enough to punish a small miss. It plays more open off the tee than Pacífico and asks harder questions once you are there. Less theater, more test.",
    "Nicklaus built them to be felt as a contrast. That is the argument for playing both — you will not play the same round twice.",
  ],

  /* The one hole that sells the destination. Kept factual and caveated. */
  calloutIcon: "🐳",
  calloutLabel: "The Tail of the Whale",
  calloutBody:
    "Hole 3B at Pacífico is the only natural island green in golf — a green sitting on a rock island off the peninsula, reached across a natural stone causeway when the tide is out. It is optional. Ask the pro shop the night before for the tide window; surfers time the swell nearby with a tide app and the concierge desks use the same one. If your tee time lands inside the window, go. If not, play 3A. The round holds either way.",

  sectionPhotos: [
    {
      src: "/images/punta-mita/punta-mita-pacifico-tee-shot-tail-of-the-whale.webp",
      alt: "A golfer mid-swing at Pacífico Course, Punta Mita, playing toward the island green at hole 3B with the Pacific behind.",
      caption: "Pacífico · the tee shot at 3B",
    },
    {
      src: "/images/punta-mita/punta-mita-green-palms-dune-grass.webp",
      alt: "An oceanfront green on the Punta Mita peninsula framed by palms and dune grass.",
      caption: "Punta Mita peninsula",
    },
    {
      src: "/images/punta-mita/punta-mita-green-flag-bunker-surf.webp",
      alt: "A green and flagstick on the Punta Mita peninsula with a bunker short and surf breaking beyond.",
      caption: "Punta Mita peninsula",
    },
  ],

  accessLabel: "Getting on",
  accessH2Pre: "Neither course",
  accessH2Em: "sells a public tee time.",
  accessBody: `Pacífico and Bahía are restricted to ${PENINSULA_ACCESS} There is no day-pass and no walk-up rate. The usual route in is the room — or the villa, which is the part most golfers do not know about. Green fees run $325 to $400 per round for resort guests, varying by season and course. Caddies are included at Four Seasons and billed separately at St. Regis.`,

  faqs: [
    {
      q: "Is Pacífico or Bahía harder to play at Punta Mita?",
      a: "Neither is universally harder — it depends on the golfer. Bahía plays more open off the tee. Pacífico demands more precision, because constant ocean wind changes what club the distance actually calls for. If you dislike wind, Bahía is the friendlier round. If you dislike tight corridors, Pacífico is.",
    },
    {
      q: "What is the Tail of the Whale at Punta Mita?",
      a: "It is hole 3B at Pacífico Course, a Jack Nicklaus Signature design — the only natural island green in golf. The green sits on a rock island off the peninsula and is reached across a natural stone causeway at low tide. It plays as an optional alternative to 3A, so the round works whether or not the tide cooperates.",
    },
    {
      q: "Can I play both Pacífico and Bahía on one trip?",
      a: "Yes, and most golfers do. The two courses are about five minutes apart by cart inside the peninsula, so a two-round trip usually means one at each. Golf in Mexico books both rounds as part of one reservation rather than two separate calls.",
    },
    {
      q: "Do I need to be a hotel guest to play Pacífico or Bahía?",
      a: "Not a hotel guest specifically. Access also runs through Punta Mita villa rentals and group bookings, which Golf in Mexico coordinates. What you cannot do is drive up from Puerto Vallarta and buy a tee time — the peninsula gate requires a confirmed stay.",
    },
    {
      q: "How much does it cost to play golf in Punta Mita?",
      a: "Green fees at Pacífico and Bahía run $325 to $400 USD per round for resort guests, varying by season and course. Caddies are included at Four Seasons and billed separately at St. Regis. Caddie tips run $40–$60 per bag per round and are expected.",
    },
  ],

  closingH2Pre: "Tell us the dates.",
  closingH2Em: "We will come back with the round.",
  closingBody:
    "Send the dates and the size of the group. You get a proposal back with both courses, the villa, and the transfers priced as one trip — not a quote for a tee time.",

  relatedReads: [
    {
      to: "/destinations/punta-mita/stay-and-play",
      anchor: "how villa access to Punta Mita golf works",
      note: "The route in that is not a hotel room — and why groups of eight price better than four.",
    },
    {
      to: "/destinations/punta-mita",
      anchor: "the full Punta Mita and Riviera Nayarit guide",
      note: "All five courses on the corridor, green fees, and the calendar.",
    },
  ],
};

/* ─────────── STAY & PLAY ─────────── */

const STAY_AND_PLAY = {
  slug: "stay-and-play",
  hub: "punta-mita",
  hubName: "Punta Mita",
  name: "Stay & Play",

  seoTitle: "Punta Mita Stay & Play: Villa + Golf Access (2026) | Golf in Mexico°",
  seoDescription:
    "You do not need a Four Seasons room to play Pacífico and Bahía. How villa access works, what a group of eight actually pays, and what a two-day golf trip looks like.",

  heroLabel: "Punta Mita · Stay & Play",
  h1Pre: "You do not need a hotel room",
  h1Em: "to play Punta Mita.",

  heroAnswer:
    "Pacífico and Bahía accept players staying in Punta Mita villas, not only Four Seasons and St. Regis guests. We are partners with the peninsula's official rental agency — they curate the stay, we curate the golf. For a group, it is usually the cheaper way in and always the better one.",

  heroPhoto: "/images/punta-mita/punta-mita-golfers-coastal-tee.webp",
  heroAlt:
    "Two golfers on a coastal tee at Punta Mita, with the beach curving away behind them and the Pacific to the left.",

  ctaPrimary: "Start a proposal",
  ctaNote: "Pablo builds it inside 48 hours. No call required.",

  accessLabel: "Access",
  accessH2Pre: "The gate is real.",
  accessH2Em: "The room is not the only key.",
  accessParagraphs: [
    "Punta Mita is a private peninsula, and the gate does not open for a tee time. That much is true and it is why the round is genuinely uncrowded. What is not true is that the Four Seasons is the only way through it.",
    "Pacífico and Bahía also accept outside players through Punta Mita villa rentals — coordinated by a golf concierge rather than by the resort front desk. That is the door we hold. We are partners with the peninsula's official rental agency: they handle the villa, we handle the golf.",
    "For one or two players, the room is usually simpler. From about four rooms or eight players, the villa route starts to win on price and stops being close.",
  ],

  includedLabel: "What you get",
  includedH2Pre: "One booking,",
  includedH2Em: "not five reservations.",
  included: [
    ["Golf", "Tee times at Pacífico and Bahía, arranged as part of the stay rather than requested against it."],
    ["The villa", "Through the peninsula's official rental agency — inside the gate, with the golf built around it."],
    ["Ground transport", "Airport pickup and movement on the peninsula. PVR to the gate is about 45 minutes."],
    ["A private chef", "Dinner at the villa when you want the night back instead of a restaurant reservation."],
    ["Carts", "Included with some villas. Where they are not, cart rental runs about $20 USD per day."],
    ["The format", "Scorecards printed, groups drawn, prizes set — before anyone tees off."],
  ],

  addOnLabel: "Add-ons",
  addOnH2Pre: "Want more",
  addOnH2Em: "than two rounds?",
  addOnBody:
    "Mandarina and Higuera sit just beyond the peninsula, and both are bookable without a Punta Mita key. We price them simply: the public green fee plus a $100 USD service fee per player. No markup buried in the room rate.",

  tournamentLabel: "The format",
  tournamentH2Pre: "Eight players",
  tournamentH2Em: "is not an accident.",
  tournamentParagraphs: [
    "A group of eight splits cleanly into two foursomes — and it is the right number for the Sprinter, which matters more than it sounds like it should.",
    "Day one is a straight 18-hole qualifier, with whatever wager the group prefers. Whoever comes out ahead forms the honor foursome; the rest make up the back foursome. From day two it is match play — top seed against bottom, and down the list. Six-hole matches, best of three, all inside one round of 18.",
    "By the end you have a real winner instead of eight separate rounds of golf. The course is the course. What we control is everything around it.",
  ],

  itineraryLabel: "A sample two days",
  itineraryH2Pre: "What the trip",
  itineraryH2Em: "actually looks like.",
  itinerary: [
    {
      day: "Day one",
      body: "Check the tide app the night before and take an early tee time at Pacífico, timed to the 3B window. Lunch at the Surf Club after the round, a paddleboard lesson, then time to rest. Skip the restaurant that night — have the private chef put together ceviche and pescadillas back at the villa.",
    },
    {
      day: "Day two",
      body: "A later start: 9 or 10 AM at Bahía. Early risers can add a 5K to Café Mita before the round. Match play begins here, so the scorecards matter.",
    },
  ],

  sectionPhotos: [
    {
      src: "/images/punta-mita/punta-mita-clubhouse-terrace-course-view.webp",
      alt: "A shaded clubhouse terrace at Punta Mita looking out over the course, with palms and the ocean beyond.",
      caption: "Punta Mita peninsula",
    },
    {
      src: "/images/punta-mita/punta-mita-sunset-fairway-palms.webp",
      alt: "Sunset over a Punta Mita fairway, palms in silhouette against the light.",
      caption: "Punta Mita peninsula",
    },
    {
      src: "/images/punta-mita/punta-mita-practice-range-balls.webp",
      alt: "A pyramid of range balls on the practice facility at Punta Mita, with the course and mountains behind.",
      caption: "The practice range",
    },
  ],

  honestyIcon: "🎯",
  honestyLabel: "Who this is not for",
  honestyBody:
    "This page is written for someone planning a golf trip. If you want to rent a house in Punta Mita and have no interest in the golf, we are not the right people to call — the rental agency is. And if you had Cabo in mind and end up here because of how we talk about this place, that is a good outcome for everyone.",

  faqs: [
    {
      q: "Can I play golf in Punta Mita without staying at Four Seasons or St. Regis?",
      a: "Yes. Pacífico and Bahía accept outside players through Punta Mita villa rentals, typically coordinated by a golf concierge rather than by the resort directly. What does not work is arriving without a confirmed stay — the peninsula gate requires one.",
    },
    {
      q: "What is included in a Punta Mita golf package with Golf in Mexico?",
      a: "Green fees at both courses, villa accommodation, ground transport, and a private chef — coordinated as one booking instead of separate reservations. Add-on rounds at Mandarina or Higuera are the public green fee plus a $100 USD service fee per player.",
    },
    {
      q: "How many players do I need for group pricing at Punta Mita?",
      a: "Group savings start to apply at roughly four rooms or eight players. Eight is also the number the format is built around: two foursomes, and the right size for one Sprinter.",
    },
    {
      q: "Is golf cart rental available separately in Punta Mita?",
      a: "Some villas include carts. Where they do not, cart rental runs about $20 USD per day. Carts on the course itself are part of the round.",
    },
    {
      q: "How much does it cost to play golf in Punta Mita?",
      a: "Green fees at Pacífico and Bahía run $325 to $400 USD per round for resort guests, varying by season and course. Villa-based group bookings typically cost less per person than booking rooms individually, which is the reason the eight-player number keeps coming up.",
    },
  ],

  closingH2Pre: "Send the dates.",
  closingH2Em: "We will price the whole trip.",
  closingBody:
    "Tell us when and how many. You get one proposal covering the villa, both courses, the transfers, and the format — priced as a trip, because that is what you are buying.",

  relatedReads: [
    {
      to: "/destinations/punta-mita/pacifico-bahia",
      anchor: "Pacífico versus Bahía",
      note: "Which of the two courses suits your game, and what the Tail of the Whale actually requires.",
    },
    {
      to: "/destinations/punta-mita",
      anchor: "the full Punta Mita and Riviera Nayarit guide",
      note: "All five courses on the corridor, green fees, and the calendar.",
    },
  ],
};

export const ALL_LANDINGS = [PACIFICO_BAHIA, STAY_AND_PLAY];

export const getLandingData = (hub, slug) =>
  ALL_LANDINGS.find((l) => l.hub === hub && l.slug === slug);

export const landingPath = (l) => `/destinations/${l.hub}/${l.slug}`;

export default ALL_LANDINGS;
