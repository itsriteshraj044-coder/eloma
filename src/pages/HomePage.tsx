// import { SplashScreen } from '../components/SplashScreen'
import { Header } from '../components/Header/Header'
import { Hero7 } from '../components/Hero7'
import { Hero2Section } from '../components/Hero2Section'
import { Hero3Section } from '../components/Hero3Section'
import { Hero4Section } from '../components/Hero4Section'
import { OurWorld } from '../components/OurWorld'
import { OurBusinesses } from '../components/OurBusinesses'
import { Testimonials } from '../components/Testimonials'
import { FooterCTA } from '../components/FooterCTA'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      {/* <SplashScreen /> */}
      <Header />
      <main>
        <Hero7 />
        <Hero2Section />
        <Hero3Section />
        <Hero4Section />
        <OurWorld />
        <OurBusinesses />
        <Testimonials />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
