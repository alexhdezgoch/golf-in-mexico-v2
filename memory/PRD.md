# Golf in Mexico° (GIM) — Product Requirements

## Original Problem Statement
Build a full multi-page Landing Page for "Golf in Mexico°" (GIM) — a premium editorial golf brand. The design must be award-winning level, targeting Awwwards recognition. Multi-page architecture (Home, Journal, Destinations, Destination Hubs). Typography: Libre Baskerville, Outfit, Space Mono. Color system: Off-white (#f8f5f0), Deep green (#0f2419), Gold (#c8a96e). Lenis smooth scrolling, custom cursors, editorial voice.

**Language:** Spanish (user communicates in Spanish — respond in Spanish)
**Mode:** Look & Feel only — no backend integrations yet. Forms are mocked.

## What's Implemented (as of May 26, 2026)

### Pages
- `/` Home — Editorial hero, YouTube embed placeholder, founders bio
- `/journal` — 4 editorial pillars (Golf, Beyond the Course, Travel Concierge, The Collective) with filters, "Coming Soon" empty state
- `/destinations` — 6 stacked editorial destination cards (all live)
- `/destinations/los-cabos` — **MASTER HUB** with full 13-section AdMirror spec
- `/destinations/{other}` — `DestinationPlaceholder.jsx` for Punta Mita, Mexico City, Cancún, Puerto Vallarta, Unique

### Los Cabos Hub (matches sage-fairways reference design)
1. Hero — CSS gradient (160deg #0f2419→#0a1510) + diagonal texture, H1 "Golf in *Cabo San Lucas.*", byline with founder field-research credit, 2×2 stat block
2. At a Glance — Quick facts table + Access legend (Public/Resort/Private)
3. Overview — 3 paragraphs + 4-stat strip + **inline dark Playbook CTA box** (gold-bordered, with email form)
4. Photo strip — 3 styled placeholders with "°" mark + "Photography from GIM field research" caption
5. Course Roster — 8 course cards (UPPERCASE names, photo placeholder, access pill, fee, specs, note, standout, "Field notes coming — subscribe")
6. Comparison Table — 6 cols incl. **Difficulty (1-5/5)** + legend
7. The Math — Cost table + 2 callout boxes (💡 Luxury Variable / 🌅 Twilight Advantage)
8. Pull Quote — Field Notes attribution
9. Access Rules — 4 sub-sections (🔓🔑🛡🚶) + Atmospheric photo + Concierge box CTA
10. Logistics — 2×2 cards (✈🚗🗺💵)
11. Season Guide — Peak / Shoulder / Off-Season blocks
12. Field Notes — Credential pills (PGA TOUR · LIV GOLF · MEXICO OPEN · WWT CABO 2024) + founder photo placeholder + 4 numbered notes
13. **S11 All Articles & Guides** — 6 cards with Live/Coming Soon badges
14. **S12 Newsletter (Field Notes)** — centered narrow dark, gold button
15. FAQ — 9 questions accordion
16. End Playbook CTA — Short surface variant
17. Keep Exploring — 4 destination cards

### Reusable Components
- `/components/hub/PhotoSlot.jsx` — Styled placeholder system (dark green + "°" gold mark + bottom-left mono label). Auto-swaps to real image when `src` provided.

### Design tokens (`index.css`)
- `.photo-slot` + variants (`--hero`, `--16x9`, `--4x3`, `--3x4`, `--atmo`)
- `.credential-pill` (light + dark variants, mobile-scroll)
- `.hub-page` typography (font-light h1/h2)
- `.article-count`, `.live-link`, `.coming-soon-link`

### Intro skip
- `?skipIntro=1` URL param bypasses the 4.4s intro animation (useful for screenshots/QA)

## Active Issues / Pending
- `/trip-builder` route still returns 404 — Concierge CTA links to it (UI only, no page yet)
- Punta Mita / Mexico City / Cancún / Puerto Vallarta hubs are still using `DestinationPlaceholder.jsx`
- The Hub layout has not yet been componentized into `/components/hub/Hub*.jsx` for reuse across regions

## Roadmap

### P0 (immediate)
- [ ] User visual verification of Los Cabos hub (sage-fairways visual parity)

### P1 (next)
- [ ] Create `/trip-builder` placeholder page OR inquiry modal
- [ ] Componentize Hub sections (CourseCard, ComparisonTable, AccessLegend, FieldNote, etc.) into `/components/hub/`
- [ ] Build Punta Mita hub (need intake doc from user)
- [ ] Build Mexico City hub (need intake doc from user)

### P2 (later)
- [ ] Connect Playbook + Newsletter forms to MailerLite/Resend
- [ ] Populate Journal with real article content
- [ ] Per-region real photography upload (drop into PhotoSlot `src` prop)
- [ ] Cancún + Puerto Vallarta hubs

## Tech Stack
- React 18 + TailwindCSS + Framer Motion + Lenis (smooth scroll)
- Pure frontend — no backend wired yet
- Mocked: Playbook download forms, Newsletter forms, YouTube embed

## Files of Reference
- `/app/frontend/src/pages/LosCabos.jsx` — Master Hub (13 sections)
- `/app/frontend/src/components/hub/PhotoSlot.jsx` — Placeholder system
- `/app/frontend/src/index.css` — Hub design tokens
- `/app/frontend/src/App.js` — `?skipIntro=1` URL gate

## Credentials
None — no auth implemented.
