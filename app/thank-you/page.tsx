import { CalendarCheck, CheckCircle2, Home, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { formatDisplayDate } from '@/lib/booking'
import { PHONE, PHONE_HREF } from '@/lib/constants'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Thank You | Black Tree Roofing',
  description: 'Your appointment request has been received. Black Tree Roofing will confirm your visit soon.',
  robots: { index: false, follow: false },
}

type ThankYouPageProps = {
  searchParams: Promise<{ date?: string; slot?: string; name?: string }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams
  const date = params.date?.trim() ?? ''
  const slot = params.slot?.trim() ?? ''
  const name = params.name?.trim() ?? ''
  const hasAppointment = Boolean(date && slot)

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(72,209,204,0.14),transparent_60%)]" aria-hidden />

        <div className="relative z-10 w-full max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-glass backdrop-blur-xl">
            <div className="border-b border-[#48D1CC]/20 bg-gradient-to-r from-[#48D1CC]/10 via-teal-50/80 to-white px-6 py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#48D1CC]/15">
                <CheckCircle2 className="h-9 w-9 text-[#48D1CC]" aria-hidden />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {hasAppointment ? "You're all set!" : 'Thank you!'}
              </h1>
              <p className="mt-2 text-slate-600">
                {name ? `${name.split(' ')[0]}, your` : 'Your'} request has been received by Black Tree Roofing.
              </p>
            </div>

            <div className="space-y-5 px-6 py-8">
              {hasAppointment && (
                <div className="rounded-xl border border-[#48D1CC]/30 bg-[#48D1CC]/5 p-4">
                  <div className="flex items-start gap-3">
                    <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#48D1CC]" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Scheduled appointment</p>
                      <p className="mt-1 text-sm text-slate-700">{formatDisplayDate(date)}</p>
                      <p className="text-sm text-slate-700">
                        {slot} <span className="text-slate-500">MST</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm leading-relaxed text-slate-600">
                Our team will reach out shortly to confirm your visit. For urgent leaks or storm damage, call our
                emergency line right away.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={PHONE_HREF}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3ab8b3] to-[#48D1CC] px-6 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(72,209,204,0.55)] motion-reduce:hover:translate-y-0"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call {PHONE}
                </a>
                <Link
                  href="/"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-[#48D1CC] hover:bg-[#48D1CC]/5"
                >
                  <Home className="h-4 w-4" aria-hidden />
                  Back to Home
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 text-center">
              <Link href="/" className="inline-block" aria-label="Black Tree Roofing home">
                <Image
                  src="/Logo.png"
                  alt="Black Tree Roofing LLC"
                  width={140}
                  height={48}
                  className="mx-auto h-10 w-auto object-contain opacity-80"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
