import  { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const topRow = ["REACT", "NODE.JS", "PYTHON", "FASTAPI", "GSAP", "TAILWIND", "REACT", "NODE.JS", "PYTHON"];
const bottomRow = ["MONGODB", "EXPRESS", "WEBSOCKETS", "PINECONE", "GEMINI AI", "MONGODB", "EXPRESS", "WEBSOCKETS"];

// The spinning 4-point star divider
const SparkleDivider = () => (
  <svg 
    width="48" height="48" viewBox="0 0 24 24" fill="none" 
    className="mx-8 text-emerald-500 animate-[spin_6s_linear_infinite]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
  </svg>
);

const Skills = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Store the timelines so we can manipulate their timeScale later
    const tl1 = gsap.to('.marquee-row-1', {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: 'none',
    });

    const tl2 = gsap.fromTo('.marquee-row-2', 
      { xPercent: -50 },
      {
        xPercent: 0,
        repeat: -1,
        duration: 30,
        ease: 'none',
      }
    );

    // 2. Velocity-Based "Scroll Warp" Effect
    let scrollTimeout;
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Get the speed of the scroll
        const velocity = self.getVelocity();
        // Convert velocity into a multiplier (ensure it's always positive and has a base of 1)
        let speedMultiplier = 1 + Math.abs(velocity / 400); 
        
        // Cap the max speed so it doesn't break the matrix
        speedMultiplier = Math.min(speedMultiplier, 5); 

        // Smoothly accelerate the marquee timelines
        gsap.to([tl1, tl2], { 
          timeScale: speedMultiplier, 
          duration: 0.2, 
          ease: 'power1.out', 
          overwrite: 'auto' 
        });

        // Clear previous timeout and set a new one to decelerate back to normal
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to([tl1, tl2], { 
            timeScale: 1, 
            duration: 1, 
            ease: 'power3.out' 
          });
        }, 100);
      }
    });

    // 3. The "Focus" Hover Effect (Slow down the whole container when mouse enters)
    const container = containerRef.current;
    
    const handleMouseEnter = () => {
      gsap.to([tl1, tl2], { timeScale: 0.15, duration: 0.8, ease: "power2.out" });
    };
    
    const handleMouseLeave = () => {
      gsap.to([tl1, tl2], { timeScale: 1, duration: 0.8, ease: "power2.out" });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(scrollTimeout);
    };

  }, { scope: containerRef });

  // Upgraded Item: Handles the dimming effect via CSS group-hover
  const MarqueeItem = ({ text, filled }) => (
    <div className="flex items-center group/item transition-opacity duration-500">
      <span className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter cursor-default transition-all duration-300
        ${filled 
          ? "text-zinc-800 hover:text-emerald-500" 
          : "text-transparent [-webkit-text-stroke:2px_#3f3f46] hover:[-webkit-text-stroke:2px_#10b981]"
        }`}
      >
        {text}
      </span>
      <SparkleDivider />
    </div>
  );

  return (
    // Added 'group' class to the container to manage sibling dimming
    <section ref={containerRef} className="py-32 bg-zinc-950 overflow-hidden relative group" id='skills'>
      
      {/* Decorative gradient masks */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-linear-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-linear-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 skills-header relative z-20">
        <h2 className="text-emerald-500 font-mono text-sm tracking-widest uppercase flex items-center gap-4">
          <span className="w-8 h-px bg-emerald-500" />
          The Arsenal
        </h2>
      </div>

      {/* Dim all items when hovering over the container, EXCEPT the one being directly hovered */}
      <div className="flex flex-col gap-8 md:gap-12 -rotate-2 scale-105 hover:[&_.group\/item]:opacity-30 [&_.group\/item:hover]:opacity-100 transition-opacity duration-500">
        
        <div className="marquee-row-1 flex w-max">
          <div className="flex items-center">
            {topRow.map((skill, i) => <MarqueeItem key={`t1-${i}`} text={skill} filled={i % 2 === 0} />)}
          </div>
          <div className="flex items-center">
            {topRow.map((skill, i) => <MarqueeItem key={`t2-${i}`} text={skill} filled={i % 2 === 0} />)}
          </div>
        </div>

        <div className="marquee-row-2 flex w-max">
          <div className="flex items-center">
            {bottomRow.map((skill, i) => <MarqueeItem key={`b1-${i}`} text={skill} filled={i % 2 !== 0} />)}
          </div>
          <div className="flex items-center">
            {bottomRow.map((skill, i) => <MarqueeItem key={`b2-${i}`} text={skill} filled={i % 2 !== 0} />)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;