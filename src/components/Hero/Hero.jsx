import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

function useMagneticStrength(strength = 0.4) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    gsap.to(ref.current, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave, handleMouseEnter, isHovered };
}

function MagneticLink({ children, href, className = '' }) {
  const { ref, handleMouseMove, handleMouseLeave, handleMouseEnter } = useMagneticStrength(0.25);
  return (
    <a
      href={href}
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const bentoRef = useRef(null);
  const cardsRef = useRef([]);
  const introRef = useRef(null);
  const bentoGridRef = useRef(null);

  const primaryBtn = useMagneticStrength(0.3);
  const ghostBtn = useMagneticStrength(0.3);

  const handleMouseMove = useCallback((e) => {
    if (!bentoRef.current) return;
    const rect = bentoRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const intensity = 10 - i * 1.5;
      gsap.to(card, {
        rotateY: dx * intensity,
        rotateX: -dy * intensity,
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
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const orbs = sectionRef.current?.querySelectorAll('.hero-bg-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: i === 0 ? -100 : i === 1 ? 60 : 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      if (bentoGridRef.current) {
        gsap.to(bentoGridRef.current, {
          rotateX: 3,
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />
      <div className="hero-bg-orb hero-bg-orb-3" />

      <div className="section-container">
        <div className="hero-inner">
          <div ref={introRef} className="hero-content">
            <div className="hero-label label-chip accent">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Available for Projects
            </div>

            <h2 className="hero-section-title">
              Full Stack<br />
              Developer &amp;<br />
              Team Lead
            </h2>

            <p className="hero-subtitle">
              I architect and build enterprise-grade web applications — from
              scalable backends on Azure to pixel-perfect, interactive frontends
              that leave a lasting impression.
            </p>

            <div className="hero-actions">
              <a
                href="#work"
                ref={primaryBtn.ref}
                onMouseMove={primaryBtn.handleMouseMove}
                onMouseLeave={primaryBtn.handleMouseLeave}
                onMouseEnter={primaryBtn.handleMouseEnter}
                className="btn-primary"
              >
                View My Work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#contact"
                ref={ghostBtn.ref}
                onMouseMove={ghostBtn.handleMouseMove}
                onMouseLeave={ghostBtn.handleMouseLeave}
                onMouseEnter={ghostBtn.handleMouseEnter}
                className="btn-ghost"
              >
                Get In Touch
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">3+</span>
                <span className="hero-stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">13+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">50K+</span>
                <span className="hero-stat-label">Users Served</span>
              </div>
            </div>
          </div>

          <div
            ref={bentoRef}
            className="hero-bento"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={bentoGridRef} className="hero-bento-grid">
              <div
                ref={(el) => (cardsRef.current[0] = el)}
                className="hero-bento-card"
              >
                <div className="bento-icon-wrap orange">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="bento-card-title">Full Stack Dev</div>
                  <div className="bento-card-sub">ASP.NET Core, NestJS, React</div>
                  <span className="bento-card-tag orange">Core Stack</span>
                </div>
              </div>

              <div
                ref={(el) => (cardsRef.current[1] = el)}
                className="hero-bento-card"
              >
                <div className="bento-icon-wrap blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l2 2 4-4" />
                  </svg>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="bento-card-title">Team Lead</div>
                  <div className="bento-card-sub">Agile, Code Review, Mentoring</div>
                  <span className="bento-card-tag">Leadership</span>
                </div>
              </div>

              <div
                ref={(el) => (cardsRef.current[2] = el)}
                className="hero-bento-card"
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
                  <div className="bento-progress-text">Azure</div>
                </div>
                <div className="bento-code-block">
                  <div className="bento-code-line">
                    <span className="bento-code-dot red" />
                    <span className="bento-code-dot yellow" />
                    <span className="bento-code-dot green" />
                    <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                      building enterprise...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-float-card">
              <span className="hero-float-card-dot" />
              Team Lead @ AISERWIN — UAE Remote
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
