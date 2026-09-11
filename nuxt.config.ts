// nuxt.config.ts — MovtiGroup website
// App listens on port 3002 (dev, preview and production). Override with NUXT_PORT / PORT.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://movtigroup.me').replace(/\/$/, '')

export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
    port: Number(process.env.NUXT_PORT) || 3002
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],

  runtimeConfig: {
    public: {
      siteUrl,
      siteName: 'MovtiGroup',
      siteDescription: 'MovtiGroup — Innovative Software Solutions & Open Source Tools'
    }
  },

  css: [
    // Self-hosted fonts (Fontsource) — no CDN, works fully offline
    '@fontsource/inter/400.css',
    '@fontsource/inter/500.css',
    '@fontsource/inter/600.css',
    '@fontsource/inter/700.css',
    '@fontsource/vazirmatn/400.css',
    '@fontsource/vazirmatn/500.css',
    '@fontsource/vazirmatn/700.css',
    '~/assets/css/main.css'
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', dir: 'ltr', language: 'en-US', file: 'en.json' },
      { code: 'fa', name: 'فارسی', dir: 'rtl', language: 'fa-IR', file: 'fa.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: '.',
    baseUrl: siteUrl,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  content: {
    // In-memory SQLite: the bundled SQL dump is loaded at runtime, no .data dir
    // needed (Vercel/Dokploy friendly) and no filesystem path issues.
    database: {
      type: 'sqlite',
      filename: ':memory:'
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['js', 'ts', 'vue', 'bash', 'sh', 'json', 'yaml', 'yml', 'md', 'python', 'dockerfile', 'sql', 'html', 'css', 'rust', 'go', 'c', 'cpp', 'java', 'php', 'powershell', 'toml', 'ini', 'diff']
        }
      }
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s · MovtiGroup',
      title: 'MovtiGroup — Innovative Software Solutions & Open Source Tools',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MovtiGroup — Innovative Software Solutions & Open Source Tools for Developers' },
        { name: 'theme-color', content: '#0a0a0f' },
        { property: 'og:site_name', content: 'MovtiGroup' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo.png' }
      ],
      script: [
        {
          type: 'application/ld+json',
          textContent: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'MovtiGroup',
            'url': siteUrl,
            'inLanguage': ['en', 'fa'],
            'description': 'MovtiGroup — Innovative Software Solutions & Open Source Tools',
            'publisher': {
              '@type': 'Organization',
              'name': 'MovtiGroup',
              'url': siteUrl,
              'email': 'info@movtigroup.me',
              'logo': { '@type': 'ImageObject', 'url': `${siteUrl}/images/logo.png` }
            },
            'sameAs': [
              'https://github.com/movtigroup'
            ],
            'potentialAction': {
              '@type': 'SearchAction',
              'target': { '@type': 'EntryPoint', 'urlTemplate': `${siteUrl}/search?q={search_term_string}` },
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },

  compatibilityDate: '2024-11-01'
})
