<template>
  <div class="blog-page">
    <section class="page-header">
      <div class="container">
        <h1>{{ $t('nav.blog') }}</h1>
        <p>Technical articles on AI, DevOps, Security, and Software Engineering</p>
      </div>
    </section>

    <section class="blog-content">
      <div class="container">
        <div class="filters">
          <button 
            v-for="cat in categories" 
            :key="cat.slug"
            class="filter-btn"
            :class="{ active: activeCategory === cat.slug }"
            @click="activeCategory = cat.slug"
          >
            {{ cat.name }}
          </button>
        </div>

        <div class="card-grid">
          <article v-for="post in filteredPosts" :key="post._path" class="card post-card">
            <div class="post-card-top">
              <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
              <span v-if="post.category" class="post-chip category-chip">{{ post.category }}</span>
            </div>
            <h3><NuxtLink :to="post._path">{{ post.title }}</NuxtLink></h3>
            <p class="post-card-desc">{{ post.description }}</p>
            <div class="post-card-footer">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <NuxtLink :to="post._path" class="btn btn-primary btn-small">Read More</NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const activeCategory = ref('all')

const { data: posts } = await useAsyncData('all-posts', () => 
  queryContent('/')
    .sort({ date: -1 })
    .find()
)

const categories = [
  { slug: 'all', name: 'All' },
  { slug: 'ai-agents', name: 'AI Agents' },
  { slug: 'docker', name: 'Docker & DevOps' },
  { slug: 'python', name: 'Python' },
  { slug: 'security', name: 'Security' },
  { slug: 'api', name: 'API' },
  { slug: 'linux', name: 'Linux' }
]

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return posts.value
  return posts.value?.filter(p => p.category === activeCategory.value)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.blog-page {
  padding-top: 100px;
}

.page-header {
  text-align: center;
  padding: 3rem 0;
  background: var(--bg-card);
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-muted);
}

.blog-content {
  padding: 3rem 0;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.category-chip {
  background: rgba(0, 206, 201, 0.1) !important;
  color: var(--accent) !important;
  border-color: rgba(0, 206, 201, 0.15) !important;
}
</style>
