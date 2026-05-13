import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Fade in and slide up elements
    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.5
    })
    .from(".hero-sub", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(".hero-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Floating animation loop
    gsap.to(".hero-title", {
      yPercent: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <section ref={container} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950" id='top'>
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 blur-[120px] rounded-full" />
      
      <div className="z-10 text-center">
        <span className="hero-badge inline-block px-4 py-1 mb-6 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">
          Software and Full Stack Developer
        </span>
        
        <h1 className="hero-title name-hover text-7xl md:text-9xl font-black tracking-tighter text-white mb-4">
          SAMIUL <span className="text-emerald-500">SHAIKH</span>
        </h1>
        
        <p className="hero-sub text-zinc-400 text-lg md:text-xl max-w-lg mx-auto">
          Engineering high-performance web architectures and intelligent full-stack applications.
        </p>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-1 h-12 bg-linear-to-b from-emerald-500 to-transparent rounded-full animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;