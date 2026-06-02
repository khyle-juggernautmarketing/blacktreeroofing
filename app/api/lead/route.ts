import { NextResponse } from 'next/server'
import { bookSlot, releaseSlot } from '@/lib/bookingsStore'
import { isRateLimited, rateLimitKey, validateLeadSubmission } from '@/lib/leadSecurity'
import {
  buildAppointmentFields,
  getWebhookConfig,
  sendLeadToWebhook,
  splitFullName,
} from '@/lib/webhook'

const MAX_BODY_BYTES = 8_192

export async function POST(request: Request) {
  const config = getWebhookConfig()
  if (!config) {
    console.error('Lead API: missing N8N_WEBHOOK_URL or N8N_JWT_SECRET')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 })
  }

  const limiterKey = rateLimitKey(request)
  if (isRateLimited(limiterKey)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes or call us directly.' },
      { status: 429 },
    )
  }

  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 })
    }

    let body: unknown
    try {
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const validated = validateLeadSubmission(body)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const { fullName, email, phone, address, service, propertyType, timeline } = validated.data
    const { firstName, lastName } = splitFullName(fullName)

    if (validated.mode === 'appointment' && validated.appointment) {
      const booked = bookSlot({
        date: validated.appointment.date,
        slotId: validated.appointment.slotId,
        email,
        fullName,
      })
      if (!booked.ok) {
        return NextResponse.json({ error: booked.error }, { status: 409 })
      }
    }

    const payload = {
      service,
      propertyType,
      timeline,
      fullName,
      firstName,
      lastName,
      email,
      phone,
      address,
      source: 'blacktree-landing',
      submittedAt: new Date().toISOString(),
      submissionType: validated.mode,
      ...(validated.mode === 'appointment' && validated.appointment
        ? {
            appointment: buildAppointmentFields(
              validated.appointment.date,
              validated.appointment.slotId,
              validated.appointment.displayDate,
            ),
          }
        : {}),
    }

    const result = await sendLeadToWebhook(config, payload)
    if (!result.ok) {
      if (validated.mode === 'appointment' && validated.appointment) {
        releaseSlot(validated.appointment.date, validated.appointment.slotId)
      }
      return NextResponse.json(
        {
          error: result.aborted
            ? 'Request timed out. Please try again or call us.'
            : 'Could not reach booking service. Please try again.',
        },
        { status: result.aborted ? 503 : 502 },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        submissionType: validated.mode,
        ...(validated.mode === 'appointment' && validated.appointment
          ? { appointment: payload.appointment }
          : {}),
      },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    console.error('Lead API error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
