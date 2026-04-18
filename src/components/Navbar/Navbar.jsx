import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const getScrollHeroHeight = () => window.innerHeight * 5;
    const handleScroll = () => setScrolled(window.scrollY > getScrollHeroHeight());
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-based active section detection
  useEffect(() => {
    const sectionIds = ['about', 'services', 'work', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#" className="navbar-logo">
            <span className="navbar-logo-dot" />
            ZA
          </a>

          <ul className="navbar-links">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive ? 'active' : ''}
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                    {isActive && <span className="nav-pill-indicator" />}
                  </a>
                </li>
              );
            })}
          </ul>

          <a href="#contact" className="navbar-cta">
            Let's Talk
          </a>

          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span
              style={{
                transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span
              style={{
                transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => handleNavClick(link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="navbar-cta"
          onClick={() => handleNavClick('#contact')}
          style={{ marginTop: '16px' }}
        >
          Let's Talk
        </a>
      </div>
    </>
  );
}
