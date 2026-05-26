# Golf in Mexico° (GIM) — Product Requirements

## Original Problem Statement
Build a full multi-page Landing Page for "Golf in Mexico°" (GIM) — a premium editorial golf brand. Multi-page architecture (Home, Journal, Destinations, Destination Hubs, Trip Builder, About). Typography: Libre Baskerville, Outfit, Space Mono. Colors: Off-white (#f8f5f0), Deep green (#0f2419), Gold (#c8a96e). Lenis smooth scrolling, custom cursors, editorial voice.

**Language:** Spanish (user communicates in Spanish — respond in Spanish)
**Mode:** Look & Feel only — no backend integrations yet. Forms are mocked.

## What's Implemented (as of Feb 2026)

### Pages
- `/` Home — Editorial hero, YouTube embed placeholder, founders bio. **Hero CTA → /trip-builder**
- `/journal` — 4 pillars + filter bar + search. **Bachelor Trip featured as hero card.** Filters return real ARTICLES (no longer hardcoded empty)
- `/journal/:slug` — Editorial article page (hero, body, FAQ, scroll email capture, footer CTA)
- `/destinations` — 6 stacked editorial destination cards
- `/destinations/:slug` — MASTER HUB (LosCabos.jsx is reusable template fed by hubs.js for all 6 regions). Sticky section nav, mobile-responsive Quick Facts + Course Roster
- `/trip-builder` — 4-step wizard (Where/Who → When → Package/Budget → Contact) with hero, GIM promises, deliverables, scarcity messaging. **No global nav.**
- `/about` — Pablo + José founder bios with portrait, credentials, quote, photo slider per founder

### Reusable Components
- `/components/hub/PhotoSlot.jsx`, `/components/hub/SectionNav.jsx`
- `/components/Nav.jsx` — chevron fix (Destinations inline), Inquire → /trip-builder
- `/components/Footer.jsx` — Plan your trip → /trip-builder

### Design System
- CSS variables in `/index.css`: `--c-green-deep`, `--c-gold`, `--c-off-white`, etc.
- `.nav-link-modern` (no display: inline-block; allows inline-flex)
- `.section-nav` sticky sub-nav for hub pages
- `.hub-page` typography tokens

## Recently Fixed (this session)
- Nav chevron next to "Destinations" was dropping below text (CSS cascade conflict) — FIXED
- Journal grid was hardcoded to `[]` — FIXED, now displays real articles
- Bachelor Trip article surfaced as Featured hero card in Journal
- Inquire (Nav desktop + mobile) and Home Hero CTA now route to /trip-builder
- Footer "Plan your trip" also routes to /trip-builder
- Quick Facts grid responsive on mobile (no more cramping)
- Course Roster mobile layout reflow (index inline with name, stats in 2-col grid)

## Active Issues / Pending
- None known. All pages render correctly on Desktop and Mobile.

## Roadmap

### P1 (next)
- [ ] Rename `LosCabos.jsx` → `DestinationHub.jsx` (cleanup; works correctly but name is misleading)
- [ ] Article.jsx "Twin Galleries" redesign — pending user paste of verbatim copy reference
- [ ] InquiryModal is mounted but no longer triggered; consider removing if no future use

### P2 (later — out of "Look & Feel" scope)
- [ ] Wire Trip Builder + Newsletter + Playbook forms to backend (FastAPI + Mongo or MailerLite/Resend)
- [ ] Real photography per region
- [ ] SEO meta tags (react-helmet)
- [ ] Real YouTube video embed

## Tech Stack
- React 18 + TailwindCSS + Framer Motion + Lenis
- Pure frontend — no backend wired yet
- Mocked: all forms, YouTube embed

## Files of Reference
- `/app/frontend/src/pages/LosCabos.jsx` — Master Hub template
- `/app/frontend/src/data/hubs.js` — destination data
- `/app/frontend/src/data/articles.js` — articles incl. Bachelor Trip
- `/app/frontend/src/pages/Journal.jsx` — pillar tabs + filters + featured card + grid
- `/app/frontend/src/pages/TripBuilder.jsx` — 4-step wizard
- `/app/frontend/src/pages/About.jsx` — founders with slider
- `/app/frontend/src/components/Nav.jsx` — global nav with dropdown
- `/app/frontend/src/components/Footer.jsx`
- `/app/frontend/src/index.css` — design tokens + section-nav

## Credentials
None — no auth implemented.
