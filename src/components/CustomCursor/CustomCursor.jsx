import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .work-card-item, .service-card, .bento-card, .expertise-card, .award-card, .stat-card';

// Performance: hide on touch devices
const isTouchDevice = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const isIdleRef = useRef(true);
  const listenersTrackedRef = useRef(new Set());

  useEffect(() => {
    if (typeof window === 'undefined' || isTouchDevice()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const stopAnimation = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isIdleRef.current = true;
    };

    const startAnimation = () => {
      if (!isIdleRef.current) return;
      isIdleRef.current = false;
      animate();
    };

    const animate = () => {
      if (isIdleRef.current) return;

      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12);
      ring.style.left = ringPosRef.current.x + 'px';
      ring.style.top = ringPosRef.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';

      // Reset idle timer
      clearTimeout(idleTimeoutRef.current);
      startAnimation();
      idleTimeoutRef.current = setTimeout(stopAnimation, 2000);
    };

    const onMouseDown = () => {
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onMouseUp = () => {
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
    };

    const addListeners = () => {
      const interactives = document.querySelectorAll(INTERACTIVE_SELECTOR);
      interactives.forEach((el) => {
        if (listenersTrackedRef.current.has(el)) return;
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        listenersTrackedRef.current.add(el);
      });
    };

    addListeners();

    // Optimized: only observe direct children, not entire subtree
    // Use event delegation via root app element instead
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        requestIdleCallback(() => addListeners(), { timeout: 1000 });
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      stopAnimation();
      clearTimeout(idleTimeoutRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      listenersTrackedRef.current.clear();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
