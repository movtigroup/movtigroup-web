import { describe, expect, it } from 'vitest'
import { blogCollectionFor, coverForPath, stripLocalePrefix } from '../utils/blog'

describe('blogCollectionFor', () => {
  it('maps fa to the fa collection', () => {
    expect(blogCollectionFor('fa')).toBe('blog_fa')
  })

  it('maps everything else to the en collection', () => {
    expect(blogCollectionFor('en')).toBe('blog_en')
    expect(blogCollectionFor('fr')).toBe('blog_en')
    expect(blogCollectionFor('')).toBe('blog_en')
  })
})

describe('stripLocalePrefix', () => {
  it('strips the en and fa content prefixes', () => {
    expect(stripLocalePrefix('/en/blog/x')).toBe('/blog/x')
    expect(stripLocalePrefix('/fa/blog/x')).toBe('/blog/x')
  })

  it('keeps non-locale paths intact', () => {
    expect(stripLocalePrefix('/blog/x')).toBe('/blog/x')
  })

  it('never returns an empty path', () => {
    expect(stripLocalePrefix('/en')).toBe('/')
  })
})

describe('coverForPath', () => {
  it('builds the cover URL from a content path', () => {
    expect(coverForPath('/en/blog/birdclaw')).toBe('/covers/en/blog/birdclaw.svg')
    expect(coverForPath('/fa/blog/ai-agriculture')).toBe('/covers/fa/blog/ai-agriculture.svg')
  })
})
