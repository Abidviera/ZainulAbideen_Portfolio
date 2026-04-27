import { useEffect, useState, useRef } from 'react'
import { AnimatedText } from '../AnimatedText/AnimatedText'

export function LinkedInSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollStartY = useRef<number | null>(null)
  const sectionWasVisible = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollStartY.current = window.scrollY
            sectionWasVisible.current = true
          }
        })
      },
      { threshold: 0 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let rafId: number
    let currentProgress = 0
    const scrollThreshold = 800

    const handleScroll = () => {
      if (scrollStartY.current === null || !sectionWasVisible.current) {
        return
      }

      const scrolledPastSection = window.scrollY - scrollStartY.current

      if (scrolledPastSection < 0) {
        return
      }

      const scrolledAfterThreshold = scrolledPastSection - scrollThreshold

      if (scrolledAfterThreshold < 0) {
        return
      }

      const maxScroll = 400
      const targetProgress = Math.min(Math.max(scrolledAfterThreshold / maxScroll, 0), 1)

      const smoothUpdate = () => {
        currentProgress += (targetProgress - currentProgress) * 0.1
        if (Math.abs(targetProgress - currentProgress) > 0.001) {
          setScrollProgress(currentProgress)
          rafId = requestAnimationFrame(smoothUpdate)
        } else {
          setScrollProgress(targetProgress)
        }
      }
      cancelAnimationFrame(rafId)
      smoothUpdate()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const easeOutQuad = (t: number) => t * (2 - t)
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const scale = 1 - easeOutQuad(scrollProgress) * 0.15
  const borderRadius = easeOutCubic(scrollProgress) * 48
  const heightVh = 100 - easeOutQuad(scrollProgress) * 37.5

  return (
    <section ref={sectionRef} className="pt-32 pb-12 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 top-0">
        <div
          className="w-full will-change-transform overflow-hidden"
          style={{
            transform: `scale3d(${scale}, ${scale}, 1)`,
            borderRadius: `${borderRadius}px`,
            height: `${heightVh}vh`,
          }}
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/images/abidtyping.webm" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-[5] flex items-end justify-center"
        style={{
          transform: `translateY(${scrollProgress * 150}px)`,
          opacity: 1 - scrollProgress * 0.8,
          height: '100%',
        }}
      >
        <span className="block homie-text font-bold text-[28vw] sm:text-[25vw] md:text-[22vw] lg:text-[20vw] tracking-tighter select-none text-center leading-none">
          HOMIE
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
              className={`relative w-[234px] md:w-[281px] lg:w-[351px] will-change-transform transition-all duration-[1500ms] ease-out delay-500 ${
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
}