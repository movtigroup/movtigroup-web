// server/routes/sitemap.xml.ts
// Dynamic sitemap generated from static pages + all blog posts (EN + FA)
import { queryCollection } from '@nuxt/content/nitro'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://movtigroup.me').replace(/\/$/, '')

export default defineEventHandler(async (event) => {
  const enPosts = await queryCollection(event, 'blog_en')
    .select('path', 'date')
    .order('date', 'DESC')
    .all()
  const faPosts = await queryCollection(event, 'blog_fa')
    .select('path', 'date')
    .order('date', 'DESC')
    .all()

  const now = new Date().toISOString().slice(0, 10)

  // Static pages: /<path> (en, no prefix) + /fa<path>
  const staticPaths = ['', '/blog', '/projects', '/about', '/contact', '/collaborations']
  const staticEntries = staticPaths.map((p) => {
    const changefreq = p === '' || p === '/blog' ? 'daily' : p === '/projects' ? 'weekly' : 'monthly'
    const priority = p === '' ? '1.0' : p === '/blog' ? '0.9' : '0.7'
    return { loc: `${siteUrl}${p}`, alternate: `${siteUrl}/fa${p}`, lastmod: now, changefreq, priority }
  })

  const postEntries = enPosts.map((post) => ({
    loc: `${siteUrl}${post.path}`,
    alternate: `${siteUrl}${post.path.replace(/^\/en\//, '/fa/')}`,
    lastmod: post.date ? new Date(post.date).toISOString().slice(0, 10) : now,
    changefreq: 'monthly',
    priority: '0.6'
  }))

  const faOnly = faPosts.filter((p) => !enPosts.some((e) => e.path.replace(/^\/en\//, '/fa/') === p.path))
  const faEntries = faOnly.map((post) => ({
    loc: `${siteUrl}${post.path}`,
    lastmod: post.date ? new Date(post.date).toISOString().slice(0, 10) : now,
    changefreq: 'monthly',
    priority: '0.6'
  }))

  const urls = [...staticEntries, ...postEntries, ...faEntries]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${
      u.alternate
        ? `
    <xhtml:link rel="alternate" hreflang="fa" href="${u.alternate}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.loc}"/>`
        : ''
    }
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')
  return xml
})
