'use client'

import { createContext, useContext, type ReactNode } from 'react'

const RevealSectionContext = createContext<boolean | undefined>(undefined)

/**
 * When true, the section has intersected the viewport (after mount).
 * Outside an AnimatedSection provider, defaults to true so one-off motion still works.
 */
export function useSectionRevealed(): boolean {
  const v = useContext(RevealSectionContext)
  if (v === undefined) return true
  return v
}

export function RevealSectionProvider({
  value,
  children,
}: {
  value: boolean
  children: ReactNode
}) {
  return <RevealSectionContext.Provider value={value}>{children}</RevealSectionContext.Provider>
}
