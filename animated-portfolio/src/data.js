// src/data.js
export const projects = [
  {
    id: 1,
    title: "AI Document Analyzer",
    tech: ["React", "Python", "FastAPI", "Gemini", "Pinecone"],
    description: "A RAG-based tool for processing and querying complex PDF documents.",
    videoUrl: "/videos/doc-analyzer.mkv", // Put your video in public/videos/
  },
  {
    id: 2,
    title: "AMS Website",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    description: "A comprehensive e-commerce platform featuring a custom PC building utility.",
    // videoUrl: "/videos/ams-store.mp4",
    videoUrl: "/videos/doc-analyzer.mkv"
  },
  {
    id: 3,
    title: "Seat Booking System",
    tech: ["React", "Node.js", "WebSockets"],
    description: "Real-time tracking system engineered to prevent concurrent booking conflicts.",
    // videoUrl: "/videos/seat-booking.mp4",
    videoUrl: "/videos/doc-analyzer.mkv"
  }
];