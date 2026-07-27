// HubSpot Forms API client — the single point every lead form submits through.
//
// Design mirrors lib/analytics.js: env-driven and a SAFE NO-OP until configured.
// When a form has no portal ID / form GUID yet, submitToHubspot resolves
// { ok: true, dormant: true } so forms keep their current optimistic confirmation
// during the pre-integration period. Once configured, it performs a real POST and
// reports honest success/failure so the UI can show an error instead of faking it.
//
// Only PUBLIC identifiers are used (portal ID + form GUID) — no secret token — so
// this is safe to run in the browser on a static site.

import {
  HUBSPOT_PORTAL_ID,
  HUBSPOT_ENDPOINT_BASE,
  HUBSPOT_CONSENT_TEXT,
  HUBSPOT_FORMS,
  getFormConfig,
  isHubspotConfigured,
} from "@/config/hubspot";
import { getAttribution, getHubspotCookie } from "@/lib/attribution";

// Turn a flat { name: value } object into HubSpot's [{ name, value }] shape,
// dropping empty/nullish values HubSpot would reject or store as blanks.
const toHubspotFields = (fields) =>
  Object.entries(fields || {})
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([name, value]) => ({
      name,
      value: Array.isArray(value) ? value.join("; ") : String(value),
    }));

const buildContext = () => {
  const context = {};
  if (typeof window !== "undefined") {
    context.pageUri = window.location.href;
    context.pageName = document.title;
  }
  const hutk = getHubspotCookie();
  if (hutk) context.hutk = hutk;
  return context;
};

/**
 * Submit a lead to HubSpot.
 * @param {string} formKey  key into HUBSPOT_FORMS (e.g. "inquiry")
 * @param {Object} fields   flat map of field name → value (e.g. { email, firstname, region })
 * @returns {Promise<{ ok: boolean, dormant?: boolean, error?: string }>}
 */
export const submitToHubspot = async (formKey, fields = {}) => {
  const cfg = getFormConfig(formKey);
  if (!cfg) {
    // A bad formKey is OUR bug, and it can only ever destroy leads — the visitor
    // typed a real email and there is nowhere to send it. This used to return
    // ok:true, so the form showed "You're on the list.", fired the GA4 lead event,
    // and dropped the address with no signal anywhere. Fail loudly instead: the
    // caller shows its error state and the visitor gets the mailto fallback.
    console.error(
      `[hubspot] Unknown form key "${formKey}" — submission NOT sent. ` +
        `Valid keys: ${Object.keys(HUBSPOT_FORMS).join(", ")}`
    );
    return { ok: false, error: `Unknown HubSpot form key: ${formKey}` };
  }

  // Not wired up yet → behave exactly like today (optimistic success, no network).
  // This is deliberate for the pre-integration period, but now that the portal ID
  // IS set in production, hitting this path in prod means the env var is missing —
  // so make it visible rather than silently swallowing every lead on the site.
  if (!isHubspotConfigured(formKey)) {
    console.warn(
      `[hubspot] DORMANT: "${formKey}" posted nowhere. ` +
        (HUBSPOT_PORTAL_ID
          ? `formId is blank for this key.`
          : `REACT_APP_HUBSPOT_PORTAL_ID is not set in this build.`)
    );
    return { ok: true, dormant: true };
  }

  const attribution = getAttribution();
  const payload = {
    fields: toHubspotFields({ ...attribution, ...fields }),
    context: buildContext(),
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: HUBSPOT_CONSENT_TEXT,
      },
    },
  };

  const url = `${HUBSPOT_ENDPOINT_BASE}/${HUBSPOT_PORTAL_ID}/${cfg.formId}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true };

    // HubSpot returns a JSON error body (e.g. INVALID_EMAIL, form not found).
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body && body.message) detail = body.message;
    } catch {
      /* non-JSON error body — keep the status */
    }
    return { ok: false, error: detail };
  } catch (err) {
    // Network failure or blocked request (ad blocker, offline).
    return { ok: false, error: err && err.message ? err.message : "Network error" };
  }
};
