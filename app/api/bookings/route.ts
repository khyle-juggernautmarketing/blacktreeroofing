import { NextResponse } from 'next/server'
import { getBookableDates, getSlotsForDay, getMstDayOfWeek, isSlotPast, SLOTS } from '@/lib/booking'
import { getBookedSlotKeys } from '@/lib/bookingsStore'

export async function GET() {
  try {
    const dates = getBookableDates()
    const booked = new Set(getBookedSlotKeys(dates[0], dates.at(-1)))

    const availability = dates.map((date) => {
      const daySlots = getSlotsForDay(getMstDayOfWeek(date))
      const slots = daySlots.map((slotId) => ({
        id: slotId,
        label: SLOTS[slotId].label,
        available: !booked.has(`${date}:${slotId}`) && !isSlotPast(date, slotId),
      }))
      return { date, slots }
    })

    return NextResponse.json(
      { dates: availability, timezone: 'MST' },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    console.error('Bookings GET error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
