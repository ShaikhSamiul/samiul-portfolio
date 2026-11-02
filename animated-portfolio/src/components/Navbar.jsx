import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeString, setTimeString] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const lastScrollYRef = useRef(0);
  const navRefs = useRef({});
  const indicatorRef = useRef(null);
  const activeSectionRef = useRef('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeString(`${new Intl.DateTimeFormat('en-GB', options).format(now)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to slide or snap the indicator pill
  const slidePill = (targetId, animate = true) => {
    if (!indicatorRef.current) return;

    if (!targetId) {
      if (animate) {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.set(indicatorRef.current, { opacity: 0 });
      }
      return;
    }

    const targetLink = navRefs.current[targetId];
    if (!targetLink) return;

    if (!animate) {
      gsap.set(indicatorRef.current, {
        x: targetLink.offsetLeft,
        y: targetLink.offsetTop,
        width: targetLink.offsetWidth,
        height: targetLink.offsetHeight,
        opacity: 1
      });
    } else {
      gsap.to(indicatorRef.current, {
        x: targetLink.offsetLeft,
        y: targetLink.offsetTop,
        width: targetLink.offsetWidth,
        height: targetLink.offsetHeight,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  // Sync active section to ref & slide pill
  useEffect(() => {
    activeSectionRef.current = activeSection;
    slidePill(activeSection, true);
  }, [activeSection]);

  // Keep indicator aligned on font load & window resize (without animation)
  useEffect(() => {
    const handleSync = () => {
      slidePill(activeSectionRef.current, false);
    };

    if (document.fonts) {
      document.fonts.ready.then(handleSync);
    }

    window.addEventListener('resize', handleSync);
    return () => window.removeEventListener('resize', handleSync);
  }, []);

  // Directional Scroll Hide/Reveal + Active Section Radar Tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Hide/Reveal navbar
      if (scrollY < 60) {
        setIsVisible(true);
      } else {
        setIsVisible(scrollY <= lastScrollYRef.current);
      }
      lastScrollYRef.current = scrollY;

      // 2. Active Section Radar Tracking
      const sections = ['work', 'radar', 'terminal', 'contact'];

      // Lock to contact when at the bottom of the page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Hero / Top threshold (no active tab at top)
      if (scrollY < 260) {
        setActiveSection('');
        return;
      }

      const viewportFocus = scrollY + window.innerHeight * 0.35;
      let current = '';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (viewportFocus >= top && viewportFocus < bottom) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    slidePill(targetId, true);

    if (window.__lenis) {
      window.__lenis.scrollTo(`#${targetId}`, { duration: 1.2 });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-100 w-[95%] max-w-5xl transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <div className="glass-panel rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl border border-white/10">
        
        {/* LOGO & STATUS */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="flex items-center gap-3 group"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-medium text-xs text-zinc-200 group-hover:border-zinc-400 transition-colors">
            SS
          </div>
          <span className="text-xs font-medium text-zinc-200 tracking-tight">
            SAMIUL SHAIKH
          </span>
        </a>

        {/* NAVIGATION LINKS WITH SLIDING PILL RADAR TRACKER */}
        <nav className="relative hidden md:flex items-center gap-1 font-mono text-xs">
          {/* Physical Sliding Pill Highlight */}
          <span
            ref={indicatorRef}
            className="absolute rounded-full bg-zinc-800/90 border border-zinc-700/80 shadow-[0_0_12px_rgba(16,185,129,0.18)] pointer-events-none z-0 opacity-0 will-change-transform"
            style={{ top: 0, left: 0 }}
          />

          {[
            { id: 'work', label: 'WORK' },
            { id: 'radar', label: 'RADAR' },
            { id: 'terminal', label: 'TERMINAL' },
            { id: 'contact', label: 'CONTACT' }
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                ref={(el) => (navRefs.current[item.id] = el)}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 tracking-wider flex items-center gap-1.5 z-10 select-none ${
                  isActive
                    ? 'text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* TIME & RESUME */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {timeString && (
            <div className="hidden sm:flex items-center font-mono text-[11px] text-zinc-400 bg-zinc-900/60 border border-zinc-800 px-3 py-1 rounded-full">
              {timeString}
            </div>
          )}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 text-xs font-mono font-medium bg-zinc-100 text-zinc-950 rounded-full hover:bg-zinc-300 transition-all duration-200"
          >
            Resume ↗
          </a>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
