// src/data.js — Engineering Systems & Architecture Data

export const telemetry = {
  name: "SAMIUL SHAIKH",
  role: "Full-Stack & Applied AI Engineer",
  location: "Vadodara, India",
  coordinates: "22.30° N, 73.18° E",
  status: "Available for High-Impact Roles",
  experienceYears: "2+",
  focus: "Distributed Systems, Real-Time Sync & Applied AI",
  github: "https://github.com/ShaikhSamiul",
  linkedin: "https://www.linkedin.com/in/shaikh-samiul-31a854271/",
  email: "shaikhsamiul2005@gmail.com",
};

export const projects = [
  {
    id: "doc-analyzer",
    title: "AI Document Analyzer",
    tagline: "Full-stack RAG engine with multi-tenant session isolation and grounded citations",
    category: "Applied AI / RAG Pipeline",
    domainUrl: "https://ai-rag-analyzer.vercel.app",
    liveUrl: "https://ai-rag-analyzer.vercel.app",
    githubUrl: "https://github.com/ShaikhSamiul/ai-rag-analyzer",
    tech: ["React 19", "Python", "FastAPI", "LangChain", "Gemini AI", "Pinecone", "Render", "Vercel"],
    stats: [
      { label: "Vector DB", value: "Pinecone Namespaces" },
      { label: "Embeddings", value: "gemini-embedding-001" },
      { label: "Multi-Tenancy", value: "Isolated Sessions" },
      { label: "Chunk Sizing", value: "2000 chars (100 RPM)" }
    ],
    description:
      "Full-stack Retrieval-Augmented Generation application parsing unstructured PDFs into vectorized text embeddings, using LangChain and Google Gemini to deliver grounded, citation-backed answers without multi-tenant cross-contamination.",
    pipeline: [
      { step: "01", name: "PDF Ingestion", detail: "FastAPI stream & PyPDF2 text extraction" },
      { step: "02", name: "Chunking", detail: "LangChain RecursiveTextSplitter (2000c)" },
      { step: "03", name: "Vector Index", detail: "Pinecone isolated session namespaces" },
      { step: "04", name: "Grounded AI", detail: "Gemini 1.5 contextual answer synthesis" }
    ],
    architecture: [
      "Session-based namespace isolation preventing cross-tenant data leaks across concurrent sessions.",
      "Optimized LangChain chunking schedule designed to strictly comply with Gemini API quota limits (100 RPM).",
      "Decoupled cloud architecture: Vercel serverless client paired with an ASGI FastAPI backend on Render with strict CORS."
    ],
    deployment: "Vercel Serverless (Frontend) • Render Cloud (FastAPI ASGI Backend)",
    accentColor: "emerald",
    featured: true,
  },
  {
    id: "seat-booking",
    title: "Real-Time Seat Booking Engine",
    tagline: "High-concurrency ticket locking engine with real-time WebSocket state synchronization",
    category: "Real-Time / Distributed Systems",
    domainUrl: "https://seat-booking-system-nu.vercel.app",
    liveUrl: "https://seat-booking-system-nu.vercel.app",
    githubUrl: "https://github.com/ShaikhSamiul/seat-booking-system",
    tech: ["React 18", "Node.js", "Express", "Socket.io", "Redis", "MongoDB Atlas", "Framer Motion", "Tailwind CSS"],
    stats: [
      { label: "Lock Mechanism", value: "Redis SET NX EX" },
      { label: "Real-Time Sync", value: "Socket.io WebSockets" },
      { label: "Auto-Release", value: "300s TTL Heartbeat" },
      { label: "Conflict Rate", value: "0.00% Guaranteed" }
    ],
    description:
      "High-concurrency ticket reservation engine utilizing a two-database hybrid architecture (Redis for ephemeral atomic locks and MongoDB for permanent booking records) to prevent double-booking under heavy network traffic.",
    pipeline: [
      { step: "01", name: "WS Handshake", detail: "Socket.io real-time client connection" },
      { step: "02", name: "Atomic Lock", detail: "Redis SET NX EX 300s temporary hold" },
      { step: "03", name: "State Fan-Out", detail: "Instant LOCKED/BOOKED broadcast" },
      { step: "04", name: "Persistence", detail: "MongoDB Atlas commit & lock cleanup" }
    ],
    architecture: [
      "Distributed concurrency control using Redis atomic operations to eliminate double-booking race conditions.",
      "Heartbeat auto-reclamation scrubs expired locks if a user drops Wi-Fi or closes their browser before payment.",
      "Two-tier data model isolating high-velocity temporary state from relational persistence guarantees."
    ],
    deployment: "Vercel (Client) • Render (Node.js/Socket.io) • Upstash Redis (Cloud)",
    accentColor: "cyan",
    featured: true,
  },
  {
    id: "ams-platform",
    title: "AMS E-Commerce & Custom PC Platform",
    tagline: "Full-stack hardware commerce platform with interactive PC configuration and repair management",
    category: "Full-Stack Architecture",
    domainUrl: "https://ams-react.vercel.app",
    liveUrl: "https://ams-react.vercel.app",
    githubUrl: "https://github.com/ShaikhSamiul/AMS-React",
    tech: ["React (TS)", "HeroUI", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase Auth", "Cloudinary"],
    stats: [
      { label: "Architecture", value: "Full-Stack Monorepo" },
      { label: "Components", value: "HeroUI & TypeScript" },
      { label: "Cloud Services", value: "Firebase + Cloudinary" },
      { label: "Fulfillment", value: "Custom PC & Repairs" }
    ],
    description:
      "Enterprise hardware e-commerce platform featuring an interactive custom PC builder, dedicated administrative control dashboard, automated repair ticket tracking, and multi-service cloud integrations.",
    pipeline: [
      { step: "01", name: "Component Matrix", detail: "Multi-category hardware inventory catalog" },
      { step: "02", name: "PC Builder Engine", detail: "Interactive component selection & dynamic price" },
      { step: "03", name: "Admin Dashboard", detail: "Inventory management & repair ticket pipeline" },
      { step: "04", name: "Cloud Sync", detail: "Firebase auth, Cloudinary assets & Resend email" }
    ],
    architecture: [
      "Interactive custom PC builder aggregating multi-tier component dependencies with dynamic cart synchronization.",
      "Dual-portal architecture separating customer storefront operations from administrative inventory & repair tracking.",
      "Serverless Vercel deployment with modular Express API rewrite routing and MongoDB aggregation pipelines."
    ],
    deployment: "Vercel Serverless (Frontend + Express API) • MongoDB Atlas Cloud",
    accentColor: "amber",
    featured: true,
  }
];

export const skillsMatrix = [
  {
    category: "01. Core Architecture & Frontend",
    description: "High-performance reactive interfaces and predictable client state.",
    items: [
      { name: "React 19 / 18", level: "Advanced", note: "Hooks, StrictMode, State Machines" },
      { name: "TypeScript", level: "Proficient", note: "Strict type safety, generic interfaces" },
      { name: "Tailwind CSS v4", level: "Expert", note: "Modern CSS tokens, utility architectures" },
      { name: "GSAP / Lenis", level: "Advanced", note: "Physics-based 60fps scroll & micro-interactions" },
    ]
  },
  {
    category: "02. Backend Systems & Real-Time",
    description: "Low-latency REST/WebSocket backends and distributed coordination.",
    items: [
      { name: "Python / FastAPI", level: "Advanced", note: "Async ASGI pipelines, Pydantic validation" },
      { name: "Node.js / Express", level: "Advanced", note: "Event loop optimization, middleware design" },
      { name: "WebSockets / Socket.io", level: "Proficient", note: "Bidirectional streaming, heartbeat protocols" },
      { name: "Redis", level: "Proficient", note: "Atomic locks (SET NX EX), TTL expirations" },
    ]
  },
  {
    category: "03. Applied AI & Data Infrastructure",
    description: "Contextual RAG architectures, vector indexing, and relational/document DBs.",
    items: [
      { name: "Google Gemini SDK", level: "Advanced", note: "Embeddings, contextual grounding, streaming" },
      { name: "Pinecone / Vector DBs", level: "Proficient", note: "Namespace isolation, cosine clustering" },
      { name: "MongoDB Atlas", level: "Advanced", note: "Aggregation pipelines, schema indexing, Mongoose" },
      { name: "LangChain", level: "Proficient", note: "RecursiveCharacterTextSplitter, RAG orchestration" },
    ]
  },
  {
    category: "04. Engineering Practices & Tooling",
    description: "Modern developer ergonomics, build optimizations, and version control.",
    items: [
      { name: "Vite", level: "Expert", note: "Sub-second HMR, Rollup chunk splitting" },
      { name: "Git & GitHub", level: "Advanced", note: "Trunk-based workflow, clean commit hygiene" },
      { name: "Vercel & Render", level: "Advanced", note: "Serverless deployments, ASGI orchestration" },
      { name: "ESLint 10", level: "Advanced", note: "Flat config architecture, zero-warning standards" },
    ]
  }
];

export const terminalCommands = {
  help: "Available commands: 'whoami', 'skills', 'projects', 'status', 'contact', 'clear'",
  whoami: "Samiul Shaikh — Full-stack developer focused on distributed architectures and applied AI systems.",
  status: "🟢 ONLINE | Open for select high-impact engineering roles, contract builds, and collaborations.",
  skills: "Core: React 19, Python, FastAPI, Node.js, Express, Socket.io, Redis, Pinecone, Gemini AI, MongoDB, Tailwind v4.",
  projects: "1. AI Document Analyzer (RAG) -> https://ai-rag-analyzer.vercel.app\n2. Real-Time Seat Booking Engine -> https://seat-booking-system-nu.vercel.app\n3. AMS E-Commerce & Custom PC Platform -> https://ams-react.vercel.app",
  contact: "Email: shaikhsamiul2005@gmail.com\nGitHub: github.com/ShaikhSamiul\nLinkedIn: linkedin.com/in/shaikh-samiul-31a854271/"
};
