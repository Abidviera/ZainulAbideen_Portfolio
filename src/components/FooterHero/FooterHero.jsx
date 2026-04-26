import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './FooterHero.css';

const TOTAL_FRAMES = 240;

export default function FooterHero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const imgRef = useRef(null);
  const progressRef = useRef(null);

  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const phase3Ref = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const sectionHeightRef = useRef(0);
  const loadedCountRef = useRef(0);
  const scrollEnabledRef = useRef(false);

  // Progressive loading: enable scrolling after first batch, continue loading in background
  useEffect(() => {
    const imgs = [];
    let loaded = 0;
    let hasSetFirst = false;

    const preloadFrame = (i) => {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/footerhero/webp/frame-${num}.webp`;
      imgs[i - 1] = img;

      img.onload = () => {
        if (!hasSetFirst && imgRef.current) {
          imgRef.current.src = img.src;
          hasSetFirst = true;
        }
        loaded++;
        loadedCountRef.current = loaded;
        setLoadProgress(loaded / TOTAL_FRAMES);

        // Enable scrolling after first 20 frames (quick on any connection)
        if (loaded >= 20 && !scrollEnabledRef.current) {
          scrollEnabledRef.current = true;
          setReady(true);
        }

        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => {
        loaded++;
        loadedCountRef.current = loaded;
        setLoadProgress(loaded / TOTAL_FRAMES);

        if (loaded >= 20 && !scrollEnabledRef.current) {
          scrollEnabledRef.current = true;
          setReady(true);
        }
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
    };

    // Start loading all frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      preloadFrame(i);
    }

    imagesRef.current = imgs;
  }, []);

  // Ultra-smooth frame scrubbing — direct scroll sync, no RAF delay
  useEffect(() => {
    if (!ready || !sectionRef.current || !imgRef.current) return;

    const section = sectionRef.current;
    const img = imgRef.current;

    // Preload first frame
    img.src = imagesRef.current[0]?.src || '';
    sectionHeightRef.current = section.offsetHeight;

    const updateFrame = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = section.offsetHeight - viewportHeight;

      // Calculate progress: 0 when container top hits viewport top, 1 when bottom
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

      // Get the maximum available frame (handles partial loading)
      const maxAvailableFrame = Math.min(loadedCountRef.current, TOTAL_FRAMES - 1);
      const frame = Math.min(maxAvailableFrame, Math.floor(progress * TOTAL_FRAMES));

      if (frame !== currentFrameRef.current && imagesRef.current[frame]) {
        currentFrameRef.current = frame;
        img.src = imagesRef.current[frame].src;
        if (progressRef.current) {
          progressRef.current.style.height = `${progress * 100}%`;
        }
      }
    };

    // Use Lenis scroll event directly for smoothest sync
    const lenis = window.__LENIS__;
    if (lenis) {
      lenis.on('scroll', updateFrame);
    } else {
      window.addEventListener('scroll', updateFrame, { passive: true });
    }

    // Initial update
    updateFrame();

    const handleResize = () => {
      sectionHeightRef.current = section.offsetHeight;
      updateFrame();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (lenis) {
        lenis.off('scroll', updateFrame);
      } else {
        window.removeEventListener('scroll', updateFrame);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [ready]);

  // Phase animations — optimized scroll sync
  useEffect(() => {
    if (!ready || !sectionRef.current) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      || window.matchMedia('(max-width: 768px)').matches;
    const endDistance = window.innerHeight * (isMobile ? 3 : 5);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${endDistance}`,
          scrub: true,
          pin: false,
        },
      });

      if (phase1Ref.current) {
        gsap.set(phase1Ref.current, { opacity: 0, x: 60, y: -30 });
        tl.to(phase1Ref.current, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
        tl.to(phase1Ref.current, { opacity: 0, x: -40, y: -20, duration: 0.6, ease: 'power2.in' }, 1.1);
      }

      if (phase2Ref.current) {
        gsap.set(phase2Ref.current, { opacity: 0, x: -60, y: 30 });
        tl.to(phase2Ref.current, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }, 1.3);
        tl.to(phase2Ref.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.in' }, 3.0);
      }

      if (phase3Ref.current) {
        gsap.set(phase3Ref.current, { opacity: 0, y: 40, scale: 0.95 });
        tl.to(phase3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 3.2);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} className="footer-hero-section">
      <div ref={stickyRef} className="footer-hero-sticky">
        <img ref={imgRef} className="footer-hero-img" alt="" aria-hidden="true" />

        <div className="fh-gradient-top" />
        <div className="fh-gradient-bottom" />
        <div className="fh-gradient-side-left" />
        <div className="fh-gradient-side-right" />

        <div className="fh-progress-track">
          <div ref={progressRef} className="fh-progress-fill" />
        </div>

        <div className="fh-phase-indicators">
          <span className="fh-phase-dot active" />
          <span className="fh-phase-dot" />
          <span className="fh-phase-dot" />
        </div>

        {/* PHASE 1: Top right */}
        <div ref={phase1Ref} className="fh-phase fh-phase-1">
          <div className="fh-phase-1-inner">
            <span className="fh-eyebrow-tag">
              <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                <circle cx="3" cy="3" r="3" />
              </svg>
              Open to Opportunities
            </span>
            <h2 className="fh-phase1-title">
              Building the<br />
              <span className="fh-title-accent">Future</span><br />
              <span className="fh-title-outline">of Web</span>
            </h2>
            <p className="fh-phase1-sub">
              Scroll to explore my expertise
            </p>
            <div className="fh-scroll-hint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* PHASE 2: Bottom left */}
        <div ref={phase2Ref} className="fh-phase fh-phase-2">
          <div className="fh-phase2-content">
            <span className="fh-eyebrow-tag">
              <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                <circle cx="3" cy="3" r="3" />
              </svg>
              Thrissur, Kerala, India
            </span>
            <h3 className="fh-phase2-heading">
              Crafting Code<br />
              <span className="fh-title-accent">That Scales</span>
            </h3>
            <a href="mailto:zainulzain043@gmail.com" className="fh-email-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              zainulzain043@gmail.com
            </a>
          </div>
        </div>

        {/* PHASE 3: Center */}
        <div ref={phase3Ref} className="fh-phase fh-phase-3">
          <div className="fh-phase3-inner">
            <span className="fh-eyebrow-tag">
              <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                <circle cx="3" cy="3" r="3" />
              </svg>
              Let&apos;s Collaborate
            </span>
            <h2 className="fh-phase3-title">
              Have a project<br />
              <span className="fh-title-accent">in mind?</span>
            </h2>
            <p className="fh-phase3-sub">
              I&apos;m always open to discussing new projects, enterprise solutions, or opportunities to be part of your team.
            </p>
            <div className="fh-cta-group">
              <a href="mailto:zainulzain043@gmail.com" className="fh-cta-primary">
                Start a Conversation
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/zainul-abideen-eh" className="fh-cta-secondary" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="fh-stats-row">
              <div className="fh-stat">
                <span className="fh-stat-num">3+</span>
                <span className="fh-stat-label">Years Exp.</span>
              </div>
              <div className="fh-stat-divider" />
              <div className="fh-stat">
                <span className="fh-stat-num">13+</span>
                <span className="fh-stat-label">Projects</span>
              </div>
              <div className="fh-stat-divider" />
              <div className="fh-stat">
                <span className="fh-stat-num">50K+</span>
                <span className="fh-stat-label">Users Served</span>
              </div>
            </div>
          </div>
        </div>

        {!ready && (
          <div className="fh-load-overlay">
            <div className="fh-load-ring" />
            <span className="fh-load-text">Loading {Math.round(loadProgress * 100)}%</span>
          </div>
        )}
      </div>
    </section>
  );
}
