'use client'

import type { ReactNode } from 'react'
import { RevealSectionProvider } from '@/context/RevealSectionContext'
import { useRevealOnView } from '@/hooks/useRevealOnView'
import { revealY } from '@/lib/motionClasses'

export function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  const { ref, revealed } = useRevealOnView({
    rootMargin: '-100px 0px',
    threshold: 0.08,
  })

  return (
    <RevealSectionProvider value={revealed}>
      <section ref={ref} id={id} className={className}>
        <div className={`duration-600 ease-out ${revealY(revealed, 'translate-y-5')}`}>{children}</div>
      </section>
    </RevealSectionProvider>
  )
}
