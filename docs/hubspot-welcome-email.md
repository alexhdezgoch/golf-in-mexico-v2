# HubSpot Welcome Email — content & go-live notes

Built 2026-07-16 in the GIM HubSpot portal (id **51554591**). The email itself is
composed in the **Inquiry form → Automation → simple workflow → Send email**, but
it could NOT be saved yet because HubSpot requires a **complete CAN-SPAM footer**
(a physical mailing address) before a marketing email can save/send.

## Blocker to finish
Add GIM's **physical mailing address** in HubSpot → Settings → Marketing → Email →
Footer (or the "Manage" link in the email editor's *Email footer* field). Once the
footer is complete, re-open the workflow email and click **Save email**.

## Tier note
The portal is on a **22-day trial**. It allows only **1** follow-up email. To put a
welcome email on all 7 forms (and to keep any auto-email sending after the trial),
Pablo must upgrade to **Marketing Hub Starter** (~$108/yr). Free = 1 email only.

## Email content (recreate exactly)
- **Email name:** GIM — Welcome (Inquiry follow-up)
- **From name:** Golf in Mexico
- **From address:** admin@golf-in-mexico.com  (already a verified sender — no setup needed)
- **Subscription type:** Marketing Email | Marketing Information
- **Subject:** Thanks for reaching out to Golf in Mexico
- **Body:**

  > **Golf in Mexico°**   ← wordmark: bold, serif (Book Antiqua), 24px, color #0f2419
  >
  > Thanks for getting in touch — we've received your message.
  >
  > Someone from our team will reach out shortly to help plan your trip: the right
  > courses, tee times, places to stay, and everything in between.
  >
  > In the meantime, keep exploring at golf-in-mexico.com.
  >
  > Warmly,
  > The Golf in Mexico team

Brand: deep green #0f2419, gold #c8a96e, off-white #f8f5f0; display font Libre
Baskerville (Book Antiqua is the closest email-safe serif).

## Form GUIDs (already wired in src/config/hubspot.js)
| formKey | GUID |
|---|---|
| inquiry | cd60b7bb-d24f-4312-a979-232a64fc668c |
| trip_builder | 445b2b5c-17a0-4609-821a-3da9268d5365 |
| trip_builder_exit | 2d7e9e75-eba9-43ce-9cd3-c54fc20e951c |
| notify | 07dc7a4a-2863-4d94-89fc-f4cc8063f0bc |
| destination_waitlist | eda80f6d-e0c7-474e-ae4d-d1f7ec415ce7 |
| footer_newsletter | 1c191983-38c4-4b31-87c6-a62213a34d0d |
| hub_capture | 8e3c424e-6d74-440a-b480-61cc23a6115e |

## Production go-live (after Alex tests the preview + approves)
1. `vercel env add REACT_APP_HUBSPOT_PORTAL_ID production`  → value `51554591`
2. Merge `feat/hubspot-go-live` → main (Vercel deploys prod).
3. Live-smoke each form on the real site → confirm contacts land in HubSpot.
4. Delete the smoke-test contact `smoke+inquiry@akeep.co`.
5. Revoke the `akeep-forms-setup` Service Key (Settings → Integrations → Service
   Keys) — it was only needed for the one-time property/form creation.
