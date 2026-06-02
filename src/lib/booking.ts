export const MST_TZ = 'America/Denver'
export const MAX_DAYS_OUT = 3

export const SLOTS = {
  '10-12': { start: 10, end: 12, label: '10AM – 12PM' },
  '12-14': { start: 12, end: 14, label: '12PM – 2PM' },
  '14-16': { start: 14, end: 16, label: '2PM – 4PM' },
  '16-18': { start: 16, end: 18, label: '4PM – 6PM' },
} as const

export type SlotId = keyof typeof SLOTS

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export function formatMstDateString(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: MST_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function getMstDayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number)
  const noonUtc = new Date(Date.UTC(y, m - 1, d, 18, 0, 0))
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: MST_TZ,
    weekday: 'short',
  }).format(noonUtc)
  return WEEKDAY_MAP[weekday] ?? 0
}

export function addDaysToDateStr(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + days, 18, 0, 0))
  return formatMstDateString(next)
}

export function getSlotsForDay(dayOfWeek: number): SlotId[] {
  if (dayOfWeek >= 1 && dayOfWeek <= 3) {
    return ['10-12', '12-14', '14-16', '16-18']
  }
  if (dayOfWeek >= 4 && dayOfWeek <= 6) {
    return ['10-12', '12-14']
  }
  return []
}

export function getCurrentMstHour(): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: MST_TZ,
    hour: 'numeric',
    hour12: false,
  }).formatToParts(new Date())
  return Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
}

export function isSlotPast(dateStr: string, slotId: SlotId): boolean {
  const today = formatMstDateString(new Date())
  if (dateStr !== today) return false
  return getCurrentMstHour() >= SLOTS[slotId].end
}

export function getBookableDates(): string[] {
  const today = formatMstDateString(new Date())
  const dates: string[] = []
  for (let i = 0; i <= MAX_DAYS_OUT; i++) {
    const dateStr = addDaysToDateStr(today, i)
    if (getSlotsForDay(getMstDayOfWeek(dateStr)).length > 0) {
      dates.push(dateStr)
    }
  }
  return dates
}

export function isValidBookableDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false
  const bookable = getBookableDates()
  return bookable.includes(dateStr)
}

export function isValidSlotForDate(dateStr: string, slotId: string): slotId is SlotId {
  if (!(slotId in SLOTS)) return false
  const daySlots = getSlotsForDay(getMstDayOfWeek(dateStr))
  if (!daySlots.includes(slotId as SlotId)) return false
  if (isSlotPast(dateStr, slotId as SlotId)) return false
  return true
}

export function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d, 18, 0, 0))
  return new Intl.DateTimeFormat('en-US', {
    timeZone: MST_TZ,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function slotKey(dateStr: string, slotId: SlotId): string {
  return `${dateStr}:${slotId}`
}

export function parseSlotKey(key: string): { date: string; slotId: SlotId } | null {
  const match = /^(\d{4}-\d{2}-\d{2}):(\d{2}-\d{2})$/.exec(key)
  if (!match) return null
  const slotId = match[2] as SlotId
  if (!(slotId in SLOTS)) return null
  return { date: match[1], slotId }
}
