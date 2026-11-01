# Samiul Shaikh — Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88ce02?logo=greensock&logoColor=white)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black)](https://github.com/darkroomengineering/lenis)

A high-performance, dark-themed personal developer portfolio built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **GSAP**, and **Lenis**. Designed with an ultra-smooth scrolling experience, velocity-based animation warping, responsive scroll-triggered card reveals, magnetic interaction links, and custom SVG tech stack cursors.

---

## 🌟 Live Demo & Socials

- **Owner**: Samiul Shaikh (Software & Full Stack Developer)
- **Email**: [shaikhsamiul2005@gmail.com](mailto:shaikhsamiul2005@gmail.com)
- **GitHub**: [github.com/ShaikhSamiul](https://github.com/ShaikhSamiul)
- **LinkedIn**: [linkedin.com/in/shaikh-samiul-31a854271/](https://www.linkedin.com/in/shaikh-samiul-31a854271/)

---

## 🚀 Key Features

1. **System Initializing Preloader**:
   - Dynamic 0% to 100% GSAP counter with matching progress bar.
   - Lenis scroll-lock prevents user scrolling until the entrance sequence concludes.
   - Smooth exponential curtain reveal sliding up out of view.

2. **Auto-Hiding Dynamic Navbar**:
   - Direction-aware scroll detection (hides when scrolling down, reappears when scrolling up).
   - Glassmorphism backdrop-blur effect activates when scrolled past top offset.
   - Smooth Lenis-integrated anchor scrolling (`#skills`, `#projects`, `#contact`).

3. **Hero Section**:
   - Staggered entrance animations for title, subtitle, and badge.
   - Subtle sine-wave floating y-axis loop on the primary heading.
   - Radial emerald ambient lighting glow and animated scroll bounce indicator.

4. **"The Arsenal" Velocity Marquee**:
   - Dual opposing marquee ribbons displaying technology stacks.
   - Velocity-based scroll warping: Marquee speeds up smoothly based on scroll speed (`self.getVelocity()`) and smoothly decelerates back to normal speed.
   - Hover focus effect: Container slows to a crawl on mouse hover, dimming non-hovered items while highlighting the target item.

5. **Responsive Work Showcase**:
   - Powered by `gsap.matchMedia()`:
     - **Desktop (>=768px)**: Opposing horizontal slide-ins (text from left, video from right).
     - **Mobile (<768px)**: Vertical fade-up animation with optimized performance.
   - Video project previews with scale hover and custom HUD targeting cursor.

6. **Magnetic Footer & Contact**:
   - Magnetic contact buttons powered by `gsap.quickTo` with spring-elastic easing (`elastic.out(1, 0.3)`).
   - Scroll-scrubbed typography reveal using GSAP `ScrollTrigger`.

7. **Custom SVG HUD Cursor System**:
   - Context-aware custom SVG cursors defined in `src/index.css`:
     - Default emerald circular ring
     - Targeting HUD reticle for videos
     - Glowing brackets `< / >` for GitHub links
     - Network graph for LinkedIn links
     - Paper airplane for email links
     - Unique icons for tech chips (`react`, `node.js`, `python`, `fastapi`, `gemini`, `pinecone`, `mongodb`, `express`, `websockets`)
     - Easter Egg: Glowing crown cursor when hovering over Samiul's name

---

## 📁 Repository Directory Structure

```
Portfolio/
├── .git/
├── GEMINI.md                          # Antigravity rules & anti-hallucination source of truth
├── AGENTS.md                          # Universal AI agent instructions
├── README.md                          # This workspace documentation file
└── animated-portfolio/                # Vite React application
    ├── package.json                   # App dependencies & scripts
    ├── vite.config.js                 # Vite 8 configuration with React & Tailwind plugins
    ├── eslint.config.js               # ESLint 10 flat configuration
    ├── index.html                     # HTML shell, Space Grotesk font
    ├── README.md                      # Application-specific documentation
    ├── ARCHITECTURE.md                # In-depth architectural & animation breakdown
    ├── public/
    │   ├── favicon.svg
    │   ├── icons.svg
    │   ├── resume.pdf
    │   └── videos/
    │       └── doc-analyzer.mkv
    └── src/
        ├── App.jsx                    # Root layout & scroll lifecycle orchestration
        ├── data.js                    # Featured project content definitions
        ├── index.css                  # Tailwind v4 @theme & custom SVG cursor engine
        ├── main.jsx                   # React 19 entry point
        ├── assets/                    # Static image assets
        └── components/
            ├── Preloader.jsx
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── Skills.jsx
            ├── Projects.jsx
            └── Footer.jsx
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/ShaikhSamiul/samiul-portfolio.git

# Enter the application directory
cd samiul-portfolio/animated-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
# From within animated-portfolio/
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 License

© 2026 Samiul Shaikh. All rights reserved.

