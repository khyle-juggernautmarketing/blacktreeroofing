'use client'

import { Check, X } from 'lucide-react'
import { COMPARISON_STATS, COMPARISON_THEM, COMPARISON_US } from '@/lib/constants'
import { revealY } from '@/lib/motionClasses'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useSectionRevealed } from '@/context/RevealSectionContext'

export function Comparison() {
  const revealed = useSectionRevealed()

  return (
    <AnimatedSection id="comparison" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Black Tree Roofing?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            A straightforward look at how we stack up against typical contractors in the Treasure Valley.
          </p>
        </div>

        <div
          className={`mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 duration-500 ${revealY(revealed, 'translate-y-3')}`}
        >
          {COMPARISON_STATS.map((stat) => (
            <div key={stat.label} className="min-w-[7rem] text-center">
              <p className="text-2xl font-extrabold text-[#48D1CC] sm:text-3xl">{stat.value}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-600 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-glass backdrop-blur-sm duration-500 ${revealY(revealed, 'translate-y-4')}`}
        >
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/80 text-center text-sm font-bold sm:text-base">
            <div className="border-r border-slate-200 bg-gradient-to-br from-[#48D1CC]/12 to-white px-4 py-4 text-slate-900 sm:px-6">
              Black Tree Roofing
            </div>
            <div className="px-4 py-4 text-slate-500 sm:px-6">Other Roofers</div>
          </div>

          <ul className="divide-y divide-slate-100">
            {COMPARISON_US.map((us, i) => (
              <li key={us} className="grid grid-cols-2">
                <div className="flex items-start justify-center gap-2.5 border-r border-slate-100 px-4 py-3.5 text-center sm:gap-3 sm:px-6 sm:py-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#48D1CC]" strokeWidth={2.5} aria-hidden />
                  <span className="text-sm leading-snug text-slate-800">{us}</span>
                </div>
                <div className="flex items-start justify-center gap-2.5 bg-slate-50/60 px-4 py-3.5 text-center sm:gap-3 sm:px-6 sm:py-4">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={2.5} aria-hidden />
                  <span className="text-sm leading-snug text-slate-600">{COMPARISON_THEM[i]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`mt-10 text-center duration-500 ${revealY(revealed, 'translate-y-2')}`}>
          <Button href="#contact" variant="primary" className="hover:shadow-[0_0_25px_rgba(72,209,204,0.5)]">
            Get Your Free Estimate
          </Button>
          <p className="mt-3 text-sm text-slate-500">No pressure. No hidden fees.</p>
        </div>
      </div>
    </AnimatedSection>
  )
}
