#!/usr/bin/env node
// scripts/assign-taxonomy.mjs
// Assigns a consistent `category` and 2-4 `tags` to every blog post based on
// keyword rules over title + description + body. Idempotent: existing
// non-empty categories are preserved unless FORCE=1.
// Run: node scripts/assign-taxonomy.mjs [--force]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FORCE = process.argv.includes('--force')

// Category taxonomy — keyword rules are matched against title + description.
// English and Persian keywords are both supported.
const RULES = [
  {
    category: 'AI',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural', 'nlp', 'transformer', 'computer vision', 'robotics', 'llm', 'agent', 'agents', 'gpt', 'claude', 'gemini', 'openclaw', 'claw', 'chatbot', 'generative', 'prompt', 'hermes', 'kilo', 'dirac', 'cherry studio', 'agentic', 'multimodal', 'dataset', 'training', 'هوش مصنوعی', 'یادگیری ماشین', 'دیپ لرنینگ', 'شبکه عصبی', 'چت‌بات', 'چت بات', 'ایجنت', 'مدل زبانی', 'ربات هوشمند', 'بینایی ماشین', 'پردازش زبان']
  },
  {
    category: 'DevOps',
    keywords: ['docker', 'container', 'kubernetes', 'portainer', 'ci/cd', 'cicd', 'pipeline', 'monitoring', 'grafana', 'prometheus', 'deploy', 'deployment', 'server', 'vps', 'linux', 'ubuntu', 'debian', 'centos', 'alpine', 'ssh', 'self-hosted', 'homelab', 'nginx', 'git ', 'داکر', 'کانتینر', 'دپلوی', 'استقرار', 'سرور', 'لینوکس', 'اوبونتو', 'دیبیان', 'مانیتورینگ', 'نصب داکر', 'vps ایرانی', 'هاست']
  },
  {
    category: 'Security',
    keywords: ['security', 'vpn', 'firewall', 'encryption', 'privacy', 'password', 'vulnerability', 'threat', 'auth', '2fa', 'tor', 'sandbox', 'امنیت', 'فایروال', 'رمز عبور', 'حریم خصوصی', 'رمزگذاری']
  },
  {
    category: 'Networking',
    keywords: ['mirror', 'proxy', 'telegram', 'cdn', 'dns', 'ddns', 'network', 'bandwidth', 'download', 'upload', 'cloud storage', 'drive', 'تلگرام', 'پروکسی', 'میرور', 'شبکه', 'دانلود', 'آپلود', 'ابری', 'ذخیره‌سازی ابری']
  },
  {
    category: 'Programming',
    keywords: ['python', 'javascript', 'typescript', 'rust', 'golang', 'java', 'c++', 'php', 'fastapi', 'sql', 'database', 'mysql', 'postgresql', 'redis', 'nosql', 'api', 'framework', 'library', 'script', 'git ', 'github', 'code review', 'clean code', 'refactor', 'پایتون', 'برنامه‌نویسی', 'جاوااسکریپت', 'پایگاه داده', 'دیتابیس', 'کتابخانه']
  },
  {
    category: 'Tools',
    keywords: ['tool', 'tools', 'cli', 'editor', 'ide', 'vscode', 'browser', 'extension', 'productivity', 'workflow', 'automation', 'backup', 'youtube', 'yt-dlp', 'telegram bot', 'bot', 'ابزار', 'خودکارسازی', 'پشتیبان‌گیری']
  }
]

const TAG_RULES = [
  ['docker', 'docker'], ['container', 'docker'], ['داکر', 'docker'], ['portainer', 'portainer'],
  ['ubuntu', 'ubuntu'], ['اوبونتو', 'ubuntu'], ['debian', 'debian'], ['لینوکس', 'linux'], ['linux', 'linux'], ['alpine', 'alpine'],
  ['monitoring', 'monitoring'], ['مانیتورینگ', 'monitoring'], ['redis', 'redis'], ['postgresql', 'postgresql'], ['mysql', 'mysql'],
  ['python', 'python'], ['پایتون', 'python'], ['fastapi', 'fastapi'], ['javascript', 'javascript'], ['typescript', 'typescript'],
  ['rust', 'rust'], ['sql', 'sql'], ['nosql', 'database'], ['database', 'database'], ['دیتابیس', 'database'], ['پایگاه داده', 'database'],
  ['git', 'git'], ['github', 'github'], ['ci/cd', 'cicd'], ['cicd', 'cicd'], ['pipeline', 'cicd'],
  ['vpn', 'vpn'], ['security', 'security'], ['امنیت', 'security'], ['encryption', 'security'], ['password', 'security'], ['رمز عبور', 'security'],
  ['mirror', 'mirror'], ['میرور', 'mirror'], ['proxy', 'proxy'], ['پروکسی', 'proxy'], ['telegram', 'telegram'], ['تلگرام', 'telegram'], ['cdn', 'cdn'], ['dns', 'dns'],
  ['ai', 'ai'], ['artificial intelligence', 'ai'], ['هوش مصنوعی', 'ai'],
  ['machine learning', 'machine-learning'], ['یادگیری ماشین', 'machine-learning'],
  ['deep learning', 'deep-learning'], ['شبکه عصبی', 'deep-learning'], ['neural', 'deep-learning'],
  ['nlp', 'nlp'], ['transformer', 'nlp'], ['agent', 'ai-agents'], ['agents', 'ai-agents'], ['ایجنت', 'ai-agents'],
  ['llm', 'llm'], ['gpt', 'llm'], ['مدل زبانی', 'llm'], ['claude', 'claude'],
  ['gemini', 'gemini'], ['openclaw', 'openclaw'], ['claw', 'openclaw'], ['chatbot', 'chatbots'], ['چت‌بات', 'chatbots'], ['چت بات', 'chatbots'],
  ['vision', 'computer-vision'], ['robotics', 'robotics'], ['generative', 'generative-ai'],
  ['automation', 'automation'], ['خودکارسازی', 'automation'], ['self-hosted', 'self-hosted'],
  ['server', 'server'], ['سرور', 'server'], ['vps', 'vps'],
  ['youtube', 'yt-dlp'], ['yt-dlp', 'yt-dlp'], ['cloud', 'cloud'], ['storage', 'storage'], ['ابری', 'cloud'],
  ['startup', 'startups'], ['beginner', 'beginner'], ['tutorial', 'tutorial'], ['guide', 'tutorial'], ['آموزش', 'tutorial'],
  ['install', 'setup'], ['نصب', 'setup'], ['setup', 'setup'], ['backup', 'backup'], ['ssh', 'ssh'], ['api', 'api']
]

const matchCase = (haystack, needle) => haystack.includes(needle)

const analyze = (text) => {
  const lower = ' ' + text.toLowerCase() + ' '
  let category = null
  let best = 0
  for (const rule of RULES) {
    const score = rule.keywords.reduce((acc, k) => (matchCase(lower, ` ${k}`) || matchCase(lower, k + ' ') ? acc + 1 : acc), 0)
    if (score > best) {
      best = score
      category = rule.category
    }
  }
  if (!category) category = 'Tools'

  const tags = []
  for (const [kw, tag] of TAG_RULES) {
    if ((matchCase(lower, ` ${kw}`) || matchCase(lower, `${kw} `) || lower.includes(kw)) && !tags.includes(tag)) tags.push(tag)
    if (tags.length >= 4) break
  }
  if (!tags.length) tags.push(category.toLowerCase())
  return { category, tags }
}

const parseFrontmatter = (text) => {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { body: text }
  return { header: m[1], body: text.slice(m[0].length) }
}

let updated = 0
let skipped = 0
for (const lang of ['en', 'fa']) {
  const dir = join(ROOT, 'content', lang, 'blog')
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue
    const path = join(dir, file)
    const raw = readFileSync(path, 'utf8')
    const { header, body } = parseFrontmatter(raw)
    if (!header) { console.warn(`no frontmatter: ${lang}/${file}`); continue }

    const get = (key) => {
      const m = header.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))
      return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''
    }
    const has = (key) => new RegExp(`^${key}:`, 'm').test(header)

    const existingCategory = get('category')
    const existingTags = has('tags') ? get('tags') : ''

    if (!FORCE && existingCategory && existingTags) { skipped++; continue }

    const { category, tags } = analyze(`${get('title')} ${get('description')} ${body.slice(0, 1500)}`)

    let newHeader = header
    if (!existingCategory || FORCE) {
      newHeader = has('category')
        ? newHeader.replace(/^category:.*$/m, `category: "${category}"`)
        : `${newHeader}\ncategory: "${category}"`
    }
    if (!existingTags || FORCE) {
      const tagsLine = `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`
      newHeader = has('tags') ? newHeader.replace(/^tags:.*$/m, tagsLine) : `${newHeader}\n${tagsLine}`
    }

    writeFileSync(path, `---\n${newHeader}\n---\n${body}`)
    updated++
  }
}
console.log(`taxonomy: ${updated} posts updated, ${skipped} skipped (already had category+tags)`)
