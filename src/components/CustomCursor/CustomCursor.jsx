import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const onMouseDown = () => {
      setClicking(true);
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onMouseUp = () => {
      setClicking(false);
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
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

    const onMouseEnterLink = () => setHovering(true);
    const onMouseLeaveLink = () => setHovering(false);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], .work-card-item, .service-card, .bento-card, .testimonial-card, .award-card, .stat-card'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const handleHover = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], .work-card-item, .service-card, .bento-card, .testimonial-card, .award-card, .stat-card'
      );
      if (target) {
        setHovering(true);
        ring.classList.add('hovering');
      } else {
        setHovering(false);
        ring.classList.remove('hovering');
      }
    };

    window.addEventListener('mouseover', handleHover);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleHover);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
