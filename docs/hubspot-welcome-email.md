# HubSpot Welcome Email — content & go-live notes

**STATUS: LIVE ✅ (2026-07-16).** Built + published in the GIM HubSpot portal
(id **51554591**). Attached to the **Inquiry form → Automation → simple workflow**;
fires automatically when someone submits the inquiry form. Footer complete with
GIM's physical address (below), so it saves and sends on the trial tier.

Cleanup pending: a **duplicate** "GIM — Welcome (Inquiry follow-up)" email asset was
created during setup (Marketing → Emails). The workflow uses one; delete the other
unused copy (don't delete the one linked to the inquiry workflow).

## Email footer address (CONFIRMED 2026-07-16)
Company name shown: **Golf in Mexico**
Physical address (from the SAS Constancia de Situación Fiscal, entity Soluciones
Deportivas BKT S.A.S. de C.V.):
> **Cerrada de la Amargura 500, Jardines de la Herradura, C.P. 52785,
> Huixquilucan, Estado de México, México**

Set this in HubSpot → Settings → Marketing → Email (footer / office location), so
the default footer is complete → then the workflow email can Save.

## Tier note
The portal is on a **22-day trial**. It allows only **1** follow-up email. To put a
welcome email on all 7 forms (and to keep any auto-email sending after the trial),
Pablo must upgrade to **Marketing Hub Starter** (~$108/yr). Free = 1 email only.

## Email content (recreate exactly)
- **Email name:** GIM — Welcome (Inquiry follow-up)
- **From name:** Pablo · Golf in Mexico
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
