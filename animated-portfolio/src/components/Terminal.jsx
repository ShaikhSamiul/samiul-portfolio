import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { terminalCommands } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Terminal = () => {
  const containerRef = useRef(null);
  const [history, setHistory] = useState([
    { type: 'system', text: "Samiul Portfolio Shell v2.4 (x86_64-pc-linux-gnu)" },
    { type: 'system', text: "Type 'help' or click any command below to explore systems." },
    { type: 'prompt', text: "whoami" },
    { type: 'output', text: terminalCommands.whoami },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll ONLY the internal terminal container, never the window
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Multi-directional Scroll Reveal
  useGSAP(() => {
    gsap.fromTo(
      '.terminal-header-left',
      { x: -25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.terminal-header-left',
          start: 'top 94%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.terminal-header-right',
      { x: 25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.terminal-header-left',
          start: 'top 94%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.terminal-pill-btn',
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.terminal-pills-row',
          start: 'top 92%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.terminal-window',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.terminal-window',
          start: 'top 92%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const output =
      terminalCommands[cmd] ||
      `bash: command not found: '${cmd}'. Type 'help' for available commands.`;

    setHistory((prev) => [
      ...prev,
      { type: 'prompt', text: rawCmd },
      { type: 'output', text: output }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTyping) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  // Realistic Typewriter simulation when shortcut pills are triggered
  const handlePillClick = (cmd) => {
    if (isTyping) return;
    setIsTyping(true);
    setInputVal('');
    let currentText = '';
    const chars = cmd.split('');
    chars.forEach((char, i) => {
      setTimeout(() => {
        currentText += char;
        setInputVal(currentText);
        if (i === chars.length - 1) {
          setTimeout(() => {
            executeCommand(cmd);
            setInputVal('');
            setIsTyping(false);
          }, 180);
        }
      }, (i + 1) * 32);
    });
    inputRef.current?.focus();
  };

  return (
    <section ref={containerRef} id="terminal" className="pt-12 pb-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* HEADER (Opposing horizontal entrance) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/5">
        <div className="terminal-header-left">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-2">
            SHELL ACCESS
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium text-zinc-100 tracking-tight">
            INTERACTIVE <span className="text-zinc-500">TERMINAL</span>.
          </h2>
        </div>
        <p className="terminal-header-right mt-4 md:mt-0 font-mono text-xs text-zinc-400 max-w-md">
          Inspect background telemetry, query skills, or ping contact coordinates directly from this in-browser shell.
        </p>
      </div>

      {/* QUICK COMMAND SHORTCUTS (Sweeps in from RIGHT) */}
      <div className="terminal-pills-row flex flex-wrap items-center gap-2 mb-4 font-mono text-xs text-zinc-400">
        <span className="text-zinc-500 text-[11px]">Triggers:</span>
        {['whoami', 'skills', 'projects', 'status', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handlePillClick(cmd)}
            className="terminal-pill-btn px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 transition-colors"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* TERMINAL WINDOW */}
      <div className="terminal-window relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
        
        {/* Subtle CRT Phosphor Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_4px] opacity-30 z-20" />

        {/* WINDOW HEADER */}
        <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-zinc-400 text-[11px]">samiul@portfolio:~</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SHELL READY</span>
          </div>
        </div>

        {/* TERMINAL BODY */}
        <div
          ref={bodyRef}
          className="p-4 sm:p-6 min-h-[280px] max-h-[440px] overflow-y-auto space-y-3"
        >
          {history.map((entry, idx) => (
            <div key={idx} className="leading-relaxed">
              {entry.type === 'system' && (
                <div className="text-zinc-500 text-[11px]">{entry.text}</div>
              )}
              {entry.type === 'prompt' && (
                <div className="flex items-center gap-2 text-zinc-200 font-medium">
                  <span className="font-medium" style={{ color: 'var(--color-primary)' }}>guest@samiul.dev:~$</span>
                  <span className="text-zinc-100">{entry.text}</span>
                </div>
              )}
              {entry.type === 'output' && (
                <pre className="text-zinc-300 whitespace-pre-wrap font-mono mt-1 pl-4 border-l border-zinc-800 text-[11px] sm:text-xs">
                  {entry.text}
                </pre>
              )}
            </div>
          ))}
        </div>

        {/* INPUT PROMPT FORM */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-zinc-800 bg-zinc-900/40 px-4 sm:px-6 py-3 flex items-center gap-2"
        >
          <span className="font-medium font-mono text-xs" style={{ color: 'var(--color-primary)' }}>guest@samiul.dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-zinc-100 outline-none font-mono text-xs placeholder:text-zinc-600"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-mono transition-colors"
          >
            Run
          </button>
        </form>

      </div>
    </section>
  );
};

export default Terminal;
