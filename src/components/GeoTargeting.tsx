'use client'

import { MapPin } from 'lucide-react'
import { GEO_CITIES } from '@/lib/constants'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useSectionRevealed } from '@/context/RevealSectionContext'

export function GeoTargeting() {
  const revealed = useSectionRevealed()

  return (
    <AnimatedSection className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <MapPin className="mx-auto h-8 w-8 text-[#48D1CC]" aria-hidden />
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Areas We Serve
        </h2>
        <p className="mt-3 text-slate-600">
          Local crews, fast response times, and neighbors you can trust.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {GEO_CITIES.map((city, i) => (
            <span
              key={city}
              className={`cursor-default rounded-xl bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 shadow-sm transition-all duration-300 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 md:text-sm dark:bg-slate-800 dark:text-slate-100 ${
                revealed ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              style={{ transitionDelay: revealed ? `${i * 18}ms` : '0ms' }}
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
