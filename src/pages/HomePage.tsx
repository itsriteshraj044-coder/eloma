import { Header }        from '../components/Header/Header'
import { FlyFooter }     from '../components/FlyFooter'
import { ConstructionNotice } from '../components/ConstructionNotice'
import { EgHeroHierarchy } from '../components/home/EgHeroHierarchy'
import { EgHierarchyBanner2 } from '../components/home/EgHierarchyBanner2'
import { EgConnected }    from '../components/home/EgConnected'
import { EgBusinesses }   from '../components/home/EgBusinesses'
import { EgCompanies }    from '../components/home/EgCompanies'
import { EgLife }         from '../components/home/EgLife'
import { EgAbout }        from '../components/home/EgAbout'
import { EgWhyExist }     from '../components/home/EgWhyExist'
import { EgFoundation }   from '../components/home/EgFoundation'

export function HomePage() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <ConstructionNotice />
      <Header />
      <main>
        <EgHeroHierarchy />
        <EgHierarchyBanner2 />
        <EgConnected />
        <EgFoundation />
        <EgBusinesses />
        <EgCompanies />
        <EgLife />
        <EgAbout />
        <EgWhyExist />
      </main>
      <FlyFooter />
    </div>
  )
}
