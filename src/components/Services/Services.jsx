import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Full Stack Development',
    desc: 'Building scalable enterprise web applications end-to-end using Angular, React, ASP.NET Core, and NestJS with clean architecture.',
    tags: ['Angular', 'React', 'ASP.NET Core', 'NestJS'],
    color: '#FF4F00',
    bg: 'rgba(255, 79, 0, 0.06)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Backend & API Development',
    desc: 'Designing and developing robust REST APIs and backend services with ASP.NET Core, C#, middleware, and service-oriented architecture.',
    tags: ['ASP.NET Core', 'C#', 'Web API', 'MVC'],
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.08)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Cloud & DevOps',
    desc: 'Deploying and managing applications on Azure Cloud with automated CI/CD pipelines, Azure DevOps, and infrastructure management.',
    tags: ['Azure', 'Azure DevOps', 'CI/CD', 'Deployment'],
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
    title: 'Mobile Development',
    desc: 'Building cross-platform iOS and Android applications with .NET MAUI, delivering native performance with shared codebase.',
    tags: ['.NET MAUI', 'C#', 'Cross-Platform', 'Mobile'],
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Database & Architecture',
    desc: 'Designing and optimizing SQL Server and MongoDB databases, implementing Entity Framework ORM, and architecting scalable microservices.',
    tags: ['SQL Server', 'MongoDB', 'EF Core', 'Microservices'],
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Team Leadership',
    desc: 'Leading development teams with Agile/Scrum, conducting sprint planning, PR reviews, mentoring, and enforcing code quality standards.',
    tags: ['Agile', 'Sprint Planning', 'Code Review', 'Mentoring'],
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.08)',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header — clip-path wipe
      gsap.fromTo(
        sectionRef.current?.querySelector('.section-header'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Description fade up
      gsap.fromTo(
        sectionRef.current?.querySelector('.section-desc'),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector('.section-desc'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );

      // Service cards — clip-path bottom reveal + scale + rotate
      const cards = sectionRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.9, rotateZ: (i % 2 === 0 ? -1 : 1) },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        );
      });

      // Service tags — wave stagger
      const tags = sectionRef.current?.querySelectorAll('.service-tag');
      tags?.forEach((tag, i) => {
        gsap.fromTo(
          tag,
          { opacity: 0, scale: 0.7, y: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: tag,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
            delay: (i % 4) * 0.06,
          }
        );
      });

      // Parallax background orbs
      const orbs = sectionRef.current?.querySelectorAll('.services-bg-orb');
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
    <section ref={sectionRef} className="services-section" id="services">
      <div className="services-bg-orb" style={{ top: '10%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 0 }} />
      <div className="services-bg-orb" style={{ bottom: '20%', left: '2%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)', borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 0 }} />
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Services
            </div>
            <h2 className="section-title">What I Build &amp;<br />Deliver</h2>
          </div>
          <p className="section-desc">
            End-to-end enterprise solutions — from system architecture and backend
            development through to frontend, mobile, and cloud deployment.
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
