<div dir="rtl">

# وبسایت رسمی موتی‌گروپ

[![CI/CD](https://github.com/tahatehran/movtigroup-web/actions/workflows/ci.yml/badge.svg)](https://github.com/tahatehran/movtigroup-web/actions/workflows/ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://docker.com)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00dc82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3-4fc08d?logo=vue.js)](https://vuejs.org)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)](https://nodejs.org)

وبسایت شرکتی مدرن ساخته شده با Nuxt 3، Vue 3 و Nuxt Content. دوزبانه (انگلیسی/فارسی) با بهینه‌سازی کامل SEO و پشتیبانی از Docker.

[🇬🇧 English Version](README.md)

---

## ✨ ویژگی‌ها

| ویژگی | وضعیت |
|-------|-------|
| **Nuxt 3 + Vue 3** | ✅ |
| **دوزبانه (EN/FA)** | ✅ |
| **پشتیبانی RTL** | ✅ |
| **بهینه‌سازی SEO** | ✅ |
| **سیستم وبلاگ** | ✅ |
| **جستجو** | ✅ |
| **Docker** | ✅ |
| **ریسپانسیو** | ✅ |
| **تم تاریک** | ✅ |
| **CI/CD گیت‌هاب** | ✅ |

---

## 🚀 شروع سریع

### توسعه محلی

```bash
# کلون کردن ریپو
git clone https://github.com/tahatehran/movtigroup-web.git
cd movtigroup-web

# نصب وابستگی‌ها
npm install --legacy-peer-deps

# شروع سرور توسعه
npm run dev
```

به `http://localhost:3000` بروید

### Docker

```bash
# بیلد و اجرا با Docker Compose
docker-compose up -d --build
```

به `http://localhost:3003` بروید

---

## 📁 ساختار پروژه

```
movtigroup-web/
├── .github/workflows/ci.yml    # GitHub Actions CI/CD
├── assets/css/                 # استایل‌های سراسری
├── components/                 # کامپوننت‌های Vue
│   ├── Navbar.vue
│   └── Footer.vue
├── composables/                # کومپوزبل‌های Vue
│   └── useBlog.ts
├── content/                    # پست‌های بلاگ (Markdown)
│   ├── en/blog/               # پست‌های انگلیسی (۹۵)
│   └── fa/blog/               # پست‌های فارسی (۶۵)
├── i18n/                      # ترجمه‌ها
│   ├── en.json
│   └── fa.json
├── layouts/                   # لایوت‌های صفحات
│   └── default.vue
├── pages/                     # صفحات مسیرها
│   ├── index.vue
│   ├── blog/
│   │   ├── index.vue          # لیست بلاگ
│   │   └── [...slug].vue      # پست تکی
│   ├── search.vue             # صفحه جستجو
│   ├── projects/
│   ├── about/
│   ├── contact/
│   └── collaborations/
├── public/                    # فایل‌های استاتیک
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── server/                    | API سرور
│   └── api/health.ts
├── Dockerfile                 | بیلد Docker چندمرحله‌ای
├── docker-compose.yml
├── nuxt.config.ts
└── package.json
```

---

## 📝 سیستم بلاگ

این بلاگ از **Nuxt Content** برای مدیریت محتوای داینامیک استفاده می‌کند.

### ساخت پست جدید

یک فایل Markdown در `content/en/blog/` یا `content/fa/blog/` بسازید:

```markdown
---
title: "عنوان پست شما"
date: 2024-01-15
lang: fa
category: "هوش مصنوعی"
author: "موتی‌گروپ"
description: "توضیح کوتاهی درباره پست"
---

محتوای شما اینجا...
```

### دسته‌بندی‌ها

پست‌ها به صورت خودکار دسته‌بندی می‌شوند. برای سازماندهی پست‌ها فیلد `category` را در frontmatter قرار دهید.

### جستجو

عملکرد جستجو در موارد زیر جستجو می‌کند:
- عناوین پست‌ها
- توضیحات
- دسته‌بندی‌ها

---

## 🐳 تنظیمات Docker

**پورت:** `3003` (قابل تنظیم در `docker-compose.yml`)

```yaml
ports:
  - "3003:3000"
```

### بیلد Image

```bash
docker build -t movtigroup-web .
docker run -p 3003:3000 movtigroup-web
```

---

## 🔧 متغیرهای محیطی

| متغیر | پیش‌فرض | توضیح |
|-------|---------|-------|
| `NODE_ENV` | `production` | حالت محیط |
| `PORT` | `3003` | پورت خارجی |
| `NUXT_PORT` | `3000` | پورت داخلی |
| `NUXT_HOST` | `0.0.0.0` | آدرس هاست |
| `SITE_URL` | `https://movtigroup.me` | آدرس سایت |
| `DEFAULT_LOCALE` | `fa` | زبان پیش‌فرض |
| `SUPPORTED_LOCALES` | `en,fa` | زبان‌های موجود |

---

## 🧪 تست

```bash
# اجرای lint
npm run lint

# بیلد برای پروداکشن
npm run build

# سایت استاتیک
npm run generate
```

---

## 📊 آمار

- **کل پست‌ها:** ۱۶۰+
- **پست‌های انگلیسی:** ۹۵
- **پست‌های فارسی:** ۶۵
- **زبان‌ها:** انگلیسی، فارسی (RTL)
- **CI/CD:** GitHub Actions

---

## 📄 لایسنس

لایسنس MIT

---

## 🤝 همکاری

همکاری‌ها خوش‌آمد است! لطفاً در ارسال درخواست (Pull Request) دریغ نکنید.

---

<div align="center">

ساخته شده با ❤️ توسط **موتی‌گروپ**

</div>

</div>
