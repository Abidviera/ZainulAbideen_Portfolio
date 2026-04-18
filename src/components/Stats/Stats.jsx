import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

const stats = [
  { target: 3, suffix: '+', label: 'Years Experience', desc: 'In full-stack development & team leadership' },
  { target: 13, suffix: '+', label: 'Projects Delivered', desc: 'Enterprise solutions across multiple domains' },
  { target: 3, suffix: '', label: 'Companies Served', desc: 'From startups to enterprise organizations' },
  { target: 50, suffix: 'K+', label: 'Users Served', desc: 'Daily active users on deployed applications' },
];

function Counter({ target, suffix, label, desc, index }) {
  const numRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2.2,
            ease: 'power3.out',
            delay: index * 0.18,
            onUpdate: () => {
              el.textContent = Math.round(counter.val);
            },
          });
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, index]);

  return (
    <div className="apple-stat-card">
      <div className="apple-stat-inner">
        <div className="apple-stat-number" ref={numRef}>0<span className="apple-stat-suffix">{suffix}</span></div>
        <div className="apple-stat-label">{label}</div>
        <div className="apple-stat-desc">{desc}</div>
      </div>
      <div className="apple-stat-shine" />
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const windowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Window chrome entrance
      gsap.fromTo(
        windowRef.current,
        { opacity: 0, y: 16, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.15,
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.25,
        }
      );

      // Cards staggered entrance
      const cards = sectionRef.current?.querySelectorAll('.apple-stat-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 28, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            delay: 0.3 + i * 0.1,
          }
        );
      });

      // Parallax on the window
      gsap.to(windowRef.current, {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Subtle background orb movement
      const orbs = sectionRef.current?.querySelectorAll('.apple-bg-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: i === 0 ? -60 : 40,
          x: i === 1 ? 30 : -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="apple-stats-section" id="stats">
      {/* Subtle background orbs */}
      <div className="apple-bg-orb apple-bg-orb-1" />
      <div className="apple-bg-orb apple-bg-orb-2" />
      <div className="apple-bg-orb apple-bg-orb-3" />

      <div className="section-container">
        <div ref={windowRef} className="apple-window">
          {/* macOS window chrome */}
          <div className="apple-window-chrome">
            <div className="apple-window-dots">
              <span className="apple-dot apple-dot-red" />
              <span className="apple-dot apple-dot-yellow" />
              <span className="apple-dot apple-dot-green" />
            </div>
            <div className="apple-window-title">Impact Overview</div>
            <div className="apple-window-spacer" />
          </div>

          {/* Content */}
          <div className="apple-window-content">
            <div ref={titleRef} className="apple-stats-title">
              Impact at Scale
            </div>
            <div ref={subtitleRef} className="apple-stats-subtitle">
              Numbers that reflect real outcomes across every engagement.
            </div>

            <div className="apple-stats-divider" />

            <div className="apple-stats-grid">
              {stats.map((stat, i) => (
                <Counter key={i} {...stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
