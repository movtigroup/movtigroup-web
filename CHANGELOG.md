# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/). Tags and GitHub Releases are created automatically by the **Release** workflow, starting at `v0.0.1`.

## [Unreleased]

### Added

- **`docs/ARCHITECTURE.md`** — full architecture + project memory (stack decisions, data flow, conventions, credits) mentioning **icons.lobehub.com**, **ui.lobehub.com** and **charts.lobehub.com**; README (EN/FA) gained an Architecture section and a Credits block
- **`PageHero` component** — animated gradient page header with badge, grid pattern and entrance effects; applied to Blog, Projects, Contact, Team and Collaborations pages
- **Blog page polish** — category filter chips now show live post counts, rounded pill filters with hover lift, cover cards refined
- **Contact page redesigned** — info cards with gradient icon tiles (Email, GitHub, LinkedIn, Hamgit, X), card-style form with focus states, responsive two-column grid
- **Cover image for every blog post** — `scripts/generate-covers.mjs` generates a branded 1200×630 SVG cover (deterministic gradient, M logo mark, wrapped localized title) for all 160 posts into `public/covers/`; covers shown on blog/search/home cards and at the top of each post (`npm run generate:covers` to regenerate)
- **Company logo** (`public/images/logo.png`, from the GitHub avatar) now used in the navbar, footer, favicon and JSON-LD publisher logo
- **Team page** (`/teams`, `/fa/teams`) migrated from the legacy `tahatehran.github.io` site — 5 members with photos, role badges and social links; added to the navbar and sitemap
- **Projects page rebuilt** around 9 flagship MovtiGroup repos (Web, Liara Chat Completion Proxy, Iran System Encoding, Docker Installer, Mirror, Mirror Developer, Ubuntu/Debian Mirror, Docker Mirror Proxy, Core Rust VPN) with GitHub/Website links per project
- **Cherry Studio** added to Collaborations (desktop + mobile collaboration); collaboration cards now cover Dirac.run, Kilo Code, Hermes Agent and Cherry Studio
- **Social links**: LinkedIn company page and Hamgit added to the footer and contact page
- **Blog taxonomy** — every post now carries a `category` (AI / DevOps / Programming / Networking / Security / Tools) and 2–4 `tags`, assigned by `scripts/assign-taxonomy.mjs` with English + Persian keyword rules; blog page gets working category counts, clickable tag chips on cards, tag filtering (combined with search), and posts show tags + `article:tag` meta
- **Homepage animation engines**: `three.js` particle sphere in the hero (lazy-loaded, paused off-screen, reduced-motion safe) and `anime.js` for orchestrated hero entrances and the stat counters
- **CRM-style lead capture**: `POST /api/leads` validates and stores contact submissions (`.data/leads.json`; swap for a DB/CRM webhook on serverless), and the contact form now submits with sending/success/error states plus all contact channels

### Fixed

- **Card footer overlap**: post date and Read More button no longer collide (gap + wrap + equal-height cards)
- **Persian navigation bug**: navbar/footer/breadcrumb links were hardcoded (`/blog`, `/about`, …), so clicking them from a `/fa/...` page jumped back to English — all internal links now go through `useLocalePath()`
- **Animated UI**: scroll-reveal via a new `v-reveal` directive (`plugins/reveal.ts`, IntersectionObserver + scroll sweep, jump-safe), page transitions, staggered hero entrance, floating gradient orbs, count-up stat counters with correct values (160/95/65/5/6), hover lift on all cards — all disabled under `prefers-reduced-motion`
- **Proper icon system** — new `UiIcon` (lucide-style inline SVGs) and `BrandIcon` (recolorable brand glyphs via CSS mask) components; replaced every UI emoji across navbar, hero, features, brands, projects, collaborations, team and footer
- **Vendored brand SVGs** (`public/images/brands/`) from `@lobehub/icons-static-svg` (GitHub, NousResearch, Midjourney, OpenAI, Claude, Gemini, DeepSeek, Hugging Face) and simple-icons (Telegram, LinkedIn, X) — self-hosted, no CDN
- New gradient SVG favicon (no more 404ing `favicon.ico`)

### Changed

- **Responsive hardening** for phones/tablets/desktop: hamburger menu with animated icon, auto-close on navigation, 44px tap targets, tighter ≤400px navbar, card grids collapse to one column, code blocks/tables scroll horizontally on mobile, global `img { max-width: 100% }`, RTL-aware blockquotes
- About page "team" teaser now links to the full `/teams` page
- Require **Node.js ≥ 22** everywhere (`engines`, Docker base image `node:22-alpine`, CI matrix 22/24) — `better-sqlite3` v13, used by `@nuxt/content`, dropped Node 20 support which broke the Node 20 CI job

## [0.0.1] — 2026-09-11

### Changed

- Upgraded `@nuxt/content` v2 → v3 (collections in `content.config.ts`, secure markdown rendering, in-memory SQLite database — no `.data` directory needed at runtime)
- Upgraded `@nuxtjs/i18n` v8 → v9 (unhead v2 compatible, per-locale `language` tags)
- Default application port is now **3002** everywhere: `dev`, `preview`, production (`scripts/start.mjs`), Docker (`ENV PORT=3002`, `EXPOSE 3002`), nginx upstream, and CI smoke tests
- Fonts are now fully self-hosted: **Vazirmatn** (Persian) and **Inter** (English) bundled via Fontsource — no Google Fonts CDN, works offline
- Persian blog slugs cleaned: `content/fa/blog/*.fa.md` → `*.md` (URLs no longer contain a `.fa` suffix)
- Replaced the stale static `sitemap.xml` with a dynamic `server/routes/sitemap.xml.ts` generated from content collections (160+ URLs, hreflang alternates)
- Rewrote `README.md` and `README.fa.md`; added `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (MIT), and this changelog
- Removed `convert_posts.py` — a one-off Jekyll migration utility whose job was already done (posts are converted and committed); it also failed modern security review for path handling

### Fixed

- **Persian navigation bug**: navbar/footer/breadcrumb links were hardcoded (`/blog`, `/about`, …), so clicking them from a `/fa/...` page jumped back to English — all internal links now go through `useLocalePath()`
- English blog post pages returned "not found" because app routes (`/blog/x`) did not match content paths (`/en/blog/x`)
- Blog list/search/home cards linked to `/en/...` routes that 404ed; links are now locale-aware via `useLocalePath`
- Language switcher crashed SSR after the i18n v9 upgrade (`$i18n.locales` no longer unwraps in templates)
- `Navbar` scroll listener and homepage slider interval were never cleaned up (memory leaks)
- Site crashed at runtime on machines whose absolute path contains spaces (URL-encoded `%20` leaked into the SQLite database path) — fixed by the in-memory database
- Removed vulnerable `@nuxt/devtools` top-level dependency; `npm audit` reports **0 vulnerabilities**

### Added

- SEO: per-page `useSeoMeta` (title/description/OG/Twitter), canonical + hreflang for both locales, `BlogPosting` + `BreadcrumbList` JSON-LD on posts, `WebSite` + `SearchAction` JSON-LD, `og-image.png` (1200×630)
- GitHub Actions: rewritten CI (Node 20/22 matrix, SSR smoke tests on :3002, SEO endpoint assertions, content/frontmatter validation, Docker container test) and a Release workflow that tags and publishes GitHub Releases starting from `v0.0.1`
- Screenshots of the site (EN + FA) embedded in the READMEs
- `postinstall: nuxt prepare`, `engines` field, and health-check friendly Docker setup

[Unreleased]: https://github.com/movtigroup/movtigroup-web/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/movtigroup/movtigroup-web/releases/tag/v0.0.1
