# Contributing to MovtiGroup Web

Thanks for your interest in contributing! 🎉

## Getting Started

```bash
git clone https://github.com/movtigroup/movtigroup-web.git
cd movtigroup-web
npm install --legacy-peer-deps
npm run dev          # http://localhost:3002
```

## How to Contribute

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. **Make your changes** and test locally:
   ```bash
   npm run build
   npm run start       # verify on :3002
   ```
3. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add X` — new feature
   - `fix: correct Y` — bug fix
   - `docs: update Z` — documentation
   - `content: add new post` — blog articles
   - `chore: maintenance work`
4. **Push** and open a Pull Request targeting `main`.

CI must pass on your PR (build, SSR smoke tests for EN/FA, content validation).

## Writing Blog Posts

- English → `content/en/blog/<slug>.md`
- Persian → `content/fa/blog/<slug>.md`
- Use the **same slug** for both languages so hreflang pairs work.
- Required frontmatter: `title`, `date` (YYYY-MM-DD), `description`. Optional: `category`, `author`, `lang`, `tags`.
- Prefer `description` values under ~160 characters — they are used for meta descriptions.

## Style Guide

- Vue pages live in `pages/`, shared UI in `components/`.
- Content queries go through `@nuxt/content` v3 collections defined in `content.config.ts` — do not bypass them.
- Keep the dark theme CSS variables in `assets/css/main.css` as the single source of truth for colors.
- The app must keep working fully offline: no CDN fonts, no external trackers.
- Keep everything listening on **port 3002** by default.

## Reporting Bugs

Open an [issue](https://github.com/movtigroup/movtigroup-web/issues) with:
- What you expected vs. what happened
- Steps to reproduce
- Node version and OS
