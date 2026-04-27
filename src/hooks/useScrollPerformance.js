/**
 * src/hooks/useScrollPerformance.js
 *
 * High-performance scroll management hook
 *
 * Features:
 * - Single Lenis instance initialization
 * - Proper GSAP/ScrollTrigger synchronization
 * - RAF-batched scroll callbacks
 * - ResizeObserver for responsive updates
 * - Memory-safe cleanup
 *
 * Usage:
 *   const { lenis, scrollY, progress } = useScrollPerformance();
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { initLenis, destroyLenis, getLenis } from '../lib/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Shared scroll state - updated via RAF for batched React updates
let sharedScrollY = 0;
let sharedProgress = 0;
let subscribers = new Set();

/**
 * Notify all subscribers of scroll state change
 * Uses RAF internally to batch updates
 */
function notifySubscribers() {
  subscribers.forEach((callback) => {
    callback(sharedScrollY, sharedProgress);
  });
}

/**
 * useScrollPerformance - Main hook for scroll management
 *
 * @param {Object} options
 * @param {boolean} options.enableProgressBar - Add scroll progress bar to DOM
 * @param {boolean} options.enableScrollState - Enable shared scroll state
 * @returns {Object} { lenis, scrollY, progress, isScrolling }
 */
export function useScrollPerformance(options = {}) {
  const {
    enableProgressBar = false,
    enableScrollState = false,
  } = options;

  const lenisRef = useRef(null);
  const progressBarRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastProgressRef = useRef(-1);

  // Only use state if scroll state is enabled
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Timeout ref for debouncing isScrolling
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = initLenis();

    // ═══════════════════════════════════════════════════════════════════
    // SCROLL PROGRESS BAR (Optional)
    // ═══════════════════════════════════════════════════════════════════
    if (enableProgressBar) {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress-bar';
      progressBar.style.willChange = 'transform';
      progressBar.style.transform = 'translateZ(0)';
      document.body.appendChild(progressBar);
      progressBarRef.current = progressBar;

      // Add lenis class to html for CSS targeting
      document.documentElement.classList.add('lenis');
    }

    // ═══════════════════════════════════════════════════════════════════
    // RESIZE OBSERVER - Better than window resize event
    // ═══════════════════════════════════════════════════════════════════
    //
    // ResizeObserver:
    // 1. Fires more predictably than resize event
    // 2. Can observe specific elements, not just window
    // 3. Debounces automatically for performance
    const ro = new ResizeObserver(() => {
      // Trigger Lenis resize recalculation
      lenisRef.current?.resize();
      // Refresh ScrollTrigger to account for new dimensions
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);

    // ═══════════════════════════════════════════════════════════════════
    // SCROLL STATE SYNC - Batched via RAF
    // ═══════════════════════════════════════════════════════════════════
    //
    // Instead of updating React state on every scroll event,
    // we batch updates using requestAnimationFrame.
    // This reduces re-renders from ~60/sec to ~60/sec max,
    // but eliminates redundant renders when scroll position hasn't changed.

    const handleScroll = ({ progress, scroll, velocity }) => {
      // Update shared scroll values
      sharedScrollY = scroll;
      sharedProgress = progress;

      // Skip if progress hasn't changed (avoid redundant updates)
      if (progress === lastProgressRef.current) {
        return;
      }
      lastProgressRef.current = progress;

      // Cancel any pending RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Schedule state update on next RAF
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        // Update progress bar directly (DOM manipulation, no state)
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }

        // Update React state only if enabled
        if (enableScrollState) {
          setScrollY(scroll);
          setProgress(progress);
          setIsScrolling(true);
        }

        // Notify subscribers
        notifySubscribers();

        // Clear isScrolling after 150ms of no scroll
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      });
    };

    // Attach scroll listener
    lenisRef.current.on('scroll', handleScroll);

    // ═══════════════════════════════════════════════════════════════════
    // CLEANUP
    // ═══════════════════════════════════════════════════════════════════
    return () => {
      // Disconnect ResizeObserver
      ro.disconnect();

      // Cancel pending RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Clear scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }

      // Remove scroll listener
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll);
      }

      // Remove progress bar
      if (progressBarRef.current) {
        progressBarRef.current.remove();
        progressBarRef.current = null;
      }

      // Remove lenis class
      document.documentElement.classList.remove('lenis');

      // Reset last progress
      lastProgressRef.current = -1;
    };
  }, [enableProgressBar, enableScrollState]);

  return {
    lenis: lenisRef.current || getLenis(),
    scrollY,
    progress,
    isScrolling,
  };
}

/**
 * useScrollProgress - Lightweight hook for scroll position
 * Use this for components that only need scroll progress
 *
 * @param {Function} callback - Called with (scrollY, progress)
 * @returns {Object} { ref } - Attach ref to observed element (optional)
 */
export function useScrollProgress(callback) {
  const rafIdRef = useRef(null);
  const lastScrollRef = useRef(-1);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handleScroll = ({ scroll, progress }) => {
      // Skip if no change
      if (scroll === lastScrollRef.current) return;
      lastScrollRef.current = scroll;

      // Cancel pending RAF
      if (rafIdRef.current) return;

      // Batch callback via RAF
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        callback(scroll, progress);
      });
    };

    lenis.on('scroll', handleScroll);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.off('scroll', handleScroll);
    };
  }, [callback]);
}

/**
 * useScrollProgressRef - Get scroll position without state updates
 * Uses refs for maximum performance
 *
 * @returns {Object} { scrollY, progress, scrollYRef, progressRef }
 */
export function useScrollProgressRef() {
  const scrollYRef = useRef(0);
  const progressRef = useRef(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handleScroll = ({ scroll, progress }) => {
      // Skip if no change
      if (scroll === scrollYRef.current && progress === progressRef.current) {
        return;
      }

      // Cancel pending RAF
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        scrollYRef.current = scroll;
        progressRef.current = progress;
      });
    };

    lenis.on('scroll', handleScroll);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.off('scroll', handleScroll);
    };
  }, []);

  return {
    scrollY: scrollYRef.current,
    progress: progressRef.current,
    scrollYRef,
    progressRef,
  };
}
