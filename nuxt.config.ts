// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],
  site: {
    url: 'https://movtigroup.me',
    name: 'MovtiGroup',
    description: 'MovtiGroup - Innovative Software Solutions & Open Source Tools',
    defaultLocale: 'en'
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'fa', name: 'فارسی', dir: 'rtl', file: 'fa.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  app: {
    head: {
      title: 'MovtiGroup',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MovtiGroup - Innovative Software Solutions & Open Source Tools for Developers' },
        { property: 'og:title', content: 'MovtiGroup' },
        { property: 'og:description', content: 'Innovative Software Solutions & Open Source Tools' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://movtigroup.me' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'MovtiGroup' },
        { name: 'twitter:description', content: 'Innovative Software Solutions & Open Source Tools' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://movtigroup.me' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'MovtiGroup',
            'url': 'https://movtigroup.me',
            'description': 'Innovative Software Solutions & Open Source Tools',
            'email': 'info@movtigroup.me',
            'sameAs': [
              'https://github.com/movtigroup',
              'https://twitter.com/movtigroup'
            ]
          })
        }
      ]
    }
  },
  compatibilityDate: '2024-11-01'
})
