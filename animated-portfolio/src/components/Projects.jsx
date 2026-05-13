import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data'; 

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Initialize matchMedia
    const mm = gsap.matchMedia();
    const cards = gsap.utils.toArray('.project-card');

    // 2. DESKTOP & TABLET ANIMATIONS (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card) => {
        const textContent = card.querySelector('.text-content');
        const videoContent = card.querySelector('.video-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%', 
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        });

        // The heavy horizontal slide-ins
        tl.fromTo(textContent, 
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        ).fromTo(videoContent,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          "-=0.6"
        );
      });
    });

    // 3. MOBILE ANIMATIONS (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      cards.forEach((card) => {
        const textContent = card.querySelector('.text-content');
        const videoContent = card.querySelector('.video-content');

        // A lightweight, highly performant vertical fade-up
        gsap.fromTo([videoContent, textContent], // Video comes first on mobile layout
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.2, // Fade video, then text
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%', // Trigger slightly earlier on mobile
              // Play once and leave it there. Reversing on mobile scrolling is distracting.
              toggleActions: 'play none none none', 
            }
          }
        );
      });
    });

    // useGSAP handles mm.revert() automatically on unmount!
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 text-white min-h-screen" id='projects'>
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-emerald-50">
            FEATURED <span className="text-emerald-500">WORK</span>.
          </h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full" />
        </header>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <article 
              key={project.id} 
              className="project-card flex flex-col lg:flex-row gap-12 items-center group"
            >
              {/* Text Content (Left side) */}
              <div className="text-content flex-1 w-full order-2 lg:order-1">
                <span className="text-emerald-400 font-mono text-sm mb-4 block">
                  0{index + 1}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-100">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-xl">
                  {project.description}
                </p>
                
                <ul className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((techItem) => (
                    <li 
                      key={techItem}
                      /* 1. This exposes the tech name to CSS */
                      data-tech={techItem.toLowerCase()} 
                      className="px-4 py-2 border border-zinc-800 bg-zinc-900/50 text-zinc-300 rounded-full text-sm font-medium hover:border-zinc-600 transition-colors duration-300"
                    >
                      {techItem}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Content (Right side) */}
              <div className="video-content flex-1 w-full order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-video shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-emerald-500/30">
                  {/* Decorative subtle overlay to make text pop if it overlaps */}
                  <div className="absolute inset-0 bg-zinc-950/10 z-10 pointer-events-none" />
                  
                  <video 
                    src={project.videoUrl}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;