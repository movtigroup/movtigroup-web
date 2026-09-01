// composables/useBlog.ts
import { computed } from 'vue'

export function useBlog() {
  const { locale } = useI18n()
  
  // Get all posts
  const { data: posts } = await useAsyncData(`all-blog-posts-${locale.value}`, () =>
    queryContent(locale.value, 'blog')
      .where({ _partial: false })
      .sort({ date: -1 })
      .find()
  )

  // Get single post by slug
  const getPost = async (slug: string) => {
    const { data } = await useAsyncData(`blog-post-${slug}`, () =>
      queryContent(slug).findOne()
    )
    return data
  }

  // Search posts
  const searchPosts = (query: string) => {
    if (!posts.value) return []
    const q = query.toLowerCase()
    return posts.value.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    )
  }

  // Get posts by category
  const getPostsByCategory = (category: string) => {
    if (!posts.value) return []
    return posts.value.filter(p => p.category === category)
  }

  // Get all categories
  const categories = computed(() => {
    const cats = new Set<string>()
    posts.value?.forEach(p => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats)
  })

  return { posts, getPost, searchPosts, getPostsByCategory, categories }
}
