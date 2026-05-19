# Golf in Mexico° — Product Requirements Document

## Original Problem Statement
Premium editorial golf brand for México. Awwwards-level minimalist, editorial, cinematic. Multi-page (Home, Journal, Destinations + per-destination Hubs, Article template).

**Audience:** Single-handicaps planning rounds, families weighing weeks, agents moving clients, plus broad Meta-traffic and SEO-driven golfers (~545k/yr).

**Voice:** Editorial, declarative, "from inside the ropes". Assertive but elegant — never salesy.

**Design System:**
- Colors: Cream `#F5F2EB`, Ink `#1A1A18`, Gold `#C4A24E`, Forest `#2C4A2C`
- Typography: Cormorant Garamond (display), Outfit (body), JetBrains Mono (mono labels)

**Founders / editors:**
- Pablo De La Mora — PGA Tour · LPGA Tour · WTA Sports Agent (CDMX)
- José Islas — Professional Golfer

---

## Sitemap (Active)
- `/` — Home (Hero · Premise N°01 · Manifestos N°01–03)
- `/journal` — Journal Hub (TGJ-style overview · Regions · Must Reads · Pillars)
- `/journal/:slug` — Article editorial template
- `/destinations` — Immersive destinations index (KRO-Travel style scroll)
- `/destinations/:slug` — **Destination Hub (13 sections)** — `los-cabos`, `punta-mita`, `mexico-city`
- `/journal/los-cabos` → 301 redirect to `/destinations/los-cabos`

---

## Implemented

### Global
- Cinematic intro (skippable, once per session)
- Lenis momentum smooth scroll
- AnimatePresence page transitions (blur + y)
- Sticky Nav (logo, Home, Journal, About, Destinations dropdown, Inquire CTA, FB/IG/LI)
- Reading Progress bar (gold)
- Custom cursor
- Footer (3-column · newsletter · brand · coords · MOCKED submit)
- InquiryModal (curated trip form, MOCKED)

### Home `/`
- Premise N°01 (16:9 video box · CTA)
- Manifestos N°01–03 (Pablo · José · GIM°)

### Journal `/journal` + `/journal/:slug`
- TGJ-style overview, sticky filter bars, horizontal sliders
- Article template w/ breadcrumb, inline CTAs, scroll-triggered email capture (UI only)

### Destinations `/destinations`
- Immersive hero, parallax photo dividers, regions slider (6 cards: 3 live · 3 "Soon")

### Destination Hubs `/destinations/:slug` (Feb 2026) — Los Cabos · Punta Mita · Mexico City
13 sections per hub:
1. Cinematic Hero (parallax + breadcrumb)
2. Hero Answer (editorial blockquote)
3. Quick Facts (11-row table)
4. Overview (4 sub-blocks: Geography · Climate · Distinct · Landscape)
5. PhotoDivider (parallax)
6. Course Roster (cards, GIM-property gold border)
7. Course Comparison (table w/ difficulty rating)
8. True Cost (table w/ totals)
9. Access (Public · Resort · Cross · Private + email-Pablo CTA)
10. Logistics (4 tiles)
11. Season Guide (12-month table + note, on dark)
12. Field Notes placeholder (Phase 2)
13. All Articles grid + Newsletter CTA + FAQ accordion + Coming Soon strip

---

## P1 — Pending
- **Backend integrations** (paused per user instruction): Resend (newsletter + inquiry), HubSpot, Beehiiv
- Real video assets for Home Hero (need public CDN URLs — Drive permissions blocked previous attempts)
- GA4 events + JSON-LD schema across all templates

## P2 — Backlog
- Additional Destination Hubs (Puerto Vallarta, Riviera Maya, Unique) using same template
- Phase 2 Field Notes content (Pablo's firsthand course write-ups)
- Migrate hardcoded `/data/*.js` to MongoDB + FastAPI admin route
- SSR / pre-rendering for SEO meta tags

---

## Files of Reference
- `/app/frontend/src/App.js` — Routes (Destinations + DestinationHub + Article + legacy redirect)
- `/app/frontend/src/components/Nav.jsx` — Destinations dropdown (live: los-cabos · punta-mita · mexico-city)
- `/app/frontend/src/components/Footer.jsx`, `Cursor.jsx`, `Intro.jsx`, `ReadingProgress.jsx`, `InquiryModal.jsx`
- `/app/frontend/src/pages/Home.jsx`
- `/app/frontend/src/pages/Journal.jsx` + `Article.jsx`
- `/app/frontend/src/pages/Destinations.jsx` (index)
- `/app/frontend/src/pages/DestinationHub.jsx` (13-section template)
- `/app/frontend/src/pages/LosCabos.jsx` — **legacy MVP, kept but unreachable; safe to delete**
- `/app/frontend/src/data/destinations.js` — Los Cabos · Punta Mita · Mexico City (full editorial data)
- `/app/frontend/src/data/articles.js`

## Tech
- React + React Router + TailwindCSS + Framer Motion + Lenis + Lucide
- Backend: FastAPI (not yet wired)
- DB: MongoDB (not yet wired)

---

## Changelog
- **Feb 2026 · v2 redesign** — Applied full editorial-luxury redesign system across the app: fonts (Libre Baskerville + Outfit + Space Mono replacing Cormorant + Outfit + JetBrains Mono), colour palette (deep-green `#0f2419` + warmer gold `#c8a96e` + warm off-white `#f8f6f1`), new spacing/motion tokens. Added `StatsBar` component on Home (4-stat editorial credibility row). All existing components inherit the new tokens via CSS variables + Tailwind aliases — no breakage.
- **Feb 2026** — Wired `/destinations/:slug` with the 13-section `DestinationHub.jsx` template for Los Cabos, Punta Mita, Mexico City. Nav dropdown + Destinations region cards updated. `/journal/los-cabos` 301 → `/destinations/los-cabos`. `LosCabos.jsx` deprecated (still in repo).
- **Earlier Feb 2026** — Built `/data/destinations.js` (3 destinations × 13 sections).
- **Earlier** — Journal redesign (TGJ aesthetic), Destinations immersive scroll, Article editorial template, Footer 3-col overhaul, Lenis global, AnimatePresence transitions.
