# Contributing to Islamer Kantho

Thank you for contributing to **Islamer Kantho (ইসলামের কন্ঠ)**. This document outlines our architectural conventions, mobile responsiveness standards, and workflow to ensure the codebase remains scalable, accessible, and ready for Vercel deployment.

---

## 1. Repository Layer Conventions

To preserve clean separation of concerns, place new or modified files in the appropriate layer under `src/`:

- **`src/pages/api/*` (HTTP Route Handlers Only)**:
  - Only place genuine Next.js serverless HTTP request handlers (`export default async function handler(req, res)`) inside `src/pages/api/`.
  - Never place shared data-fetching helpers, CMS client configurations, or constants inside `src/pages/api/`.
- **`src/services/*` (Data & External API Services)**:
  - Place Sanity GROQ queries, data transformation logic, and resilient fallback datasets inside `src/services/sanity.service.js`.
- **`src/lib/*` (Core Infrastructure & SDK Clients)**:
  - Place SDK initializers and safe wrappers (such as the placeholder-safe Sanity client and `imageBuilder` in `src/lib/sanity.js`) in `src/lib/`.
- **`src/components/*` (Modular UI Components)**:
  - Group domain-specific components by feature folder (`Article/`, `Block/`, `BrandLogo/`, `Header/`, `Footer/`, `SEO/`, `card/`).
  - Keep the repository free of unused legacy components; remove dead modules when superseded.
- **`src/utils/*` (Pure Utility Functions)**:
  - Place pure, framework-agnostic helper functions (Bangla numeral formatting, Portable Text indexing, string truncation, date formatting) in `src/utils/` with JSDoc annotations.
- **`src/db/*` (Static Taxonomies)**:
  - Keep static category taxonomies in `src/db/categories.db.js`.

---

## 2. Import Aliases

Prefer path aliases configured in `jsconfig.json` over deeply nested relative paths (`../../../`):

- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@services/*` → `./src/services/*`
- `@lib/*` → `./src/lib/*`
- `@utils/*` → `./src/utils/*`

---

## 3. Brand Logo, Accessibility & Mobile Responsiveness Standards

- **Vector Brand Logo (`src/components/BrandLogo`)**:
  - Always use the `<BrandLogo />` component (`variant="full" | "wordmark" | "emblem"`, `theme="dark" | "light"`) for in-app brand lockups rather than raster PNG images with CSS filters.
  - Keep `public/img/branding/logo.svg` synchronized with `src/components/BrandLogo/logoPaths.js`.
- **Typography & Script Integrity**:
  - Primary interface copy, dates, numbers, and prayer times must be rendered in Bengali script using the configured Bangla font stack (`var(--font-hnt)`).
  - Multi-line Bengali headings must maintain a line-height of at least `1.35`–`1.45` so upper and lower vowel diacritics never clip or collide on mobile screens.
  - Quranic verses and Arabic citations must include `lang="ar"` and `dir="rtl"` attributes for proper right-to-left rendering.
- **Responsive Mobile-First Design (`320px`–`1440px+`)**:
  - Ensure zero horizontal page overflow across all viewports. Never use negative horizontal offsets (`-left-*` / `-right-*`) on mobile viewports without responsive breakpoint guards (`left-1.5 sm:-left-4`).
  - Interactive touch targets on mobile should maintain comfortable tap dimensions (`min-h-[2.75rem]` / `44px` for primary header controls) and keyboard focus visibility (`focus-visible:outline-*`).
  - Never rely exclusively on desktop `:hover` states for essential actions (such as gallery view/download controls or carousel navigation); always provide touch-accessible affordances on mobile screens.
- **Editorial Restraint**:
  - Use clean inline metadata kickers separated by middle dots (`·`) and crisp `1px` structural borders matching the primary emerald (`#044f4f`) and warm cream-gold (`#D1BB9E`) palette.

---

## 4. Development, Verification & Vercel Deployment Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Install dependencies and run linter/build checks before committing**:
   ```bash
   bun install
   bun run lint
   bun run build
   ```
3. **Verify zero broken routes & mobile responsiveness**:
   - Confirm that homepage (`/`), article pages (`/article/[slug]`), category archives (`/category/[slug]`), full archive (`/archive`), media gallery (`/gallery`), search (`/search`), and institutional pages (`/[slug]`) render cleanly at both `360px` mobile and `1440px` desktop widths.
4. **Submit a Pull Request**:
   - Include a clear summary of changes, screenshots for UI updates, and notes on any new environment variables added to `.env.example`.
