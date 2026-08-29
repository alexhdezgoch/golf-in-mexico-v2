/* ═══════════════════════════════════════════════════════════════════
   Content for the three bookable package pages (Cancun, Los Cabos, Puerto
   Vallarta) — rendered by pages/packages/PackageBookingPage.jsx, which ports
   Pablo's actual page (design/copy/JS) rather than the site's own component
   system. See that file's header for why.

   Prices are Pablo's own real quotes, adapted per region — confirmed
   directly by him, 2026-08-29: "Los precios si mantenlos. Son sumas que
   trabaje con cotizaciones reales y adaptado al mercado que quiero atacar en
   cada region." Not indicative placeholders.

   Savings copy is his exact requested wording, 2026-08-29: "En el box
   pongamos Typically savings $750 per person in GIM Packages."
   ═══════════════════════════════════════════════════════════════════ */

const PERKS = ["Better Tee Time Rates", "Airport Pick-Up", "Full-Time Concierge"];

export const CANCUN = {
  hub: "cancun-riviera-maya",
  hubName: "Cancun · Riviera Maya",
  canonical: "/destinations/cancun-riviera-maya/golf-packages",
  seoTitle: "Cancun Golf Packages — Book Your Golf Trip | Golf in Mexico°",
  seoDescription:
    "A Cancun golf trip priced, assembled and booked by a former PGA Tour agent. Three package tiers, airport transfer included, all three Cancun courses in one trip.",

  heroLabel: "Cancún",
  h1: "Cancún Golf Package — Book Your Golf Trip with Our Exclusive Perks",
  heroSub:
    "We have tailored a golf trip designed to deliver maximum value for your Cancun golf trip—priced, assembled, and booked directly by a former PGA Tour agent rather than a call center representative reading from a rate card.",
  perks: PERKS,
  heroPhotos: [
    "/images/cancun/bunker-blast.webp",
    "/images/cancun/resort-pool.webp",
    "/images/cancun/green-flag.webp",
    "/images/cancun/pot-bunker.webp",
    "/images/cancun/putting-green.webp",
  ],

  filmLede: "All-inclusive resorts bundle golf into the room rate. The all-inclusive arbitrage is the entire game here.",
  filmLabel: "Cancún, golf-side.",

  tiers: [
    {
      name: "Luxury Stay", tag: "5 Star Hotels",
      desc: "Premium hotels, fine dining and the best courses.",
      price: "$4,900", priceUnit: "Per person",
      features: ["Top region courses", "5-star hotels", "Fine dining", "Private Driver", "Golf Concierge 24/7"],
    },
    {
      name: "Golf Every Day", tag: "Pure Championship Golf",
      desc: "Built for the group that came to play, not to lounge.",
      price: "$3,900", priceUnit: "Per person",
      features: ["Top region courses", "Premium Airbnb or Hotel", "Local Cuisine & Spots", "Airport Pickup", "Golf Concierge 24/7"],
    },
    {
      name: "Golf & Beach", tag: "Value for Price",
      desc: "For the trip that isn't only about golf.",
      price: "$2,200", priceUnit: "Per person",
      features: ["Value-tier courses", "Boutique stay", "Shared ground transport", "Local dining picks", "Beach & resort days built in"],
    },
  ],

  faqs: [
    { q: "How many courses can I combine in one trip?", a: "Most groups play two to three rounds across 4 nights. All three Cancún courses can be combined in a single trip — we sequence them so you're not backtracking across the region." },
    { q: "What's the best season to play Cancún golf?", a: "November through April is peak season — cooler temperatures, firmer greens, higher rates. May through October runs cheaper with a higher chance of afternoon rain; mornings are still reliably playable." },
    { q: "Is airport transfer included?", a: "Yes, on every package tier — round-trip transfer between Cancún International Airport and your resort is built into the price shown above." },
  ],

  guideLinkText: "Check Out Our Golf in Riviera Maya Destination Guide",
  guideLinkHref: "/destinations/cancun-riviera-maya",
  dockMsg: "Preferred access · Morning tee times · Private transport",
};

export const LOS_CABOS = {
  hub: "los-cabos",
  hubName: "Los Cabos",
  canonical: "/destinations/los-cabos/golf-packages",
  seoTitle: "Cabo Golf Packages — Book Your Golf Trip | Golf in Mexico°",
  seoDescription:
    "A Los Cabos golf trip priced, assembled and booked by a former PGA Tour agent. Three package tiers across a 20-mile corridor of Nicklaus, Woods, Norman and Fazio designs.",

  heroLabel: "Los Cabos",
  h1: "Cabo Golf Package — Book Your Golf Trip with Our Exclusive Perks",
  heroSub:
    "We have tailored a golf trip designed to deliver maximum value for your Cabo golf trip—priced, assembled, and booked directly by a former PGA Tour agent rather than a call center representative reading from a rate card.",
  perks: PERKS,
  heroPhotos: [
    "/images/0wyp4brb-cabo-photo.webp",
    "/images/d3b1vfc5-gim-stills-36.webp",
    "/images/w9zxd211-palmilla.webp",
    "/images/0vavic1n-solmar-links.webp",
  ],

  filmLede: "Cabo holds Mexico's highest concentration of signature oceanfront golf. Book it once, repeat it every year.",
  filmLabel: "Los Cabos, golf-side.",

  tiers: [
    {
      name: "Luxury Stay", tag: "5 Star Hotels",
      desc: "Premium hotels, fine dining and the best courses.",
      price: "$5,580", priceUnit: "Per Person",
      features: ["Top region courses", "5-star hotels", "Fine dining", "Private Driver", "Golf Concierge 24/7"],
    },
    {
      name: "Golf Every Day", tag: "Pure Championship Golf",
      desc: "Built for the group that came to play, not to lounge.",
      price: "$3,900", priceUnit: "Per person",
      features: ["Top region courses", "Premium Airbnb or Hotel", "Local Cuisine & Spots", "Airport Pickup", "Golf Concierge 24/7"],
    },
    {
      name: "Golf & Beach", tag: "Value for Price",
      desc: "For the trip that isn't only about golf.",
      price: "$2,500", priceUnit: "Per person",
      features: ["Value-tier courses", "Boutique stay", "Shared ground transport", "Local dining picks", "Beach & resort days built in"],
    },
  ],

  faqs: [
    { q: "Can I play the signature courses if I'm not staying at the right resort?", a: "Access is arranged through our relationships — ask us before assuming a course is unavailable." },
    { q: "Why do so many golfers choose Los Cabos?", a: "Three courses on Golf Digest's World 100 Greatest list. Seven of Mexico's top 10 courses. Championship designs by Nicklaus, Woods, Norman, Love III and Fazio — in one 20-mile corridor. 350 sunny days a year (Los Cabos Tourism Board). Direct flights from 30+ US cities — the flight from LAX is under three hours, shorter than driving from Los Angeles to Palm Springs." },
    { q: "Is it safe to travel to Los Cabos?", a: "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent security infrastructure — the destination has invested close to $50 million in security upgrades and operates a real-time network with local hotels. Standard travel precautions apply, as with any international destination. The 38% repeat-visitor rate among luxury travelers is one of the strongest signals of destination confidence." },
  ],

  guideLinkText: "Check Out Our Golf in Cabo Destination Guide",
  guideLinkHref: "/destinations/los-cabos",
  dockMsg: "Preferred access · Morning tee times · Private transport",
};

export const PUERTO_VALLARTA = {
  hub: "puerto-vallarta",
  hubName: "Puerto Vallarta",
  canonical: "/destinations/puerto-vallarta/golf-packages",
  seoTitle: "Puerto Vallarta Golf Packages — Book Your Trip | Golf in Mexico°",
  seoDescription:
    "A Puerto Vallarta golf trip priced and booked by a former PGA Tour agent. Seven courses within 45 minutes of PVR, including the Mexico Open venue at Vidanta.",

  heroLabel: "Puerto Vallarta",
  h1: "Puerto Vallarta Golf Package — Book Your Golf Trip with Our Exclusive Perks",
  heroSub:
    "We have tailored a golf trip designed to deliver maximum value for your Puerto Vallarta golf trip — priced, assembled, and booked directly by a former PGA Tour agent rather than a call center representative reading from a rate card.",
  perks: PERKS,
  heroPhotos: [
    "/images/puerto-vallarta/fairway-walk.webp",
    "/images/puerto-vallarta/eighteenth-green-sunset.webp",
    "/images/puerto-vallarta/clubhouse-dusk.webp",
    "/images/puerto-vallarta/mexico-open-lake.webp",
    "/images/4snhxxzm-e8cf1585-fc08-494c-ad51-ecf8f27b8f26-1-105-c.webp",
  ],

  filmLede: "Puerto Vallarta holds the region's only PGA Tour venue, plus Nicklaus and Weiskopf side by side at Vista Vallarta. Book it once, repeat it every year.",
  filmLabel: "Puerto Vallarta, golf-side.",

  tiers: [
    {
      name: "Luxury Stay", tag: "5 Star Hotels",
      desc: "Premium hotels, fine dining and the best courses — including the PGA Tour venue at Vidanta.",
      price: "$4,450", priceUnit: "Per Person",
      features: ["Vidanta Norman Course + Vista Vallarta", "5-star hotels", "Fine dining", "Private Driver", "Golf Concierge 24/7"],
    },
    {
      name: "Golf Every Day", tag: "Pure Championship Golf",
      desc: "Built for the group that came to play, not to lounge.",
      price: "$3,150", priceUnit: "Per person",
      features: ["Vista Vallarta (Nicklaus & Weiskopf)", "Premium Airbnb or Hotel", "Local Cuisine & Spots", "Airport Pickup", "Golf Concierge 24/7"],
    },
    {
      name: "Golf & Beach", tag: "Value for Price",
      desc: "For the trip that isn't only about golf.",
      price: "$1,950", priceUnit: "Per person",
      features: ["Marina Vallarta or Flamingos", "Boutique stay", "Shared ground transport", "Local dining picks", "Beach & resort days built in"],
    },
  ],

  faqs: [
    { q: "Can I play the signature courses if I'm not staying at the right resort?", a: "Access is arranged through our relationships — ask us before assuming a course is unavailable." },
    { q: "Why do so many golfers choose Puerto Vallarta?", a: "Seven courses across three zones, including the only active PGA Tour venue in Puerto Vallarta — the Vidanta Norman Course, host of the Mexico Open since 2022. Signature designs by Jack Nicklaus, Tom Weiskopf, Greg Norman, Robert von Hagge, Joe Finger, and Percy Clifford, all within 45 minutes of PVR airport. The dry season (Nov–May) delivers consistent, near-daily sun." },
    { q: "Is it safe to travel to Puerto Vallarta?", a: "Yes. Puerto Vallarta and the Riviera Nayarit corridor are among Mexico's most established tourist destinations, with a resort and golf infrastructure built over decades. Standard travel precautions apply, as with any international destination." },
  ],

  guideLinkText: "Check Out Our Puerto Vallarta Golf Destination Guide",
  guideLinkHref: "/destinations/puerto-vallarta",
  dockMsg: "Preferred access · Morning tee times · Private transport",
};

/* Punta Mita has no pricing-tier carousel in Pablo's source — instead a
   cost-comparison table, a $1,500 savings banner, a 3-course proof grid and
   a two-operator (GIM / Punta Mita Rentals) transparency section. Different
   shape, so it gets its own fields rather than reusing `tiers`. Rendered by
   pages/packages/PuntaMitaPackagePage.jsx. Source: Pablo's
   golf-in-mexico-punta-mita.html, 2026-08-29. */
export const PUNTA_MITA = {
  hub: "punta-mita",
  hubName: "Punta Mita",
  canonical: "/destinations/punta-mita/golf-packages",
  seoTitle: "Punta Mita Golf Packages — Book Your Golf Trip | Golf in Mexico°",
  seoDescription:
    "A Punta Mita golf trip priced, assembled and booked by a former PGA Tour agent. Private villas, 36 holes of Jack Nicklaus, and full concierge service on one peninsula.",

  heroLabel: "Punta Mita",
  h1: "Punta Mita Golf — Book Your Golf Trip with Our Exclusive Perks",
  heroSub:
    "Punta Mita has perfected the golf trip for 25+ years. Private villas, in-home dining, airport transport, and full service—priced, assembled, and booked directly by a former PGA Tour agent.",
  perks: ["Exclusive PM Partner", "Better Tee Time Rates", "Airport Pick-Up", "Full-Time Concierge"],
  heroPhotos: [
    "/images/punta-mita/package/hero-coastline-aerial.webp",
    "/images/punta-mita/package/hero-tour-action.webp",
    "/images/punta-mita/package/hero-oceanfront-hole.webp",
    "/images/punta-mita/package/hero-palm-green.webp",
    "/images/punta-mita/package/hero-tail-whale-sunset.webp",
  ],

  filmLede: "Punta Mita is home to 100+ private villas and condos—and the operation behind them is what sets it apart.",
  filmLabel: "Punta Mita, inside the gate.",
  filmVideoId: "PGII_IMCWmM",
  filmWidePhoto: "/images/punta-mita/package/film-wide-inside-gate.webp",
  filmTall: [
    { photo: "/images/punta-mita/package/film-villa.webp", label: "The Villa" },
    { photo: "/images/punta-mita/package/film-pacifico.webp", label: "Pacífico" },
    { photo: "/images/punta-mita/package/film-bahia.webp", label: "Bahía" },
    { photo: "/images/punta-mita/package/film-table.webp", label: "The Table" },
    { photo: "/images/punta-mita/package/film-group.webp", label: "The Group" },
  ],

  costTable: {
    rows: [
      { label: "Flights", gim: "$300–$520", hotel: "Same either way" },
      { label: "Accommodation", gim: "$1,140", hotel: "$2,200–$6,000" },
      { label: "Green fees", gim: "$760", hotel: "$1,000" },
      { label: "Club rentals", gim: "$150", hotel: "$150" },
      { label: "Caddies & carts", gim: "$210", hotel: "$210" },
      { label: "Ground transport", gim: "$0", hotel: "$0" },
      { label: "Food", gim: "$790", hotel: "$1,200" },
    ],
    total: { label: "Total", gim: "$3,460 avg", hotel: "$7,070 avg" },
  },
  savingsTarget: 1500,
  savingsLabel: "Save $1,500+ per person when booking with Golf in Mexico",

  proofHeading: "36 holes of Jack Nicklaus. One private peninsula.",
  proofCards: [
    { photo: "/images/punta-mita/package/proof-tail-whale.webp", title: "Tail of the Whale", caption: "Pacífico · 3B — the only natural island green in golf" },
    { photo: "/images/punta-mita/package/proof-bahia-oceanfront.webp", title: "Bahía Oceanfront", caption: "Bahía · Nicklaus signature along Banderas Bay" },
    { photo: "/images/punta-mita/package/proof-villa-base.webp", title: "The Villa Base", caption: "100+ private villas · full staff · beach club" },
  ],

  faqs: [
    { q: "How much does it cost to play golf in Punta Mita?", a: "Green fees run $325–$400 per round for hotel guests, varying by season and course. Villa-based group bookings cost less per person." },
    { q: "What is included in a Punta Mita golf package with Golf in Mexico?", a: "Green fees at both courses, villa accommodation, ground transport, and a private chef — meals at the beach club included. We provide a real all-inclusive experience, not just green fees and accommodation." },
    { q: "Can I play golf in Punta Mita without staying at one of the resort hotels?", a: "Yes. Pacífico and Bahía are accessible through Punta Mita Properties rentals, coordinated by a golf concierge." },
    { q: "How many players do I need for group pricing at Punta Mita?", a: "Group savings start to apply around 4 players — and scale from there." },
  ],

  guideLinkText: "Check Out Our Golf in Punta Mita Destination Guide",
  guideLinkHref: "/destinations/punta-mita",
  dockMsg: "Preferred access · Morning tee times · Private transport",
};

export const PACKAGE_PAGES = [CANCUN, LOS_CABOS, PUERTO_VALLARTA];
