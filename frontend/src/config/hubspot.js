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
// Follow-up behavior is configured INSIDE HubSpot (not in code):
//   - "welcome"  → a HubSpot form whose follow-up email just says thanks.
// Every form is "welcome" today. A "guide" behavior (follow-up email delivers a
// PDF, plus a `guideUrl` for an instant on-page download) existed for the two
// lead-magnet forms, but the PDFs were never produced, so it was retired on
// 07-24 — see the note on article_newsletter / hub_playbook below.
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
//   behavior : "welcome"  (documentation only; drives spec doc)
export const HUBSPOT_FORMS = {
  // --- Welcome-only (acknowledge, sales/waitlist follows up by hand) ---
  inquiry:              { formId: "cd60b7bb-d24f-4312-a979-232a64fc668c", behavior: "welcome" },
  trip_builder:         { formId: "445b2b5c-17a0-4609-821a-3da9268d5365", behavior: "welcome" },
  trip_builder_exit:    { formId: "2d7e9e75-eba9-43ce-9cd3-c54fc20e951c", behavior: "welcome" },
  notify:               { formId: "07dc7a4a-2863-4d94-89fc-f4cc8063f0bc", behavior: "welcome" },
  destination_waitlist: { formId: "eda80f6d-e0c7-474e-ae4d-d1f7ec415ce7", behavior: "welcome" },
  footer_newsletter:    { formId: "1c191983-38c4-4b31-87c6-a62213a34d0d", behavior: "welcome" },
  hub_capture:          { formId: "8e3c424e-6d74-440a-b480-61cc23a6115e", behavior: "welcome" },

  // --- Aliases onto live GUIDs (07-24: guide CTAs rewired to general capture) ---
  // These two used to be behavior:"guide" with a blank formId, so every email typed
  // into the article exit-intent slide and the hub playbook CTAs posted NOWHERE.
  // The lead-magnet PDFs don't exist, so the guide promise was retired (call 07-21)
  // and both CTAs are now plain "stay in the loop" capture.
  //
  // They deliberately SHARE the GUIDs of their general-capture equivalents rather
  // than getting new HubSpot forms — capture works today with no portal setup. The
  // keys stay distinct so trackLead() keeps per-CTA attribution in GA4, and hub
  // submissions still pass `region`, so HubSpot can tell the destinations apart.
  // Per-guide forms + delivery emails return when the PDFs do.
  article_newsletter:   { formId: "1c191983-38c4-4b31-87c6-a62213a34d0d", behavior: "welcome" }, // alias → footer_newsletter
  hub_playbook:         { formId: "8e3c424e-6d74-440a-b480-61cc23a6115e", behavior: "welcome" }, // alias → hub_capture
};

export const getFormConfig = (formKey) => HUBSPOT_FORMS[formKey] || null;

export const isHubspotConfigured = (formKey) => {
  const cfg = getFormConfig(formKey);
  return Boolean(HUBSPOT_PORTAL_ID && cfg && cfg.formId);
};
