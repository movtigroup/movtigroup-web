<template>
  <div class="blog-page">
    <section class="page-header">
      <div class="container">
        <h1>{{ $t('nav.blog') }}</h1>
        <p>{{ $t('blog.subtitle') }}</p>
      </div>
    </section>

    <section class="blog-content">
      <div class="container">
        <!-- Search Bar -->
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('blog.searchPlaceholder')"
            class="search-input"
          />
          <span v-if="searchQuery" class="search-count">
            {{ filteredPosts.length }} {{ $t('blog.resultsFound') }}
          </span>
        </div>

        <!-- Categories -->
        <div class="filters">
          <button 
            v-for="cat in availableCategories" 
            :key="cat"
            class="filter-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat === 'all' ? $t('blog.allCategories') : cat }}
          </button>
        </div>

        <!-- Posts Grid -->
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

        <!-- No Results -->
        <div v-else class="no-results">
          <p>{{ $t('blog.noResults') }}</p>
        </div>

        <!-- Stats -->
        <div class="blog-stats">
          <span>{{ totalPosts }} {{ $t('blog.totalPosts') }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const searchQuery = ref('')
const activeCategory = ref('all')

// Get all posts for current locale
const { data: posts } = await useAsyncData(`blog-posts-${locale.value}`, () => 
  queryContent(locale.value, 'blog')
    .where({ _partial: false })
    .sort({ date: -1 })
    .find()
)

// Get unique categories from posts
const availableCategories = computed(() => {
  const cats = new Set(['all'])
  posts.value?.forEach(p => {
    if (p.category) cats.add(p.category)
  })
  return Array.from(cats)
})

// Total posts count
const totalPosts = computed(() => posts.value?.length || 0)

// Filter posts by search and category
const filteredPosts = computed(() => {
  let result = posts.value || []
  
  // Category filter
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value)
  }
  
  // Search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    )
  }
  
  return result
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })
}

// Reset category when locale changes
watch(locale, () => {
  activeCategory.value = 'all'
  searchQuery.value = ''
})
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

.search-bar {
  margin-bottom: 1.5rem;
  position: relative;
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
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
}

.search-count {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.85rem;
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

.no-results {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.blog-stats {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
}
</style>
