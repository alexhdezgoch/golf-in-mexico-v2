// Lead attribution capture. UTM params and click IDs live on the LANDING URL but
// are usually gone by the time a visitor submits a form pages later, so we stash
// them once on first load and read them back at submission time.
//
// Stored in sessionStorage (per-visit) — first-touch within the session wins, so
// a mid-session internal navigation can't overwrite the acquisition source.

const STORAGE_KEY = "gim_attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const safeSession = () => {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch {
    // Private mode / disabled storage — degrade to no attribution.
    return null;
  }
};

// Call once on app mount. Reads the current URL's UTM/click-id params and stores
// them if nothing is stored yet for this session (first-touch wins).
export const captureAttribution = () => {
  const store = safeSession();
  if (!store) return;
  if (store.getItem(STORAGE_KEY)) return; // already captured this session

  const params = new URLSearchParams(window.location.search);
  const captured = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) captured[key] = value;
  });

  // Always record the entry point, even with no UTMs, so we know the landing page.
  captured.landing_page = window.location.pathname + window.location.search;
  captured.referrer = document.referrer || "";

  store.setItem(STORAGE_KEY, JSON.stringify(captured));
};

// Read the stashed attribution back as a plain object (empty if none/unavailable).
export const getAttribution = () => {
  const store = safeSession();
  if (!store) return {};
  try {
    return JSON.parse(store.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

// Read HubSpot's tracking cookie if the HubSpot tracking script is ever loaded
// (e.g. via GTM). Absent today → returns undefined, which is fine to omit.
export const getHubspotCookie = () => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
};
