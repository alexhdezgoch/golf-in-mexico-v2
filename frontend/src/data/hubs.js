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
  heroSlider: [
    "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/4mxnh2t1_3DCB3E97-F719-4528-8A39-56921F816CF9_1_105_c.jpeg",
    "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/zrbeas6e_D090368D-C498-4ED4-9CA3-139553CD571D_1_105_c.jpeg",
    "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/54bjyy6t_8909F6AA-C7D4-40A4-86D2-7577FF01ADC6_1_105_c.jpeg",
  ],
  seoTitle: "Golf in Cabo San Lucas: Courses, Costs & Access (2026) | Golf in Mexico°",
  seoDescription: "Eleven editorial-grade golf courses, green fees from $95–$500, and the insider access most travelers never find. The complete guide to Los Cabos for 2026.",
  sources: [
    "Golf Digest — World's 100 Greatest Courses (2024 list)",
    "Los Cabos Tourism Board — 350 sunny days statistic, visitor data",
    "Banco de México — peso/USD exchange data (May 2026)",
    "Mexico News Daily — Cabo Open coverage, security infrastructure reports",
    "Resort price decks: Solmar Group · Pueblo Bonito · Auberge · One&Only · Montage (Q1 2026)",
  ],
  heroLabel: "Destination Guide · Los Cabos",
  h1Pre: "Golf in",
  h1Em: "Cabo San Lucas.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "18",        label: "Active courses" },
    { num: "23 by 2026",     label: "With 5 under construction" },
    { num: "$95–$500", label: "Green fees" },
    { num: "Oct – May", label: "Best months" },
  ],
  heroAnswer:
    "Los Cabos has 18 active championship golf courses — with 5 more under construction — along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Green fees range from $95 to $500 USD per round depending on course and season, with October through May delivering peak conditions. This is the most concentrated collection of signature-architect designs in Mexico, and navigating it requires an insider's map.",

  quickFacts: [
    { icon: "flag",      label: "Courses",        value: "18 active · 5 under construction · 23 by 2026" },
    { icon: "pencil",    label: "Designers",      value: "Nicklaus · Woods · Norman · Love III · Weiskopf · Fazio · Couples · Eckenrode · RTJ Jr." },
    { icon: "dollar",    label: "Green fees",     value: "$95 – $500 USD per round (varies by course and season)" },
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
    "Los Cabos is not just a destination; it is a high-demand, ultra-premium golf ecosystem located at the southern tip of the Baja California Peninsula. Where the mountains clash directly with the shoreline, signature architects have carved out a paradise with 18 active championship golf courses — with 5 more under construction. The region moved over 329,500 air passengers in January 2025 alone and commands incredible loyalty among luxury travelers, posting an elite 38% repeat-visitor rate.",
    "The market splits into three distinct zones. San José del Cabo operates at a peaceful 63% hotel occupancy, offering a cultural backdrop. Cabo San Lucas runs hotter at 79% occupancy, centered around the marina and active nightlife. The real center of gravity for championship golf is The Tourist Corridor — this exclusive strip commands a luxury-segment ADR of $795 USD and hosts the vast majority of top-tier tracks.",
    "Eighteen courses span the corridor, with more opening by 2026. Eight of the top layouts were shaped by Nicklaus, Woods, Norman, Love III, and Fazio — including three courses by Nicklaus alone. The terrain is the differentiator: Pacific cliffside holes at Quivira, links-style dunes at Diamante, desert arroyos at Club Campestre, coastal finishes at Puerto Los Cabos. No other destination in Mexico puts this variety inside a 20-mile stretch. With three courses on Golf Digest's World 100 Greatest list and seven of Mexico's top 10 as ranked by Golf Digest, Los Cabos is the undisputed golf capital of Latin America.",
  ],
  overviewStats: [
    { num: "329,500", label: "Air passengers Jan 2025" },
    { num: "38%",     label: "Repeat visitors" },
    { num: "$795",    label: "Luxury ADR corridor" },
    { num: "18",      label: "Active courses" },
  ],
  overviewStatsNote: "5 more under construction — reaching 23 by 2026. Source: Mexico News Daily · Los Cabos Tourism Board",

  playbookH3Pre: "Your free",
  playbookH3Em: "2026 Cabo Travel Brief.",
  playbookBody: "Get the full Cabo guide as a PDF. Course notes, real prices, a 4-day sample plan, and how to book the private rounds. Sent to your inbox in 60 seconds.",

  photoStrip: [
    { label: "Quivira Golf Club · Pacific Cliffs" },
    { label: "The Corridor · Cabo San Lucas" },
    { label: "Diamante · Dunes Course" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Eleven courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "From Nicklaus to Tiger Woods to Fazio — the complete field guide to the best golf in Cabo San Lucas, with our editorial difficulty rating and access notes.",
  courses: [
    { tier: "resort",  verified: false, fee: "$233 – $380", name: "Quivira Golf Club",            difficulty: "4/5", bestFor: "Cliffside ocean holes",         specs: "Jack Nicklaus · Par 72 · Championship",                  note: "The crown jewel of the corridor. Quivira plays along the Pacific cliffs above Cabo San Lucas — every hole delivers an ocean view, climbing out of desert canyons to finish with one of the most photographed closing stretches in North America. Rates include cart, practice facility, and all food and refreshments at four comfort stations. Accessible to guests of Pueblo Bonito Oceanfront Resorts: Pacifica · Sunset Beach · Rosé · Los Cabos.",   standout: "#13 — Par 3 returning to the cliffs, 150 feet above the Pacific. The most photographed hole on the course. The par-4 fifth climbs 275 feet up the mountain — one of the most dramatic tee shots in Mexico." },
    { tier: "private", verified: true, fee: "$315 – $385", name: "Cove Club at Cabo del Sol",    difficulty: "4/5", bestFor: "Iconic back nine, sea views",   specs: "Jack Nicklaus · Par 72 · Championship", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/thg0cb44_Cove-Club.jpg"], photoSource: "Source: Cove Club press kit",                  note: "The course that put Los Cabos on the global golf map. Reopened in 2019 as the Cove Club with redesigned holes by Nicklaus, including a new par-3 17th that drops to a green backdropped by the sea. Golf Digest World Top 100.",                                                                                                                                                                                                                            standout: "#18 — Peninsula-style green that appears to float on the ocean. The previous par-4 16th, remodeled as the closing hole, plunges 100 feet down the side of a mountain." },
    { tier: "private", verified: true, fee: "$320 (taxes incl.)", name: "Diamante — Dunes Course",       difficulty: "3/5", bestFor: "Links experience, dunes",       specs: "Davis Love III · Par 72 · Championship", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/4mxnh2t1_3DCB3E97-F719-4528-8A39-56921F816CF9_1_105_c.jpeg"],                 note: "A true links experience framed by massive white sand dunes on the Pacific side of Cabo San Lucas. Walks and plays like a classic British course — with 340 days of sunshine. Ranked #1 golf course in Mexico by Golf Digest. World Top 100. The standard by which all Cabo courses are measured.",                                                                                                                                                                                                                                                                                                                                                                       standout: "#17 — Par 3 with target semi-obscured by sand and scrub. The 590-yard par-5 18th plays to a shelf green perched 50 feet above the fairway." },
    { tier: "private", verified: true, fee: "$320 (taxes incl.)", name: "El Cardonal at Diamante",       difficulty: "3/5", bestFor: "Mixed groups, desert design",   specs: "Tiger Woods · Par 72 · Resort-Friendly", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/zrbeas6e_D090368D-C498-4ED4-9CA3-139553CD571D_1_105_c.jpeg"],                 note: "Tiger Woods' first solo design outside the United States. Wide, forgiving fairways through desert arroyos — highly playable for mixed-handicap groups, with panoramic Pacific views throughout. Host of the PGA Tour World Wide Technology Championship. Inspired by the classic West Coast courses Tiger grew up playing — Riviera, Bel-Air — with bold bunkers and wide fairway corridors.",                                                                                                                                                                                                                                                                                                                                                       standout: "#5 — The layout meanders through sand dunes on the outgoing holes; the back nine crisscrosses desert arroyos. Bold, flashed-face bunkers signpost the strategic options." },
    { tier: "public",  verified: true, fee: "$95 – $245",  name: "Palmilla Golf Club",            difficulty: "3/5", bestFor: "Three nines, historic",         specs: "Jack Nicklaus · Par 72 · 27 holes", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/w9zxd211_PALMILLA.jpeg"], photoSource: "Source: One&Only Palmilla press kit",                      note: "The course that started the modern corridor in 1992. Three interchangeable nines (Mountain, Arroyo, Ocean) — the first Jack Nicklaus Signature Design in Latin America. The Ocean nine, added in 1997, features a 600-foot elevation drop from tee to green. Golf Digest Top 10 in Mexico. Outside play season- and time-dependent; preferred rates for One&Only Palmilla guests.",                                                                                                                                                                                                                                                                                                                                                                       standout: "Ocean #3 — Par 4 dropping 150 feet to a beachfront green steps from the crashing Sea of Cortez. The most photographed hole at Palmilla." },
    { tier: "public",  verified: false, fee: "$205 – $285", name: "Puerto Los Cabos",              difficulty: "2/5", bestFor: "Nicklaus + Norman 27 holes",    specs: "Jack Nicklaus + Greg Norman · Par 72 · 27 holes",        note: "Now a 27-hole facility with three 18-hole combinations. Nicklaus returned in 2017 to build a second nine, opened in 2018. Norman's course has 400+ feet of elevation change. The only Nicklaus + Norman collaboration in Mexico. Fee includes practice balls, cart, food + beverages.",                                                                                                                                                                                                                                                                                                                                                                                                            standout: "#18 — Norman's finishing hole running parallel to the marina and coastline." },
    { tier: "public",  verified: false, fee: "$135 – $190", name: "Club Campestre San José",       difficulty: "2/5", bestFor: "Best value on corridor",        specs: "Nicklaus Design · Par 72 · Moderate",                    note: "Best value on the corridor. Weaves through rugged desert arroyos with the Sierra de la Laguna mountains framing every shot. The truest sense of Baja's inland topography. Always described as the best value on the corridor — and consistently in top condition. Partner courses with Puerto Los Cabos and Cabo Real for combo packages. Fee includes practice balls, cart, water.",                                                                                                                                                                                                                                                                                                                                              standout: "#7 — Demanding approach over a deep arroyo crossing." },
    { tier: "private", verified: false, fee: "$500 all-in", name: "Twin Dolphin Golf Club",        difficulty: "4/5", bestFor: "Tournament greens, canyon",     specs: "Fred Couples + Todd Eckenrode (Origins Golf Design) · Par 72 · Championship",  note: "Built on the historic grounds of the original Twin Dolphin Hotel. Incredible elevation changes and tournament-level greens — the Sea of Cortez visible from almost every tee. $450 green fee + $50 mandatory caddie fee = $500 per round. Includes practice facilities + two on-course comfort stations. Accessible to guests of Montage Los Cabos (122-room hotel) and Montage Residences.",                                                                                                                                                                                                                                                  standout: "Perched 180 meters above sea level on a broad plateau bisected by three major arroyos. Sea of Cortes visible from every hole. The par-3 third plays across a jagged canyon — one of the most dramatic par 3s on the corridor." },
    { tier: "resort",  verified: true, fee: "$95 – $265",  name: "Solmar Golf Links",              difficulty: "3/5", bestFor: "Pacific links, underrated gem", specs: "Greg Norman · Par 72 · Resort-Friendly", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/54bjyy6t_8909F6AA-C7D4-40A4-86D2-7577FF01ADC6_1_105_c.jpeg"],                 note: "A genuine links course with revetted pot bunkers identical to British seaside links — the only ones in Mexico. Three ecosystems: Pacific dunes, cactus forest, coastal finish. Several holes play directly toward the beach. Greg Norman's least-disturbance design approach preserved the natural contours entirely. Golf Digest Top 50 in Mexico. Golfweek Top 15. And yes — Troy was filmed on these cliffs. Solmar Group hotel guests preferred rates; rates include cart, water, practice facility, and two on-course comfort stations.",                                              standout: "Pacific stretch — links holes hanging directly over the Pacific Ocean." },
    { tier: "private", verified: false, fee: "Members only",    name: "El Dorado",                     difficulty: "4/5", bestFor: "Private desert routing · Discovery Land standard", specs: "Jack Nicklaus · Par 72 · Private",        note: "A Discovery Land Company community built around a Jack Nicklaus signature design. Desert foothills, stark canyons, two interior lakes. Several holes meander through canyons divided by a rocky hill. The par-3 16th green sits directly above the beach and sea — the course's defining hole. Guest play through member invitation only.", standout: "#16 — Ledged green directly above the beach and sea." },
    { tier: "resort",  verified: false, fee: "$330 + $40 caddie", name: "Chileno Bay Golf & Beach Club", difficulty: "4/5", bestFor: "Fazio design · ocean view every hole",   specs: "Tom Fazio · Par 72 · 7,260 yards · 2013", note: "Golf Digest No. 2 in Mexico. Tom Fazio's only Cabo design — built on graceful, flowing landforms intended to simulate rolling ocean waves. An ocean view from every hole. Back-to-back par 5s at holes 6 and 7. Two driveable short par 4s. The par-4 18th tumbles downhill to an infinity-edge green at 512 yards from the tips. Auberge Chileno Bay resort guests only.",                                                                                                              standout: "#18 — 512 yards downhill to an infinity-edge green." },
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
    { q: "What is the best time of year to play golf in Los Cabos?", a: "The peak season runs November through April — dry, warm (72–82°F), almost no rain. For the best balance of weather and value, late October and May are the sharpest shoulder months: great conditions, fewer crowds, better rates. The summer window (July–October) brings dramatic discounts but also humidity, afternoon storms, and hurricane risk. August and September are the months to avoid entirely." },
    { q: "How much does a golf trip to Los Cabos cost?", a: "A realistic 4-night, 3-round trip runs $2,030 on the lower end to $5,580 at the luxury tier, per person. The main variables are hotel choice and course selection. Green fees range from $95 at Palmilla off-season to $500 all-in at Twin Dolphin including its mandatory caddie. The Tourist Corridor luxury baseline is $795 per night. Per GIM editorial research, mid-season 2026." },
    { q: "Which is the best course in Los Cabos?", a: "Diamante Dunes is ranked No. 1 in Mexico by Golf Digest — the links standard. Quivira is the most visually dramatic. Cove Club at Cabo del Sol is historically significant and Golf Digest World Top 100. Twin Dolphin has the newest tournament-level greens. For value, Club Campestre at $135–$190 delivers conditions that rival courses three times the price. The right answer depends entirely on what kind of golfer you are." },
    { q: "Do I need to bring my own golf clubs?", a: "No. Premium rental sets — TaylorMade, Callaway — are available at all major courses for $50–$80 per round. Serious golfers will still prefer their own. Airlines typically charge $35–$50 each way for a golf bag. Quivira and Twin Dolphin offer current-year sets at their pro shops. Club rental is never a reason to skip a course in Los Cabos." },
    { q: "Are the courses walkable?", a: "Most are cart-mandatory or strongly cart-recommended. Desert terrain, dramatic elevation changes, and distances between holes make walking impractical. Quivira climbs 275 feet in the first five holes — it is not walkable. Club Campestre and Palmilla have more manageable terrain. The caddie walks with you regardless of cart policy — they are your on-course guide, not optional company." },
    { q: "Is it safe to travel to Los Cabos?", a: "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent security infrastructure. The destination has invested close to $50 million in security upgrades and operates a real-time network with local hotels. Standard travel precautions apply as with any international destination. The 38% repeat-visitor rate among luxury travelers is one of the strongest signals of destination confidence." },
    { q: "Why do so many golfers choose Los Cabos?", a: "Three courses on Golf Digest's World 100 Greatest list. Seven of Mexico's top 10 courses. Championship designs by Nicklaus, Woods, Norman, Love III, and Fazio — in one 20-mile corridor. 350 sunny days per year (Los Cabos Tourism Board). Direct flights from 30+ US cities. The flight from LAX is under three hours — shorter than driving from Los Angeles to Palm Springs." },
    { q: "Can beginners enjoy golf in Los Cabos?", a: "Yes. Palmilla, Puerto Los Cabos, and Club Campestre all offer multiple tee boxes for every skill level. The Desert Course at Cabo del Sol was designed with broad landing areas for higher handicappers. El Cardonal at Diamante — Tiger Woods' design — was specifically built with wide, forgiving fairway corridors to accommodate mixed-handicap groups. Most resorts have PGA-certified instructors on staff." },
    { q: "Do I need to tip caddies?", a: "Yes — tipping is expected and an important part of their income. Standard: $40–$60 USD per bag per round. At Twin Dolphin, the $50 caddie fee is mandatory and built into the booking price. At elite courses, the caddie is the difference between a good round and a great one — they know the ocean breaks, the wind patterns, and the pin positions. Tip accordingly." },
  ],

  credentials,
};

/* ─────────── PUNTA MITA ─────────── */

const PUNTA_MITA = {
  slug: "punta-mita",
  name: "Punta Mita",
  region: "Riviera Nayarit",
  heroPhoto: null,
  heroSlider: [
    "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/b3h22ocy_MANDARINA%20BUNKER.png",
    "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/jkdh05kp_MANDARINA%20DRONE.png",
  ],
  seoTitle: "Golf in Punta Mita & the Upper Riviera Nayarit (2026) | Golf in Mexico°",
  seoDescription: "Five championship golf courses within 75 km of PVR. Pacifico's Tail of the Whale — the only natural island green in golf. Mandarina (Norman) · Nauka (Fazio, 2025). Editorial access guide.",
  sources: [
    "Pacifico Golf Course — Punta Mita pro shop and resort archives",
    "Greg Norman Golf Course Design — Mandarina Golf Club design notes",
    "Nauka Golf Club — Tom Fazio design archive, 2025 opening records",
    "Higuera Golf Club — direct booking and rate card (2026)",
    "Banco de México — peso/USD exchange data (May 2026)",
  ],
  heroLabel: "Destination Guide · Punta Mita",
  h1Pre: "Golf in",
  h1Em: "Punta Mita.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "5",          label: "Courses on the corridor" },
    { num: "Nicklaus",   label: "Norman · Fazio" },
    { num: "$150–$395",  label: "Green fees" },
    { num: "Nov – May",  label: "Best months" },
  ],
  heroAnswer:
    "The Punta Mita corridor has five championship golf courses within 75 kilometers of Puerto Vallarta International Airport — designed by Jack Nicklaus, Greg Norman, and Tom Fazio. Green fees run $150 to $395 per round. Access to four of the five requires a room key or membership. This guide covers all five, what each costs, and exactly how to get on.",

  quickFacts: [
    { icon: "flag",      label: "Courses",      value: "5 active (3 resort · 1 public · 1 private community)" },
    { icon: "pencil",    label: "Designers",    value: "Jack Nicklaus · Greg Norman · Tom Fazio" },
    { icon: "dollar",    label: "Green fees",   value: "$150 – $395 USD per round" },
    { icon: "calendar",  label: "Best months",  value: "November – May" },
    { icon: "alert",     label: "Avoid",        value: "August – October (rain + hurricane window)" },
    { icon: "plane",     label: "Airport",      value: "Puerto Vallarta International (PVR)" },
    { icon: "globe",     label: "Languages",    value: "English & Spanish" },
    { icon: "person",    label: "Caddie",       value: "Included at Four Seasons · available at all others" },
    { icon: "dollar",    label: "USD",          value: "Accepted everywhere on the corridor" },
  ],

  overviewLabel: "The corridor",
  overviewH2Pre: "Punta Mita golf —",
  overviewH2Em: "what makes it different.",
  overviewParagraphs: [
    "The Punta Mita corridor is not a golf destination that happens to have luxury hotels. It is a luxury destination that happens to have world-class golf. That sequence defines everything — the caddie program, the conditioning of the greens, the quality of the food at the halfway house, the ease of the booking. Four Seasons, St. Regis, One&Only, Rosewood, and Ritz-Carlton Reserve did not build here because of the courses. They built here because this stretch of Nayarit coastline — where the Sierra Madre meets the Pacific — is among the most carefully managed luxury addresses in the western hemisphere. The courses came after the hotels.",
    "Five courses operate in the upper corridor today. Seven will be operational by 2027 when Montage and Pendry open inside the Punta Mita gate, both with new Nicklaus designs. Nauka — a 920-acre private community 75 minutes north of Punta Mita — opened the Tom Fazio course in 2025 alongside Siari, a Ritz-Carlton Reserve. The density of brand investment in this corridor is not found elsewhere in Mexican golf.",
    "Most first-time visitors underestimate how restricted this corridor is. Four of five courses require either a room key or a community membership. Higuera Golf Club — 10 minutes north of the Punta Mita gate — is the only course publicly bookable without resort affiliation. Mandarina Golf Club at One&Only and Rosewood is open to outside visitors without a membership, but requires transportation to the property. Understanding the access structure before you book the trip is the most important piece of planning in this region.",
  ],
  overviewStats: [
    { num: "5",       label: "Courses today" },
    { num: "7",       label: "By 2027 (Montage + Pendry)" },
    { num: "45 min",  label: "PVR → Punta Mita gate" },
    { num: "75 km",   label: "Corridor reach" },
  ],

  playbookH3Pre: "Your free",
  playbookH3Em: "2026 Nayarit Travel Brief.",
  playbookBody: "The full Punta Mita guide as a PDF. How to get inside the gate, which course suits your game, where to stay, and what each day really costs. Sent to your inbox in 60 seconds.",

  photoStrip: [
    { label: "Pacifico · Tail of the Whale" },
    { label: "Punta Mita · Four Seasons Peninsula" },
    { label: "Mandarina · Norman Cliffside" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Five courses",
  coursesH2Em: "every one worth your round.",
  coursesIntro: "From Nicklaus to Fazio — the complete field guide to golf in Punta Mita and the upper Riviera Nayarit corridor.",
  courses: [
    { tier: "resort",  verified: true, fee: "$345 – $395", name: "Pacifico Course",          difficulty: "4/5", bestFor: "The Tail of the Whale · ocean holes",  specs: "Jack Nicklaus · Par 72 · 7,014 yards · 1999", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/jdd69nak_PUNTA%20MITA%20DRONE.png"], photoSource: "Riviera Nayarit Field Photography",  note: "380 acres of peninsula. Eight holes on the Pacific. One island green in the middle of the ocean. The 3B optional — Tail of the Whale — is reachable by boat at low tide only. It is the only natural island green in golf. Ask the pro shop the night before for the tide window. If your tee time falls inside it, go. If not, play 3A. The round holds either way. Caddie included from the shuttle to the final putt. Resort access only — Four Seasons, St. Regis, private residences.", standout: "3B — nothing else like it in golf." },
    { tier: "resort",  verified: true, fee: "$325 – $375", name: "Bahia Course",             difficulty: "3/5", bestFor: "Ocean-carry par 5 finish",            specs: "Jack Nicklaus · Par 72 · 2005", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/uibfbgsu_PUNTA%20MITA.png"], photoSource: "Riviera Nayarit Field Photography",               note: "Same peninsula. Same caddie. More forgiving off the tee. Bahia moves through tropical jungle before finding the ocean on the closing holes. The last shot of the round is a forced carry over water — the only ocean-carry par 5 in Mexico. You make the decision before you take the club back. Resort access only — Four Seasons, St. Regis, private residences.",                                                                                                                                                                  standout: "#18 — commit or lay up. The round ends with a choice." },
    { tier: "public",  verified: true, fee: "$250 – $280", name: "Mandarina Golf Club",      difficulty: "3/5", bestFor: "Short-course concept · no key needed", specs: "Greg Norman · 9 par 3s + 1 challenge hole", photos: ["https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/iwvp4z04_MANDARINA%20COURSE.png"], photoSource: "Riviera Nayarit Field Photography",    note: "Not a full 18. Nine par 3s, each with a name and a concept: The Redan, The Devil's Hole, The Queen, The Theater, The Bell. Plus one challenge hole — The Kraken — a near-island green with a pot bunker as the only escape. Norman: \"El campo de Mandarina no tendrá parangón.\" Fee includes two rounds of 10 holes, cart with GPS, unlimited practice, and all food and beverages. No membership required. Transportation to the property needed from outside the Mandarina community.",                                       standout: "The Theater — Norman described it as one of the best medium-distance par 3s in the world." },
    { tier: "public",  verified: false, fee: "$150 – $285", name: "Higuera Golf Club",        difficulty: "3/5", bestFor: "Only publicly bookable · best value",  specs: "Greg Norman · Par 72 · 7,022 yards · 2010",   note: "The only course in this corridor bookable without a room key. 18 holes between virgin jungle and Pacific beach. 7 links-style holes along the coast, 8 through jungle, 2 signature holes directly on the beach. The #8 green is surrounded by water on three sides. Two snack bars on the course. Open 7:30am to 3:00pm. The honest entry point to the Punta Mita golf region. Direct booking at higueragolfclub.com.",                                                                                                              standout: "#8 — peninsula green, water on three sides." },
    { tier: "private", verified: false, fee: "Members only", name: "Nauka Golf Club",         difficulty: "4/5", bestFor: "Ultimate exclusivity · 2025 opening",   specs: "Tom Fazio · 18 + 9-hole short course · 2025", note: "920 acres. 400 memberships. One Tom Fazio course. Set against tropical jungle overlooking the Pacific. Undulating greens, challenging elevations, natural bunkering. A 9-hole short course runs alongside the championship layout for members of all levels. The community: 197-foot infinity pool, fresh seafood, firepits, a tequila room, a marina and yacht club, a wellness village, a beach racquet club. Siari, a Ritz-Carlton Reserve: 91 suites, 34 residences, five restaurants. No public access. No day-pass.",     standout: "Four ecosystems in 18 holes — jungle, cliff, mangrove, beach. No two consecutive holes share a view." },
  ],

  costsLabel: "The math",
  costsH2Pre: "Here is exactly",
  costsH2Em: "what you will spend.",
  costsIntro: "In this corridor, the hotel is the main cost — not the golf. A night at Siari Ritz-Carlton Reserve or One&Only Mandarina costs more than three rounds of combined green fees. Choose the hotel first. Add the courses second.",
  costs: [
    ["Flights (commercial)",     "$280",   "$520",    "LAX · DFW · IAH · ORD · SFO direct"],
    ["Accommodation (4 nights)", "$2,200", "$6,000",  "Four Seasons / One&Only / Nauka"],
    ["Green fees (3 rounds)",    "$825",   "$1,185",  "Higuera + Pacifico + Mandarina"],
    ["Caddie tips",              "$120",   "$180",    "$40–$60/bag standard"],
    ["Club rentals (optional)",  "$0",     "$150",    "TaylorMade at peninsula pro shops"],
    ["Ground transport",         "$120",   "$280",    "PVR transfers + corridor"],
    ["Food & beverage",          "$450",   "$1,200",  "Resort dining standard"],
    ["Total all-in (per person)","$3,995", "$9,515",  "Peak season · 4 nights · 3 rounds"],
  ],
  callouts: [
    { icon: "💡", label: "The hospitality argument",   body: "Every destination has green fees. Not every destination conditions its greens to the standard of the spa next door. In this corridor, the courses were built for the guests of the hotels next door — not for volume, not for walk-ins. That changes pace of play, caddie quality, halfway house food, and greens condition on a Tuesday in March. These are not details. They are the experience." },
    { icon: "🐳", label: "The Tail of the Whale",       body: "The 3B optional on Pacifico is playable at low tide only. Call the pro shop the night before. Tide window confirmed — go. No window — play 3A. The round holds either way." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and through the gate.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Puerto Vallarta International (PVR) — direct from Dallas, Houston, Los Angeles, Chicago, San Francisco, Phoenix, Seattle, and Toronto. Customs 30–45 min. Private operators handle G-IV and below." },
    { icon: "car",    title: "Getting to the gate", body: "PVR → Punta Mita gate: 45 minutes via coastal road. PVR → Mandarina: 55 minutes north. PVR → Nauka: 75 minutes north along the coast. Resort transfers standard inside each community. Uber reaches the Punta Mita exterior — cannot enter the gate." },
    { icon: "map",    title: "Between courses",     body: "Pacifico ↔ Bahia: 5 minutes by cart inside the peninsula. Higuera: 10 minutes north of the gate. Mandarina: 40 minutes north of Punta Mita on the coastal road. Nauka: 75 minutes from Punta Mita — plan as a separate day." },
    { icon: "dollar", title: "Currency + tips",     body: "USD accepted throughout the corridor. Caddie tips: $40–$60 per round standard. Four Seasons includes caddies — acknowledge the service. Bring resort confirmation for gate entry; offline copy advisable." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",        sub: "Dec – Mar · 70–85°F · Very High · $$$",   body: "Whale season and golf season are the same. Humpback whales enter Banderas Bay November through March — visible from Pacifico, Higuera, and Mandarina fairways. Pacifico tee times fill 6–9 months in advance. Book room and rounds together. Never separately." },
    { title: "Shoulder Season",    sub: "Apr – May · 75–88°F · Moderate · $$",      body: "April is the most underrated month in the Punta Mita corridor. Near-peak conditions. Demand 25–35% below spring break. Rooms 20–30% off peak. Jungle fully green. Best pace of play. May begins to warm but the value holds." },
    { title: "Rain / Hurricane",   sub: "Jun – Oct · 80–94°F · Low · $",            body: "Afternoon storms. Mornings still playable — particularly Higuera, protected by jungle canopy. Late October: the season opens as the hurricane window closes. Best off-season rates of the year." },
  ],

  faqs: [
    { q: "How many golf courses are in Punta Mita?", a: "Punta Mita has two championship Jack Nicklaus courses — Pacifico and Bahia — both on a private 1,500-acre peninsula accessible only to Four Seasons and St. Regis guests and Club Punta Mita members. The broader Riviera Nayarit upper corridor adds three more within 75 kilometers: Higuera Golf Club (public), Mandarina Golf Club (open to visitors), and Nauka Golf Club (private community, Ritz-Carlton Reserve guests)." },
    { q: "Can non-resort guests play golf in Punta Mita?", a: "No. The Punta Mita peninsula gate has no public day-pass. Both Pacifico and Bahia require a confirmed room at the Four Seasons or St. Regis Punta Mita, or Club Punta Mita membership. The closest publicly accessible course is Higuera Golf Club, 10 minutes north of the gate — open daily with direct booking and no resort affiliation required." },
    { q: "What is the Tail of the Whale?", a: "The Tail of the Whale is the optional 3B green on Pacifico Golf Course at Punta Mita. It is a natural island green in the middle of the Pacific Ocean — the only one of its kind in golf. Access requires a small boat (tender) at low tide only. Call the pro shop the night before to confirm the tide window aligns with your tee time. If it does not, you play 3A and lose nothing." },
    { q: "What does a golf trip to Punta Mita cost?", a: "A realistic 4-night, 3-round trip to the Punta Mita corridor runs $3,995 on the lower end (Higuera + resort in the zone) to $9,515 at the full luxury tier (Pacifico + Mandarina + Nauka-level accommodation). The hotel is the primary cost variable — not the green fees, which range from $150 at Higuera to $395 at Pacifico. Per GIM editorial research, 2026." },
    { q: "What is the best time of year to play golf in Punta Mita?", a: "November through May offers the best conditions — dry, 70–85°F, low humidity. April is the sharpest value window: near-peak conditions with demand running 25–35% below spring break and rooms 20–30% off peak rates. December through March coincides with humpback whale season in Banderas Bay — visible from several fairways on Pacifico, Higuera, and Mandarina. Avoid August through October for the rain and hurricane window." },
    { q: "What is Higuera Golf Club?", a: "Higuera Golf Club is an 18-hole, par-72 course designed by Greg Norman, opened in 2010 in Punta de Mita, Nayarit — formerly known as Litibu Golf Club. It is the only publicly bookable course in the upper Riviera Nayarit corridor. Seven holes run along the Pacific coast, eight through virgin jungle, and the #8 green is a peninsula surrounded by water on three sides. Open daily 7:30am to 3:00pm. Direct booking at higueragolfclub.com." },
    { q: "Is Punta Mita golf worth it?", a: "Yes, with a specific condition: the value depends entirely on where you are staying. The courses were designed as amenities for the hotels — not as stand-alone golf products. A guest of Four Seasons playing Pacifico gets a caddie included, a halfway house that matches the room service, and a pace of play that is not found at public courses. That context is the price of admission, and it holds." },
  ],

  credentials,
};

/* ─────────── MEXICO CITY ─────────── */

const MEXICO_CITY = {
  slug: "mexico-city",
  name: "Mexico City",
  region: "CDMX · Estado de Mexico · Cuernavaca",
  heroPhoto: null,
  seoTitle: "Golf in Mexico City: Courses, Access & Altitude (2026) | Golf in Mexico°",
  seoDescription: "20+ golf courses within 90 minutes of Polanco. Chapultepec — Mexican Open · WGC · LIV host. Bosque Real · Amanali · Encinos · Avandaro · Tabachines. The complete editorial guide.",
  sources: [
    "Club de Golf Chapultepec — Mexican Open, WGC-Mexico Championship (2017–2020), LIV Golf Mexico City (2025, 2026) records",
    "LPGA Tour — MasterCard Classic at Bosque Real (2005–2009) records",
    "European Challenge Tour — Los Encinos Open (2002–2007) records",
    "Schmidt-Curley Design — Amanali Country Club design archive",
    "Banco de México — peso/USD exchange data (May 2026)",
  ],
  heroLabel: "Destination Guide · Mexico City",
  h1Pre: "Golf in",
  h1Em: "Mexico City.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "20+",        label: "Metro courses" },
    { num: "2,240 m",    label: "Altitude (CDMX)" },
    { num: "$150–$400",  label: "Green fees" },
    { num: "Year-round", label: "Playable" },
  ],
  heroAnswer:
    "Mexico City and its surrounding states have more than 20 golf courses within 90 minutes of Polanco — ranging from the historic WGC and LIV host at Chapultepec to the mountain escapes at Valle de Bravo and Tepeji del Río. All courses are private or semi-private. Access requires a member invitation, a hotel reservation, or advance coordination.",

  quickFacts: [
    { icon: "flag",      label: "Courses",       value: "8 featured (CDMX + Estado de Mexico + Morelos + Hidalgo + Valle de Bravo)" },
    { icon: "pencil",    label: "Designers",     value: "Willie & Alex Smith · Percy Clifford · Von Hagge · Joe Finger · Schmidt & Curley · Gary Nicklaus" },
    { icon: "alert",     label: "Altitude",      value: "2,240 m (7,350 ft) in CDMX — ball travels 10–12% farther than at sea level" },
    { icon: "dollar",    label: "Green fees",    value: "$150 – $400 USD per round (varies by access)" },
    { icon: "calendar",  label: "Best months",   value: "Year-round — no hurricane or rain peak" },
    { icon: "alert",     label: "Avoid",         value: "Weekend mornings (members-only priority)" },
    { icon: "plane",     label: "Airport",       value: "AICM (Benito Juárez) · Felipe Ángeles (AIFA)" },
    { icon: "person",    label: "Caddie",        value: "Mandatory at most courses · paid at the course in MXN" },
    { icon: "dollar",    label: "Currency",      value: "MXN preferred. USD accepted at major clubs." },
  ],

  overviewLabel: "The corridor",
  overviewH2Pre: "Golf in Mexico City —",
  overviewH2Em: "what you need to understand first.",
  overviewParagraphs: [
    "Mexico City is not a golf destination in the conventional sense. There is no tourist corridor, no dedicated resort strip, no Uber to the first tee. Every significant course here is private. Access works through members, hotels, and advance coordination. That is the first thing to know. The second thing: altitude changes the game. At 2,240 meters above sea level, the ball travels 10–12% farther than at sea level. A 7-iron here is a 6-iron everywhere else. Every club selection shifts. Every calculation on the course changes.",
    "The third thing: the history is real. Club de Golf Chapultepec has hosted the Mexican Open 18 times, the WGC-Mexico Championship 4 times (2017–2020), and LIV Golf Mexico City in 2025 and 2026. Bosque Real hosted the LPGA MasterCard Classic from 2005 to 2009. Encinos Golf hosted the European Challenge Tour. These are not municipal courses. They are tournament venues that happen to be private clubs.",
    "The circuit beyond the city is equally strong. Amanali in Hidalgo — Schmidt & Curley, 7,400 yards, canyons and lake views — is considered one of the 10 best courses in Mexico. Avandaro sits inside a resort in Valle de Bravo, 90 minutes from Polanco, where the pine forest is the differentiator. Tabachines in Cuernavaca is 45 minutes from the city in a microclimate that stays green year-round. The GIM approach: coordinate access in advance, play the history at Chapultepec, escape to the mountains for the contrast.",
  ],
  overviewStats: [
    { num: "2,240 m", label: "Altitude — CDMX above sea level" },
    { num: "10–12%",  label: "Extra distance vs. sea level" },
    { num: "18×",     label: "Chapultepec Mexican Open host count" },
    { num: "90 min",  label: "Max drive to corridor's best escapes" },
  ],

  playbookH3Pre: "Your free",
  playbookH3Em: "2026 Mexico City Travel Brief.",
  playbookBody: "The full CDMX guide as a PDF. Which private clubs we can get you into, how altitude changes your distances, and where to go after the round. Sent to your inbox in 60 seconds.",

  photoStrip: [
    { label: "Club de Golf Chapultepec · WGC era" },
    { label: "CDMX · Valley of Mexico" },
    { label: "Tabachines · Cuernavaca day-trip" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Six courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "From Chapultepec's century of tournament history to Avandaro's pine-forest escape — the verified CDMX corridor courses and the day-trip targets every visiting golfer should know.",
  courses: [
    { tier: "private", verified: true, fee: "Invitation only", name: "Club de Golf Chapultepec",   difficulty: "5/5", bestFor: "WGC + LIV + Mexican Open host", specs: "Willie & Alex Smith (1921) · Percy Clifford redesign (1972) · Par 71 · 7,345 yards", photos: ["https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1600&q=85"], note: "The most historically important golf course in Mexico. Designed in 1921 by U.S. Open champion Willie Smith and completed by his brother Alex; redesigned by Percy Clifford in 1972. Mexican Open host 18 times, WGC-Mexico Championship 4 times (2017–2020), LIV Golf Mexico City in 2025 and 2026. At 7,800 feet above sea level, tight tree-lined fairways and undulating terrain make club selection a constant negotiation. The uphill trio of holes 15–17 is among the most demanding closing stretches in Mexican golf. Greens are small, very fast, severely sloped. Local knowledge is the differentiator. Member invitation only. No public tee times.", standout: "#17 — par 3, 167 yards. Water front and left. A miss left costs a number." },
    { tier: "private", verified: true, fee: "$5,100 – $7,000 MXN", name: "Bosque Real Country Club", difficulty: "4/5", bestFor: "Longest course in Mexico",  specs: "Robert von Hagge, Smelek & Baril (2002) + Gary Nicklaus 9-hole executive (2008) · Par 72 · 7,552 yards", photos: ["https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1600&q=85"], note: "One of the longest courses in Mexico at 7,552 yards — and at altitude, it plays even longer than it looks on the card. Von Hagge's 18-hole design winds through mountain terrain with a river, canyons, ponds, and multiple lakes. Earned the LPGA MasterCard Classic from 2005 to 2009. Lorena Ochoa played here. Louise Friberg holds the women's course record at 65. A 9-hole executive course by Gary Nicklaus opened in 2008 alongside the championship layout. 15 km west of CDMX in Huixquilucan — 20 minutes from Santa Fe on a clear day. Some public booking available on weekdays with advance coordination.", standout: "#18 — par 5, 624 yards from the tips. The longest hole on the course." },
    { tier: "resort",  verified: true, fee: "Advance booking", name: "Amanali Country Club",      difficulty: "4/5", bestFor: "Best day-trip course from CDMX", specs: "Schmidt & Curley (2010) · Par 72 · 7,400 yards · Tepeji del Río, Hidalgo", photos: ["https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=1600&q=85"], note: "Considered one of the 10 best courses in Mexico. Schmidt & Curley designed the layout on the banks of a lake in Tepeji del Río — zigzagging through canyons and cactus with panoramic lake views from most holes. Bermuda fairways, Bent Grass greens, 7,400 yards that play even longer given the altitude differential. A resort development surrounds the course, with the clubhouse designed by Legorreta Arquitectos. 50 minutes from Polanco — the best day-trip course in the CDMX corridor for golfers without a local membership.", standout: "Canyon and lake routing — no two holes share the same terrain type. The back nine plays harder than the front." },
    { tier: "private", verified: true, fee: "$3,000 – $4,500 MXN", name: "Encinos Golf Club",       difficulty: "3/5", bestFor: "Tournament course · oak corridor", specs: "Joe Finger (1990) · Par 72 · 7,099 yards · Lerma, Estado de México", photos: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1600&q=85"], note: "Host of the European Challenge Tour (Los Encinos Open, 2002–2007). A tournament course the public almost never gets to play. Joe Finger's 1990 design is well-integrated into a landscape of oak trees and native vegetation. Fast greens — among the most difficult to read in the corridor. The back nine is significantly more demanding than the front. Caddies mandatory, paid at the course. At 2,500 meters above sea level — higher than Chapultepec — the altitude effect is maximized. Members and guests only.", standout: "Back nine greens — the #11 green is consistently cited as the most difficult on the course." },
    { tier: "resort",  verified: false, fee: "Hotel guests",  name: "Avandaro Golf Club",            difficulty: "3/5", bestFor: "Pine-forest escape · Valle de Bravo", specs: "Percy Clifford (1959) · Par 72 · 18 holes", note: "The oldest resort course near Mexico City still in operation. Percy Clifford's 1959 design sits inside the Avandaro Golf & Spa Resort — 200 hectares of forested resort in Valle de Bravo, the lakeside town 90 minutes west of the capital. Flat, harmoniously set into pine forest, with water hazards, doglegs, and strategic bunkers that make it interesting across skill levels. The draw is not the design — it is the setting. Valle de Bravo is one of the most beautiful weekend escapes from Mexico City: pine trees, a lake, a colonial town center, and a pace of life the capital does not offer. Closed Mondays. Handicap certificate required.", standout: "The forest setting — pine tree corridors and a mountain backdrop no other course near CDMX offers." },
    { tier: "public",  verified: false, fee: "$1,000 – $1,800 MXN", name: "Club de Golf Los Tabachines", difficulty: "2/5", bestFor: "Most accessible · Cuernavaca microclimate", specs: "18 holes · Cuernavaca, Morelos · 45 min from CDMX", note: "45 minutes south of Mexico City in the most exclusive residential area of Cuernavaca. 18 holes, 4 artificial lakes, 1,200 meters of always-green pasture, tropical trees. A microclimate inside the course creates year-round conditions that CDMX — at higher altitude — does not always deliver. The most accessible Cuernavaca corridor course for outside visitors. Semi-private with green fee access Tuesday through Sunday. The most affordable round within 90 minutes of Polanco.", standout: "4 lakes in 18 holes — water comes into play throughout. The microclimate keeps the grass greener and the temperature lower than the surrounding city even in summer." },
  ],

  costsLabel: "The math",
  costsH2Pre: "In Mexico City,",
  costsH2Em: "access — not green fees — is the variable.",
  costsIntro: "The green fees here are among the lowest of any GIM destination. What costs money is staying in the right hotel, knowing the right member, or booking the right resort package to unlock the tee time.",
  costs: [
    ["Flights (commercial)",     "$180",   "$480",    "Direct: LAX · DFW · MIA · ORD · JFK"],
    ["Accommodation (4 nights)", "$200",   "$800",    "Polanco / Santa Fe / Valle de Bravo"],
    ["Green fees (3 rounds)",    "$450",   "$1,200",  "Tabachines mix → Chapultepec access"],
    ["Caddie fees",              "$60",    "$120",    "MXN · paid at course"],
    ["Club rentals (optional)",  "$0",     "$100",    "Available at most clubs"],
    ["Ground transport",         "$80",    "$200",    "Uber / private driver / rental car"],
    ["Food & beverage",          "$200",   "$600",    "Club dining + city restaurants"],
    ["Total all-in (per person)","$1,170", "$3,500",  "Mid-season · 4 nights · 3 rounds"],
  ],
  callouts: [
    { icon: "⛰️", label: "The altitude effect",     body: "At 2,240 meters above sea level, the air is 20–25% thinner than at sea level. The ball flies 10–12% farther. A standard 150-yard shot here is a 135-yard shot everywhere else. Club selection shifts by one to two clubs on approach. Putts break later and roll faster on the greens. The advantage goes to the local member — every time. GIM recommendation: arrive one day early if you are flying in from a coastal destination. Play nine holes on day one. Eighteen on day two." },
    { icon: "🔑", label: "The access reality",      body: "Almost every course in this corridor is private. The green fee is rarely the issue. Getting on the course is. GIM's approach: coordinate Chapultepec through a member contact, book Amanali or Avandaro through the resort, and use Tabachines as the flexible public-access option. That structure produces 3 rounds at 3 completely different types of course for under $1,500 per person all-in." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and through the traffic.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "AICM (Benito Juárez) — primary hub. Direct service from Los Angeles, Dallas, Miami, Chicago, New York, Houston, and most US gateways. AIFA (Felipe Ángeles) — secondary, north of the city, used by low-cost carriers. Customs: 30–60 minutes at AICM depending on traffic." },
    { icon: "car",    title: "Getting to courses",  body: "Chapultepec: 20 min from Polanco. Bosque Real: 20 min from Santa Fe / 30 from Polanco. Encinos: 45 min from Polanco. Amanali: 50 min from Polanco. Avandaro: 90 min (Valle de Bravo). Tabachines: 45 min (Cuernavaca). All courses require a private driver or rental car. Uber reaches most but cannot enter private gated communities without prior authorization." },
    { icon: "map",    title: "Between courses",    body: "Traffic is the limiting factor. Plan one course per day — never two in the same day in CDMX. The city's golf is best paired with the restaurant scene; build the trip around the afternoon table, not a second round." },
    { icon: "dollar", title: "Currency + tips",    body: "Most green fees are quoted in MXN. Caddie fees paid in MXN cash. USD accepted at the larger resorts. Carry MXN for the caddie." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Year-round (CDMX base)", sub: "14–22°C average · $$",    body: "Mexico City has no hurricane season and no peak golf window driven by weather alone. Dry season (Nov–Apr) delivers clear skies and cooler mornings. Rainy season (May–Oct) brings afternoon showers — usually 1–2 hours — that do not typically cancel morning rounds. Golf is playable 12 months." },
    { title: "Escape season",          sub: "Nov – Apr · Valle de Bravo · $$",    body: "The city is drier, the mountain escapes most comfortable. Avandaro in January is a fundamentally different experience from Avandaro in August." },
    { title: "Weekday window",         sub: "Tue – Thu · best access",            body: "Chapultepec and Bosque Real prioritize members on weekends. Coordinating weekday access produces better conditions and faster pace of play. Tuesday through Thursday is the window." },
  ],

  faqs: [
    { q: "How many golf courses are in Mexico City?", a: "Mexico City and its surrounding metropolitan area have more than 20 golf courses within 90 minutes of the city center. Of these, eight are considered tournament-caliber venues. Club de Golf Chapultepec in Naucalpan — 20 minutes from Polanco — is the most historically significant, having hosted the Mexican Open 18 times, the WGC-Mexico Championship 4 times, and LIV Golf Mexico City. Almost all courses are private; access requires a member invitation or hotel reservation." },
    { q: "Can tourists play golf in Mexico City?", a: "Yes, with advance coordination. Chapultepec requires a member invitation and is not accessible to the public directly. Bosque Real Country Club offers limited public booking on weekdays with advance notice. Amanali Country Club in Hidalgo (50 minutes from Polanco) is accessible as a day-trip for outside visitors with a reservation. Club de Golf Los Tabachines in Cuernavaca (45 minutes south) is the most accessible semi-public option, with green fees from $1,000–$1,800 MXN." },
    { q: "What is Club de Golf Chapultepec?", a: "Club de Golf Chapultepec is Mexico's most historically significant golf course — a private club in Naucalpan, Estado de México, 20 minutes from Polanco. Designed in 1921 by U.S. Open champions Willie and Alex Smith, redesigned by Percy Clifford in 1972. Par 71, 7,345 yards, at 7,800 feet above sea level. It has hosted the Mexican Open 18 times, the WGC-Mexico Championship 4 times, and LIV Golf Mexico City in 2025 and 2026. Guest access by member invitation only." },
    { q: "What does altitude do to your golf game in Mexico City?", a: "At 2,240 meters (7,350 feet) above sea level, the ball travels 10–12% farther than at sea level because the air is significantly thinner. A 150-yard approach shot plays like a 130-to-135-yard shot. Club selection shifts by one to two clubs. Putts roll faster and break slightly later than at lower elevations. Stamina is affected in the first round — unacclimatized golfers should plan at least one day of adjustment before a competitive round. GIM recommendation: arrive one day early." },
    { q: "How far is Amanali Country Club from Mexico City?", a: "Amanali Country Club is located in Tepeji del Río, Hidalgo, approximately 50 minutes north of Polanco via the Autopista México-Querétaro. It is the best day-trip course in the Mexico City corridor for golfers without a local club membership. Schmidt & Curley designed the 18-hole, par-72 layout in 2010. At 7,400 yards, with canyon and lake views throughout, it is considered one of the 10 best courses in Mexico. Advance booking required." },
    { q: "What is the best time of year to play golf near Mexico City?", a: "Mexico City golf is playable year-round — there is no hurricane season and no extreme weather window to avoid. The dry season (November through April) offers clearer skies and cooler morning temperatures, making it the preferred window for visitors. The rainy season (May through October) typically brings afternoon showers of 1–2 hours that do not usually cancel morning tee times. Weekend mornings prioritize club members at most courses. Tuesday through Thursday is the best window for outside visitors." },
    { q: "How much does a golf trip to Mexico City cost?", a: "A 4-night, 3-round golf trip to Mexico City runs $1,170 on the lower end to $3,500 at the higher tier, per person — the lowest all-in cost of any GIM destination. Green fees range from $1,000 MXN at Tabachines to $7,000 MXN weekend rates at Bosque Real. The constraint is rarely the green fee. It is access. Coordinating a round at Chapultepec requires a member contact; a round at Amanali or Avandaro requires a resort booking. Per GIM editorial research, 2026." },
  ],

  credentials,
};

/* ─────────── CANCÚN · RIVIERA MAYA ─────────── */

const CANCUN = {
  slug: "cancun-riviera-maya",
  name: "Cancun · Riviera Maya",
  region: "Quintana Roo",
  heroPhoto: null,
  seoTitle: "Golf in Cancun & the Riviera Maya: Courses, Costs & Access (2026) | Golf in Mexico°",
  seoDescription: "12+ championship golf courses along 80 miles of Caribbean coastline. Green fees from $89 to $353. PGA Tour pedigree at El Camaleón Mayakoba. The lowest-friction golf trip in Mexico.",
  sources: [
    "PGA Tour — Mayakoba Golf Classic records (2007–2022)",
    "Korn Ferry Tour — PGA Riviera Maya 2025 event records",
    "World Golf Awards — 2024 Best Golf Course in Mexico (PGA Riviera Maya)",
    "Resort pricing decks: Mayakoba · Moon Palace · Iberostar · Hard Rock (Q1 2026)",
    "Banco de México — peso/USD exchange data (May 2026)",
  ],
  heroLabel: "Destination Guide · Riviera Maya",
  h1Pre: "Golf in",
  h1Em: "the Riviera Maya.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "12+",        label: "Courses" },
    { num: "80 mi",      label: "Coastline" },
    { num: "$89–$353",   label: "Green fees" },
    { num: "Dec – Apr",  label: "Best months" },
  ],
  heroAnswer:
    "Cancun and the Riviera Maya have more than 12 championship golf courses along 80 miles of Caribbean coastline — designed by Greg Norman, Jack Nicklaus, Tom Weiskopf, Nick Price, and Robert Trent Jones Jr. Green fees run $89 to $353 per round. Cancun International (CUN) is the most-served Mexican airport by US carriers. This is the easiest golf trip in Mexico to book.",

  quickFacts: [
    { icon: "flag",      label: "Courses",        value: "12+ along the corridor (Cancun → Tulum)" },
    { icon: "pencil",    label: "Designers",      value: "Greg Norman · Jack Nicklaus · Tom Weiskopf · Nick Price · Robert Trent Jones Jr. · Isao Aoki" },
    { icon: "dollar",    label: "Green fees",     value: "$89 – $353 USD per round" },
    { icon: "calendar",  label: "Best months",    value: "December – April" },
    { icon: "alert",     label: "Avoid",          value: "August – October (hurricane peak)" },
    { icon: "plane",     label: "Airport",        value: "Cancun International (CUN) — 25+ direct US cities" },
    { icon: "person",    label: "Caddie",         value: "Optional at most resort courses" },
    { icon: "dollar",    label: "USD",            value: "Accepted everywhere" },
    { icon: "flag",      label: "PGA Tour",       value: "El Camaleón at Mayakoba (2007–2022)" },
    { icon: "flag",      label: "Korn Ferry",     value: "PGA Riviera Maya — Mexico debut, 2025" },
  ],

  overviewLabel: "The coast",
  overviewH2Pre: "Riviera Maya golf —",
  overviewH2Em: "the easiest reach in Mexico.",
  overviewParagraphs: [
    "Cancun International is the most-served Mexican airport by US carriers — direct flights from 25+ US cities, customs that moves efficiently, and Highway 307 running the full length of the corridor south to Tulum. For visiting golfers, this is the lowest-friction trip in the country.",
    "The corridor organizes into three zones. North Cancun has Playa Mujeres (Greg Norman, 27 holes, Caribbean and lagoon views) and the Hotel Zone cluster — Iberostar, Moon Palace, Puerto Cancun. The Mayakoba node, 50 minutes from CUN, is the editorial centerpiece: El Camaleón hosted the PGA Tour Mayakoba Golf Classic from 2007 to 2022, and El Tinto (Riviera Cancun Golf Club, Jack Nicklaus) sits just south of the airport. South of Playa del Carmen, Gran Coyote (Nick Price) and PGA Riviera Maya (RTJ Jr., Korn Ferry 2025) anchor the Tulum end.",
    "The terrain is Caribbean resort golf — not desert, not cliff. Mangrove crossings, limestone cenote features, jungle corridors, and the occasional Mayan ruin on the 16th hole (Iberostar). The differentiator here is the variety of access models: all-inclusive bundles at Moon Palace, public tee times at Puerto Cancun, the tournament experience at El Camaleón. Three designers define the corridor: Greg Norman at Playa Mujeres and El Camaleón. Jack Nicklaus at Moon Palace and El Tinto. Nick Price at El Tinto (Cancun Country Club) and Gran Coyote.",
  ],
  overviewStats: [
    { num: "12+",     label: "Courses on the corridor" },
    { num: "80 mi",   label: "Cancun → Tulum" },
    { num: "25+",     label: "US direct flights to CUN" },
    { num: "2007–22", label: "PGA Tour at El Camaleón" },
  ],

  playbookH3Pre: "Your free",
  playbookH3Em: "2026 Riviera Maya Travel Brief.",
  playbookBody: "The full Cancun & Riviera Maya guide as a PDF. Best Caribbean-side resorts that bundle golf, real cost of each round, and the courses worth your time. Sent to your inbox in 60 seconds.",

  photoStrip: [
    { label: "El Camaleón · Mayakoba" },
    { label: "The Riviera Maya · Caribbean Coast" },
    { label: "Cenote routing · Playa del Carmen" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Eight courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "From Mayakoba's PGA Tour stop to the cenote routings south of Playa — the Cancun and Riviera Maya rounds worth scheduling.",
  courses: [
    { tier: "public",  verified: true, fee: "$250 · twilight $199",  name: "Playa Mujeres Golf Club",          difficulty: "4/5", bestFor: "Caribbean + lagoon views",       specs: "Greg Norman · Par 72 · 7,218 yards · 18 holes + 9-hole short course", photos: ["https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=1600&q=85"], note: "Located within 930 acres of the Playa Mujeres Resort, ideally situated between the Caribbean Sea and the Chachmuchuc Lagoon, with jungle vegetation that narrows the fairways at several points. Daily trade winds add strategic challenge. A nine-hole short course completed in 2024 by Greg Norman Golf Course Design joins the championship layout — 27 holes total. Green fees include round-trip hotel transportation. Paspalum SeaDwarf grass. 20 minutes north of CUN.",                            standout: "Caribbean and lagoon views from multiple holes — the ocean glimpses on the back nine are the most dramatic on the corridor north of Mayakoba." },
    { tier: "resort",  verified: true, fee: "$250 – $353",  name: "El Camaleón at Mayakoba",        difficulty: "4/5", bestFor: "PGA Tour pedigree · cenote routing",  specs: "Greg Norman · Par 72 · Championship · Playa del Carmen", photos: ["https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1600&q=85"],                       note: "The editorial centerpiece of Caribbean golf in Mexico. Hosted the PGA Tour Mayakoba Golf Classic from 2007 to 2022 — the only PGA Tour event in Mexico during that run. Norman's routing weaves through three distinct ecosystems: mangrove, jungle, and beach, with a cenote crossing on the par-3 7th that is unlike any hole in the country. Limestone walls drop to the cenote below; the green floats above it. Access limited to guests of the Mayakoba resort hotels: Andaz, Banyan Tree, Fairmont, and Rosewood Mayakoba. Green fees include transportation.",                       standout: "#7 — Par 3 over a natural cenote with limestone walls and clear Caribbean water below the green. The most photographed hole in the Riviera Maya." },
    { tier: "public",  verified: true, fee: "$180",          name: "El Tinto (Riviera Cancun Golf Club)", difficulty: "3/5", bestFor: "Pre-flight round · 10 min from CUN", specs: "Jack Nicklaus + Nick Price (El Tinto) · Par 72 · 6,791 yards", photos: ["https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1600&q=85"],                     note: "Two courses, one property. Riviera Cancun Golf Club is a Jack Nicklaus design at 7,060 yards, carved using the terrain's natural contours, with ocean views throughout. El Tinto is 18 holes, par 72, 6,791 yards — designed by Nick Price, who took advantage of the area's abundant environmental resources. Both courses are located near Cancun airport, making them the pre-flight round on the corridor. Open 7:00am to 4:00pm. Transportation available from Hotel Zone.",                                                                                                       standout: "#14 and #15 are the signature holes on the Nicklaus layout. El Tinto — the vertical movement and natural rockwork make it one of the more distinctive inland rounds in the region." },
    { tier: "resort",  verified: true, fee: "$310 · twilight $190",  name: "Moon Palace Golf Club",          difficulty: "3/5", bestFor: "All-inclusive bundle",         specs: "Jack Nicklaus · Par 72 · 27 holes · 2002", photos: ["https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85"],                                          note: "The first Jack Nicklaus-designed golf course in Cancun. 27 holes offering almost 11,000 yards of play across three combination 18-hole layouts: Dunes & Jungle, Jungle & Lakes, and Lakes & Dunes. All-inclusive format: golf carts with GPS, air-conditioned snack bar, pro shop, and full-service restaurant. Tee times from 6:00am. All-inclusive guests can access golf for cart fee only ($38 first round, $19 subsequent) — the strongest all-inclusive value play on the corridor for golfers who plan 3+ rounds.",                                                                            standout: "Lakes nine — the toughest of the three. Native wetlands, strategically placed bunkers, and jungle corridors create a significantly harder test than the scorecard suggests." },
    { tier: "resort",  verified: true, fee: "$109/day (Iberostar guests)", name: "Iberostar Cancun Golf Club", difficulty: "3/5", bestFor: "Hotel Zone · Mayan ruins on #16", specs: "Isao Aoki + Pedro Guereca · Par 72 · 6,735 yards · 1994", photos: ["https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=85"],                       note: "A par-72 layout by Isao Aoki featuring multiple tee options to suit both casual players and low handicappers. Strategic water hazards — natural lagoons and canals come into play on several holes. Mayan ruins dating back to 500 AD provide a unique backdrop on the 16th hole. Nestled between the Caribbean Sea and Nichupté Lagoon, with frequent wildlife sightings including iguanas and crocodiles. Green fees include golf cart, food, beverages, and practice balls. The easiest tee time to secure in Cancun proper.",                                                            standout: "#16 — Mayan ruins (500 AD) as the backdrop. The only hole in Mexico with pre-Columbian ruins in the field of play." },
    { tier: "public",  verified: true, fee: "Direct booking",  name: "PGA Riviera Maya",              difficulty: "4/5", bestFor: "Cenote architecture · Korn Ferry 2025", specs: "Robert Trent Jones Jr. · Par 72 · 7,272 yards · 2010 · 18 holes + 9-hole par-3", photos: ["https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1600&q=85"], note: "During RTJ Jr.'s first week designing this course, he came armed with only a machete, his feet, and x-ray vision. The 290 acres were so dense with jungle he needed to design with the soles of his feet to know where to cut. 27 holes cut deep into a limestone quarry, with fairways emerging from the natural contours of a dense jungle combined with mangroves. Natural water, rock, cenotes, and native jungle are integral design elements. First PGA of America partner destination in Latin America (2019). Won Best Golf Course in Mexico at the 2024 World Golf Awards. Host of Mexico's first Korn Ferry Tour event in 2025. 90 min from CUN.",   standout: "Cenotes integrated into the course as architectural features — not water hazards to avoid but genuine design elements that make this the most technically distinctive round in the region." },
    { tier: "public",  verified: true, fee: "$270 · twilight $165",   name: "Puerto Cancun Golf Club",          difficulty: "3/5", bestFor: "Marina views · #18 island green", specs: "Tom Weiskopf · Par 72 · 7,241 yards · 2013", photos: ["https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1600&q=85"],                                       note: "Situated between Cancun's hotel zone and the downtown area. Tom Weiskopf's design allows the natural beauty of the tropical landscape to be the star. Several holes play along the shoreline and Marina — almost every hole offers views of the Caribbean. Stretches to just over 7,200 yards from the back tees. The 18th green is situated on an island in Puerto Cancun's major canal. The par-4 14th plays parallel to the Caribbean shoreline for more than 400 yards. Golf Advisor Top 10 in Mexico every year 2020–2024. Toptracer at the driving range.",                                       standout: "#18 — Island green in Puerto Cancun's main canal. The most dramatic closing hole in Cancun proper." },
    { tier: "public",  verified: false, fee: "Advance booking",  name: "Gran Coyote Golf",            difficulty: "3/5", bestFor: "Nick Price design · low impact",       specs: "Nick Price · Par 71 · 7,043 yards · Corasol · Playa del Carmen",                  note: "Formerly Grand Coral Golf Club. Nick Price laid heavy emphasis on minimal environmental impact — employing biologists and environmental consultants to determine how to minimize water consumption and protect native wildlife. The dense jungle comes into play along the fairways, requiring accuracy to navigate. Water hazards on several holes, strategically placed bunkers near the greens. Green fee includes shared cart with GPS, range balls, clubhouse facilities, and beach club access. 7 acres of lakes. Paspalum grass. 30 min from CUN.",                                       standout: "#5 signature hole · #7 at nearly 600 yards with angled green · closing four holes described as the hardest finish in the region." },
  ],

  costsLabel: "The math",
  costsH2Pre: "The widest pricing range",
  costsH2Em: "in Mexican golf.",
  costsIntro: "All-inclusive resorts bundle golf into the room rate. Standalone Mayakoba and Playa Mujeres bookings run premium. The all-inclusive arbitrage is the entire game here.",
  costs: [
    ["Flights (commercial)",     "$210",   "$480",    "25+ direct US cities to CUN"],
    ["Accommodation (4 nights)", "$1,100", "$3,800",  "All-inclusive → Mayakoba luxury"],
    ["Green fees (3 rounds)",    "$510",   "$870",    "Or bundled in room rate"],
    ["Caddie tips",              "$60",    "$120",    "$20–$40 per round standard"],
    ["Club rentals (optional)",  "$0",     "$120",    "Available at all major courses"],
    ["Ground transport",         "$120",   "$340",    "Resort shuttle → private SUV"],
    ["Food & beverage",          "$200",   "$900",    "Often included in all-inclusive"],
    ["Total all-in (per person)","$2,200", "$6,590",  "Mid-season · 4 nights · 3 rounds"],
  ],
  callouts: [
    { icon: "🏨", label: "The all-inclusive arbitrage", body: "Moon Palace, Iberostar, and Hard Rock bundle unlimited golf into the room rate. If you're playing 4+ rounds, the all-inclusive math beats a standalone Mayakoba stay by a wide margin. Moon Palace: $310 standalone, or $38 first round / $19 replay for all-inclusive guests. The trade-off is property quality. The rounds are effectively paid for at check-in." },
    { icon: "🌀", label: "The hurricane window",        body: "August through October is statistically the highest-risk window for the Caribbean coast. Travel insurance with hurricane coverage is standard for any trip booked in this window. The off-season pricing reflects the risk." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and along the coast.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Cancun International (CUN) — direct service from 25+ US cities. Customs typically 20–45 minutes. Multiple FBO options for private aviation. Tulum International (TQO), opened 2023, serves the south end of the corridor." },
    { icon: "car",    title: "Getting to courses",  body: "Highway 307 runs the length of the Riviera Maya — well-maintained, signed in English, tolls $8–$15 USD for the full stretch. CUN → Playa Mujeres: 20 min north. CUN → El Tinto / Puerto Cancun: 10–20 min. CUN → Moon Palace: 20 min south. CUN → Iberostar: 20 min south (Hotel Zone). CUN → Mayakoba / El Camaleón: 50 min south. CUN → Gran Coyote: 60 min south. CUN → PGA Riviera Maya: 90 min south." },
    { icon: "map",    title: "Between courses",    body: "Mayakoba's courses share a single property — walking distance between clubhouses. Moon Palace, Hard Rock, and Iberostar sit within the Hotel Zone cluster. Puerto Cancun is standalone, between the Hotel Zone and downtown. Most courses include hotel transportation in the green fee for groups of 2+." },
    { icon: "dollar", title: "Currency + tips",    body: "USD accepted everywhere. Most green fees quoted in USD. Tip caddies $20–$40 per round. Highway tolls available in pesos or USD at the booths." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",     sub: "Dec – Apr · 75–85°F · Very High · $$$",   body: "Low humidity, minimal rain, manageable trade winds. Christmas through Easter sells out all-inclusive inventory 4–8 months in advance. Book early or shift to shoulder." },
    { title: "Shoulder Season", sub: "May – Jul · 80–90°F · Moderate · $$",     body: "Warmer, more humid, rooms drop 25–40% off peak. Morning tee times finish before the humidity peaks. Best value window for Mayakoba and Playa Mujeres." },
    { title: "Hurricane / Off", sub: "Aug – Nov · 80–90°F · Low · $",            body: "Highest hurricane-risk window in Mexico. Insurance non-negotiable. Late November transitions to peak as the season closes — sharpest end-of-off-season rates." },
  ],

  faqs: [
    { q: "How many golf courses are in Cancun and the Riviera Maya?", a: "Cancun and the Riviera Maya have more than 12 championship golf courses along 80 miles of Caribbean coastline, from Playa Mujeres north of Cancun all the way to PGA Riviera Maya near Tulum. Key designers include Greg Norman (Playa Mujeres, El Camaleón), Jack Nicklaus (Moon Palace, Riviera Cancun Golf Club), Tom Weiskopf (Puerto Cancun), Nick Price (El Tinto, Gran Coyote), and Robert Trent Jones Jr. (PGA Riviera Maya). Most courses are resort-affiliated but publicly accessible with advance booking." },
    { q: "What is El Camaleón at Mayakoba?", a: "El Camaleón at Mayakoba is a Greg Norman-designed championship course at the Mayakoba resort complex in Playa del Carmen, Mexico. It hosted the PGA Tour Mayakoba Golf Classic from 2007 to 2022 — the only PGA Tour event in Mexico during that period. The course routes through three ecosystems: mangrove, jungle, and beach, with the famous par-3 7th hole playing over a natural limestone cenote. Access is limited to guests of the Mayakoba resort hotels: Andaz, Banyan Tree, Fairmont, and Rosewood." },
    { q: "What is the best golf course in Cancun?", a: "El Camaleón at Mayakoba is the most historically significant — PGA Tour host for 15 years. Puerto Cancun Golf Club is the most consistently ranked by Golf Advisor (#2 in Mexico in 2020, #8 in 2024). Playa Mujeres offers the best combination of ocean views and public access. PGA Riviera Maya (near Tulum) won Best Golf Course in Mexico at the 2024 World Golf Awards. The right answer depends on where you are staying and whether you prioritize access, tournament pedigree, or scenery." },
    { q: "Can tourists play El Camaleón at Mayakoba?", a: "Yes, but only as guests of the four Mayakoba resort hotels — Andaz, Banyan Tree, Fairmont, or Rosewood Mayakoba. There is no public day-pass. The green fee runs $250–$353 USD including transportation. For publicly accessible courses in the Playa del Carmen area, Playa Mujeres, Puerto Cancun, Gran Coyote, and PGA Riviera Maya all offer direct booking without a resort stay." },
    { q: "What is the all-inclusive golf option in Cancun?", a: "Moon Palace Golf Club offers the strongest all-inclusive golf package in Cancun. All-inclusive guests pay only $38 for the first round and $19 for subsequent rounds (plus cart fee) — instead of the $310 standard green fee. Iberostar Cancun Golf Club offers unlimited golf at $109 per day for the 2025–2026 season for Iberostar guests. Hard Rock Riviera Maya also bundles golf into the room rate. The all-inclusive math works for golfers playing 3+ rounds during a stay." },
    { q: "What is PGA Riviera Maya?", a: "PGA Riviera Maya is an 18-hole championship course designed by Robert Trent Jones Jr., opened in 2010 at Tulum Country Club, approximately 90 minutes south of Cancun. It was the first PGA of America partner destination in Latin America (2019), won Best Golf Course in Mexico at the 2024 World Golf Awards, and hosted Mexico's first Korn Ferry Tour event in 2025. The course features cenotes, limestone terrain, and dense jungle — the design required a machete and RTJ Jr.'s feet rather than a conventional survey instrument." },
    { q: "What is the best time to play golf in Cancun?", a: "December through April — dry, 75–85°F, low humidity, manageable trade winds. For the best value, May and early July deliver near-peak conditions with rooms 25–40% off peak rates. Avoid August through October: the highest hurricane-risk window on the Caribbean coast. Late November transitions back toward peak as the hurricane season closes — the sharpest end-of-off-season rates on the corridor. Travel insurance with hurricane coverage is standard for any trip booked in the off-season window." },
    { q: "How much does a golf trip to Cancun cost?", a: "A 4-night, 3-round trip to Cancun and the Riviera Maya runs $2,200 on the lower end (all-inclusive resort with bundled golf) to $6,590 at the luxury tier (Mayakoba-level accommodation plus standalone green fees). The all-inclusive arbitrage is the key variable: Moon Palace guests can play 3 rounds for under $100 total — a fraction of the $870 standalone cost for the same number of rounds at premium courses. Green fees alone range from $89 (resort guest rate) to $353 at Playa Mujeres." },
  ],

  credentials,
};

/* ─────────── PUERTO VALLARTA · RIVIERA NAYARIT ─────────── */

const PUERTO_VALLARTA = {
  slug: "puerto-vallarta",
  name: "Puerto Vallarta",
  region: "Jalisco · Riviera Nayarit",
  heroPhoto: null,
  seoTitle: "Golf in Puerto Vallarta: Courses, Costs & PGA Tour Venue (2026) | Golf in Mexico°",
  seoDescription: "Eight championship golf courses around Banderas Bay, the only PGA Tour venue in the region (Vidanta Norman), and Mexico's strongest value tier for Nicklaus and Weiskopf pedigree designs.",
  sources: [
    "PGA Tour — Mexico Open at VidantaWorld official records",
    "Vista Vallarta Golf Club — course records and 2002 WGC-World Cup archive",
    "Golf Advisor — Mexico course rankings 2020–2024",
    "Vidanta resort — green fee and caddie pricing (Q1 2026)",
    "Banco de México — peso/USD exchange data (May 2026)",
  ],
  heroLabel: "Destination Guide · Puerto Vallarta",
  h1Pre: "Golf in",
  h1Em: "Puerto Vallarta.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "8",          label: "Courses around the bay" },
    { num: "PGA Tour",   label: "Vidanta Norman (since 2022)" },
    { num: "$149–$285",  label: "Green fees" },
    { num: "Nov – May",  label: "Best months" },
  ],
  heroAnswer:
    "Puerto Vallarta and Banderas Bay have eight championship golf courses within 45 minutes of the airport — designed by Jack Nicklaus, Tom Weiskopf, Greg Norman, Robert von Hagge, and Joe Finger. Green fees run $149 to $285 per round. The Vidanta Norman Course is the only active PGA Tour venue in the region. This is Mexico's most underrated golf destination.",

  quickFacts: [
    { icon: "flag",      label: "Courses",       value: "8 around Banderas Bay" },
    { icon: "pencil",    label: "Designers",     value: "Jack Nicklaus · Tom Weiskopf · Greg Norman · Robert von Hagge · Joe Finger · Percy Clifford" },
    { icon: "dollar",    label: "Green fees",    value: "$149 – $285 USD per round" },
    { icon: "calendar",  label: "Best months",   value: "November – May" },
    { icon: "alert",     label: "Avoid",         value: "July – October (rain + humidity)" },
    { icon: "plane",     label: "Airport",       value: "Puerto Vallarta International (PVR)" },
    { icon: "person",    label: "Caddie",        value: "Optional at most · mandatory at Vidanta Norman" },
    { icon: "flag",      label: "PGA Tour",      value: "Mexico Open at VidantaWorld — Vidanta Norman (annual since 2022)" },
    { icon: "dollar",    label: "Value",         value: "30–40% below Cabo or Punta Mita for comparable pedigrees" },
    { icon: "dollar",    label: "USD",           value: "Accepted everywhere" },
  ],

  overviewLabel: "The bay",
  overviewH2Pre: "Vallarta golf —",
  overviewH2Em: "the bay-wrapping geography.",
  overviewParagraphs: [
    "Banderas Bay is the largest bay on Mexico's Pacific coast. Puerto Vallarta sits on the south arm in Jalisco. Riviera Nayarit wraps the north arm, with Nuevo Vallarta, Bucerías, and Punta Mita carrying the resort load. Eight golf courses ring the bay — all within 45 minutes of the airport.",
    "The two anchors are Vista Vallarta (Jack Nicklaus + Tom Weiskopf, both opened April–November 2001, World Cup host 2002) on the hillsides above the city, and the Vidanta Norman Course (Greg Norman, PGA Tour Mexico Open venue since 2022) in Nuevo Nayarit just north of the Ameca River. Both sit within 20 minutes of PVR airport.",
    "The corridor makes an honest case for best value in Mexican golf. The same design pedigrees — Nicklaus, Norman, Weiskopf — that command $395+ in Los Cabos and Punta Mita run $150–$285 in Puerto Vallarta. Vista Vallarta hosted the 2002 WGC-World Cup on the same Nicklaus greens. The Vidanta Norman Course hosts the PGA Tour annually. The value is structural, not seasonal. The city amplifies everything: old-town Zona Romántica, the Malecón, the bay restaurants. Puerto Vallarta is the golf destination you bring non-golfers to and they don't notice they're at a golf destination.",
  ],
  overviewStats: [
    { num: "8",       label: "Courses around Banderas Bay" },
    { num: "25 mi",   label: "Bay span tip to tip" },
    { num: "2002",    label: "WGC-World Cup at Vista Vallarta" },
    { num: "30–40%",  label: "Below Cabo / Punta Mita pricing" },
  ],

  playbookH3Pre: "Your free",
  playbookH3Em: "2026 PV Travel Brief.",
  playbookBody: "The full Puerto Vallarta guide as a PDF. Jungle-and-mountain courses worth the trip, how to pair PV with Punta Mita, and the restaurants worth a reservation. Sent to your inbox in 60 seconds.",

  photoStrip: [
    { label: "Vista Vallarta · Nicklaus / Weiskopf" },
    { label: "Banderas Bay · Pacific Coast" },
    { label: "Marina Vallarta · Original Routing" },
  ],

  coursesLabel: "The courses",
  coursesH2Pre: "Six courses",
  coursesH2Em: "worth your round.",
  coursesIntro: "The Banderas Bay golf belt — anchored by the only active PGA Tour venue in the region.",
  courses: [
    { tier: "public",  verified: true, fee: "Public + caddies $28–$67", name: "Vidanta Norman Course (PGA Tour)",   difficulty: "4/5", bestFor: "Only active PGA Tour venue in PV",   specs: "Greg Norman · Par 73 (Par 71 PGA Tour) · 7,200 yards", photos: ["https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?auto=format&fit=crop&w=1600&q=85"], note: "The only active PGA Tour venue in Puerto Vallarta. Designed by Greg Norman. Host of the Mexico Open at VidantaWorld since 2022 — an official PGA Tour event awarding 500 FedEx Cup points to the winner. Jon Rahm won in 2022, Tony Finau in 2023, Jake Knapp in 2024. The 2026 event moves to October 29–November 1 with a $6 million purse. \"Renovation of the Year\" by Golf Inc. magazine in 2022. Wall-to-wall paspalum, layout winds along the Ameca River with views of the Sierra Madre. 15 lakes. 49 bunkers. The longest golf cart suspension bridge in the world — 560 feet spanning the Ameca River — connects the clubhouse to the course. Hole 10 was ranked the toughest on the 2023 PGA Tour. Open to Vidanta resort guests and public with advance booking. Caddies mandatory and paid in cash at the course (Single $28 · 2-some $45 · 3-some $56 · 4-some $67).", standout: "#7 — driveable par 4 at 297 yards. Water left, bunkers right. One of the most discussed risk-reward holes on the Mexico Open schedule." },
    { tier: "public",  verified: false, fee: "$235 – $285", name: "Vista Vallarta — Nicklaus Course", difficulty: "4/5", bestFor: "WGC pedigree · Banderas Bay views", specs: "Jack Nicklaus · Par 72 · 7,074 yards · Opened April 2001", note: "The most prestigious public course in the Puerto Vallarta corridor. Perched at the property's highest elevation — breathtaking views of Puerto Vallarta, the Marina, and Banderas Bay from nearly every tee box. Grassy hillsides, dense forests of palm and giant ficus trees, natural creeks and arroyos. True to Nicklaus style: wildly undulating greens balanced by generous driving areas. Host of the 2002 WGC-World Cup. Course record: 62, Phil Mickelson. Rating: 73.8 · Slope: 144. 15 min from PVR.",                                                                                                                                                                                                                                                                                                                                                       standout: "#3 — par 5, 550 yards. Three strong shots required. Elevation rises with every swing. The most demanding hole on the Banderas Bay corridor." },
    { tier: "public",  verified: false, fee: "$210 – $265", name: "Vista Vallarta — Weiskopf Course", difficulty: "3/5", bestFor: "More accessible mixed-group round", specs: "Tom Weiskopf · Par 72 · 6,993 yards · Opened November 2001", note: "The more accessible side of Vista Vallarta's double routing. Built on the property's lower west end — dense jungle, deep ravines, swift creeks. A dramatically different landscape from the Nicklaus course despite sharing the same clubhouse. Fewer blind shots and more receptive greens make it the preferred round for mixed-handicap groups. Wide fairways, natural hazards, Weiskopf's signature finesse on the par 3s. Rating: 74.7 (gold) · Slope: 138.",                                                                                                                                                                                                                                                                                                                                                                                                                                          standout: "#15 — uphill par 3 over a ravine. Multi-tiered green, bunkers on all sides. Concentration required from the tee." },
    { tier: "public",  verified: false, fee: "$180 – $225", name: "Marina Vallarta Golf Club",         difficulty: "3/5", bestFor: "Original PV routing · 5 min from PVR", specs: "Joe Finger · Par 71 · 6,573 yards · Opened 1989",      note: "The original Vallarta routing and the most centrally located course in the city. Joe Finger's 1989 design sits in the heart of the Marina Vallarta residential and hotel zone — 5 minutes from PVR. Water protects 9 greens. Three holes have views of Banderas Bay and the Sierra Madre. Crocodiles sunbathe near the water hazards. Iguanas in the rough. Tropical birds overhead — 100+ species on site. The 11th–15th stretch is consistently cited as the best run of holes on the course. Hacienda-style clubhouse. Hosts the International Pro-Am annually each December — one of the largest Pro-Am tournaments in the world. Cart, practice facilities 30 min before tee time, and taxes included in green fee. TaylorMade and Callaway rentals available.",                                                                                              standout: "#18 — long par 4 with crocodile lagoon on the right. The one hole where your scorecard and your instincts are in conflict." },
    { tier: "public",  verified: false, fee: "$200 – $250", name: "El Tigre Golf Club",                difficulty: "4/5", bestFor: "Demanding water-heavy routing",    specs: "Robert Von Hagge, Smelek & Baril · Par 72 · 7,239 yards", note: "Nine water features come into play on 12 holes. Challenge brief: \"Create the most exciting championship golf course in Mexico.\" Von Hagge transformed a flat piece of land into a championship routing with molded elevation changes, 9 water features on 12 holes, and \"beach bunkers\" lurking at almost every turn. The stone archway at the entrance resembles a Mayan temple. The course finishes with two of its toughest holes. Champion Bermuda on greens, 419 Bermuda on fairways. Prevailing ocean winds — especially in late afternoon — add a variable the scorecard doesn't account for. Top 10 in Mexico 2008 (Golf Guide Magazine + Golf in Mexico Magazine).",                                                                                                                                                                                                                                  standout: "#16 — par 4, 421 yards, long dogleg right. Approaches to a peninsula green. The hole that defines the course's water-and-accuracy character." },
    { tier: "public",  verified: false, fee: "$149 high season", name: "Flamingos Golf Club",            difficulty: "2/5", bestFor: "Strongest value under $150",    specs: "Percy Clifford · Par 72 · 6,853 yards · 1978",          note: "The oldest course in Banderas Bay and the strongest value on the corridor under $150 per round. Percy Clifford's 1978 design built as a cornerstone of the Nuevo Vallarta resort development. Parkland routing with natural mangroves, turquoise lagoons, and tropical rainforest. Rolling hills, 9 water hazards, 43 sand bunkers. More than 100 bird species have been recorded on the property. Fair for all levels: long broad lanes alternate with doglegs and narrow short holes. Greens slightly fast. Not spectacular — but honest, well-maintained, and accessible from any hotel in Nuevo Vallarta with free return transportation. Fee includes shared cart, water, range balls. High season: Nov 1 – Apr 30.",                                                                                                                                                                                              standout: "#17 — par 3 from elevated tee, views of the Pacific and tropical landscape. The most scenic hole on the course." },
  ],

  costsLabel: "The math",
  costsH2Pre: "Mexico's value tier",
  costsH2Em: "for championship golf.",
  costsIntro: "Comparable Nicklaus and Norman pedigrees run 30–40% below Cabo or Punta Mita. The room rate is the primary variable.",
  costs: [
    ["Flights (commercial)",     "$240",   "$520",    "LAX · DFW · IAH · ORD · SFO"],
    ["Accommodation (4 nights)", "$680",   "$2,800",  "Old-town boutique → Grand Velas"],
    ["Green fees (3 rounds)",    "$525",   "$795",    "Vista Nicklaus + Marina + Vidanta Norman"],
    ["Caddie tips",              "$45",    "$120",    "Mandatory at Vidanta ($28–$67) · optional elsewhere"],
    ["Club rentals (optional)",  "$0",     "$120",    "TaylorMade + Callaway available"],
    ["Ground transport",         "$80",    "$220",    "Taxi corridor + bay crossing"],
    ["Food & beverage",          "$350",   "$1,100",  "City restaurants + clubhouse"],
    ["Total all-in (per person)","$1,920", "$5,675",  "Mid-season estimate · 4 nights · 3 rounds"],
  ],
  callouts: [
    { icon: "🏡", label: "The city advantage",         body: "Vallarta is the only Mexican golf destination where the city itself rivals the golf. Zona Romántica, the Malecón, the bay restaurants, the Saturday market in Sayulita. Bring non-golfers — they won't notice they're at a golf destination." },
    { icon: "🌉", label: "The bay-crossing logistics", body: "Half the courses sit on the south arm (Vista Vallarta, Marina Vallarta), half on the north arm (El Tigre, Flamingos, Vidanta). Pick your hotel based on which half you'll play more. Crossing the bay daily eats 35–50 minutes round-trip via the perimeter highway, or 20 minutes via the toll bridge ($4 USD)." },
  ],

  logisticsLabel: "On the ground",
  logisticsH2Pre: "Getting there",
  logisticsH2Em: "and around the bay.",
  logistics: [
    { icon: "plane",  title: "Airport + arrivals",  body: "Puerto Vallarta International (PVR) — direct from 20+ US cities: DFW, IAH, LAX, ORD, SFO, PHX, YYZ and more. Customs 30–45 min. PVR sits exactly between the south-arm and north-arm golf — equidistant to either side of the bay." },
    { icon: "car",    title: "Getting to courses",  body: "PVR → Vista Vallarta: 15 min. PVR → Marina Vallarta: 5 min. PVR → El Tigre / Flamingos (Nuevo Vallarta): 15 min. PVR → Vidanta Norman: 20 min. The most compact golf geography in Mexico." },
    { icon: "map",    title: "Between courses",    body: "South arm (Vista, Marina) to north arm (El Tigre, Flamingos, Vidanta) via perimeter highway: 35–50 min. Toll bridge: 20 min ($4 USD each way). Plan course pairs on the same arm where possible." },
    { icon: "dollar", title: "Currency + tips",    body: "USD accepted everywhere. Pesos preferred for taxis. Caddie fees at Vidanta Norman are mandatory and paid in cash at the course — bring MXN or USD bills. Uber operates city-wide and reaches every major course." },
  ],

  seasonLabel: "The calendar",
  seasonH2Pre: "When",
  seasonH2Em: "to play.",
  seasonBlocks: [
    { title: "Peak Season",       sub: "Nov – Apr · 72–85°F · High · $$$",   body: "Dry, warm, low humidity. The window every visiting golfer should target. Vista Vallarta and El Tigre fill 4–8 weeks in advance during Christmas through Easter. Flamingos high-season rate (Nov 1 – Apr 30): $149. Book early." },
    { title: "Shoulder Season",   sub: "May – Jun · 80–90°F · Moderate · $$", body: "Warmer, slightly more humid. Rooms drop 25–35% off peak. Course conditions remain strong through May before the rains arrive. The value window." },
    { title: "Rain / Hurricane",  sub: "Jul – Oct · 82–92°F · Low · $",       body: "Tropical storms and afternoon thunder. Mornings still playable. October is the sharpest value window as the hurricane season closes mid-month. 2026 PGA Tour Mexico Open: October 29 – November 1." },
  ],

  faqs: [
    { q: "How many golf courses are in Puerto Vallarta?", a: "Eight championship golf courses ring Banderas Bay within 45 minutes of Puerto Vallarta International Airport. They are divided between the south arm (Jalisco: Vista Vallarta Nicklaus, Vista Vallarta Weiskopf, Marina Vallarta) and the north arm (Nayarit: El Tigre, Flamingos, Vidanta Norman, and the Punta Mita peninsula courses). All eight are within a 45-minute drive of PVR. Green fees range from $149 at Flamingos to $285 at Vista Vallarta." },
    { q: "What is the Vidanta Norman course?", a: "The Vidanta Norman Course at VidantaWorld in Nuevo Vallarta is a Greg Norman-designed championship layout and the only active PGA Tour venue in the Puerto Vallarta corridor. It has hosted the Mexico Open at VidantaWorld since 2022. Past winners include Jon Rahm (2022), Tony Finau (2023), and Jake Knapp (2024). The course plays par 73 for resort guests and converts to par 71 for the PGA Tour event. Caddies are mandatory and paid in cash at the course." },
    { q: "What is Vista Vallarta Golf Club?", a: "Vista Vallarta Golf Club is a 478-acre property in Puerto Vallarta, Mexico, offering two championship courses opened in 2001: the Jack Nicklaus Signature course (par 72, 7,074 yards) and the Tom Weiskopf design (par 72, 6,993 yards). Both are public. The Nicklaus course hosted the 2002 WGC-World Cup — the 24-team international competition that included Tiger Woods and Ernie Els. Course record is 62, held by Phil Mickelson. Located 15 minutes from PVR." },
    { q: "Is golf in Puerto Vallarta cheaper than in Los Cabos?", a: "Yes, consistently 30–40% less expensive. Vista Vallarta offers Jack Nicklaus and Tom Weiskopf championship designs for $210–$285 per round. Comparable Nicklaus designs in Los Cabos run $315–$500. Flamingos Golf, Percy Clifford's 1978 design, is $149 high-season — the lowest championship green fee on any corridor covered by GIM. The Vidanta Norman PGA Tour venue is publicly accessible with mandatory caddies at $28–$67, added separately to the green fee." },
    { q: "What is the best time to play golf in Puerto Vallarta?", a: "November through April — dry, 72–85°F, low humidity. For best value, May delivers near-peak conditions with rooms 25–35% off peak rates. Avoid July through October: tropical storms and afternoon rain. October is the sharpest off-season value window, and the 2026 PGA Tour Mexico Open at Vidanta takes place October 29 – November 1, making late October an ideal time to combine a tournament visit with your own rounds." },
    { q: "Can you walk to the golf courses in Puerto Vallarta?", a: "No. All courses require transport — but logistics are the most compact of any Mexican golf destination. PVR to Marina Vallarta is 5 minutes. PVR to Vista Vallarta and El Tigre is 15 minutes each. PVR to Vidanta Norman is 20 minutes. Uber operates city-wide and reaches every course. For golfers staying in the Hotel Zone or Marina, Vista Vallarta, Marina Vallarta, and El Tigre are all reachable in under 20 minutes from any major hotel." },
    { q: "How much does a golf trip to Puerto Vallarta cost?", a: "A 4-night, 3-round trip to Puerto Vallarta runs $1,920 on the accessible end (old-town hotel + Flamingos + Vista Vallarta + Marina Vallarta) to $5,675 at the premium tier (Grand Velas or equivalent + Vista Nicklaus + Vidanta Norman + El Tigre). The primary variable is accommodation. Green fees run 30–40% below Cabo or Punta Mita for comparable design pedigrees — making Puerto Vallarta the strongest value proposition in championship golf along Mexico's Pacific coast." },
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
  h1Pre: "Hidden",
  h1Em: "Mexico.",
  byline: "GIM Editorial · Field research by Pablo De La Mora & José Islas · Updated May 2026",
  stats: [
    { num: "12+",        label: "Hidden destinations" },
    { num: "Off-grid",   label: "Routings" },
    { num: "$120–$280",  label: "Green fees" },
    { num: "Year-round", label: "Selective windows" },
  ],
  heroAnswer:
    "Beyond the headline corridors, Mexico hides another dozen destinations worth the detour — colonial towns, quiet Pacific bays, lakeside highlands, Caribbean limestone. Each one is a complete trip on its own. Each one is worth a week.",

  quickFacts: [
    { icon: "flag",      label: "Destinations",  value: "12+ hidden regional rounds" },
    { icon: "calendar",  label: "Best months",   value: "Varies by region — Oct to May for most" },
    { icon: "alert",     label: "Avoid",         value: "Region-specific rain windows" },
    { icon: "plane",     label: "Airports",      value: "MEX · QRO · BJX · ACA · MZT · LTO · MID · CME" },
    { icon: "globe",     label: "Languages",     value: "Spanish primary, English at major clubs" },
    { icon: "person",    label: "Caddie",        value: "Mostly optional · Regional variance" },
    { icon: "dollar",    label: "USD",           value: "Partial — pesos preferred regionally" },
  ],

  overviewLabel: "Off the headlines",
  overviewH2Pre: "Mexico is bigger than",
  overviewH2Em: "the five headline corridors.",
  overviewParagraphs: [
    "Beyond the names you already know, Mexico hides dozens of destinations worth flying for — colonial towns, quiet Pacific bays, lakeside highlands, Caribbean limestone. A few examples below. Full guides land quarterly.",
  ],
  overviewStats: [],

  playbookH3Pre: "Your free",
  playbookH3Em: "2026 Hidden Routings Travel Brief.",
  playbookBody: "The full Hidden Mexico guide as a PDF. The lesser-known destinations worth flying for, what makes each one different, and how to actually book the round. Sent to your inbox in 60 seconds.",

  photoStrip: [],

  coursesLabel: "A few examples",
  coursesH2Pre: "Places",
  coursesH2Em: "worth flying for.",
  coursesIntro: "",
  isDestinationList: true,
  destinations: [
    { name: "San Miguel de Allende", region: "Guanajuato" },
    { name: "Mérida",                region: "Yucatán" },
    { name: "Loreto",                region: "Baja California Sur" },
    { name: "Ciudad del Carmen",     region: "Campeche" },
    { name: "Valle de Bravo",        region: "Estado de Mexico" },
    { name: "Mazatlán",              region: "Sinaloa" },
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
    { q: "Which courses count as Mexico's hidden destinations?",          a: "Six regions worth the detour: Valle de Bravo (lakeside Nicklaus), Querétaro (highland Bajío trio), San Miguel de Allende (Faldo hillside), Acapulco (Tres Vidas), Mazatlán (Estrella del Mar), and Loreto (Rees Jones on the Sea of Cortez)." },
    { q: "Which one is best for a first visit?",        a: "San Miguel de Allende. The colonial city alone is worth the trip, the golf at Ventanas is excellent without being brutal, and the BJX airport is just over an hour from Mexico City." },
    { q: "Is Loreto worth the longer flight?",                     a: "Yes, especially if you've already done Cabo. Loreto feels like Cabo 30 years ago — dramatic Sea of Cortez terrain, very few crowds, direct LAX flights. Loreto Bay (Rees Jones) is the most remote championship round in Mexico." },
    { q: "How do I book these courses?",                                a: "Most aren't on standard booking channels. It's member-guest invitations, friend-of-the-property bookings, and direct emails. The Travel Brief covers the access channel for each destination." },
    { q: "Can I combine several of these on one trip?",       a: "We recommend against it. Each region has its own pace and needs at least 3 days to get a real feel. Hopping between them usually ruins the experience. Pick one per trip — come back for the next." },
    { q: "When's the best time to play highland golf in Mexico?",          a: "October through April. February is the sweet spot — clear, dry, cool mornings, mild afternoons. Avoid June through September (afternoon storms). Above 6,000 feet, every course plays half a club shorter — recalibrate on day one." },
  ],

  credentials,
};

const ALL_HUBS = [LOS_CABOS, PUNTA_MITA, MEXICO_CITY, CANCUN, PUERTO_VALLARTA, UNIQUE];

export const getHubData = (slug) => ALL_HUBS.find((h) => h.slug === slug);

export const KEEP_EXPLORING_HUBS = (currentSlug) =>
  ALL_HUBS
    .filter((h) => h.slug !== currentSlug)
    .slice(0, 5)
    .map((h) => ({ slug: h.slug, name: h.name, region: h.region }));

export default ALL_HUBS;
