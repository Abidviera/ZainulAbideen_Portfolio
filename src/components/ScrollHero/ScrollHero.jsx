import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollHero.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 200;

export default function ScrollHero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const frameDisplayRef = useRef(null);
  const nameRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const imagesRef = useRef([]);

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

  // Frame scrubbing on scroll
  useEffect(() => {
    if (!ready) return;

    const imgs = imagesRef.current;
    const imgEl = imgRef.current;
    if (!imgs.length || !imgEl) return;

    imgEl.src = imgs[0].src;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 5}`,
      scrub: 1.2,
      pin: stickyRef.current,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        imgEl.src = imgs[frame].src;
        if (frameDisplayRef.current) {
          frameDisplayRef.current.textContent =
            `${String(frame + 1).padStart(3, '0')} / ${TOTAL_FRAMES}`;
        }
      },
    });

    return () => st.kill();
  }, [ready]);

  // Text animations
  useEffect(() => {
    if (!ready) return;

    // Name characters — animate in on load
    const chars = nameRef.current?.querySelectorAll('.char');
    if (chars?.length) {
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });
    }

    // Subtitle words
    const words = textRef.current?.querySelectorAll('.subtitle-word');
    if (words?.length) {
      words.forEach((w, i) => {
        w.style.animationDelay = `${0.5 + i * 0.12}s`;
      });
    }

    // Scroll-driven text fade-out
    gsap.to(textRef.current, {
      y: -120,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 1.5}`,
        scrub: 1,
      },
    });
  }, [ready]);

  const subtitleWords = ['Full', 'Stack', 'Developer', '&', 'Team Lead'];
  const description =
    'Building scalable enterprise solutions with ASP.NET Core, Angular, React, NestJS, and Azure Cloud.';

  return (
    <div ref={containerRef} className="scroll-hero-container">
      <div ref={stickyRef} className="scroll-hero-sticky">
        <img ref={imgRef} className="scroll-hero-img" alt="" />

        <div className="scroll-hero-gradient" />

        <div ref={textRef} className="scroll-hero-text">
          {/* Label */}
          <div className="scroll-hero-label">
            <span className="label-chip accent">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Portfolio 2026
            </span>
          </div>

          {/* Name */}
          <h1 ref={nameRef} className="scroll-hero-name">
            {'Zainul Abideen EH'.split('').map((c, i) => (
              <span key={i} className="char">
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div className="scroll-hero-subtitle">
            {subtitleWords.map((word, wi) => (
              <span key={wi} className="subtitle-word">
                {word}{wi < subtitleWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="scroll-hero-desc">{description}</p>

          {/* CTAs */}
          <div className="scroll-hero-actions">
            <a href="#hero" className="scroll-cta-primary">
              View My Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="scroll-cta-secondary">
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="scroll-hero-stats">
            <div className="scroll-stat">
              <span className="scroll-stat-num">3+</span>
              <span className="scroll-stat-label">Years Exp.</span>
            </div>
            <div className="scroll-stat-divider" />
            <div className="scroll-stat">
              <span className="scroll-stat-num">13+</span>
              <span className="scroll-stat-label">Projects</span>
            </div>
            <div className="scroll-stat-divider" />
            <div className="scroll-stat">
              <span className="scroll-stat-num">50K+</span>
              <span className="scroll-stat-label">Users Served</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
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
