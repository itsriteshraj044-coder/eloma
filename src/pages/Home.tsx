import { Hero } from '@/components/sections/Hero';
import { ConnectedGlobally } from '@/components/sections/ConnectedGlobally';
import { BusinessStructure } from '@/components/sections/BusinessStructure';
import { CompaniesOrbit } from '@/components/sections/CompaniesOrbit';
import { Companies3D } from '@/components/sections/Companies3D';
import { CompaniesPortfolio } from '@/components/sections/CompaniesPortfolio';
import { AboutMask } from '@/components/sections/AboutMask';
import { SustainBento } from '@/components/sections/SustainBento';
import { CapabilitiesBlueprint } from '@/components/sections/CapabilitiesBlueprint';
import { ContactSignal } from '@/components/sections/ContactSignal';

export default function Home() {
  return (
    <main>
      <Hero />
      <ConnectedGlobally />
      <BusinessStructure />
      <CompaniesOrbit />
      <Companies3D />
      <CompaniesPortfolio />
      <AboutMask />
      <SustainBento />
      <CapabilitiesBlueprint />
      <ContactSignal />
    </main>
  );
}
