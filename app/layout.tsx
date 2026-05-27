import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://blacktreeroofing.com'),
  title: 'Black Tree Roofing | Treasure Valley Roof Repair & Replacement',
  description:
    'Trusted Treasure Valley roofing experts for free inspections, repairs, replacements, and storm damage. Licensed local pros with premium warranties.',
  openGraph: {
    title: 'Black Tree Roofing | Treasure Valley Roofing Experts',
    description:
      'Free roof inspections, reliable repairs, and full replacements from local professionals who care.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/hero-bg.webp', width: 1200, height: 630, alt: 'Professional residential roofing' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 antialiased">
        {/* Premium canvas: layered mesh + radial depth (fixed under content) */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-slate-50" aria-hidden />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-teal-500/12 via-cyan-50/40 to-slate-50"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_85%_-5%,rgba(72,209,204,0.16),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_0%_50%,rgba(14,165,233,0.06),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_10%_90%,rgba(15,23,42,0.05),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-slate-200/30"
          aria-hidden
        />
        {children}
      </body>
    </html>
  )
}
