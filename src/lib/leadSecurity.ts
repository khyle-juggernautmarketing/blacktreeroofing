import {
  formatDisplayDate,
  isValidBookableDate,
  isValidSlotForDate,
  SLOTS,
  type SlotId,
} from '@/lib/booking'
import type { LeadFormData } from '@/types/lead'
import { PROPERTY_TYPES, SERVICES, TIMELINES } from '@/types/lead'

const MAX = {
  fullName: 120,
  email: 254,
  phone: 32,
  address: 200,
} as const

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g

export function sanitizeText(value: unknown, maxLen: number): string {
  return String(value ?? '')
    .replace(CONTROL_CHARS, '')
    .trim()
    .slice(0, maxLen)
}

export function isAllowedEnum<T extends string>(value: string, allowed: readonly T[]): value is T {
  return (allowed as readonly string[]).includes(value)
}

export function validateLeadBody(body: unknown):
  | { ok: true; data: LeadFormData & { website?: string } }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' }
  }

  const raw = body as Record<string, unknown>

  // Honeypot — bots often fill hidden fields
  const website = sanitizeText(raw.website, 200)
  if (website) {
    return { ok: false, error: 'Invalid submission' }
  }

  const service = sanitizeText(raw.service, 64)
  const propertyType = sanitizeText(raw.propertyType, 64)
  const timeline = sanitizeText(raw.timeline, 64)
  const fullName = sanitizeText(raw.fullName, MAX.fullName)
  const email = sanitizeText(raw.email, MAX.email).toLowerCase()
  const phone = sanitizeText(raw.phone, MAX.phone)
  const address = sanitizeText(raw.address, MAX.address)

  if (!service || !propertyType || !timeline || !fullName || !email || !phone || !address) {
    return { ok: false, error: 'Missing required fields' }
  }

  if (!isAllowedEnum(service, SERVICES)) {
    return { ok: false, error: 'Invalid service selection' }
  }
  if (!isAllowedEnum(propertyType, PROPERTY_TYPES)) {
    return { ok: false, error: 'Invalid property type' }
  }
  if (!isAllowedEnum(timeline, TIMELINES)) {
    return { ok: false, error: 'Invalid timeline' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Invalid email' }
  }

  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { ok: false, error: 'Invalid phone number' }
  }

  if (address.length < 5) {
    return { ok: false, error: 'Please enter a valid address.' }
  }

  return {
    ok: true,
    data: { service, propertyType, timeline, fullName, email, phone, address },
  }
}

export type LeadSubmissionMode = 'appointment' | 'form_only'

export function validateLeadSubmission(body: unknown):
  | {
      ok: true
      data: LeadFormData & { website?: string }
      mode: LeadSubmissionMode
      appointment?: { date: string; slotId: SlotId; displayDate: string }
    }
  | { ok: false; error: string } {
  const base = validateLeadBody(body)
  if (!base.ok) return base

  const raw = body as Record<string, unknown>
  const formOnly = raw.formOnly === true
  const appointmentRaw = raw.appointment

  if (formOnly) {
    if (appointmentRaw) {
      return { ok: false, error: 'Invalid submission' }
    }
    return { ok: true, data: base.data, mode: 'form_only' }
  }

  if (!appointmentRaw || typeof appointmentRaw !== 'object') {
    return { ok: false, error: 'Please select an appointment time.' }
  }

  const appt = appointmentRaw as Record<string, unknown>
  const date = sanitizeText(appt.date, 10)
  const slotId = sanitizeText(appt.slotId, 8)

  if (!date || !slotId) {
    return { ok: false, error: 'Invalid appointment selection.' }
  }
  if (!isValidBookableDate(date)) {
    return { ok: false, error: 'Selected date is not available.' }
  }
  if (!isValidSlotForDate(date, slotId)) {
    return { ok: false, error: 'Selected time slot is not available.' }
  }

  return {
    ok: true,
    data: base.data,
    mode: 'appointment',
    appointment: {
      date,
      slotId: slotId as SlotId,
      displayDate: formatDisplayDate(date),
    },
  }
}

export function validateAppointmentFields(date: unknown, slotId: unknown):
  | { ok: true; date: string; slotId: SlotId; slotLabel: string }
  | { ok: false; error: string } {
  const dateStr = sanitizeText(date, 10)
  const slot = sanitizeText(slotId, 8)

  if (!dateStr || !slot) {
    return { ok: false, error: 'Invalid appointment selection.' }
  }
  if (!isValidBookableDate(dateStr)) {
    return { ok: false, error: 'Selected date is not available.' }
  }
  if (!isValidSlotForDate(dateStr, slot)) {
    return { ok: false, error: 'Selected time slot is not available.' }
  }

  return {
    ok: true,
    date: dateStr,
    slotId: slot as SlotId,
    slotLabel: SLOTS[slot as SlotId].label,
  }
}

/** Simple in-memory rate limit (per runtime instance). */
const hits = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 8
const RATE_WINDOW_MS = 15 * 60 * 1000

export function rateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') || 'unknown'
}

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}
