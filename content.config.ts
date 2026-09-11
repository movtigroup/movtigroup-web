import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  category: z.string().optional(),
  author: z.string().optional(),
  lang: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export default defineContentConfig({
  collections: {
    blog_en: defineCollection({
      type: 'page',
      source: 'en/blog/*.md',
      schema: blogSchema
    }),
    blog_fa: defineCollection({
      type: 'page',
      source: 'fa/blog/*.md',
      schema: blogSchema
    })
  }
})
