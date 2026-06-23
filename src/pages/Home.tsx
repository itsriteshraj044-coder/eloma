import { Hero } from '@/components/sections/Hero';
import { ConnectedGlobally } from '@/components/sections/ConnectedGlobally';
import { BusinessStructure } from '@/components/sections/BusinessStructure';
import { CompaniesPortfolio } from '@/components/sections/CompaniesPortfolio';
import { AboutMask } from '@/components/sections/AboutMask';
import { SustainBento } from '@/components/sections/SustainBento';
import { CapabilitiesBlueprint } from '@/components/sections/CapabilitiesBlueprint';
import { ContactImmersive } from '@/components/sections/ContactImmersive';
import { OurOffices } from '@/components/sections/OurOffices';

export default function Home() {
  return (
    <main>
      <Hero />
      <ConnectedGlobally />
      <BusinessStructure />
      <CompaniesPortfolio />
      <AboutMask />
      <SustainBento />
      <CapabilitiesBlueprint />
      <ContactImmersive />
      <OurOffices />
    </main>
  );
}
