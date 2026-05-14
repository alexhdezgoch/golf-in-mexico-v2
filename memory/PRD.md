# Golf in Mexico° — PRD

## Original Problem Statement
Build a multi-page editorial landing page for "Golf in Mexico°" — a premium editorial golf brand. Award-winning level (Awwwards target). Minimalist, editorial, cinematic. The Golfer's Journal × Kinfolk aesthetic. Cream + ink + gold + forest palette. Cormorant Garamond / Outfit / JetBrains Mono. Three pages: Home (active), About (active), Journal (locked/Coming Soon).

## User Choices (resolved)
- Hero: autoplay muted loop background video (Mixkit coastal-cinematic, with cinematic golf-course poster as fallback).
- Email capture: design-only, no backend submit logic.
- Founders: generic editorial portraits (Unsplash).
- Logos strip: removed entirely.
- Language: English only.

## Architecture
- Frontend: React 19 + react-router-dom 7 + Tailwind + framer-motion.
- Backend: untouched FastAPI starter (no endpoints used by this site).
- No third-party integrations; no DB writes.

## What's Implemented (2025-12)
- Global system: custom dot cursor (framer-motion spring) that grows + turns gold on interactive elements; minimal sub-1s loader; grain overlay; print-style hairline dividers; smooth fade/slide page transitions via AnimatePresence.
- Typography stack: Cormorant Garamond Light/Italic (display), Outfit Light (body), JetBrains Mono (labels).
- Color tokens: cream `#F5F2EB`, ink `#1A1A18`, gold `#C4A24E`, forest `#2C4A2C`, muted `#5C5C56`.
- Sticky nav: transparent on hero, condenses with backdrop-blur + cream/85 + hairline on scroll. Mobile drawer with full display-type links.
- Home: fullscreen 100svh hero with autoplay muted loop video + ink overlay, centered "Golf in Mexico°" wordmark, headline, subline, corner editorial labels, scroll cue. Email capture (visual). Editorial founders intro (photo / story alternation) with parallax.
- About: large editorial header, two long-form founder stories with drop caps, parallax full-bleed portraits, closing pull-quote.
- Journal: full article grid (4 cards, magazine offset rhythm) + fixed Coming Soon overlay (backdrop-blur, cream/72, vertical-rl side label, big Cormorant headline, return-to-cover link).
- Footer: index, correspondence, origin, issue mark, year.
- All interactive elements carry `data-testid` (kebab-case).

## Prioritized Backlog
- P1: real founder portraits + cinematic golf-relevant hero video once provided.
- P2: bilingual EN/ES toggle.
- P2: real backend on `/api/subscribers` once newsletter strategy decided (Resend / ConvertKit / Mongo).
- P2: Journal CMS — when first issue is ready, swap the overlay for live articles.
- P3: print/wallpaper download for Issue N° 001 launch teaser.

## Next Tasks
- Hook up email capture to a backend route + email provider when ready.
- Replace stock portraits with real Pablo / José photography.
- Provide a final hero video (golf-centric, slow-cinematic) — current placeholder is a Mixkit coastal aerial.
