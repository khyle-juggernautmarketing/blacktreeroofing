'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      {/* Glowing announcement strip */}
      <div className="relative overflow-hidden border-b border-teal-400/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-2.5 text-center text-sm font-medium text-white animate-banner-glow">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(72,209,204,0.12),transparent)]"
          aria-hidden
        />
        <span className="relative">
          <span aria-hidden>🌲 </span>
          Serving the Treasure Valley &amp; Surrounding Areas — Call Our Emergency Line Immediately:{' '}
          <a
            href={PHONE_HREF}
            className="font-semibold text-[#48D1CC] underline decoration-[#48D1CC]/60 underline-offset-2 transition-colors hover:text-teal-200"
            aria-label={`Call Black Tree Roofing emergency line at ${PHONE}`}
          >
            {PHONE}
          </a>
        </span>
      </div>

      <div
        className={`border-b border-white/10 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'bg-slate-900/95 shadow-lg shadow-black/20' : 'bg-slate-900/90'
        } text-white`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="#" className="relative h-16 w-48 shrink-0 sm:h-[4.5rem] sm:w-56" aria-label="Black Tree Roofing home">
            <Image
              src="/Logo.png"
              alt="Black Tree Roofing LLC — Rooted in Quality"
              fill
              className="object-contain object-left brightness-0 invert"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-[#48D1CC]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="relative inline-flex rounded-xl p-[1.5px] animate-pulse-call-ring">
              <span
                className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#48D1CC] via-teal-200 to-[#48D1CC] opacity-60 blur-[6px]"
                aria-hidden
              />
              <a
                href={PHONE_HREF}
                className="relative inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-slate-950 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20 transition-all duration-300 hover:ring-[#48D1CC]/60"
                aria-label={`Call now ${PHONE}`}
              >
                <Phone className="h-4 w-4 text-[#48D1CC]" aria-hidden />
                Call Now: {PHONE}
              </a>
            </span>
            <Button href="#contact" variant="primary" className="shadow-[0_0_20px_rgba(72,209,204,0.35)] hover:shadow-[0_0_25px_rgba(72,209,204,0.5)]">
              Free Quote
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-white/10 bg-slate-900 p-6 text-white shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              aria-label="Mobile navigation"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-bold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-h-12 min-w-12 rounded-xl hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="mx-auto h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="nav-mobile-link block min-h-12 rounded-xl px-4 py-3 text-lg font-medium text-white/90 hover:bg-white/10"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto space-y-3 pt-8">
                <a
                  href={PHONE_HREF}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#48D1CC] font-semibold text-[#48D1CC]"
                >
                  <Phone className="h-5 w-5" /> Call Now: {PHONE}
                </a>
                <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>
                  Free Quote
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
