# MovtiGroup Official Website

[![CI/CD](https://github.com/tahatehran/movtigroup-web/actions/workflows/ci.yml/badge.svg)](https://github.com/tahatehran/movtigroup-web/actions/workflows/ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://docker.com)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00dc82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3-4fc08d?logo=vue.js)](https://vuejs.org)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)](https://nodejs.org)

Modern corporate website built with Nuxt 3, Vue 3, and Nuxt Content. Bilingual (English/Farsi) with full SEO optimization and Docker support.

[🇮🇷 نسخه فارسی](README.fa.md)

---

## ✨ Features

| Feature | Status |
|---------|--------|
| **Nuxt 3 + Vue 3** | ✅ |
| **Bilingual (EN/FA)** | ✅ |
| **RTL Support** | ✅ |
| **SEO Optimized** | ✅ |
| **Blog System** | ✅ |
| **Search** | ✅ |
| **Docker** | ✅ |
| **Responsive** | ✅ |
| **Dark Theme** | ✅ |
| **GitHub Actions CI/CD** | ✅ |

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/tahatehran/movtigroup-web.git
cd movtigroup-web

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d --build
```

Visit `http://localhost:3003`

---

## 📁 Project Structure

```
movtigroup-web/
├── .github/workflows/ci.yml    # GitHub Actions CI/CD
├── assets/css/                 # Global styles
├── components/                 # Vue components
│   ├── Navbar.vue
│   └── Footer.vue
├── composables/                # Vue composables
│   └── useBlog.ts
├── content/                    # Blog posts (Markdown)
│   ├── en/blog/               # English posts (95)
│   └── fa/blog/               # Farsi posts (65)
├── i18n/                      # Translations
│   ├── en.json
│   └── fa.json
├── layouts/                   # Page layouts
│   └── default.vue
├── pages/                     # Route pages
│   ├── index.vue
│   ├── blog/
│   │   ├── index.vue          # Blog listing
│   │   └── [...slug].vue      # Single post
│   ├── search.vue             # Search page
│   ├── projects/
│   ├── about/
│   ├── contact/
│   └── collaborations/
├── public/                    # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── server/                    # Server API
│   └── api/health.ts
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml
├── nuxt.config.ts
└── package.json
```

---

## 📝 Blog System

The blog uses **Nuxt Content** for dynamic content management.

### Create a New Post

Create a Markdown file in `content/en/blog/` or `content/fa/blog/`:

```markdown
---
title: "Your Post Title"
date: 2024-01-15
lang: en
category: "AI"
author: "MovtiGroup"
description: "A brief description of your post"
---

Your content here...
```

### Categories

Posts are automatically categorized. Add `category` in frontmatter to organize posts.

### Search

The search functionality searches across:
- Post titles
- Descriptions
- Categories

---

## 🐳 Docker Configuration

**Port:** `3003` (configurable in `docker-compose.yml`)

```yaml
ports:
  - "3003:3000"
```

### Build Image

```bash
docker build -t movtigroup-web .
docker run -p 3003:3000 movtigroup-web
```

---

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `3003` | External port |
| `NUXT_PORT` | `3000` | Internal port |
| `NUXT_HOST` | `0.0.0.0` | Host address |
| `SITE_URL` | `https://movtigroup.me` | Site URL |
| `DEFAULT_LOCALE` | `en` | Default language |
| `SUPPORTED_LOCALES` | `en,fa` | Available languages |

---

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Generate static site
npm run generate
```

---

## 📊 Stats

- **Total Posts:** 160+
- **English Posts:** 95
- **Farsi Posts:** 65
- **Languages:** English, Farsi (RTL)
- **CI/CD:** GitHub Actions

---

## 📄 License

MIT License

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">

Made with ❤️ by **MovtiGroup**

</div>
