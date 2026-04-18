import { useEffect, useRef } from 'react';

/**
 * Hook to get the Lenis scroll instance from App.jsx.
 * Usage:
 *   const lenis = useLenis();
 *   useEffect(() => {
 *     if (!lenis) return;
 *     const onScroll = () => console.log(lenis.scroll);
 *     lenis.on('scroll', onScroll);
 *     return () => lenis.off('scroll', onScroll);
 *   }, [lenis]);
 */
export function useLenis() {
  return window.__LENIS__;
}
