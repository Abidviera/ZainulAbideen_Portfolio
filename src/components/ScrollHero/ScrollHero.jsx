import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollHero.css';

const TOTAL_FRAMES = 200;

export default function ScrollHero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const imgRef = useRef(null);
  const frameDisplayRef = useRef(null);

  const labelRef = useRef(null);
  const lineRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const imagesRef = useRef([]);
  const rafRef = useRef(null);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const imgs = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/herosection/ezgif-frame-${num}.png`;
      imgs.push(img);

      img.onload = () => {
        if (i === 1 && imgRef.current) {
          imgRef.current.src = img.src;
        }
        loaded++;
        setLoadProgress(loaded / TOTAL_FRAMES);
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(loaded / TOTAL_FRAMES);
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
    }

    imagesRef.current = imgs;
  }, []);

  // Frame scrubbing
  const updateFrame = useCallback(() => {
    if (!imagesRef.current.length) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

    const frame = Math.floor(progress * (TOTAL_FRAMES - 1));
    if (imgRef.current) imgRef.current.src = imagesRef.current[frame].src;
    if (frameDisplayRef.current) {
      frameDisplayRef.current.textContent =
        `${String(frame + 1).padStart(3, '0')} / ${TOTAL_FRAMES}`;
    }
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateFrame);
  }, [updateFrame]);

  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    imgRef.current.src = imagesRef.current[0].src;

    // Use Lenis scroll event instead of native window scroll
    const lenis = window.__LENIS__;
    if (lenis) {
      lenis.on('scroll', onScroll);
      updateFrame();
      return () => {
        lenis.off('scroll', onScroll);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    } else {
      // Fallback to native scroll for non-Lenis environments
      window.addEventListener('scroll', onScroll, { passive: true });
      updateFrame();
      return () => {
        window.removeEventListener('scroll', onScroll);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [ready, onScroll, updateFrame]);

  // Cinematic text reveal animation
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Label chip — slide in from left
      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, x: -40 });
        tl.to(labelRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0);
      }

      // 2. Accent line — expand from left
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        }, 0.2);
      }

      // 3. Name characters — staggered clip-path drop
      const chars = nameRef.current?.querySelectorAll('.sh-char');
      if (chars?.length) {
        gsap.set(chars, { opacity: 0, y: '110%', filter: 'blur(8px)' });
        tl.to(chars, {
          opacity: 1,
          y: '0%',
          filter: 'blur(0px)',
          stagger: {
            each: 0.04,
            from: 'start',
          },
          duration: 0.7,
          ease: 'power4.out',
        }, 0.3);
      }

      // 4. Subtitle words — staggered reveal
      const words = subtitleRef.current?.querySelectorAll('.sh-word');
      if (words?.length) {
        gsap.set(words, { opacity: 0, y: 20, skewY: 3 });
        tl.to(words, {
          opacity: 1,
          y: 0,
          skewY: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.9);
      }

      // 5. Description — fade + rise (earlier, in sync with name)
      if (descRef.current) {
        tl.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.5);
      }

      // 6. CTA buttons — set hidden first, then scale + fade stagger
      const btns = actionsRef.current?.querySelectorAll('.sh-btn');
      if (btns?.length) {
        gsap.set(btns, { opacity: 0, y: 20, scale: 0.92 });
        tl.to(btns, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.4)',
        }, 1.0);
      }

      // 7. Stats — set hidden first, then stagger slide up
      const statItems = statsRef.current?.querySelectorAll('.sh-stat');
      if (statItems?.length) {
        gsap.set(statItems, { opacity: 0, y: 24 });
        tl.to(statItems, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power3.out',
        }, 1.15);
      }

      // 8. Scroll indicator — fade in last
      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 1.5);
      }

      // 8b. Description scroll exit — fade out independently
      if (descRef.current) {
        gsap.to(descRef.current, {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 45%',
            end: `+=${window.innerHeight * 1.5}`,
            scrub: 1,
          },
        });
      }

      // 9. Scroll-driven exit — entire text fades out as user scrolls
      const allContent = [
        labelRef.current,
        lineRef.current,
        nameRef.current,
        subtitleRef.current,
        descRef.current,
        actionsRef.current,
        statsRef.current,
      ];

      allContent.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 45%',
            end: `+=${window.innerHeight * 1.5}`,
            scrub: 1,
          },
        });
      });

      // 10. Scroll indicator fades out on scroll
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 45%',
            end: `+=${window.innerHeight * 0.5}`,
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  const subtitleWords = ['Full', 'Stack', 'Developer', '&', 'Team', 'Lead'];

  return (
    <div ref={containerRef} className="scroll-hero-container">
      <div ref={stickyRef} className="scroll-hero-sticky">
        <img ref={imgRef} className="scroll-hero-img" alt="" aria-hidden="true" />

        <div className="scroll-hero-gradient" />

        {/* Text content */}
        <div className="scroll-hero-text">
       

          {/* Accent line */}
          <div ref={lineRef} className="scroll-hero-line" />

          {/* Name */}
          <h1 ref={nameRef} className="scroll-hero-name">
            {'Zainul Abideen EH'.split('').map((c, i) => (
              <span key={i} className="sh-char">
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div ref={subtitleRef} className="scroll-hero-subtitle">
            {subtitleWords.map((word, wi) => (
              <span key={wi} className="sh-word">
                {word}{wi < subtitleWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </div>

          {/* Description */}
          <p ref={descRef} className="scroll-desc">
            Building scalable enterprise solutions with ASP.NET Core, Angular, React, NestJS, and Azure Cloud.
          </p>

          {/* CTA buttons */}
          <div ref={actionsRef} className="scroll-hero-actions">
            <a href="#work" className="sh-btn scroll-cta-primary">
              View My Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="sh-btn scroll-cta-secondary">
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="scroll-hero-stats">
            <div className="sh-stat">
              <span className="scroll-stat-num">3+</span>
              <span className="scroll-stat-label">Years Exp.</span>
            </div>
            <div className="scroll-stat-divider" />
            <div className="sh-stat">
              <span className="scroll-stat-num">13+</span>
              <span className="scroll-stat-label">Projects</span>
            </div>
            <div className="scroll-stat-divider" />
            <div className="sh-stat">
              <span className="scroll-stat-num">50K+</span>
              <span className="scroll-stat-label">Users Served</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-arrow">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 2v20M2 16l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Frame counter */}
        <div ref={frameDisplayRef} className="frame-counter">
          001 / 200
        </div>

        {/* Loading overlay */}
        {!ready && (
          <div className="load-overlay">
            <div className="load-bar-wrap">
              <div className="load-bar" style={{ width: `${loadProgress * 100}%` }} />
            </div>
            <span className="load-text">Loading {Math.round(loadProgress * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
