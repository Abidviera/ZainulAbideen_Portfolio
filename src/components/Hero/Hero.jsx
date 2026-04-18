import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bentoRef = useRef(null);
  const cardsRef = useRef([]);
  const floatCardRef = useRef(null);
  const introRef = useRef(null);
  const bentoGridRef = useRef(null);

  // Mouse parallax for bento cards
  const handleMouseMove = useCallback((e) => {
    if (!bentoRef.current) return;
    const rect = bentoRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const intensity = 12 - i * 2;
      const rotateY = dx * intensity;
      const rotateX = -dy * intensity;
      const translateX = dx * (8 + i * 3);
      const translateY = dy * (8 + i * 3);
      gsap.to(card, {
        rotateY,
        rotateX,
        x: translateX,
        y: translateY,
        duration: 0.8,
        ease: 'power3.out',
        transformPerspective: 800,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro text
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Bento cards staggered entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12,
          }
        );
      });

      // Scroll parallax on orbs
      const orbs = sectionRef.current?.querySelectorAll('.hero-bg-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: i === 0 ? -100 : 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // 3D Z-axis parallax tilt on bento grid — Elastic Parallax
      if (bentoGridRef.current) {
        gsap.to(bentoGridRef.current, {
          rotateX: 4,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Per-card 3D tilt on scroll — staggered Z-depth
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          rotateY: i % 2 === 0 ? 3 : -3,
          z: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      {/* Ambient background orbs */}
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />

      <div className="section-container">
        <div className="hero-inner">
          {/* Left: Intro */}
          <div ref={introRef} className="hero-content">
            <div className="hero-label label-chip accent">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Featured Showcase
            </div>

            <h2 className="hero-section-title">
              Interactive<br />Skill Matrix
            </h2>

            <p className="hero-subtitle">
              Hover over the cards to explore my core competencies — each tile
              represents a different dimension of my craft. Move your cursor to
              interact.
            </p>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">5+</span>
                <span className="hero-stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">50+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">30+</span>
                <span className="hero-stat-label">Clients</span>
              </div>
            </div>
          </div>

          {/* Right: Bento Grid */}
          <div
            ref={bentoRef}
            className="hero-bento"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={bentoGridRef} className="hero-bento-grid">
              {/* Card 1: Skills */}
              <div
                ref={(el) => (cardsRef.current[0] = el)}
                className="hero-bento-card bento-card"
              >
                <div className="bento-icon-wrap orange">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="bento-card-title">Frontend Dev</div>
                  <div className="bento-card-sub">React, TypeScript, Next.js</div>
                  <span className="bento-card-tag orange">Core Stack</span>
                </div>
              </div>

              {/* Card 2: Design */}
              <div
                ref={(el) => (cardsRef.current[1] = el)}
                className="hero-bento-card bento-card"
              >
                <div className="bento-icon-wrap blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l2 2 4-4" />
                  </svg>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="bento-card-title">UI/UX Design</div>
                  <div className="bento-card-sub">Figma, Motion, Systems</div>
                  <span className="bento-card-tag">Design</span>
                </div>
              </div>

              {/* Card 3: Progress + Avatar */}
              <div
                ref={(el) => (cardsRef.current[2] = el)}
                className="hero-bento-card bento-card"
                style={{ justifyContent: 'center', alignItems: 'center', gap: '24px' }}
              >
                <div className="bento-avatar-wrap">ZA</div>

                <div className="bento-progress-ring">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle className="track" cx="40" cy="40" r="32" strokeWidth="6" />
                    <circle
                      className="fill"
                      cx="40"
                      cy="40"
                      r="32"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * 0.15}
                    />
                  </svg>
                  <div className="bento-progress-text">85%</div>
                </div>

                <div className="bento-code-block">
                  <div className="bento-code-line">
                    <span className="bento-code-dot red" />
                    <span className="bento-code-dot yellow" />
                    <span className="bento-code-dot green" />
                    <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                      crafting interfaces...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div ref={floatCardRef} className="hero-float-card">
              <span className="hero-float-card-dot" />
              Open to work — Remote / Hybrid
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
