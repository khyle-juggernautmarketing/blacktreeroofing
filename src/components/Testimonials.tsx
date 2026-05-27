'use client'

import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { revealY } from '@/lib/motionClasses'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useSectionRevealed } from '@/context/RevealSectionContext'

export function Testimonials() {
  const revealed = useSectionRevealed()

  return (
    <AnimatedSection id="testimonials" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What Homeowners Say
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-stretch md:justify-center md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`flex flex-1 flex-col rounded-2xl border border-white/40 bg-white/80 p-6 shadow-glass backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glass-lg motion-reduce:hover:translate-y-0 md:min-w-0 ${revealY(revealed, 'translate-y-6')}`}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
            >
              <div className="flex shrink-0 gap-1" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-slate-600 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <h3 className="mt-4 font-bold text-slate-900">{t.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
