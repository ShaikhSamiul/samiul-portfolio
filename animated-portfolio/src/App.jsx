import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Preloader from './components/Preloader'; // 1. Import Preloader

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    
    lenisRef.current = lenis;
    
    // IMMEDIATELY stop the scroll so the user is locked during the preloader
    lenis.stop();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // This function is triggered by the Preloader component when the GSAP timeline finishes
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Unlock the scroll!
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return (
    <main className="w-full relative">
      {/* 2. Render the Preloader. Pass the unlock function as a prop */}
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Footer />
    </main>
  );
}

export default App;