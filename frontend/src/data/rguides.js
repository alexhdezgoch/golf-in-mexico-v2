import { getHubData } from "./hubs";
import siteCourses from "./siteCourses.json";
import { TOURNAMENTS, noGD } from "./rtournaments";
import { ALL_LANDINGS as LANDINGS } from "./landings";
// What each published course page says (scripts/sync-course-facts.mjs): the guides show the same fee, access, design and
// note as the course pages (user, 2026-11-04), not the guide's older research.
import FACTS from "./courseFacts.json";

/* The short destination guides (2026-11-03), the Los Cabos method applied to the other five (rediseno-sitio/proof-seo-guias.md):
   the guide owns "golf in <place> / which courses / which can I play / which is best"; each course's long note, standout hole
   and course-specific questions move to that course's own page (the trip builder app's lib/courseNotes.ts); trip budgets
   belong to the golf packages pages. Every sentence is the published guide's (src/data/hubs.js). The only changes are the
   Los Cabos rules the user approved that day, applied the same way: a club's own published rate in place of an older figure
   (rediseno-sitio/fuentes/perplexity-guias-2026-11-03.txt). No Golf Digest rankings (the user's call): the professional
   tournaments a course has hosted instead (rtournaments.js). */

const COURSES = siteCourses.courses;
const bySlug = (s) => COURSES.find((c) => c.slug === s);

// Guide course name → course page. Automatic matches checked by hand; null where no course page exists.
const SLUG = {
  // Los Cabos (its guide page is RGuideLosCabos; the map also feeds llms-full.txt, 2026-11-05).
  "Quivira Golf Club": "quivira-golf-club",
  "Cove Club at Cabo del Sol": null,
  "Diamante — Dunes Course": "diamante-dunes-course",
  "El Cardonal at Diamante": "diamante-el-cardonal",
  "Palmilla Golf Club": "palmilla-golf-club",
  "Puerto Los Cabos": "puerto-los-cabos-golf-club",
  "Club Campestre San José": "club-campestre-san-jose",
  "Twin Dolphin Golf Club": "twin-dolphin-golf-club",
  "Solmar Golf Links": "solmar-golf-links",
  "El Dorado": null,
  "Chileno Bay Golf & Beach Club": "chileno-bay-golf-club",
  "Pacifico Course": "punta-mita-pacifico",
  "Bahia Course": "punta-mita-bahia",
  "Mandarina Golf Club": "mandarina-golf-club",
  "Higuera Golf Club": "higuera-golf-club",
  "Nauka Golf Club": "nauka-golf-club",
  "Club de Golf México": "club-de-golf-mexico",
  "Club de Golf Chapultepec": "club-de-golf-chapultepec",
  "Bosque Real Country Club": "bosque-real-country-club",
  "Amanali Country Club": "amanali-country-club",
  "Encinos Golf Club": null,
  "Avandaro Golf Club": "club-de-golf-avandaro",
  "Club de Golf Los Tabachines": null,
  "Playa Mujeres Golf Club": "playa-mujeres-golf-club",
  "El Camaleón at Mayakoba": "el-camaleon-mayakoba",
  "Riviera Cancun Golf Club": "riviera-cancun-golf-resorts",
  "El Tinto": "el-tinto-cancun-country-club",
  "Moon Palace Golf Club": "moon-palace-golf-course",
  "Iberostar Cancun Golf Club": null,
  "PGA Riviera Maya": "pga-riviera-maya-championship-course",
  "Puerto Cancun Golf Club": "puerto-cancun-golf-club",
  "Gran Coyote Golf": "gran-coyote-golf-club",
  "Vidanta Norman Course (PGA Tour)": "vidanta-vallarta-course",
  "Vista Vallarta — Nicklaus Course": "vista-vallarta-nicklaus-course",
  "Vista Vallarta — Weiskopf Course": "vista-vallarta-weiskopf-course",
  "Marina Vallarta Golf Club": null,
  "El Tigre Golf Club": "el-tigre-golf-club",
  "Flamingos Golf Club": null,
};

// The llms-full.txt generator reads the same map, so the AI file shows each course page's fee and access (2026-11-04).
export const GUIDE_SLUG = SLUG;

// A club's own published 2026 rate, where the verified guide found one, replaces the older published figure.
const OFFICIAL_FEE = {
  "Mandarina Golf Club": "$280 (2026 external guests)",
  "El Tinto": "$190 · twilight $140",
  "Moon Palace Golf Club": "$350 · twilight $190",
  "Marina Vallarta Golf Club": "$229 morning · $169 midday · $99 twilight",
};

// A question naming one course belongs to that course's page.
const FAQ_KEYS = {
  "punta-mita-pacifico": ["Tail of the Whale"],
  "club-de-golf-chapultepec": ["Chapultepec"],
  "amanali-country-club": ["Amanali"],
  "el-camaleon-mayakoba": ["Camaleón", "Camaleon"],
  "puerto-cancun-golf-club": ["Puerto Cancun"],
  "pga-riviera-maya-championship-course": ["PGA Riviera Maya"],
  "vidanta-vallarta-course": ["Vidanta Norman"],
  "vista-vallarta-nicklaus-course": ["Vista Vallarta"],
};

// What the Punta Mita landings said that the guide did not (both landings now redirect, 2026-11-04): how the villa route
// opens the gate, and the question it answered. Package prices and the $100 add-on fee are left out (no fee before the call).
const stayAndPlay = (LANDINGS || []).find((l) => l.slug === "stay-and-play");
const EXTRA = {
  "punta-mita": {
    access: stayAndPlay?.accessParagraphs || [],
    faqs: (stayAndPlay?.faqs || []).filter((f) => /without staying/i.test(f.q)).map((f) => [f.q, f.a]),
  },
};

// The guide lists the same courses as the courses directory (siteCourses.json) for its place (user, 2026-11-04):
// courses the directory files elsewhere leave the guide (Tabachines is in Cuernavaca, Avándaro in Valle de Bravo, listed
// under Unique Destinations), and directory courses the guide's old list missed are added, with the access the
// directory's own course data states.
const NOT_HERE = { "mexico-city": ["Club de Golf Los Tabachines", "Avandaro Golf Club"] };
const DIRECTORY_ACCESS = {
  "el-coral": ["public", "Public"],
  "madeiras-country-club": ["public", "Semi-private (visitors by reservation)"],
  "vidanta-nayar-course": ["public", "Resort (open to the public by reservation; caddie required)"],
  "vidanta-the-lakes-course": ["public", "Resort (open to the public and guests by reservation; lit for night play)"],
};
// Sentences about a course that is not in this guide come out of its answers (only deleted, never rewritten).
const dropNotHere = (slug, text) =>
  slug === "mexico-city" ? text.split(/(?<=[.!?])\s+/).filter((x) => !/Tabachines/i.test(x)).join(" ") : text;
const GUIDE_REGIONS = { "punta-mita": ["punta-mita", "punta-mita-nayarit"] };

const ACCESS = { public: "Open to visitors", resort: "Resort and hotel guests", private: "Members and invited guests" };
const GROUP = { public: "Open to visitors", resort: "Resort and hotel guests", private: "Members only" };

// Trip pages by guide (src/data/rtrips.json destinations).
export const TRIP_PLACES = {
  "punta-mita": ["Punta Mita"],
  "mexico-city": ["Mexico City"],
  "cancun-riviera-maya": ["Cancún", "Riviera Maya"],
  "puerto-vallarta": ["Puerto Vallarta"],
  "unique-destinations": ["San Miguel de Allende"],
};

const firstSentences = (t, n) => (t.match(/[^.!?]+[.!?]+(\s|$)/g) || [t]).slice(0, n).join("").trim();
const tripCost = (q) => /how much does a golf trip/i.test(q);

// The production guide's depth sections come back (user, 2026-11-05): overview, what moves the price and Getting there.
// Only deletions, plus two headings: "Here is exactly what you will spend" promised a budget table the guide no longer has.
// Sentences with a trip budget total, a Golf Digest ranking or a promise of future guides come out.
const DROP = /under \$1,500 per person all-in|Full guides land quarterly/i;
const clean = (t = "") => noGD(t).split(/(?<=[.!?])\s+/).filter((x) => !DROP.test(x)).join(" ").trim();
const COSTS_H2 = { "punta-mita": ["In Punta Mita,", "the hotel is the main cost — not the golf."] };

// "How much does a golf trip cost?" stays on the guide, answered with the verified green fee range and the production
// sentences that are not a budget total; the budgets themselves live on the golf packages pages (user, 2026-11-05).
const PACKAGES = { "cancun-riviera-maya": "/destinations/cancun-riviera-maya/golf-packages", "puerto-vallarta": "/destinations/puerto-vallarta/golf-packages", "punta-mita": "/destinations/punta-mita/golf-packages" };
const COST_FAQ = {
  "mexico-city": (fee) => `Green fees in Mexico City run ${fee} per round. The constraint is rarely the green fee. It is access. Coordinating a round at Chapultepec requires a member contact; a round at Amanali or Avandaro requires a resort booking. Green fees as of 2026, confirmed in writing before you book.`,
  "cancun-riviera-maya": (fee) => `Green fees run ${fee} per round, from El Tinto to El Camaleón at Mayakoba. The all-inclusive arbitrage is the key variable: Moon Palace all-inclusive guests pay $38 for the first round and $19 for subsequent rounds (plus cart fee). The other variable is the hotel, from an all-inclusive resort with bundled golf to Mayakoba-level accommodation plus standalone green fees. Green fees as of 2026, confirmed in writing before you book.`,
  "puerto-vallarta": (fee) => `Green fees run ${fee} per round, from The Lakes to Vista Vallarta Nicklaus — 30–40% below Cabo or Punta Mita for comparable design pedigrees. The primary variable is accommodation. Green fees as of 2026, confirmed in writing before you book.`,
};

/** One guide's data, from the published hub plus the rules above. */
export function shortGuide(slug) {
  const h = getHubData(slug);
  if (!h) return null;
  const isUnique = slug === "unique-destinations";
  const pick = (re) => h.stats.find((s) => re.test(s.label));

  // Courses: the guide's own list; Unique Destinations lists the course pages outside the five headline guides.
  const MAIN = ["los-cabos", "punta-mita", "punta-mita-nayarit", "mexico-city", "cancun-riviera-maya", "puerto-vallarta"];
  const courses = isUnique
    ? COURSES.filter((c) => !MAIN.includes(c.region) && c.region !== "mexico-city").map((c) => ({
        name: c.name, slug: c.slug, page: c, design: c.architect || "—", place: c.place, tournament: TOURNAMENTS[c.slug] || "—",
        fee: FACTS[c.slug]?.fee || "Quote on request", access: FACTS[c.slug]?.access || (c.guestsOnly ? "Resort and hotel guests" : "Open to visitors"),
        tier: c.guestsOnly ? "resort" : "public", note: "", standout: "",
      }))
    // Only courses with a page in the courses directory (user, 2026-11-04: Encinos, Marina Vallarta, Flamingos and
    // Iberostar have none, so they left their guides).
    : (h.courses || []).filter((c) => SLUG[c.name] && !(NOT_HERE[slug] || []).includes(c.name)).map((c) => {
        const s = SLUG[c.name] === undefined ? null : SLUG[c.name];
        const page = s ? bySlug(s) : null;
        return {
          name: FACTS[s]?.name || c.name, slug: s, page, design: FACTS[s]?.design || (c.specs || "").split(" · ")[0], place: h.name, tournament: (s && TOURNAMENTS[s]) || "—",
          fee: FACTS[s]?.fee || "Quote on request", access: FACTS[s]?.access || ACCESS[c.tier] || "", tier: c.tier,
          note: noGD(FACTS[s]?.note || ""), standout: FACTS[s]?.standout || "",
        };
      });

  if (!isUnique) {
    const regions = GUIDE_REGIONS[slug] || [slug];
    COURSES.filter((c) => regions.includes(c.region) && !courses.some((x) => x.slug === c.slug)).forEach((c) => {
      const f = FACTS[c.slug] || {};
      const tier = /private|member/i.test(f.access || "") ? "private" : c.guestsOnly ? "resort" : "public";
      courses.push({
        name: f.name || c.name, slug: c.slug, page: c, design: f.design || c.architect || "—", place: h.name, tournament: TOURNAMENTS[c.slug] || "—",
        fee: f.fee || "Quote on request", access: f.access || ACCESS[tier], tier, note: noGD(f.note || ""), standout: f.standout || "",
      });
    });
  }

  // Questions about one course go to that course's page; trip budgets go to the golf packages page.
  // Mexico City is the site's best-ranked page (position ~6, real clicks): its questions stay where Google already ranks them.
  const courseFaq = (q) => {
    if (slug === "mexico-city") return null;
    const hit = Object.entries(FAQ_KEYS).find(([, keys]) => keys.some((k) => q.toLowerCase().includes(k.toLowerCase())));
    return hit && courses.some((c) => c.slug === hit[0]) ? hit[0] : null;
  };
  const feeRange = pick(/green fee/i)?.num;
  const faqs = (h.faqs || [])
    .filter((f) => !courseFaq(f.q) && (!tripCost(f.q) || (COST_FAQ[slug] && feeRange)))
    .map((f) => (tripCost(f.q)
      ? [f.q, COST_FAQ[slug](feeRange), { href: PACKAGES[slug] || "/golf-packages", label: PACKAGES[slug] ? `${h.name} golf packages` : "golf packages" }]
      : [f.q, dropNotHere(slug, noGD(f.a))]))
    .filter(([, a]) => a);
  const moved = (h.faqs || []).filter((f) => !tripCost(f.q) && courseFaq(f.q)).map((f) => ({ slug: courseFaq(f.q), q: f.q, a: noGD(f.a) })).filter((f) => f.a);

  const groups = ["public", "resort", "private"]
    .map((t) => [GROUP[t], courses.filter((c) => c.tier === t)])
    .filter(([, list]) => list.length);
  const best = (h.faqs || []).find((f) => /best (golf )?course/i.test(f.q));
  const hosts = courses.filter((c) => c.tournament !== "—");

  return {
    slug,
    name: h.name,
    title: `${h.h1Pre || "Golf in"} ${(h.h1Em || h.name).replace(/\.$/, "")}`,
    seoTitle: h.seoTitle,
    seoDescription: h.seoDescription,
    answer: noGD(firstSentences(h.heroAnswer || "", 2)),
    byline: (h.byline || "").replace(/ · Updated .*$/, ""),
    facts: [h.stats[0], pick(/green fee/i), pick(/best|playable/i)].filter(Boolean).map((s) => [s.label, s.num]),
    courses,
    groups,
    best: best ? noGD(best.a) || null : null,
    hosts,
    seasons: (h.seasonBlocks || []).map((b) => [b.title, b.sub, b.body]),
    faqs: [...faqs, ...((EXTRA[slug] && EXTRA[slug].faqs) || [])],
    access: (EXTRA[slug] && EXTRA[slug].access) || [],
    moved,
    overview: { label: h.overviewLabel, pre: h.overviewH2Pre, em: h.overviewH2Em, paragraphs: (h.overviewParagraphs || []).map(clean).filter(Boolean) },
    costs: {
      label: h.costsLabel,
      pre: (COSTS_H2[slug] || [h.costsH2Pre])[0],
      em: (COSTS_H2[slug] || [null, h.costsH2Em])[1],
      intro: clean(h.costsIntro),
      callouts: (h.callouts || []).map((c) => [c.label, clean(c.body)]),
      packages: PACKAGES[slug] || null,
    },
    logistics: { label: h.logisticsLabel, pre: h.logisticsH2Pre, em: h.logisticsH2Em, items: (h.logistics || []).map((l) => [l.title, clean(l.body)]) },
    sources: h.sources || [],
    readNext: (h.relatedReads || []).map((r) => [r.to, r.anchor, r.note]),
    newsletter: h.playbookBody,
    newsletterTitle: `${h.playbookH3Pre || "Stay in the loop on"} ${h.playbookH3Em || ""}`.trim(),
    heroPhoto: h.heroPhoto,
  };
}
