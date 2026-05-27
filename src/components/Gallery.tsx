'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { GALLERY_IMAGES } from '@/lib/constants'
import { revealY } from '@/lib/motionClasses'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useSectionRevealed } from '@/context/RevealSectionContext'

export function Gallery() {
  const revealed = useSectionRevealed()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeIndex, close])

  const active = activeIndex !== null ? GALLERY_IMAGES[activeIndex] : null

  return (
    <AnimatedSection id="gallery" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-teal-50/40 via-slate-50/90 to-white" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(72,209,204,0.22),transparent_68%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#48D1CC]">Our Work</p>
          <h2 className="mt-2 bg-gradient-to-r from-slate-900 via-slate-800 to-[#2a8f8a] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Roofing Project Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Real jobs across the Treasure Valley — replacements, repairs, and craftsmanship you can see.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`group relative block w-full overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-b from-white/70 to-teal-50/20 p-[1px] text-left shadow-glass backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#48D1CC]/40 hover:shadow-[0_16px_48px_-12px_rgba(72,209,204,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#48D1CC] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: revealed ? `${i * 70}ms` : '0ms' }}
              onClick={() => setActiveIndex(i)}
            >
              <div className="relative overflow-hidden rounded-[15px] bg-slate-900/5">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#48D1CC]/20 via-transparent to-slate-950/50 mix-blend-multiply opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-teal-500/10 opacity-95 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                    <span className="text-sm font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {img.caption}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-white/35 to-white/10 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/30">
                      <ZoomIn className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          className={`relative mt-12 overflow-hidden rounded-2xl p-[1px] duration-[500ms] ${revealY(revealed, 'translate-y-4')}`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#48D1CC]/45 via-sky-400/25 to-teal-400/35 opacity-90"
            aria-hidden
          />
          <div className="relative rounded-2xl border border-white/50 bg-gradient-to-br from-white/95 via-teal-50/30 to-slate-50/90 p-8 text-center shadow-glass backdrop-blur-md">
            <h3 className="text-xl font-bold text-slate-900">Ready for results like these on your home?</h3>
            <p className="mt-2 text-slate-600">
              Schedule a free inspection and see why Treasure Valley homeowners trust Black Tree Roofing.
            </p>
            <div className="mt-6">
              <Button href="#contact">Get My Free Quote</Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-teal-950/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded gallery image"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_60px_rgba(72,209,204,0.2)]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain bg-gradient-to-b from-slate-950 to-slate-900"
                  sizes="100vw"
                  priority
                />
              </div>
              <p className="bg-gradient-to-r from-white via-teal-50/50 to-white px-4 py-3 text-center text-sm font-semibold text-slate-800">
                {active.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  )
}
