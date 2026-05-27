import { Gallery } from '@/components/Gallery'
import { Comparison } from '@/components/Comparison'
import { Footer } from '@/components/Footer'
import { GeoTargeting } from '@/components/GeoTargeting'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Services } from '@/components/Services'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <Services />
        <Gallery />
        <Testimonials />
        <GeoTargeting />
      </main>
      <Footer />
    </>
  )
}
