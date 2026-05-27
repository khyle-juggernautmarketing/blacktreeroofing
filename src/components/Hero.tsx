'use client'

import { ArrowRight, CheckCircle2, Star } from 'lucide-react'
import Image from 'next/image'
import { VALUE_PROPS, PHONE, PHONE_HREF } from '@/lib/constants'
import { LeadForm } from '@/components/LeadForm'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/50">
      {/* Atmospheric photo + layered gradients */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          className="object-cover object-[center_35%] opacity-[0.2] sm:opacity-[0.26]"
          sizes="100vw"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/92 to-teal-50/45" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_15%_0%,rgba(72,209,204,0.2),transparent_58%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_30%,rgba(14,165,233,0.1),transparent_50%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.5)_35%,transparent_55%,rgba(72,209,204,0.08)_100%)]"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute -left-1/4 top-0 h-[120%] w-[70%] bg-[radial-gradient(ellipse_at_center,rgba(72,209,204,0.14),transparent_62%)]" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[28rem] w-[28rem] translate-x-1/4 rounded-full bg-gradient-to-br from-teal-300/15 via-[#48D1CC]/10 to-transparent blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="hero-line hero-line-d0 inline-flex items-center gap-2 rounded-full border border-[#48D1CC]/40 bg-gradient-to-r from-white/90 to-teal-50/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-800 shadow-[0_0_24px_rgba(72,209,204,0.25)] backdrop-blur-md">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Serving Eagle, Idaho &amp; Surrounding Areas
          </p>

          <h1 className="hero-line hero-line-d1 mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Protect Your Home With the Treasure Valley&apos;s Most Trusted{' '}
            <span className="bg-gradient-to-r from-slate-900 via-[#238a84] to-[#48D1CC] bg-clip-text text-transparent">
              Roofing Experts
            </span>
          </h1>

          <p className="hero-line hero-line-d2 mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Get a fast roof inspection, reliable repair quote, or full replacement estimate from local professionals who care.
          </p>

          <ul className="hero-line hero-line-d3 mt-8 space-y-3">
            {VALUE_PROPS.map((prop) => (
              <li key={prop} className="flex items-start gap-3 text-slate-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#48D1CC]" aria-hidden />
                <span className="font-medium">{prop}</span>
              </li>
            ))}
          </ul>

          <div className="hero-line hero-line-d3 mt-6 flex flex-wrap items-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3ab8b3] to-[#48D1CC] px-8 text-base font-bold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(72,209,204,0.55)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:hover:shadow-md"
            >
              Call {PHONE}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
            <div className="flex items-center gap-2 rounded-full border border-amber-200/60 bg-gradient-to-r from-amber-50/90 to-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm">
              <div className="flex" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5 · 100+ homeowners</span>
            </div>
          </div>
        </div>

        <div className="animate-hero-aside w-full lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 to-teal-50/30 p-5 shadow-glass backdrop-blur-md sm:p-6">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(72,209,204,0.35),transparent_70%)]"
              aria-hidden
            />
            <div className="relative">
              <p className="mb-1 text-center text-sm font-semibold text-slate-900">Get your free quote</p>
              <p className="mb-4 text-center text-xs text-slate-500">Takes less than 60 seconds</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 h-px bg-gradient-to-r from-transparent via-[#48D1CC]/60 to-transparent shadow-[0_0_12px_rgba(72,209,204,0.35)]"
        aria-hidden
      />
    </section>
  )
}
