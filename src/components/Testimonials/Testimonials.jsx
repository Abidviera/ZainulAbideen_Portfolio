import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Zainul's expertise in ASP.NET Core and Angular transformed our legacy systems into a modern, scalable architecture. His leadership reduced our delivery time by 35% while maintaining exceptional code quality.",
    name: 'James Mitchell',
    role: 'CTO, AISERWIN',
    avatar: 'JM',
    color: 'default',
    stars: 5,
  },
  {
    text: "Working with Zainul was a game-changer. He delivered our CAAD ERP platform ahead of schedule with zero critical bugs. His ability to bridge business requirements and technical implementation is rare.",
    name: 'Sarah Al-Rashid',
    role: 'Director of Operations, CAAD',
    avatar: 'SA',
    color: 'alt',
    stars: 5,
  },
  {
    text: "Exceptional full-stack developer who consistently delivered beyond expectations. His NestJS microservices architecture now handles 50K+ concurrent users flawlessly. Highly recommend for enterprise projects.",
    name: 'Michael Chen',
    role: 'Engineering Manager, Tech Innovators',
    avatar: 'MC',
    color: 'teal',
    stars: 5,
  },
];

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="testimonial-star">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

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

      const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
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
              Testimonials
            </div>
            <h2 className="section-title">What Clients<br />Say About Me</h2>
          </div>
          <p className="section-desc">
            Trusted by industry leaders and peers who have experienced the impact of collaborative, high-quality engineering work.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="bento-card testimonial-card">
              <div className="testimonial-quote-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>
              <div className="testimonial-author">
                <div className={`testimonial-avatar ${t.color}`}>{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
