'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { SplineFallback } from './spline-fallback'

// Dynamic import for Spline - only loads when needed
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

const SPLINE_PREF_KEY = 'spline3d:enabled'
const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

function SplineScene({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)
  const [userEnabled3D, setUserEnabled3D] = useState(true)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isActiveRef = useRef(false)
  const idleLoadTimerRef = useRef<number | null>(null)
  const idleCallbackRef = useRef<number | null>(null)
  const offscreenUnmountTimerRef = useRef<number | null>(null)
  const scrollIdleTimerRef = useRef<number | null>(null)
  const interactionDisabledRef = useRef(false)
  const runtimeWarmedRef = useRef(false)
  const sceneWarmedRef = useRef(false)

  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])

  // Manual gate: never auto-start heavy WebGL unless user explicitly enables it.
  useEffect(() => {
    try {
      const savedPref = window.localStorage.getItem(SPLINE_PREF_KEY)
      if (savedPref === '0') {
        setUserEnabled3D(false)
      } else {
        setUserEnabled3D(true)
      }
    } catch {
      // Ignore storage errors and continue with default-on mode.
    }
  }, [])

  // Mount near viewport, unmount quickly when out of viewport to release GPU/CPU pressure.
  useEffect(() => {
    if (!containerRef.current) return

    const activateWhenIdle = () => {
      if (!userEnabled3D) return
      if (isActiveRef.current) return
      const activate = () => {
        if (isActiveRef.current) return
        setIsActive(true)
      }

      if ('requestIdleCallback' in window) {
        if (idleCallbackRef.current) {
          window.cancelIdleCallback(idleCallbackRef.current)
        }
        idleCallbackRef.current = window.requestIdleCallback(() => {
          activate()
          idleCallbackRef.current = null
        }, { timeout: 100 })
        return
      }

      if (idleLoadTimerRef.current) {
        window.clearTimeout(idleLoadTimerRef.current)
      }
      idleLoadTimerRef.current = window.setTimeout(() => {
        activate()
        idleLoadTimerRef.current = null
      }, 70)
    }

    const clearOffscreenUnmountTimer = () => {
      if (!offscreenUnmountTimerRef.current) return
      window.clearTimeout(offscreenUnmountTimerRef.current)
      offscreenUnmountTimerRef.current = null
    }

    const scheduleUnmountWhenFar = () => {
      clearOffscreenUnmountTimer()
      offscreenUnmountTimerRef.current = window.setTimeout(() => {
        setIsActive(false)
        offscreenUnmountTimerRef.current = null
      }, 120)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true)
            clearOffscreenUnmountTimer()
            activateWhenIdle()
            return
          }

          setIsNearViewport(false)
          scheduleUnmountWhenFar()
        })
      },
      {
        rootMargin: '320px 0px',
        threshold: 0
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      if (idleLoadTimerRef.current) {
        window.clearTimeout(idleLoadTimerRef.current)
        idleLoadTimerRef.current = null
      }
      if (idleCallbackRef.current && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackRef.current)
        idleCallbackRef.current = null
      }
      if (offscreenUnmountTimerRef.current) {
        window.clearTimeout(offscreenUnmountTimerRef.current)
        offscreenUnmountTimerRef.current = null
      }
    }
  }, [userEnabled3D])

  // Warm up Spline runtime chunk + scene request before activation for faster first paint.
  useEffect(() => {
    if (!userEnabled3D || !containerRef.current) return

    const warm = () => {
      if (!runtimeWarmedRef.current) {
        runtimeWarmedRef.current = true
        void import('@splinetool/react-spline')
      }
      if (!sceneWarmedRef.current) {
        sceneWarmedRef.current = true
        void fetch(scene, { cache: 'force-cache' }).catch(() => {})
      }
    }

    const runWarm = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => warm(), { timeout: 180 })
        return
      }
      window.setTimeout(warm, 60)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          runWarm()
          observer.disconnect()
        })
      },
      { rootMargin: '900px 0px', threshold: 0 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [scene, userEnabled3D])

  // Keep cursor-follow interactions, but avoid scroll/input contention while actively scrolling.
  useEffect(() => {
    if (!isActive || !isNearViewport) return

    const el = containerRef.current
    if (!el) return

    const disableInteraction = () => {
      if (interactionDisabledRef.current) return
      interactionDisabledRef.current = true
      el.style.pointerEvents = 'none'
    }

    const enableInteraction = () => {
      if (!interactionDisabledRef.current) return
      interactionDisabledRef.current = false
      el.style.pointerEvents = 'auto'
    }

    const onScroll = () => {
      disableInteraction()
      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current)
      }
      scrollIdleTimerRef.current = window.setTimeout(() => {
        enableInteraction()
        scrollIdleTimerRef.current = null
      }, 60)
    }

    const lenis = (window as typeof window & {
      __LENIS__?: {
        on?: (event: string, cb: () => void) => void
        off?: (event: string, cb: () => void) => void
      }
    }).__LENIS__

    if (lenis?.on && lenis?.off) {
      lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      if (lenis?.on && lenis?.off) {
        lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current)
        scrollIdleTimerRef.current = null
      }
      enableInteraction()
    }
  }, [isActive, isNearViewport])

  if (hasError) {
    return <SplineFallback className={className} />
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ contain: 'content', touchAction: 'pan-y', pointerEvents: 'auto' }}
    >
      {isActive ? (
        <Suspense fallback={<SplineFallback className={className} />}>
          <Spline
            scene={scene}
            className="w-full h-full"
            renderOnDemand
            onError={() => setHasError(true)}
          />
          <button
            type="button"
            onClick={() => {
              setIsActive(false)
              setUserEnabled3D(false)
              try {
                window.localStorage.setItem(SPLINE_PREF_KEY, '0')
              } catch {
                // Ignore storage errors.
              }
            }}
            className="absolute top-4 right-4 z-20 px-3 py-1.5 text-xs font-medium text-white bg-black/65 hover:bg-black/80 transition-colors rounded-md"
          >
            Disable 3D
          </button>
        </Suspense>
      ) : (
        <div className="relative w-full h-full">
          <SplineFallback className={className} />
          {!userEnabled3D && (
            <button
              type="button"
              onClick={() => {
                setUserEnabled3D(true)
                try {
                  window.localStorage.setItem(SPLINE_PREF_KEY, '1')
                } catch {
                  // Ignore storage errors.
                }
              }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 text-sm font-medium text-white bg-black/70 hover:bg-black/85 transition-colors rounded-md"
            >
              Enable 3D
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function SplineSceneBasic() {
  return (
    <div
      className="w-full h-[500px] bg-white relative overflow-hidden border-0 rounded-none shadow-none"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '500px' }}
    >
      <SplineScene
        scene={SCENE_URL}
        className="w-full h-full"
      />
    </div>
  )
}
