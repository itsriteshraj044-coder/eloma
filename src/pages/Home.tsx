import { Hero } from '@/components/sections/Hero';
import { ConnectedGlobally } from '@/components/sections/ConnectedGlobally';
import { BusinessUniverse } from '@/components/sections/BusinessUniverse';
import { Companies } from '@/components/sections/Companies';
import { About } from '@/components/sections/About';
import { Sustainability } from '@/components/sections/Sustainability';
import { GlobalPresence } from '@/components/sections/GlobalPresence';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <ConnectedGlobally />
      <BusinessUniverse />
      <Companies />
      <About />
      <Sustainability />
      <GlobalPresence />
      <Contact />
    </main>
  );
}
