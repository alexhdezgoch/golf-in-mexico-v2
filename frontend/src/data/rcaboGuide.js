/* Los Cabos guide, full: the published golf-in-mexico.com/destinations/los-cabos text (src/data/hubs.js and the live
   course cards), corrected only where the user approved it on 2026-11-03 (rediseno-sitio/decisiones.md):
   Cabo Real stays ($260, The Palace Company) · Cabo del Sol and Cove Club separated · Chileno Bay and Solmar rankings
   removed · World 100 = Dunes #64, Cove Club #73 · caddie tips as a suggestion · Quivira official tariff · market
   figures removed. Rankings: Golf Digest Mexico, June 2026; World's 100 Greatest 2026–27. */

export const GUIDE = {
  updated: "November 2026",
  byline: "GOLF° IN MEXICO° Editorial · Field research by Pablo De La Mora & José Islas",
  answer:
    "Los Cabos has 18 active championship golf courses — with 5 more under construction — along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Green fees range from $260 to $700 USD per round depending on course and season, with October through May delivering peak conditions. This is the most concentrated collection of signature-architect designs in Mexico, and navigating it requires an insider's map.",
  facts: [
    ["Courses", "18 active · 5 under construction · 23 by 2026"],
    ["Designers", "Nicklaus · Woods · Norman · Love III · Weiskopf · Fazio · Couples · Eckenrode · RTJ Jr."],
    ["Green fees", "$260 – $700 USD per round (varies by course and season)"],
    ["Best months", "October – May"],
    ["Avoid", "August – September (hurricane + rain peak)"],
    ["Airport", "Los Cabos International (SJD)"],
    ["Private FBO", "SJD dedicated terminal · CSL"],
    ["Languages", "English & Spanish (all course staff)"],
    ["Caddie", "Mandatory at Tier-1 · Recommended corridor-wide"],
    ["USD", "Accepted everywhere on the corridor"],
  ],
  overview: [
    "Los Cabos golf spans 18 active championship courses — with 5 more under construction — along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Where the mountains clash directly with the shoreline, signature architects have carved out a paradise shaped by Nicklaus, Woods, Norman, Love III, and Fazio.",
    "The market splits into three distinct zones. San José del Cabo offers a cultural backdrop. Cabo San Lucas is centered around the marina and active nightlife. The real center of gravity for championship golf is The Tourist Corridor — this exclusive strip hosts the vast majority of top-tier tracks.",
    "Eighteen courses span the corridor, with more opening by 2026. Eight of the top layouts were shaped by Nicklaus, Woods, Norman, Love III, and Fazio — including three courses by Nicklaus alone. The terrain is the differentiator: Pacific cliffside holes at Quivira, links-style dunes at Diamante, desert arroyos at Club Campestre, coastal finishes at Puerto Los Cabos. No other Los Cabos golf destination puts this variety inside a 20-mile stretch. With Diamante Dunes (No. 64) and Cove Club (No. 73) on Golf Digest's World's 100 Greatest Courses 2026–2027, and Diamante Dunes, Cove Club, Twin Dolphin and Quivira in Golf Digest's 2026 Mexico top 10, Los Cabos is the undisputed golf capital of Latin America.",
  ],
  coursesIntro:
    "From Nicklaus to Tiger Woods to Fazio — the complete field guide to our curated picks from the 18 active courses in Los Cabos, with access notes.",
  // name · slug (course page) · design · Golf Digest Mexico 2026 · green fee · who can play · published note
  courses: [
    { name: "Diamante Dunes", slug: "diamante-dunes-course", design: "Davis Love III", rank: "1", fee: "$500", access: "Diamante guests and members", note: "A true links experience framed by massive white sand dunes on the Pacific side of Cabo San Lucas. Walks and plays like a classic British course — with 340 days of sunshine. No. 64 on Golf Digest's World's 100 Greatest Courses 2026–2027. The standard by which all Cabo courses are measured." },
    { name: "Cove Club", slug: null, photo: "/images/thg0cb44-cove-club.webp", credit: "Cove Club press kit", design: "Jack Nicklaus", rank: "2", fee: "Members only", access: "Members and their guests", note: "The course that put Los Cabos on the global golf map. Reopened in 2019 as the Cove Club with redesigned holes by Nicklaus, including a new par-3 17th that drops to a green backdropped by the sea. No. 73 on Golf Digest's World's 100 Greatest Courses 2026–2027." },
    { name: "Twin Dolphin", slug: "twin-dolphin-golf-club", design: "Fred Couples", rank: "5", fee: "$700 (incl. caddie)", access: "Montage Los Cabos guests", note: "Built on the historic grounds of the original Twin Dolphin Hotel. Incredible elevation changes and tournament-level greens — the Sea of Cortez visible from almost every tee. Includes practice facilities + two on-course comfort stations. Accessible to guests of Montage Los Cabos (122-room hotel) and Montage Residences." },
    { name: "Quivira", slug: "quivira-golf-club", design: "Jack Nicklaus", rank: "6", fee: "$360–$465 Oct–May · $306–$395 Jun–Sep", access: "Pueblo Bonito guests", note: "The crown jewel of the corridor. Quivira plays along the Pacific cliffs above Cabo San Lucas — every hole delivers an ocean view, climbing out of desert canyons to finish with one of the most photographed closing stretches in North America. Rates include cart, practice facility, and all food and refreshments at four comfort stations. Accessible to guests of Pueblo Bonito Oceanfront Resorts: Pacifica · Sunset Beach · Rosé · Los Cabos." },
    { name: "El Cardonal", slug: "diamante-el-cardonal", design: "Tiger Woods", rank: "11", fee: "$500", access: "Diamante guests and members", note: "Tiger Woods' first solo design outside the United States. Wide, forgiving fairways through desert arroyos — highly playable for mixed-handicap groups, with panoramic Pacific views throughout. Host of the PGA Tour World Wide Technology Championship. Inspired by the classic West Coast courses Tiger grew up playing — Riviera, Bel-Air — with bold bunkers and wide fairway corridors." },
    { name: "Cabo del Sol Course", slug: "cabo-del-sol-golf-course", design: "Tom Weiskopf", rank: "13", fee: "$385", access: "Guest tee times booked directly", note: "Tom Weiskopf's desert course, opened in 2001, with six new holes introduced in November 2023. A strong desert-course option that must not be confused with Cove Club." },
    { name: "Palmilla", slug: "palmilla-golf-club", design: "Jack Nicklaus", rank: "17", fee: "Hotel guests", access: "One&Only Palmilla guests; the Arroyo nine stays open during the 2026 renovation", note: "The course that started the modern Tourist Corridor in 1992. Three interchangeable nines (Mountain, Arroyo, Ocean) — the first Jack Nicklaus Signature Design in Latin America. The Ocean nine, added in 1997, features a 600-foot elevation drop from tee to green. Outside play season- and time-dependent; preferred rates for One&Only Palmilla guests." },
    { name: "Chileno Bay", slug: "chileno-bay-golf-club", design: "Tom Fazio", rank: "—", fee: "$518", access: "Auberge Chileno Bay guests", note: "Tom Fazio's only Cabo design — built on graceful, flowing landforms intended to simulate rolling ocean waves. An ocean view from every hole. Back-to-back par 5s at holes 6 and 7. Two driveable short par 4s. The par-4 18th tumbles downhill to an infinity-edge green at 512 yards from the tips. Auberge Chileno Bay resort guests only." },
    { name: "Solmar Golf Links", slug: "solmar-golf-links", design: "Greg Norman", rank: "—", fee: "$400", access: "Open to the public", note: "A genuine links course with revetted pot bunkers identical to British seaside links — the only ones in Mexico. Three ecosystems: Pacific dunes, cactus forest, coastal finish. Several holes play directly toward the beach. Greg Norman's least-disturbance design approach preserved the natural contours entirely. And yes — Troy was filmed on these cliffs. Solmar Group hotel guests preferred rates; rates include cart, water, practice facility, and two on-course comfort stations." },
    { name: "Puerto Los Cabos", slug: "puerto-los-cabos-golf-club", design: "Greg Norman + Jack Nicklaus", rank: "—", fee: "$395", access: "Open to visitors", note: "Now a 27-hole facility with three 18-hole combinations. Nicklaus returned in 2017 to build a second nine, opened in 2018. Norman's course has 400+ feet of elevation change. The only Nicklaus + Norman collaboration in Mexico. Fee includes practice balls, cart, food + beverages." },
    { name: "Club Campestre San José", slug: "club-campestre-san-jose", design: "Nicklaus Design", rank: "—", fee: "$260", access: "Public, subject to availability", note: "Best value on the corridor. Weaves through rugged desert arroyos with the Sierra de la Laguna mountains framing every shot. The truest sense of Baja's inland topography. Always described as the best value on the corridor — and consistently in top condition. Partner courses with Puerto Los Cabos and Cabo Real for combo packages. Fee includes practice balls, cart, water." },
    { name: "Cabo Real", slug: "cabo-real-golf-course", design: "Robert Trent Jones II", rank: "—", fee: "$260", access: "Open to visitors (The Palace Company)", note: "" },
    { name: "Oleada Golf Links", slug: "oleada-golf-links", design: "Ernie Els", rank: "—", fee: "$300", access: "Subject to outside-player availability", note: "Pacific-side round in Los Cabos, subject to outside-player availability." },
  ],
  partners: [
    ["Fora Travel", "We are an independent Fora advisor: your stay is booked through Fora"],
    ["PGA México", "Endorsed by Mexico's association of golf professionals"],
    ["Cocobay", "Our villa partner in Los Cabos, at its own direct rate"],
  ],
  costsIntro:
    "Standard Cabo golf packages often cloud the true cost by hiding mandatory fees and customary incidentals. Here is what a realistic 4-night, 3-round golf trip looks like mid-season — no surprises.",
  costs: [
    ["Flights (commercial)", "$280", "$550", "Direct: LAX · DFW · HOU"],
    ["Accommodation (4 nights)", "$600", "$2,400", "Double occ."],
    ["Green fees (3 rounds)", "$650", "$1,200", "Elite cliffside + arroyo mix"],
    ["Caddie tips", "$120", "$180", "We suggest $40–$60 per bag per round"],
    ["Club rentals (optional)", "$0", "$200", "Premium sets at all pro shops"],
    ["Ground transport", "$80", "$250", "Shuttle vs. private SUV"],
    ["Food & beverage", "$300", "$800", "Top properties: all-inclusive stations"],
    ["Total all-in (per person)", "$2,030", "$5,580", "Mid-season estimate · 4 nights, 3 rounds"],
  ],
  feesNote: "Green fees as of 2026, confirmed in writing before you book. Quivira's are the club's published seasonal rates.",
  luxury:
    "Your choice of base camp heavily dictates the financial footprint. Premium courses like Quivira and Twin Dolphin completely change the value equation by bundling gourmet food and top-shelf liquor stations into the green fee.",
  twilight:
    "Afternoon booking windows (typically 1:00 or 2:00 PM) unlock 30–50% price reductions. During the spring shoulder months, an early afternoon tee time lets you finish all 18 holes before sunset while keeping budgets intact.",
  logistics: [
    ["Airport + arrivals", "Los Cabos International Airport (SJD) has its own dedicated FBO terminal for private flights. Several Corridor resorts arrange direct tarmac-to-villa transfers."],
    ["Getting to courses", "The Corridor stretches 20 miles along Highway 1. Most courses: 15–30 min from SJD. Pre-arranged private SUV transfers are the standard for traveling golfers. Uber is legal but frequently restricted from entering the deep security gates of elite private clubs."],
    ["Between courses", "The Corridor holds the majority of top-tier courses. Build 45 minutes into your schedule for mid-day traffic. San José del Cabo: cultural backdrop, quieter evenings. Cabo San Lucas: marina, nightlife."],
    ["Currency + tips", "USD accepted everywhere on the golf corridor. Caddie tips: we suggest $40–$60 per bag per round; confirm any mandatory caddie fee with the club. Restaurants: 15–20% expected. ATMs available for pesos if preferred. Los Cabos is among the safest tourist destinations in Mexico — excellent security corridor-wide."],
  ],
  seasons: [
    ["Peak Season", "Nov – Apr · 72–82°F · High Crowds · $$$", "The window. Clear skies, low humidity, manageable winds. Every course delivers its best conditions — which is why serious golfers plan their Los Cabos trips for winter and book the flight first, the tee time second."],
    ["Shoulder Season", "May – Jun · 82–90°F · Moderate · $$", "The value play. Warmer but very playable with early tee times. Courses are quieter, and many resorts fold golf into the room rate. If you can take the heat, the math is hard to beat."],
    ["Summer / Hurricane", "Jul – Oct · 85–95°F · Low Crowds · $", "The off-season trade: dramatic discounts, but humidity, afternoon storms, and occasional hurricane risk. Mornings can still be excellent. Flexibility is the price of admission."],
  ],
  faqs: [
    ["What is the best time of year to play golf in Los Cabos?", "The peak season runs November through April — dry, warm (72–82°F), almost no rain. For the best balance of weather and value, late October and May are the sharpest shoulder months: great conditions, fewer crowds, better rates. The summer window (July–October) brings dramatic discounts but also humidity, afternoon storms, and hurricane risk. August and September are the months to avoid entirely."],
    ["How much does a golf trip to Los Cabos cost?", "A realistic 4-night, 3-round trip runs $2,030 on the lower end to $5,580 at the luxury tier, per person. The main variables are hotel choice and course selection. Green fees range from $260 at Cabo Real and Club Campestre San José to $700 at Twin Dolphin, caddie included. Per our editorial research, mid-season 2026."],
    ["Which is the best course in Los Cabos?", "Diamante Dunes is on Golf Digest's World's 100 Greatest Courses list — the links standard. Quivira is the most visually dramatic. Cove Club is historically significant and No. 73 on Golf Digest's World's 100 Greatest. Twin Dolphin has the newest tournament-level greens. Solmar is the best course you can book without a room key. The right answer depends entirely on what kind of golfer you are."],
    ["Do I need to bring my own golf clubs?", "No. Premium rental sets — TaylorMade, Callaway — are available at all major courses for $50–$80 per round. Serious golfers will still prefer their own. Airlines typically charge $35–$50 each way for a golf bag. Quivira and Twin Dolphin offer current-year sets at their pro shops. Club rental is never a reason to skip a course in Los Cabos."],
    ["Are the courses walkable?", "Most are cart-mandatory or strongly cart-recommended. Desert terrain, dramatic elevation changes, and distances between holes make walking impractical. Quivira climbs 275 feet in the first five holes — it is not walkable. Club Campestre and Palmilla have more manageable terrain. The caddie walks with you regardless of cart policy — they are your on-course guide, not optional company."],
    ["Is it safe to travel to Los Cabos?", "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent security infrastructure. The destination has invested close to $50 million in security upgrades and operates a real-time network with local hotels. Standard travel precautions apply as with any international destination."],
    ["Why do so many golfers choose Los Cabos?", "Two courses on Golf Digest's World's 100 Greatest list. Four of Mexico's top 10 courses. Championship designs by Nicklaus, Woods, Norman, Love III, and Fazio — in one 20-mile corridor. 350 sunny days per year (Los Cabos Tourism Board). Direct flights from 30+ US cities. The flight from LAX is under three hours — shorter than driving from Los Angeles to Palm Springs."],
    ["What are the best golf courses in Cabo San Lucas?", "Within Cabo San Lucas itself, Quivira Golf Club (Jack Nicklaus) leads on visual drama — every hole has a Pacific view and the 13th par-3 sits 150 feet above the ocean. Solmar Golf Links (Greg Norman) delivers a genuine links experience with revetted pot bunkers — the only ones in Mexico. Diamante's Dunes Course (Davis Love III), 15 minutes north of downtown Cabo San Lucas, is on Golf Digest's World's 100 Greatest Courses list, and El Cardonal (Tiger Woods) hosts the PGA Tour World Wide Technology Championship. Together these four define Cabo San Lucas golf at the top tier."],
    ["How do I get access to private golf courses in Los Cabos?", "Private access here works on two routes: stay at the right hotel, or know the right member. Cove Club is for members and their guests. Twin Dolphin requires a Montage Los Cabos reservation. Chileno Bay is exclusive to Auberge Chileno Bay guests. El Dorado is members and member-sponsored guests only — no public route. Quivira opens to Pueblo Bonito Oceanfront guests. The fastest way in is to book the matching resort. GOLF° IN MEXICO° coordinates the resort + tee time as a package — that is the entire model."],
    ["Do I need to tip caddies?", "Yes — tipping is expected and an important part of their income. We suggest $40–$60 per bag per round; confirm any mandatory caddie fee with the club. At Twin Dolphin, the $50 caddie fee is mandatory and built into the booking price. At elite courses, the caddie is the difference between a good round and a great one — they know the ocean breaks, the wind patterns, and the pin positions. Tip accordingly."],
  ],
  newsletter:
    "We're publishing course notes, real prices, and access intel for Los Cabos as we go. Drop your email and we'll send it when it's live — no spam, unsubscribe anytime.",
  moreIntro: "Cabo, Cancun, Vallarta, Punta Mita, CDMX, and the hidden routings — the rest of the country in one editorial directory.",
  readNext: [
    ["/destinations/mexico-city", "golf in Mexico City", "20+ courses within 90 minutes of the center, nearly all private — and the lowest all-in trip cost of any of our destinations."],
    ["/destinations/cancun-riviera-maya", "Riviera Maya golf courses", "12+ championship courses along 80 miles of Caribbean coast, with green fees from $190."],
  ],
  sources: [
    ["Quivira Golf Club: published seasonal rates", "https://www.quiviraloscabos.com/golf"],
    ["NOAA / National Hurricane Center: season dates", "https://www.nhc.noaa.gov/climo/"],
    ["Los Cabos Tourism Board: seasonal weather and 350 sunny days", "https://www.visitloscabos.travel/plan/useful-information/weather/"],
    ["Questro: facilities, reservations, tariffs and rentals", "https://questrogolf.com/"],
    ["Solmar Golf Links: official scorecard", "https://solmargolf.com/images/SCORE-CARD-EN.pdf"],
  ],
  sourceNotes: [
    "Banco de México — peso/USD exchange data (May 2026)",
    "Mexico News Daily — security infrastructure reports",
    "Resort price decks: Solmar Group · Pueblo Bonito · Auberge · One&Only · Montage (Q1 2026)",
    "Cabo Real green fee: The Palace Company (November 2026)",
  ],
};
