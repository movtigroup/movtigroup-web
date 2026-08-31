# app.vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: locale,
    dir: locale === 'fa' ? 'rtl' : 'ltr'
  }
})
</script>
