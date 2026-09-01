<template>
  <div class="search-page">
    <section class="page-header">
      <div class="container">
        <h1>{{ $t('search.title') }}</h1>
        <p>{{ $t('search.subtitle') }}</p>
      </div>
    </section>

    <section class="search-content">
      <div class="container">
        <div class="search-box">
          <input
            v-model="query"
            type="text"
            :placeholder="$t('search.placeholder')"
            class="search-input"
            autofocus
          />
        </div>

        <div v-if="query" class="results-info">
          <p>{{ filteredPosts.length }} {{ $t('search.resultsFound') }} "{{ query }}"</p>
        </div>

        <div v-if="filteredPosts.length" class="card-grid">
          <article v-for="post in filteredPosts" :key="post._path" class="card post-card">
            <div class="post-card-top">
              <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
              <span v-if="post.category" class="post-chip category-chip">{{ post.category }}</span>
            </div>
            <h3><NuxtLink :to="post._path">{{ post.title }}</NuxtLink></h3>
            <p class="post-card-desc">{{ post.description }}</p>
            <div class="post-card-footer">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <NuxtLink :to="post._path" class="btn btn-primary btn-small">{{ $t('blog.readMore') }}</NuxtLink>
            </div>
          </article>
        </div>

        <div v-else-if="query" class="no-results">
          <p>{{ $t('search.noResults') }}</p>
        </div>

        <div v-else class="search-hint">
          <p>{{ $t('search.hint') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const query = ref('')

const { data: posts } = await useAsyncData(`search-posts-${locale.value}`, () =>
  queryContent(locale.value, 'blog')
    .where({ _partial: false })
    .find()
)

const filteredPosts = computed(() => {
  if (!query.value.trim() || !posts.value) return []
  const q = query.value.toLowerCase()
  return posts.value.filter(p =>
    p.title?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    p.category?.toLowerCase().includes(q)
  )
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

useHead({
  title: 'Search - MovtiGroup'
})
</script>

<style scoped>
.search-page {
  padding-top: 100px;
}

.page-header {
  text-align: center;
  padding: 3rem 0;
  background: var(--bg-card);
}

.search-content {
  padding: 3rem 0;
}

.search-box {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-bright);
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: var(--primary);
}

.results-info {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-muted);
}

.no-results, .search-hint {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
}

.post-card-top {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-chip {
  background: var(--bg-primary);
  color: var(--text-bright);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
}

.category-chip {
  background: rgba(0, 206, 201, 0.1);
  color: var(--accent);
}

.post-card h3 {
  margin-bottom: 0.75rem;
}

.post-card h3 a {
  color: var(--text-bright);
  text-decoration: none;
}

.post-card-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.post-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-date {
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
