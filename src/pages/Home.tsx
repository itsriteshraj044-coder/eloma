import { Hero } from '@/components/sections/Hero';
import { ConnectedGlobally } from '@/components/sections/ConnectedGlobally';
// import { BusinessUniverse } from '@/components/sections/BusinessUniverse';
import { BusinessIndex } from '@/components/sections/BusinessIndex';
import { BusinessShowcase } from '@/components/sections/BusinessShowcase';
import { Companies } from '@/components/sections/Companies';
import { CompaniesGallery } from '@/components/sections/CompaniesGallery';
// import { CompaniesPostcards } from '@/components/sections/CompaniesPostcards';
import { CompaniesPanorama } from '@/components/sections/CompaniesPanorama';
// import { CompaniesMosaic } from '@/components/sections/CompaniesMosaic';
import { CompaniesShowreel } from '@/components/sections/CompaniesShowreel';
// import { About } from '@/components/sections/About';
// import { AboutKinetic } from '@/components/sections/AboutKinetic';
import { AboutMask } from '@/components/sections/AboutMask';
import { AboutCinema } from '@/components/sections/AboutCinema';
// import { Sustainability } from '@/components/sections/Sustainability';
import { SustainAtmosphere } from '@/components/sections/SustainAtmosphere';
import { SustainMatrix } from '@/components/sections/SustainMatrix';
import { GlobalCapabilities } from '@/components/sections/GlobalCapabilities';
import { CapabilitiesBlueprint } from '@/components/sections/CapabilitiesBlueprint';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <ConnectedGlobally />
      {/* <BusinessUniverse /> */}
      <BusinessIndex />
      <BusinessShowcase />
      <Companies />
      <CompaniesGallery />
      {/* <CompaniesPostcards /> */}
      <CompaniesPanorama />
      {/* <CompaniesMosaic /> */}
      <CompaniesShowreel />
      {/* <About /> */}
      {/* <AboutKinetic /> */}
      <AboutMask />
      <AboutCinema />
      {/* <Sustainability /> */}
      <SustainAtmosphere />
      <SustainMatrix />
      <GlobalCapabilities />
      <CapabilitiesBlueprint />
      <Contact />
    </main>
  );
}
