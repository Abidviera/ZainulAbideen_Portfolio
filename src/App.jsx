import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import CustomCursor from './components/CustomCursor/CustomCursor';
import Marquee from './components/Marquee/Marquee';
import ScrollHero from './components/ScrollHero/ScrollHero';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Stats from './components/Stats/Stats';
import Services from './components/Services/Services';
import Experience from './components/Experience/Experience';
import Work from './components/Work/Work';
import Testimonials from './components/Testimonials/Testimonials';
import Awards from './components/Awards/Awards';
import Contact from './components/Contact/Contact';
import FooterHero from './components/FooterHero/FooterHero';

gsap.registerPlugin(ScrollTrigger);

function CTABand() {
  return (
    <section className="cta-band">
      <div className="section-container">
        <div className="cta-band-inner">
          <div className="section-tag label-chip accent" style={{ marginBottom: 'var(--space-md)' }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
            Let's Build Together
          </div>
          <h2>Have a project<br />in mind?</h2>
          <p>
            Let's discuss how we can transform your vision into a powerful, scalable application that drives real results.
          </p>
          <a href="#contact" className="btn-primary">
            Start a Conversation
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="app">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      <ScrollHero />
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Experience />
      <Work />
      <Testimonials />
      <Awards />
      <FooterHero />
      <footer className="footer">
        <div className="footer-watermark" aria-hidden="true">
          Zainul<br />Abideen EH
        </div>

        <div className="footer-marquee-band">
          <div className="footer-marquee-track">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="footer-marquee-item">
                Let&apos;s Work Together
                <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        <div className="footer-contact">
          <a href="mailto:zainulzain043@gmail.com" className="footer-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            zainulzain043@gmail.com
          </a>
          <span className="footer-contact-sep" />
          <a href="tel:+919567430043" className="footer-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
            +91 9567430043
          </a>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">2026</span>
          <span className="footer-rights">All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
