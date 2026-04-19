import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .work-card-item, .service-card, .bento-card, .expertise-card, .award-card, .stat-card';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const listenersTrackedRef = useRef(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const onMouseDown = () => {
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onMouseUp = () => {
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
    };

    const onMouseOver = (e) => {
      const target = e.target.closest(INTERACTIVE_SELECTOR);
      if (target) {
        ring.classList.add('hovering');
      } else {
        ring.classList.remove('hovering');
      }
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

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12);
      ring.style.left = ringPosRef.current.x + 'px';
      ring.style.top = ringPosRef.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    addListeners();

    const observer = new MutationObserver(() => {
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
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
