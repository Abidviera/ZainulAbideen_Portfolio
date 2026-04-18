import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

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

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll('.reveal');
      reveals?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const cards = sectionRef.current?.querySelectorAll('.expertise-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section" id="testimonials">
      <div className="testimonials-bg-accent" />
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

        <div className="testimonials-grid">
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
