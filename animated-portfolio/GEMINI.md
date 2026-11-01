# GEMINI.md — Animated Portfolio Application Guidelines

This file is automatically loaded by Antigravity whenever working inside `animated-portfolio/`.

Refer to the parent `../GEMINI.md` for overall project rules, and adhere strictly to the local component and development rules below.

---

## Key Invariants for `animated-portfolio/`

1. **Framework**: React 19 + Vite 8 (ESM only, `"type": "module"`).
2. **Styling**: Tailwind CSS v4 using `@tailwindcss/vite`.
   - All custom styles and cursor SVGs reside in `src/index.css`.
   - Do **NOT** add rules to `src/App.css` (it is unused dead code from the Vite template).
   - Do **NOT** create a `tailwind.config.js`.
3. **Smooth Scroll & Animation**:
   - Lenis (`@studio-freight/lenis`) handles all page scrolling in `src/App.jsx`.
   - Scroll is paused during initial load via `lenis.stop()` and resumed via `lenis.start()` once `Preloader.jsx` triggers `onComplete`.
   - GSAP 3.15 + `@gsap/react` is used across `Preloader.jsx`, `Hero.jsx`, `Skills.jsx`, `Projects.jsx`, and `Footer.jsx`.
   - All `useGSAP` instances scope to component refs (`scope: containerRef`) for leak-free unmounting.
4. **Data Management**:
   - Projects are listed in `src/data.js`.
   - Project video previews belong in `public/videos/`.
   - Each project has an `id`, `title`, `tech` array, `description`, and `videoUrl`.
5. **Linting Rules**:
   - Flat ESLint config in `eslint.config.js`.
   - In React 19, do not import unused `React` from `'react'`. Use named imports like `import { useState, useEffect, useRef } from 'react'`.

