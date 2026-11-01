import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { telemetry } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isLoaded }) => {
  const containerRef = useRef(null);
  const monumentWrapRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const btn3Ref = useRef(null);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    if (!isLoaded) {
      // Keep initial hidden state ready for entrance
      gsap.set(
        ['.hero-top-left', '.hero-monument-line', '.hero-lead', '.hero-tag', '.hero-action-left', '.hero-action-right'],
        { opacity: 0 }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Multi-directional entrance with natural, fluid deceleration
    tl.fromTo('.hero-top-left',
      { x: -24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 0.02 }
    )
    .fromTo('.hero-monument-line',
      { x: -45, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, stagger: 0.08 },
      '-=0.3'
    )
    .fromTo('.hero-lead',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.45'
    )
    .fromTo('.hero-tag',
      { x: -18, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
      '-=0.4'
    )
    .fromTo('.hero-action-left',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.55 },
      '-=0.35'
    )
    .fromTo('.hero-action-right',
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.55 },
      '<'
    );

    // Scroll-scrubbed parallax exit applied strictly to the outer wrapper
    gsap.to('.hero-monument-wrap', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 70,
      scale: 0.96,
      opacity: 0.35,
      ease: 'none',
    });

    // 1. Magnetic Physics for Action Buttons
    const attachMagnetic = (el) => {
      if (!el) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power2.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

      const onMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.35;
        const y = (clientY - (top + height / 2)) * 0.35;
        xTo(x);
        yTo(y);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    };

    const cleanup1 = attachMagnetic(btn1Ref.current);
    const cleanup2 = attachMagnetic(btn2Ref.current);
    const cleanup3 = attachMagnetic(btn3Ref.current);

    // 2. Interactive 3D Holographic Tilt on Monument
    const targetWrap = monumentWrapRef.current;
    if (targetWrap && containerRef.current) {
      gsap.set(targetWrap, { transformPerspective: 1000 });
      const rotXTo = gsap.quickTo(targetWrap, 'rotationX', { duration: 0.6, ease: 'power2.out' });
      const rotYTo = gsap.quickTo(targetWrap, 'rotationY', { duration: 0.6, ease: 'power2.out' });

      const onHeroMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
        const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
        rotYTo(xNorm * 8);
        rotXTo(-yNorm * 8);
      };

      const onHeroMouseLeave = () => {
        rotXTo(0);
        rotYTo(0);
      };

      const container = containerRef.current;
      container.addEventListener('mousemove', onHeroMouseMove);
      container.addEventListener('mouseleave', onHeroMouseLeave);

      return () => {
        if (cleanup1) cleanup1();
        if (cleanup2) cleanup2();
        if (cleanup3) cleanup3();
        container.removeEventListener('mousemove', onHeroMouseMove);
        container.removeEventListener('mouseleave', onHeroMouseLeave);
      };
    }

  }, { scope: containerRef, dependencies: [isLoaded] });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(telemetry.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToSection = (id) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden bg-grid-pattern"
    >
      {/* TOP KICKER (Opposing horizontal entrance) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="hero-top-left flex items-center gap-3 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-1 h-3" title="Live Telemetry Stream Active">
            <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-0.5 h-3.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.45s]" />
            <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
          </div>
          <span>{telemetry.location.toUpperCase()}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">{telemetry.coordinates}</span>
        </div>
      </div>

      {/* ARCHITECTURAL MONUMENT HEADLINE */}
      <div className="my-auto py-12">
        <div ref={monumentWrapRef} className="hero-monument-wrap will-change-transform">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium tracking-tight leading-[0.92] text-zinc-100 uppercase select-none">
            <span className="hero-monument-line block will-change-transform">
              SAMIUL
            </span>
            <span
              className="hero-monument-line block will-change-transform transition-colors duration-500"
              style={{ color: 'var(--hero-name-accent)' }}
            >
              SHAIKH<span className="text-zinc-600">.</span>
            </span>
          </h1>
        </div>

        <p className="hero-lead mt-8 text-lg sm:text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
          Full-Stack Software Engineer building resilient distributed systems, real-time architectures, and high-throughput applied AI platforms.
        </p>

        {/* TELEMETRY TAGS (Horizontal cascade from left) */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            { label: 'CORE', value: 'React 19 • Python • FastAPI • Node' },
            { label: 'SPECIALIZATION', value: 'RAG Pipelines & Concurrency Locks' },
            { label: 'INDEXING', value: 'Pinecone Vector Architecture' }
          ].map((tag, idx) => (
            <div
              key={idx}
              className="hero-tag bg-zinc-900/80 border border-zinc-800 px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2"
            >
              <span className="text-zinc-500">{tag.label}:</span>
              <span className="text-zinc-200">{tag.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM ACTION BAR (Opposing left & right entrance with Magnetic Physics) */}
      <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
        <div className="hero-action-left flex items-center gap-4">
          <button
            ref={btn1Ref}
            onClick={() => scrollToSection('work')}
            className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium text-sm hover:bg-zinc-300 transition-colors flex items-center gap-2 group will-change-transform shadow-lg cursor-pointer"
          >
            Explore Systems
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>

          <button
            ref={btn2Ref}
            onClick={() => scrollToSection('terminal')}
            className="px-5 py-3 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 text-sm font-mono transition-colors will-change-transform cursor-pointer"
          >
            Terminal Shell &gt;_
          </button>
        </div>

        <div className="hero-action-right flex items-center gap-3">
          <button
            ref={btn3Ref}
            onClick={handleCopyEmail}
            className="px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 font-mono text-xs text-zinc-300 transition-colors will-change-transform cursor-pointer"
            title="Click to copy email address"
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : `✉ ${telemetry.email}`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
