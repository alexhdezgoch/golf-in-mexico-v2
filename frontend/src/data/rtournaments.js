/* Professional tournaments each course has hosted, as the site already publishes them (src/data/hubs.js, the trip builder
   catalog and its sourced course profiles). Replaces the Golf Digest ranking on the guides (the user's call, 2026-11-03):
   a national or international professional event a golfer has heard of. Amateur and pro-am events are left out; where two
   published sources disagree, the sourced one is used (Club de Golf México) or the claim is left out (LIV Golf at El Camaleón). */
export const TOURNAMENTS = {
  "diamante-el-cardonal": "PGA TOUR · World Wide Technology Championship",
  "club-de-golf-chapultepec": "Mexican Open (18 times) · WGC-Mexico Championship 2017–2020 · LIV Golf Mexico City 2025–2026",
  "club-de-golf-mexico": "World Cup of Golf 1967, won by Jack Nicklaus and Arnold Palmer",
  "bosque-real-country-club": "LPGA MasterCard Classic 2005–2009",
  "el-camaleon-mayakoba": "PGA TOUR · Mayakoba Golf Classic 2007–2022",
  "pga-riviera-maya-championship-course": "Korn Ferry Tour 2025, its first event in Mexico",
  "vidanta-vallarta-course": "PGA TOUR · Mexico Open at VidantaWorld, since 2022",
  "vista-vallarta-nicklaus-course": "WGC-World Cup 2002",
};

/** Removes every sentence that cites a Golf Digest ranking. */
export const noGD = (t = "") => t.split(/(?<!\bNo\.)(?<=[.!?])\s+/).filter((s) => !/Golf Digest/i.test(s)).join(" ").trim();
