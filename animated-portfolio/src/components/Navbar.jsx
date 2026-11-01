import { useState, useEffect, useRef } from 'react';
import { themes } from '../themes';

const Navbar = ({ currentTheme = 'prismatic', onThemeChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeString, setTimeString] = useState('');
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const themeDropdownRef = useRef(null);

  const activeThemeObj = themes.find((t) => t.id === currentTheme) || themes[0];

  // Close theme dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* THEME TOGGLE, TIME & RESUME */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* THEME SELECTOR DROPDOWN */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 hover:border-zinc-500 font-mono text-xs text-zinc-200 transition-all shadow-sm"
              title="Switch Color Palette"
              aria-expanded={isThemeOpen}
            >
              <span
                className="w-2.5 h-2.5 rounded-full transition-colors duration-300 shadow-sm"
                style={{ backgroundColor: activeThemeObj.dot }}
              />
              <span className="hidden sm:inline font-medium text-[11px] tracking-wide">
                {activeThemeObj.name}
              </span>
              <span className="text-[10px] text-zinc-500">▾</span>
            </button>

            {/* Dropdown Menu */}
            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-950/95 border border-zinc-800 p-2 shadow-2xl backdrop-blur-2xl z-110">
                <div className="px-3 py-1.5 border-b border-zinc-800/80 mb-1 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                    Select Palette
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">4 Styles</span>
                </div>

                <div className="space-y-1">
                  {themes.map((th) => {
                    const isSelected = currentTheme === th.id;
                    return (
                      <button
                        key={th.id}
                        onClick={() => {
                          if (onThemeChange) onThemeChange(th.id);
                          setIsThemeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs font-mono group ${
                          isSelected
                            ? 'bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-sm'
                            : 'hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: th.dot }}
                          />
                          <div>
                            <div className="font-semibold text-zinc-200 text-xs flex items-center gap-1.5">
                              {th.name}
                              {isSelected && (
                                <span className="text-[10px] text-emerald-400">✓</span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-500 font-light truncate max-w-[140px]">
                              {th.badge}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: th.dot }} />
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: th.secondaryDot }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {timeString && (
            <div className="hidden lg:flex items-center font-mono text-[11px] text-zinc-400 bg-zinc-900/60 border border-zinc-800 px-3 py-1 rounded-full">
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
