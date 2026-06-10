import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppRoutes } from '@/routes/AppRoutes';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

/** Root layout: persistent navbar + routed content + footer. */
export default function App() {
  useSmoothScroll();

  return (
    <>
      <SplashScreen />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </>
  );
}
