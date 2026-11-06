/* Los Cabos guide and the Solmar scorecard, taken from the verified sources in rediseno-sitio/fuentes:
   perplexity-guias-2026-11-03.txt (guide, research cut-off November 3, 2026) and scorecards-bloque1-cabo-cancun.txt
   (Solmar's official scorecard, solmargolf.com). Nothing here is written for the page; it is the sources' own text. */

export const CABO = {
  intro:
    "Los Cabos offers public-booking golf alongside courses restricted to members, their guests or eligible resort guests. November through April is the editorial first choice, based on the tourism board's cooler winter and spring conditions.",
  verdict: "Choose Los Cabos for contrasting golf landscapes, but establish course eligibility before building the trip.",
  facts: [
    ["Best time", "November to April"],
    ["Fly into", "Los Cabos (SJD)"],
    ["Courses profiled", "Ten, plus Solmar"],
  ],
  // Course · design and opening · format · Golf Digest Mexico 2026 · who can play
  courses: [
    { name: "Diamante Dunes", slug: "diamante-dunes-course", design: "Davis Love III", opened: "2009", format: "18 holes", rank: "1", access: "Access confirmed directly with Diamante", view: "The architecture-first choice on this shortlist, provided access is secured." },
    { name: "Cove Club", slug: null, design: "Jack Nicklaus", opened: "1994", format: "18 holes", rank: "2", access: "Members and their guests", view: "A high-priority private invitation, not a public-booking recommendation." },
    { name: "Twin Dolphin", slug: "twin-dolphin-golf-club", design: "Fred Couples Signature", opened: "2018", format: "19 holes, par 72", rank: "5", access: "Eligible Montage guests", view: "An access-led premium round rather than a course to assume is publicly available." },
    { name: "Quivira", slug: "quivira-golf-club", design: "Jack Nicklaus", opened: "2014", format: "Championship layout", rank: "6", access: "Pueblo Bonito guests and residents", view: "Select it for its dramatic setting, while recognizing that access is conditional." },
    { name: "El Cardonal", slug: "diamante-el-cardonal", design: "Tiger Woods / TGR Design", opened: "2014", format: "Full-length course", rank: "11", access: "Access confirmed directly with Diamante", view: "A contrasting companion to Dunes, not a substitute for its dune setting." },
    { name: "Cabo del Sol Course", slug: "cabo-del-sol-golf-course", design: "Tom Weiskopf", opened: "2001", format: "18 holes, par 72", rank: "13", access: "Guest tee times booked directly", view: "A strong desert-course option that must not be confused with Cove Club." },
    { name: "Palmilla", slug: "palmilla-golf-club", design: "Jack Nicklaus", opened: "1992", format: "Ocean, Arroyo and Mountain nines", rank: "17", access: "Ocean public; Arroyo and Mountain for members and eligible guests", view: "Specify the actual nine-hole combination before comparing value." },
    { name: "Solmar Golf Links", slug: "solmar-golf-links", design: "Greg Norman", opened: "2020", format: "18 holes, par 72", rank: "—", access: "Open to the public", view: "Greg Norman links-style design with Pacific-facing holes and an island-green par-3 17th." },
    { name: "Puerto Los Cabos", slug: "puerto-los-cabos-golf-club", design: "Greg Norman and Jack Nicklaus", opened: "2018 (third nine)", format: "27 holes", rank: "—", access: "Visitor booking through the operator", view: "Choose it for different nine-hole combinations, not simply another architect's name." },
    { name: "Club Campestre San José", slug: "club-campestre-san-jose", design: "Nicklaus Design", opened: "2007", format: "18 holes, par 71", rank: "—", access: "Public, subject to availability", view: "A useful starting point for a public-booking itinerary." },
    { name: "Oasis Short Course", slug: null, design: "Tiger Woods", opened: "2016", format: "12-hole par-3 course", rank: "—", access: "Access confirmed directly with Diamante", view: "A short-format addition, not an 18-hole championship round." },
  ],
  months: [
    ["Jan", "best", "First-choice winter window; the tourism board describes December–February as pleasantly cool."],
    ["Feb", "best", "First-choice winter window; retain an extra layer for cooler parts of the day."],
    ["Mar", "best", "First-choice spring window; official guidance describes warmer conditions than winter."],
    ["Apr", "best", "First-choice spring window."],
    ["May", "storm", "Hotter transition; eastern Pacific hurricane season begins May 15."],
    ["Jun", "storm", "Hotter-season planning; maintain weather and cancellation flexibility."],
    ["Jul", "storm", "Within the official eastern Pacific hurricane season."],
    ["Aug", "storm", "Within hurricane season."],
    ["Sep", "storm", "Within hurricane season; flexible arrangements remain important."],
    ["Oct", "storm", "Tourism guidance describes easing temperatures, but hurricane season continues."],
    ["Nov", "good", "Transition; hurricane season continues through November 30."],
    ["Dec", "best", "First-choice winter window, outside the official hurricane-season dates."],
  ],
  before: [
    ["Airport", "Los Cabos International Airport, SJD."],
    ["Rental clubs", "Questro publishes USD 65 rentals and requests advance coordination; Cabo del Sol publishes USD 75 rental equipment."],
    ["Non-playing companions", "Quivira states that non-playing riders cannot be accommodated."],
    ["Caddies and tips", "Request any mandatory caddie charge and gratuity policy in writing."],
    ["Safety", "Review the current Mexico travel advisory and its Baja California Sur section before departure."],
  ],
  sources: [
    ["Questro: facilities, reservations, tariffs, rentals and Cabo Real closure", "https://questrogolf.com/"],
    ["Los Cabos Tourism Board: seasonal weather", "https://www.visitloscabos.travel/plan/useful-information/weather/"],
    ["NOAA / National Hurricane Center: season dates", "https://www.nhc.noaa.gov/climo/"],
    ["Golf Digest: best golf courses in Mexico, June 13, 2026", "https://www.golfdigest.com/story/best-golf-courses-mexico"],
    ["Golf Digest: World's 100 Greatest, 2026–2027", "https://www.golfdigest.com/story/worlds-100-greatest-golf-courses"],
    ["Solmar Golf Links: official scorecard", "https://solmargolf.com/images/SCORE-CARD-EN.pdf"],
  ],
};

/* Official scorecard, hole by hole (solmargolf.com/images/SCORE-CARD-EN.pdf). */
export const SCORECARDS = {
  "solmar-golf-links": {
    designer: "Greg Norman",
    opened: "February 2020",
    address: "Carretera a Todos Santos km 120, Cabo San Lucas, BCS 23473, Mexico",
    par: [5, 4, 3, 4, 3, 4, 4, 5, 4, 4, 3, 4, 5, 4, 4, 4, 3, 5],
    tees: [
      { name: "Black", color: "#111", rating: "74.0", slope: 136, yards: [543, 434, 259, 341, 251, 403, 411, 563, 427, 409, 168, 460, 595, 444, 412, 327, 191, 602] },
      { name: "Gold", color: "#b8913a", rating: "72.1", slope: 131, yards: [524, 411, 235, 324, 228, 380, 391, 537, 404, 384, 150, 434, 571, 408, 399, 308, 161, 582] },
      { name: "Blue", color: "#2f5d8a", rating: "69.5", slope: 125, yards: [502, 376, 205, 313, 199, 365, 353, 510, 363, 355, 119, 406, 532, 358, 367, 283, 148, 557] },
      { name: "White", color: "#bdbdbd", rating: "67.0", slope: 118, yards: [464, 337, 179, 280, 171, 333, 315, 482, 337, 329, 105, 383, 498, 320, 320, 251, 129, 534] },
      { name: "Red", color: "#a3352b", rating: "69.1", slope: 114, yards: [427, 312, 152, 240, 147, 309, 260, 454, 291, 292, 83, 355, 436, 281, 286, 224, 110, 514] },
    ],
    sources: [
      ["Solmar Golf Links: official scorecard", "https://solmargolf.com/images/SCORE-CARD-EN.pdf"],
      ["Solmar Golf Links: address", "https://solmargolf.com/stay-and-play-packages"],
      ["Los Cabos Tourism Board: opening and designer", "https://www.visitloscabos.travel/articles/post/rancho-san-lucas-golf-club-renamed-solmar-golf-links/"],
    ],
  },
};
