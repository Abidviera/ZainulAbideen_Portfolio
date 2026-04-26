import { useEffect, useRef, useState } from 'react';

// Shared observer instance for better performance
let sharedObserver = null;
const observerCallbacks = new Map();

function getSharedObserver() {
  if (!sharedObserver && typeof IntersectionObserver !== 'undefined') {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callbacks = observerCallbacks.get(entry.target);
          if (callbacks) {
            callbacks.forEach((cb) => cb(entry.isIntersecting));
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );
  }
  return sharedObserver;
}

/**
 * Optimized intersection observer hook
 * @param {Object} options
 * @param {string} options.rootMargin - Root margin for the observer
 * @param {number} options.threshold - Intersection threshold
 * @param {boolean} options.triggerOnce - If true, stops observing after first intersection
 */
export function useIntersectionObserver(options = {}) {
  const { rootMargin = '50px', threshold = 0.1, triggerOnce = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const callback = (inView) => {
      setIsIntersecting(inView);
      if (inView) {
        setHasIntersected(true);
        if (triggerOnce) {
          observerCallbacks.delete(element);
          observerRef.current?.unobserve(element);
        }
      }
    };

    if (!observerCallbacks.has(element)) {
      observerCallbacks.set(element, new Set());
    }
    observerCallbacks.get(element).add(callback);

    observerRef.current = getSharedObserver();
    observerRef.current?.observe(element);

    return () => {
      const callbacks = observerCallbacks.get(element);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          observerCallbacks.delete(element);
          observerRef.current?.unobserve(element);
        }
      }
    };
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, isIntersecting: triggerOnce ? hasIntersected : isIntersecting };
}

/**
 * Hook for lazy loading images with blur-up effect
 */
export function useLazyImage(src, options = {}) {
  const { placeholder = '', rootMargin = '100px' } = options;
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ rootMargin });

  useEffect(() => {
    if (isIntersecting && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setImageSrc(placeholder);
      };
    }
  }, [isIntersecting, src, placeholder]);

  return { ref, imageSrc, isLoaded };
}
