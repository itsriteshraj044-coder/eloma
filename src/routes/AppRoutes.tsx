import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Careers from '@/pages/Careers';
import OurPartners from '@/pages/OurPartners';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import LegalPage from '@/pages/LegalPage';

/**
 * Application routes. The homepage, About Us, Our Partners, the Blog
 * (dashboard + article view) and the legal pages are the built routes; unknown
 * paths fall back to home so deep links never dead-end.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/partners" element={<OurPartners />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy-policy" element={<LegalPage doc="privacy-policy" />} />
      <Route path="/terms-of-use" element={<LegalPage doc="terms-of-use" />} />
      <Route path="/modern-slavery-statement" element={<LegalPage doc="modern-slavery-statement" />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
