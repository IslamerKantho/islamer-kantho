# Contributing to Islamer Kantho

Thank you for contributing to **Islamer Kantho (ইসলামের কন্ঠ)**. This document outlines our architectural conventions, coding standards, and workflow to ensure the codebase remains scalable, accessible, and easy to maintain.

---

## 1. Repository Layer Conventions

To preserve clean separation of concerns, place new or modified files in the appropriate layer under `src/`:

- **`src/pages/api/*` (HTTP Route Handlers Only)**:
  - Only place genuine Next.js serverless HTTP request handlers (`export default async function handler(req, res)`) inside `src/pages/api/`.
  - Never place shared data-fetching helpers, CMS client configurations, or constants inside `src/pages/api/`.
- **`src/services/*` (Data & External API Services)**:
  - Place Sanity GROQ queries, data transformation logic, and resilient fallback datasets inside `src/services/sanity.service.js`.
- **`src/lib/*` (Core Infrastructure & SDK Clients)**:
  - Place SDK initializers and safe wrappers (such as the Sanity client and `imageBuilder` in `src/lib/sanity.js`) in `src/lib/`.
- **`src/components/*` (Modular UI Components)**:
  - Group domain-specific components by feature folder (`Article/`, `Block/`, `Header/`, `Footer/`, `MenuDrawer/`, `SEO/`, `card/`).
- **`src/utils/*` (Pure Utility Functions)**:
  - Place pure, framework-agnostic helper functions (Bangla numeral formatting, Portable Text indexing, string truncation, date formatting) in `src/utils/` with JSDoc annotations.
- **`src/config/*` & `src/db/*` (Static Configuration & Taxonomies)**:
  - Keep static navigation taxonomies and site constants in `src/db/` and `src/config/`.

---

## 2. Import Aliases

Prefer path aliases configured in `jsconfig.json` over deeply nested relative paths (`../../../`):

- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@services/*` → `./src/services/*`
- `@lib/*` → `./src/lib/*`
- `@utils/*` → `./src/utils/*`
- `@config/*` → `./src/config/*`

---

## 3. UI, Accessibility & Localization Standards

- **Typography & Script Integrity**:
  - Primary interface copy, dates, numbers, and prayer times should be rendered in Bengali script using the configured Bangla font stack (`var(--font-hnt)`).
  - Quranic verses and Arabic citations must include `lang="ar"` and `dir="rtl"` attributes for proper right-to-left rendering.
- **Responsive Mobile-First Design**:
  - Ensure zero horizontal page overflow across all viewports (`320px` mobile through `1440px+` desktop).
  - Interactive touch targets on mobile should maintain comfortable tap dimensions and keyboard focus visibility (`focus-visible:outline-*`).
- **Editorial Restraint**:
  - Use clean inline metadata kickers separated by middle dots (`·`) and crisp `1px` structural borders matching the primary emerald (`#044f4f`) and warm sand-gold (`#D1BB9E`) palette.

---

## 4. Development & Pull Request Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Install dependencies and run linter/build checks with Bun before committing**:
   ```bash
   bun install
   bun run lint
   bun run build
   ```
3. **Verify zero broken routes**:
   - Confirm that homepage (`/`), article pages (`/article/[slug]`), category archives (`/category/[slug]`), full archive (`/archive`), search (`/search`), and institutional pages (`/[slug]`) render cleanly.
4. **Submit a Pull Request**:
   - Include a clear summary of changes, screenshots for UI updates, and notes on any new environment variables added to `.env.example`.
