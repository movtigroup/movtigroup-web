<template>
  <div class="post-page">
    <div class="container">
      <nav class="breadcrumb">
        <NuxtLink to="/blog">{{ $t('nav.blog') }}</NuxtLink>
        <span class="separator">/</span>
        <span>{{ post?.title }}</span>
      </nav>

      <article v-if="post" class="post-article">
        <div class="post-header">
          <div class="post-meta-top">
            <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
            <span v-if="post.category" class="post-chip category-chip">{{ post.category }}</span>
          </div>
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span v-if="post.author" class="post-author">{{ post.author }}</span>
          </div>
          <p v-if="post.description" class="post-description">{{ post.description }}</p>
        </div>
        
        <ContentRenderer :value="post" />
      </article>

      <div v-else class="not-found">
        <h2>{{ $t('blog.postNotFound') }}</h2>
        <NuxtLink to="/blog" class="btn btn-primary">{{ $t('blog.backToBlog') }}</NuxtLink>
      </div>

      <!-- Back to blog -->
      <div class="back-link">
        <NuxtLink to="/blog" class="btn btn-secondary">← {{ $t('blog.backToBlog') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { locale } = useI18n()

const { data: post } = await useAsyncData(`post-${route.path}`, () => 
  queryContent(route.path).findOne()
)

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
}

// SEO
useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description }
  ]
})
</script>

<style scoped>
.post-page {
  padding-top: 120px;
  padding-bottom: 4rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--accent);
  text-decoration: none;
}

.breadcrumb .separator {
  opacity: 0.5;
}

.post-article {
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.post-meta-top {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-header h1 {
  font-size: 2.5rem;
  color: var(--text-bright);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.post-description {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.category-chip {
  background: rgba(0, 206, 201, 0.1) !important;
  color: var(--accent) !important;
  border-color: rgba(0, 206, 201, 0.15) !important;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  color: var(--text-bright);
  margin-bottom: 1.5rem;
}

.back-link {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

/* Content styles */
:deep(h2) {
  color: var(--text-bright);
  margin: 2rem 0 1rem;
}

:deep(h3) {
  color: var(--text-bright);
  margin: 1.5rem 0 0.75rem;
}

:deep(p) {
  margin-bottom: 1rem;
  line-height: 1.8;
}

:deep(ul), :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
}

:deep(code) {
  background: var(--bg-card);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

:deep(pre) {
  background: var(--bg-card);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

:deep(blockquote) {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--text-muted);
}

:deep(a) {
  color: var(--accent);
}

:deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
</style>
