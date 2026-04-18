import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Frontend Development',
    desc: 'Building responsive, performant web applications using React, Next.js, and TypeScript with a focus on clean architecture and maintainability.',
    tags: ['React', 'Next.js', 'TypeScript', 'Vite'],
    color: '#FF4F00',
    bg: 'rgba(255, 79, 0, 0.06)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Crafting intuitive interfaces and design systems in Figma — from wireframes to polished, production-ready design tokens and component libraries.',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'Tokens'],
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.08)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Performance & SEO',
    desc: 'Optimizing Core Web Vitals, reducing bundle sizes, and implementing SEO best practices to ensure your site ranks and loads fast.',
    tags: ['Lighthouse', 'SEO', 'Core Web Vitals', 'Bundle'],
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Animation & Motion',
    desc: 'Bringing interfaces to life with scroll-driven animations, micro-interactions, and 3D effects using GSAP, Framer Motion, and Three.js.',
    tags: ['GSAP', 'Framer Motion', 'Three.js', 'Lottie'],
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M2 12h2M20 12h2M12 2v2M12 20v2" />
      </svg>
    ),
    title: 'Landing Pages',
    desc: 'Designing and developing high-converting landing pages that communicate value instantly and drive measurable results.',
    tags: ['Landing Pages', 'CRO', 'A/B Testing'],
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll('.reveal');
      reveals?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const cards = sectionRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services-section" id="services">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Services
            </div>
            <h2 className="section-title">What I Build &amp;<br />Design</h2>
          </div>
          <p className="section-desc">
            End-to-end digital solutions — from concept and design through to a
            fully-optimized, production-ready product.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.title}
              className="bento-card service-card"
            >
              <div
                className="service-icon"
                style={{ background: service.bg, color: service.color }}
              >
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
              <div className="service-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
