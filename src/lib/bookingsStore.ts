import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import type { SlotId } from '@/lib/booking'
import { isValidBookableDate, isValidSlotForDate, slotKey } from '@/lib/booking'

export type StoredBooking = {
  date: string
  slotId: SlotId
  email: string
  fullName: string
  bookedAt: string
}

const memoryBookings = new Map<string, StoredBooking>()
let loaded = false

function getStorePath(): string {
  const localPath = join(process.cwd(), 'data', 'bookings.json')
  if (process.env.VERCEL) {
    return join(tmpdir(), 'blacktree-bookings.json')
  }
  return localPath
}

function ensureLoaded(): void {
  if (loaded) return
  loaded = true
  const path = getStorePath()
  try {
    if (!existsSync(path)) return
    const raw = readFileSync(path, 'utf8')
    const parsed = JSON.parse(raw) as StoredBooking[]
    if (!Array.isArray(parsed)) return
    for (const booking of parsed) {
      if (booking?.date && booking?.slotId) {
        memoryBookings.set(slotKey(booking.date, booking.slotId), booking)
      }
    }
  } catch {
    // Start fresh if store is corrupt or unreadable
  }
}

function persist(): void {
  const path = getStorePath()
  try {
    const dir = join(process.cwd(), 'data')
    if (!process.env.VERCEL && !existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
    writeFileSync(path, JSON.stringify([...memoryBookings.values()], null, 2), 'utf8')
  } catch (err) {
    console.error('Failed to persist bookings', err)
  }
}

export function getBookedSlotKeys(from?: string, to?: string): string[] {
  ensureLoaded()
  const keys: string[] = []
  for (const booking of memoryBookings.values()) {
    if (from && booking.date < from) continue
    if (to && booking.date > to) continue
    keys.push(slotKey(booking.date, booking.slotId))
  }
  return keys
}

export function isSlotBooked(date: string, slotId: SlotId): boolean {
  ensureLoaded()
  return memoryBookings.has(slotKey(date, slotId))
}

export function releaseSlot(date: string, slotId: SlotId): void {
  ensureLoaded()
  memoryBookings.delete(slotKey(date, slotId))
  persist()
}

export function bookSlot(input: {
  date: string
  slotId: SlotId
  email: string
  fullName: string
}): { ok: true } | { ok: false; error: string } {
  ensureLoaded()
  const { date, slotId, email, fullName } = input

  if (!isValidBookableDate(date)) {
    return { ok: false, error: 'Selected date is not available for booking.' }
  }
  if (!isValidSlotForDate(date, slotId)) {
    return { ok: false, error: 'Selected time slot is not available.' }
  }

  const key = slotKey(date, slotId)
  if (memoryBookings.has(key)) {
    return { ok: false, error: 'This time slot was just booked. Please choose another.' }
  }

  memoryBookings.set(key, {
    date,
    slotId,
    email,
    fullName,
    bookedAt: new Date().toISOString(),
  })
  persist()
  return { ok: true }
}
