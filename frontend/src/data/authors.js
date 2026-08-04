/**
 * Canonical author entities for structured data.
 *
 * Single source of truth for who wrote what, so the machine-readable layer says
 * the same thing the page says. Every field here traces to content already
 * published on the site — the bios and credential lists in
 * components/TeamEditorial.jsx (rendered at /about) and the founder description
 * in pages/About.jsx. Nothing is invented; if a claim is not on the site, it is
 * not in here.
 *
 * `url` points at /about because that is where the bios actually live. Dedicated
 * /authors/* pages do not exist — and because the SPA rewrites unmatched paths
 * to index.html, linking to one would return HTTP 200 serving the homepage,
 * which is worse than not linking at all.
 */

/** @typedef {{ type: "Person", name: string, jobTitle: string, description: string, path: string, image: string, sameAs: string[], knowsAbout: string[] }} Author */

/** @type {Author} */
export const PABLO = {
  type: "Person",
  name: "Pablo De La Mora",
  jobTitle: "Founder & Sports Agent",
  description:
    "Sports agent with five years inside PGA Tour, LIV Golf, LPGA and WTA events, and founder of Golf in Mexico.",
  path: "/about",
  image: "/pablo.jpg",
  sameAs: [
    "https://www.linkedin.com/in/pablodlm/",
    "https://www.instagram.com/pablodlmc/",
  ],
  knowsAbout: ["Golf in Mexico", "Golf travel", "Professional golf"],
};

/** @type {Author} */
export const JOSE = {
  type: "Person",
  name: "José Islas",
  jobTitle: "Professional Golfer",
  description:
    "Professional golfer with four Mexican Tour wins, three PGA Tour starts, two World Amateur Team Championships and two US Amateur appearances.",
  path: "/about",
  image: "/jose.jpg",
  sameAs: ["https://www.instagram.com/joseislasgolf/"],
  knowsAbout: ["Golf in Mexico", "Golf course strategy", "Competitive golf"],
};

/**
 * The destination guides carry the byline "Field research by Pablo De La Mora
 * & José Islas" (data/hubs.js), so both are credited as co-authors.
 */
export const GUIDE_AUTHORS = [PABLO, JOSE];

/** Resolve a byline name to a canonical author, or null if it isn't one. */
export const authorByName = (name) =>
  [PABLO, JOSE].find((a) => a.name === name) || null;
