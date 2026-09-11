import { describe, expect, it } from 'vitest'
import { validateLead } from '../server/utils/lead-validate'

const valid = { name: 'Taha', email: 'taha@movtigroup.me', subject: 'Hi', message: 'Hello there' }

describe('validateLead', () => {
  it('accepts a valid lead and normalizes fields', () => {
    const r = validateLead(valid)
    expect(r.ok).toBe(true)
    expect(r.lead).toMatchObject({ name: 'Taha', email: 'taha@movtigroup.me', subject: 'Hi', locale: 'en' })
  })

  it('rejects missing required fields', () => {
    expect(validateLead({ ...valid, name: '' }).ok).toBe(false)
    expect(validateLead({ ...valid, email: '' }).ok).toBe(false)
    expect(validateLead({ ...valid, message: '   ' }).ok).toBe(false)
    expect(validateLead(null).ok).toBe(false)
  })

  it('rejects malformed emails', () => {
    expect(validateLead({ ...valid, email: 'not-an-email' }).ok).toBe(false)
    expect(validateLead({ ...valid, email: 'a@b' }).ok).toBe(false)
  })

  it('defaults subject and locale', () => {
    const r = validateLead({ name: 'A', email: 'a@b.co', message: 'm' })
    expect(r.lead?.subject).toBe('(no subject)')
    expect(r.lead?.locale).toBe('en')
    expect(validateLead({ ...valid, locale: 'fa' }).lead?.locale).toBe('fa')
  })

  it('truncates oversized input (DoS guard)', () => {
    const r = validateLead({ ...valid, message: 'x'.repeat(99999) })
    expect(r.ok).toBe(true)
    expect(r.lead?.message.length).toBeLessThanOrEqual(5000)
  })
})
