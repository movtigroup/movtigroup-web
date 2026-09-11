<template>
  <div class="blog-page">
    <PageHero
      :title="$t('nav.blog')"
      :subtitle="$t('blog.subtitle')"
      :badge="`${totalPosts} ${$t('blog.totalPosts')} · EN / FA`"
    />

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
        <div class="filters" v-reveal>
          <button
            v-for="cat in availableCategories"
            :key="cat.name"
            class="filter-btn"
            :class="{ active: activeCategory === cat.name }"
            @click="activeCategory = cat.name"
          >
            {{ cat.name === 'all' ? $t('blog.allCategories') : cat.name }}
            <span class="filter-count">{{ cat.count }}</span>
          </button>
          <button v-if="activeTag" class="filter-btn tag-filter-active" @click="activeTag = ''">
            #{{ activeTag }} ✕
          </button>
        </div>

        <!-- Posts Grid -->
        <div v-if="filteredPosts.length" class="card-grid">
          <article
            v-for="(post, index) in filteredPosts"
            :key="post.path"
            class="card post-card"
            v-reveal="{ delay: Math.min(index % 3, 2) * 100 }"
          >
            <NuxtLink :to="postLink(post)" class="post-cover" tabindex="-1" aria-hidden="true">
              <img :src="coverFor(post)" :alt="post.title" loading="lazy" width="1200" height="630" />
            </NuxtLink>
            <div class="post-card-body">
              <div class="post-card-top">
                <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
                <span v-if="post.category" class="post-chip category-chip">{{ post.category }}</span>
              </div>
              <h3><NuxtLink :to="postLink(post)">{{ post.title }}</NuxtLink></h3>
              <p class="post-card-desc">{{ post.description }}</p>
              <div v-if="post.tags?.length" class="post-tags">
                <button
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="tag-chip"
                  :class="{ active: activeTag === tag }"
                  @click.prevent="toggleTag(tag)"
                >
                  #{{ tag }}
                </button>
              </div>
              <div class="post-card-footer">
                <span class="post-date">{{ formatDate(post.date) }}</span>
                <NuxtLink :to="postLink(post)" class="btn btn-primary btn-small">{{ $t('blog.readMore') }}</NuxtLink>
              </div>
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
const { locale, t } = useI18n()
const searchQuery = ref('')
const activeCategory = ref('all')
const activeTag = ref('')

const postLink = usePostLink()

const toggleTag = (tag) => {
  activeTag.value = activeTag.value === tag ? '' : tag
}

// Get all posts for current locale
const { data: posts } = await useAsyncData(`blog-posts-${locale.value}`, () =>
  queryCollection(blogCollectionFor(locale.value))
    .order('date', 'DESC')
    .all()
)

// Get unique categories from posts (with counts for the filter chips)
const availableCategories = computed(() => {
  const counts = new Map()
  posts.value?.forEach(p => {
    if (p.category) counts.set(p.category, (counts.get(p.category) || 0) + 1)
  })
  return [
    { name: 'all', count: posts.value?.length || 0 },
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  ]
})

// Total posts count
const totalPosts = computed(() => posts.value?.length || 0)

// Filter posts by search, category and tag
const filteredPosts = computed(() => {
  let result = posts.value || []

  // Category filter
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value)
  }

  // Tag filter
  if (activeTag.value) {
    result = result.filter(p => (p.tags || []).includes(activeTag.value))
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
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

// Reset filters when locale changes
watch(locale, () => {
  activeCategory.value = 'all'
  activeTag.value = ''
  searchQuery.value = ''
})

useSeoMeta({
  title: () => `${t('nav.blog')} — MovtiGroup`,
  description: () => t('blog.subtitle'),
  ogTitle: () => t('nav.blog'),
  ogDescription: () => t('blog.subtitle')
})
</script>

<style scoped>
.blog-page {
  padding-bottom: 4rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.88rem;
  transition: var(--transition);
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--text-bright);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 4px 14px rgba(108, 92, 231, 0.35);
}

.filter-count {
  display: inline-grid;
  place-items: center;
  min-width: 1.35rem;
  height: 1.35rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.72rem;
  font-weight: 600;
}

.filter-btn.active .filter-count {
  background: rgba(255, 255, 255, 0.25);
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
