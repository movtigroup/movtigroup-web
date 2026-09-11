// server/api/leads.post.ts
// Lightweight CRM-style lead capture.
// Appends validated submissions to .data/leads.json (created on demand).
// NOTE: on serverless platforms (e.g. Vercel) the filesystem is ephemeral —
// swap `appendLead` with a database/CRM webhook for production persistence.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DATA_DIR = join(process.cwd(), '.data')
const DATA_FILE = join(DATA_DIR, 'leads.json')

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
  const result = validateLead(body)

  if (!result.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: { message: result.error }
    })
  }

  const lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    ...result.lead,
    source: 'website-contact-form',
    status: 'new',
    createdAt: new Date().toISOString()
  }

  appendLead(lead)
  setResponseStatus(event, 201)
  return { ok: true, id: lead.id }
})
