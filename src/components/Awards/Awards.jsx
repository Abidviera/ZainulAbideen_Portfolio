import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Awards.css';

const awards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Certified ASP.NET Core Developer',
    desc: 'Advanced backend development certification covering .NET Core, Web API, and enterprise architecture patterns.',
    year: '2025',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Certified Advanced Front-End Developer',
    desc: 'Expert-level front-end certification in modern frameworks, performance optimization, and responsive design.',
    year: '2025',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: 'Certified Test Driven Developer',
    desc: 'TDD methodology certification focused on Angular testing patterns, unit tests, and quality-first development.',
    year: '2024',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Certified Software Engineer Trainee',
    desc: 'Comprehensive software engineering program covering full-stack development, system design, and best practices.',
    year: '2024',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
    title: 'Certified JavaScript Developer',
    desc: 'In-depth JavaScript certification covering ES6+, async programming, DOM manipulation, and modern frameworks.',
    year: '2024',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: 'Certified UI/UX Designer',
    desc: 'User interface and experience design certification covering Figma, user research, wireframing, and prototyping.',
    year: '2024',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: 'Certified Web Developer',
    desc: 'Full-stack web development certification covering HTML, CSS, JavaScript, and modern web standards.',
    year: '2024',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Certified Agile Practitioner',
    desc: 'Agile methodology certification covering Scrum, Kanban, sprint planning, and team collaboration practices.',
    year: '2025',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Certified System Analyst',
    desc: 'Business and technical systems analysis certification covering requirements gathering, modeling, and process design.',
    year: '2025',
  },
];

export default function Awards() {
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

      // Description fade
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
          delay: 0.35,
        }
      );

      // Award cards — flip/rotate reveal with stagger
      const cards = sectionRef.current?.querySelectorAll('.award-card');
      cards?.forEach((card, i) => {
        const rotDir = i % 2 === 0 ? -3 : 3;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotateZ: rotDir,
            clipPath: 'inset(100% 0 0 0)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            clipPath: 'inset(0% 0 0 0)',
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

      // Award icons — spin in
      const icons = sectionRef.current?.querySelectorAll('.award-icon-wrap');
      icons?.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });

      // Award year badges — pop in
      const years = sectionRef.current?.querySelectorAll('.award-year');
      years?.forEach((year, i) => {
        gsap.fromTo(
          year,
          { opacity: 0, scale: 0.5, x: 10 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.5,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: year,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.05 + 0.3,
          }
        );
      });

      // Parallax background orbs
      const orbs = sectionRef.current?.querySelectorAll('.awards-bg-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: i === 0 ? -80 : 50,
          x: i === 1 ? 30 : -30,
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
    <section ref={sectionRef} className="awards-section" id="awards">
      <div className="awards-bg-orb" style={{ top: '10%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,193,7,0.06) 0%, transparent 70%)', borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 0 }} />
      <div className="awards-bg-orb" style={{ bottom: '15%', left: '3%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 0 }} />
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip gold">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Recognition
            </div>
            <h2 className="section-title">Awards &amp;<br />Certifications</h2>
          </div>
          <p className="section-desc">
            Professional certifications validating expertise in full-stack development, cloud architecture, design, and agile methodologies.
          </p>
        </div>

        <div className="awards-grid">
          {awards.map((award, i) => (
            <div key={i} className="bento-card award-card">
              <div className="award-icon-wrap">{award.icon}</div>
              <div className="award-title">{award.title}</div>
              <div className="award-desc">{award.desc}</div>
              <div className="award-year">{award.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
