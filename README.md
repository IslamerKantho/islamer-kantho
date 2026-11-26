# Islamer Kantho (ইসলামের কন্ঠ)

**Islamer Kantho** is a modern, full-featured Bengali Islamic scholarly publication and digital archive built with **Next.js**, **Tailwind CSS v4**, and **Sanity CMS**. It delivers long-form articles on Tafsir, Hadith, Sirah, Aqidah, Fiqh, Tasawwuf, and contemporary Islamic thought with rich reading ergonomics, localized Bangla prayer times and Hijri/Gregorian calendars, a pure-vector brand identity system, and an integrated Read Out Loud (Text-to-Speech) audio reader.

---

## Core Features

- **Editorial Article Reader & Scholarly Tools**:
  - **Scroll-Based Reading Progress Bar**: Fixed top-edge emerald-and-gold progress indicator paired with a floating scroll-to-top button featuring a live circular reading percentage ring.
  - **Read Out Loud (Text-to-Speech) Player**: Browser-native Web Speech API audio narration chunked by paragraph and scriptural citation, with Play/Pause/Resume, Stop, Previous/Next paragraph skipping, playback speed control (`0.75x` – `1.5x`), and live paragraph highlighting in the article body.
  - **Auto-Generated Table of Contents & Key Verses Summary**: Automatically indexes article sections, embedded Quranic verses (`quranVerse`), and scholarly callouts (`callout`) with smooth scroll-to-section and listen-from-here links.
  - **Reading Comfort & Bookmarking**: Persistent font-size scaling (`Small`, `Normal`, `Large`, `Extra Large`), local browser bookmarking (`localStorage`) with an interactive Saved Reading List drawer, one-click scholarly citation copy, and print stylesheet formatting.
- **Pure-Vector Brand Logo System (`BrandLogo`)**:
  - Precision SVG vector geometry combining the hexagonal mosque emblem and calligraphic Bengali wordmark (`ইসলামের কণ্ঠ`).
  - Supports `full`, `wordmark`, and `emblem` variants with adaptive `dark` (cream-gold `#D1BB9E` & white `#FFFFFF` dual-tone on deep emerald `#044f4f`) and `light` themes, plus a standalone vector asset at `public/img/branding/logo.svg`.
- **Responsive Article Preview Grid**:
  - Adaptive 1-column (mobile), 2-column (tablet), and 3-column (desktop) card grid integrated across the Homepage, Archive, Category, and Search pages with interactive category filter tabs and paginated **Load More** fetching.
- **Mobile-First Navigation & Full Bangla Prayer Times Bar**:
  - Streamlined single-row top navigation bar with an integrated mobile collapse drawer covering main pages and categorized topic tabs (`প্রবন্ধ`, `মাসআলা-মাসায়েল`, `বিবিধ`).
  - Fetches daily prayer timings (`Fajr`, `Dhuhr`, `Asr`, `Maghrib`, `Isha`) and dual Hijri/Gregorian calendar dates via `/api/prayer-times` (backed by the Aladhan API with resilient Dhaka fallback) and formats city names, 12-hour prayer times, and calendar months into authentic Bangla script and numerals (`০-৯`).
- **Bespoke Illustrated Mosque & Swaying Lanterns Footer**:
  - Custom scalable SVG artwork featuring an Islamic mosque silhouette, ornamental archways, a right-side architectural support beam, and gently swaying hanging lanterns.
- **Resilient Sanity CMS Integration**:
  - Runs seamlessly against a live Sanity.io dataset or automatically falls back to built-in Bengali scholarly articles, categories, galleries, and institutional pages when Sanity environment variables are unconfigured or set to placeholders.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (Pages Router, Hybrid SSG / ISR / SSR & API Routes) |
| **UI Library** | React 18.3 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`), CSS Modules for Portable Text prose |
| **Headless CMS** | Sanity.io (`next-sanity`, `@sanity/client`, `@sanity/image-url`, `@sanity/block-content-to-react`) |
| **Data Fetching** | SWR (client-side caching), Next.js `getStaticProps` & `getServerSideProps` |
| **SEO & Metadata** | OpenGraph, Twitter Cards, Schema.org JSON-LD (`WebSite`, `Organization`, `BlogPosting`, `CollectionPage`) |
| **Code Quality** | ESLint 10 (Flat Config), Prettier |

---

## Architecture & Directory Structure

```text
.
├── docs/
│   └── ARCHITECTURE.md              # Detailed data flow, mobile responsiveness & architectural decisions
├── public/
│   ├── fonts/                       # Local Bangla web fonts (HNT / SolaimanLipi)
│   ├── img/
│   │   ├── branding/                # Vector logo.svg, raster logo.png, favicon.png, and og_image.jpeg
│   │   └── banner.jpg               # Local fallback hero and page header banner
│   └── manifest.json                # Web App Manifest for PWA installability
├── src/
│   ├── components/
│   │   ├── Article/                 # Article reader suite (ProgressBar, Toolbar/TTS, ToC, Content, Header, Cover, SocialShare)
│   │   ├── Block/                   # Page sections (ArticlePreviewGrid, BlockBanner, BlockPageHeader, BlockPostCarSlider, TrendingPosts)
│   │   ├── BrandLogo/               # Pure-vector SVG logo component (index.jsx) & shared geometry paths (logoPaths.js)
│   │   ├── card/                    # Article preview card (ArchivePostCard)
│   │   ├── DottedDivider/           # Ornamental section divider
│   │   ├── Footer/                  # Illustrated SVG mosque & swaying lanterns footer
│   │   ├── Header/                  # Sticky navigation menu & Bangla prayer-time secondary bar
│   │   ├── HeroBanner/              # Featured article hero showcase
│   │   ├── Layout/                  # Root page layout wrapper with skip-to-content accessibility
│   │   ├── Meta/                    # Global <head> link/meta tags
│   │   ├── SectionWidget/           # Titled section container
│   │   ├── SEO/                     # Dynamic OpenGraph, Canonical & Schema.org JSON-LD generator
│   │   └── FormatterDate.jsx        # Date display component
│   ├── db/
│   │   └── categories.db.js         # Structured category taxonomy (Articles, Masael, Bibidho)
│   ├── lib/
│   │   └── sanity.js                # Sanity client initialization, placeholder-safe credential guard & imageBuilder
│   ├── pages/
│   │   ├── api/                     # Serverless HTTP API endpoints
│   │   │   ├── articles.js          # Paginated article listing endpoint (GET /api/articles)
│   │   │   ├── prayer-times.js      # Daily prayer times & Hijri/Gregorian date endpoint (GET /api/prayer-times)
│   │   │   ├── revalidate.js        # On-demand ISR webhook revalidation endpoint (POST /api/revalidate)
│   │   │   └── search.js            # Full-text article search endpoint (GET /api/search)
│   │   ├── archive/                 # Full article archive page (/archive)
│   │   ├── article/[slug].jsx       # Dynamic article reading page (/article/:slug)
│   │   ├── category/[slug].jsx      # Dynamic category archive page (/category/:slug)
│   │   ├── gallery/                 # Image & video lightbox gallery (/gallery)
│   │   ├── search/                  # Debounced live search page (/search)
│   │   ├── [slug].jsx               # Dynamic institutional pages (/amader-porichithi, /sompadokiyo, etc.)
│   │   ├── _app.jsx                 # Next.js custom App wrapper & local font injection
│   │   ├── _document.jsx            # Next.js custom Document (lang="bn")
│   │   ├── _error.jsx               # Custom error boundary page
│   │   ├── 404.jsx                  # Custom 404 page
│   │   └── index.jsx                # Homepage
│   ├── services/
│   │   └── sanity.service.js        # GROQ queries, pagination logic & resilient Bengali fallback dataset
│   ├── styles/
│   │   ├── fonts.js                 # Next.js local (HNT) and Arabic (Amiri, Scheherazade New) font definitions
│   │   ├── globals.css              # Tailwind v4 imports, custom theme tokens, mobile overflow guards & lantern keyframes
│   │   └── markdownStyles.module.css# Portable Text typography & dynamic font-scale modifier classes
│   └── utils/
│       ├── articleContent.utils.js  # Portable Text parser for TTS segments, ToC anchors & Bangla numerals
│       ├── date.utils.js            # ISO date formatting helpers
│       └── string.utils.js          # Text truncation helpers
├── .github/
│   └── workflows/ci.yml             # GitHub Actions CI pipeline
├── .env.example                     # Template for environment variables
├── CONTRIBUTING.md                  # Developer onboarding & contribution guidelines
├── eslint.config.mjs                # ESLint 10 flat configuration
├── jsconfig.json                    # Path aliases (@/*, @components/*, @services/*, @lib/*, @utils/*)
├── next.config.js                   # Vercel-aware Next.js build, PWA & security headers config
├── package.json                     # Dependencies and scripts
└── vercel.json                      # Vercel framework, install, and build configuration
```

---

## Prerequisites & Local Setup

### Prerequisites
- **Bun**: `v1.1.0` or higher (or **Node.js** `v18.18.0+` / `v20+`)

### Step-by-Step Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abutahermuammad/islamer-kantho-new.git
   cd islamer-kantho-new
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   > **Note**: If you leave `NEXT_PUBLIC_SANITY_PROJECT_ID` blank or set to a placeholder (such as `your-sanity-project-id`), the application automatically runs in **Resilient Fallback Mode** with built-in Bengali scholarly articles, categories, and pages without throwing 404 errors.

4. **Start the development server**:
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Scope | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Optional* | `""` (Fallback mode) | Sanity.io project identifier (`a-z0-9-`). Placeholders automatically trigger fallback mode. |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Optional | `production` | Sanity dataset name. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Public | Optional | `2023-05-03` | Sanity Content Lake API version date. |
| `SANITY_API_TOKEN` | Server-only | Optional | `""` | Sanity read token required only for authenticated draft preview mode. |
| `SANITY_REVALIDATE_SECRET` | Server-only | Optional | `""` | Webhook secret verified by `POST /api/revalidate` for on-demand ISR cache invalidation. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | Optional | `""` | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). |

---

## Deploying to Vercel

The repository is pre-configured for zero-friction deployment on **Vercel**:

1. **Import Repository into Vercel**:
   - Push the repository to GitHub/GitLab/Bitbucket and import it in the Vercel Dashboard.
   - Vercel automatically reads `vercel.json` (`"framework": "nextjs"`, `"installCommand": "bun install"`, `"buildCommand": "bun run build"`).
2. **Build Output Optimization**:
   - `next.config.js` automatically detects `process.env.VERCEL` to use Vercel's native serverless build pipeline while retaining `output: "standalone"` for Docker or self-hosted environments.
3. **Environment Variables on Vercel**:
   - You can deploy immediately with **zero environment variables** configured to preview the full site in Resilient Fallback Mode.
   - To connect a live Sanity CMS dataset, add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optionally `SANITY_REVALIDATE_SECRET` in **Vercel Project Settings → Environment Variables**.
4. **On-Demand ISR Webhook (Optional)**:
   - Configure a Sanity GROQ-powered webhook pointing to `https://<your-vercel-domain>/api/revalidate` with header `x-sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>` to trigger instant page revalidation whenever articles or categories are published.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Starts the Next.js development server with Turbopack on port `3000` (`0.0.0.0`). |
| `bun run build` | Compiles a production Next.js build into `.next/`. |
| `bun run start` | Runs the compiled production server. |
| `bun run lint` | Validates the entire codebase using ESLint 10 flat configuration. |
| `bun run sanity:dev` | Runs the Sanity Studio development server via `bunx sanity dev`. |
| `bun run sanity:deploy` | Deploys Sanity Studio via `bunx sanity deploy`. |
| `bun run typegen` | Extracts Sanity schema and generates TypeScript/GROQ types via `bunx sanity`. |

---

## Further Documentation

- **[Architecture & Data Flow Guide](./docs/ARCHITECTURE.md)**
- **[Contribution Guidelines](./CONTRIBUTING.md)**
