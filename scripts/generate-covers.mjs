#!/usr/bin/env node
// scripts/generate-covers.mjs
// Generates a branded SVG cover (1200x630) for every blog post into
// public/covers/<lang>/blog/<slug>.svg. Deterministic: same post -> same cover.
// Run: npm run generate:covers
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = join(ROOT, 'content')
const OUT = join(ROOT, 'public', 'covers')
const WIDTH = 1200
const HEIGHT = 630

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const hash = (s) => {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0
  return h
}

const parseFrontmatter = (text) => {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const fm = {}
  if (!m) return fm
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/)
    if (!kv) continue
    fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
  }
  return fm
}

// Word-wrap by approximate character width; returns up to `maxLines` lines.
const wrap = (text, maxChars, maxLines) => {
  const words = text.split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''
  for (const w of words) {
    const candidate = current ? current + ' ' + w : w
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = w
      if (lines.length === maxLines) break
    } else {
      current = candidate
    }
  }
  if (lines.length < maxLines && current) lines.push(current)
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, Math.max(0, maxChars - 1)).trimEnd() + '…'
  }
  return lines
}

const coverSvg = ({ title, date, lang }) => {
  const h = hash(title)
  const hue1 = h % 360
  const hue2 = (h >> 4) % 360
  const isFa = lang === 'fa'
  const dir = isFa ? 'rtl' : 'ltr'

  // Font size scales down with title length
  const fs = title.length > 90 ? 44 : title.length > 60 ? 52 : title.length > 34 ? 62 : 72
  const maxChars = Math.floor(1020 / (fs * 0.52))
  const lines = wrap(title, maxChars, 3)
  const lineHeight = Math.round(fs * 1.32)
  const startY = 330 - ((lines.length - 1) * lineHeight) / 2

  const titleText = lines
    .map(
      (line, i) =>
        `<text x="600" y="${startY + i * lineHeight}" text-anchor="middle" font-family="'Vazirmatn','Segoe UI',Tahoma,sans-serif" font-size="${fs}" font-weight="700" fill="#ffffff" direction="${dir}" unicode-bidi="plaintext">${escapeXml(line)}</text>`
    )
    .join('\n  ')

  const dateStr = date ? String(date).slice(0, 10) : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue1} 80% 65%)"/>
      <stop offset="100%" stop-color="hsl(${hue2} 80% 60%)"/>
    </linearGradient>
    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="hsl(${hue1} 85% 60%)" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="hsl(${hue1} 85% 60%)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="hsl(${hue2} 85% 55%)" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="hsl(${hue2} 85% 55%)" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a0f"/>
  <circle cx="${180 + (h % 160)}" cy="90" r="360" fill="url(#glow1)"/>
  <circle cx="${WIDTH - 200 - (h % 140)}" cy="${HEIGHT - 60}" r="400" fill="url(#glow2)"/>

  <rect x="20" y="20" width="${WIDTH - 40}" height="${HEIGHT - 40}" rx="28" fill="none" stroke="url(#ring)" stroke-width="2.5" opacity="0.7"/>

  <!-- brand mark -->
  <g>
    <rect x="56" y="52" width="54" height="54" rx="14" fill="#ffffff"/>
    <path d="M70 92 V66 l12 15 12-15 v26" fill="none" stroke="#0a0a0f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="122" y="88" font-family="'Segoe UI',Tahoma,sans-serif" font-size="26" font-weight="700" fill="#ffffff" opacity="0.92">MovtiGroup</text>
  </g>

  ${titleText}

  <text x="76" y="${HEIGHT - 62}" font-family="'Segoe UI',Tahoma,sans-serif" font-size="24" fill="#9aa0ac">${escapeXml(dateStr)}</text>
  <text x="${WIDTH - 76}" y="${HEIGHT - 62}" text-anchor="${isFa ? 'start' : 'end'}" font-family="'Segoe UI',Tahoma,sans-serif" font-size="24" fill="#9aa0ac" direction="${dir}" unicode-bidi="plaintext">${isFa ? 'بلاگ موتی‌گروپ' : 'MovtiGroup Blog'}</text>
</svg>
`
}

// Reset output dir for a clean regenerate
rmSync(OUT, { recursive: true, force: true })

let count = 0
for (const lang of ['en', 'fa']) {
  const srcDir = join(CONTENT, lang, 'blog')
  const outDir = join(OUT, lang, 'blog')
  mkdirSync(outDir, { recursive: true })
  for (const file of readdirSync(srcDir)) {
    if (!file.endsWith('.md')) continue
    const slug = file.replace(/\.md$/, '')
    const fm = parseFrontmatter(readFileSync(join(srcDir, file), 'utf8'))
    const title = fm.title || slug
    writeFileSync(join(outDir, `${slug}.svg`), coverSvg({ title, date: fm.date, lang }))
    count++
  }
}

console.log(`Generated ${count} covers in public/covers/`)
