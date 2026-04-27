import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { initLenis, destroyLenis } from './lib/lenis';
import './App.css';

import About from './components/About/About';
import Awards from './components/Awards/Awards';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Experience from './components/Experience/Experience';
import Expertise from './components/Expertise/Expertise';
import FooterHero from './components/FooterHero/FooterHero';
import Hero from './components/Hero/Hero';
import { LinkedInSection } from './components/LinkedInSection/LinkedInSection';
import Marquee from './components/Marquee/Marquee';
import Navbar from './components/Navbar/Navbar';
import ScrollHero from './components/ScrollHero/ScrollHero';
import Services from './components/Services/Services';
import Stats from './components/Stats/Stats';
import Work from './components/Work/Work';

const ProjectDetail = lazy(() => import('./components/Work/ProjectDetail'));
const FloatingActions = lazy(() => import('./components/FloatingActions/FloatingActions'));
const SplineSceneBasic = lazy(() =>
  import('./components/ui/spline-demo').then((module) => ({ default: module.SplineSceneBasic }))
);

gsap.registerPlugin(ScrollTrigger);

// Global ScrollTrigger defaults for performance
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  fastScrollEnd: true,
  preventOverlaps: true,
});

// Scroll restoration on route change
function ScrollRestore() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    window.__LENIS__?.scrollTo(0, { duration: 0 });
  }, [pathname]);
  return null;
}

// Home page — includes ScrollHero
function HomePage({ greetingDone, setGreetingDone }) {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      const footer = footerRef.current;

      // Watermark — dramatic clip reveal
      gsap.fromTo(
        footer.querySelector('.footer-watermark'),
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Contact items — stagger fade in
      gsap.fromTo(
        footer.querySelectorAll('.footer-contact-item'),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: footer.querySelector('.footer-contact'),
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      );

      // Bottom bar
      gsap.fromTo(
        footer.querySelector('.footer-bottom'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer.querySelector('.footer-bottom'),
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          delay: 0.5,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollHero greetingDone={greetingDone} setGreetingDone={setGreetingDone} />
      <Hero />
      <LinkedInSection />
     
      <Marquee />
       <Suspense fallback={<div className="w-full h-[500px]" aria-hidden="true" />}>
        <SplineSceneBasic />
      </Suspense>
      <About />
      <Stats />
      <Services />
      <Experience />
      <Work />
      <Expertise />
      <Awards />
      <FooterHero />
      {greetingDone && (
        <Suspense fallback={null}>
          <FloatingActions />
        </Suspense>
      )}
      <footer ref={footerRef} className="footer">
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
          <a href="tel:+919605719902" className="footer-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
            +91 9605719902
          </a>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">2026</span>
          <span className="footer-rights">All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [greetingDone, setGreetingDone] = useState(false);

  useEffect(() => {
    // Initialize Lenis using the centralized library
    const lenis = initLenis();

    // ═══════════════════════════════════════════════════════════════════
    // SCROLL PROGRESS BAR — Direct DOM manipulation for performance
    // ═══════════════════════════════════════════════════════════════════
    //
    // We manipulate the DOM directly instead of using React state.
    // This avoids unnecessary re-renders on every scroll tick.
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.willChange = 'transform';
    progressBar.style.transform = 'translateZ(0)';
    document.body.appendChild(progressBar);

    // ═══════════════════════════════════════════════════════════════════
    // RAF-BATCHED PROGRESS UPDATE — Prevents layout thrashing
    // ═══════════════════════════════════════════════════════════════════
    //
    // Instead of updating the DOM on every scroll event,
    // we batch updates using requestAnimationFrame.
    // This ensures the browser only paints once per frame.
    let rafId = null;
    let queuedProgress = 0;
    let lastAppliedProgress = -1;

    const updateProgress = ({ progress }) => {
      queuedProgress = progress;

      // Coalesce many scroll events into one paint-aligned update.
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (queuedProgress === lastAppliedProgress) return;
        lastAppliedProgress = queuedProgress;
        // Direct style manipulation — no React re-render
        progressBar.style.transform = `scaleX(${queuedProgress}) translateZ(0)`;
      });
    };

    // Attach progress listener (separate from ScrollTrigger update)
    lenis.on('scroll', updateProgress);

    // ═══════════════════════════════════════════════════════════════════
    // RESIZE OBSERVER — Better than window resize event
    // ═══════════════════════════════════════════════════════════════════
    //
    // ResizeObserver fires more predictably and can observe
    // specific elements, not just the window.
    const ro = new ResizeObserver(() => {
      lenis.resize();
      // Only refresh if ScrollTrigger has active triggers to avoid "Invalid scope" warnings
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.refresh();
      }
    });
    ro.observe(document.body);

    document.documentElement.classList.add('lenis');

    // ═══════════════════════════════════════════════════════════════════
    // CLEANUP — Proper memory management
    // ═══════════════════════════════════════════════════════════════════
    return () => {
      // Remove progress listener first
      lenis.off('scroll', updateProgress);

      // Disconnect ResizeObserver
      ro.disconnect();

      // Cancel pending RAF
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      // Remove progress bar
      progressBar.remove();

      // Remove lenis class
      document.documentElement.classList.remove('lenis');

      // Destroy Lenis via centralized function
      destroyLenis();
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollRestore />
        <div className="app">
          <div className="noise-overlay" />
          {greetingDone && <CustomCursor />}
          {greetingDone && <Navbar />}
          <Routes>
            <Route path="/" element={<HomePage greetingDone={greetingDone} setGreetingDone={setGreetingDone} />} />
            <Route path="/project/:slug" element={
              <Suspense fallback={<div className="loading-screen" />}>
                <ProjectDetail />
              </Suspense>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
