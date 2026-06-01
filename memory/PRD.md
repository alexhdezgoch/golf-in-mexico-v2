# Golf in Mexico° (GIM) — Product Requirements

## Original Problem Statement
Build a full multi-page Landing Page for "Golf in Mexico°" (GIM) — a premium editorial golf brand. Multi-page architecture (Home, Journal, Destinations, Destination Hubs, Trip Builder, About, Contact). Typography: Libre Baskerville, Outfit, Space Mono. Colors: Off-white (#f8f5f0), Deep green (#0f2419), Gold (#c8a96e). Lenis smooth scrolling, custom cursors, editorial voice.

**Language:** Spanish (user communicates in Spanish — respond in Spanish)
**Mode:** Look & Feel only — no backend integrations yet. Forms are mocked.

## What's Implemented (as of Feb 2026)

### Pages
- `/` Home — Editorial hero, "Everything you need to know before you play Mexico." section, founders tabs (Pablo/José/GIM "The result"). Hero CTA → /experience
- `/journal` — Sticky filter bar at top, 4-pillar horizontal slider, framed article cards (white-bg + border + photo+title+excerpt+Read CTA), Bachelor Trip Featured card, bottom "Get in touch" CTA → /contact
- `/journal/:slug` — Editorial article page
- `/destinations` — 6 stacked editorial destination cards (incl. Unique Destinations)
- `/destinations/:slug` — MASTER HUB (LosCabos.jsx as reusable template fed by hubs.js for all 6 regions). Sticky SectionNav with smart H2-aware scrolling. Keep Exploring shows 5 cards incl. Unique Destinations
- `/experience` — 4 trip-type cards (Couples Golf, Bachelor Trip, Family or Friends, Corporate Retreat) → /trip-builder?type=
- `/trip-builder` — 4-step wizard with hero, AVAILABILITY high-contrast banner, single combined GIM Promise (Attention + Expectation Refund), deliverables, scarcity messaging. No global nav.
- `/about` — Pablo + José founder bios with portrait, credentials, photo slider per founder
- `/contact` — **NEW** — Email + Schedule a Call via Google Calendar iframe (Pablo De La Mora's appointment scheduler)

### Reusable Components
- `/components/hub/PhotoSlot.jsx`, `/components/hub/SectionNav.jsx` (H2-aware scroll, Lenis-aware)
- `/components/Nav.jsx` — larger logo (h-8 md:h-10), Inquire → /experience, Contact → /contact
- `/components/Footer.jsx` — bigger social icons (44px), Contact → /contact, no more "4,200+" line
- `/components/TeamEditorial.jsx` — Pablo, José, GIM tabs (GIM now shows "The result." manifesto, no longer Three Principles cards)

### Design System
- CSS variables in `/index.css`: `--c-green-deep`, `--c-gold`, `--c-off-white`, etc.
- Typography: Libre Baskerville (display), Outfit (body), Space Mono (mono accents)
- Logo: white wordmark, inverts on light backgrounds

## Recently Completed (this session — Feb 2026)

### Copy sprint
- All "México" → "Mexico", all "Cancún" → "Cancun" site-wide (place-names only; personal names like "José" preserved)
- Removed Footer line: "Join 4,200+ golfers who read Pablo's weekly field notes."
- Trip Builder: GIM Promise reduced from 3 cards to 1 combined promise (Attention & Expectation Refund)
- Trip Builder: Step 1 destination descriptions rewritten ("Most golf courses", "Soft luxury + relaxed vacations", "Historic clubs + off-course experiences", "Easiest trip to book")
- Experience cards: removed small-label eyebrows ("Two travelers", "8–14 players", etc.), updated Couples Golf description, renamed "Family & Friends" → "Family or Friends"
- Journal: H1 "Four editorial pillars guide everything we publish."
- Added "Get in touch / Connect with us" CTA at bottom of Journal → /contact

### Design sprint
- Readability rule: removed decorative eyebrows/bylines site-wide (e.g., "Custom Trip Proposals", "Step 1 of 2 · Who's coming", "The Journal", "From GIM" decorative labels)
- Logo bigger (h-8 / h-10) and reliably visible on dark backgrounds (clean invert toggle, no buggy mixBlendMode)
- Social icons bigger (w-11 h-11 with 18px svg)
- Trip Builder AVAILABILITY scarcity banner now high contrast (dark green bg, white uppercase text + gold dot)
- New /contact page with email + Google Calendar iframe embedded
- Journal page restructure: filter bar to top (sticky), pillar tabs → horizontal slider with prev/next arrows, article cards now framed (white bg, border, contained layout)
- Destination hub Keep Exploring: shows 5 cards (incl. Unique Destinations), extra whitespace (py-28 md:py-40)
- SectionNav: clicks now scroll to section's H2 (not section top), Lenis-aware for smoother behavior
- TeamEditorial GIM tab: replaced "Three principles." + 3 cards with "The result." + manifesto body
- Home: restored "Everything you need to know before you play Mexico." in video section heading

## Active Issues / Pending
- None known. testing_agent_v3_fork validated 11/11 requirements at iteration_2 (100% pass, no regressions).

## Roadmap

### P1 (next, when user resumes)
- [ ] Rewrite Destination Hub FAQs using only article-sourced facts (originally requested but superseded by this sprint — pending)
- [ ] Localize each hub's inline Playbook CTA per region (currently dynamic via `playbookH3Pre/Em`, audit copy per hub)
- [ ] Rename `LosCabos.jsx` → `DestinationHub.jsx` (cleanup)
- [ ] Article.jsx "Twin Galleries" redesign
- [ ] InquiryModal is mounted but no longer triggered; consider removing

### P2 (later — out of "Look & Feel" scope)
- [ ] Wire Trip Builder + Newsletter + Playbook + Contact forms to backend (FastAPI + Mongo or MailerLite/Resend)
- [ ] Real photography per region
- [ ] SEO meta tags (react-helmet)
- [ ] Real YouTube video embed

## Tech Stack
- React 18 + TailwindCSS + Framer Motion + Lenis
- Pure frontend — no backend wired yet
- Mocked: all forms, YouTube embed, Calendar (uses real public Google Calendar iframe)

## Files of Reference
- `/app/frontend/src/pages/LosCabos.jsx` — Master Hub template
- `/app/frontend/src/data/hubs.js` — destination data (Keep Exploring slice: 5)
- `/app/frontend/src/data/articles.js` — articles incl. Bachelor Trip
- `/app/frontend/src/pages/Journal.jsx` — filter bar (top) + pillars slider + framed cards + Get in touch CTA
- `/app/frontend/src/pages/TripBuilder.jsx` — 4-step wizard
- `/app/frontend/src/pages/Experience.jsx` — 4 trip-type cards
- `/app/frontend/src/pages/Contact.jsx` — NEW (email + Google Calendar)
- `/app/frontend/src/pages/About.jsx` — founders with slider
- `/app/frontend/src/components/Nav.jsx` — global nav
- `/app/frontend/src/components/Footer.jsx`
- `/app/frontend/src/components/TeamEditorial.jsx`
- `/app/frontend/src/components/hub/SectionNav.jsx` — H2-aware scroll
- `/app/frontend/src/index.css` — design tokens

## Credentials
None — no auth implemented.
