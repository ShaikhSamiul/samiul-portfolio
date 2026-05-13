import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. EXTRACTED COMPONENT: Declared safely outside the main render loop
const MagneticLink = ({ children, href }) => {
  const linkRef = useRef(null);

  useEffect(() => {
    const element = linkRef.current;
    
    // quickTo is highly optimized for mouse movements
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Calculate distance from center of the element
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move element slightly towards the mouse
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      // Snap back to center
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={linkRef} 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="inline-block px-8 py-4 border border-zinc-800 rounded-full text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors duration-300"
    >
      {children}
    </a>
  );
};


// 2. MAIN COMPONENT
const Footer = () => {
  const footerRef = useRef(null);
  const textRef = useRef(null);

  // Scroll Reveal Animation
  useGSAP(() => {
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1, 
      },
      y: 100,
      opacity: 0,
      scale: 0.9,
      ease: "power3.out"
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center bg-zinc-950 px-6 overflow-hidden" id='contact'>
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-200 h-100 bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div ref={textRef} className="text-center z-10 w-full max-w-4xl">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-8">
          LET'S <span className="text-emerald-500 bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">TALK</span>.
        </h2>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-2xl mx-auto">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <MagneticLink href="mailto:shaikhsamiul2005@gmail.com">
            Gmail
          </MagneticLink>
          <MagneticLink href="https://github.com/ShaikhSamiul">
            GitHub
          </MagneticLink>
          <MagneticLink href="https://www.linkedin.com/in/shaikh-samiul-31a854271/">
            LinkedIn
          </MagneticLink>
        </div>
      </div>

      <div className="absolute bottom-8 text-zinc-600 text-sm font-mono">
        © {new Date().getFullYear()} SAMIUL SHAIKH. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;