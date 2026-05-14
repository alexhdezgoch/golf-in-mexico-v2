# Golf in Mexico° — PRD

## Original Problem Statement
Build a multi-page editorial landing page for "Golf in Mexico°" — premium editorial brand at golf-in-mexico.com. Reinforce with the GIM Digital Strategy v2: premium agency selling $10K curated trips, NOT a tee-time marketplace; "discipline of the no"; English-first; US 45-65 ICP; primary regions Los Cabos, Riviera Maya, Punta Mita, Puerto Vallarta, CDMX.

## User Choices
- Hero: autoplay muted loop background video (Mixkit coastal placeholder).
- Email capture: design-only.
- Founders: generic editorial portraits.
- Logos strip: removed.
- Language: English only.
- Logo: official wordmark `GOLF° IN MEXICO°` provided as PNG, stored at `/app/frontend/public/logo-wordmark.png`. Used in nav, footer (giant editorial mark), favicon, OG image.
- Domain: golf-in-mexico.com — referenced in footer, OG meta, support email `hello@golf-in-mexico.com`.

## Architecture
- Frontend: React 19 + react-router-dom 7 + Tailwind + framer-motion.
- Backend: untouched FastAPI starter.

## What's Implemented
### 2025-12 — Initial build
- 3-page editorial site (Home / About / Journal) on exact cream/ink/gold/forest palette.
- Cormorant Garamond + Outfit + JetBrains Mono typography stack.
- Sticky condensing nav, custom dot cursor, sub-1s loader, smooth fade page transitions, parallax full-bleed imagery.
- Home: hero video + wordmark + headline + email capture + parallax founders.
- About: long-form editorial founder stories.
- Journal: article grid + Coming Soon overlay.
- All interactive elements carry kebab-case data-testid.

### 2025-12 — Strategy reinforcement + brand mark
- Real wordmark PNG installed (nav, footer giant mark, favicon, OG).
- Nav logo & links auto-invert: light over dark hero, dark over cream (scrolled or non-home routes).
- Hero subline refined to "Issued from Los Cabos to the Riviera Maya — by invitation only" (premium-agency positioning).
- New Home section: **N° 03 — Where we play** — five regions (Los Cabos, Riviera Maya, Punta Mita, Puerto Vallarta, Ciudad de México) as editorial typographic cards.
- Closing pull-quote on Destinations: "We do not sell tee times. We arrange the four mornings that will decide what you think of México for the rest of your life."
- New Home section: **N° 04 — Manifesto / The discipline of the no** — dark ink background, two-column "This is / This is not" reinforcing premium-editorial-not-marketplace positioning.
- Domain rolled out: `hello@golf-in-mexico.com`, footer attribution, OG URL `https://golf-in-mexico.com`.
- SEO: og:title, og:description, og:image, twitter card meta added.

## Prioritized Backlog
- P1: Real cinematic golf hero video URL.
- P1: Real founder portraits.
- P2: Plan-your-trip / inquiry form (the $10K-trip QL capture — clarify destination + dates + invitation source) when ready to wire backend.
- P2: Editorial SEO articles (long-form hubs per region) → Journal CMS.
- P2: EN/ES toggle when CDMX content is ready.
- P3: Press / "as seen in" strip when applicable.

## Next Tasks
- Replace Mixkit coastal placeholder with golf-relevant cinematic video.
- Wire inquiry form to backend + email provider (Resend recommended).
- Build first 3 SEO long-form articles to swap in once Journal launches.
