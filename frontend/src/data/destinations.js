// Destination Hub data (look & feel — content marked GIM editorial)
// LIVE: los-cabos, punta-mita, mexico-city  |  COMING SOON: 3 more (rendered as strip)

export const COMING_SOON = [
  "Cancun · Riviera Maya",
  "Puerto Vallarta · Riviera Nayarit",
  "Unique Destinations",
];

const LOS_CABOS = {
  slug: "los-cabos",
  name: "Los Cabos",
  title: "Golf in Los Cabos: The Complete Course Guide",
  metaTitle: "Los Cabos Golf Guide: Courses, Costs & Insider Access (2026) | Golf in Mexico",
  heroImage: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=2400&q=85",
  dividerImage: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=2400&q=85",
  lastUpdated: "February 2026",

  // Section 1 — Hero Answer Block
  heroAnswer:
    "Los Cabos has 13 championship golf courses spread along a 33-kilometer corridor between Cabo San Lucas and San José del Cabo. Green fees range from $150 to $350 per round, with October through May offering the most consistent playing conditions. Designers here include Jack Nicklaus, Greg Norman, and Tiger Woods — his first completed course design.",

  // Section 2 — Quick Facts
  quickFacts: [
    ["Number of golf courses", "13 (public + resort + private)"],
    ["Course designers", "Nicklaus, Norman, Tiger Woods, RTJ Jr., Weiskopf, McLay Kidd, Mickelson"],
    ["Green fee range", "$150 – $350 USD"],
    ["Best months for golf", "October – May"],
    ["Months to avoid", "August – September (humidity + hurricane window)"],
    ["Nearest international airport", "Los Cabos International (SJD)"],
    ["Transfer time to nearest courses", "20 – 45 min (per Google Maps)"],
    ["Languages spoken at courses", "English and Spanish (all courses)"],
    ["Rental clubs available", "Yes — at all major courses"],
    ["Caddie required or optional", "Optional at most; required at private clubs"],
    ["USD accepted", "Yes (pesos preferred at small purchases)"],
  ],

  // Section 3 — Overview (4 sub-blocks)
  overview: [
    {
      h3: "Geography",
      text: "Los Cabos sits at the southern tip of the Baja California Sur peninsula, where the Sea of Cortez meets the Pacific. Direct flights operate from Dallas (DFW), Houston (IAH), Los Angeles (LAX), Chicago (ORD), Denver (DEN), and New York (JFK/EWR). The corridor runs east-west between Cabo San Lucas and San José del Cabo — a 33-kilometre drive that contains every championship course on this list.",
    },
    {
      h3: "Climate & course conditions",
      text: "October through May averages 75–82°F with low humidity and minimal rain — the season most courses run their full schedule. June through September brings 4–7 inches of rain per month and humidity above 75%. Hurricane risk peaks August through October (per NOAA). Wind is the defining variable: most coastal courses see 12–20 mph by 11 a.m. — book early tee times.",
    },
    {
      h3: "What makes Los Cabos distinct",
      text: "Three things: ocean-front Pacific holes (Quivira, Cabo del Sol, Diamante), desert-arroyo routings (Palmilla, Cabo Real), and the highest concentration of signature architects in Mexico. Tiger Woods' Diamante Oasis was his first completed design. Nicklaus designed three courses here. Greg Norman designed two. The 18th at Cabo del Sol Ocean was once called \"the finest finishing hole in all of golf\" by Nicklaus himself.",
    },
    {
      h3: "Course landscape",
      text: "Of the 13 championship courses, 5 offer public booking (with a resort or without), 6 are resort-guest only, and 2 are private with member-guest access. Per GIM field research (Feb 2026), Los Cabos has more $300+ green fees than any other golf destination in Mexico.",
    },
  ],

  // Section 4 — Course Roster
  courses: [
    {
      name: "Quivira Golf Club",
      designer: "Jack Nicklaus",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 295,
      feeHigh: 395,
      access: "Pueblo Bonito Pacifica / Sunset Beach guests",
      bestFor: "Cliff-edge par-3s above the Pacific — the most photographed routing in Cabo.",
      url: null,
    },
    {
      name: "Cabo del Sol — Ocean Course",
      designer: "Jack Nicklaus",
      type: "Public",
      holes: 18,
      par: 72,
      feeLow: 285,
      feeHigh: 375,
      access: "Open to all — direct booking",
      bestFor: "Three closing holes Nicklaus called the finest finishing stretch in golf.",
      url: null,
    },
    {
      name: "Cabo del Sol — Desert Course",
      designer: "Tom Weiskopf",
      type: "Public",
      holes: 18,
      par: 72,
      feeLow: 210,
      feeHigh: 285,
      access: "Open to all — direct booking",
      bestFor: "Honest desert-arroyo routing — the round Cabo locals actually play.",
      url: null,
    },
    {
      name: "Palmilla Golf Club",
      designer: "Jack Nicklaus",
      type: "Resort guest-only",
      holes: 27,
      par: 72,
      feeLow: 245,
      feeHigh: 315,
      access: "One&Only Palmilla guests",
      bestFor: "Three nines (Arroyo, Mountain, Ocean) — the oldest Nicklaus design in Cabo.",
      url: null,
    },
    {
      name: "Vidanta Los Cabos",
      designer: "Greg Norman",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 0,
      feeHigh: 0,
      access: "Vidanta resort guests (all-inclusive)",
      bestFor: "Included in Vidanta's all-inclusive — the rare \"free golf\" round in Cabo.",
      url: null,
    },
    {
      name: "Diamante — Dunes Course",
      designer: "Davis Love III / David McLay Kidd",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 295,
      feeHigh: 395,
      access: "Diamante members & invited guests",
      bestFor: "Pacific links — the 16th green sits below sea level, the only one in Mexico.",
      url: null,
    },
    {
      name: "Diamante — Oasis Course",
      designer: "Tiger Woods",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 350,
      feeHigh: 450,
      access: "Diamante members only",
      bestFor: "Tiger Woods' first completed design — minimalist desert routing.",
      url: null,
    },
    {
      name: "Puerto Los Cabos Golf Club",
      designer: "Jack Nicklaus + Greg Norman",
      type: "Resort guest-only",
      holes: 27,
      par: 72,
      feeLow: 235,
      feeHigh: 305,
      access: "Resort guests at Secrets / Zoetry / JW Marriott",
      bestFor: "Three nines designed by two different architects — Nicklaus + Norman.",
      url: null,
    },
    {
      name: "Chileno Bay Golf Course",
      designer: "Tom Fazio",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 285,
      feeHigh: 355,
      access: "Auberge Chileno Bay guests",
      bestFor: "Tom Fazio's only Cabo design — manicured to a tour standard.",
      url: null,
    },
    {
      name: "Solmar Golf Links",
      designer: "Greg Norman",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 195,
      feeHigh: 275,
      access: "Solmar Group resort guests",
      bestFor: "Pacific-facing Norman routing at the southern tip — the Land's End course.",
      url: null,
      isGIMProperty: true,
    },
    {
      name: "Trump International Golf Club Los Cabos",
      designer: "Tiger Woods (design role disputed — verify)",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 0,
      feeHigh: 0,
      access: "Members & invited guests",
      bestFor: "Members-only — featured in GIM's origin story.",
      url: null,
    },
    {
      name: "Twin Dolphin Golf Club",
      designer: "Todd Eckenrode (Origins Golf Design)",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 250,
      feeHigh: 325,
      access: "Maravilla Los Cabos & Montage guests",
      bestFor: "Coastal hills — the newer routing the locals have started preferring.",
      url: null,
    },
    {
      name: "Cabo Real Golf Club",
      designer: "Robert Trent Jones Jr.",
      type: "Public",
      holes: 18,
      par: 72,
      feeLow: 165,
      feeHigh: 245,
      access: "Open to all — direct booking",
      bestFor: "Older, weathered, honest — the most affordable championship round in Cabo.",
      url: null,
    },
  ],

  // Section 6 — True-Cost
  costNote:
    "Here is exactly what you will spend. Vidanta operates an all-inclusive model where golf is bundled into the room rate — no separate green fee. Diamante runs the highest standalone fees on the corridor. Twilight rates (after 1 p.m.) drop fees 30–40% at most courses. Caddie tips are customary at $30–40 USD per round; cart staff $5–10.",
  costRows: [
    ["Green fee", 165, 395, "Per round, peak season"],
    ["Cart fee", 0, 30, "Included at most; separate at Cabo Real"],
    ["Caddie (optional)", 60, 90, "Per 18 holes, before tip"],
    ["Caddie tip", 30, 50, "20–30% standard, before USD/MXN split"],
    ["Range balls", 0, 25, "Free at resort courses; paid at public"],
    ["Food & beverages", 30, 75, "Mid-round halfway-house items"],
    ["Club rental", 80, 150, "TaylorMade/Callaway at most courses"],
  ],

  // Section 7 — Access (4 categories)
  access: {
    public: [
      "Cabo del Sol Ocean — direct booking, no resort stay required.",
      "Cabo del Sol Desert — direct booking, often paired with the Ocean.",
      "Cabo Real — public, the most affordable championship round on the corridor.",
    ],
    resort: [
      "Quivira → Pueblo Bonito Pacifica & Sunset Beach guests.",
      "Palmilla → One&Only Palmilla guests.",
      "Vidanta Los Cabos → all-inclusive Vidanta resort guests.",
      "Diamante Dunes → Diamante resort & residence guests.",
      "Puerto Los Cabos → Secrets, Zoetry, JW Marriott Los Cabos.",
      "Chileno Bay → Auberge Chileno Bay guests.",
      "Solmar Golf Links → Solmar Group resort guests.",
      "Twin Dolphin → Maravilla Los Cabos & Montage guests.",
    ],
    cross: [
      "Auberge Resorts (Chileno Bay) and Discovery Land Co. (Diamante) honour reciprocal access on a case-by-case basis — verify with the GM at booking.",
      "Pueblo Bonito's two Pacifica properties share Quivira access — verify on the day before play.",
    ],
    private: [
      "Diamante Oasis (Tiger Woods) — member invitation only.",
      "Trump International Los Cabos — member-guest only, no public play.",
    ],
  },

  // Section 8 — Logistics
  logistics: {
    airport: "Los Cabos International (SJD) — direct from DFW, IAH, LAX, ORD, DEN, JFK, EWR, MSP, PHX. Customs runs 30–60 min on first-time arrivals.",
    toCourses: "SJD → corridor courses: 20–45 min by private transfer or rental car. Rental is advisable for multi-course trips — the corridor is too long for shuttle dependency.",
    betweenCourses: "Quivira (west) to Puerto Los Cabos (east): 50 min in mid-day traffic. Internal corridor highway is well-maintained and signed in English.",
    practical: "USD accepted at every course pro-shop and resort. Pesos preferred for taxis and small purchases. Tip caddies $30–40 per round, bag drop $5, shuttle drivers $5–10.",
  },

  // Section 9 — Season Guide (12 months)
  seasonRows: [
    ["January", "66 – 78", "Low", "Excellent", "High", "Peak season — book 8–12 weeks out"],
    ["February", "65 – 79", "Low", "Excellent", "Very High", "Presidents Day weekend sells out"],
    ["March", "67 – 81", "Low", "Excellent", "Very High", "Spring break — highest demand"],
    ["April", "70 – 84", "Low", "Excellent", "High", "Best month for course conditions"],
    ["May", "73 – 88", "Low", "Excellent", "Moderate", "Shoulder begins — prices drop"],
    ["June", "78 – 93", "Moderate", "Good (humid)", "Low", "Hot but playable; mornings only"],
    ["July", "81 – 95", "Moderate", "Fair", "Low", "Humidity peaks — twilight tee times"],
    ["August", "82 – 96", "High", "Variable", "Low", "Hurricane window opens — avoid"],
    ["September", "81 – 95", "High", "Variable", "Low", "Hurricane peak — avoid"],
    ["October", "78 – 92", "Moderate", "Improving", "Moderate", "Best value: prices low, weather turning"],
    ["November", "73 – 86", "Low", "Excellent", "High", "Thanksgiving sells out by August"],
    ["December", "67 – 80", "Low", "Excellent", "Very High", "Christmas + NYE — highest pricing of the year"],
  ],
  seasonNote:
    "April is the sweet spot: peak conditions, slightly lower demand than March. October is the budget play — prices drop 25–40% the week the hurricane window closes. Thanksgiving and Christmas weeks command 50%+ premiums and require booking 6+ months out.",

  // Section 13 — FAQ
  faq: [
    { q: "How many golf courses are in Los Cabos?", a: "Los Cabos has 13 championship courses along a 33-kilometre corridor between Cabo San Lucas and San José del Cabo. Designers include Jack Nicklaus, Greg Norman, Tom Weiskopf, Davis Love III, David McLay Kidd, Tiger Woods, and Phil Mickelson." },
    { q: "Can you play golf in Cabo without staying at a resort?", a: "Yes. Cabo del Sol (Ocean & Desert) and Cabo Real offer public tee times without a resort stay. Quivira, Palmilla, Diamante, Chileno Bay, Twin Dolphin, and Puerto Los Cabos require staying at an affiliated resort." },
    { q: "What is the best time of year to golf in Los Cabos?", a: "October through May. April delivers peak course conditions with slightly lower demand than spring break months. October offers the best price-to-condition ratio." },
    { q: "How much does a round of golf in Cabo cost?", a: "Green fees range $150 to $395 USD. Cabo Real is the most affordable championship round. Diamante and Quivira anchor the high end. Expect $400–500 all-in per person including cart, caddie, and tip." },
    { q: "Which is the best golf course in Los Cabos?", a: "It depends on what you want. For ocean drama: Quivira. For tournament-grade conditions: Cabo del Sol Ocean. For desert quiet: Cabo del Sol Desert. For an honest budget round: Cabo Real." },
    { q: "Do I need to bring my own clubs to Cabo?", a: "No. Every major course offers TaylorMade or Callaway rental sets at $80–150 USD per round. Bringing your own is recommended only if you prefer to avoid rental wear." },
    { q: "Are caddies required at Los Cabos golf courses?", a: "Optional at public and resort courses, required at private clubs (Diamante Oasis, Trump). A caddie is recommended on first-time visits to Quivira and Diamante for line and wind reads." },
  ],

  // Phase 2 placeholder targets
  journalTargets: ["WWT Cabo (PGA Tour)", "Trump International — GIM origin", "GSE Retreat: Panther & Trump"],
};

const PUNTA_MITA = {
  slug: "punta-mita",
  name: "Punta Mita",
  title: "Golf in Punta Mita: Pacifico, Bahia & Everything You Need to Know",
  metaTitle: "Punta Mita Golf Guide: Courses, Costs & Insider Access (2026) | Golf in Mexico",
  heroImage: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=2400&q=85",
  dividerImage: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=2400&q=85",
  lastUpdated: "February 2026",

  heroAnswer:
    "Punta Mita has two championship golf courses — Pacifico and Bahia — both designed by Jack Nicklaus and held inside the Four Seasons / St. Regis private peninsula. Green fees range from $325 to $395 per round, and access is limited to Four Seasons, St. Regis, and private residence guests. The 3B optional at Pacifico — the Tail of the Whale — is the only natural island green in golf.",

  quickFacts: [
    ["Number of golf courses", "2 (both private peninsula access)"],
    ["Course designers", "Jack Nicklaus (both)"],
    ["Green fee range", "$325 – $395 USD"],
    ["Best months for golf", "November – May"],
    ["Months to avoid", "August – October (rain + hurricane window)"],
    ["Nearest international airport", "Puerto Vallarta (PVR)"],
    ["Transfer time to nearest courses", "45 min (per Google Maps)"],
    ["Languages spoken at courses", "English and Spanish"],
    ["Rental clubs available", "Yes — at the Punta Mita pro shop"],
    ["Caddie required or optional", "Caddies provided with every round (Four Seasons policy)"],
    ["USD accepted", "Yes"],
  ],

  overview: [
    {
      h3: "Geography",
      text: "Punta Mita is a private peninsula 45 minutes north of Puerto Vallarta International Airport (PVR), inside the state of Nayarit. The peninsula gate restricts access to resort guests, residence owners, and members. Direct flights to PVR operate from Dallas, Houston, Los Angeles, Chicago, San Francisco, and Phoenix.",
    },
    {
      h3: "Climate & course conditions",
      text: "November through May averages 70–86°F with low humidity. June through October brings tropical storms and 6–10 inches of rain per month. Hurricane risk peaks September–October (per NOAA). Wind is gentler than Los Cabos but the humidity in summer makes morning play essential.",
    },
    {
      h3: "What makes Punta Mita distinct",
      text: "Two reasons: privacy and the Tail of the Whale. Punta Mita is the only peninsula in Mexico where the gate is closed to non-guests — the round is genuinely uncrowded. Pacifico's 3B optional green sits on a natural island reachable only at low tide; you take a small boat across with your caddie. Bahia's 12th is the only par-5 in Mexico with a forced carry across an ocean inlet.",
    },
    {
      h3: "Course landscape",
      text: "Both courses are members-and-guests only. Per GIM field research (Feb 2026), Pacifico runs at near-100% utilisation in peak months — book the round before you book the room.",
    },
  ],

  courses: [
    {
      name: "Pacifico Course",
      designer: "Jack Nicklaus",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 345,
      feeHigh: 395,
      access: "Four Seasons / St. Regis Punta Mita guests",
      bestFor: "The Tail of the Whale — the only natural island green in golf, at low tide.",
      isGIMProperty: false,
    },
    {
      name: "Bahia Course",
      designer: "Jack Nicklaus",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 325,
      feeHigh: 375,
      access: "Four Seasons / St. Regis Punta Mita guests",
      bestFor: "The 12th — the only ocean-carry par-5 in Mexico.",
      isGIMProperty: false,
    },
    {
      name: "Mandarina Golf Course",
      designer: "Greg Norman",
      type: "Resort guest-only",
      holes: 18,
      par: 72,
      feeLow: 325,
      feeHigh: 395,
      access: "One&Only Mandarina & Rosewood Mandarina guests",
      bestFor: "Cliffside Norman design above the jungle — the new centrepiece of the region.",
      isGIMProperty: true,
    },
  ],

  costNote:
    "Punta Mita pricing is uniform across Pacifico and Bahia: the cost difference is the resort, not the course. The Four Seasons includes caddies in the green fee; St. Regis bills them separately. Mandarina is independently priced through One&Only or Rosewood.",
  costRows: [
    ["Green fee", 325, 395, "Per round, peak season"],
    ["Cart fee", 0, 0, "Included in green fee"],
    ["Caddie", 0, 75, "Included at Four Seasons; separate at St. Regis & Mandarina"],
    ["Caddie tip", 40, 60, "20–30% of caddie service"],
    ["Range balls", 0, 0, "Included"],
    ["Food & beverages", 35, 80, "Halfway house + clubhouse"],
    ["Club rental", 100, 150, "TaylorMade rental at Pacifico pro shop"],
  ],

  access: {
    public: ["None — peninsula is closed to public play."],
    resort: [
      "Four Seasons Punta Mita guests — full access to Pacifico & Bahia.",
      "St. Regis Punta Mita guests — full access to Pacifico & Bahia.",
      "Private residence owners and their invited guests.",
      "Mandarina Golf — One&Only Mandarina & Rosewood Mandarina guests.",
    ],
    cross: [
      "Four Seasons & St. Regis honour reciprocal play between the two courses — your room key gets you on either course.",
      "Mandarina does not share access with Punta Mita peninsula — separate booking required.",
    ],
    private: ["The peninsula itself functions as private — no public day-pass exists."],
  },

  logistics: {
    airport: "Puerto Vallarta (PVR) — direct from DFW, IAH, LAX, ORD, SFO, PHX, YYZ. Customs typically 30–45 min.",
    toCourses: "PVR → Punta Mita gate: 45 min via the Punta de Mita coastal road. Resort transfers are the simplest option; rental cars are unnecessary inside the peninsula.",
    betweenCourses: "Pacifico ↔ Bahia: 5 min inside the peninsula. Mandarina: 40 min north of the Punta Mita gate.",
    practical: "USD accepted throughout. Tip caddies $40–60 per round. The peninsula gate requires resort confirmation for entry — bring your reservation number.",
  },

  seasonRows: [
    ["January", "66 – 80", "Low", "Excellent", "Very High", "Peak — Christmas through MLK weekend"],
    ["February", "67 – 81", "Low", "Excellent", "Very High", "Presidents Day fills early"],
    ["March", "68 – 83", "Low", "Excellent", "Very High", "Spring break demand"],
    ["April", "70 – 85", "Low", "Excellent", "High", "Best month overall — pristine conditions"],
    ["May", "74 – 88", "Low", "Excellent", "Moderate", "Shoulder begins — value window"],
    ["June", "78 – 91", "Moderate", "Good", "Low", "Hot, humid — mornings preferred"],
    ["July", "80 – 93", "High", "Fair", "Low", "Rainy season starts in earnest"],
    ["August", "81 – 94", "High", "Variable", "Low", "Avoid — heavy rain afternoons"],
    ["September", "80 – 93", "High", "Variable", "Low", "Hurricane peak — avoid"],
    ["October", "78 – 90", "Moderate", "Improving", "Low", "Late October opens the season"],
    ["November", "72 – 85", "Low", "Excellent", "High", "Thanksgiving sells out by August"],
    ["December", "67 – 81", "Low", "Excellent", "Very High", "Christmas week premium pricing"],
  ],
  seasonNote:
    "April is the peak — least crowded peak month, ideal conditions. Late October is the best value: rates drop 30%+ once the hurricane window closes. Thanksgiving and Christmas at the Four Seasons routinely sell out 9+ months in advance.",

  faq: [
    { q: "How many golf courses are in Punta Mita?", a: "Two on the peninsula itself — Pacifico and Bahia, both Jack Nicklaus designs. A third nearby option, Mandarina Golf Course (Greg Norman), sits 40 minutes north and is accessed via One&Only or Rosewood Mandarina." },
    { q: "What is the difference between Pacifico and Bahia courses?", a: "Pacifico is the dramatic ocean routing — eight holes on the Pacific and the Tail of the Whale island green. Bahia is slightly inland, more forgiving off the tee, and finishes with the only ocean-carry par-5 in Mexico." },
    { q: "Can non-Four Seasons guests play golf in Punta Mita?", a: "Only by booking the St. Regis or by member-guest invitation. There is no public day-pass — the peninsula is closed to outside play." },
    { q: "What does golf in Punta Mita cost all-in?", a: "Approximately $425 – $525 per person per round at Pacifico, including caddie tip, range balls, and clubhouse refreshments. Bahia runs $20–40 less per round." },
    { q: "How far are Punta Mita courses from Puerto Vallarta airport?", a: "Forty-five minutes via the Punta de Mita coastal road. Resort transfers are the simplest option; rental cars are unnecessary inside the peninsula." },
    { q: "What is the best time of year to golf in Punta Mita?", a: "November through May. April offers the best balance of pristine conditions and slightly lower demand than the December–March peak." },
  ],

  journalTargets: ["Vidanta PGA Tour Open", "First PGA Tour Agent at Vidanta"],
};

const MEXICO_CITY = {
  slug: "mexico-city",
  name: "Mexico City",
  title: "Golf in Mexico City: Every Course Worth Playing",
  metaTitle: "Mexico City Golf Guide: Courses, Costs & Insider Access (2026) | Golf in Mexico",
  heroImage: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=2400&q=85",
  dividerImage: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=2400&q=85",
  lastUpdated: "February 2026",

  heroAnswer:
    "Mexico City has approximately ten golf courses inside metropolitan limits, with several more within a 90-minute day-trip radius. At 7,350 feet of elevation, the ball flies 8–12% farther than at sea level. Most courses are private; public access is limited to Coral Golf and a small number of pay-and-play options. This guide covers every course worth playing in CDMX and a curated day-trip to Tabachines in Cuernavaca.",

  quickFacts: [
    ["Number of golf courses", "~10 in metro + day-trip options"],
    ["Course designers", "Percy Clifford, Tom Weiskopf, Larry Packard, RTJ Jr."],
    ["Green fee range", "$80 – $250 USD"],
    ["Best months for golf", "October – April"],
    ["Months to avoid", "June – September (afternoon storms)"],
    ["Nearest international airport", "Benito Juárez (MEX) — also Toluca (TLC) & Felipe Ángeles (NLU)"],
    ["Transfer time to nearest courses", "20 – 75 min (traffic-dependent)"],
    ["Languages spoken at courses", "English and Spanish"],
    ["Rental clubs available", "Yes at major clubs"],
    ["Caddie required or optional", "Generally optional; required at older private clubs"],
    ["USD accepted", "Partial — pesos preferred"],
  ],

  overview: [
    {
      h3: "Geography",
      text: "Mexico City sits at 7,350 feet of elevation in the Valley of Mexico. Direct flights to MEX operate from every major US hub. The city's golf courses cluster in three areas: west (Bosques, Lomas Quebradas), south (Coral, Pedregal, Club de Golf Mexico), and the day-trip corridor south to Cuernavaca and Valle de Bravo.",
    },
    {
      h3: "Climate & course conditions",
      text: "October through April averages 50–75°F with low humidity and dry, blue-sky mornings. June through September brings afternoon thunderstorms — most rounds finish by 1 p.m. anyway. Frost is rare but possible at altitude in December–January. The ball flies 8–12% farther than at sea level; subtract a club on approaches.",
    },
    {
      h3: "What makes CDMX distinct",
      text: "Three things: history, altitude, and the table. Club de Golf Mexico hosted the 1958 World Cup. Chapultepec hosted the WGC-Mexico Championship 2017–2020. Club de Golf Bosques sits inside a private forest west of the city. At 7,350 feet, every par-4 plays a half-club shorter than the card says. And the city's restaurants — Pujol, Quintonil, Contramar — are the real reason to extend the trip past the golf.",
    },
    {
      h3: "Course landscape",
      text: "Of roughly ten metropolitan courses, only Coral Golf Club offers walk-up public booking. Most are private member-guest. The day-trip option — Tabachines in Cuernavaca — is 90 minutes south and one of Mexico's great mid-century routings.",
    },
  ],

  courses: [
    {
      name: "Coral Golf Club",
      designer: "Larry Packard",
      type: "Public",
      holes: 18,
      par: 72,
      feeLow: 80,
      feeHigh: 145,
      access: "Open to all — direct booking",
      bestFor: "The most accessible public round in CDMX — the local favourite.",
      isGIMProperty: false,
    },
    {
      name: "Club de Golf Mexico",
      designer: "Percy Clifford",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 150,
      feeHigh: 250,
      access: "Member-guest only",
      bestFor: "Hosted the 1958 World Cup — one of the great parkland walks in Mexico.",
      isGIMProperty: false,
    },
    {
      name: "Club de Golf Chapultepec",
      designer: "Willie Smith / Percy Clifford renovation",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 175,
      feeHigh: 250,
      access: "Member-guest only",
      bestFor: "Hosted the WGC-Mexico Championship (2017–2020). Tight, historic, inner-city.",
      isGIMProperty: false,
    },
    {
      name: "Club de Golf Bosques",
      designer: "Percy Clifford",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 150,
      feeHigh: 200,
      access: "Member-guest only",
      bestFor: "Private forest routing — the closest thing to a parkland course in Mexico.",
      isGIMProperty: false,
    },
    {
      name: "Club de Golf Lomas Quebradas",
      designer: "Percy Clifford",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 140,
      feeHigh: 195,
      access: "Member-guest only",
      bestFor: "Mid-century Clifford routing on dramatic broken terrain.",
      isGIMProperty: false,
    },
    {
      name: "Amanali Golf Club",
      designer: "Tom Weiskopf",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 165,
      feeHigh: 225,
      access: "Members & casita guests",
      bestFor: "Lake course one hour north — three par-3s play directly at the water.",
      isGIMProperty: true,
    },
    {
      name: "Bosque Real Country Club",
      designer: "Tom Doak / Renaissance Golf",
      type: "Private / member-guest",
      holes: 18,
      par: 72,
      feeLow: 175,
      feeHigh: 235,
      access: "Member-guest only",
      bestFor: "The newest serious routing in CDMX — modern minimalist design.",
      isGIMProperty: false,
    },
    {
      name: "Tabachines Golf Club",
      designer: "Percy Clifford",
      type: "Public (day-trip from CDMX)",
      holes: 18,
      par: 72,
      feeLow: 95,
      feeHigh: 145,
      access: "Open to all — Cuernavaca, 90 min south",
      bestFor: "Mid-century Clifford routing — the great CDMX day-trip round.",
      isGIMProperty: false,
    },
  ],

  costNote:
    "CDMX golf is the most affordable championship golf in Mexico. Coral runs under $150 all-in. Private clubs require a member host but pricing remains reasonable by international standards. Tabachines day-trip in Cuernavaca runs $200 all-in with transport and lunch.",
  costRows: [
    ["Green fee", 80, 250, "Per round"],
    ["Cart fee", 0, 35, "Included at private clubs; separate at Coral"],
    ["Caddie (optional)", 30, 60, "Per 18 holes"],
    ["Caddie tip", 15, 30, "Customary"],
    ["Range balls", 0, 15, "Free at private; small fee at public"],
    ["Food & beverages", 25, 60, "Clubhouse lunch"],
    ["Club rental", 60, 120, "Available at Coral and major private clubs"],
  ],

  access: {
    public: [
      "Coral Golf Club — direct booking, no membership required.",
      "Tabachines Golf Club (Cuernavaca) — direct booking, 90-min day trip.",
    ],
    resort: ["Amanali Golf Club — casita guests at the on-site lodging."],
    cross: [
      "Most CDMX private clubs honour invitations from a member in good standing — pre-arranged through the secretary's office, never walk-up.",
    ],
    private: [
      "Club de Golf Mexico — member-guest only.",
      "Chapultepec — member-guest only.",
      "Bosques — member-guest only.",
      "Lomas Quebradas — member-guest only.",
      "Bosque Real — member-guest only.",
    ],
  },

  logistics: {
    airport: "Benito Juárez (MEX) — primary, direct from every US hub. Toluca (TLC) for west-side courses. Felipe Ángeles (NLU) for north.",
    toCourses: "MEX → south-side courses (Coral, Mexico, Pedregal): 30–60 min depending on traffic. West-side (Bosques, Lomas): 45–75 min. Tabachines (Cuernavaca): 90 min via the Mexico–Acapulco highway.",
    betweenCourses: "Traffic is the limiting factor. Plan one course per day — never two in the same day in CDMX. Tee times between 7 and 8 a.m. avoid worst congestion.",
    practical: "Pesos preferred; USD accepted at major clubs only. Tip caddies $300–500 MXN per round. Uber is the simplest ground transport. Allow 90 min from hotel to first tee — the city is unforgiving.",
  },

  seasonRows: [
    ["January", "44 – 70", "Low", "Excellent", "Moderate", "Cool mornings, perfect afternoons"],
    ["February", "46 – 73", "Low", "Excellent", "Moderate", "Best month — clear, dry, mild"],
    ["March", "49 – 76", "Low", "Excellent", "Moderate", "Spring break in CDMX is mild — still pleasant"],
    ["April", "52 – 78", "Low", "Excellent", "Moderate", "Last reliably dry month before rains"],
    ["May", "54 – 79", "Moderate", "Good", "Low", "Rains begin in afternoons; mornings still ideal"],
    ["June", "55 – 75", "High", "Fair", "Low", "Daily afternoon storms"],
    ["July", "54 – 74", "High", "Fair", "Low", "Rainiest month — mornings only"],
    ["August", "54 – 74", "High", "Fair", "Low", "Daily afternoon storms continue"],
    ["September", "53 – 73", "High", "Variable", "Low", "Independence Day weekend — clubs closed"],
    ["October", "51 – 73", "Moderate", "Improving", "Moderate", "Rains end mid-month — value window"],
    ["November", "47 – 71", "Low", "Excellent", "Moderate", "Pristine conditions — locals' favourite"],
    ["December", "44 – 69", "Low", "Excellent", "Moderate", "Cold mornings; afternoons mild"],
  ],
  seasonNote:
    "February is the standout — dry, mild, with predictably clear mornings. November is a close second, with the bonus of slightly fewer locals on weekends. June through September: golf in the morning, museums and tables in the afternoon. CDMX is a year-round city — just adjust the round around the rain.",

  faq: [
    { q: "What golf courses are in Mexico City?", a: "Approximately ten metropolitan courses including Coral Golf Club (public), Club de Golf Mexico, Chapultepec, Bosques, Lomas Quebradas, Bosque Real, and Pedregal. Tabachines in Cuernavaca is a 90-minute day trip." },
    { q: "Which Mexico City golf courses are open to the public?", a: "Coral Golf Club is the primary public option inside the city. Tabachines in Cuernavaca is public via day-trip. All other CDMX clubs are private member-guest only." },
    { q: "What does it cost to play golf in Mexico City?", a: "Green fees range $80–$250 USD. Coral runs under $150 all-in. Private clubs require a member host; expect $200–300 all-in with green fee, caddie tip, and clubhouse lunch." },
    { q: "Is Club de Golf Chapultepec open to visitors?", a: "Only by member-guest invitation arranged through the club secretary. Walk-up play is not permitted. The club hosted the WGC-Mexico Championship 2017–2020." },
    { q: "What is the best golf course in Mexico City?", a: "It depends on access. For tournament pedigree: Chapultepec. For history: Club de Golf Mexico (1958 World Cup). For accessibility: Coral. For modern design: Bosque Real (Tom Doak)." },
    { q: "Can I day-trip to Tabachines from Mexico City for golf?", a: "Yes. Tabachines is 90 minutes south via the Mexico–Acapulco highway. Tee off at 8 a.m., lunch in the clubhouse, back in the city by 4 p.m." },
  ],

  journalTargets: ["Coral CDMX — the most accessible round", "Coral with Friends", "Tabachines Cuernavaca day-trip"],
};

export const DESTINATIONS = [LOS_CABOS, PUNTA_MITA, MEXICO_CITY];
export const getDestination = (slug) => DESTINATIONS.find((d) => d.slug === slug);
