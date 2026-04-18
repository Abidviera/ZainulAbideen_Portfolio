import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import ScrollHero from './components/ScrollHero/ScrollHero';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Work from './components/Work/Work';
import Contact from './components/Contact/Contact';

gsap.registerPlugin(ScrollTrigger);

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
      <Navbar />
      <ScrollHero />
      <Hero />
      <About />
      <Services />
      <Work />
      <Contact />
      <footer className="footer">
        <div className="section-container">
          <div className="footer-inner">
            <span className="footer-copy">
              &copy; 2026 Zainul Abideen. Crafted with precision.
            </span>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Credits</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
