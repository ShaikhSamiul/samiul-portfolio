import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_theme') || 'prismatic';
    }
    return 'prismatic';
  });
  const lenisRef = useRef(null);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // 1. Force page to top on reload, preventing browser scroll jumps
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Ensure scroll is initially locked at top during preloader
    lenis.stop();
    lenis.scrollTo(0, { immediate: true });

    // Drive Lenis through GSAP ticker for 100% synchronized scroll & tween updates
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const handleCurtainStart = () => {
    setIsHeroReady(true);
  };

  const handleLoadingComplete = () => {
    setIsHeroReady(true);
    setIsLoading(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.start();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  };

  return (
    <main
      className="w-full relative text-zinc-100 min-h-screen transition-colors duration-500 overflow-x-hidden"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      {/* Ambient Radial Bloom that dynamically shifts with the active theme */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-all duration-700"
        style={{
          backgroundImage: `radial-gradient(circle 900px at 50% 120px, var(--color-primary-glow), transparent 70%)`
        }}
      />

      {isLoading && (
        <Preloader
          onCurtainStart={handleCurtainStart}
          onComplete={handleLoadingComplete}
        />
      )}
      <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
      <Hero isLoaded={isHeroReady} />
      <Projects />
      <Skills />
      <Terminal />
      <Footer />
    </main>
  );
}

export default App;
