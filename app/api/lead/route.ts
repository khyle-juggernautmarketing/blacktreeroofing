import { NextResponse } from 'next/server'

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  'https://n8n.srv1405965.hstgr.cloud/webhook/365d9566-3a52-4794-98cd-4ecca542ccfe'

const WEBHOOK_TIMEOUT_MS = 25_000

function splitFullName(fullName: string) {
  const trimmed = fullName.trim()
  const space = trimmed.indexOf(' ')
  if (space === -1) return { firstName: trimmed, lastName: '' }
  return {
    firstName: trimmed.slice(0, space),
    lastName: trimmed.slice(space + 1).trim(),
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { service, propertyType, timeline, fullName, email, phone } = body

    const name = String(fullName ?? '').trim()
    if (!service || !propertyType || !timeline || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
    if (!emailOk) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const phoneDigits = String(phone).replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    const { firstName, lastName } = splitFullName(name)

    const payload = {
      service,
      propertyType,
      timeline,
      fullName: name,
      firstName,
      lastName,
      email,
      phone,
      source: 'blacktree-landing',
      submittedAt: new Date().toISOString(),
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

    let res: Response
    try {
      res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        cache: 'no-store',
      })
    } catch (e) {
      clearTimeout(timeout)
      const aborted = e instanceof Error && e.name === 'AbortError'
      console.error('n8n webhook fetch failed', aborted ? 'timeout' : e)
      return NextResponse.json(
        { error: aborted ? 'Request timed out. Please try again or call us.' : 'Could not reach booking service. Please try again.' },
        { status: 503 },
      )
    } finally {
      clearTimeout(timeout)
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('n8n webhook failed', res.status, text)
      return NextResponse.json({ error: 'Booking service returned an error. Please try again or call us.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Lead API error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
