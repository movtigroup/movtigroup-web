<template>
  <div class="post-page">
    <div class="container">
      <article v-if="post" class="post-article">
        <div class="post-header">
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span v-if="post.category" class="post-chip">{{ post.category }}</span>
          </div>
        </div>
        <ContentRenderer :value="post" />
      </article>
      <div v-else class="not-found">
        <h2>Post not found</h2>
        <NuxtLink to="/blog" class="btn btn-primary">Back to Blog</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () => 
  queryContent(route.path).findOne()
)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.post-page {
  padding-top: 120px;
  padding-bottom: 4rem;
}

.post-article {
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 2rem;
}

.post-header h1 {
  font-size: 2.5rem;
  color: var(--text-bright);
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--text-muted);
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  color: var(--text-bright);
  margin-bottom: 1.5rem;
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
