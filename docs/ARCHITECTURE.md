# Architecture & Data Flow Guide

This document details the technical architecture, data flow, mobile responsiveness engineering, and key design decisions behind **Islamer Kantho (ইসলামের কন্ঠ)**.

---

## 1. High-Level System Architecture

Islamer Kantho uses a layered **Next.js Pages Router** architecture that separates modular presentation components, page routing, serverless HTTP endpoints, and Sanity CMS data services:

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                         Client Browser (React 18)                         │
│  • Pure-Vector BrandLogo System (Full, Wordmark, Emblem · Dark / Light)   │
│  • Responsive NavigationMenu (Desktop Bar + Mobile Category Collapse)     │
│  • Interactive Article Reader (Web Speech API TTS, Font Scale, Bookmarks) │
│  • SWR Live Queries (/api/prayer-times, /api/search, /api/articles)       │
└───────────────────┬───────────────────────────────────┬───────────────────┘
                    │                                   │
       Page Request │ (SSG / ISR / SSR)       AJAX Fetch│ (JSON)
                    ▼                                   ▼
┌───────────────────────────────────┐ ┌─────────────────────────────────────┐
│      Next.js Pages (`src/pages`)  │ │   Next.js API Routes (`pages/api`)  │
│  • index.jsx (SSG + ISR)          │ │  • GET  /api/articles               │
│  • article/[slug].jsx (SSG + ISR) │ │  • GET  /api/search                 │
│  • category/[slug].jsx (SSR)      │ │  • GET  /api/prayer-times           │
│  • archive/index.jsx (SSR)        │ │  • POST /api/revalidate             │
│  • gallery/index.jsx (SSG + ISR)  │ └─────────────────┬───────────────────┘
│  • [slug].jsx (SSG + ISR)         │                   │
└───────────────────┬───────────────┘                   │
                    │                                   │
                    └─────────────────┬─────────────────┘
                                      ▼
                    ┌───────────────────────────────────┐
                    │       CMS Data Service Layer      │
                    │  (`src/services/sanity.service`)  │
                    │  • Lean Card vs Detail GROQ       │
                    │  • Deduplication & Pagination     │
                    │  • Resilient Bengali Fallback DB  │
                    └─────────────────┬─────────────────┘
                                      ▼
                    ┌───────────────────────────────────┐
                    │       Sanity Client Library       │
                    │       (`src/lib/sanity.js`)       │
                    │  • Placeholder-Safe Config Guard  │
                    │  • Safe Image URL Builder         │
                    └───────────────────────────────────┘
```

---

## 2. Hybrid Rendering Strategy (SSG, ISR & SSR)

The application combines Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Server-Side Rendering (SSR) based on each route's access pattern:

1. **Homepage (`src/pages/index.jsx`) — SSG with ISR**:
   - Pre-renders featured, recommended, and initial recent articles at build time and revalidates in the background (`revalidate: 43200`).
   - Subsequent pagination ("আরও প্রবন্ধ দেখুন") fetches incremental batches client-side via `GET /api/articles?offset=N&limit=9`.
2. **Article Reading Pages (`src/pages/article/[slug].jsx`) — SSG with `fallback: true`**:
   - Pre-renders known article slugs from `getAllPostsWithSlug()` and supports on-demand generation for newly published Sanity articles.
3. **Archive & Category Pages (`src/pages/archive/index.jsx`, `src/pages/category/[slug].jsx`) — SSR with Edge Caching**:
   - Uses `getServerSideProps` with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` so category listings remain fresh while benefiting from Vercel CDN edge caching.
4. **On-Demand Webhook Revalidation (`src/pages/api/revalidate.js`)**:
   - Verifies `SANITY_REVALIDATE_SECRET` and triggers `res.revalidate()` across affected routes (`/`, `/archive`, `/gallery`, `/article/[slug]`, `/category/[slug]`) when Sanity content is updated.

---

## 3. Pure-Vector Brand Identity System (`src/components/BrandLogo`)

To eliminate raster blur on high-DPI mobile screens and avoid font-loading shifts, the brand mark is engineered as a resolution-independent SVG system:

- **Shared Path Geometry (`src/components/BrandLogo/logoPaths.js`)**:
  - Stores pure SVG `<path>` outlines for the hexagonal mosque crest (outer shield, minaret with lantern windows, Mughal dome, 7-arch Mihrab arcade, crescent finial, celestial star constellation, and lower chevron filigree) and the calligraphic Bengali wordmark (`ইসলামের কণ্ঠ`) with its dimensional offset rim.
- **Theme-Aware React Component (`src/components/BrandLogo/index.jsx`)**:
  - Supports `variant="full" | "wordmark" | "emblem"` and `theme="dark" | "light"`.
  - On dark emerald surfaces (`#044f4f` in Header and Footer), renders crisp white letterforms and mosque silhouette paired with warm cream-gold (`#D1BB9E`) offset depth rim, shield frame, stars, and crescent.
  - On light surfaces (and in the standalone `public/img/branding/logo.svg` asset), renders deep emerald (`#044f4f`) letterforms with a soft slate-teal dimensional rim.

---

## 4. Resilient Sanity CMS Integration & Zero-Crash Fallback

A core architectural requirement is that the application must build and run without runtime 404 errors even when `NEXT_PUBLIC_SANITY_PROJECT_ID` is blank, unconfigured, or set to a placeholder:

- **Placeholder-Safe Credential Validation (`src/lib/sanity.js`)**:
  - Exports `hasSanityConfig`, verifying that `NEXT_PUBLIC_SANITY_PROJECT_ID` is a genuine project ID (`^[a-z0-9-]+$`) and explicitly rejecting placeholders such as `"your-sanity-project-id"`, `"placeholder"`, `"unconfigured"`, `"example"`, `"undefined"`, or `"null"`.
  - Wraps the Sanity client in `createSafeClient()` and provides a chainable fallback `imageBuilder()` that resolves local asset paths (`/img/banner.jpg`) when Sanity image references are absent.
- **Automatic Fallback Dataset (`src/services/sanity.service.js`)**:
  - Every service function (`getAllPosts`, `getFeaturedPost`, `getRecommendedPost`, `getPostAndMorePosts`, `searchPosts`, `getPageBySlug`, `getAllGalleries`) checks `hasSanityConfig` and wraps remote fetches in `try/catch`, seamlessly serving rich Bengali scholarly content when offline or unconfigured.

---

## 5. Mobile Responsiveness & Viewport Architecture

The UI is engineered for zero horizontal overflow and comfortable Bengali reading ergonomics from `320px` smartphones up to `1440px+` desktop displays:

- **Global Overflow & Scrollbar Discipline (`src/styles/globals.css`)**:
  - Enforces `max-width: 100vw; overflow-x: hidden;` on `html, body` and defines a cross-browser `.no-scrollbar` utility for horizontal pill/prayer strips.
- **Single-Row Sticky Header & Responsive Prayer Bar (`src/components/Header`)**:
  - `NavigationMenu.jsx` keeps the mobile sticky top bar compact (BrandLogo, Search button, and 44x44px Hamburger toggle) and provides an expandable mobile navigation panel with categorized topic tabs.
  - `SecondaryNavbar.jsx` displays the visitor's city and 5 daily prayer times on the primary row and stacks the Bangla Gregorian/Hijri date cleanly on mobile (`flex-col md:flex-row`) so dates are never pushed off-screen.
- **Bengali Script Line-Height & Touch Affordances**:
  - Multi-line Bengali headlines (`HeroBanner`, `BlockPageHeader`, `ArticleHeader`) use generous line-height (`1.35`–`1.45`) and `text-wrap: balance` to prevent upper and lower vowel diacritics from colliding on narrow viewports.
  - Swiper carousels (`BlockPostCarSlider`) keep navigation buttons within container bounds on mobile (`left-1.5` / `right-1.5`), and `GalleryPage` provides an always-accessible mobile touch action bar alongside desktop hover states.

---

## 6. Article Reading Suite & Portable Text Pipeline

The article reading experience (`src/pages/article/[slug].jsx`) coordinates three specialized modules:

1. **Portable Text Content Indexer (`src/utils/articleContent.utils.js`)**:
   - `buildArticleReadingData(post)` traverses the Sanity Portable Text `body` array once to assign deterministic block keys (`block-${idx}`) and DOM anchor IDs (`#article-block-${blockKey}`).
   - Produces `ttsSegments`, `tocItems`, and `verseItems`.
2. **Read Out Loud Audio Engine (`src/components/Article/ArticleReadingToolbar.jsx`)**:
   - Uses the browser's native `window.speechSynthesis` API with automatic Bengali voice detection (`bn-BD` / `bn-IN`), paragraph-by-paragraph narration, live speed adjustment (`0.75x`–`1.5x`), font-size scaling (`অ- / অ+`), and local bookmark persistence.
3. **Article-Scoped Scroll Progress (`src/components/Article/ReadingProgressBar.jsx`)**:
   - Measures scroll progression specifically against `#article-reading-container` inside a `requestAnimationFrame`-throttled passive listener.
