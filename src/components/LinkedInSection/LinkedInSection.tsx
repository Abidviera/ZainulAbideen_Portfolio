import { useEffect, useState, useRef, memo } from 'react'
import { AnimatedText } from '../AnimatedText/AnimatedText'

export const LinkedInSection = memo(function LinkedInSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const sectionTopRef = useRef(0)

  // Refs for direct DOM manipulation (avoids React re-renders)
  const scaleRef = useRef<HTMLDivElement>(null)
  const nameTextRef = useRef<HTMLDivElement>(null)
  const getCurrentScrollY = () => {
    const lenis = (window as typeof window & { __LENIS__?: { scroll?: number } }).__LENIS__
    return typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const updateSectionTop = () => {
      const rect = section.getBoundingClientRect()
      sectionTopRef.current = rect.top + getCurrentScrollY()
    }

    updateSectionTop()

    const ro = new ResizeObserver(() => {
      updateSectionTop()
    })
    ro.observe(section)

    window.addEventListener('resize', updateSectionTop, { passive: true })
    window.addEventListener('orientationchange', updateSectionTop, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateSectionTop)
      window.removeEventListener('orientationchange', updateSectionTop)
    }
  }, [])

  useEffect(() => {
    let rafId: number | null = null
    let latestScrollY = getCurrentScrollY()
    let lastProgress = -1
    const scrollThreshold = 900
    const maxScroll = 400

    const applyProgress = (progress: number) => {
      const easeOutQuad = (t: number) => t * (2 - t)
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

      // Direct DOM manipulation - NO React re-renders
      if (scaleRef.current) {
        const scale = 1 - easeOutQuad(progress) * 0.15
        const borderRadius = easeOutCubic(progress) * 48
        const heightVh = 100 - easeOutQuad(progress) * 37.5

        scaleRef.current.style.transform = `scale3d(${scale}, ${scale}, 1)`
        scaleRef.current.style.borderRadius = `${borderRadius}px`
        scaleRef.current.style.height = `${heightVh}vh`
      }

      if (nameTextRef.current) {
        nameTextRef.current.style.transform = `translateY(${progress * 150}px)`
        nameTextRef.current.style.opacity = `${1 - progress * 0.8}`
      }
    }

    const handleScroll = (event?: { scroll?: number }) => {
      latestScrollY = typeof event?.scroll === 'number' ? event.scroll : getCurrentScrollY()
      // Skip if RAF already scheduled
      if (rafId !== null) {
        return
      }

      rafId = requestAnimationFrame(() => {
        rafId = null
        // Deterministic scroll progress:
        // starts after section enters viewport + threshold, reverses naturally on upward scroll.
        const scrolledPastSectionEntry = latestScrollY - sectionTopRef.current + window.innerHeight
        const targetProgress = Math.min(Math.max((scrolledPastSectionEntry - scrollThreshold) / maxScroll, 0), 1)
        if (Math.abs(targetProgress - lastProgress) < 0.001) return

        lastProgress = targetProgress
        applyProgress(targetProgress)
      })
    }

    const lenis = (window as typeof window & { __LENIS__?: { on?: (e: string, cb: (event?: { scroll?: number }) => void) => void, off?: (e: string, cb: (event?: { scroll?: number }) => void) => void } }).__LENIS__
    if (lenis?.on && lenis?.off) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    // Sync initial state when mounting or returning to this route.
    handleScroll({ scroll: getCurrentScrollY() })

    return () => {
      if (lenis?.on && lenis?.off) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="pt-32 pb-12 px-6 min-h-screen flex items-center justify-center relative overflow-hidden contain-layout">
      <div className="absolute inset-0 top-0">
        <div
          ref={scaleRef}
          className="w-full overflow-hidden"
          style={{
            transform: 'scale3d(1, 1, 1)',
            borderRadius: '0px',
            height: '100vh',
            willChange: 'transform, border-radius, height',
          }}
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/images/abidtyping.webm" />
        </div>
      </div>

      <div
        ref={nameTextRef}
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-[5] flex items-end justify-center"
        style={{
          transform: 'translateY(0px)',
          opacity: 1,
          height: '100%',
          willChange: 'transform, opacity',
        }}
      >
        <span className="block homie-text font-bold text-[28vw] sm:text-[25vw] md:text-[22vw] lg:text-[20vw] tracking-tighter select-none text-center leading-none">
          ZAINUL
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="mb-12">
          <div
            className={`transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-normal leading-tight mb-6 w-full px-4 max-w-6xl mx-auto text-balance">
              <AnimatedText text="" delay={0.3} />
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <div
              className={`relative w-[234px] md:w-[281px] lg:w-[351px] transition-all duration-[1500ms] ease-out delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[400px]'
              }`}
            >
              <img src="/images/iphone-frame.webp" alt="Application Homie" className="w-full h-auto relative z-10" style={{ marginTop: '250px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
