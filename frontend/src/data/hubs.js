/* ═══════════════════════════════════════════════════════════════════
   HUB DATA — All destination hubs follow the same schema.
   Used by /components/hub/HubLayout.jsx
   ═══════════════════════════════════════════════════════════════════ */

const credentials = ["PGA TOUR", "LIV GOLF", "MEXICO OPEN AT VIDANTA", "WWT CABO 2024"];

const LOS_CABOS = {
  slug: "los-cabos",
  name: "Los Cabos",
  region: "Baja California Sur",
  heroPhoto: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wyp4brb_CABO%20PHOTO.png",
  heroLabel: "Destination Guide · Los Cabos",
  h1Pre: "Golf in",
  h1Em: "Cabo San Lucas.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "23",        label: "Courses" },
    { num: "20 mi",     label: "Corridor" },
    { num: "$200–$500", label: "Green fees" },
    { num: "Oct – May", label: "Best months" },
  ],
  heroAnswer:
    "Los Cabos features 23 active championship golf courses and 5 more currently under construction along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Green fees range from $200 to $500 USD per round, with peak conditions running from October through May.",

  quickFacts: [
    { icon: "flag",      label: "Courses",        value: "23 active · 5 under construction" },
    { icon: "pencil",    label: "Designers",      value: "Nicklaus · Woods · Norman · Love III · Fazio · Eckenrode · Couples" },
    { icon: "dollar",    label: "Green fees",     value: "$200 – $500 USD per round" },
    { icon: "calendar",  label: "Best months",    value: "October – May" },
    { icon: "alert",     label: "Avoid",          value: "August – September (hurricane + rain peak)" },
    { icon: "plane",     label: "Airport",        value: "Los Cabos International (SJD)" },
    { icon: "plane",     label: "Private FBO",    value: "SJD dedicated terminal · CSL" },
    { icon: "globe",     label: "Languages",      value: "English & Spanish (all course staff)" },
    { icon: "person",    label: "Caddie",         value: "Mandatory at Tier-1 · Recommended corridor-wide" },
    { icon: "dollar",    label: "USD",            value: "Accepted everywhere on the corridor" },
  ],

  overviewLabel: "The corridor",
  overviewH2Pre: "Los Cabos golf —",
  overviewH2Em: "what you need to understand first.",
  overviewParagraphs: [
    "Los Cabos is not just a destination; it is a high-demand, ultra-premium golf ecosystem located at the southern tip of the Baja California Peninsula. Where the mountains clash directly with the shoreline, signature architects have carved out a paradise that moved over 329,500 air passengers in January 2025 alone. The region commands incredible loyalty among luxury travelers, posting an elite 38% repeat-visitor rate.",
    "The market splits into three distinct zones. San José del Cabo operates at a peaceful 63% hotel occupancy, offering a cultural backdrop. Cabo San Lucas runs hotter at 79% occupancy, centered around the marina and active nightlife. The real center of gravity for championship golf is The Tourist Corridor — this exclusive strip commands a luxury-segment ADR of $795 USD and hosts the vast majority of top-tier tracks.",
    "Eight championship layouts from Nicklaus, Woods, Norman, and Love III anchor a corridor that stretches 20 miles between the two towns. The terrain is the differentiator: Pacific cliffside holes at Quivira, links-style dunes at Diamante, desert arroyos at Club Campestre, coastal finishes at Puerto Los Cabos. No other destination in Mexico puts this variety inside a 20-mile stretch.",
  ],
  overviewStats: [
    { num: "329,500", label: "Air passengers Jan 2025" },
    { num: "38%",     label: "Repeat visitors" },
    { num: "$795",    label: "Luxury ADR corridor" },
    { num: "20 mi",   label: "Corridor" },
  ],

  playbookH3Pre: "Cabo, distilled —",
  playbookH3Em: "free.",
  playbookBody: "Our 2026 Playbook. Course notes, access codes, a 4-day itinerary. Built inside the corridor.",

  photoStrip: [
    { label: "Quivira Golf Club · Pacific Cliffs" },
    { label: "The Corridor · Cabo San Lucas" },
    { label: "Diamante · Dunes Course" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Nine courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "From Nicklaus to Tiger Woods — the complete field guide to the best golf in Cabo San Lucas, with our editorial difficulty rating and access notes.",
  courses: [
    { tier: "resort",  fee: "$395 – $450", name: "Quivira Golf Club",            difficulty: "4/5", bestFor: "Cliffside ocean holes",         specs: "Jack Nicklaus · Par 72 · Championship",                  note: "The crown jewel of the corridor. Quivira plays along the Pacific cliffs above Cabo San Lucas — every hole delivers an ocean view, climbing out of desert canyons to finish with one of the most photographed closing stretches in North America.",   standout: "#5 — Cliffside par 3, 178 yards hanging directly over the roaring Pacific." },
    { tier: "public",  fee: "$350 – $395", name: "Cabo del Sol — Ocean Course",   difficulty: "4/5", bestFor: "Iconic back nine, sea views",   specs: "Jack Nicklaus · Par 72 · Championship",                  note: "The legendary layout that put Los Cabos golf on the global map. The back nine runs along the Sea of Cortez, with three holes playing directly on the water's edge.",                                                                                  standout: "#17 — A dramatic signature par 3 beside the crashing surf." },
    { tier: "private", fee: "$300 – $375", name: "Diamante — Dunes Course",       difficulty: "3/5", bestFor: "Links experience, dunes",       specs: "Davis Love III · Par 72 · Championship",                 note: "A true links experience framed by massive white sand dunes on the Pacific side of Cabo San Lucas. Walks and plays like a classic British course — with 340 days of sunshine.",                                                                       standout: "#14 — Links-style par 4 cutting through towering natural sand structures." },
    { tier: "private", fee: "$275 – $350", name: "El Cardonal at Diamante",       difficulty: "3/5", bestFor: "Mixed groups, desert design",   specs: "Tiger Woods · Par 72 · Resort-Friendly",                 note: "Tiger Woods' first solo design outside the United States. Wide, forgiving fairways through desert arroyos — highly playable for mixed-handicap groups, with panoramic Pacific views throughout.",                                                  standout: "#6 — Sweeping downhill par 5 with a complete Pacific Ocean backdrop." },
    { tier: "public",  fee: "$250 – $310", name: "Palmilla Golf Club",            difficulty: "3/5", bestFor: "Three nines, historic",         specs: "Jack Nicklaus · Par 72 · Resort-Friendly",               note: "The course that started the modern corridor in 1992 — the first Nicklaus design in Latin America. Three interchangeable nines (Mountain, Arroyo, Ocean) showcasing the native topography.",                                                       standout: "Mountain #4 — Elevated tee shot, deep mountain shadows, distant sea view." },
    { tier: "public",  fee: "$250 – $300", name: "Puerto Los Cabos",              difficulty: "2/5", bestFor: "Two-legend collaboration",      specs: "Jack Nicklaus + Greg Norman · Par 72 · Moderate",        note: "The only routing in Mexico where two legends collaborated. Nicklaus shaped the front nine through desert foothills; Norman designed the coastal back nine.",                                                                                       standout: "#18 — Norman's finishing hole running parallel to the marina and coastline." },
    { tier: "public",  fee: "$200 – $260", name: "Club Campestre San José",       difficulty: "2/5", bestFor: "Best value on corridor",        specs: "Nicklaus Design · Par 72 · Moderate",                    note: "Best value on the corridor. Weaves through rugged desert arroyos with the Sierra de la Laguna mountains framing every shot. The truest sense of Baja's inland topography.",                                                                       standout: "#7 — Demanding approach over a deep arroyo crossing." },
    { tier: "private", fee: "$350 – $400", name: "Twin Dolphin Golf Club",        difficulty: "4/5", bestFor: "Tournament greens, canyon",     specs: "Todd Eckenrode + Fred Couples · Par 72 · Championship",  note: "Built on the historic grounds of the original Twin Dolphin Hotel. Incredible elevation changes and tournament-level greens — the Sea of Cortez visible from almost every tee.",                                                          standout: "#3 — Par 3 playing directly across a jagged canyon." },
    { tier: "resort",  fee: "$300 – $360", name: "Solmar Golf Links",              difficulty: "3/5", bestFor: "Pacific links, underrated gem", specs: "Greg Norman · Par 72 · Resort-Friendly",                 note: "An underrated true links experience on the Pacific. Several holes play right on the ocean — parts of the movie Troy were filmed in the surrounding cliffs. Top-notch amenities and smaller crowds than it deserves.",                                              standout: "Pacific stretch — links holes hanging directly over the Pacific Ocean." },
  ],

  costsLabel: "The math",
  costsH2Pre: "Here is exactly",
  costsH2Em: "what you will spend.",
  costsIntro: "Standard Cabo golf packages often cloud the true cost by hiding mandatory fees and customary incidentals. Here is what a realistic 4-night, 3-round golf trip looks like mid-season — no surprises.",
  costs: [
    ["Flights (commercial)",     "$280",   "$550",    "Direct: LAX · DFW · HOU"],
    ["Accommodation (4 nights)", "$600",   "$2,400",  "Double occ. · Corridor: $795/night"],
    ["Green fees (3 rounds)",    "$650",   "$1,200",  "Elite cliffside + arroyo mix"],
    ["Caddie tips",              "$120",   "$180",    "$40–$60/bag/round standard"],
    ["Club rentals (optional)",  "$0",     "$200",    "Premium sets at all pro shops"],
    ["Ground transport",         "$80",    "$250",    "Shuttle vs. private SUV"],
    ["Food & beverage",          "$300",   "$800",    "Top properties: all-inclusive stations"],
    ["Total all-in (per person)","$2,030", "$5,580",  "Mid-season estimate · 4 nights, 3 rounds"],
  ],
  callouts: [
    { icon: "💡", label: "The luxury variable",   body: "Your choice of base camp heavily dictates the financial footprint. While a hotel in Cabo San Lucas averages $319/night and San José averages $303, stepping into the gated Corridor properties moves your baseline to $795/night. However, premium courses like Quivira and Twin Dolphin completely change the value equation by bundling gourmet food and top-shelf liquor stations into the green fee." },
    { icon: "🌅", label: "The twilight advantage", body: "Afternoon booking windows (typically 1:00 or 2:00 PM) unlock 30–50% price reductions. During the spring shoulder months, an early afternoon tee time lets you finish all 18 holes before sunset while keeping budgets intact." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and between courses.",
  logistics: [
    { icon: "plane",    title: "Airport + arrivals",   body: "SJD International handles 82.9% of US traffic — Los Angeles (12.5%), Dallas (10.7%), Phoenix (10.5%). SJD handled 2,000+ private operations in January 2025 with its own dedicated FBO terminal. Several Corridor resorts arrange direct tarmac-to-villa transfers." },
    { icon: "car",      title: "Getting to courses",   body: "The Corridor stretches 20 miles along Highway 1. Most courses: 15–30 min from SJD. Pre-arranged private SUV transfers are the standard for traveling golfers. Uber is legal but frequently restricted from entering the deep security gates of elite private clubs." },
    { icon: "map",      title: "Between courses",     body: "The Corridor holds the majority of top-tier courses. Build 45 minutes into your schedule for mid-day traffic. San José del Cabo: cultural backdrop, quieter evenings. Cabo San Lucas: marina, nightlife, 79% hotel occupancy." },
    { icon: "dollar",   title: "Currency + tips",      body: "USD accepted everywhere on the golf corridor. Caddie tips: $40–$60/round standard. Restaurants: 15–20% expected. ATMs available for pesos if preferred. Los Cabos is among the safest tourist destinations in Mexico — excellent security corridor-wide." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",       sub: "Nov – Apr · 72–82°F · High Crowds · $$$",  body: "The window. Clear skies, low humidity, manageable winds. Every course delivers its best conditions — which is why serious golfers plan their Los Cabos trips for winter and book the flight first, the tee time second." },
    { title: "Shoulder Season",   sub: "May – Jun · 82–90°F · Moderate · $$",       body: "The value play. Warmer but very playable with early tee times. Courses are quieter, and many resorts fold golf into the room rate. If you can take the heat, the math is hard to beat." },
    { title: "Summer / Hurricane",sub: "Jul – Oct · 85–95°F · Low Crowds · $",      body: "The off-season trade: dramatic discounts, but humidity, afternoon storms, and occasional hurricane risk. Mornings can still be excellent. Flexibility is the price of admission." },
  ],

  faqs: [
    { q: "What is the best time of year to play golf in Los Cabos?",   a: "Peak season runs November through April — dry, warm (72–82°F), almost no rain. For the best balance of weather and value, late October and May are the sharpest shoulder months: great conditions, fewer crowds, better rates." },
    { q: "How much does a golf trip to Los Cabos cost?",                a: "A realistic trip (4 nights, 3 rounds) runs roughly $2,200 on the budget end to $5,500+ at the luxury end. The main variables are hotel tier and which courses you choose. Green fees alone range from $200 to $450 per round." },
    { q: "Which is the best course in Los Cabos?",                       a: "Quivira, Cabo del Sol Ocean, and Diamante Dunes are on the same tier. The 'best' depends on what you're after — links, desert, or coastal golf. Play all three and you'll have an opinion." },
    { q: "Do I need to bring my own golf clubs?",                        a: "Not necessarily. Most courses offer premium rentals for $50–$75 per round. Airlines typically charge $35–$50 each way for a golf bag." },
    { q: "Are the courses walkable?",                                    a: "Most are cart-mandatory or strongly cart-recommended. Desert terrain, elevation changes, and distances make walking impractical. Cliffside layouts are not walkable." },
    { q: "Is it safe to travel to Los Cabos?",                           a: "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent infrastructure and security." },
    { q: "Why do so many golfers choose Los Cabos?",                     a: "Championship courses from Nicklaus, Woods, Norman, Love III. 340 days of sunshine. Dramatic terrain. Direct flights from 30+ US cities. The flight from LAX is shorter than the one to Palm Springs." },
    { q: "Do I need to tip caddies?",                                    a: "Yes — expected and important to their income. Standard: $30–$60 USD per bag per round. Tip accordingly." },
  ],

  credentials,
};

/* ─────────── PUNTA MITA ─────────── */

const PUNTA_MITA = {
  slug: "punta-mita",
  name: "Punta Mita",
  region: "Riviera Nayarit",
  heroPhoto: null,
  heroLabel: "Destination Guide · Punta Mita",
  h1Pre: "Golf in",
  h1Em: "Punta Mita.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "3",          label: "Courses" },
    { num: "Private",    label: "Peninsula" },
    { num: "$325–$395",  label: "Green fees" },
    { num: "Nov – May",  label: "Best months" },
  ],
  heroAnswer:
    "Punta Mita is a closed private peninsula north of Puerto Vallarta. Two Jack Nicklaus courses live behind the gate — Pacifico and Bahia — joined by Greg Norman's Mandarina just outside. Green fees run $325 to $395 per round; access is limited to Four Seasons, St. Regis, and residence guests. Pacifico's Tail of the Whale is the only natural island green in golf.",

  quickFacts: [
    { icon: "flag",      label: "Courses",      value: "3 (peninsula + adjacent Mandarina)" },
    { icon: "pencil",    label: "Designers",    value: "Jack Nicklaus (Pacifico, Bahia) · Greg Norman (Mandarina)" },
    { icon: "dollar",    label: "Green fees",   value: "$325 – $395 USD per round" },
    { icon: "calendar",  label: "Best months",  value: "November – May" },
    { icon: "alert",     label: "Avoid",        value: "August – October (rain + hurricane window)" },
    { icon: "plane",     label: "Airport",      value: "Puerto Vallarta International (PVR)" },
    { icon: "globe",     label: "Languages",    value: "English & Spanish" },
    { icon: "person",    label: "Caddie",       value: "Provided with every round (Four Seasons policy)" },
    { icon: "dollar",    label: "USD",          value: "Accepted everywhere on the peninsula" },
  ],

  overviewLabel: "The peninsula",
  overviewH2Pre: "Punta Mita golf —",
  overviewH2Em: "the closed-gate experience.",
  overviewParagraphs: [
    "Punta Mita is a 1,500-acre private peninsula 45 minutes north of Puerto Vallarta International. The gate is the differentiator: no public day-pass exists, and entry is restricted to Four Seasons, St. Regis, and private-residence guests. The result is a routing that is genuinely uncrowded — a rare condition at this price tier in Mexico.",
    "Pacifico is the dramatic course: eight holes on the Pacific Ocean, and the legendary 3B optional green known as the Tail of the Whale, the only natural island green in golf, reachable by tender at low tide. Bahia plays slightly inland through tropical jungle and finishes with the only ocean-carry par 5 in Mexico.",
    "Greg Norman's Mandarina opened in 2023 just outside the peninsula gate, accessed via One&Only Mandarina or Rosewood Mandarina — a cliffside design that completes the region's three-course core. Together, these three rounds represent the most concentrated luxury golf trio in the Pacific.",
  ],
  overviewStats: [
    { num: "1,500",   label: "Acre peninsula" },
    { num: "8",       label: "Pacific holes (Pacifico)" },
    { num: "100%",    label: "Resort-only access" },
    { num: "45 min",  label: "From PVR" },
  ],

  playbookH3Pre: "Punta Mita, distilled —",
  playbookH3Em: "free.",
  playbookBody: "Our 2026 Playbook. How to get on Pacifico, Bahia, and Mandarina — plus the room key that unlocks them.",

  photoStrip: [
    { label: "Pacifico · Tail of the Whale" },
    { label: "Punta Mita · Four Seasons Peninsula" },
    { label: "Mandarina · Norman Cliffside" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Three courses",
  coursesH2Em: "behind one gate.",
  coursesIntro: "Two Nicklaus and one Norman — the most concentrated luxury golf trio on Mexico's Pacific coast.",
  courses: [
    { tier: "resort",  fee: "$345 – $395", name: "Pacifico Course",          difficulty: "4/5", bestFor: "The Tail of the Whale",        specs: "Jack Nicklaus · Par 72 · Championship",     note: "Eight holes on the Pacific. The signature 3B optional green sits on a natural island reachable by tender at low tide — the only natural island green in golf. Wind is the defining variable; book early tee times.", standout: "3B Optional — Tail of the Whale, natural island green via tender." },
    { tier: "resort",  fee: "$325 – $375", name: "Bahia Course",             difficulty: "3/5", bestFor: "Ocean-carry par 5 finish",     specs: "Jack Nicklaus · Par 72 · Resort-Friendly",  note: "More forgiving off the tee than Pacifico, weaving through tropical jungle and resort grounds. Finishes with the only ocean-carry par 5 in Mexico — a true risk-reward closer.",                                            standout: "#12 — The only ocean-carry par 5 in Mexico." },
    { tier: "resort",  fee: "$325 – $395", name: "Mandarina Golf Course",     difficulty: "4/5", bestFor: "Cliffside Norman design",       specs: "Greg Norman · Par 72 · Championship",       note: "Norman's 2023 design sits on the cliffs above One&Only Mandarina and Rosewood Mandarina, just outside the Punta Mita gate. Dramatic jungle-to-ocean transitions and the region's newest centerpiece.",                       standout: "#15 — Cliffside par 3 with the Pacific 200 ft below." },
  ],

  costsLabel: "The math",
  costsH2Pre: "What",
  costsH2Em: "you will spend.",
  costsIntro: "Inside the peninsula, the Four Seasons rolls caddies into the green fee. The St. Regis bills them separately. Mandarina is independently priced through One&Only or Rosewood.",
  costs: [
    ["Flights (commercial)",     "$310",   "$580",    "Direct: LAX · DFW · IAH · ORD · SFO"],
    ["Accommodation (4 nights)", "$2,200", "$5,200",  "Four Seasons / St. Regis / Rosewood"],
    ["Green fees (3 rounds)",    "$975",   "$1,185",  "Pacifico + Bahia + Mandarina"],
    ["Caddie tips",              "$120",   "$180",    "$40–$60/bag standard"],
    ["Club rentals (optional)",  "$0",     "$150",    "TaylorMade at the Punta Mita pro shop"],
    ["Ground transport",         "$120",   "$280",    "PVR transfer + peninsula gate"],
    ["Food & beverage",          "$450",   "$1,100",  "Clubhouse + resort dining"],
    ["Total all-in (per person)","$4,175", "$8,675",  "Peak-season estimate · 4 nights, 3 rounds"],
  ],
  callouts: [
    { icon: "🔒", label: "The gate advantage",      body: "The peninsula's closed-gate policy is the entire pricing model. You are paying for the absence of crowds. Pacifico and Bahia routinely run at near-100% utilization at peak — but with only resort guests on the property, the round genuinely walks empty." },
    { icon: "🐳", label: "Tail of the Whale tip",    body: "The optional 3B green is only playable at low tide. Ask the pro shop the night before for tide windows — if your tee time falls inside the window, the experience is unmissable. Otherwise it costs you no shot to skip and play 3A." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and through the gate.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Puerto Vallarta (PVR) — direct from DFW, IAH, LAX, ORD, SFO, PHX, YYZ. Customs typically 30–45 min. PVR has no FBO of Cabo's scale, but private operators handle G-IV and below comfortably." },
    { icon: "car",    title: "Getting to the gate", body: "PVR → Punta Mita gate: 45 min via the Punta de Mita coastal road. Resort transfers are the simplest option; the peninsula's interior shuttle system makes rental cars unnecessary inside the gate." },
    { icon: "map",    title: "Between courses",     body: "Pacifico ↔ Bahia: 5 min inside the peninsula via the resort cart paths. Mandarina: 40 min north of the Punta Mita gate via the coastal road — schedule it as a separate day." },
    { icon: "dollar", title: "Currency + tips",     body: "USD accepted throughout. Tip caddies $40–$60 per round. The peninsula gate requires resort confirmation for entry — bring your reservation number printed or accessible offline." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",        sub: "Dec – Mar · 70–85°F · Very High · $$$",   body: "Christmas through MLK is the most-booked window of the year. Pacifico fills 6–9 months in advance. Pristine conditions, low humidity, almost no rain. Book the room and the rounds together — never separately." },
    { title: "Shoulder Season",    sub: "Apr – May · 75–88°F · Moderate · $$",      body: "The value window. April delivers near-peak conditions with slightly lower demand than spring break. May begins to warm but rooms drop 25–40% off peak rates." },
    { title: "Rain / Hurricane",   sub: "Jun – Oct · 80–94°F · Low · $",            body: "Tropical storms and heavy afternoon rain. Mornings can still play well. Late October opens the season as the hurricane window closes — the sharpest off-season deal." },
  ],

  faqs: [
    { q: "How many golf courses are in Punta Mita?",                       a: "Two on the peninsula itself — Pacifico and Bahia, both Jack Nicklaus designs — and Greg Norman's Mandarina 40 minutes north, accessed via One&Only or Rosewood Mandarina." },
    { q: "Can non-Four Seasons guests play golf in Punta Mita?",            a: "Yes, by booking the St. Regis or a private residence with golf rights. There is no public day-pass — the peninsula is closed to outside play." },
    { q: "What is the difference between Pacifico and Bahia?",              a: "Pacifico runs eight holes on the Pacific and includes the Tail of the Whale island green. Bahia plays inland through jungle and finishes with the only ocean-carry par 5 in Mexico." },
    { q: "What does a Punta Mita golf trip cost all-in?",                   a: "Approximately $4,200 – $8,700 per person for 4 nights and 3 rounds, depending on resort tier. The peninsula's pricing is driven by the room rate, not the green fee." },
    { q: "How far is Punta Mita from Puerto Vallarta airport?",             a: "Forty-five minutes via the Punta de Mita coastal road. Resort transfers are the simplest option; rental cars are unnecessary inside the peninsula." },
    { q: "Is the Tail of the Whale always playable?",                       a: "No — only at low tide. Ask the pro shop the night before for the tide window. If your tee time misses it, you play the standard 3A green and miss the island entirely." },
  ],

  credentials,
};

/* ─────────── MEXICO CITY ─────────── */

const MEXICO_CITY = {
  slug: "mexico-city",
  name: "Mexico City",
  region: "CDMX · Estado de México · Cuernavaca",
  heroPhoto: null,
  heroLabel: "Destination Guide · Mexico City",
  h1Pre: "Golf in",
  h1Em: "Mexico City.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "10+",        label: "Metro courses" },
    { num: "7,350 ft",   label: "Elevation" },
    { num: "$80–$250",   label: "Green fees" },
    { num: "Oct – Apr",  label: "Best months" },
  ],
  heroAnswer:
    "Mexico City carries roughly ten golf courses inside the metropolitan limits, with several more reachable on a 90-minute day trip. At 7,350 feet of elevation the ball flies 8–12% farther than at sea level. Public access is limited — Coral Golf and a handful of pay-and-play options carry the load. This guide covers every CDMX course worth playing and the curated day trip to Tabachines in Cuernavaca.",

  quickFacts: [
    { icon: "flag",      label: "Courses",       value: "~10 in metro + day-trip options" },
    { icon: "pencil",    label: "Designers",     value: "Percy Clifford · Weiskopf · Packard · RTJ Jr. · Doak" },
    { icon: "dollar",    label: "Green fees",    value: "$80 – $250 USD per round" },
    { icon: "calendar",  label: "Best months",   value: "October – April" },
    { icon: "alert",     label: "Avoid",         value: "June – September (afternoon storms)" },
    { icon: "plane",     label: "Airport",       value: "Benito Juárez (MEX) · Toluca (TLC) · Felipe Ángeles (NLU)" },
    { icon: "globe",     label: "Languages",     value: "English & Spanish at major clubs" },
    { icon: "person",    label: "Caddie",        value: "Generally optional; required at older private clubs" },
    { icon: "dollar",    label: "USD",           value: "Partial — pesos preferred" },
  ],

  overviewLabel: "The city",
  overviewH2Pre: "Mexico City golf —",
  overviewH2Em: "altitude, history, and the table.",
  overviewParagraphs: [
    "Mexico City sits at 7,350 feet of elevation in the Valley of México. Every par-4 plays a half-club shorter than the card says. The ball flies 8–12% farther. Wind is rare, dew is daily, and the morning light at the foothills of the Sierra Madre is among the most beautiful golf walks in the country.",
    "The city's golf clusters in three areas. West (Bosques, Lomas Quebradas), south (Coral, Club de Golf México, Pedregal), and the day-trip corridor south to Cuernavaca and Valle de Bravo. Club de Golf México hosted the 1958 World Cup. Chapultepec hosted the WGC-Mexico Championship from 2017 to 2020. Almost every other serious round is member-guest only.",
    "But the real reason to extend the trip past the golf is the table. Pujol, Quintonil, Contramar, Rosetta — Mexico City's restaurant scene is one of the best in the world. Tee off at 7 a.m., be off the course by noon, eat for three hours, and let the city handle the rest.",
  ],
  overviewStats: [
    { num: "7,350 ft", label: "Elevation" },
    { num: "1958",     label: "World Cup at CG México" },
    { num: "2017–20",  label: "WGC at Chapultepec" },
    { num: "10+",      label: "Metro courses" },
  ],

  playbookH3Pre: "CDMX, distilled —",
  playbookH3Em: "free.",
  playbookBody: "Our 2026 Playbook. Which clubs accept member-guest invitations, where to eat after the round, and how to read the altitude.",

  photoStrip: [
    { label: "Club de Golf Chapultepec · WGC era" },
    { label: "CDMX · Valley of México" },
    { label: "Tabachines · Cuernavaca day-trip" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Eight courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "From Coral's public walk-up to Chapultepec's WGC pedigree — the CDMX courses worth your time, plus the Cuernavaca day-trip every visiting golfer should know.",
  courses: [
    { tier: "public",  fee: "$80 – $145",  name: "Coral Golf Club",           difficulty: "2/5", bestFor: "Most accessible round in CDMX",  specs: "Larry Packard · Par 72 · Public",                       note: "The most accessible public round in Mexico City. Walk-up booking, mid-range green fees, and a routing the local golf community actually plays week-to-week. Soft and forgiving for visiting handicaps.",                                  standout: "#13 — Open par 5 with a clear approach window." },
    { tier: "private", fee: "$150 – $250", name: "Club de Golf México",        difficulty: "3/5", bestFor: "Historic parkland walk",         specs: "Percy Clifford · Par 72 · Private",                     note: "Hosted the 1958 World Cup. One of the great mid-century parkland walks in Mexico — towering trees, tight corridors, and a member culture that runs deep. Member-guest only, arranged through the secretary.",                                standout: "#9 — Long uphill par 4 to a deeply guarded green." },
    { tier: "private", fee: "$175 – $250", name: "Club de Golf Chapultepec",   difficulty: "4/5", bestFor: "WGC tournament pedigree",        specs: "Willie Smith / Clifford renovation · Par 72 · Private", note: "Hosted the WGC-Mexico Championship 2017–2020. Tight, historic, inner-city. The course tour pros remember from the WGC era. Member-guest only, never walk-up.",                                                                              standout: "#10 — The par 3 every pro talked about during the WGC." },
    { tier: "private", fee: "$150 – $200", name: "Club de Golf Bosques",       difficulty: "3/5", bestFor: "Private forest routing",          specs: "Percy Clifford · Par 72 · Private",                     note: "A private forest routing west of the city — the closest thing to a parkland course in Mexico. Tall pines, narrow corridors, and a member culture that prefers quiet weekday play.",                                                          standout: "#7 — Sweeping par 5 through old-growth forest." },
    { tier: "private", fee: "$140 – $195", name: "Club de Golf Lomas Quebradas", difficulty: "3/5", bestFor: "Dramatic broken terrain",       specs: "Percy Clifford · Par 72 · Private",                     note: "Clifford's mid-century routing on broken, hilly terrain — the most dramatic shaping of any CDMX private club. Requires accurate iron play; the elevation changes amplify every approach.",                                              standout: "#4 — Steep downhill par 3 with a 30-foot drop." },
    { tier: "resort",  fee: "$165 – $225", name: "Amanali Golf Club",          difficulty: "3/5", bestFor: "Lake course, casita stay",        specs: "Tom Weiskopf · Par 72 · Resort",                        note: "One hour north of the city, Amanali's Weiskopf routing wraps a lake with three par-3s playing directly at the water. Casita stays available for members and invited guests.",                                                              standout: "#16 — Forced carry par 3 over open lake." },
    { tier: "private", fee: "$175 – $235", name: "Bosque Real Country Club",   difficulty: "4/5", bestFor: "Modern minimalist design",        specs: "Tom Doak / Renaissance · Par 72 · Private",             note: "The newest serious routing in CDMX. Doak's minimalist desert-meets-pine design has quickly become the course CDMX's competitive golfers favor for a real test. Member-guest only.",                                                       standout: "#3 — Long par 4 with a Redan-style green complex." },
    { tier: "public",  fee: "$95 – $145",  name: "Tabachines Golf Club",       difficulty: "3/5", bestFor: "Cuernavaca day-trip",            specs: "Percy Clifford · Par 72 · Public",                      note: "Ninety minutes south of CDMX via the Acapulco highway. Clifford's mid-century routing in Cuernavaca — public, walkable, and one of the great Mexican golf day-trips. Tee off at 8, lunch in the clubhouse, back in the city by 4.", standout: "#11 — Volcanic ridge par 4 with the Tepozteco backdrop." },
  ],

  costsLabel: "The math",
  costsH2Pre: "What",
  costsH2Em: "you will spend.",
  costsIntro: "CDMX is the most affordable championship golf in Mexico. Coral runs under $150 all-in. Private clubs require a member host but pricing remains reasonable by international standards. Tabachines day-trip in Cuernavaca runs $200 all-in with transport and lunch.",
  costs: [
    ["Flights (commercial)",     "$220",   "$520",    "Direct from every major US hub to MEX"],
    ["Accommodation (4 nights)", "$520",   "$2,200",  "Polanco / Roma / Condesa · luxury → boutique"],
    ["Green fees (3 rounds)",    "$240",   "$745",    "Coral + 1 private + Tabachines"],
    ["Caddie tips",              "$75",    "$120",    "$25–$40 per round standard"],
    ["Club rentals (optional)",  "$0",     "$120",    "Coral and major private clubs only"],
    ["Ground transport",         "$120",   "$280",    "Uber + Cuernavaca transfer"],
    ["Food & beverage",          "$400",   "$1,200",  "Pujol · Quintonil · Contramar · Rosetta"],
    ["Total all-in (per person)","$1,575", "$5,185",  "Mid-season estimate · 4 nights, 3 rounds"],
  ],
  callouts: [
    { icon: "⛰️", label: "The altitude rule",     body: "At 7,350 feet, the ball flies 8–12% farther than at sea level. Subtract a club on every approach. Your driver carries the longest of the year here, and short irons play a half-club shorter than the yardage card. Take a practice range hour before the first round to recalibrate." },
    { icon: "🍽️", label: "The table extension",   body: "CDMX is a food destination first and a golf destination second. Build the trip around dinner: Pujol, Quintonil, Sud777, Contramar, Rosetta. Tee off at 7 a.m., off by noon, eat for three hours, repeat. The golf gives you the appetite the city deserves." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and through the traffic.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Benito Juárez (MEX) is the primary, with direct flights from every US hub. Toluca (TLC) serves west-side courses better. Felipe Ángeles (NLU) is the new north option but limited US service. Customs at MEX runs 30–60 min on first-time arrivals." },
    { icon: "car",    title: "Getting to courses",  body: "MEX → south-side courses (Coral, México, Pedregal): 30–60 min depending on traffic. West-side (Bosques, Lomas): 45–75 min. Tabachines (Cuernavaca): 90 min via the Mexico–Acapulco highway. Plan tee times before 8 a.m. to beat the worst congestion." },
    { icon: "map",    title: "Between courses",    body: "Traffic is the limiting factor. Plan one course per day — never two in the same day in CDMX. The city's golf is best paired with the restaurant scene; build the trip around the afternoon table, not the second round." },
    { icon: "dollar", title: "Currency + tips",    body: "Pesos preferred; USD accepted at major clubs only. Tip caddies $300–$500 MXN per round. Uber is the simplest ground transport. Allow 90 min from hotel to first tee — the city is unforgiving on schedules." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",     sub: "Nov – Apr · 50–78°F · Moderate · $$",   body: "Dry, mild, predictably clear mornings. The window every visiting golfer should target. February is the standout — coolest mornings, warmest afternoons. November and March follow close behind." },
    { title: "Rainy Season",    sub: "Jun – Sep · 55–75°F · Low · $",          body: "Daily afternoon thunderstorms. Tee off at 7 a.m. and finish by noon — the rain is reliable enough to plan around. The city's restaurant scene runs full force during the rains, so the round is morning, the table is the rest of the day." },
    { title: "Shoulder",        sub: "May & Oct · 53–80°F · Moderate · $$",    body: "Late October opens the dry season; May begins the slide toward rain. Both months still deliver excellent course conditions with lower demand. The value window for CDMX golf." },
  ],

  faqs: [
    { q: "What golf courses are in Mexico City?",                      a: "Approximately ten metropolitan courses, including Coral Golf Club (public), Club de Golf México, Chapultepec, Bosques, Lomas Quebradas, Bosque Real, Pedregal, and Amanali. Tabachines in Cuernavaca is a 90-minute day trip." },
    { q: "Which Mexico City golf courses are open to the public?",      a: "Coral Golf Club is the primary public option inside the city. Tabachines in Cuernavaca is public via day-trip. All other CDMX clubs are private member-guest only." },
    { q: "What does it cost to play golf in Mexico City?",              a: "Green fees range $80 – $250 USD. Coral runs under $150 all-in. Private clubs require a member host; expect $200–$300 all-in with green fee, caddie tip, and clubhouse lunch." },
    { q: "Is Club de Golf Chapultepec open to visitors?",               a: "Only by member-guest invitation arranged through the club secretary. Walk-up play is not permitted. The club hosted the WGC-Mexico Championship 2017–2020." },
    { q: "What is the best golf course in Mexico City?",                a: "It depends on access. For tournament pedigree: Chapultepec. For history: Club de Golf México (1958 World Cup). For accessibility: Coral. For modern design: Bosque Real (Tom Doak)." },
    { q: "Can I day-trip to Tabachines from Mexico City for golf?",     a: "Yes. Tabachines is 90 minutes south via the México–Acapulco highway. Tee off at 8 a.m., lunch in the clubhouse, back in the city by 4 p.m. The single best golf day trip from CDMX." },
    { q: "How does the altitude affect play in Mexico City?",           a: "At 7,350 feet, the ball flies 8–12% farther than at sea level. Subtract a club on most approaches. Plan a range hour on day one to recalibrate distances." },
  ],

  credentials,
};

/* ─────────── CANCÚN · RIVIERA MAYA ─────────── */

const CANCUN = {
  slug: "cancun-riviera-maya",
  name: "Cancún · Riviera Maya",
  region: "Quintana Roo",
  heroPhoto: null,
  heroLabel: "Destination Guide · Riviera Maya",
  h1Pre: "Golf in",
  h1Em: "the Riviera Maya.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "12+",        label: "Courses" },
    { num: "80 mi",      label: "Coastline" },
    { num: "$150–$320",  label: "Green fees" },
    { num: "Dec – Apr",  label: "Best months" },
  ],
  heroAnswer:
    "Cancún and the Riviera Maya hold the densest concentration of resort golf in Mexico — over twelve courses stretched along 80 miles of Caribbean coastline. Green fees run $150 to $320 per round. Direct US flights make this the easiest golf destination to reach in the country. Greg Norman, Robert Trent Jones Jr., Jack Nicklaus, and Tom Fazio all hold designs along this corridor.",

  quickFacts: [
    { icon: "flag",      label: "Courses",       value: "12+ along the Riviera Maya" },
    { icon: "pencil",    label: "Designers",     value: "Norman · RTJ Jr. · Nicklaus · Fazio · Mickelson" },
    { icon: "dollar",    label: "Green fees",    value: "$150 – $320 USD per round" },
    { icon: "calendar",  label: "Best months",   value: "December – April" },
    { icon: "alert",     label: "Avoid",         value: "August – October (hurricane peak)" },
    { icon: "plane",     label: "Airport",       value: "Cancún International (CUN)" },
    { icon: "globe",     label: "Languages",     value: "English & Spanish" },
    { icon: "person",    label: "Caddie",        value: "Optional at most resort courses" },
    { icon: "dollar",    label: "USD",           value: "Accepted everywhere" },
  ],

  overviewLabel: "The coast",
  overviewH2Pre: "Riviera Maya golf —",
  overviewH2Em: "the easiest reach in Mexico.",
  overviewParagraphs: [
    "Cancún International (CUN) is the most-served Mexican airport by US carriers — direct flights from 25+ US cities, customs that move efficiently, and a 1-hour drive to the heart of the Riviera Maya golf belt. For visiting golfers, this is the lowest-friction trip in the country.",
    "The corridor stretches 80 miles south from Cancún to Tulum, with golf clustered in three nodes: Cancún proper (Iberostar, Pok-Ta-Pok), Playa del Carmen / Playacar (Hard Rock, Mayakoba's three courses), and the Tulum end (Bahía Príncipe Riviera Maya). The Mayakoba node — El Camaleón, Mayakoba's PGA Tour-hosting site — is the editorial centerpiece.",
    "The terrain is jungle-edge resort golf: mangrove crossings, limestone cenote features, tropical fairways with shaded corridors. Wind is rarely the variable; humidity is. Plan early tee times and treat the round as part of the resort day, not the entirety of it.",
  ],
  overviewStats: [
    { num: "12+",      label: "Courses on the coast" },
    { num: "80 mi",    label: "Cancún → Tulum" },
    { num: "25+",      label: "US direct flights" },
    { num: "PGA Tour", label: "Hosted at Mayakoba" },
  ],

  playbookH3Pre: "Riviera Maya, distilled —",
  playbookH3Em: "free.",
  playbookBody: "Our 2026 Playbook. Where Mayakoba's PGA Tour stop actually plays, which resorts bundle golf into the rate, and the courses worth flying for.",

  photoStrip: [
    { label: "El Camaleón · Mayakoba" },
    { label: "The Riviera Maya · Caribbean Coast" },
    { label: "Cenote routing · Playa del Carmen" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Six courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "From Mayakoba's PGA Tour stop to the cenote routings south of Playa — the Riviera Maya rounds worth scheduling.",
  courses: [
    { tier: "resort",  fee: "$285 – $320", name: "El Camaleón at Mayakoba",       difficulty: "4/5", bestFor: "PGA Tour pedigree",       specs: "Greg Norman · Par 72 · Championship",          note: "Hosted the PGA Tour's Mayakoba Golf Classic from 2007 to 2022. Norman's routing weaves through mangrove, jungle, and beach corridors with a famous cenote crossing on the par-3 7th. The editorial centerpiece of Mexico's Caribbean coast.",                  standout: "#7 — Par 3 over a natural cenote with limestone walls." },
    { tier: "resort",  fee: "$245 – $285", name: "El Manglar at Mayakoba",         difficulty: "3/5", bestFor: "Mangrove + lagoon golf",   specs: "Greg Norman · Par 72 · Resort",                note: "Mayakoba's second routing — a quieter, mangrove-edge experience that complements El Camaleón. Several par-3s play across lagoon water; the back nine is the most photogenic stretch.",                                                                       standout: "#16 — Par 3 across open lagoon to a defended green." },
    { tier: "resort",  fee: "$215 – $265", name: "Iberostar Cancún Golf",          difficulty: "3/5", bestFor: "Lagoon + Nichupté views",   specs: "Isao Aoki · Par 72 · Resort",                  note: "The most central round in Cancún — Iberostar's lagoon course wraps Laguna Nichupté with views of the hotel zone skyline. Easy walking pace, family-resort-friendly, and the lowest-friction golf at Cancún proper.",                                       standout: "#14 — Open par 5 along the Nichupté lagoon." },
    { tier: "resort",  fee: "$195 – $245", name: "Hard Rock Golf Club Riviera Maya", difficulty: "3/5", bestFor: "Bundled all-inclusive",    specs: "Jack Nicklaus · Par 72 · Resort",              note: "Bundled into the Hard Rock Riviera Maya all-inclusive — green fees included in the room rate for guests. Nicklaus's design plays through limestone karst and jungle corridors; a strong value play if you're already at the property.",                  standout: "#9 — Risk-reward par 4 around a sinkhole feature." },
    { tier: "resort",  fee: "$170 – $220", name: "Bahía Príncipe Riviera Maya",     difficulty: "2/5", bestFor: "Tulum-end resort golf",     specs: "Robert Trent Jones Jr. · Par 72 · Resort",     note: "The southern anchor of the corridor — RTJ Jr.'s routing on the Tulum end, accessed via the Bahía Príncipe Riviera Maya all-inclusive. Forgiving for visiting handicaps, jungle-edged, and the most affordable championship round in the region.",         standout: "#5 — Long par 5 with the Caribbean visible on the approach." },
    { tier: "public",  fee: "$150 – $195", name: "Pok-Ta-Pok Golf Club",            difficulty: "2/5", bestFor: "Cancún's original public",   specs: "Robert Trent Jones Sr. · Par 72 · Public",     note: "Cancún's original golf course — RTJ Sr.'s 1976 routing on the hotel zone, surrounded by Mayan ruins and Laguna Bojórquez. Public booking, the most affordable round in the city, and the easiest tee time to secure last-minute.",                          standout: "Mayan ruin feature on #12." },
  ],

  costsLabel: "The math",
  costsH2Pre: "What",
  costsH2Em: "you will spend.",
  costsIntro: "The Riviera Maya pricing range is the widest in Mexico — all-inclusive resorts bundle golf into the rate; standalone bookings at Mayakoba run premium. The all-inclusive arbitrage is the entire game here.",
  costs: [
    ["Flights (commercial)",     "$210",   "$480",    "25+ direct US cities to CUN"],
    ["Accommodation (4 nights)", "$1,100", "$3,800",  "All-inclusive → Mayakoba luxury"],
    ["Green fees (3 rounds)",    "$510",   "$870",    "Or bundled inside all-inclusive rate"],
    ["Caddie tips",              "$60",    "$120",    "$20–$40 per round standard"],
    ["Club rentals (optional)",  "$0",     "$120",    "Available at every major course"],
    ["Ground transport",         "$120",   "$340",    "Resort shuttle → private SUV"],
    ["Food & beverage",          "$200",   "$900",    "Often included in all-inclusive"],
    ["Total all-in (per person)","$2,200", "$6,630",  "Mid-season estimate · 4 nights, 3 rounds"],
  ],
  callouts: [
    { icon: "🏨", label: "The all-inclusive arbitrage", body: "Hard Rock, Bahía Príncipe, Iberostar, and others bundle unlimited golf into the room rate. If you're playing 4+ rounds, the all-inclusive math beats a standalone Mayakoba stay by a wide margin. The trade-off is property quality — but the rounds are paid for the moment you check in." },
    { icon: "🌀", label: "The hurricane window",         body: "August through October is statistically the highest-risk window for the Caribbean coast. Travel insurance with hurricane coverage is the standard play for any trip booked in this window. The off-season pricing reflects the risk — only book it if you can absorb a one-week shift." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and along the coast.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Cancún International (CUN) is the most-served Mexican airport by US carriers — 25+ direct cities. Customs typically 20–45 min. Private aviation has multiple FBO options. Tulum International (TQO) opened in 2023 and serves the south end of the corridor." },
    { icon: "car",    title: "Getting to courses",  body: "Highway 307 runs the length of the Riviera Maya, well-maintained and signed in English. CUN → Mayakoba: 50 min. CUN → Tulum: 90 min. Resort shuttles handle most golf transfers; private SUV is the upgrade for multi-course days." },
    { icon: "map",    title: "Between courses",    body: "Mayakoba's three courses share a single property — walking distance between clubhouses. Hard Rock and Bahía Príncipe sit 30–60 min apart. Pok-Ta-Pok is the only Cancún hotel zone course; everything else is south on Highway 307." },
    { icon: "dollar", title: "Currency + tips",    body: "USD accepted everywhere. Tip caddies $20–$40 per round. Most resort properties bundle gratuities into the all-inclusive rate — verify with the concierge on arrival. Highway tolls between CUN and Tulum run $8–$15 USD." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",        sub: "Dec – Apr · 75–85°F · Very High · $$$",   body: "The Caribbean window. Low humidity, almost no rain, manageable winds. Christmas through Easter sells out the all-inclusive inventory 4–8 months in advance. Book early or shift to shoulder." },
    { title: "Shoulder Season",    sub: "May – Jul · 80–90°F · Moderate · $$",     body: "Warmer, more humid, but rooms drop 25–40% off peak. Morning tee times finish before the humidity peaks. The Mayakoba PGA Tour finished in February historically — May to early July is the post-tournament value window." },
    { title: "Hurricane / Off",    sub: "Aug – Nov · 80–90°F · Low · $",            body: "Statistically the highest hurricane-risk window in Mexico. Discounts deepest, conditions still playable on most days, but insurance is non-negotiable. Late November transitions back to peak as the season closes." },
  ],

  faqs: [
    { q: "How many golf courses are in Cancún and the Riviera Maya?",   a: "Twelve-plus courses span the 80-mile corridor from Cancún to Tulum. Mayakoba alone holds three. The full count includes resort, public, and private routings." },
    { q: "Which is the best course in the Riviera Maya?",                a: "El Camaleón at Mayakoba — host of the PGA Tour's Mayakoba Golf Classic from 2007 to 2022. Greg Norman's mangrove-jungle-beach routing is the editorial centerpiece of Mexico's Caribbean coast." },
    { q: "Is golf included in all-inclusive resorts here?",              a: "Often, yes. Hard Rock, Bahía Príncipe, Iberostar, and others bundle unlimited golf into the room rate. The arbitrage works best at 4+ rounds — verify with the property before booking." },
    { q: "What is the best time of year to play golf in Cancún?",        a: "December through April. Low humidity, almost no rain, peak course conditions. Christmas through Easter is the most-booked window — reserve 4+ months in advance." },
    { q: "Should I worry about hurricanes?",                              a: "August through October is the statistical peak. Travel insurance with hurricane coverage is the standard for any trip booked in this window. Outside that window, weather is reliably playable." },
    { q: "How long is the drive from the airport to Mayakoba?",          a: "Approximately 50 minutes from Cancún International (CUN) via Highway 307. Tulum International (TQO) reduces the drive to under 30 minutes for south-corridor properties." },
  ],

  credentials,
};

/* ─────────── PUERTO VALLARTA · RIVIERA NAYARIT ─────────── */

const PUERTO_VALLARTA = {
  slug: "puerto-vallarta",
  name: "Puerto Vallarta",
  region: "Jalisco · Riviera Nayarit",
  heroPhoto: null,
  heroLabel: "Destination Guide · Puerto Vallarta",
  h1Pre: "Golf in",
  h1Em: "Puerto Vallarta.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "8",          label: "Courses" },
    { num: "Banderas",   label: "Bay" },
    { num: "$140–$285",  label: "Green fees" },
    { num: "Nov – May",  label: "Best months" },
  ],
  heroAnswer:
    "Puerto Vallarta anchors a golf belt that wraps Banderas Bay from the city north into Riviera Nayarit. Eight courses cover the geography — Jack Nicklaus, Greg Norman, Tom Weiskopf, and Joe Finger have all built here. Green fees range from $140 to $285 per round. Direct US flights, walkable old-town atmosphere, and an honest mid-tier price point make this Mexico's most underrated golf destination.",

  quickFacts: [
    { icon: "flag",      label: "Courses",       value: "8 around Banderas Bay" },
    { icon: "pencil",    label: "Designers",     value: "Nicklaus · Norman · Weiskopf · Finger · von Hagge" },
    { icon: "dollar",    label: "Green fees",    value: "$140 – $285 USD per round" },
    { icon: "calendar",  label: "Best months",   value: "November – May" },
    { icon: "alert",     label: "Avoid",         value: "July – October (rain + humidity)" },
    { icon: "plane",     label: "Airport",       value: "Puerto Vallarta International (PVR)" },
    { icon: "globe",     label: "Languages",     value: "English & Spanish" },
    { icon: "person",    label: "Caddie",        value: "Optional · Recommended for first-timers" },
    { icon: "dollar",    label: "USD",           value: "Accepted everywhere" },
  ],

  overviewLabel: "The bay",
  overviewH2Pre: "Vallarta golf —",
  overviewH2Em: "the bay-wrapping geography.",
  overviewParagraphs: [
    "Banderas Bay is the largest bay on Mexico's Pacific coast — 25 miles tip to tip. Puerto Vallarta sits on the south arm, in the state of Jalisco. Riviera Nayarit wraps the north arm, with Nuevo Vallarta, Bucerías, and Punta Mita carrying the resort load. Eight golf courses ring the bay, putting championship golf within a 45-minute drive of almost any hotel.",
    "The city is the differentiator — Puerto Vallarta is the most walkable, livable golf destination in Mexico. Old-town Zona Romántica, the Malecón, the bay restaurants. After the round, the city is the experience. This is the golf trip you bring non-golfers on and they don't notice they're at a golf destination.",
    "The course mix is honest: Nicklaus at Vista Vallarta, Weiskopf at Marina Vallarta, von Hagge at El Tigre, Norman at Mandarina (40 min north). Prices run 30–40% below Cabo or Punta Mita for comparable design pedigrees. The most underrated golf destination in Mexico is here.",
  ],
  overviewStats: [
    { num: "8",        label: "Courses around the bay" },
    { num: "25 mi",    label: "Banderas Bay span" },
    { num: "30–40%",   label: "Below Cabo pricing" },
    { num: "20+",      label: "US direct flights" },
  ],

  playbookH3Pre: "Vallarta, distilled —",
  playbookH3Em: "free.",
  playbookBody: "Our 2026 Playbook. Where the underrated rounds actually live, how to combine Vallarta with Punta Mita, and which restaurants make the trip.",

  photoStrip: [
    { label: "Vista Vallarta · Nicklaus / Weiskopf" },
    { label: "Banderas Bay · Pacific Coast" },
    { label: "Marina Vallarta · Original Routing" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Six courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "The Banderas Bay golf belt — from the Vista Vallarta double-Nicklaus to the Norman cliffside design at Mandarina.",
  courses: [
    { tier: "public",  fee: "$235 – $285", name: "Vista Vallarta — Nicklaus", difficulty: "4/5", bestFor: "Hillside Nicklaus design",         specs: "Jack Nicklaus · Par 72 · Championship",  note: "Vista Vallarta carries two championship routings on a hillside above the city — Nicklaus and Weiskopf. The Nicklaus course is the tougher and more dramatic of the two, with bay views from nearly every tee box and a series of elevation-change par-3s.",  standout: "#5 — Downhill par 3 to a green carved into the hillside." },
    { tier: "public",  fee: "$210 – $265", name: "Vista Vallarta — Weiskopf",  difficulty: "3/5", bestFor: "Forgiving design partner",         specs: "Tom Weiskopf · Par 72 · Championship",   note: "The forgiving side of Vista Vallarta's double routing. Weiskopf's design uses the same hillside topography but plays wider off the tee — the better round for mixed-handicap groups.",                                                                          standout: "#13 — Sweeping par 5 with the bay framed behind the green." },
    { tier: "public",  fee: "$180 – $225", name: "Marina Vallarta Golf Club",   difficulty: "3/5", bestFor: "Original Vallarta routing",       specs: "Joe Finger · Par 71 · Public",            note: "The original Vallarta routing — opened in 1990 and still the most central round in the city. Tight, urban-edged, with crocodile lagoons that genuinely matter to your scorecard.",                                                                          standout: "#18 — Long par 4 with the crocodile lagoon on the right." },
    { tier: "resort",  fee: "$200 – $250", name: "El Tigre Golf Club",         difficulty: "4/5", bestFor: "Long, demanding routing",          specs: "Robert von Hagge · Par 72 · Championship", note: "Across the bay in Nuevo Vallarta — von Hagge's long, water-heavy routing that hosted the Mayan Resorts Classic on the Canadian Tour. Plays longer than the card; demands accuracy with every iron.",                                                          standout: "#15 — Forced carry par 3 over open water to a defended green." },
    { tier: "resort",  fee: "$170 – $215", name: "Flamingos Golf Club",         difficulty: "2/5", bestFor: "Mid-range value round",            specs: "Percy Clifford renovation · Par 72 · Resort", note: "The oldest course in the Banderas Bay region — Clifford-renovated, accessible from Nuevo Vallarta resorts, and the strongest value play in the region under $200 per round.",                                                                                 standout: "#7 — Risk-reward par 4 with a forced carry option." },
    { tier: "public",  fee: "$140 – $180", name: "El Tigre Mayan Palace",       difficulty: "2/5", bestFor: "Vidanta resort guests",            specs: "Jim Lipe · Par 71 · Resort",              note: "Vidanta Nuevo Vallarta's resort routing — a more forgiving sibling to the championship El Tigre next door. Often bundled into the Vidanta all-inclusive package.",                                                                                          standout: "#11 — Bay-edged par 5 with reachable green for long hitters." },
  ],

  costsLabel: "The math",
  costsH2Pre: "What",
  costsH2Em: "you will spend.",
  costsIntro: "Vallarta is Mexico's value-tier championship golf destination. Comparable Nicklaus and Norman pedigrees run 30–40% below Cabo or Punta Mita. The room rate is the only material variable.",
  costs: [
    ["Flights (commercial)",     "$240",   "$520",    "Direct: LAX · DFW · IAH · ORD · SFO"],
    ["Accommodation (4 nights)", "$680",   "$2,800",  "Old-town boutique → Marriott / Grand Velas"],
    ["Green fees (3 rounds)",    "$525",   "$795",    "Vista Vallarta + Marina + 1 north-bay round"],
    ["Caddie tips",              "$75",    "$120",    "$25–$40 per round"],
    ["Club rentals (optional)",  "$0",     "$120",    "Available at every major course"],
    ["Ground transport",         "$80",    "$220",    "Taxi corridor + bay crossing"],
    ["Food & beverage",          "$350",   "$1,100",  "City restaurants + clubhouse"],
    ["Total all-in (per person)","$1,950", "$5,675",  "Mid-season estimate · 4 nights, 3 rounds"],
  ],
  callouts: [
    { icon: "🏡", label: "The city advantage",         body: "Vallarta is the only Mexican golf destination where the city itself rivals the golf for the trip. Old-town Zona Romántica, the Malecón, the bay restaurants, the Saturday market in Sayulita. Bring non-golfers — they won't notice they're at a golf destination." },
    { icon: "🌉", label: "The bay-crossing logistics",  body: "Half the courses sit on the south arm (Vista Vallarta, Marina Vallarta), half on the north arm (El Tigre, Flamingos, Mandarina). Pick your hotel based on which half you'll play more. Crossing the bay daily eats 90 minutes round-trip." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and around the bay.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Puerto Vallarta International (PVR) — direct from 20+ US cities including DFW, IAH, LAX, ORD, SFO, PHX, YYZ. Customs typically 30–45 min. PVR sits exactly between the south-arm and north-arm golf, equidistant to either." },
    { icon: "car",    title: "Getting to courses",  body: "PVR → Vista Vallarta: 15 min. PVR → Marina Vallarta: 5 min. PVR → El Tigre / Nuevo Vallarta: 15 min. PVR → Mandarina / Punta Mita: 45 min. The geography is the most compact of any Mexican golf destination." },
    { icon: "map",    title: "Between courses",    body: "South arm to north arm via the bay perimeter highway: 35–50 min depending on traffic. The bay-crossing toll bridge cuts this to 20 min but costs $4 USD each way. Plan course pairs on the same arm where possible." },
    { icon: "dollar", title: "Currency + tips",    body: "USD accepted everywhere — pesos preferred for taxis. Tip caddies $25–$40 per round, restaurants 15–20%. Uber operates city-wide and reaches every major course. The most US-friendly logistics in Mexican golf." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",       sub: "Nov – Apr · 72–85°F · High · $$$",   body: "Dry, warm, low humidity. The window every visiting golfer should target. Vista Vallarta and El Tigre fill 4–8 weeks in advance during Christmas through Easter — book early." },
    { title: "Shoulder Season",   sub: "May – Jun · 80–90°F · Moderate · $$", body: "Warmer, slightly more humid, but rooms drop 25–35% off peak. The value window — peak course conditions persist through May before the rains arrive in earnest." },
    { title: "Rain / Hurricane",  sub: "Jul – Oct · 82–92°F · Low · $",       body: "Tropical storms and afternoon thunder. Mornings can still play well — most rounds finish before noon. October is the sharpest value play as the hurricane window closes mid-month." },
  ],

  faqs: [
    { q: "How many golf courses are in Puerto Vallarta?",                 a: "Eight courses ring the Banderas Bay region — four on the south arm (Vallarta proper) and four on the north arm (Riviera Nayarit). All accessible within a 45-minute drive of PVR." },
    { q: "Which is the best course in Puerto Vallarta?",                   a: "Vista Vallarta — Nicklaus. The hillside Nicklaus design above the city is the most dramatic round in the region. The Weiskopf sister course shares the property and plays more forgiving for mixed groups." },
    { q: "Is Puerto Vallarta cheaper than Cabo for golf?",                 a: "Yes — comparable Nicklaus and Norman pedigrees run 30–40% below Los Cabos or Punta Mita. The value tier of Mexican championship golf lives here." },
    { q: "Can you combine Puerto Vallarta and Punta Mita golf?",            a: "Yes. The geographies share PVR airport and run a 45-minute drive apart. A common trip: 3 days Vallarta city + 3 days Punta Mita peninsula. The Playbook covers the combined itinerary in detail." },
    { q: "What is the best time of year to golf in Puerto Vallarta?",      a: "November through April — dry, warm, low humidity. April delivers the best balance of conditions and demand. Late October is the sharpest value play as the hurricane window closes." },
    { q: "How walkable is Puerto Vallarta the city?",                      a: "Old-town Zona Romántica is highly walkable; the Malecón runs along the bay for 12 blocks. This is the only Mexican golf destination where the city itself is a primary trip reason." },
  ],

  credentials,
};

/* ─────────── UNIQUE DESTINATIONS ─────────── */

const UNIQUE = {
  slug: "unique-destinations",
  name: "Unique Destinations",
  region: "Across Mexico",
  heroPhoto: null,
  heroLabel: "Destination Guide · Unique",
  h1Pre: "Golf",
  h1Em: "off the map.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "6+",         label: "Hidden destinations" },
    { num: "Off-grid",   label: "Routings" },
    { num: "$120–$280",  label: "Green fees" },
    { num: "Year-round", label: "Selective windows" },
  ],
  heroAnswer:
    "Six destinations beyond the headline names — the lesser-known Mexican golf you only find through the right relationships. Valle de Bravo, Querétaro, San Miguel de Allende, Acapulco, Mazatlán, Loreto. These are the rounds that complete the country, the ones GIM travels for, the ones that make the seventh trip to Mexico different from the first.",

  quickFacts: [
    { icon: "flag",      label: "Destinations",  value: "6 unique regional rounds" },
    { icon: "pencil",    label: "Designers",     value: "Nicklaus · Clifford · Trent Jones Jr. · Mickelson" },
    { icon: "dollar",    label: "Green fees",    value: "$120 – $280 USD per round" },
    { icon: "calendar",  label: "Best months",   value: "Varies by region — see below" },
    { icon: "alert",     label: "Avoid",         value: "Region-specific rain windows" },
    { icon: "plane",     label: "Airports",      value: "MEX · QRO · BJX · ACA · MZT · LTO" },
    { icon: "globe",     label: "Languages",     value: "Spanish primary, English at major clubs" },
    { icon: "person",    label: "Caddie",        value: "Mostly optional · Regional variance" },
    { icon: "dollar",    label: "USD",           value: "Partial — pesos preferred regionally" },
  ],

  overviewLabel: "Off the map",
  overviewH2Pre: "The rest of",
  overviewH2Em: "Mexican golf.",
  overviewParagraphs: [
    "Mexico's golf identity is defined by the headline corridors: Cabo, Punta Mita, the Riviera Maya, Vallarta, CDMX. But the country carries roughly 40 more courses outside those clusters — courses that locals play, that don't appear in international magazines, that require knowing somebody to book.",
    "This guide is the catalog of those rounds. Valle de Bravo's lakeside Nicklaus routing two hours west of CDMX. The Querétaro highland trio. San Miguel de Allende's hilltop Lipe design above the colonial old town. Acapulco's coastal courses that remember the 1960s. Mazatlán's Estrella del Mar on the Sea of Cortez. Loreto's Mickelson signature, the most remote championship round in Mexico.",
    "These are the rounds that complete a Mexican golf life. None of them is essential on a first trip. All of them matter by the seventh visit. The Playbook covers the access logic for each — the right relationship is more important than the right week.",
  ],
  overviewStats: [
    { num: "6",        label: "Curated regions" },
    { num: "40+",      label: "Outside-corridor courses" },
    { num: "Trip 7+",  label: "When these matter" },
    { num: "Local",    label: "Knowledge required" },
  ],

  playbookH3Pre: "The hidden rounds —",
  playbookH3Em: "free.",
  playbookBody: "Our 2026 Playbook. The six destinations only locals talk about, plus the relationships that get you on the course.",

  photoStrip: [
    { label: "Valle de Bravo · Lakeside Nicklaus" },
    { label: "San Miguel de Allende · Highland Golf" },
    { label: "Loreto · Sea of Cortez Mickelson" },
  ],

  coursesLabel: "The destinations",
  coursesH2Pre: "Six rounds",
  coursesH2Em: "off the headlines.",
  coursesIntro: "The Mexican golf you only find through the right relationships — region-by-region, with our editorial difficulty and access notes.",
  courses: [
    { tier: "private", fee: "$200 – $280", name: "Avándaro Golf Club, Valle de Bravo",     difficulty: "3/5", bestFor: "Lakeside Nicklaus design",       specs: "Jack Nicklaus · Par 72 · Private",        note: "Two hours west of CDMX on Lake Avándaro — a Nicklaus routing on Mexico's most beautiful inland lake. Member-guest only, but worth the relationship work. Pine-edged corridors and a back nine that finishes at the water.",                                          standout: "#16 — Par 3 across the lake to a defended green." },
    { tier: "public",  fee: "$160 – $220", name: "Club Campestre de Querétaro",            difficulty: "3/5", bestFor: "Highland Bajío trio anchor",     specs: "Percy Clifford · Par 72 · Semi-private",  note: "The Querétaro highlands carry three serious rounds — Campestre, Juriquilla, and El Campanario. Campestre is the anchor: Clifford routing at 6,000 feet with the broadest old-Mexico clubhouse culture in the Bajío region.",                                            standout: "#9 — Long par 4 with Cerro del Tepozán framing the green." },
    { tier: "resort",  fee: "$185 – $245", name: "Ventanas Golf Club, San Miguel de Allende", difficulty: "3/5", bestFor: "Highland resort + colonial",   specs: "Nick Faldo · Par 72 · Resort",            note: "Above the colonial old town of San Miguel — Faldo's hillside routing with stone walls, agave landscaping, and the most photogenic clubhouse in central Mexico. Pair with two nights in the city for the complete trip.",                                                  standout: "#11 — Stone-wall par 4 with the Parroquia visible in the distance." },
    { tier: "resort",  fee: "$130 – $185", name: "Tres Vidas Acapulco",                    difficulty: "2/5", bestFor: "Coastal Acapulco round",          specs: "Robert von Hagge · Par 72 · Resort",      note: "The coastal Acapulco round that remembers the 1960s. von Hagge's design on the Diamante coast, accessible via the Acapulco Diamante resort cluster. Warm, breezy, and the most affordable Pacific resort golf in central Mexico.",                                       standout: "#13 — Beach-edged par 5 with the Pacific on the right." },
    { tier: "public",  fee: "$140 – $195", name: "Estrella del Mar, Mazatlán",              difficulty: "3/5", bestFor: "Sea of Cortez routing",          specs: "Robert Trent Jones Jr. · Par 72 · Resort", note: "Mazatlán's anchor routing on the Sea of Cortez — RTJ Jr.'s ocean-edged design that quietly delivers the most affordable ocean-front golf in northwestern Mexico. Direct flights from Phoenix and Los Angeles make access easier than it looks.",                            standout: "#17 — Long par 5 along the ocean cliffs." },
    { tier: "resort",  fee: "$220 – $280", name: "Loreto Bay Club, Loreto",                difficulty: "4/5", bestFor: "Most remote championship round",  specs: "Rees Jones · Par 72 · Resort",            note: "The most remote championship golf in Mexico — Rees Jones routing on the Sea of Cortez south of Loreto, accessed via a single direct flight from LAX. Mountain backdrop, desert-meets-water terrain, almost no crowds. The complete Baja escape.",                       standout: "#5 — Mountain-backdrop par 3 to a green ringed by desert grasses." },
  ],

  costsLabel: "The math",
  costsH2Pre: "What",
  costsH2Em: "the off-the-map round costs.",
  costsIntro: "Unique destinations are the most variable pricing tier in Mexican golf — regional airports, smaller resorts, and member-guest culture all complicate the math. Plan one destination per trip, not a multi-region itinerary.",
  costs: [
    ["Flights (commercial)",     "$240",   "$680",    "Regional connections often required"],
    ["Accommodation (3 nights)", "$420",   "$1,950",  "Boutique → high-end resort"],
    ["Green fees (2 rounds)",    "$260",   "$560",    "One destination focus per trip"],
    ["Caddie tips",              "$50",    "$100",    "Regional variance"],
    ["Club rentals (optional)",  "$0",     "$120",    "Limited availability at smaller clubs"],
    ["Ground transport",         "$100",   "$280",    "Private SUV often required"],
    ["Food & beverage",          "$220",   "$680",    "Local cuisine + clubhouse"],
    ["Total all-in (per person)","$1,290", "$4,370",  "Single-destination estimate · 3 nights, 2 rounds"],
  ],
  callouts: [
    { icon: "🤝", label: "The relationship rule",        body: "These rounds are not booked, they are arranged. Member-guest invitations, friend-of-the-property reservations, advance secretarial correspondence. The Playbook covers the access channel for each destination — the right relationship matters more than the right week." },
    { icon: "🗺️", label: "The single-region rule",        body: "Pick one unique destination per trip. The temptation to chain Querétaro + San Miguel + Valle de Bravo into a single week destroys the experience. Each region has a particular pace — give it three days minimum to register what makes it different." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and around the regions.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Regional airports: Querétaro (QRO), León/Bajío (BJX) for San Miguel, Acapulco (ACA), Mazatlán (MZT), Loreto (LTO). MEX is the hub for Valle de Bravo. Most destinations require a 1-3 hour ground transfer from the nearest airport." },
    { icon: "car",    title: "Getting to courses",  body: "Private SUV is the standard — regional taxi quality varies. Valle de Bravo: 2 hr from MEX. San Miguel: 1.5 hr from BJX. Loreto: 30 min from LTO. Acapulco: 45 min from ACA. Plan transfers in advance; ride-share is unreliable in regional Mexico." },
    { icon: "map",    title: "Between courses",    body: "Single-destination trips are the standard here. Avoid multi-region itineraries — the ground transfer costs and time loss destroy the experience. Pick one destination, give it three days, return for the next on the following trip." },
    { icon: "dollar", title: "Currency + tips",    body: "Pesos preferred at regional clubs; USD accepted at major resorts (Loreto Bay, Estrella del Mar, Tres Vidas). Tip caddies $25–$40 per round in USD or peso equivalent. Restaurant tipping 10–15% — slightly below the corridor standard." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to travel each region.",
  seasonBlocks: [
    { title: "Highlands",         sub: "Querétaro · San Miguel · Valle · Oct – Apr · $$",   body: "The central Mexican highlands run dry October through April. February is the standout — clear, cool mornings, warm afternoons. Avoid the rainy season June through September. Altitude adds 5–8% distance; recalibrate." },
    { title: "Pacific Coast",     sub: "Acapulco · Mazatlán · Loreto · Nov – May · $$",      body: "The Pacific coastal rounds peak November through May — warm, dry, low humidity. Loreto holds the longest season into June. All three avoid August–October hurricane risk. Loreto is the most weather-stable of any Mexican golf destination." },
    { title: "Hurricane / Off",   sub: "Region-specific · Jul – Oct · $",                    body: "Pacific coast holds the highest hurricane risk August–October. Highlands shift to daily afternoon thunderstorms. The off-season trade only works if your schedule absorbs a possible one-week shift. Travel insurance with weather coverage is standard." },
  ],

  faqs: [
    { q: "What are the unique golf destinations in Mexico?",          a: "Beyond the headline corridors, six regional destinations carry serious championship golf: Valle de Bravo (lakeside Nicklaus), Querétaro (highland Bajío trio), San Miguel de Allende (Faldo hillside), Acapulco (Tres Vidas), Mazatlán (Estrella del Mar), and Loreto (Rees Jones on the Sea of Cortez)." },
    { q: "Which unique destination is best for a first visit?",        a: "San Miguel de Allende. The colonial city carries the trip on its own merit, the golf at Ventanas is excellent without being demanding, and the BJX airport adds an extra hour to Mexico City connections — making it the smoothest unique-destination introduction." },
    { q: "Is Loreto worth the extra flight time?",                     a: "Yes, if you've already played Cabo. Loreto is the Cabo of 30 years ago — dramatic Sea of Cortez terrain, almost no crowds, direct LAX flights. The Rees Jones routing at Loreto Bay is the most remote championship round in Mexico." },
    { q: "How do I book these courses?",                                a: "Member-guest invitations, friend-of-the-property reservations, advance secretarial correspondence. Most are not bookable through standard channels. The Playbook covers the access channel for each destination." },
    { q: "Can I chain multiple unique destinations in one trip?",       a: "We recommend against it. Each region has a particular pace and requires 3 days minimum to register what makes it different. Multi-region itineraries usually destroy the experience. Pick one per trip; return for the next." },
    { q: "What is the best season for highland Mexican golf?",          a: "October through April. February is the peak — clear, dry, cool mornings, mild afternoons. Avoid June through September (afternoon storms). At 6,000+ feet, every course plays a half-club shorter; recalibrate distances on day one." },
  ],

  credentials,
};

const ALL_HUBS = [LOS_CABOS, PUNTA_MITA, MEXICO_CITY, CANCUN, PUERTO_VALLARTA, UNIQUE];

export const getHubData = (slug) => ALL_HUBS.find((h) => h.slug === slug);

export const KEEP_EXPLORING_HUBS = (currentSlug) =>
  ALL_HUBS
    .filter((h) => h.slug !== currentSlug)
    .slice(0, 4)
    .map((h) => ({ slug: h.slug, name: h.name, region: h.region }));

export default ALL_HUBS;
