import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  };

  useGSAP(() => {
    // 1. Header entrance
    gsap.fromTo(
      '.projects-header-left',
      { x: -24, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-header-left',
          start: 'top 94%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.projects-header-right',
      { x: 24, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-header-left',
          start: 'top 94%',
          once: true,
        },
      }
    );

    // 2. Multi-directional entrances (alternating opposing vectors from different sides)
    const cardVectors = [
      { x: -42, y: 0 },   // Card 1: Sweeps in from LEFT
      { x: 42, y: 0 },    // Card 2: Sweeps in from RIGHT
      { x: -30, y: 20 },  // Card 3: Sweeps in diagonally from BOTTOM-LEFT
    ];

    const cards = containerRef.current.querySelectorAll('.project-card');
    cards.forEach((card, idx) => {
      const vector = cardVectors[idx % cardVectors.length];
      gsap.fromTo(
        card,
        { x: vector.x, y: vector.y, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="work" className="pt-12 pb-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/5">
        <div className="projects-header-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              ENGINEERED SYSTEMS // SHOWCASE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-medium text-zinc-100 tracking-tight">
            FEATURED <span className="text-zinc-500">WORK</span>.
          </h2>
        </div>
        <div className="projects-header-right mt-4 md:mt-0 font-mono text-xs text-zinc-400 max-w-md space-y-1">
          <p>Production architectures, distributed concurrency controls, and real-time applied AI systems.</p>
          <div className="text-zinc-500 text-[11px] pt-1">
            VERIFIED STATUS: <span className="text-zinc-200 font-medium">3 CLOUD-HOSTED PLATFORMS</span>
          </div>
        </div>
      </div>

      {/* STACKED FULL-WIDTH ARCHITECTURAL CASE STUDIES */}
      <div className="space-y-10 sm:space-y-12">
        {projects.map((project, idx) => (
          <article
            key={project.id}
            onMouseMove={handleCardMouseMove}
            className={`project-card will-change-transform group relative bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 transition-colors duration-300 shadow-2xl backdrop-blur-sm overflow-hidden ${
              project.accentColor === 'emerald'
                ? 'hover:border-emerald-500/30'
                : project.accentColor === 'cyan'
                ? 'hover:border-cyan-500/30'
                : 'hover:border-amber-500/30'
            }`}
          >
            {/* Interactive Cursor Spotlight Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${
                  project.accentColor === 'emerald'
                    ? 'rgba(16, 185, 129, 0.09)'
                    : project.accentColor === 'cyan'
                    ? 'rgba(6, 182, 212, 0.09)'
                    : 'rgba(245, 158, 11, 0.09)'
                }, transparent 65%)`,
              }}
            />

            {/* Subtle Ambient Radial Glow */}
            <div
              className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                project.accentColor === 'emerald'
                  ? 'bg-emerald-500'
                  : project.accentColor === 'cyan'
                  ? 'bg-cyan-500'
                  : 'bg-amber-500'
              }`}
            />

            {/* Card Top HUD Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-400">
                  0{idx + 1} //
                </span>
                <span className="font-mono text-xs text-zinc-300 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
                  {project.domainUrl.replace('https://', '')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border ${
                    project.accentColor === 'emerald'
                      ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50'
                      : project.accentColor === 'cyan'
                      ? 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50'
                      : 'text-amber-400 bg-amber-950/40 border-amber-800/50'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      project.accentColor === 'emerald'
                        ? 'bg-emerald-400'
                        : project.accentColor === 'cyan'
                        ? 'bg-cyan-400'
                        : 'bg-amber-400'
                    }`}
                  />
                  ONLINE & LIVE
                </span>
              </div>
            </div>

            {/* Main 2-Column Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column (6 Cols): Title, Tagline, Story, Highlights, Tech & CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-100 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light mt-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technical Architecture Achievements */}
                  <div className="mt-6 space-y-2">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                      CORE ARCHITECTURAL HIGHLIGHTS:
                    </span>
                    <ul className="space-y-2 font-mono text-xs text-zinc-300">
                      {project.architecture?.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5">
                          <span className="text-zinc-500 mt-0.5">↳</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Chips & Action CTAs */}
                <div className="pt-6 sm:pt-8 mt-6 border-t border-zinc-800/80">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-300 transition-all font-mono text-xs flex items-center gap-2 group/btn shadow-md"
                    >
                      Visit Live App
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">↗</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-mono text-xs transition-all flex items-center gap-2"
                    >
                      GitHub Codebase ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column (6 Cols): Dedicated Architectural HUD & Telemetry Console */}
              <div className="lg:col-span-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between group-hover:border-zinc-700/80 group-hover:-translate-y-1 transition-all duration-300 shadow-xl">
                
                {/* Console Top Header */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-zinc-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-zinc-500">&gt;</span>
                    <span className="font-semibold tracking-wider uppercase text-[11px]">
                      SYSTEM PIPELINE & TELEMETRY
                    </span>
                  </div>
                  <span className="text-zinc-400 text-[11px] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STATUS 200
                  </span>
                </div>

                {/* 4-Step Pipeline Flow */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-2.5">
                    EXECUTION FLOW
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.pipeline?.map((p, pIdx) => (
                      <div
                        key={p.step}
                        className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 text-left hover:border-zinc-700 transition-all group/step relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-ping opacity-75"
                              style={{
                                backgroundColor: project.accentColor === 'emerald' ? '#10b981' : project.accentColor === 'cyan' ? '#06b6d4' : '#f59e0b',
                                animationDuration: `${2.2 + pIdx * 0.7}s`,
                              }}
                            />
                            <span className="font-mono text-[10px] text-zinc-400 font-bold">
                              STAGE {p.step}
                            </span>
                          </div>
                          <span className="text-zinc-500 text-[10px]">↳</span>
                        </div>
                        <div className="font-semibold text-xs text-zinc-200">
                          {p.name}
                        </div>
                        <div className="font-mono text-[11px] text-zinc-400 mt-1 leading-snug">
                          {p.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 Telemetry Metrics Badges */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-2.5">
                    VERIFIED SYSTEM METRICS
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {project.stats?.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 font-mono"
                      >
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                          {s.label}
                        </span>
                        <span className="text-xs sm:text-sm text-zinc-100 font-medium block truncate">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Infrastructure Deployment Bar */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-400">HOSTING:</span>
                  <span className="text-zinc-200 font-medium truncate max-w-[240px] sm:max-w-none">
                    {project.deployment}
                  </span>
                </div>

              </div>

            </div>

          </article>
        ))}
      </div>

    </section>
  );
};

export default Projects;
