<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { locale } = useI18n()

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || 'https://movtigroup.me').replace(/\/$/, '')
const ogImage = `${siteUrl}/og-image.png`

// i18n SEO: lang/dir attributes, canonical, hreflang alternates, og:locale
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true
})

useHead(() => ({
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang || locale.value,
    dir: head.value.htmlAttrs?.dir || 'ltr'
  },
  link: [
    ...(head.value.link || []),
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ],
  meta: [
    ...(head.value.meta || []),
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: ogImage }
  ]
}))
</script>
