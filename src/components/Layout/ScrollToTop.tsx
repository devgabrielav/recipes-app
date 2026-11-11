import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Volta ao topo a cada troca de página (o router não faz isso sozinho). */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try { window.scrollTo(0, 0); } catch { /* jsdom */ }
  }, [pathname]);
  return null;
}
