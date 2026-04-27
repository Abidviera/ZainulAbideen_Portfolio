import { useEffect, useState, useRef, memo, ReactNode } from 'react'

interface PerformanceWrapperProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * PerformanceWrapper - A component that uses Intersection Observer
 * to conditionally render children only when they enter the viewport.
 * This prevents heavy components from being mounted until needed.
 */
export const PerformanceWrapper = memo(function PerformanceWrapper({
  children,
  threshold = 0.1,
  rootMargin = '100px 0px',
  className = '',
  style = {}
}: PerformanceWrapperProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true)
            // Once rendered, disconnect to save resources
            observer.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={wrapperRef} className={className} style={style}>
      {shouldRender ? children : null}
    </div>
  )
})

/**
 * GPUAccelerate - Adds GPU acceleration hints to children
 */
export const GPUAccelerate = memo(function GPUAccelerate({
  children,
  className = '',
  style = {}
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`gpu-accelerated ${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        ...style
      }}
    >
      {children}
    </div>
  )
})

/**
 * DeferredContent - Renders content after a delay to prioritize initial load
 */
export const DeferredContent = memo(function DeferredContent({
  children,
  delayMs = 100
}: {
  children: ReactNode
  delayMs?: number
}) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [delayMs])

  return shouldRender ? <>{children}</> : null
})
