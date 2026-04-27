import { useEffect, useRef, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const latestScrollYRef = useRef(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const getCurrentScrollY = () => {
      const lenis = window.__LENIS__;
      return typeof lenis?.scroll === 'number' ? lenis.scroll : (window.scrollY || window.pageYOffset || 0);
    };

    const handleScroll = (event) => {
      latestScrollYRef.current = typeof event?.scroll === 'number' ? event.scroll : getCurrentScrollY();
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 2;
        const nextVisible = latestScrollYRef.current > threshold;
        if (nextVisible !== visibleRef.current) {
          visibleRef.current = nextVisible;
          setVisible(nextVisible);
        }
        rafRef.current = null;
      });
    };

    const lenis = window.__LENIS__;
    if (lenis?.on && lenis?.off) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScroll({ scroll: getCurrentScrollY() });

    return () => {
      if (lenis?.on && lenis?.off) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollUp = () => {
    const lenis = window.__LENIS__;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      className="scroll-to-top"
      aria-label="Scroll to top"
      style={{ position: 'static' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
