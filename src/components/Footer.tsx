'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FOOTER_SERVICES, NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-16 text-slate-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4 md:gap-10">
        <div>
          <div className="relative mb-4 h-14 w-40">
            <Image
              src="/Logo.png"
              alt="Black Tree Roofing"
              fill
              className="object-contain object-left brightness-0 invert"
            />
          </div>
          <p className="text-sm leading-relaxed">
            Reliable, high-quality roofing designed to protect your home and enhance its value across the Treasure Valley.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-[#48D1CC]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Services</h3>
          <ul className="space-y-2 text-sm">
            {FOOTER_SERVICES.map((s) => (
              <li key={s}>
                <a href="#services" className="transition-colors hover:text-[#48D1CC]">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Emergency contact</h3>
          <p className="text-sm text-slate-500">Mon–Fri: 7AM–6PM · Sat: By appointment</p>
          <a
            href={PHONE_HREF}
            className="mt-4 inline-flex items-center rounded-xl border border-[#48D1CC]/40 bg-[#48D1CC]/10 px-4 py-3 text-lg font-bold tracking-tight text-[#48D1CC] shadow-[0_0_20px_rgba(72,209,204,0.15)] transition-all duration-300 hover:border-[#48D1CC] hover:shadow-[0_0_28px_rgba(72,209,204,0.35)]"
          >
            {PHONE}
          </a>
          <p className="mt-6 text-xs text-slate-600">
            <Link href="#" className="underline-offset-2 transition-colors hover:text-slate-300">
              Privacy Policy
            </Link>
            <span className="mx-2 text-slate-700">·</span>
            <Link href="#" className="underline-offset-2 transition-colors hover:text-slate-300">
              Terms of service
            </Link>
          </p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
        ©{' '}
        <span suppressHydrationWarning>{new Date().getFullYear()}</span>{' '}
        Black Tree Roofing LLC. All rights reserved.
      </div>
    </footer>
  )
}
