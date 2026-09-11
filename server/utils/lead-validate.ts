// server/utils/lead-validate.ts
// Pure validation for contact-form leads — kept separate so it is unit-testable.
export interface LeadResult {
  ok: boolean
  error?: string
  lead?: {
    name: string
    email: string
    subject: string
    message: string
    locale: 'en' | 'fa'
  }
}

const clean = (v: unknown, max: number): string => String(v ?? '').trim().slice(0, max)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateLead = (body: unknown): LeadResult => {
  const b = (body ?? {}) as Record<string, unknown>
  const name = clean(b.name, 120)
  const email = clean(b.email, 200)
  const subject = clean(b.subject, 200)
  const message = clean(b.message, 5000)
  const locale = b.locale === 'fa' ? 'fa' : 'en'

  if (!name || !email || !message) {
    return { ok: false, error: 'name, email and message are required' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'invalid email address' }
  }

  return {
    ok: true,
    lead: {
      name,
      email,
      subject: subject || '(no subject)',
      message,
      locale
    }
  }
}
