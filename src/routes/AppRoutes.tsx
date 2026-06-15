import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import OurPartners from '@/pages/OurPartners';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';

/**
 * Application routes. The homepage, About Us, Our Partners, and the Blog
 * (dashboard + article view) are the built routes; unknown paths fall back to
 * home so deep links never dead-end.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/partners" element={<OurPartners />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
