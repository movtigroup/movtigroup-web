// server/api/leads.post.ts
// Lightweight CRM-style lead capture.
// Appends validated submissions to .data/leads.json (created on demand).
// NOTE: on serverless platforms (e.g. Vercel) the filesystem is ephemeral —
// swap `appendLead` with a database/CRM webhook for production persistence.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DATA_DIR = join(process.cwd(), '.data')
const DATA_FILE = join(DATA_DIR, 'leads.json')

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

const appendLead = (lead) => {
  const leads = existsSync(DATA_FILE)
    ? JSON.parse(readFileSync(DATA_FILE, 'utf8'))
    : []
  leads.push(lead)
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2))
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)

  const name = clean(body?.name, 120)
  const email = clean(body?.email, 200)
  const subject = clean(body?.subject, 200)
  const message = clean(body?.message, 5000)
  const locale = body?.locale === 'fa' ? 'fa' : 'en'

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', data: { message: 'name, email and message are required' } })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', data: { message: 'invalid email address' } })
  }

  const lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject: subject || '(no subject)',
    message,
    locale,
    source: 'website-contact-form',
    status: 'new',
    createdAt: new Date().toISOString()
  }

  appendLead(lead)
  setResponseStatus(event, 201)
  return { ok: true, id: lead.id }
})
