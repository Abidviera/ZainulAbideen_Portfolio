/**
 * src/lib/lenis.js
 *
 * Optimized Lenis smooth scroll library setup.
 * - Single source of truth for Lenis instance
 * - Properly synced with GSAP ticker
 * - ScrollTrigger integration for GSAP animations
 * - RAF-batched callbacks for performance
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Module-level singleton instance
let lenisInstance = null;

// Stored RAF callback reference for proper cleanup
let rafCallback = null;

/**
 * Initialize Lenis with optimized settings
 * @returns {Lenis} The Lenis instance
 */
export function initLenis() {
  // Prevent double initialization
  if (lenisInstance) {
    return lenisInstance;
  }

  // Detect mobile once at init (not on every scroll)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    || window.matchMedia('(max-width: 768px)').matches;

  lenisInstance = new Lenis({
    // Duration controls momentum decay - higher = longer coast
    duration: isMobile ? 0.7 : 0.9,

    // Exponential easing for natural deceleration
    // This creates a "premium" feel vs linear smoothing
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

    // CRITICAL: Disable on mobile - let iOS/Android handle momentum natively
    // iOS has its own rubber-band physics that Lenis conflicts with
    smoothWheel: !isMobile,

    // CRITICAL: smoothTouch=false prevents Lenis from fighting native iOS momentum
    smoothTouch: false,

    // Wheel sensitivity multiplier
    wheelMultiplier: 1,

    // Touch sensitivity - higher = more scroll distance per swipe
    touchMultiplier: 1.4,

    // Don't wrap scroll (allows reaching actual page top/bottom)
    infinite: false,

    // Normalize wheel delta across browsers
    normalizeWheel: true,

    // Sync touch scroll with momentum (mobile only)
    syncTouch: false,

    // Auto-resize on window resize
    autoResize: true,

    // Prevent Lenis from intercepting certain elements
    // (pass element class or selector)
    prevent: (node) => {
      // Don't intercept scroll inside iframes
      if (node.tagName === 'IFRAME') return true;
      // Don't intercept elements with .no-lenis class
      if (node.classList?.contains('no-lenis')) return true;
      return false;
    },
  });

  // ═══════════════════════════════════════════════════════════════════
  // GSAP TICKER SYNC — CRITICAL FOR ANIMATION PERFORMANCE
  // ═══════════════════════════════════════════════════════════════════
  //
  // GSAP ticker runs at requestAnimationFrame rate
  // By adding Lenis.raf() to the ticker, we ensure:
  // 1. Lenis updates sync with browser repaints
  // 2. GSAP animations and Lenis use the same timing source
  // 3. No drift between scroll position and visual updates
  //
  // time parameter is in SECONDS from GSAP ticker
  // Lenis.raf() expects MILLISECONDS, hence * 1000

  rafCallback = (time) => {
    lenisInstance.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);

  // CRITICAL: Disable GSAP's lag smoothing
  // Lag smoothing causes GSAP to skip frames when it detects "jank"
  // This fights with Lenis's smooth momentum and causes stutter
  // Setting to 0 means "never smooth, always run at exact frame rate"
  gsap.ticker.lagSmoothing(0);

  // ═══════════════════════════════════════════════════════════════════
  // SCROLL TRIGGER SYNC — CRITICAL FOR GSAP SCROLL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════
  //
  // ScrollTrigger reads scroll position to determine animation progress
  // By calling ScrollTrigger.update() on every Lenis scroll, we ensure:
  // 1. ScrollTrigger always has fresh scroll position
  // 2. GSAP animations stay in sync with Lenis momentum
  // 3. No "drifting" between scroll position and animation state

  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Global reference for debugging and external access
  window.__LENIS__ = lenisInstance;

  return lenisInstance;
}

/**
 * Destroy Lenis instance and cleanup all connections
 * MUST be called on component unmount to prevent memory leaks
 */
export function destroyLenis() {
  if (lenisInstance) {
    // Remove GSAP ticker callback using stored reference
    // This is the CORRECT way - we stored the function reference at init
    if (rafCallback) {
      gsap.ticker.remove(rafCallback);
      rafCallback = null;
    }

    // Destroy Lenis - removes all event listeners and stops RAF loop
    lenisInstance.destroy();
    lenisInstance = null;

    // Clear global reference
    window.__LENIS__ = null;
  }
}

/**
 * Get the current Lenis instance
 * @returns {Lenis|null} The Lenis instance or null if not initialized
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Register a scroll callback with RAF batching
 * Use this for any scroll-linked visual updates
 *
 * @param {Function} callback - Function to call on scroll
 * @param {Object} options - Configuration options
 * @param {boolean} options.immediate - If true, call immediately then RAF
 * @returns {Function} Cleanup function
 */
export function onScrollRaf(callback, options = {}) {
  const { immediate = false } = options;
  const lenis = getLenis();
  if (!lenis) return () => {};

  let rafId = null;
  let lastValue = null;

  const handler = (e) => {
    if (rafId) return; // Skip if RAF already scheduled

    rafId = requestAnimationFrame(() => {
      rafId = null;
      const result = callback(e);
      lastValue = result;
    });
  };

  // Optional immediate call
  if (immediate) {
    callback({ immediate: true });
  }

  lenis.on('scroll', handler);

  // Return cleanup function
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lenis.off('scroll', handler);
  };
}
