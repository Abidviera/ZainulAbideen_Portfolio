import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

// ── SVG Decorations ──────────────────────────────────────────
const PushPin = ({ color = '#FF4F00', style }) => (
  <svg className="pushpin" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M20 4C13.373 4 8 9.373 8 16C8 22.627 13.373 28 20 28C26.627 28 32 33.373 32 40V44H8V48H32V44L26.5 38.5C30.641 34.359 33 28.627 33 22C33 12.611 25.389 5 16 5H14C12.895 5 12 5.895 12 7V7C12 8.105 12.895 9 14 9H16C19.866 9 23 12.134 23 16C23 19.866 19.866 23 16 23C12.134 23 9 19.866 9 16C9 12.134 12.134 9 16 9H20C21.105 9 22 8.105 22 7V7C22 5.895 21.105 5 20 5C17.791 5 16 6.791 16 9V9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="48" r="4" fill={color}/>
  </svg>
);

const WashiTape = ({ color = '#FFB800', angle = -3, width = 80, style }) => (
  <div className="washi-tape" style={{
    background: `repeating-linear-gradient(
      90deg,
      ${color} 0px,
      ${color} 4px,
      transparent 4px,
      transparent 8px
    )`,
    width,
    height: 24,
    transform: `rotate(${angle}deg)`,
    opacity: 0.85,
    ...style,
  }} />
);

const StampMark = ({ text, color = '#E53935' }) => (
  <div className="stamp-mark" style={{
    borderColor: color,
    color,
  }}>
    <span>{text}</span>
  </div>
);

const StringConnection = ({ x1, y1, x2, y2, color = '#1d1d1f' }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} Q ${midX} ${midY + 30} ${x2} ${y2}`;
  return (
    <svg className="string-connection" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 1 }}>
      <path d={d} stroke={color} strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.35" />
    </svg>
  );
};

const PostItNote = ({ text, color = '#FFE066' }) => (
  <div className="postit-note" style={{ background: color }}>
    <span>{text}</span>
  </div>
);

// ── Polaroid Card ────────────────────────────────────────────
const PolaroidCard = ({ project, index, onOpen, cardRef }) => {
  const innerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rotations = [3, -4, 5, -2, 4, -3, 2, -5];
  const rot = rotations[index % rotations.length];

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      gsap.to(el, {
        rotateY: dx * 12,
        rotateX: -dy * 8,
        scale: 1.06,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: rot,
        rotateX: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rot]);

  return (
    <div
      ref={cardRef}
      className={`polaroid-card polaroid-${index % 6}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
    >
      {/* Pushpin */}
      <div className="polaroid-pin">
        <PushPin color={project.color} />
      </div>

      {/* Polaroid frame */}
      <div
        ref={innerRef}
        className="polaroid-inner"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <div className="polaroid-img-wrap">
          <img src={project.img} alt={project.title} className="polaroid-img" loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }} />
          <div className="polaroid-overlay">
            <button className="polaroid-view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              View
            </button>
          </div>
        </div>
        <div className="polaroid-label">
          <span className="polaroid-title">{project.title}</span>
          <span className="polaroid-category">{project.category}</span>
        </div>
      </div>

      {/* Washi tape decoration */}
      <div className="polaroid-tape">
        <WashiTape color={project.color} width={70} angle={rot - 8} />
      </div>

      {/* Stamp */}
      <div className="polaroid-stamp">
        <StampMark text={project.year} color={project.color} />
      </div>
    </div>
  );
};

// ── Magazine Feature Card ──────────────────────────────────────
const MagazineCard = ({ project, onOpen }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(card, {
        '--mx': `${x}px`,
        '--my': `${y}px`,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`magazine-card ${hovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
    >
      <div className="magazine-img-wrap">
        <img src={project.img} alt={project.title} className="magazine-img" loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }} />
        <div className="magazine-img-overlay" />
        <div className="magazine-category-tag" style={{ '--mc': project.color }}>
          {project.category}
        </div>
        <div className="magazine-number">
          {String(project.id).padStart(2, '0')}
        </div>
      </div>

      <div className="magazine-content">
        <div className="magazine-meta">
          <span className="magazine-year">{project.year}</span>
          <span className="magazine-sep">—</span>
          <span className="magazine-tech">{project.tech[0]}</span>
        </div>
        <h3 className="magazine-title">{project.title}</h3>
        <p className="magazine-desc">{project.description}</p>

        <div className="magazine-tech-list">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="magazine-tech-tag">{t}</span>
          ))}
        </div>

        <div className="magazine-cta">
          <span>Explore Project</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      {/* Tear/rough edge top */}
      <div className="magazine-tear-top" />
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
const FALLBACK_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23f5f5f7" width="800" height="600"/%3E%3Ctext x="400" y="310" text-anchor="middle" fill="%238e8e93" font-family="system-ui" font-size="16"%3EImage unavailable%3C/text%3E%3C/svg%3E';

const projects = [
  {
    id: 1,
    title: 'CAAD ERP Solution',
    category: 'Enterprise ERP',
    description: 'Comprehensive ERP platform integrating inventory, billing, CRM, and reporting modules. Designed for enterprise scalability and real-time data handling, improving operational efficiency across departments.',
    tech: ['NestJS', 'Angular 18', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: '#FF4F00',
    year: '2025',
  },
  {
    id: 2,
    title: 'Melizzo E-Commerce',
    category: 'E-Commerce',
    description: 'Full-featured e-commerce software platform with a React frontend and ASP.NET Core backend. Supports product listings, shopping cart, order management, secure payment processing.',
    tech: ['React', 'ASP.NET Core', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    color: '#6366f1',
    year: '2025',
  },
  {
    id: 3,
    title: 'JetFuel Corporate',
    category: 'Corporate Web',
    description: 'Corporate web application delivering a high-performance, responsive user experience with dynamic content management, optimized page load, and seamless backend integration.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    color: '#10b981',
    year: '2024',
  },
  {
    id: 4,
    title: 'Mark Media Platform',
    category: 'Digital Media',
    description: 'Digital media management platform built with React frontend and ASP.NET Core backend. Enables content creation, publishing workflows, and media asset management.',
    tech: ['React', 'ASP.NET Core', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    color: '#f59e0b',
    year: '2024',
  },
  {
    id: 5,
    title: 'Al Bayan Businessmen',
    category: 'Business Network',
    description: 'Business networking and management platform for professionals. Features include member profiles, business directory, event management, and collaborative tools.',
    tech: ['NestJS', 'Angular', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    color: '#8b5cf6',
    year: '2024',
  },
  {
    id: 6,
    title: 'Learning Management',
    category: 'EdTech',
    description: 'End-to-end e-learning platform with course creation, student enrollment, progress tracking, assessments, and role-based access for admins, instructors, and students.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    color: '#ec4899',
    year: '2024',
  },
  {
    id: 7,
    title: 'Travel Expense Tracker',
    category: 'FinTech',
    description: 'Travel expense and income management system with multi-role support, trip tracking, expense logging, reimbursements, and real-time financial reporting.',
    tech: ['ASP.NET Core', 'Angular 18', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    color: '#84cc16',
    year: '2024',
  },
  {
    id: 8,
    title: 'CartX E-Commerce',
    category: 'E-Commerce',
    description: 'Scalable e-commerce application with shopping cart, order management, and secure checkout, focusing on UI responsiveness and backend performance.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    color: '#14b8a6',
    year: '2023',
  },
  {
    id: 9,
    title: 'Sales App',
    category: 'Sales Management',
    description: 'Dynamic sales management application for sales representatives and administrators. Enables creating, updating, and managing customer orders, handling returns, and tracking daily sales with reporting and performance analytics.',
    tech: ['NestJS', 'Angular', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    color: '#f97316',
    year: '2024',
  },
  {
    id: 10,
    title: 'Self Food Ordering Kiosk',
    category: 'Self-Service',
    description: 'Self-service food ordering system allowing customers to browse menus, customize orders, and complete transactions without staff intervention. Built with responsive UI and real-time order management.',
    tech: ['NestJS', 'Angular', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    color: '#ef4444',
    year: '2024',
  },
  {
    id: 11,
    title: 'Job Portal System',
    category: 'Job Platform',
    description: 'Full-stack job portal with Admin, Employer, and Job Seeker modules. Features include role-based access, job management, profile handling, and secure JWT authentication.',
    tech: ['ASP.NET Core', 'Angular', 'Web API', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    color: '#8b5cf6',
    year: '2024',
  },
  {
    id: 12,
    title: 'CYANSTORE E-Commerce',
    category: 'E-Commerce',
    description: 'End-to-end e-commerce system supporting multi-category product listings, shopping carts, and secure payments, offering a seamless and responsive user experience.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    color: '#06b6d4',
    year: '2023',
  },
  {
    id: 13,
    title: 'Library Management System',
    category: 'Library',
    description: 'Complete library solution for managing book inventories, user roles, and borrowing activities with secure authentication and real-time updates.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
    color: '#a855f7',
    year: '2023',
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const modalCardRef = useRef(null);
  const closeButtonRef = useRef(null);
  const polaroidRefs = useRef([]);
  const magazineRefs = useRef([]);
  const previouslyFocused = useRef(null);

  const openModal = useCallback((project) => {
    previouslyFocused.current = document.activeElement;
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      modalRef.current?.querySelector('.modal-card'),
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
    );
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
  }, []);

  const closeModal = useCallback(() => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
        previouslyFocused.current?.focus();
      },
    });
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = modalCardRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProject, closeModal]);

  // ── Scroll-triggered animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo('.fw-header-anim', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.fw-header-anim', start: 'top 85%' },
      });

      // Polaroid cards stagger
      polaroidRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.7, rotate: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: card, start: 'top 90%' },
            delay: i * 0.08,
          }
        );
      });

      // Magazine cards
      magazineRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: i * 0.1,
          }
        );
      });

      // Post-it notes
      gsap.fromTo('.postit-note', { opacity: 0, scale: 0, rotate: -10 }, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.05,
        scrollTrigger: { trigger: '.postit-note', start: 'top 90%' },
      });

      // Stamp marks
      gsap.fromTo('.stamp-mark', { opacity: 0, scale: 2, rotate: 20 }, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: 'back.out(3)',
        stagger: 0.06,
        scrollTrigger: { trigger: '.stamp-mark', start: 'top 90%' },
      });

      // Floating decorative elements
      gsap.fromTo('.fw-deco', { opacity: 0, scale: 0.5 }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.fw-deco', start: 'top 90%' },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = useMemo(() => projects.slice(0, 4), []);
  const rest = useMemo(() => projects.slice(4), []);

  return (
    <section ref={sectionRef} className="work-section" id="work">
      {/* ── SECTION HEADER ── */}
      <div className="section-container">
        <div className="fw-header-anim">
          <div className="fw-section-label label-chip accent">
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
            Portfolio Work
          </div>
          <div className="fw-header-row">
            <div className="fw-header-left">
              <h2 className="fw-main-title">Selected<br /><em>Works</em></h2>
              <p className="fw-header-desc">
                A curated collection of projects that showcase full-stack craftsmanship,
                from enterprise systems to pixel-perfect web experiences.
              </p>
            </div>
            <div className="fw-header-right">
              <div className="fw-counter-block">
                <span className="fw-counter-num">{projects.length}</span>
                <span className="fw-counter-label">Projects<br/>Showcased</span>
              </div>
              <div className="fw-counter-block">
                <span className="fw-counter-num">6+</span>
                <span className="fw-counter-label">Tech<br/>Stacks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCATTERED POLAROID GRID ── */}
      <div className="section-container">
        <div className="fw-scrapbook-grid">
          {/* String connections */}
          <StringConnection x1={180} y1={120} x2={420} y2={80} />
          <StringConnection x1={520} y1={200} x2={680} y2={350} color="#FF4F00" />
          <StringConnection x1={100} y1={380} x2={300} y2={420} color="#6366f1" />

          {/* Decorative post-it notes */}
          <PostItNote text="Full Stack" color="#FFE066" />
          <PostItNote text="Angular 18" color="#C8E6C9" />
          <PostItNote text="NestJS + MongoDB" color="#B3E5FC" />
          <PostItNote text="React" color="#FFCDD2" />

          {/* Polaroid cards */}
          {featured.map((project, i) => (
            <PolaroidCard
              key={project.id}
              project={project}
              index={i}
              onOpen={openModal}
              cardRef={(el) => { polaroidRefs.current[i] = el; }}
            />
          ))}

          {/* Decorative stamps */}
          <div className="fw-deco-stamp fw-deco">
            <StampMark text="AWARD" color="#E53935" />
          </div>
          <div className="fw-deco-stamp2 fw-deco">
            <StampMark text="TOP" color="#1E88E5" />
          </div>
        </div>
      </div>

      {/* ── MAGAZINE FEATURE SECTION ── */}
      <div className="fw-magazine-section">
        <div className="section-container">
          <div className="fw-magazine-header">
            <div className="fw-magazine-header-line fw-deco" />
            <h3 className="fw-magazine-heading">More Projects</h3>
            <div className="fw-magazine-header-line fw-deco" />
          </div>

          <div className="fw-magazine-grid">
            {rest.map((project, i) => (
              <MagazineCard
                key={project.id}
                project={project}
                onOpen={openModal}
                ref={(el) => { magazineRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="modal-backdrop"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            ref={modalCardRef}
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              ref={closeButtonRef}
              className="modal-close"
              onClick={closeModal}
              aria-label="Close project details"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-img-wrap">
              <img src={selectedProject.img} alt={selectedProject.title} className="modal-img" onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }} />
              <div className="modal-category-chip" style={{ '--card-color': selectedProject.color }}>
                {selectedProject.category}
              </div>
            </div>

            <div className="modal-content">
              <h2 id="modal-title" className="modal-title">{selectedProject.title}</h2>
              <p className="modal-desc">{selectedProject.description}</p>

              <div className="modal-tech-section">
                <span className="modal-tech-label">Tech Stack</span>
                <div className="modal-tech-tags">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="modal-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <a href="mailto:zainulzain043@gmail.com" className="modal-cta">
                  Discuss This Project
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
