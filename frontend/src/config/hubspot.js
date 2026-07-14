// HubSpot integration config — COMMITTED, non-secret values only.
//
// HubSpot form submissions are authenticated by PUBLIC identifiers (a portal ID
// and per-form GUIDs), so there is no secret to hide and this whole map is safe
// to commit. The integration stays DORMANT until REACT_APP_HUBSPOT_PORTAL_ID is
// set and a form's `formId` is filled in — mirroring lib/analytics.js, so the
// site can ship today and light up the moment the HubSpot account exists.
//
// Integration day = paste the portal ID into Vercel env + fill the formId blanks
// below with the GUIDs HubSpot shows for each created form. No other code change.
//
// Two follow-up behaviors, both configured INSIDE HubSpot (not in code):
//   - "welcome"  → a HubSpot form whose follow-up email just says thanks.
//   - "guide"    → a HubSpot form whose follow-up email delivers a PDF guide.
//     Set `guideUrl` too so the site can also offer an instant download on submit.
//
// See docs/hubspot-integration.md for the exact forms/emails to create.

// The single master switch. Unset → every form is a safe no-op (optimistic UX,
// posts nowhere), exactly as the site behaves today.
export const HUBSPOT_PORTAL_ID = process.env.REACT_APP_HUBSPOT_PORTAL_ID || "";

// Submission endpoint base. Kept as one overridable constant so a future
// same-origin Vercel proxy (to dodge ad-blockers) is a one-line swap, not a
// rewrite. Default is HubSpot's public Forms API.
export const HUBSPOT_ENDPOINT_BASE =
  process.env.REACT_APP_HUBSPOT_ENDPOINT_BASE ||
  "https://api.hsforms.com/submissions/v3/integration/submit";

// Consent notice shown under email fields and recorded with each submission.
// Required if the HubSpot portal has GDPR features enabled; harmless otherwise.
export const HUBSPOT_CONSENT_TEXT =
  "By submitting, you agree to hear from Golf in Mexico by email. You can unsubscribe at any time.";

// formKey → HubSpot form. `formId` blanks are filled on integration day.
//   behavior : "welcome" | "guide"  (documentation only; drives spec doc)
//   guideUrl : public URL of the PDF to offer as an instant on-page download
//              (guide forms only; leave "" until the PDF exists → no link shown)
export const HUBSPOT_FORMS = {
  // --- Welcome-only (acknowledge, sales/waitlist follows up by hand) ---
  inquiry:              { formId: "", behavior: "welcome" },
  trip_builder:         { formId: "", behavior: "welcome" },
  trip_builder_exit:    { formId: "", behavior: "welcome" },
  notify:               { formId: "", behavior: "welcome" },
  destination_waitlist: { formId: "", behavior: "welcome" },
  footer_newsletter:    { formId: "", behavior: "welcome" },
  hub_capture:          { formId: "", behavior: "welcome" },

  // --- Welcome + guide (HubSpot follow-up email delivers the PDF) ---
  article_newsletter:   { formId: "", behavior: "guide", guideUrl: "" }, // Mexico golf planning guide
  hub_playbook:         { formId: "", behavior: "guide", guideUrl: "" }, // Los Cabos playbook
};

export const getFormConfig = (formKey) => HUBSPOT_FORMS[formKey] || null;

export const isHubspotConfigured = (formKey) => {
  const cfg = getFormConfig(formKey);
  return Boolean(HUBSPOT_PORTAL_ID && cfg && cfg.formId);
};
