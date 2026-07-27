# HubSpot Integration — Setup & Go-Live Spec

**Status:** Code built and dormant. The site posts to HubSpot the moment the
account exists and the IDs below are filled in — no further code changes.

This doc is the checklist for whoever sets up the HubSpot account (Pablo / Akeep)
and the go-live runbook for the dev flipping it on.

---

## 0. How it works (30-second version)

Every lead form on the site submits through one helper (`src/lib/hubspot.js`)
using HubSpot's **Forms API**. This needs only **public** IDs — a portal ID and
one form GUID per form — so there is **no secret key in the browser** and no
server to run. Follow-up emails (welcome, and guide delivery) are configured
**inside HubSpot**, not in code, so Pablo can edit the copy himself anytime.

While the IDs are blank, every form behaves exactly as it does today (shows its
confirmation, posts nowhere). Fill the IDs → it goes live.

---

## 1. Required HubSpot subscription — DECISION NEEDED

| Tier | Cost | What you get | Enough? |
|---|---|---|---|
| **Free** | $0 | **1** automated follow-up email, HubSpot branding on it | ❌ Only one auto-email; can't do welcome *and* regional guides |
| **Marketing Hub Starter** | **~$9/seat/mo billed annually (~$108/yr), or ~$15 month-to-month** | Up to **10** automated actions, branding removed, 1,000 marketing contacts, 5,000 sends/mo | ✅ **This is what we need** |

**Action:** Pablo signs up for **Marketing Hub Starter, 1 seat.** Without at least
Starter, the welcome/guide emails will not send and the integration will silently
capture contacts but email no one.

_(Pricing verified Jul 2026 — HubSpot changes tiers often; confirm at signup.)_

---

## 2. Contact properties to create in HubSpot

Most are default HubSpot properties. Create the custom ones (marked ★) under
Settings → Properties → Contact properties, type "Single-line text" unless noted.

| Field name (must match exactly) | Default or custom | Used by |
|---|---|---|
| `email` | default | all forms |
| `firstname` | default | inquiry, trip_builder |
| `phone` | default | trip_builder |
| `message` | default | inquiry |
| `region` ★ | custom | inquiry, notify, destination_waitlist, hub captures |
| `destination` ★ | custom | destination_waitlist |
| `preferred_dates` ★ | custom | inquiry, trip_builder |
| `trip_length` ★ | custom | trip_builder |
| `trip_type` ★ | custom | trip_builder(+exit) |
| `package` ★ | custom | trip_builder |
| `budget` ★ | custom | trip_builder |
| `utm_source` `utm_medium` `utm_campaign` `utm_term` `utm_content` ★ | custom | all (attribution) |
| `gclid` `fbclid` ★ | custom | all (ad click IDs) |
| `landing_page` `referrer` ★ | custom | all (attribution) |
| `company_website` | **do NOT create / ignore** | honeypot spam trap — must be ignored |

---

## 3. HubSpot forms to create → paste GUIDs into `src/config/hubspot.js`

Create each form in HubSpot (Marketing → Forms → Create). Field: at minimum
`email` (plus the extra fields above where relevant — mapping them is optional;
the API sends them regardless and they land on the contact). After creating each
form, copy its **form GUID** (in the embed code / share URL) into the matching
`formId: ""` blank in `src/config/hubspot.js`.

For each form, turn ON **"Send follow-up email"** and attach the right email (§4).

| formKey (in code) | Site location | Behavior | Follow-up email |
|---|---|---|---|
| `inquiry` | Inquiry modal (global) | welcome | Email A — welcome |
| `trip_builder` | Trip Builder (final + step-3 capture) | welcome | Email A — welcome |
| `trip_builder_exit` | Trip Builder exit-intent | welcome | Email A — welcome |
| `notify` | "Notify me" region modal | welcome | Email A — welcome |
| `destination_waitlist` | Destination placeholder pages | welcome | Email A — welcome |
| `footer_newsletter` | Site footer | welcome | Email A — welcome (or newsletter opt-in) |
| `hub_capture` | Destination hub captures + the 6 destinations-index cards | welcome | Email A — welcome |
| `article_newsletter` | Article exit-intent capture | welcome | *alias → `footer_newsletter` GUID* |
| `hub_playbook` | Destination hub "stay in the loop" CTAs | welcome | *alias → `hub_capture` GUID* |

> **07-24 change — guide CTAs retired.** The lead-magnet PDFs were never produced,
> so the two guide forms became a dead end: they promised a download that didn't
> exist AND had a blank `formId`, meaning every email typed into them was
> **discarded**. Per the 07-21 call, both CTAs are now plain "stay in the loop"
> capture, and both keys **alias onto the live GUIDs above** — no new HubSpot forms
> needed. Because a shared GUID means HubSpot can't separate them *by form*, the
> distinction lives elsewhere: every call site sends `form` + `placement` to GA4,
> and hub/destination submissions send `region` so the destination lands on the
> contact. Caveat both ways — GA4 events are blocked by the same privacy lists that
> block the HubSpot POST, and `region` is last-write-wins (HubSpot dedupes on email).
> If per-form segmentation inside HubSpot is ever needed, these need real forms.
>
> To bring real guide delivery back once the PDFs exist: create the two forms in
> HubSpot, attach Email B / Email C, put their own GUIDs in `src/config/hubspot.js`,
> and re-add a `guideUrl` + `getGuideUrl()` helper for the instant on-page download.

### Also set on the code side (integration day)
- `REACT_APP_HUBSPOT_PORTAL_ID` → set in **Vercel → Project → Settings → Environment Variables** (Production). This is the master switch.

---

## 4. Follow-up emails to write in HubSpot

- **Email A — Welcome** (welcome-only forms): "Thanks — you'll hear from Pablo &
  José / Golf in Mexico shortly." No attachment.
- **Email B — Mexico golf planning guide** (`article_newsletter`): welcome +
  link/attachment to the planning-guide PDF. **Deferred** — the PDF doesn't exist;
  see the 07-24 note in §3. Not needed for the current capture-only CTAs.
- **Email C — Los Cabos playbook** (`hub_playbook`): welcome + the Los Cabos
  playbook PDF. **Deferred** — same reason.

Add more region-specific guide emails later by creating a new form + email pair
and a new formKey (see §7).

---

## 5. Required HubSpot form settings (or submissions will fail)

- **CAPTCHA: OFF** on every form. HubSpot's CAPTCHA cannot be satisfied via the
  API and will reject 100% of submissions. (We use a honeypot + min-submit-time
  in code instead.)
- **GDPR / consent:** the site sends a consent record with every submission
  (`legalConsentOptions.consent`, text in `src/config/hubspot.js`). If the portal
  has GDPR features ON, this satisfies it. If you change the on-site consent
  wording, update `HUBSPOT_CONSENT_TEXT` in that file.
- **Non-marketing contacts:** decide whether form submitters become *marketing
  contacts* (billable, emailable) automatically. For these forms, yes.

---

## 6. Go-live runbook (dev — needs Alex/Pablo's explicit GO)

Flipping this on is a **production behavior change** → get explicit sign-off first.

1. Confirm Pablo is on **Marketing Hub Starter** and the 7 real forms + Email A exist.
   (9 formKeys, but `article_newsletter`/`hub_playbook` are aliases — see §3. Emails B/C are deferred.)
2. Fill every `formId` blank in `src/config/hubspot.js`.
3. Set `REACT_APP_HUBSPOT_PORTAL_ID` in Vercel (Production) and redeploy.
4. **Smoke test — one unique email per form** (e.g. `test+inquiry@…`):

   | Form | Test | Pass = |
   |---|---|---|
   | inquiry | submit modal | contact created w/ name+region; Email A arrives |
   | trip_builder | complete all 4 steps | contact w/ package+budget; Email A arrives |
   | trip_builder (partial) | fill step 3, abandon at step 4 | contact still created |
   | trip_builder_exit | trigger exit-intent, submit | contact created; Email A |
   | notify | submit region modal | contact w/ region; Email A |
   | destination_waitlist | submit on a placeholder page | contact w/ destination; Email A |
   | footer_newsletter | submit footer | contact created; Email A |
   | hub_capture | submit a hub capture | contact created; Email A |
   | article_newsletter | trigger article popup, submit | contact created (lands via `footer_newsletter` GUID) |
   | hub_playbook | submit a hub "keep me in the loop" CTA | contact created w/ `region` (via `hub_capture` GUID) |

5. Verify UTM capture: visit `/?utm_source=test&gclid=abc`, submit any form,
   confirm `utm_source`/`gclid` land on the contact.
6. Test the failure path: temporarily set a bad formId → confirm the form shows
   the inline error + `mailto` fallback instead of a fake success.

---

## 7. Notes, decisions, and future work

- **Trip Builder double-send:** the trip builder posts at step-3 (safety net for
  step-4 abandoners) **and** at final submit (enriched with package/budget).
  HubSpot dedupes on email → one contact. A completer may receive Email A twice;
  if that's not wanted, set Email A to send only on first submission, or gate the
  step-3 send. Acceptable as-is (both are "welcome").
- **~~`PlaybookEndForm` copy mismatch~~ — RESOLVED 07-24.** Its success message
  used to say "your Playbook is on its way" while wired to `hub_capture` (welcome,
  no PDF). Softened to "You're on the list." along with the rest of the guide-CTA
  de-promise; it now also passes `region`.
- **Regional guides beyond Los Cabos:** when hub guide PDFs actually exist, create
  a form+email per region and add a formKey (e.g. `guide_punta_mita`) with its own
  `guideUrl`. Don't build these until the PDFs exist — that's exactly the trap the
  07-24 change undid.
- **Ad-blocker loss (~20–30%):** browser posts to `api.hsforms.com` can be
  blocked by privacy lists (and the GA4 event too, so the loss is invisible in
  both). If live numbers look low, swap `HUBSPOT_ENDPOINT_BASE` for a same-origin
  Vercel function at `/api/lead` — it's a one-constant change, no token needed.
  Not built now (YAGNI); revisit if the data warrants.
- **HubSpot tracking cookie (`hutk`):** we attach it if present, but it only
  exists once HubSpot's tracking script loads (e.g. added via GTM). Optional —
  add later for HubSpot's own source attribution.

---

## Files in this integration
- `src/config/hubspot.js` — committed config: portal ID (env), endpoint, consent text, form map. **Fill the blanks here on integration day.**
- `src/lib/hubspot.js` — the Forms API client (`submitToHubspot`).
- `src/lib/attribution.js` — captures UTM/click-IDs on landing.
- `src/hooks/useHubspotForm.js` — shared submit hook (validation, spam guards, in-flight + error state).
- Form components/pages wired through the hook: inquiry, notify, footer, destination placeholder,
  article, trip builder, Los Cabos hub template, destination hub, destinations index (6 cards).
  (Listed rather than counted so the number can't rot again.)
