import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Expertise.css';

const expertiseCategories = [
  {
    label: 'Frontend',
    color: '#007AFF',
    skills: ['Angular', 'React', 'TypeScript', 'HTML5 / CSS3', 'Bootstrap', 'Blazor', 'Figma'],
  },
  {
    label: 'Backend',
    color: '#34C759',
    skills: ['ASP.NET Core', 'C#', 'Web API / MVC', 'NestJS / Node.js', 'Razor Pages', 'RESTful APIs'],
  },
  {
    label: 'Cloud & DevOps',
    color: '#FF9500',
    skills: ['Azure Cloud', 'Azure DevOps', 'CI/CD Pipelines', 'GitHub', 'Agile (Scrum/Kanban)', 'TDD'],
  },
  {
    label: 'Database & Mobile',
    color: '#AF52DE',
    skills: ['SQL Server', 'MongoDB', 'Entity Framework', '.NET MAUI', 'SQLite', 'ORM'],
  },
];

export default function Expertise() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header — clip-path wipe
      gsap.fromTo(
        sectionRef.current?.querySelector('.section-header'),
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          duration: 1,
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

      // Cards — scale + glow reveal
      const cards = sectionRef.current?.querySelectorAll('.expertise-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.85, rotateZ: -2 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.9,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12,
          }
        );
      });

      // Skill tags — wave stagger
      const tags = sectionRef.current?.querySelectorAll('.expertise-skill-tag');
      tags?.forEach((tag, i) => {
        gsap.fromTo(
          tag,
          { opacity: 0, y: 8, scale: 0.7 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: tag,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
            delay: (i % 7) * 0.06,
          }
        );
      });

      // Background accent parallax
      const bgAccent = sectionRef.current?.querySelector('.expertise-bg-accent');
      if (bgAccent) {
        gsap.to(bgAccent, {
          y: -100,
          x: 60,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="expertise-section" id="expertise">
      <div className="expertise-bg-accent" />
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Technical Expertise
            </div>
            <h2 className="section-title">Technologies<br />I Work With</h2>
          </div>
          <p className="section-desc">
            Full-stack expertise across modern frameworks, cloud platforms, and enterprise-grade tools. From pixel-perfect UIs to scalable backend architectures.
          </p>
        </div>

        <div className="expertise-grid">
          {expertiseCategories.map((category) => (
            <div key={category.label} className="bento-card expertise-card">
              <div className="expertise-header">
                <div
                  className="expertise-icon"
                  style={{ '--ec': category.color }}
                >
                  {category.label === 'Frontend' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                  {category.label === 'Backend' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  )}
                  {category.label === 'Cloud & DevOps' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                  )}
                  {category.label === 'Database & Mobile' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  )}
                </div>
                <h3 className="expertise-title" style={{ color: category.color }}>
                  {category.label}
                </h3>
              </div>
              <div className="expertise-skills">
                {category.skills.map((skill) => (
                  <span key={skill} className="expertise-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
