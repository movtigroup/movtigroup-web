<template>
  <div class="post-page">
    <div class="container">
      <nav class="breadcrumb">
        <NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink>
        <span class="separator">/</span>
        <span>{{ post?.title }}</span>
      </nav>

      <article v-if="post" class="post-article">
        <img
          :src="`/covers${contentPath}.svg`"
          :alt="post.title"
          class="post-hero-cover"
          width="1200"
          height="630"
        />
        <div class="post-header">
          <div class="post-meta-top">
            <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
            <span v-if="post.category" class="post-chip category-chip">{{ post.category }}</span>
          </div>
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span v-if="post.author" class="post-author">{{ post.author }}</span>
            <span v-if="post.category" class="post-chip category-chip">
              {{ categoryLabel(post.category, locale) }}
            </span>
          </div>
          <div v-if="post.tags?.length" class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag-chip static">
              #{{ tagLabel(tag, locale) }}
            </span>
          </div>
          <p v-if="post.description" class="post-description">{{ post.description }}</p>
        </div>
        
        <ContentRenderer :value="post" />
      </article>

      <div v-else class="not-found">
        <h2>{{ $t('blog.postNotFound') }}</h2>
        <NuxtLink :to="localePath('/blog')" class="btn btn-primary">{{ $t('blog.backToBlog') }}</NuxtLink>
      </div>

      <!-- Back to blog -->
      <div class="back-link">
        <NuxtLink :to="localePath('/blog')" class="btn btn-secondary">← {{ $t('blog.backToBlog') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { locale, t } = useI18n()

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || 'https://movtigroup.me').replace(/\/$/, '')
const localePath = useLocalePath()

// EN app routes carry no locale prefix; content paths always do (/en|fa/blog/slug)
const contentPath = route.path.startsWith('/fa/')
  ? route.path
  : `/en${route.path}`

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryCollection(blogCollectionFor(locale.value)).path(contentPath).first()
)

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

// SEO
useSeoMeta({
  title: () => post.value?.title || t('blog.postNotFound'),
  description: () => post.value?.description || '',
  ogTitle: () => post.value?.title || '',
  ogDescription: () => post.value?.description || '',
  ogType: 'article',
  ogImage: `${siteUrl}/og-image.png`,
  articlePublishedTime: () => post.value?.date ? new Date(post.value.date).toISOString() : undefined,
  articleAuthor: [post.value?.author].filter(Boolean),
  articleTag: () => post.value?.tags || undefined,
  articleSection: () => post.value?.category || undefined,
  robots: post.value ? undefined : 'noindex'
})

// BlogPosting + Breadcrumb structured data
useHead(() => ({
  script: post.value
    ? [
        {
          type: 'application/ld+json',
          textContent: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              'headline': post.value.title,
              'description': post.value.description,
              'datePublished': post.value.date ? new Date(post.value.date).toISOString() : undefined,
              'author': { '@type': 'Organization', 'name': post.value.author || 'MovtiGroup' },
              'publisher': { '@type': 'Organization', 'name': 'MovtiGroup' },
              'mainEntityOfPage': `${siteUrl}${route.path}`,
              'inLanguage': locale.value
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'MovtiGroup', 'item': siteUrl },
                { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${siteUrl}${locale.value === 'fa' ? '/fa' : ''}/blog` },
                { '@type': 'ListItem', 'position': 3, 'name': post.value.title, 'item': `${siteUrl}${route.path}` }
              ]
            }
          ])
        }
      ]
    : []
}))
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

.post-hero-cover {
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid var(--border);
  margin-bottom: 2rem;
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
  height: auto;
  border-radius: 8px;
}

:deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-collapse: collapse;
  margin: 1rem 0;
}

:deep(th),
:deep(td) {
  border: 1px solid var(--border);
  padding: 0.5rem 0.8rem;
  text-align: start;
}

:deep(p), :deep(li) {
  overflow-wrap: break-word;
}

[dir='rtl'] :deep(blockquote) {
  border-left: 0;
  border-right: 4px solid var(--primary);
  padding-left: 0;
  padding-right: 1rem;
}

@media (max-width: 768px) {
  .post-page {
    padding-top: 100px;
  }

  .post-header h1 {
    font-size: 1.75rem;
  }

  .post-meta {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
