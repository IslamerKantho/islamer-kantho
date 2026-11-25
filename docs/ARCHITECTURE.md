# Architecture & Data Flow Guide

This document details the technical architecture, data flow, and key engineering decisions behind **Islamer Kantho (ইসলামের কন্ঠ)**.

---

## 1. High-Level System Architecture

Islamer Kantho uses a layered **Next.js Pages Router** architecture that separates presentation components, page routing, serverless HTTP endpoints, and Sanity CMS data services:

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                         Client Browser (React 18)                         │
│  • Interactive Article Reader (Web Speech API TTS, Font Scale, Bookmarks) │
│  • SWR Live Queries (/api/prayer-times, /api/search, /api/articles)       │
└───────────────────┬───────────────────────────────────┬───────────────────┘
                    │                                   │
       Page Request │ (SSG / SSR)             AJAX Fetch│ (JSON)
                    ▼                                   ▼
┌───────────────────────────────────┐ ┌─────────────────────────────────────┐
│      Next.js Pages (`src/pages`)  │ │   Next.js API Routes (`pages/api`)  │
│  • index.jsx (SSG + ISR)          │ │  • GET /api/articles                │
│  • article/[slug].jsx (SSG + ISR) │ │  • GET /api/search                  │
│  • category/[slug].jsx (SSR)      │ │  • GET /api/prayer-times            │
│  • archive/index.jsx (SSR)        │ └─────────────────┬───────────────────┘
│  • [slug].jsx (SSG + ISR)         │                   │
└───────────────────┬───────────────┘                   │
                    │                                   │
                    └─────────────────┬─────────────────┘
                                      ▼
                    ┌───────────────────────────────────┐
                    │       CMS Data Service Layer      │
                    │  (`src/services/sanity.service`)  │
                    │  • GROQ Queries & Pagination      │
                    │  • Deduplication & Normalization  │
                    │  • Resilient Bengali Fallback DB  │
                    └─────────────────┬─────────────────┘
                                      ▼
                    ┌───────────────────────────────────┐
                    │       Sanity Client Library       │
                    │       (`src/lib/sanity.js`)       │
                    │  • Credential Validation Guard    │
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
   - Uses `getServerSideProps` with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` so category listings remain fresh while benefiting from CDN edge caching.

---

## 3. Resilient Sanity CMS Integration & Zero-Crash Fallback

A core architectural requirement is that the application must build and run without runtime 404 crashes even when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unconfigured or unreachable:

- **Credential Validation (`src/lib/sanity.js`)**:
  - Exports `hasSanityConfig`, verifying that `NEXT_PUBLIC_SANITY_PROJECT_ID` is a non-empty, valid Sanity project slug (`^[a-z0-9-]+$`) rather than `"undefined"`.
  - Wraps the Sanity client in `createSafeClient()` and provides a chainable fallback `imageBuilder()` that resolves local asset paths (`/img/banner.jpg`) when Sanity image references are absent.
- **Automatic Fallback Dataset (`src/services/sanity.service.js`)**:
  - Every service function (`getAllPosts`, `getFeaturedPost`, `getRecommendedPost`, `getPostAndMorePosts`, `searchPosts`, `getPageBySlug`, `getAllGalleries`) checks `hasSanityConfig` and wraps remote fetches in `try/catch`, seamlessly serving rich Bengali scholarly content when offline or unconfigured.

---

## 4. Article Reading Suite & Portable Text Pipeline

The article reading experience (`src/pages/article/[slug].jsx`) coordinates four specialized modules:

1. **Portable Text Content Indexer (`src/utils/articleContent.utils.js`)**:
   - `buildArticleReadingData(post)` traverses the Sanity Portable Text `body` array once to assign deterministic block keys (`block-${idx}`) and DOM anchor IDs (`#article-block-${blockKey}`).
   - Produces:
     - `ttsSegments`: An ordered queue of plain-text speech segments covering the article title/excerpt, prose paragraphs, section headings, Quranic/Hadith translations (`quranVerse`), and scholarly notes (`callout`).
     - `tocItems` & `verseItems`: Structured navigation entries for the Table of Contents and Key Verses summary panel.
2. **Read Out Loud Audio Engine (`src/components/Article/ArticleReadingToolbar.jsx`)**:
   - Uses the browser's native `window.speechSynthesis` API.
   - Automatically detects available Bengali voices (`bn-BD` / `bn-IN`) and falls back gracefully with `utterance.lang = 'bn-BD'`.
   - Speaks paragraph-by-paragraph rather than passing the entire article as a single string, preventing browser utterance cutoff bugs, enabling real-time speed changes (`0.75x`, `1x`, `1.25x`, `1.5x`), updating paragraph progress counters, and highlighting the active block in `SingleArticleContent.jsx`.
3. **Article-Scoped Scroll Progress (`src/components/Article/ReadingProgressBar.jsx`)**:
   - Measures scroll progression specifically against `#article-reading-container` inside a `requestAnimationFrame`-throttled passive listener so the top progress bar and floating circular Scroll-to-Top ring reach `100%` right at the end of the article text rather than the bottom of the site footer.

---

## 5. Bangla Localization Engine (Prayer Times & Dual Calendar)

- **Endpoint (`src/pages/api/prayer-times.js`)**:
  - Resolves the visitor's city (defaulting to `Dhaka, Bangladesh`) and queries the Aladhan Timings API (`https://api.aladhan.com/v1/timingsByCity`), returning 5 daily prayer times alongside structured Gregorian and Hijri date objects (with an automatic server-side fallback if the external API is unreachable).
- **Presentation (`src/components/Header/SecondaryNavbar.jsx`)**:
  - Maps English city names, all 12 Gregorian months, and all 12 Islamic Hijri months (by month number and normalized transliteration) into Bengali script and converts all timestamps and calendar numbers into Bengali digits (`০-৯`).
