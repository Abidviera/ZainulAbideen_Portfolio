import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollHero.css';

function getTimeString() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function getDayPeriod() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 20) return 'Evening';
  return 'Night';
}

const TOTAL_FRAMES = 200;

export default function ScrollHero({ greetingDone, setGreetingDone }) {
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

  const [ready, setReady] = useState(false);
  const greetingRef = useRef(null);
  const greetingCharsRef = useRef(null);
  const greetingTimeRef = useRef(null);
  const greetingAccentRef = useRef(null);
  const greetingOrb1Ref = useRef(null);
  const greetingOrb2Ref = useRef(null);
  const greetingRay1Ref = useRef(null);
  const greetingRay2Ref = useRef(null);
  const greetingParticle1Ref = useRef(null);
  const greetingParticle2Ref = useRef(null);
  const greetingParticle3Ref = useRef(null);
  const greetingParticle4Ref = useRef(null);
  const greetingOverlayBgRef = useRef(null);

  const imagesRef = useRef([]);
  const rafRef = useRef(null);

  // Preload frames progressively — first batch immediately, rest in background
  useEffect(() => {
    const imgs = [];
    let loaded = 0;
    let hasSetFirst = false;

    const preloadFrame = (i) => {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/herosection/webp/frame-${num}.webp`;
      imgs[i - 1] = img;

      img.onload = () => {
        if (!hasSetFirst && imgRef.current) {
          imgRef.current.src = img.src;
          hasSetFirst = true;
        }
        loaded++;
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
    };

    // First 5 frames immediately
    for (let i = 1; i <= 5; i++) {
      preloadFrame(i);
    }

    // Rest in batches of 20 with small delay
    const BATCH_SIZE = 20;
    const BATCH_DELAY = 50;
    let batchIndex = 6;

    const loadBatch = () => {
      const end = Math.min(batchIndex + BATCH_SIZE - 1, TOTAL_FRAMES);
      for (let i = batchIndex; i <= end; i++) {
        preloadFrame(i);
      }
      batchIndex = end + 1;
      if (batchIndex <= TOTAL_FRAMES) {
        setTimeout(loadBatch, BATCH_DELAY);
      }
    };

    setTimeout(loadBatch, BATCH_DELAY);
    imagesRef.current = imgs;
  }, []);

  // Greeting animation — fast cinematic intro
  useEffect(() => {
    if (greetingDone || !greetingRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const bg = greetingOverlayBgRef.current;
      const orb1 = greetingOrb1Ref.current;
      const orb2 = greetingOrb2Ref.current;
      const ray1 = greetingRay1Ref.current;
      const ray2 = greetingRay2Ref.current;
      const p1 = greetingParticle1Ref.current;
      const p2 = greetingParticle2Ref.current;
      const p3 = greetingParticle3Ref.current;
      const p4 = greetingParticle4Ref.current;
      const chars = greetingCharsRef.current?.querySelectorAll('.greet-char');
      const accent = greetingAccentRef.current;
      const timeEl = greetingTimeRef.current;

      // Init — everything hidden
      gsap.set([bg, greetingRef.current], { opacity: 0 });
      gsap.set([orb1, orb2], { opacity: 0, scale: 0.5 });
      gsap.set([ray1, ray2], { scaleX: 0, opacity: 0 });
      gsap.set([p1, p2, p3, p4], { opacity: 0, scale: 0, y: 30 });
      if (chars) gsap.set(chars, { opacity: 0, clipPath: 'inset(0 100% 0 0)', filter: 'blur(3px)' });
      if (accent) gsap.set(accent.querySelectorAll('.accent-word'), { opacity: 0, y: 20, filter: 'blur(6px)' });
      if (timeEl) gsap.set(timeEl, { opacity: 0, y: 10 });

      // 0. Background fades in
      tl.to([bg, greetingRef.current], { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0);

      // 1. Ambient orbs expand
      tl.to([orb1, orb2], { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 0.1);

      // 2. Light rays sweep in
      tl.to([ray1, ray2], { scaleX: 1, opacity: 0.12, duration: 0.4, ease: 'power3.inOut' }, 0.2);

      // 3. "HELLO" — clip-path wipe reveal
      if (chars?.length) {
        tl.to(chars, {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          filter: 'blur(0px)',
          stagger: { each: 0.04, from: 'start' },
          duration: 0.4,
          ease: 'power4.out',
        }, 0.3);
      }

      // 4. "I'm Zainul" rises with blur
      if (accent) {
        tl.to(accent.querySelectorAll('.accent-word'), {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 0.4,
          ease: 'power3.out',
        }, 0.6);
      }

      // 5. Particles scatter
      tl.to([p1, p2, p3, p4], {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: { each: 0.06, from: 'random' },
        duration: 0.35,
        ease: 'back.out(1.5)',
      }, 0.5);

      // 6. Time string fades in
      if (timeEl) {
        tl.to(timeEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.9);
      }

      // 7. Particles drift up
      gsap.to([p1, p2, p3, p4], {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power1.in',
        stagger: { each: 0.2, repeat: 1, from: 'random' },
        delay: 0.8,
      });

      // 8. Orbs breathe
      gsap.to([orb1, orb2], {
        scale: 1.12,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // 9. Entire greeting — fade + scale out
      tl.to(greetingRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.5,
        ease: 'power2.in',
      }, 1.7);

      tl.call(() => {
        setGreetingDone(true);
      }, [], 2.2);
    }, greetingRef);

    return () => ctx.revert();
  }, [greetingDone, setGreetingDone]);

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

        {/* Greeting overlay — award-winning cinematic intro */}
        {!greetingDone && (
          <div ref={greetingRef} className="greet-overlay">
            {/* Background */}
            <div ref={greetingOverlayBgRef} className="greet-bg" />

            {/* Ambient gradient orbs */}
            <div ref={greetingOrb1Ref} className="greet-orb greet-orb--1" />
            <div ref={greetingOrb2Ref} className="greet-orb greet-orb--2" />

            {/* Light rays */}
            <div ref={greetingRay1Ref} className="greet-ray greet-ray--1" />
            <div ref={greetingRay2Ref} className="greet-ray greet-ray--2" />

            {/* Floating particles */}
            <div ref={greetingParticle1Ref} className="greet-particle" style={{ top: '30%', left: '15%' }} />
            <div ref={greetingParticle2Ref} className="greet-particle" style={{ top: '60%', left: '80%' }} />
            <div ref={greetingParticle3Ref} className="greet-particle" style={{ top: '20%', left: '65%' }} />
            <div ref={greetingParticle4Ref} className="greet-particle" style={{ top: '70%', left: '25%' }} />

            {/* Central content */}
            <div className="greet-content">
              <div ref={greetingCharsRef} className="greet-text">
                {'HELLO'.split('').map((c, i) => (
                  <span key={i} className="greet-char">
                    {c === ' ' ? '\u00A0' : c}
                  </span>
                ))}
              </div>
              <div ref={greetingAccentRef} className="greet-accent">
                <span className="accent-word">I&apos;m</span>
                <span className="accent-word accent-name">&nbsp;Zainul</span>
              </div>
              <div ref={greetingTimeRef} className="greet-time">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="greet-time-icon">
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                  <path d="M6 3.5V6l1.8 1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Good {getDayPeriod()} &mdash; {getTimeString()}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="greet-bottom-line" />
          </div>
        )}
      </div>
    </div>
  );
}
