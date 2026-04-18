import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    role: 'Team Lead — Full Stack Development',
    company: 'AISERWIN — UAE (Remote)',
    date: '2023 — Present',
    desc: 'Leading end-to-end project delivery, architecting enterprise solutions on Azure Cloud, managing cross-functional teams, and driving Agile sprints. Spearheaded development of CAAD ERP and multiple enterprise platforms.',
    color: 'default',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    date: '2021 — 2023',
    desc: 'Designed and developed scalable web applications using ASP.NET Core, Angular, and React. Led backend architecture for e-commerce platforms serving 10K+ daily active users.',
    color: 'alt',
  },
  {
    role: 'Software Developer',
    company: 'Digital Solutions Pvt. Ltd.',
    date: '2019 — 2021',
    desc: 'Built RESTful APIs and backend services with ASP.NET Core. Collaborated on enterprise CRM and ERP modules, contributing to a 40% reduction in system downtime through optimized database queries.',
    color: 'teal',
  },
];

export default function Experience() {
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
            delay: i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const dots = sectionRef.current?.querySelectorAll('.timeline-dot');
      dots?.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        );
      });

      const contents = sectionRef.current?.querySelectorAll('.timeline-content');
      contents?.forEach((content, i) => {
        gsap.fromTo(
          content,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="experience-section" id="experience">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Career Journey
            </div>
            <h2 className="section-title">Where I've<br />Made Impact</h2>
          </div>
          <p className="section-desc">
            A track record of delivering enterprise-grade solutions, leading high-performance teams, and architecting systems at scale.
          </p>
        </div>

        <div className="timeline">
          {timelineData.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className={`timeline-dot ${item.color}`} />
              <div className="timeline-content bento-card reveal">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-company">{item.company}</div>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
