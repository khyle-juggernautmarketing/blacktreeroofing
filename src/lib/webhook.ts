import { signJwtHS256 } from '@/lib/jwt'
import type { SlotId } from '@/lib/booking'
import { SLOTS } from '@/lib/booking'

const WEBHOOK_TIMEOUT_MS = 25_000

export type WebhookLeadPayload = {
  service: string
  propertyType: string
  timeline: string
  fullName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  source: string
  submittedAt: string
  submissionType: 'appointment' | 'form_only'
  appointment?: {
    date: string
    slotId: SlotId
    slotLabel: string
    timezone: 'MST'
    displayDate: string
  }
}

export function getWebhookConfig() {
  const url = process.env.N8N_WEBHOOK_URL?.trim()
  const jwtSecret = process.env.N8N_JWT_SECRET?.trim()
  if (!url || !jwtSecret) return null
  return { url, jwtSecret }
}

export function splitFullName(fullName: string) {
  const space = fullName.indexOf(' ')
  if (space === -1) return { firstName: fullName, lastName: '' }
  return {
    firstName: fullName.slice(0, space),
    lastName: fullName.slice(space + 1).trim(),
  }
}

export async function sendLeadToWebhook(
  config: { url: string; jwtSecret: string },
  payload: WebhookLeadPayload,
): Promise<{ ok: true } | { ok: false; status: number; aborted: boolean }> {
  const token = signJwtHS256(config.jwtSecret, { sub: 'lead-form' })
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

  try {
    const res = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('n8n webhook failed', res.status)
      return { ok: false, status: res.status, aborted: false }
    }

    return { ok: true }
  } catch (e) {
    const aborted = e instanceof Error && e.name === 'AbortError'
    console.error('n8n webhook fetch failed', aborted ? 'timeout' : e)
    return { ok: false, status: 503, aborted }
  } finally {
    clearTimeout(timeout)
  }
}

export function buildAppointmentFields(date: string, slotId: SlotId, displayDate: string) {
  return {
    date,
    slotId,
    slotLabel: SLOTS[slotId].label,
    timezone: 'MST' as const,
    displayDate,
  }
}
