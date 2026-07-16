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
  inquiry:              { formId: "cd60b7bb-d24f-4312-a979-232a64fc668c", behavior: "welcome" },
  trip_builder:         { formId: "445b2b5c-17a0-4609-821a-3da9268d5365", behavior: "welcome" },
  trip_builder_exit:    { formId: "2d7e9e75-eba9-43ce-9cd3-c54fc20e951c", behavior: "welcome" },
  notify:               { formId: "07dc7a4a-2863-4d94-89fc-f4cc8063f0bc", behavior: "welcome" },
  destination_waitlist: { formId: "eda80f6d-e0c7-474e-ae4d-d1f7ec415ce7", behavior: "welcome" },
  footer_newsletter:    { formId: "1c191983-38c4-4b31-87c6-a62213a34d0d", behavior: "welcome" },
  hub_capture:          { formId: "8e3c424e-6d74-440a-b480-61cc23a6115e", behavior: "welcome" },

  // --- Welcome + guide (HubSpot follow-up email delivers the PDF) ---
  // Deferred until the lead-magnet PDFs exist (Email B / Email C). Left blank →
  // these two forms stay a safe no-op even with the portal ID set. Wire on PDF day.
  article_newsletter:   { formId: "", behavior: "guide", guideUrl: "" }, // Mexico golf planning guide
  hub_playbook:         { formId: "", behavior: "guide", guideUrl: "" }, // Los Cabos playbook
};

export const getFormConfig = (formKey) => HUBSPOT_FORMS[formKey] || null;

export const isHubspotConfigured = (formKey) => {
  const cfg = getFormConfig(formKey);
  return Boolean(HUBSPOT_PORTAL_ID && cfg && cfg.formId);
};
