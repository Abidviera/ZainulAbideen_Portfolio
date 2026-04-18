import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './ScrollHero.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 200;

export default function ScrollHero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const frameDisplayRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload all frames and cache in a ref
  const imagesRef = useRef([]);

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
        if (loaded >= TOTAL_FRAMES) {
          setReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(loaded / TOTAL_FRAMES);
        if (loaded >= TOTAL_FRAMES) {
          setReady(true);
        }
      };
    }

    imagesRef.current = imgs;
  }, []);

  // ScrollTrigger + Lenis setup
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Frame scrubbing on scroll
  useEffect(() => {
    if (!ready) return;

    const imgs = imagesRef.current;
    const imgEl = imgRef.current;
    if (!imgs.length || !imgEl) return;

    // Set initial frame
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
    if (!textRef.current || !ready) return;
    const el = textRef.current;
    const chars = el.querySelectorAll('.char');
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      { opacity: 0, y: 60, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.04,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stickyRef.current,
          start: 'top top',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.to(el, {
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

  const subtitleWords = ['Frontend', 'Developer', '&', 'Designer'];
  const description =
    'Crafting pixel-perfect, performant interfaces with attention to detail and user experience.';

  return (
    <div ref={containerRef} className="scroll-hero-container">
      <div ref={stickyRef} className="scroll-hero-sticky">
        <img
          ref={imgRef}
          className="scroll-hero-img"
          alt=""
        />

        <div className="scroll-hero-gradient" />

        <div ref={textRef} className="scroll-hero-text">
          <div className="hero-top-label">
            <span className="label-line" />
            <span className="label-text">Portfolio 2026</span>
          </div>

          <h1 className="hero-name">
            {'Zainul Abideen'.split('').map((c, i) => (
              <span key={i} className="char" style={{ '--i': i }}>
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h1>

          <div className="hero-subtitle">
            {subtitleWords.map((word, wi) => (
              <span
                key={wi}
                className="subtitle-word"
                style={{ animationDelay: `${wi * 0.15}s` }}
              >
                {word}
                {wi < subtitleWords.length - 1 && '\u00A0'}
              </span>
            ))}
          </div>

          <p className="hero-description">{description}</p>

          <div className="hero-cta">
            <button className="cta-primary">View My Work</button>
            <button className="cta-secondary">Get In Touch</button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">5+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">30+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-arrow">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path
                d="M8 2v20M2 16l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div ref={frameDisplayRef} className="frame-counter">
          001 / 200
        </div>

        {!ready && (
          <div className="load-overlay">
            <div className="load-bar-wrap">
              <div
                className="load-bar"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
            <span className="load-text">
              Loading {Math.round(loadProgress * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
