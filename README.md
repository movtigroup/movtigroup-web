# MovtiGroup Official Website

Modern corporate website built with Nuxt 3, Vue 3, and Nuxt Content. Bilingual (English/Farsi) with full SEO optimization and Docker support.

## Tech Stack

- **Framework:** Nuxt 3 (Vue 3 + Node.js)
- **Content:** Nuxt Content (Markdown-based)
- **Internationalization:** @nuxtjs/i18n (EN/FA)
- **SEO:** @nuxtjs/seo (Open Graph, JSON-LD, Sitemap)
- **State Management:** Pinia
- **Image Optimization:** @nuxt/image
- **Deployment:** Docker

## Features

- 🌐 Bilingual (English/Farsi) with RTL support
- 📝 160+ blog posts (Markdown-based)
- 🔍 SEO optimized (JSON-LD, Open Graph, Sitemap, robots.txt)
- 🎨 Modern dark theme with animations
- 📱 Fully responsive design
- 🐳 Docker multi-stage build
- ⚡ Static site generation (SSG) support

## Quick Start

### Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Static Generation

```bash
npm run generate
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d --build

# Or build Docker image only
docker build -t movtigroup-web .

# Run container
docker run -p 3000:3000 movtigroup-web
```

## Project Structure

```
├── components/        # Vue components
├── content/           # Markdown content
│   ├── en/           # English posts
│   └── fa/           # Farsi posts
├── composables/       # Vue composables
├── i18n/             # Translation files
├── layouts/          # Page layouts
├── pages/            # Route pages
├── public/           # Static assets
├── server/           # Server API routes
├── stores/           # Pinia stores
├── assets/           # CSS and images
├── Dockerfile        # Docker build
└── nuxt.config.ts    # Nuxt configuration
```

## Content Management

All blog posts are stored as Markdown files in `content/en/` and `content/fa/`. Each post uses YAML frontmatter for metadata:

```yaml
---
title: "Post Title"
date: 2024-01-01
lang: en
category: "ai-agents"
author: "MovtiGroup"
description: "Post description"
---
```

## Domain

- **Production:** https://movtigroup.me
- **GitHub:** https://github.com/movtigroup

## License

Copyright © 2024 MovtiGroup. All rights reserved.
