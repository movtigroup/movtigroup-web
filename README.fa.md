<div dir="rtl">

# وب‌سایت رسمی موتی‌گروپ

[![CI](https://github.com/movtigroup/movtigroup-web/actions/workflows/ci.yml/badge.svg)](https://github.com/movtigroup/movtigroup-web/actions/workflows/ci.yml)
[![Release](https://img.shields.io/badge/release-v0.0.1-blue?logo=github)](https://github.com/movtigroup/movtigroup-web/releases)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00dc82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3-4fc08d?logo=vue.js)](https://vuejs.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

وب‌سایت شرکتی مدرن ساخته‌شده با **Nuxt 3**، **Nuxt Content v3** و **Vue 3**. دوزبانه (انگلیسی/فارسی) با سئوی کامل، فونت‌های کاملاً لوکال و استقرار تک‌دستوری با Docker — همه‌چیز روی پورت **3002** اجرا می‌شود.

[🇬🇧 English Version](README.md)

## 📸 اسکرین‌شات‌ها

| انگلیسی (LTR) | فارسی (RTL) |
|:---:|:---:|
| ![صفحه اصلی EN](docs/screenshots/home-en.png) | ![صفحه اصلی FA](docs/screenshots/home-fa.png) |

| بلاگ | پست بلاگ | پروژه‌ها | تیم |
|:---:|:---:|:---:|:---:|
| ![بلاگ](docs/screenshots/blog.png) | ![پست](docs/screenshots/blog-post.png) | ![پروژه‌ها](docs/screenshots/projects.png) | ![تیم](docs/screenshots/team.png) |

## ✨ ویژگی‌ها

- **Nuxt 3 + Vue 3** — رندر سمت سرور (SSR) با Nitro
- **دوزبانه (EN/FA)** — i18n نسخه ۹ با استراتژی `prefix_except_default` و پشتیبانی کامل RTL؛ تمام متن‌های رابط کاربری در هر دو زبان موجود است
- **بلاگ فارسی تخصصی** — `/fa/blog` فارسی‌محور است: برچسب‌های بومی دسته‌بندی و تگ (هوش مصنوعی، دواپس، …)، ارقام و تاریخ‌های fa-IR و کاورهای اختصاصی؛ `/blog` همین تجربه را انگلیسی ارائه می‌دهد
- **بخش‌بندی زبان در بلاگ** — سکشن‌های All / English / فارسی با شمارنده زنده روی هر دو زبان (ساختار سراسری آدرس‌ها: EN = `/blog/x`، FA = `/fa/blog/x`)
- **صفحات خطای بومی** — 404 / 500 / 502 و… به زبان بازدیدکننده با طراحی هماهنگ سایت
- **سئو حرفه‌ای** — `sitemap.xml` داینامیک (۱۶۰+ آدرس)، `robots.txt`، canonical اختصاصی هر صفحه، hreflang بین دو زبان، Open Graph/Twitter Card و داده‌های ساختاریافته JSON-LD
- **فونت کاملاً لوکال** — [وزیرمتن](https://fontsource.org/fonts/vazirmatn) (فارسی) و [Inter](https://fontsource.org/fonts/inter) (انگلیسی) از طریق Fontsource داخل خود پروژه — بدون هیچ درخواست CDN، حتی آفلاین کار می‌کند
- **موتور بلاگ** — ۹۵ مقاله انگلیسی و ۶۵ مقاله فارسی با `@nuxt/content` نسخه ۳، تاکسونومی دسته/تگ و کاور برندشده برای هر پست
- **رابط کاربری متحرک** — ریویل هنگام اسکرول، ترنزیشن بین صفحات، انیمیشن ورود hero و شمارنده‌های متحرک — همه با CSS و سازگار با `prefers-reduced-motion`
- **جست‌وجوی سمت کلاینت** با فیلتر دسته‌بندی، تگ و زبان
- **امنیت سخت‌گیرانه** — هدرهای CSP/HSTS/X-Frame-Options/Referrer-Policy/Permissions-Policy روی همه پاسخ‌ها، تحلیل CodeQL و گیت audit برای وابستگی‌های production
- **تست‌شده** — مجموعه تست Vitest (۱۹ تست: هلپرها، اعتبارسنجی لید، صحت تاکسونومی/کاور، کامپوننت‌ها) + گیت امتیاز Lighthouse CI و بودجه حجم باندل
- **آماده Docker** — بیلد چندمرحله‌ای، health check و nginx معکوس
- **GitHub Actions** — CI (تست + بیلد + تست SSR + چک سئو/هدرهای امنیتی + Lighthouse + Docker)، CodeQL و پایپ‌لاین خودکار تگ و ریلیز

## 🚀 شروع سریع

> **نیازمندی:** Node.js ≥ 22

```bash
git clone https://github.com/movtigroup/movtigroup-web.git
cd movtigroup-web

npm install --legacy-peer-deps

# سرور توسعه → http://localhost:3002
npm run dev
```

### محیط پروداکشن

```bash
npm run build
npm run start          # سرو کردن .output روی پورت 3002
```

همه ورودی‌ها به‌صورت پیش‌فرض روی **پورت 3002** هستند (dev، preview، پروداکشن و Docker). هر زمان با متغیر محیطی `PORT` قابل تغییر است.

## 🌐 استقرار

### Vercel

1. مخزن را در Vercel ایمپورت کنید — فریم‌ورک Nuxt خودکار شناسایی می‌شود.
2. متغیر محیطی `NUXT_PUBLIC_SITE_URL=https://movtigroup.me` (دامنه خودتان) را اضافه کنید.
3. دیپلوی کنید. SSR به‌صورت Serverless اجرا می‌شود و نیازی به تنظیم پورت نیست.

### Dokploy

1. یک سرویس **Docker Compose** یا **Application** جدید بسازید و به این مخزن اشاره دهید.
2. Dokploy فایل `Dockerfile` موجود را بیلد می‌کند — اپلیکیشن روی **3002** گوش می‌دهد و `EXPOSE 3002` تنظیم شده است.
3. مسیر health check: ‏`/api/health`
4. متغیر `NUXT_PUBLIC_SITE_URL` را روی آدرس عمومی بگذارید و دامنه را در Dokploy متصل کنید.

### Docker / Docker Compose

```bash
docker compose up -d --build     # اپ روی http://localhost:3002 (nginx روی :80)

# یا docker خالص
docker build -t movtigroup-web .
docker run -p 3002:3002 movtigroup-web
```

## 🔌 پورت ۳۰۰۲ در همه‌جا

| محیط | پورت | محل تنظیم |
|---|---|---|
| `npm run dev` | **3002** | `--port 3002` + `devServer` در `nuxt.config.ts` |
| `npm run preview` | **3002** | `--port 3002` |
| `npm run start` | **3002** | ‏`scripts/start.mjs` (پیش‌فرض `PORT=3002`) |
| Docker | **3002** | `ENV PORT=3002` + `EXPOSE 3002` + health check |
| nginx | **3002** | upstream در `nginx.conf` |

## 📁 ساختار پروژه

```
movtigroup-web/
├── .github/workflows/          # ci.yml و release.yml
├── assets/css/main.css         # استایل سراسری (تم تیره، سازگار RTL)
├── components/                 # Navbar.vue و Footer.vue
├── composables/useBlog.ts      # کوئری‌های Content v3 + لینک محلی‌سازی‌شده
├── content/en/blog/            # مقالات انگلیسی (۹۵)
├── content/fa/blog/            # مقالات فارسی (۶۵)
├── content.config.ts           # کالکشن‌های Content v3 (blog_en / blog_fa)
├── i18n/                       # ترجمه‌ها (en.json / fa.json)
├── pages/                      # index، blog، projects، teams، about، contact، collaborations، search
├── public/                     # favicon.svg، robots.txt، og-image.png
├── scripts/start.mjs           # نقطه ورود پروداکشن (پورت 3002)
├── server/
│   ├── api/health.ts           # اندپوینت سلامت
│   └── routes/sitemap.xml.ts   # سایت‌مپ داینامیک از کالکشن‌ها
├── Dockerfile / docker-compose.yml / nginx.conf
└── nuxt.config.ts
```

## 📝 نوشتن مقاله جدید

یک فایل Markdown در `content/en/blog/` یا `content/fa/blog/` بسازید:

```markdown
---
title: "عنوان مقاله"
date: 2026-01-15
lang: fa
category: "هوش مصنوعی"
author: "MovtiGroup"
description: "توضیح کوتاه مقاله"
---

متن مقاله...
```

- نام فایل می‌شود آدرس مقاله: `content/fa/blog/my-post.md` → ‏`/fa/blog/my-post`
- نام فایل نسخه EN و FA را یکسان نگه دارید تا hreflang در سایت‌مپ جفت شود.
- هر مقاله به‌طور خودکار JSON-LD، تگ‌های OG و ورودی سایت‌مپ می‌گیرد.

## 🔧 متغیرهای محیطی

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `PORT` | `3002` | پورت پروداکشن |
| `HOST` | `0.0.0.0` | آدرس bind |
| `NUXT_PUBLIC_SITE_URL` | `https://movtigroup.me` | آدرس پایه برای canonical/OG/سایت‌مپ |

## 🏗️ معماری

معماری کامل، قراردادها و حافظه پروژه را در [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) ببینید.

## 🙏 قدردانی

- آیکون‌های برند: [icons.lobehub.com](https://icons.lobehub.com) (`@lobehub/icons-static-svg`) + [simple-icons](https://simpleicons.org)
- زبان طراحی الهام‌گرفته از [ui.lobehub.com](https://ui.lobehub.com)
- انیمیشن: [three.js](https://threejs.org)، [anime.js](https://animejs.com)، فونت‌های [Fontsource](https://fontsource.org) (وزیرمتن، Inter)

## 🏷️ ریلیز

ورک‌فلو **Release** را اجرا کنید (Actions → Release → Run workflow). بدون ورودی از **v0.0.1** شروع می‌کند و هر بار یک patch جلو می‌رود؛ می‌توانید نسخه صریح هم بنویسید (مثل `0.1.0`).

## 📄 مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

## 🤝 مشارکت

مشارکت‌ها خوش‌آمدند — راهنما را در [CONTRIBUTING.md](CONTRIBUTING.md) ببینید.

<div align="center">

ساخته‌شده با ❤️ توسط **موتی‌گروپ**

</div>

</div>
