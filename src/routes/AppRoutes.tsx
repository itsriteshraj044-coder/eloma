import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';

/**
 * Application routes. The homepage is the only built route; unknown paths
 * fall back to it so deep links never dead-end.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
