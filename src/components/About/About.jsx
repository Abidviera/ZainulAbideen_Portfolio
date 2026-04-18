import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', pct: 92 },
  { name: 'TypeScript', pct: 88 },
  { name: 'UI/UX Design', pct: 85 },
  { name: 'Performance Optimization', pct: 80 },
];

const tools = [
  'Figma', 'VS Code', 'Vercel', 'Git',
  'Framer', 'Three.js', 'Tailwind', 'GSAP',
  'Node.js', 'Docker', 'Storybook', 'Playwright',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal all .reveal elements — 20px slide-up, easy ease
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
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.05,
          }
        );
      });

      // Skill bars
      const fills = sectionRef.current?.querySelectorAll('.skill-bar-fill');
      fills?.forEach((fill) => {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fill,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              About Me
            </div>
            <h2 className="section-title">Crafting Digital<br />Experiences</h2>
          </div>
          <p className="section-desc">
            Passionate about building interfaces that are as beautiful as they are
            functional — with an obsession for detail and performance.
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
                Based in Karachi, PK
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
              <span className="exp-year-num">5+</span>
              <span className="exp-year-unit">Years</span>
              <span className="exp-year-sub">in Development</span>
            </div>
          </div>

          {/* About text */}
          <div className="bento-card reveal about-text-block">
            <h3>Hello, I'm Zainul</h3>
            <p>
              A frontend developer and designer with over five years of experience
              building web applications for startups and enterprise clients alike. I
              specialize in React ecosystems, performance optimization, and design
              systems that scale. My approach blends technical precision with a
              strong aesthetic sensibility — because great software should also feel
              great to use.
            </p>
            <p style={{ marginTop: 16 }}>
              When I'm not coding, you'll find me exploring motion design
              techniques, contributing to open-source, or sketching UI concepts for
              side projects.
            </p>
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
