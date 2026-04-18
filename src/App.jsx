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
      <CTABand />
      <Contact />
      <footer className="footer">
        <div className="section-container">
          <div className="footer-inner">
            <span className="footer-copy">
              &copy; 2026 Zainul Abideen EH — Full Stack Developer &amp; Team Lead.
            </span>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#work">Work</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
