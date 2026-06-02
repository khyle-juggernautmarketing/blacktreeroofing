'use client'

import { Calendar, Clock, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { formatDisplayDate } from '@/lib/booking'

type SlotOption = {
  id: string
  label: string
  available: boolean
}

type DateAvailability = {
  date: string
  slots: SlotOption[]
}

type BookingCalendarProps = {
  onConfirm: (date: string, slotId: string, slotLabel: string) => void
  loading?: boolean
  errorMsg?: string
}

function formatShortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d, 18, 0, 0))
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function BookingCalendar({ onConfirm, loading = false, errorMsg = '' }: BookingCalendarProps) {
  const [availability, setAvailability] = useState<DateAvailability[]>([])
  const [fetching, setFetching] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<{ id: string; label: string } | null>(null)

  const loadAvailability = useCallback(async () => {
    setFetching(true)
    setFetchError('')
    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load availability')
      const data = (await res.json()) as { dates: DateAvailability[] }
      setAvailability(data.dates ?? [])
      const firstWithSlots = data.dates?.find((d) => d.slots.some((s) => s.available))
      if (firstWithSlots) {
        setSelectedDate(firstWithSlots.date)
      }
    } catch {
      setFetchError('Could not load available times. Please refresh or call us directly.')
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    loadAvailability()
  }, [loadAvailability])

  const activeDay = availability.find((d) => d.date === selectedDate)
  const availableSlots = activeDay?.slots.filter((s) => s.available) ?? []
  const hasAnyAvailability = availability.some((d) => d.slots.some((s) => s.available))

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return
    onConfirm(selectedDate, selectedSlot.id, selectedSlot.label)
  }

  if (fetching) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-slate-600">
        <Loader2 className="h-8 w-8 animate-spin text-[#48D1CC]" aria-hidden />
        <p className="text-sm font-medium">Loading available times…</p>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-center">
        <p className="text-sm text-red-700" role="alert">
          {fetchError}
        </p>
        <button
          type="button"
          onClick={loadAvailability}
          className="mt-3 text-sm font-semibold text-[#48D1CC] hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!hasAnyAvailability) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-center">
        <p className="text-sm text-amber-900">
          No appointment slots are available in the next 3 days. Please call us at{' '}
          <a href="tel:+12082745706" className="font-semibold text-[#48D1CC] hover:underline">
            208-274-5706
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Clock className="h-4 w-4 text-[#48D1CC]" aria-hidden />
        All times shown in Mountain Standard Time (MST)
      </p>

      <div>
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Calendar className="h-4 w-4" aria-hidden />
          Select a date
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {availability.map((day) => {
            const hasOpen = day.slots.some((s) => s.available)
            const selected = selectedDate === day.date
            return (
              <button
                key={day.date}
                type="button"
                disabled={!hasOpen}
                onClick={() => {
                  setSelectedDate(day.date)
                  setSelectedSlot(null)
                }}
                className={`min-h-12 rounded-xl border-2 px-2 py-2.5 text-center text-sm font-semibold transition-all duration-300 ${
                  selected
                    ? 'border-[#48D1CC] bg-[#48D1CC]/5 text-slate-900 ring-2 ring-[#48D1CC]'
                    : hasOpen
                      ? 'border-slate-200/80 bg-white/90 text-slate-700 hover:border-[#48D1CC]/50 hover:bg-slate-50/90'
                      : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
                }`}
              >
                {formatShortDate(day.date)}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <p className="mb-2 text-xs font-semibold text-slate-600">Select a time</p>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-slate-500">No open slots on this date. Please choose another day.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {activeDay?.slots.map((slot) => {
                const selected = selectedSlot?.id === slot.id
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot({ id: slot.id, label: slot.label })}
                    className={`min-h-12 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                      selected
                        ? 'border-[#48D1CC] bg-[#48D1CC]/5 text-slate-900 ring-2 ring-[#48D1CC]'
                        : slot.available
                          ? 'border-slate-200/80 bg-white/90 text-slate-700 hover:border-[#48D1CC]/50 hover:bg-slate-50/90'
                          : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400 line-through'
                    }`}
                  >
                    {slot.label}
                    {!slot.available && (
                      <span className="ml-2 text-xs font-normal text-slate-400">Booked</span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {selectedDate && selectedSlot && (
        <div className="rounded-xl border border-[#48D1CC]/30 bg-[#48D1CC]/5 px-4 py-3 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Your appointment: </span>
          {formatDisplayDate(selectedDate)} · {selectedSlot.label} MST
        </div>
      )}

      {errorMsg && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="button"
        disabled={!selectedDate || !selectedSlot || loading}
        onClick={handleConfirm}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#48D1CC] text-base font-semibold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(72,209,204,0.5)] disabled:opacity-70 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:hover:shadow-md sm:text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Confirming…
          </>
        ) : (
          'Confirm Appointment'
        )}
      </button>
    </div>
  )
}
