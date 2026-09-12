// utils/labels.ts
// Localized display labels for the blog taxonomy. The stored frontmatter
// values (category + tags) are stable language-neutral keys; this map turns
// them into polished Persian labels on the fa blog and keeps English ones
// on the en blog.

type Bilingual = { en: string; fa: string }

export const CATEGORY_LABELS: Record<string, Bilingual> = {
  AI: { en: 'AI', fa: 'هوش مصنوعی' },
  DevOps: { en: 'DevOps', fa: 'دواپس' },
  Programming: { en: 'Programming', fa: 'برنامه‌نویسی' },
  Networking: { en: 'Networking', fa: 'شبکه' },
  Security: { en: 'Security', fa: 'امنیت' },
  Tools: { en: 'Tools', fa: 'ابزارها' }
}

export const TAG_LABELS: Record<string, Bilingual> = {
  ai: { en: 'AI', fa: 'هوش مصنوعی' },
  'ai-agents': { en: 'AI agents', fa: 'ایجنت‌های هوش مصنوعی' },
  'machine-learning': { en: 'Machine learning', fa: 'یادگیری ماشین' },
  'deep-learning': { en: 'Deep learning', fa: 'یادگیری عمیق' },
  'generative-ai': { en: 'Generative AI', fa: 'هوش مصنوعی مولد' },
  'computer-vision': { en: 'Computer vision', fa: 'بینایی ماشین' },
  nlp: { en: 'NLP', fa: 'پردازش زبان طبیعی' },
  llm: { en: 'LLM', fa: 'مدل زبانی بزرگ' },
  chatbots: { en: 'Chatbots', fa: 'چت‌بات‌ها' },
  openclaw: { en: 'OpenClaw', fa: 'اُپن‌کلا' },
  claude: { en: 'Claude', fa: 'کلاود' },
  gemini: { en: 'Gemini', fa: 'جمنای' },
  robotics: { en: 'Robotics', fa: 'رباتیک' },
  api: { en: 'API', fa: 'ای‌پی‌آی' },
  docker: { en: 'Docker', fa: 'داکر' },
  portainer: { en: 'Portainer', fa: 'پورتینر' },
  linux: { en: 'Linux', fa: 'لینوکس' },
  ubuntu: { en: 'Ubuntu', fa: 'اوبونتو' },
  debian: { en: 'Debian', fa: 'دبیان' },
  server: { en: 'Server', fa: 'سرور' },
  monitoring: { en: 'Monitoring', fa: 'مانیتورینگ' },
  cicd: { en: 'CI/CD', fa: 'سی‌آی/سی‌دی' },
  git: { en: 'Git', fa: 'گیت' },
  github: { en: 'GitHub', fa: 'گیت‌هاب' },
  security: { en: 'Security', fa: 'امنیت' },
  vpn: { en: 'VPN', fa: 'وی‌پی‌ان' },
  mirror: { en: 'Mirror', fa: 'میرور' },
  proxy: { en: 'Proxy', fa: 'پروکسی' },
  telegram: { en: 'Telegram', fa: 'تلگرام' },
  dns: { en: 'DNS', fa: 'دی‌ان‌اس' },
  cdn: { en: 'CDN', fa: 'سی‌دی‌ان' },
  python: { en: 'Python', fa: 'پایتون' },
  fastapi: { en: 'FastAPI', fa: 'فست‌ای‌پی‌آی' },
  typescript: { en: 'TypeScript', fa: 'تایپ‌اسکریپت' },
  rust: { en: 'Rust', fa: 'راست' },
  sql: { en: 'SQL', fa: 'اس‌کیو‌ال' },
  database: { en: 'Database', fa: 'پایگاه داده' },
  mysql: { en: 'MySQL', fa: 'مای‌اس‌کیو‌ال' },
  postgresql: { en: 'PostgreSQL', fa: 'پستگرس‌کیو‌ال' },
  redis: { en: 'Redis', fa: 'ردیس' },
  tools: { en: 'Tools', fa: 'ابزارها' },
  automation: { en: 'Automation', fa: 'اتوماسیون' },
  backup: { en: 'Backup', fa: 'پشتیبان‌گیری' },
  setup: { en: 'Setup', fa: 'نصب و راه‌اندازی' },
  tutorial: { en: 'Tutorial', fa: 'آموزش' },
  startups: { en: 'Startups', fa: 'استارتاپ‌ها' },
  storage: { en: 'Storage', fa: 'ذخیره‌سازی' },
  ssh: { en: 'SSH', fa: 'اس‌اس‌اچ' }
}

export const categoryLabel = (key: string, locale: string): string =>
  CATEGORY_LABELS[key]?.[locale === 'fa' ? 'fa' : 'en'] ?? key

export const tagLabel = (key: string, locale: string): string =>
  TAG_LABELS[key]?.[locale === 'fa' ? 'fa' : 'en'] ?? key

// Persian digits for counts on the fa blog
export const localeCount = (n: number, locale: string): string =>
  n.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')
