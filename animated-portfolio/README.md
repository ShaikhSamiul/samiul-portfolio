# Animated Portfolio — Application Frontend

This folder contains the source code for the **Animated Portfolio** web application, built with React 19, Vite 8, Tailwind CSS v4, GSAP, and Lenis.

---

## 🛠️ Tech Stack & Dependencies

| Category | Package | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | `react` / `react-dom` | `^19.2.5` | Modern UI rendering & component model |
| **Build Tool** | `vite` | `^8.0.10` | Ultra-fast HMR and Rollup production bundler |
| **Styling** | `tailwindcss` | `^4.2.4` | Utility-first styling with zero-config `@theme` |
| **Vite Tailwind** | `@tailwindcss/vite` | `^4.2.4` | Official Vite plugin for Tailwind CSS v4 |
| **Animations** | `gsap` | `^3.15.0` | Core timeline, tweens, and ScrollTrigger |
| **GSAP React** | `@gsap/react` | `^2.1.2` | Safe React hook integration (`useGSAP`) with automatic cleanup |
| **Smooth Scroll** | `@studio-freight/lenis` | `^1.0.42` | Inertial smooth scrolling across all devices |
| **Linter** | `eslint` | `^10.2.1` | Flat config code quality and hook verification |

---

## 📂 Source Code Map

### `src/` Directory Breakdown

- **`main.jsx`**: Bootstraps the React DOM root under React `StrictMode`.
- **`App.jsx`**:
  - Initializes Lenis smooth scrolling with an exponential deceleration curve.
  - Controls loading state (`isLoading`).
  - Calls `lenis.stop()` during preloading and `lenis.start()` once loading completes.
  - Mounts components in vertical sequence: `Preloader`, `Navbar`, `Hero`, `Skills`, `Projects`, `Footer`.
- **`data.js`**:
  - Central array of projects.
  - To add a project, append an object with `{ id, title, tech: [...], description, videoUrl }`.
- **`index.css`**:
  - Imports Google Font `Space Grotesk`.
  - Configures Tailwind CSS v4 via `@import "tailwindcss";` and `@theme`.
  - Configures all custom SVG data-URI cursors (default, links, video HUD, social, tech tags, Easter egg crown).
  - Note: `src/App.css` is unused legacy Vite boilerplate and is not imported.

### `src/components/` Directory Breakdown

- **`Preloader.jsx`**:
  - Fullscreen overlay (`z-999`) with a numeric counter from `0%` to `100%`.
  - Animates a progress bar (`origin-left scale-x-0` to `1`).
  - Fades out text and slides container up (`yPercent: -100`) via `expo.inOut`.
  - Calls `onComplete` prop to unlock scrolling in `App.jsx`.
- **`Navbar.jsx`**:
  - Fixed header (`z-100`) that auto-hides when scrolling down and reappears when scrolling up.
  - Dynamic styling: Transparent at top (`scrollY < 50`), switches to `bg-zinc-950/80 backdrop-blur-md` with subtle border on scroll.
  - Smooth anchor link handler (`handleNavClick`) for `#top`, `#skills`, `#projects`, `#contact`.
  - Direct link to `/resume.pdf`.
- **`Hero.jsx`**:
  - Staggered entrance timeline (`power4.out`, `power3.out`, `back.out`).
  - Ambient radial glow (`bg-emerald-500/10 blur-[120px]`).
  - Floating vertical oscillation on the heading (`yPercent: 10, yoyo: true, repeat: -1`).
  - Animated bouncing scroll indicator at bottom.
- **`Skills.jsx`**:
  - Two opposing marquee rows (`.marquee-row-1` and `.marquee-row-2`).
  - `ScrollTrigger.create` tracks user scroll velocity via `self.getVelocity()`.
  - Dynamic acceleration (`timeScale: 1 + Math.abs(velocity / 400)`) with automatic return to 1.
  - Hover slowdown (`timeScale: 0.15`) and group dimming (non-hovered items dim to 30% opacity).
- **`Projects.jsx`**:
  - Iterates over `projects` from `../data.js`.
  - Uses `gsap.matchMedia()`:
    - **Desktop (`>=768px`)**: Horizontal opposing slide-in animations.
    - **Mobile (`<=767px`)**: Vertical staggered fade-up.
  - Embedded `<video>` tag with autoplay, loop, muted, and playsinline attributes.
- **`Footer.jsx`**:
  - ScrollTrigger scrub reveal on heading and description text.
  - `MagneticLink` component: Uses `gsap.quickTo` with `elastic.out(1, 0.3)` to attract links towards cursor position.
  - Direct social links: Gmail, GitHub, LinkedIn.

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run ESLint
npm run lint

# Build for production
npm run build

# Preview build locally
npm run preview
```

---

## 🎨 Adding New Projects or Tech Badges

1. **Add Project to `src/data.js`**:
   ```javascript
   {
     id: 4,
     title: "Project Name",
     tech: ["React", "FastAPI", "PostgreSQL"],
     description: "Summary of what the project achieves.",
     videoUrl: "/videos/project-demo.mp4"
   }
   ```
2. **Add Video**:
   Place `project-demo.mp4` into `animated-portfolio/public/videos/`.
3. **Add Custom Tech Cursor (Optional)**:
   In `src/index.css`, add a selector under the `@media (hover: hover)` block:
   ```css
   li[data-tech="postgresql"] {
     cursor: url('data:image/svg+xml;utf8,...') 24 24, pointer !important;
   }
   ```
