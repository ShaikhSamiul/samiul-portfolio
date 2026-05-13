import  { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Tell App.jsx that loading is done so it can unlock the scroll
        if (onComplete) onComplete();
      }
    });

    // We use a dummy object to hold the number so GSAP can tween it smoothly
    const count = { val: 0 };

    // 1. The Count-Up & Progress Bar Animation
    tl.to(count, {
      val: 100,
      duration: 2.5, // Adjust this to make the loading sequence faster/slower
      ease: "power4.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          // Math.round keeps it as a clean integer without decimals
          counterRef.current.innerText = Math.round(count.val) + "%";
        }
      }
    })
    .to(barRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: "power4.inOut"
    }, "<") // The "<" symbol tells GSAP to run this at the exact same time as the count tween
    
    // 2. The Text Exit Animation
    .to('.preloader-element', {
      y: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.in"
    }, "+=0.2") // Wait 0.2s after hitting 100%
    
    // 3. The Grand Reveal (Slide the whole container up)
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut"
    });

  }, { scope: containerRef });

  return (
    // Fixed positioning, highest z-index to cover absolutely everything
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden"
    >
      <div className="flex flex-col items-center z-10">
        <span className="preloader-element font-mono text-sm text-emerald-500 mb-4 tracking-[0.3em] uppercase">
          System Initializing
        </span>
        
        {/* The dynamic counter */}
        <h1 
          ref={counterRef} 
          className="preloader-element text-8xl md:text-[150px] lg:text-[200px] font-black tracking-tighter text-zinc-100"
        >
          0%
        </h1>
      </div>

      {/* The bottom progress bar */}
      <div className="preloader-element absolute bottom-0 left-0 w-full h-1 md:h-2 bg-zinc-900">
        <div 
          ref={barRef} 
          className="h-full bg-emerald-500 origin-left scale-x-0" 
        />
      </div>

      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Preloader;