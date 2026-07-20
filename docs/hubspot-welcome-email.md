# HubSpot Welcome Email — content & go-live notes

**STATUS: LIVE ✅ — now on the TRIP BUILDER form (2026-07-20).** Built + published in
the GIM HubSpot portal (id **51554591**). Footer complete with GIM's physical address
(below), so it saves and sends on the trial tier.

**2026-07-20 — welcome email MOVED to the Trip Builder form (Alex's call).**
Why: the site's INQUIRE button + every "start a proposal" CTA route to `/experience`
→ the trip-builder, which submits the **`trip_builder`** form. The `InquiryModal`
(the only UI using the `inquiry` form) is rendered but **never opened** — `openInquiry`
is defined in App.js and called nowhere — so real visitors never touch the `inquiry`
form. Proof: every real submission (Alex's + test) landed as **GIM — Trip Builder**.
So the welcome auto-reply was firing off an unreachable form.
Fix (HubSpot only, no code change): created a simple workflow on **GIM — Trip Builder
→ Automation** ("Send a follow-up email after form submission", trigger = submits Trip
Builder), pointed it at the existing **GIM — Welcome (Inquiry follow-up)** email asset,
turned it **ON**, and **published** the form. The old Inquiry-form workflow is left
**Off** (inert; unreachable form) — don't delete it in a way that removes the shared
email asset the live Trip Builder workflow now depends on.
Trial cap: **1 follow-up email total** ("1 of 1"). To also welcome footer-newsletter /
other forms, Pablo must upgrade to Marketing Starter.

**Spam-filter gotcha (preview only):** HubSpot's Forms API returns HTTP 200 even when it
silently flags a submission as spam ("Unregistered Site Domain") if the submitting page's
domain isn't in Settings → Reports & Analytics Tracking → Advanced Tracking → Additional
site domains. Each Vercel **preview** deploy gets a unique subdomain, so preview tests get
spam-flagged unless that exact subdomain is added there AND **Saved** (a staged-but-unsaved
entry does nothing — this bit us). **Production `golf-in-mexico.com` is already allowlisted**,
so production submissions create contacts normally with no action needed.

Cleanup pending: a **duplicate** "GIM — Welcome (Inquiry follow-up)" email asset exists
(Marketing → Emails). The live Trip Builder workflow uses one copy; leave both for now
(deleting risks orphaning the live one). Also delete the test contacts created during
verification (search `gimlivetest`, `gimtripbuilder`, `gimwelcome`, `smoke+inquiry`).

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
