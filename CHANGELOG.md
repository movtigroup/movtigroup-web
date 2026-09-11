# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/). Tags and GitHub Releases are created automatically by the **Release** workflow, starting at `v0.0.1`.

## [Unreleased]

### Changed

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
