import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'CAAD ERP Solution',
    category: 'Enterprise ERP',
    description:
      'Comprehensive ERP platform integrating inventory, billing, CRM, and reporting modules. Designed for enterprise scalability and real-time data handling, improving operational efficiency across departments.',
    tech: ['NestJS', 'Angular 18', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    featured: true,
    color: '#FF4F00',
  },
  {
    id: 2,
    title: 'Melizzo E-Commerce',
    category: 'E-Commerce',
    description:
      'Full-featured e-commerce software platform with a React frontend and ASP.NET Core backend. Supports product listings, shopping cart, order management, secure payment processing, and an intuitive admin dashboard.',
    tech: ['React', 'ASP.NET Core', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    featured: false,
    color: '#6366f1',
  },
  {
    id: 3,
    title: 'JetFuel Corporate Website',
    category: 'Corporate Web',
    description:
      'Corporate web application delivering a high-performance, responsive user experience with dynamic content management, optimized page load, and seamless backend integration.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    featured: false,
    color: '#10b981',
  },
  {
    id: 4,
    title: 'Mark Media Platform',
    category: 'Digital Media',
    description:
      'Digital media management platform built with React frontend and ASP.NET Core backend. Enables content creation, publishing workflows, and media asset management with role-based access control.',
    tech: ['React', 'ASP.NET Core', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featured: false,
    color: '#f59e0b',
  },
  {
    id: 5,
    title: 'Al Bayan Businessmen',
    category: 'Business Network',
    description:
      'Business networking and management platform for professionals. Features include member profiles, business directory, event management, and collaborative tools tailored for a professional community.',
    tech: ['NestJS', 'Angular', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    featured: false,
    color: '#8b5cf6',
  },
  {
    id: 6,
    title: 'Learning Management System',
    category: 'EdTech',
    description:
      'End-to-end e-learning platform with course creation, student enrollment, progress tracking, assessments, and role-based access for admins, instructors, and students.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    featured: false,
    color: '#ec4899',
  },
  {
    id: 7,
    title: 'Sales App',
    category: 'Sales Management',
    description:
      'Dynamic sales management application for sales representatives and administrators. Enables order creation, customer management, returns handling, daily sales tracking, and performance analytics.',
    tech: ['NestJS', 'Angular', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featured: false,
    color: '#06b6d4',
  },
  {
    id: 8,
    title: 'Self Food Ordering Kiosk',
    category: 'Kiosk / Self-Service',
    description:
      'Self-service food ordering system allowing customers to browse menus, customize orders, and complete transactions. Built with real-time order management and responsive UI for faster service.',
    tech: ['NestJS', 'Angular', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    featured: false,
    color: '#f97316',
  },
  {
    id: 9,
    title: 'Travel Expense Tracker',
    category: 'FinTech',
    description:
      'Travel expense and income management system for a Georgian client. Multi-role support (Admin, Driver, Accountant) with trip tracking, expense logging, reimbursements, and real-time financial reporting.',
    tech: ['ASP.NET Core', 'Angular 18', 'SQL Server'],
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    featured: false,
    color: '#84cc16',
  },
  {
    id: 10,
    title: 'Job Portal System',
    category: 'Job Board',
    description:
      'Full-stack job portal with Admin, Employer, and Job Seeker roles. Features include role-based access, job management, profile handling, applications tracking, and secure JWT authentication.',
    tech: ['ASP.NET Core', 'Angular', 'Web API', 'SQL'],
    img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    featured: false,
    color: '#14b8a6',
  },
  {
    id: 11,
    title: 'CyanStore E-Commerce',
    category: 'E-Commerce',
    description:
      'End-to-end e-commerce system with multi-category product listings, shopping cart, and secure payment processing, delivering a seamless and responsive shopping experience.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    featured: false,
    color: '#3b82f6',
  },
  {
    id: 12,
    title: 'CartX E-Commerce App',
    category: 'E-Commerce',
    description:
      'Scalable e-commerce application with shopping cart, order management, and secure checkout, focusing on UI responsiveness and backend performance optimization.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'Web API'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    featured: false,
    color: '#a855f7',
  },
  {
    id: 13,
    title: 'Library Management System',
    category: 'Education',
    description:
      'Complete library solution for managing book inventories, user roles, and borrowing activities with secure authentication and real-time updates.',
    tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT'],
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    featured: false,
    color: '#eab308',
  },
];

const techFilters = [
  { label: 'All', value: 'all' },
  { label: 'ASP.NET Core', value: 'ASP.NET Core' },
  { label: 'NestJS', value: 'NestJS' },
  { label: 'React', value: 'React' },
  { label: 'Angular', value: 'Angular' },
];

export default function Work() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.tech.includes(activeFilter));

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      modalRef.current?.querySelector('.modal-card'),
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
    );
  }, []);

  const closeModal = useCallback(() => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
      },
    });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.work-card-item');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.07,
      }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className="work-section" id="work">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-title-group">
            <div className="section-tag label-chip">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Portfolio Work
            </div>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <p className="section-desc">
            A selection of enterprise projects showcasing full-stack development,
            from ERP solutions and e-commerce platforms to LMS and mobile-ready applications.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="work-filters reveal">
          {techFilters.map((filter) => (
            <button
              key={filter.value}
              className={`work-filter-btn${activeFilter === filter.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
              {filter.value !== 'all' && (
                <span className="filter-count">
                  {projects.filter((p) => p.tech.includes(filter.value)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="work-grid">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="work-card-item"
              onClick={() => openModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(project)}
              aria-label={`View ${project.title}`}
            >
              <div className="work-card-img-wrap">
                <img
                  src={project.img}
                  alt={project.title}
                  className="work-card-img"
                  loading="lazy"
                />
                <div className="work-card-overlay">
                  <div className="work-overlay-inner">
                    <span className="work-overlay-cta">
                      View Details
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  className="work-card-category-badge"
                  style={{ '--card-color': project.color }}
                >
                  {project.category}
                </div>
              </div>

              <div className="work-card-content">
                <div className="work-card-header">
                  <h3 className="work-card-title">{project.title}</h3>
                  <div className="work-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="work-card-tech">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="work-tech-tag">{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="work-tech-tag work-tech-more">+{project.tech.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="work-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p>No projects found for this filter.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="modal-card">
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-img-wrap">
              <img src={selectedProject.img} alt={selectedProject.title} className="modal-img" />
              <div
                className="modal-category-chip"
                style={{ '--card-color': selectedProject.color }}
              >
                {selectedProject.category}
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">{selectedProject.title}</h2>
              </div>

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
                <a
                  href="mailto:zainulzain043@gmail.com"
                  className="modal-cta"
                >
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
