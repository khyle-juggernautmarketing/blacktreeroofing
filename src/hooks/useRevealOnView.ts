'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Scroll reveal: `revealed` stays false for SSR + first client paint, then flips
 * after mount via IntersectionObserver (avoids hydration mismatch vs whileInView).
 */
export function useRevealOnView(options?: { rootMargin?: string; threshold?: number }) {
  const { rootMargin = '-60px 0px', threshold = 0.08 } = options ?? {}
  const ref = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return { ref, revealed }
}
