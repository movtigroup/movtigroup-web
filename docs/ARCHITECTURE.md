# MovtiGroup Web — Architecture & Project Memory

> این فایل هم مستند معماری است و هم «حافظه پروژه»: تصمیم‌ها، قراردادها و منابعی که نباید فراموش شوند.
> This file is both the architecture doc and the project memory: decisions, conventions and credits that must not be forgotten.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Nuxt 3** (Node ≥ 22) | SSR with Nitro `node-server` preset |
| Content | **@nuxt/content v3** | Collections `blog_en` / `blog_fa` in `content.config.ts`; in-memory SQLite (`filename: ':memory:'`) — no `.data` needed, dump loaded from bundled assets |
| i18n | **@nuxtjs/i18n v9** | `prefix_except_default` (EN no prefix, FA `/fa`); `baseUrl` powers canonical + hreflang |
| Fonts | **Fontsource** (`@fontsource/vazirmatn`, `@fontsource/inter`) | fully self-hosted, zero CDN |
| Icons | **@lobehub/icons-static-svg** + simple-icons | vendored into `public/images/brands/`, rendered via `components/BrandIcon.vue` (CSS-mask → currentColor) |
| Animation | **three.js** (hero particles, `components/HeroThree.vue`) + **anime.js v3** (hero entrances, stat counters) + CSS `v-reveal` directive (`plugins/reveal.ts`) | all disabled under `prefers-reduced-motion` |
| Charts | not used yet — LobeHub charts are React-only; for Vue use ECharts/ApexCharts if ever needed |

> **Credit — do not remove:** brand icons come from **https://icons.lobehub.com** (package `@lobehub/icons-static-svg`).
> Design language (gradient icon tiles, glassy cards) is inspired by **https://ui.lobehub.com**.
> https://charts.lobehub.com was evaluated but is React-only.

---

## Hard conventions (memory notes)

1. **Port = 3002 everywhere** — dev, preview, `npm run start` (`scripts/start.mjs`), Docker (`ENV PORT=3002`, `EXPOSE 3002`), nginx upstream, CI smoke tests. Override only via `PORT`/`NUXT_PORT`.
2. **No CDN requests** — fonts, icons, images are all local. Anything new must be vendored.
3. **All internal links go through `useLocalePath()`** — hardcoding `/blog` breaks the Persian locale (this bug happened once; do not reintroduce).
4. **Content paths carry the locale prefix** (`/en/blog/x`, `/fa/blog/x`) while EN app routes do not (`/blog/x`). Use `usePostLink()` / `blogCollectionFor()` from `composables/useBlog.ts`.
5. **Cover images**: `scripts/generate-covers.mjs` → `public/covers/<lang>/blog/<slug>.svg` (1200×630, deterministic gradient, M mark, RTL-aware title). Run `npm run generate:covers` after adding posts.
6. **Taxonomy**: `scripts/assign-taxonomy.mjs` assigns `category` (AI / DevOps / Programming / Networking / Security / Tools) + 2–4 `tags` per post (EN + FA keyword rules). Blog filters combine category + tag + search.
7. **Content DB is in-memory** — never switch back to a file-based sqlite without handling URL-encoded paths (the `%20` Windows-space bug).
8. **Company logo** = `public/images/logo.png` (vendored GitHub avatar, the "M"). Used in navbar, footer, favicon, JSON-LD.
9. **Social links to keep**: GitHub org, LinkedIn company page (`linkedin.com/company/movtigroup`), Hamgit (`hamgit.ir/tahavey18/MovtiGroup`), X (`x.com/movtigroup`), info@movtigroup.me.
10. **Leads (CRM-lite)**: `POST /api/leads` validates + appends to `.data/leads.json`. On serverless the FS is ephemeral — swap `appendLead` for a DB/CRM webhook in production.
11. **Releases**: `.github/workflows/release.yml` (manual dispatch) tags `vX.Y.Z` starting at `v0.0.1`, syncs `package.json`, attaches build zip.
12. `@lobehub/ui` and `@lobehub/charts` are **React-only** — do not try to install them in this Vue project; replicate their design language in CSS instead.

---

## Directory map

```
├── content.config.ts        # blog_en / blog_fa collections (schema: title, date, category, tags, …)
├── content/{en,fa}/blog/    # 95 EN + 65 FA markdown posts (category + tags in frontmatter)
├── plugins/reveal.ts        # v-reveal scroll-reveal directive (IntersectionObserver + jump-safe sweep)
├── components/
│   ├── UiIcon.vue           # lucide-style inline stroke icons
│   ├── BrandIcon.vue        # mask-based recolorable brand glyphs
│   ├── HeroThree.vue        # three.js particle sphere (lazy, pausable)
│   └── Navbar / Footer
├── composables/useBlog.ts   # blogCollectionFor / usePostLink / coverFor
├── pages/                   # index, blog(+[...slug]), projects, teams, about, contact, collaborations, search
├── server/
│   ├── api/health.ts
│   ├── api/leads.post.ts    # CRM-lite lead capture
│   └── routes/sitemap.xml.ts# dynamic sitemap (content-driven, hreflang pairs)
├── scripts/
│   ├── start.mjs            # production entry (port 3002)
│   ├── generate-covers.mjs
│   └── assign-taxonomy.mjs
└── docs/ARCHITECTURE.md     # this file
```

## Data flow (blog)

```
content/{en,fa}/blog/*.md
  └─► @nuxt/content v3 build (sqlite dump bundled into .output)
        └─► queryCollection('blog_en' | 'blog_fa') in pages/composables
              ├─► /blog (list + language sections All/EN/FA + category/tag/search filters)
              ├─► /fa/blog (same UI, Persian-first: fa labels, fa-IR digits/dates)
              ├─► /blog/[slug] (SSR + BlogPosting JSON-LD + cover)
              └─► /sitemap.xml (server route, hreflang pairs)
public/covers/<lang>/blog/<slug>.svg  ◄── scripts/generate-covers.mjs (per post)
```

### Blog URL structure (global convention)

- English article: **`/blog/<slug>`** — always points to the EN content (`/en/blog/<slug>`)
- Persian article: **`/fa/blog/<slug>`** — always points to the FA content (`/fa/blog/<slug>`)
- Links between posts are **language-pure** (`usePostLink`): an EN article never
  resolves through the FA route and vice versa, regardless of the page locale.
- The blog page on both locales offers **language sections** (All / English / فارسی)
  with live counts, so EN and FA content are separate, switchable sections.
- Taxonomy keys stored in frontmatter are language-neutral (e.g. `AI`, `docker`);
  display labels are localized via `utils/labels.ts` (fa: «هوش مصنوعی», «داکر», …).

## Deployment

- **Vercel**: auto-detected Nuxt; set `NUXT_PUBLIC_SITE_URL`. Port managed by platform.
- **Dokploy/Docker**: `Dockerfile` (multi-stage, `node:22-alpine`, port 3002, healthcheck `/api/health`), optional nginx proxy (`nginx.conf`).
