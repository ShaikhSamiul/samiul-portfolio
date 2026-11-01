import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { telemetry } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Progressive multi-directional reveal
  useGSAP(() => {
    // 1. Monument sweeps in from LEFT
    gsap.fromTo(
      '.footer-monument',
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          once: true,
        },
      }
    );

    // Scroll-driven gradient text fill on closing monument
    gsap.fromTo(
      '.footer-gradient-flood',
      { opacity: 0.35, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    // 2. Action buttons sweep in from RIGHT
    gsap.fromTo(
      '.footer-action-item',
      { x: 25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-action-group',
          start: 'top 92%',
          once: true,
        },
      }
    );

    // 3. Bottom links fade in
    gsap.fromTo(
      '.footer-bottom-grid',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-bottom-grid',
          start: 'top 95%',
          once: true,
        },
      }
    );

  }, { scope: containerRef });

  const handleCopyEmail = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);

    navigator.clipboard.writeText(telemetry.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#top', { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="relative border-t border-white/5 pt-24 pb-12 px-6 sm:px-12 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* TOP CALLOUT */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-3">
            COMMUNICATION
          </span>

          <h2 className="footer-monument text-4xl sm:text-6xl md:text-7xl font-medium text-zinc-100 tracking-tight uppercase leading-[0.95] max-w-4xl">
            LET’S BUILD SOMETHING <br />
            <span className="transition-colors duration-500" style={{ color: 'var(--hero-name-accent)' }}>
              RESILIENT
            </span>
            .
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl font-light">
            Available for select engineering opportunities, distributed architecture builds, and high-throughput software systems.
          </p>

          {/* 1-CLICK EMAIL COPY CARD (Sweeps in from RIGHT with Ripple Feedback) */}
          <div className="footer-action-group mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="footer-action-item relative overflow-hidden bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-xl font-mono text-sm sm:text-base text-zinc-200 hover:border-zinc-600 transition-colors flex items-center gap-3 cursor-pointer group shadow-lg"
            >
              {/* Expanding Luminous Click Ripple */}
              {ripples.map((rip) => (
                <span
                  key={rip.id}
                  className="pointer-events-none absolute rounded-full bg-emerald-400/30 animate-ping"
                  style={{
                    left: rip.x,
                    top: rip.y,
                    width: 100,
                    height: 100,
                    transform: 'translate(-50%, -50%)',
                    animationDuration: '0.7s',
                  }}
                />
              ))}
              <span className="relative z-10">{copied ? '✓ COPIED TO CLIPBOARD' : `✉ ${telemetry.email}`}</span>
              <span className="text-xs text-zinc-500 relative z-10 group-hover:text-zinc-300 transition-colors">
                [Copy]
              </span>
            </button>

            <a
              href={`mailto:${telemetry.email}`}
              className="footer-action-item px-6 py-4 rounded-xl bg-zinc-100 text-zinc-950 font-medium text-sm hover:bg-zinc-300 transition-colors shadow-md"
            >
              Open Mail Client ↗
            </a>
          </div>
        </div>

        {/* SOCIAL LINKS & REPOSITORIES */}
        <div className="footer-bottom-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/5 font-mono text-xs">
          <div>
            <span className="block text-zinc-500 mb-2">REPOSITORIES</span>
            <a
              href={telemetry.github}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5"
            >
              GitHub / @ShaikhSamiul ↗
            </a>
          </div>

          <div>
            <span className="block text-zinc-500 mb-2">CAREER & NETWORK</span>
            <a
              href={telemetry.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5"
            >
              LinkedIn / Shaikh Samiul ↗
            </a>
          </div>

          <div>
            <span className="block text-zinc-500 mb-2">CURRICULUM VITAE</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5"
            >
              Download PDF Resume ↗
            </a>
          </div>

          <div>
            <span className="block text-zinc-500 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LOCATION
            </span>
            <span className="text-zinc-300">{telemetry.location} ({telemetry.coordinates})</span>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} SAMIUL SHAIKH. ARCHITECTED WITH REACT 19 & TAILWIND V4.
          </div>

          <button
            onClick={scrollToTop}
            className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            Back to Top ↑
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
