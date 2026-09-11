import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const ALLOWED_CATEGORIES = ['AI', 'DevOps', 'Programming', 'Networking', 'Security', 'Tools']

const posts = (lang) =>
  readdirSync(join(process.cwd(), 'content', lang, 'blog'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ file: f, raw: readFileSync(join(process.cwd(), 'content', lang, 'blog', f), 'utf8') }))

const frontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  return m ? m[1] : ''
}

describe('content integrity', () => {
  for (const lang of ['en', 'fa']) {
    it(`every ${lang} post has a valid category in the taxonomy`, () => {
      for (const p of posts(lang)) {
        const fm = frontmatter(p.raw)
        const category = fm.match(/^category:\s*"([^"]*)"/m)?.[1]
        expect(category, `${lang}/${p.file}`).toBeDefined()
        expect(ALLOWED_CATEGORIES, `${lang}/${p.file}`).toContain(category)
      }
    })

    it(`every ${lang} post has 1-4 tags`, () => {
      for (const p of posts(lang)) {
        const fm = frontmatter(p.raw)
        const tagsMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m)
        expect(tagsMatch, `${lang}/${p.file} missing tags`).not.toBeNull()
        const tags = tagsMatch[1].split(',').filter(Boolean)
        expect(tags.length, `${lang}/${p.file}`).toBeGreaterThan(0)
        expect(tags.length, `${lang}/${p.file}`).toBeLessThanOrEqual(4)
      }
    })

    it(`every ${lang} post has a generated cover`, () => {
      const covers = new Set(readdirSync(join(process.cwd(), 'public', 'covers', lang, 'blog')))
      for (const p of posts(lang)) {
        expect(covers.has(`${p.file.replace(/\.md$/, '')}.svg`), `${lang}/${p.file}`).toBe(true)
      }
    })
  }
})
