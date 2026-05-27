'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { SERVICE_ROWS } from '@/lib/constants'
import { revealY } from '@/lib/motionClasses'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useSectionRevealed } from '@/context/RevealSectionContext'

const bento = [
  { span: 'lg:col-span-7 lg:row-span-1', delay: 0 },
  { span: 'lg:col-span-5 lg:row-span-1', delay: 60 },
  { span: 'lg:col-span-12', delay: 120 },
] as const

export function Services() {
  const revealed = useSectionRevealed()

  return (
    <AnimatedSection id="services" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Complete Roofing Solutions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            From quick repairs to full replacements — expert care for every roof in the Treasure Valley.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {SERVICE_ROWS.map((row, idx) => {
            const layout = bento[idx] ?? bento[0]
            return (
              <article
                key={row.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-glass backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-[#48D1CC]/45 hover:shadow-[0_12px_40px_-8px_rgba(72,209,204,0.2)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${layout.span} ${revealY(revealed, 'translate-y-8')}`}
                style={{ transitionDelay: revealed ? `${layout.delay}ms` : '0ms' }}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 ${'reverse' in row && row.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className={`flex flex-col justify-center p-6 sm:p-8 ${'reverse' in row && row.reverse ? 'md:order-2' : ''}`}>
                    <h3 className="text-2xl font-bold text-slate-900">{row.title}</h3>
                    <p className="mt-4 leading-relaxed text-slate-600">{row.description}</p>
                    <div className="mt-6">
                      <Button
                        href="#contact"
                        variant="primary"
                        className="group/btn inline-flex items-center gap-2 hover:shadow-[0_0_25px_rgba(72,209,204,0.5)]"
                      >
                        {row.cta}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-2" aria-hidden />
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`relative min-h-[220px] overflow-hidden sm:min-h-[280px] ${'reverse' in row && row.reverse ? 'md:order-1' : ''}`}
                  >
                    <Image
                      src={row.image}
                      alt={row.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#48D1CC]/10 via-transparent to-slate-900/25 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
