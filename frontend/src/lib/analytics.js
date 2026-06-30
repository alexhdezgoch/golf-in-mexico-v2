// Analytics loader for a client-routed SPA. Three independent, env-driven paths:
//
//   - Google: REACT_APP_GTM_ID (GTM-XXXXXXX) loads GTM (GA4 configured inside it);
//     else REACT_APP_GA4_ID (G-XXXXXXXXXX) loads gtag.js directly. GTM takes
//     priority so GA4 is never loaded twice.
//   - Meta: REACT_APP_META_PIXEL_ID (numeric) loads the Meta Pixel.
//
// Each path is optional and runs alongside the others. With no vars set, every
// function is a safe no-op, so this can ship before the IDs exist.
//
// Because this is a client-routed SPA, automatic page views are suppressed and a
// page view is emitted manually on every route change (see trackPageView).
//
// GTM contract: on route change this pushes { event: "spa_pageview", page_path,
// page_location, page_title } — build a GA4 Event tag (event "page_view") on a
// Custom Event trigger "spa_pageview" and DISABLE GA4 Enhanced Measurement's
// "page changes based on browser history events" to avoid duplicates.

const GTM_ID = process.env.REACT_APP_GTM_ID;
const GA4_ID = process.env.REACT_APP_GA4_ID;
const META_PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;

const hasWindow = () => typeof window !== "undefined";
const hasGTM = () => hasWindow() && Boolean(GTM_ID);
const hasGA4Direct = () => hasWindow() && !GTM_ID && Boolean(GA4_ID);
const hasMeta = () => hasWindow() && Boolean(META_PIXEL_ID);
const isEnabled = () => hasGTM() || hasGA4Direct() || hasMeta();

let initialized = false;

function initGoogle() {
  window.dataLayer = window.dataLayer || [];

  if (hasGTM()) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    const first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
    return;
  }

  // Direct GA4 (no GTM).
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
}

function initMeta() {
  // Standard Meta Pixel loader. PageView is NOT fired here — trackPageView emits
  // it on the initial route effect and every change, avoiding a double count.
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", META_PIXEL_ID);
}

// Load configured tags once. Safe to call repeatedly.
export const initAnalytics = () => {
  if (!isEnabled() || initialized) return;
  initialized = true;
  if (hasGTM() || hasGA4Direct()) initGoogle();
  if (hasMeta()) initMeta();
};

// Emit a page view for the current SPA route across every active provider.
export const trackPageView = (path) => {
  if (!isEnabled()) return;

  const payload = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };

  if (hasGTM()) {
    window.dataLayer.push({ event: "spa_pageview", ...payload });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", payload);
  }

  if (hasMeta() && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};

// Emit a lead conversion across every active provider, using each platform's
// expected event name: GA4 -> "generate_lead", Meta -> standard "Lead".
export const trackLead = (params = {}) => {
  if (!isEnabled()) return;

  if (hasGTM()) {
    window.dataLayer.push({ event: "generate_lead", ...params });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", params);
  }

  if (hasMeta() && typeof window.fbq === "function") {
    window.fbq("track", "Lead", params);
  }
};

// Emit a custom event across every active provider.
export const trackEvent = (name, params = {}) => {
  if (!isEnabled()) return;

  if (hasGTM()) {
    window.dataLayer.push({ event: name, ...params });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (hasMeta() && typeof window.fbq === "function") {
    window.fbq("trackCustom", name, params);
  }
};
