import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = ({ onCurtainStart, onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    const count = { val: 0 };

    tl.to(count, {
      val: 100,
      duration: 0.85,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.round(count.val)}%`;
        }
      }
    })
    .to(counterRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.65,
      ease: 'expo.inOut',
      onStart: () => {
        if (onCurtainStart) onCurtainStart();
      }
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-999 flex flex-col items-center justify-center text-zinc-100 overflow-hidden"
      style={{ backgroundColor: 'var(--color-canvas, #09090b)' }}
    >
      <div className="flex flex-col items-center z-10 px-6 text-center">
        <span className="font-mono text-xs text-zinc-500 mb-2 uppercase tracking-widest">
          SAMIUL SHAIKH
        </span>

        <h1
          ref={counterRef}
          className="font-mono text-8xl sm:text-[10rem] font-light tracking-tight text-zinc-100"
        >
          0%
        </h1>
      </div>
    </div>
  );
};

export default Preloader;
