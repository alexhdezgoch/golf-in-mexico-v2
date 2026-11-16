import { useLocation } from "react-router-dom";

/* The site in Spanish (user, 2026-11-16): a visitor who reads Spanish sees the site in Spanish. Spanish pages live under
   /es (same page, same design, the copy in Spanish); a page with no Spanish version yet stays in English. The menu holds
   the English / Español switch; middleware.js sends a first visit whose browser is in Spanish to /es. */

/** English paths that have a Spanish version, grown phase by phase. */
export const ES_PAGES = new Set(["/", "/start-planning", "/about", "/contact", "/destinations", "/destinations/los-cabos", "/destinations/punta-mita", "/destinations/mexico-city", "/destinations/cancun-riviera-maya", "/destinations/puerto-vallarta", "/destinations/unique-destinations", "/trips", "/trips/mexico-city-four-seasons-golf", "/trips/los-cabos-nobu", "/trips/punta-mita-by-golfinmexico", "/trips/playa-del-carmen-alila-mayakoba-golf", "/trips/cancun-moon-palace-all-inclusive-golf", "/trips/san-miguel-luxury-hotel-golf", "/trips/los-cabos-cocobay"]);

export const isEsPath = (pathname = "") => pathname === "/es" || pathname.startsWith("/es/");

/** The English path behind a Spanish one ("/es/start-planning" → "/start-planning", "/es" → "/"). */
export const basePath = (pathname = "/") => (isEsPath(pathname) ? pathname.slice(3) || "/" : pathname);

/** The Spanish path for an English one, or null when that page has no Spanish version yet. */
export const esPath = (path) => (ES_PAGES.has(path) ? (path === "/" ? "/es" : `/es${path}`) : null);

/** A link target in the reader's language: the Spanish page when it exists, the English one otherwise. */
export const localize = (path, lang) => (lang === "es" && esPath(path)) || path;

/** The current language, from the URL. */
export const useLang = () => (isEsPath(useLocation().pathname) ? "es" : "en");

/** hreflang alternates for a page that exists in both languages. */
export const altLinks = (path) =>
  esPath(path)
    ? [
        { hrefLang: "en", href: path },
        { hrefLang: "es", href: esPath(path) },
        { hrefLang: "x-default", href: path },
      ]
    : undefined;

/** Remembers the reader's choice, so the automatic switch to Spanish never overrides it (read by middleware.js). */
export const rememberLang = (lang) => {
  try {
    document.cookie = `gim_lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  } catch (e) {
    /* cookies blocked: the choice still applies to this page */
  }
};

/** Trip types and places as labels in Spanish (the data keeps the English values for filters and links). */
const TRIP_TYPE_ES = { All: "Todos", Corporate: "Corporativo", "Top in Mexico": "Lo mejor de México", Luxury: "Lujo", "Tour Venue": "Sede de tour", Family: "Familia", Couples: "Parejas", "Golf Group": "Grupo de golf" };
const PLACE_ES = { "Mexico City": "Ciudad de México" };
export const tripTypeLabel = (type, lang) => (lang === "es" ? TRIP_TYPE_ES[type] || type : type);
export const placeLabel = (place, lang) => (lang === "es" ? PLACE_ES[place] || place : place);

/* Prices in pesos on the Spanish pages (user, 2026-11-16). Trips are quoted and paid in USD, so the pesos are an
   approximation at a dated reference rate (European Central Bank reference, via frankfurter.app). Update both together. */
export const USD_MXN = 18.56;
export const RATE_DATE_ES = "16 de noviembre de 2026";
export const MXN_NOTE = `Precios en pesos aproximados, al tipo de cambio de referencia del ${RATE_DATE_ES} ($18.56 por dólar); se confirman y se pagan en USD.`;

const N = "\\d{1,3}(?:,\\d{3})+|\\d+(?:\\.\\d+)?";
const toNum = (s, k) => parseFloat(s.replace(/,/g, "")) * (k ? 1000 : 1);
const pesos = (usd) => {
  const v = usd * USD_MXN;
  const step = v >= 10000 ? 100 : 10;
  return `$${(Math.round(v / step) * step).toLocaleString("en-US")}`;
};
const PRICE = new RegExp(`\\$\\s?(${N})(k)?(?:\\s?(–|-|to|a)\\s?\\$?\\s?(${N})(k)?)?(\\+)?(?:\\s?USD)?(?![\\d,])`, "g");
const USD_FIRST = new RegExp(`USD\\s?(${N})(?![\\d,])`, "g");

/** "$388" → "$7,200 MXN", "$260–$700 USD" → "$4,830–$12,990 MXN", "USD 65" → "$1,210 MXN". */
export const toMXN = (text) =>
  typeof text !== "string"
    ? text
    : text
        // "$3–5k": the k covers both ends. "de $260 a $700" keeps its "a".
        .replace(PRICE, (m, a, ka, sep, b, kb, plus = "") =>
          b ? `${pesos(toNum(a, ka || kb))}${/^(a|to)$/.test(sep) ? " a " : "–"}${pesos(toNum(b, kb))}${plus} MXN` : `${pesos(toNum(a, ka))}${plus} MXN`
        )
        .replace(USD_FIRST, (m, a) => `${pesos(toNum(a))} MXN`);

/** Mexico City is Ciudad de México in Spanish; the LIV Golf event keeps its own name. */
export const cdmx = (text) => (typeof text === "string" ? text.replace(/(?<!LIV Golf )Mexico City/g, "Ciudad de México") : text);

/** Every reader-facing string of a Spanish data record: prices in pesos, Ciudad de México. Paths, links and the
    English keys code filters on are left alone. */
const KEEP_KEYS = /^(href|slug|image|photo|src|logo|to|destination|type|tier)$/;
export const esData = (v) =>
  Array.isArray(v)
    ? v.map(esData)
    : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, KEEP_KEYS.test(k) && typeof x === "string" ? x : esData(x)]))
      : typeof v === "string" && !/^(\/|https?:)/.test(v)
        ? cdmx(toMXN(v))
        : v;
