// Analytics loader for a client-routed SPA.
//
// Primary path: Google Tag Manager. Set REACT_APP_GTM_ID (GTM-XXXXXXX) and GA4
// is configured *inside* GTM — this file just loads the container and pushes
// clean dataLayer events on route change / conversion.
//
// Fallback path: if no GTM ID is set but REACT_APP_GA4_ID (G-XXXXXXXXXX) is,
// gtag.js loads directly. GTM takes priority so GA4 is never loaded twice
// (which would double-count every page_view).
//
// With neither var set, every function is a safe no-op, so this can ship before
// the containers exist.
//
// SPA contract for whoever configures GTM:
//   - On every route change this pushes:  { event: "spa_pageview", page_path, page_location, page_title }
//     → build a GA4 Event tag (event name "page_view") on a Custom Event trigger
//       matching "spa_pageview", and DISABLE GA4 Enhanced Measurement's
//       "page changes based on browser history events" to avoid duplicates.
//   - Conversions push:  { event: "generate_lead", ...params }

const GTM_ID = process.env.REACT_APP_GTM_ID;
const GA4_ID = process.env.REACT_APP_GA4_ID;

const hasGTM = () => typeof window !== "undefined" && Boolean(GTM_ID);
const hasGA4Direct = () =>
  typeof window !== "undefined" && !GTM_ID && Boolean(GA4_ID);
const isEnabled = () => hasGTM() || hasGA4Direct();

let initialized = false;

// Load the container/tag once. Safe to call repeatedly.
export const initAnalytics = () => {
  if (!isEnabled() || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];

  if (hasGTM()) {
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    const first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
    return;
  }

  // Direct GA4 fallback (no GTM).
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  // send_page_view: false — we emit page_view ourselves on every route change.
  gtag("config", GA4_ID, { send_page_view: false });
};

// Emit a page_view for the current SPA route.
export const trackPageView = (path) => {
  if (!isEnabled()) return;

  const payload = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };

  if (hasGTM()) {
    window.dataLayer.push({ event: "spa_pageview", ...payload });
    return;
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", payload);
  }
};

// Emit a custom event (e.g. generate_lead). params is an optional object.
export const trackEvent = (name, params = {}) => {
  if (!isEnabled()) return;

  if (hasGTM()) {
    window.dataLayer.push({ event: name, ...params });
    return;
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};
