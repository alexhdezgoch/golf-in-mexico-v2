# Golf in Mexico° — Product Requirements Document

## Original Problem Statement
Premium editorial golf brand for México. Awwwards-level minimalist, editorial, cinematic. 3 pages (Home, Journal, Destination Guide).

**Audience:** Single-handicaps planning rounds, families weighing weeks, agents moving clients, plus broad Meta-traffic and SEO-driven golfers (~545k/yr).

**Voice:** Editorial, declarative, "from inside the ropes". Assertive but elegant — never salesy.

**Design System:**
- Colors: Cream `#F5F2EB`, Ink `#1A1A18`, Gold `#C4A24E`, Forest `#2C4A2C`
- Typography: Cormorant Garamond (display), Outfit (body), JetBrains Mono (mono labels)

**Founders (also editors):**
- Pablo De La Mora — PGA Tour · LPGA Tour · WTA Sports Agent (CDMX)
- José Islas — Professional Golfer (inside the ropes)

---

## Sitemap (Active)
- `/` — Home (Hero · The Premise N°01 · Editorial tabs N°01-03)
- `/journal` — Journal Hub (Overview · Regions · Must Reads · Pillars)
- `/journal/los-cabos` — Destination Guide (Overview · Courses · Costs · Access · Logistics · Season · Book · FAQ)

---

## Implemented (May 2026)
- **Cinematic Intro** (skippable, plays once per session)
- **Sticky Nav** with logo, Home/Journal links, FB/IG/LinkedIn social icons
- **Reading Progress bar** (gold, top, fade-in after 80px scroll)
- **Custom cursor** (gold dot + ring on hover, visible on both dark + cream)
- **Home N°01 Premise** — Headline "México is not just a golf destination" + horizontal video box 16:9 + CTA "Meet the Founders ↓" (scrolls to manifestos)
- **Home Manifestos tabs (N°01-03):**
  - N°01 Pablo — The Agent — "Mexico Golf competes worldwide" + LinkedIn/Instagram
  - N°02 José — The Player — "Every course tells you what round it wants you to play"
  - N°03 GIM° — The Media — Three values `/ // ///` (Attention to Detail · Destination Intelligence · Long-Term Relationships)
- **Journal — Overview** (4-paragraph editorial — Pacific cliffs to limestone fairways, history, luxury, guide)
- **Journal — 5 Region cards** (Los Cabos · Punta Mita · CDMX · Puerto Vallarta · Cancún/Mayan Riviera)
- **Journal — Must Reads** with 12 articles + 2 dropdown filters (Pillar · Author) + Load More pagination
- **Journal — 3 Pillar cards** (Golf & Nature · Mexican Uniqueness · People behind the game)
- **Los Cabos Destination Guide** — Sticky sub-nav, breadcrumb, 6-cell stats row, 4-paragraph overview, 6-course roster grid, costs table with totals, 5 access steps, 6 logistics tiles, 3 season cards, dark CTA section, 6-FAQ accordion
- **Footer** — "Stay in the know" newsletter + brand block + nav + contact + coordinates
- **InquiryModal** — Curated trip form (visual only, MOCKED submit)

---

## P1 — Pending
- **Backend integration** for newsletter (footer) and inquiry form (modal + Los Cabos book CTA) — currently MOCKED with visual success states
- **Database schema** for leads (email + name + email + preferences + region)
- **Email notification** to editors (Resend integration recommended)

## P2 — Backlog
- Additional region guides (Punta Mita, CDMX, Puerto Vallarta, Riviera Maya) — same template as `/journal/los-cabos`
- Real article pages (Must Reads currently link only Los Cabos; rest are placeholders)
- SSR / pre-rendering for SEO `<title>` and `<meta>` tags
- Real video assets (currently using Mixkit placeholders for hero + region images via Unsplash)
- Reading time calculation (currently hardcoded in data)

---

## Files of Reference
- `/app/frontend/src/App.js` — Routes + ReadingProgress + InquiryContext
- `/app/frontend/src/components/Nav.jsx` — Logo + nav links + socials
- `/app/frontend/src/components/Intro.jsx` — Cinematic intro animation
- `/app/frontend/src/components/Cursor.jsx` — Custom gold cursor (fixed for dark bgs)
- `/app/frontend/src/components/ReadingProgress.jsx` — Top scroll progress bar
- `/app/frontend/src/components/TeamEditorial.jsx` — Manifestos tabs Pablo/José/GIM°
- `/app/frontend/src/components/Footer.jsx` — Newsletter + brand
- `/app/frontend/src/components/InquiryModal.jsx` — Trip request form (MOCKED)
- `/app/frontend/src/pages/Home.jsx` — Hero + Premise (N°01) + Manifestos
- `/app/frontend/src/pages/Journal.jsx` — Overview + Regions + MustReads + Pillars
- `/app/frontend/src/pages/LosCabos.jsx` — Full destination guide

## Tech
- React + React Router + TailwindCSS + Framer Motion + Lucide icons
- Backend: FastAPI (not yet used)
- Database: MongoDB (not yet used)
