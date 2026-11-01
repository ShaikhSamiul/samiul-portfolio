# GEMINI.md — Ground Truth & Anti-Hallucination Guidelines

This document serves as the absolute source of truth for all AI coding assistants operating within this repository. It defines the project architecture, exact tech stack, component contracts, animation lifecycles, and strict rules to prevent hallucinations.

---

## 1. Project Overview & Identity

- **Project**: Samiul Shaikh's Personal Developer Portfolio
- **Owner**: Samiul Shaikh (Software & Full Stack Developer)
- **Email**: `shaikhsamiul2005@gmail.com`
- **GitHub**: [github.com/ShaikhSamiul](https://github.com/ShaikhSamiul)
- **LinkedIn**: [linkedin.com/in/shaikh-samiul-31a854271/](https://www.linkedin.com/in/shaikh-samiul-31a854271/)
- **Repository**: `https://github.com/ShaikhSamiul/samiul-portfolio.git`
- **Design Aesthetic**: High-craft Architectural Dark Bento & Kinetic Engineering. Deep Obsidian canvas (`#09090b`), crisp hairline borders (`border-white/10`), Space Grotesk + JetBrains Mono typography, custom zero-lag SVG HUD cursors.

---

## 2. Directory & Workspace Structure

```
Portfolio/                                   # Workspace root & Git repository
├── .git/                                    # Git VCS directory (branch: main)
├── GEMINI.md                                # Root agent context & rules (this file)
├── AGENTS.md                                # Universal agent instruction spec
├── README.md                                # Root repository guide
└── animated-portfolio/                      # Vite + React application directory
    ├── package.json                         # Dependencies & npm scripts
    ├── vite.config.js                       # Vite 8 config (react + tailwindcss vite plugin)
    ├── eslint.config.js                     # ESLint 10 flat configuration
    ├── index.html                           # App entry point (Space Grotesk font)
    ├── README.md                            # Application setup & developer guide
    ├── ARCHITECTURE.md                      # Detailed technical architecture & animation specs
    ├── public/
    │   ├── favicon.svg                      # Site favicon
    │   ├── icons.svg                        # SVG symbol sheet
    │   ├── resume.pdf                       # Downloadable/viewable resume
    │   └── videos/
    │       └── doc-analyzer.mkv             # Project preview video
    └── src/
        ├── main.jsx                         # React root bootstrap (StrictMode)
        ├── App.jsx                          # Root layout, Lenis setup, Preloader orchestration
        ├── index.css                        # Global CSS, Tailwind v4 @theme, Custom SVG cursors
        ├── data.js                          # Telemetry, Bento projects & skills matrix data
        └── components/
            ├── Preloader.jsx                # Cinematic system bootstrap sequence
            ├── Navbar.jsx                   # Floating glass HUD with live IST clock
            ├── Hero.jsx                     # Monumental typography & engineering telemetry
            ├── Projects.jsx                 # Interactive Bento Work Showcase
            ├── Skills.jsx                   # Categorized Architecture & Capabilities Matrix
            ├── Terminal.jsx                 # In-Browser Live Interactive Shell
            └── Footer.jsx                   # 1-Click Copy & Direct Communication Grid
```

---

## 3. Strict Anti-Hallucination Rules

### Rule 1: No Routing / Multi-Page Hallucinations
- **This is a Single Page Application (SPA)**.
- There is **NO** `react-router`, `wouter`, `next.js`, or client-side router installed.
- Navigation relies purely on HTML section IDs and Lenis-compatible smooth scroll:
  - `#top` -> `Hero.jsx`
  - `#work` -> `Projects.jsx`
  - `#radar` -> `Skills.jsx`
  - `#terminal` -> `Terminal.jsx`
  - `#contact` -> `Footer.jsx`
- Do not create multi-page routes or import router hooks.

### Rule 2: Tailwind CSS v4 (NOT v3)
- The project runs **Tailwind CSS v4** (`@tailwindcss/vite` and `tailwindcss` `^4.2.4`).
- **NO `tailwind.config.js` or `postcss.config.js` exists**. Do not attempt to create or read them.
- Configuration is handled in `src/index.css` via `@import "tailwindcss";` and `@theme { ... }`.
- Syntax differences to observe strictly:
  - Modern linear gradients use `bg-linear-to-r` or `bg-gradient-to-r` via v4 rules.
  - Font families are registered via `@theme { --font-space: ...; --font-mono: ...; --font-syne: ...; }`.

### Rule 3: `App.css` Has Been Removed
- `src/App.css` was leftover boilerplate from Vite template and has been permanently deleted.
- All styles live strictly in `src/index.css` and Tailwind utility classes.

### Rule 4: Lenis + GSAP Scroll Synchronization
- Smooth scrolling is managed by `@studio-freight/lenis`.
- **Preloader Lock Lifecycle**:
  1. `App.jsx` initializes Lenis and calls `lenis.stop()` immediately to prevent user scrolling during the preloader.
  2. `Preloader.jsx` runs GSAP counter and curtain lift.
  3. On completion, `Preloader` fires `onComplete()` callback.
  4. `App.jsx` sets `isLoading = false` and calls `lenisRef.current.start()` to re-enable scrolling.

---

## 4. Development Commands

Always execute npm commands inside the `animated-portfolio/` directory:

```bash
# Navigate to the app directory
cd "animated-portfolio"

# Start Vite dev server
npm run dev

# Production build (outputs to dist/)
npm run build

# Run ESLint validation
npm run lint

# Preview production build locally
npm run preview
```
