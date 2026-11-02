import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skillsMatrix } from '../data';

gsap.registerPlugin(ScrollTrigger);

const GLYPHS = '01_#@!$%*+~=?/\\<>§λ';

// Kinetic Text Decryption Hook
const useDecryptedText = (text) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDeciphering, setIsDeciphering] = useState(false);
  const frameRef = useRef(null);

  const trigger = () => {
    let iteration = 0;
    const totalFrames = 12;
    setIsDeciphering(true);

    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '/' || char === '.') return char;
            if (index < (iteration / totalFrames) * text.length) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
      });

      iteration += 1;
      if (iteration > totalFrames) {
        clearInterval(frameRef.current);
        setDisplayText(text);
        setIsDeciphering(false);
      }
    }, 20);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, []);

  return { displayText, isDeciphering, trigger };
};

// Tactical Skill Card with Decryption Trigger
const SkillCard = ({ item }) => {
  const { displayText, isDeciphering, trigger } = useDecryptedText(item.name);

  return (
    <div
      onMouseEnter={trigger}
      className="radar-card bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 p-5 rounded-2xl transition-colors duration-300 group flex flex-col justify-between will-change-transform cursor-pointer"
    >
      <div>
        <h4 className="text-sm font-medium mb-2 font-mono tracking-tight flex items-center justify-between">
          <span
            className={`transition-colors duration-200 ${
              isDeciphering ? 'text-emerald-400' : 'text-zinc-200 group-hover:text-zinc-100'
            }`}
          >
            {displayText}
          </span>
          <span className="text-[10px] font-mono text-zinc-600 group-hover:text-emerald-400/80 transition-colors">
            [SYS]
          </span>
        </h4>
        <p className="text-xs text-zinc-400 font-mono leading-relaxed">
          {item.note}
        </p>
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const cardsGridRef = useRef(null);
  const tabRefs = useRef([]);
  const indicatorRef = useRef(null);
  const isFirstRender = useRef(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const activeCategoryRef = useRef(activeCategory);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  // Imperative, zero-delay physical sliding pill on user click
  const handleTabChange = (idx) => {
    if (idx === activeCategory) return;
    setActiveCategory(idx);

    const targetBtn = tabRefs.current[idx];
    if (targetBtn && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: targetBtn.offsetLeft,
        y: targetBtn.offsetTop,
        width: targetBtn.offsetWidth,
        height: targetBtn.offsetHeight,
        duration: 0.38,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  // Mount-only layout synchronization (never re-runs on tab changes to prevent snapping)
  useEffect(() => {
    const syncIndicator = () => {
      const activeBtn = tabRefs.current[activeCategoryRef.current];
      if (activeBtn && indicatorRef.current) {
        gsap.set(indicatorRef.current, {
          x: activeBtn.offsetLeft,
          y: activeBtn.offsetTop,
          width: activeBtn.offsetWidth,
          height: activeBtn.offsetHeight,
          opacity: 1,
        });
      }
    };

    // Initial position setup after layout calculation
    const timer = setTimeout(syncIndicator, 40);

    if (document.fonts) {
      document.fonts.ready.then(syncIndicator);
    }

    window.addEventListener('resize', syncIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', syncIndicator);
    };
  }, []);

  // Category switch: Left-to-Right Cascading Cards + Header Crossfade + Signal Scan
  useGSAP(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // 1. Category Title & Description subtle cross-fade
    gsap.fromTo(
      '.category-header-info',
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
    );

    // 2. Staggered Left-to-Right Cascade for the 4 Skill Cards
    if (cardsGridRef.current) {
      const cards = cardsGridRef.current.children;
      gsap.fromTo(
        cards,
        {
          x: -50,
          opacity: 0,
          scale: 0.96,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15, // Deliberate, smooth one-by-one cadence across the 4 cards
          ease: 'power2.out',
        }
      );
    }
  }, { dependencies: [activeCategory], scope: containerRef });

  // Initial Section Entrance ScrollTriggers
  useGSAP(() => {
    // 1. Header split entrance
    gsap.fromTo(
      '.skills-header-left',
      { x: -25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-header-left',
          start: 'top 94%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.skills-header-right',
      { x: 25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-header-left',
          start: 'top 94%',
          once: true,
        },
      }
    );

    // 2. Category tabs tray entrance
    gsap.fromTo(
      '.category-tabs-container',
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.category-tabs-container',
          start: 'top 94%',
          once: true,
        },
      }
    );

    // 3. Radar cards: 1-by-1 cascade from Left to Right on initial scroll
    gsap.fromTo(
      '.radar-card',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.radar-cards-grid',
          start: 'top 92%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="radar" className="pt-12 pb-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* SECTION HEADER (Opposing horizontal entrance) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/5">
        <div className="skills-header-left">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-2">
            ENGINEERING CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium text-zinc-100 tracking-tight">
            TECHNICAL <span className="text-zinc-500">RADAR</span>.
          </h2>
        </div>
        <p className="skills-header-right mt-4 md:mt-0 font-mono text-xs text-zinc-400 max-w-md">
          A pragmatic architecture matrix of production-proven technologies, frameworks, and concurrency tools.
        </p>
      </div>

      {/* CATEGORY SWITCHER TABS (Morphing Sliding Pill Tray) */}
      <div className="category-tabs-container relative inline-flex flex-wrap gap-1.5 mb-8 p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
        {/* Physical Sliding Pill Indicator */}
        <span
          ref={indicatorRef}
          className="absolute bg-zinc-100 rounded-xl shadow-md pointer-events-none z-0 opacity-0 will-change-transform"
          style={{ top: 0, left: 0 }}
        />

        {skillsMatrix.map((cat, idx) => {
          const isActive = activeCategory === idx;
          return (
            <button
              key={idx}
              ref={(el) => (tabRefs.current[idx] = el)}
              onClick={() => handleTabChange(idx)}
              className={`category-tab-btn relative px-4 py-2 rounded-xl font-mono text-xs transition-colors duration-200 z-10 cursor-pointer select-none ${
                isActive
                  ? 'text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.category.split('.')[1] || cat.category}
            </button>
          );
        })}
      </div>

      {/* ACTIVE CATEGORY DETAILS */}
      <div className="bg-zinc-900/60 rounded-3xl p-6 sm:p-8 mb-8 border border-zinc-800 shadow-xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div className="category-header-info will-change-transform">
            <h3 className="text-xl font-medium text-zinc-100 mb-1">
              {skillsMatrix[activeCategory].category}
            </h3>
            <p className="font-mono text-xs text-zinc-400">
              {skillsMatrix[activeCategory].description}
            </p>
          </div>
          <span className="font-mono text-xs text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
            {skillsMatrix[activeCategory].items.length} MODULES LOADED
          </span>
        </div>

        {/* RADAR CARDS (Left-to-Right Cascading Grid with Kinetic Decryption) */}
        <div ref={cardsGridRef} className="radar-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsMatrix[activeCategory].items.map((item) => (
            <SkillCard key={item.name} item={item} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Skills;
