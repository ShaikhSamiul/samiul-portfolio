# AGENTS.md — Agent System Instructions & Guidelines

This document provides explicit guidelines for automated and interactive AI agents modifying the codebase in this repository.

---

## Workspace Context

- **Repository**: `samiul-portfolio` (branch: `main`)
- **Primary Application**: `animated-portfolio/` (Single Page Portfolio Website)
- **Target Audience / Purpose**: Showcase of Samiul Shaikh's full-stack development skills, AI application architectures, and interactive UI engineering.
- **Node Environment**: Node.js 18+ / 20+ with ESM. Package manager: `npm`.

---

## Agent Behavior & Code Style Standards

### 1. Component Modularity & Scope
- All UI components live in `animated-portfolio/src/components/`.
- Use functional React components with React hooks.
- For GSAP animations, use `@gsap/react`'s `useGSAP` hook with explicit ref scoping:
  ```javascript
  const containerRef = useRef(null);
  useGSAP(() => {
    // animations here
  }, { scope: containerRef });
  ```
- Do not mix inline styles with Tailwind classes unless computing dynamic coordinate values (e.g., magnetic physics offsets).

### 2. Styling Rules
- **Tailwind CSS v4**: All utility classes must be compatible with Tailwind CSS v4.
- **Custom Cursor System**: All custom cursors are defined as SVG data-URIs in `src/index.css`.
  - When introducing a new technology tag in `src/data.js`, ensure a corresponding `li[data-tech="<tag>"]` cursor definition exists in `src/index.css` or let it fallback to the default code brackets cursor.
- **Theme Variables**: The font family is configured as `--font-space` ("Space Grotesk") in `index.css` `@theme`.

### 3. Scroll & Animation Lifecycle Integrity
- Lenis runs in the root `App.jsx`.
- Never create a second Lenis instance in child components.
- When triggering smooth scroll to sections from buttons or navigation, utilize standard element methods that Lenis intercepts:
  ```javascript
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
  ```
- Ensure any `ScrollTrigger` instances created inside child components are cleaned up on unmount (handled automatically by `useGSAP` when scoped properly, or explicitly cleaned up via `ScrollTrigger.getAll().forEach(t => t.kill())` if declared outside `useGSAP`).

### 4. Asset Handling
- Video previews: Placed under `animated-portfolio/public/videos/`. Referenced as absolute paths: `/videos/<filename>`.
- PDF resume: Placed at `animated-portfolio/public/resume.pdf`.
- Static icons / SVGs: Stored in `animated-portfolio/public/` or `src/assets/`.

---

## Do's and Don'ts Checklist

| Do | Don't |
| :--- | :--- |
| Run all commands from `animated-portfolio/` | Run npm commands from the repository root |
| Use named imports (`import { useState } from 'react'`) | Import unused `React` default export in React 19 |
| Place styles in `src/index.css` or Tailwind classes | Add styles to `src/App.css` (it is not imported) |
| Follow Tailwind v4 syntax (`bg-linear-to-r`) | Use legacy v3 gradient syntax (`bg-gradient-to-r`) |
| Use `gsap.matchMedia()` for responsive animations | Hardcode viewport widths in GSAP timelines |
| Keep `src/data.js` as the source of project items | Hardcode project details into `Projects.jsx` |
| Maintain the preloader scroll lock lifecycle | Remove `lenis.stop()` or cause scroll jumps on reload |

