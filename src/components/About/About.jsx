import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

const skills = [
  { name: 'ASP.NET Core / C#', pct: 92 },
  { name: 'Angular / React', pct: 90 },
  { name: 'NestJS / Node.js', pct: 85 },
  { name: 'Azure Cloud / DevOps', pct: 80 },
];

const tools = [
  'Angular', 'React', 'TypeScript', 'ASP.NET Core',
  'NestJS', 'SQL Server', 'MongoDB', 'Azure',
  'Azure DevOps', '.NET MAUI', 'Entity Framework', 'Figma',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header — clip-path wipe + fade
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

      // Section description fade in after header
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
          delay: 0.3,
        }
      );

      // Bento cards — varied staggered reveals
      const bentoCards = sectionRef.current?.querySelectorAll('.about-grid > .bento-card');
      bentoCards?.forEach((card, i) => {
        const anims = [
          { x: 0, y: 50, opacity: 0, rotateZ: 3 },
          { x: -40, y: 0, opacity: 0, rotateZ: 0 },
          { x: 0, y: 60, opacity: 0, rotateZ: -2 },
          { x: 40, y: 0, opacity: 0, rotateZ: 0 },
          { x: 0, y: 50, opacity: 0, rotateZ: 2 },
        ];
        const a = anims[i % anims.length];
        gsap.fromTo(
          card,
          { ...a, scale: 0.88 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 0.85,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });

      // Skill bars — clip-path reveal from left
      const fills = sectionRef.current?.querySelectorAll('.skill-bar-fill');
      fills?.forEach((fill, i) => {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: fill,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        );
      });

      // Tool chips — wave stagger
      const toolChips = sectionRef.current?.querySelectorAll('.tool-chip');
      toolChips?.forEach((chip, i) => {
        gsap.fromTo(
          chip,
          { opacity: 0, y: 10, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: chip,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.04,
          }
        );
      });

      // Parallax on the about background orb
      const orbs = sectionRef.current?.querySelectorAll('.about-section-bg-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: i === 0 ? -80 : 50,
          x: i === 1 ? 40 : -30,
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
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-section-bg-orb" style={{ top: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,122,255,0.06) 0%, transparent 70%)', borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 0 }} />
      <div className="about-section-bg-orb" style={{ bottom: '10%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 0 }} />
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              About Me
            </div>
            <h2 className="section-title">Building Scalable<br />Enterprise Solutions</h2>
          </div>
          <p className="section-desc">
            Results-driven Full Stack Developer and Team Lead with expertise in
            ASP.NET Core, Angular, React, NestJS, and Azure Cloud.
          </p>
        </div>

        <div className="about-grid bento-grid">
          {/* Availability */}
          <div className="bento-card reveal">
            <div className="about-availability-badge">
              <div className="availability-pulse" />
              Currently Available
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div className="label-chip" style={{ fontSize: 10 }}>
                Based in Thrissur, Kerala
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bento-card reveal">
            <h4 style={{ marginBottom: 'var(--space-md)', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>
              Technical Skills
            </h4>
            <div className="skill-bars">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-bar-item">
                  <div className="skill-bar-header">
                    <span className="skill-bar-name">{skill.name}</span>
                    <span className="skill-bar-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ transformOrigin: 'left', '--target-pct': `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience years */}
          <div className="bento-card reveal">
            <div className="exp-year-display">
              <span className="exp-year-num">3+</span>
              <span className="exp-year-unit">Years</span>
              <span className="exp-year-sub">in Development</span>
            </div>
          </div>

          {/* About text */}
          <div className="bento-card reveal about-text-block">
            <h3>Hello, I'm Zainul</h3>
            <p>
              A Full Stack Developer and Team Lead with expertise in designing,
              developing, and deploying scalable enterprise web and mobile applications.
              I specialize in ASP.NET Core, Angular, React, NestJS, and Azure Cloud,
              with strong skills in system architecture design and CI/CD pipelines.
            </p>
            <p style={{ marginTop: 16 }}>
              Currently leading end-to-end project delivery at AISERWIN, managing
              teams, and architecting enterprise solutions on Azure. Adept in Agile
              methodologies, code review, and mentoring junior developers.
            </p>
            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <a
                href="/resume.pdf"
                download="Zainul_Abideen_EH_Resume.pdf"
                className="contact-cta-btn"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
              <a
                href="https://linkedin.com/in/zainul-abideen-eh"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cta-btn"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-heading)' }}
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="bento-card reveal">
            <h4 style={{ marginBottom: 'var(--space-md)', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>
              Tools & Technologies
            </h4>
            <div className="tools-grid">
              {tools.map((tool) => (
                <div key={tool} className="tool-chip">{tool}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
