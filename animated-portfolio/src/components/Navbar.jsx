import  { useState, useEffect } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Check if we are at the very top of the page
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        // 2. Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Smooth scroll handler that works perfectly with Lenis
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isAtTop 
          ? 'bg-transparent py-6' 
          : 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 py-4 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <a 
          href="#top" 
          onClick={(e) => handleNavClick(e, 'top')}
          className="text-xl font-black text-white tracking-tighter flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SAMIUL<span className="text-zinc-500 group-hover:text-emerald-500 transition-colors duration-300">.DEV</span>
        </a>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
          {['skills', 'projects', 'contact'].map((item) => (
            <a 
              key={item}
              href={`#${item}`}
              onClick={(e) => handleNavClick(e, item)}
              className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 uppercase tracking-widest"
            >
              // {item}
            </a>
          ))}
        </nav>

        {/* RESUME BUTTON */}
        <a 
          href="/resume.pdf" // Put your actual resume PDF in the public folder
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 text-sm font-bold bg-zinc-100 text-zinc-950 rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
        >
          Resume
        </a>

      </div>
    </header>
  );
};

export default Navbar;