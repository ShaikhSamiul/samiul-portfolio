import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeString, setTimeString] = useState('');
  const lastScrollYRef = useRef(0);

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

  // Directional Scroll Hide/Reveal
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY <= lastScrollYRef.current);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
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

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs">
          {[
            { id: 'work', label: 'WORK' },
            { id: 'radar', label: 'RADAR' },
            { id: 'terminal', label: 'TERMINAL' },
            { id: 'contact', label: 'CONTACT' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-zinc-400 hover:text-zinc-100 transition-colors tracking-wider"
            >
              {item.label}
            </a>
          ))}
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
