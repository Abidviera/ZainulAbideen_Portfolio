import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Fintech Dashboard',
    category: 'Web Application',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    wide: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    wide: false,
  },
  {
    id: 3,
    title: 'AI Writing Assistant',
    category: 'SaaS Product',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    wide: false,
  },
  {
    id: 4,
    title: 'Health & Wellness App',
    category: 'Mobile-First',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    wide: false,
  },
];

export default function Work() {
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
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.05,
          }
        );
      });

      const cards = sectionRef.current?.querySelectorAll('.work-card');
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
    <section ref={sectionRef} className="work-section" id="work">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Selected Work
            </div>
            <h2 className="section-title">Recent Projects</h2>
          </div>
          <p className="section-desc">
            A curated selection of projects showcasing my range — from complex
            dashboards to marketing sites and full-stack applications.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bento-card work-card"
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title}`}
            >
              <img
                src={project.img}
                alt={project.title}
                className="work-card-img"
                loading="lazy"
              />
              <div className="work-card-overlay">
                <div className="work-card-title">{project.title}</div>
                <div className="work-card-cat">{project.category}</div>
              </div>
              <div className="work-card-body">
                <div className="work-card-info">
                  <span className="work-card-name">{project.title}</span>
                  <span className="work-card-type">{project.category}</span>
                </div>
                <div className="work-card-arrow">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="work-cta reveal">
          <a href="#" className="btn-secondary">
            View All Projects
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
