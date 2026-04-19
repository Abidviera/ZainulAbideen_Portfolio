import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './ProjectModal.css';

const TECH_ICONS = {
  'NestJS': 'N', 'Angular': 'A', 'Angular 18': 'A', 'React': 'R',
  'MongoDB': 'M', 'ASP.NET Core': 'AS', 'SQL Server': 'SS', 'JWT': 'J',
  'Web API': 'W', 'TypeScript': 'TS', 'JavaScript': 'JS', 'Node.js': 'N',
  'PostgreSQL': 'P', 'Docker': 'D', 'AWS': 'AW', 'Redis': 'Rd',
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const GalleryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const heroPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const galleryRef = useRef(null);
  const statsRef = useRef(null);
  const techRef = useRef(null);
  const featuresRef = useRef(null);
  const closeBtnRef = useRef(null);
  const particlesRef = useRef(null);
  const previouslyFocused = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const gallery = project.gallery || [project.img, project.img, project.img];

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  // ── Open Animation ──
  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    window.__LENIS__?.stop();

    const tl = gsap.timeline();

    // Backdrop
    tl.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    // Modal container scale from 0.92 → 1
    tl.fromTo(modalRef.current,
      { opacity: 0, scale: 0.88, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'expo.out' },
      '-=0.3'
    );

    // Hero panel parallax in
    tl.fromTo(heroPanelRef.current,
      { opacity: 0, x: -40, scale: 1.05 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // Content panel slide in from right
    tl.fromTo(contentPanelRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.6'
    );

    // Stagger reveal content items
    const contentItems = contentPanelRef.current?.querySelectorAll('.pm-reveal');
    if (contentItems?.length) {
      tl.fromTo(contentItems,
        { opacity: 0, y: 20, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07 },
        '-=0.4'
      );
    }

    // Stats count up
    setTimeout(() => {
      const numEls = statsRef.current?.querySelectorAll('.pm-stat-num[data-value]');
      if (numEls) {
        numEls.forEach((el) => {
          const target = parseInt(el.dataset.value, 10);
          gsap.fromTo(el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              delay: 0.2,
            }
          );
        });
      }
    }, 600);

    // Tech cards stagger
    setTimeout(() => {
      const techCards = techRef.current?.querySelectorAll('.pm-tech-card');
      if (techCards?.length) {
        gsap.fromTo(techCards,
          { opacity: 0, scale: 0.7, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.7)', stagger: 0.06 }
        );
      }
    }, 800);

    // Features stagger
    setTimeout(() => {
      const featureItems = featuresRef.current?.querySelectorAll('.pm-feature-item');
      if (featureItems?.length) {
        gsap.fromTo(featureItems,
          { opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out', stagger: 0.08 }
        );
      }
    }, 900);

    requestAnimationFrame(() => closeBtnRef.current?.focus());
  }, []);

  // ── Close Animation ──
  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        window.__LENIS__?.start();
        onClose();
        previouslyFocused.current?.focus();
      },
    });

    tl.to(modalRef.current, {
      scale: 0.9, opacity: 0, y: 20, duration: 0.35, ease: 'power3.in',
    });
    tl.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
  }, [onClose]);

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') setActiveSlide((s) => (s + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActiveSlide((s) => (s - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, gallery.length]);

  // ── Mouse parallax on hero ──
  useEffect(() => {
    const hero = heroPanelRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      gsap.to(hero.querySelector('.pm-hero-img'), {
        x: dx * 12, y: dy * 8, duration: 0.8, ease: 'power2.out',
      });
      gsap.to(hero.querySelector('.pm-hero-overlay'), {
        opacity: 0.4 + Math.abs(dx) * 0.1 + Math.abs(dy) * 0.1, duration: 0.5,
      });
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  // ── Gallery slide transition ──
  const goToSlide = useCallback((idx) => {
    gsap.to(galleryRef.current?.querySelector('.pm-gallery-img'), {
      opacity: 0, x: -20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActiveSlide(idx);
        gsap.fromTo(galleryRef.current?.querySelector('.pm-gallery-img'),
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });
  }, []);

  // ── Hero panel mouse move for orb glow ──
  const handleHeroMouse = useCallback((e) => {
    const panel = heroPanelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const statItems = project.stats || [
    { value: 98, suffix: '%', label: 'Performance Score' },
    { value: 4, suffix: 'x', label: 'Faster Development' },
    { value: 50, suffix: '+', label: 'Active Users' },
  ];

  const features = project.features || [
    'Responsive cross-platform UI/UX',
    'Secure JWT authentication',
    'Real-time data synchronization',
    'Optimized database queries',
  ];

  return (
    <div className="pm-backdrop" ref={backdropRef} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      {/* Floating ambient orbs */}
      <div className="pm-ambient-orb pm-orb-1" style={{ '--ox': `${mousePos.x}%`, '--oy': `${mousePos.y}%`, '--oc': project.color }} />
      <div className="pm-ambient-orb pm-orb-2" style={{ '--ox': `${mousePos.x}%`, '--oy': `${mousePos.y}%`, '--oc': project.color }} />

      <div className="pm-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="pm-title">
        {/* Close Button */}
        <button ref={closeBtnRef} className="pm-close" onClick={handleClose} aria-label="Close project">
          <CloseIcon />
        </button>

        {/* ── HERO IMAGE PANEL ── */}
        <div className="pm-hero-panel" ref={heroPanelRef} onMouseMove={handleHeroMouse}>
          <img
            src={gallery[activeSlide]}
            alt={project.title}
            className="pm-hero-img"
            onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23f5f5f7" width="800" height="600"/%3E%3Ctext x="400" y="310" text-anchor="middle" fill="%238e8e93" font-family="system-ui" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E'; }}
          />
          <div className="pm-hero-overlay" />

          {/* Floating project badge */}
          <div className="pm-hero-badge pm-reveal">
            <span className="pm-hero-badge-num">{String(project.id).padStart(2, '0')}</span>
            <span className="pm-hero-badge-sep">/</span>
            <span className="pm-hero-badge-total">{String(gallery.length).padStart(2, '0')}</span>
          </div>

          {/* Category chip */}
          <div className="pm-hero-category pm-reveal" style={{ '--pc': project.color }}>
            {project.category}
          </div>

          {/* Gallery navigation */}
          <div className="pm-hero-gallery-nav">
            {gallery.map((_, i) => (
              <button
                key={i}
                className={`pm-gallery-dot ${i === activeSlide ? 'is-active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`View image ${i + 1}`}
                style={{ '--pc': project.color }}
              />
            ))}
          </div>

          {/* Gallery controls */}
          <div className="pm-hero-gallery-controls">
            <button
              className="pm-gallery-btn"
              onClick={() => goToSlide((activeSlide - 1 + gallery.length) % gallery.length)}
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button className="pm-gallery-btn" onClick={() => setIsGalleryFullscreen(true)} aria-label="View fullscreen">
              <GalleryIcon />
            </button>
            <button
              className="pm-gallery-btn"
              onClick={() => goToSlide((activeSlide + 1) % gallery.length)}
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── CONTENT PANEL ── */}
        <div className="pm-content-panel" ref={contentPanelRef}>
          <div className="pm-content-inner">

            {/* Title Block */}
            <div className="pm-title-block pm-reveal">
              <div className="pm-year-badge">
                <CalendarIcon />
                <span>{project.year}</span>
              </div>
              <h2 id="pm-title" className="pm-title">{project.title}</h2>
              <p className="pm-description">{project.description}</p>
            </div>

            {/* Stats */}
            <div className="pm-stats-row" ref={statsRef}>
              {statItems.map((stat, i) => (
                <div key={i} className="pm-stat-card pm-reveal">
                  <span
                    className="pm-stat-num"
                    data-value={stat.value}
                    style={{ color: project.color }}
                  >
                    0{stat.suffix}
                  </span>
                  <span className="pm-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="pm-divider pm-reveal" />

            {/* Features */}
            <div className="pm-section pm-reveal">
              <div className="pm-section-header">
                <div className="pm-section-icon">
                  <ZapIcon />
                </div>
                <h3 className="pm-section-title">Key Highlights</h3>
              </div>
              <ul className="pm-features-list" ref={featuresRef}>
                {features.map((f, i) => (
                  <li key={i} className="pm-feature-item" style={{ '--fi': i }}>
                    <span className="pm-feature-check" style={{ color: project.color }}>
                      <CheckIcon />
                    </span>
                    <span className="pm-feature-text">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="pm-section pm-reveal">
              <div className="pm-section-header">
                <div className="pm-section-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <h3 className="pm-section-title">Tech Stack</h3>
              </div>
              <div className="pm-tech-grid" ref={techRef}>
                {project.tech.map((t, i) => (
                  <div key={t} className="pm-tech-card" style={{ '--ti': i, '--tc': project.color }}>
                    <span className="pm-tech-abbr">
                      {TECH_ICONS[t] || t.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="pm-tech-name">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team & Duration Meta */}
            <div className="pm-meta-row pm-reveal">
              <div className="pm-meta-item">
                <UsersIcon />
                <span>{project.team || 'Full Stack Development'}</span>
              </div>
              <div className="pm-meta-sep" />
              <div className="pm-meta-item">
                <CalendarIcon />
                <span>{project.year}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pm-cta-section pm-reveal">
              <a href={`mailto:zainulzain043@gmail.com?subject=Project Inquiry: ${project.title}`} className="pm-cta-primary" style={{ '--pc': project.color }}>
                <span>Discuss This Project</span>
                <ArrowIcon />
              </a>
              <a href="https://github.com/ZainulAbideenEH" target="_blank" rel="noopener noreferrer" className="pm-cta-secondary">
                <span>View Source</span>
                <ExternalIcon />
              </a>
            </div>

          </div>
        </div>

        {/* ── FULLSCREEN GALLERY OVERLAY ── */}
        {isGalleryFullscreen && (
          <div className="pm-fullscreen-gallery" onClick={() => setIsGalleryFullscreen(false)}>
            <button className="pm-fs-close" onClick={() => setIsGalleryFullscreen(false)}>
              <CloseIcon />
            </button>
            <img
              src={gallery[activeSlide]}
              alt={`${project.title} screenshot ${activeSlide + 1}`}
              className="pm-fs-img"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="pm-fs-nav">
              <button className="pm-fs-nav-btn" onClick={(e) => { e.stopPropagation(); goToSlide((activeSlide - 1 + gallery.length) % gallery.length); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <span className="pm-fs-counter">{activeSlide + 1} / {gallery.length}</span>
              <button className="pm-fs-nav-btn" onClick={(e) => { e.stopPropagation(); goToSlide((activeSlide + 1) % gallery.length); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Floating particles */}
        <div className="pm-particles" ref={particlesRef}>
          {particles.map((p) => (
            <div
              key={p.id}
              className="pm-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
