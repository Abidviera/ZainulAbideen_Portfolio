'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { SplineFallback } from './spline-fallback'

// Dynamic import for Spline - only loads when needed
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineScene({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Lazy load Spline only when it enters viewport
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading Spline when 10% visible
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before entering viewport
        threshold: 0.1
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  if (hasError) {
    return <SplineFallback className={className} />
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ contain: 'content' }}
    >
      {isInView ? (
        <Suspense fallback={<SplineFallback className={className} />}>
          <Spline
            scene={scene}
            className="w-full h-full"
            onError={() => setHasError(true)}
          />
        </Suspense>
      ) : (
        <SplineFallback className={className} />
      )}
    </div>
  )
}

export function SplineSceneBasic() {
  return (
    <div className="w-full h-[500px] bg-white relative overflow-hidden border-0 rounded-none shadow-none">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}
