// Master Data File for Developer Portfolio
// Edit this file to update your personal details, projects, and bio

export const portfolioData = {
  personal: {
    name: "Aayush Sharma",
    kanjiName: "匠", // Kanji for 'Takumi' (Craftsman / Master Artisan)
    title: "Full-Stack Engineer & Creative Technologist",
    subtitle: "Specializing in distributed systems, high-performance web interfaces, and kinetic computing.",
    location: "New Delhi, India / Remote Worldwide",
    availability: "Available for Q1/Q2 high-impact engineering & consulting",
    email: "aayush.devcraft@gmail.com",
    github: "https://github.com/kali-linux-holic",
    discord: "https://discord.com/users/1548032871019708487",
    discordUserId: "1548032871019708487",
    twitter: "https://x.com",
    linkedin: "https://linkedin.com",
    resumeUrl: "#",
    yearsOfExperience: "4+",
    stats: [
      { label: "Production Uptime", value: "99.98%" },
      { label: "Avg Interface Latency", value: "< 45ms" },
      { label: "Daily Active Requests Handled", value: "12M+" },
      { label: "Open Source Stars & Forks", value: "1.4k+" }
    ]
  },

  philosophy: [
    {
      number: "01",
      kanji: "簡素",
      kanjiRomaji: "Kanso (Simplicity)",
      title: "Eliminate the Superfluous",
      description: "Complexity is an easy trap; deleting redundant code and simplifying distributed state is the highest form of engineering craft. If an architecture cannot be explained on paper, it is incomplete."
    },
    {
      number: "02",
      kanji: "自然",
      kanjiRomaji: "Shizen (Naturalness)",
      title: "Interfaces as Living Matter",
      description: "Digital interactions should feel like physical materials — responding to velocity, inertia, and human intent with micro-friction rather than synthetic flashiness. No artificial fluff."
    },
    {
      number: "03",
      kanji: "耐久",
      kanjiRomaji: "Taikyu (Durability)",
      title: "Resilience Over Fragility",
      description: "Graceful degradation over brittle perfection. Systems should bend like bamboo under spike traffic, falling back to cached read-replicas and circuit-breakers rather than collapsing."
    },
    {
      number: "04",
      kanji: "間",
      kanjiRomaji: "Ma (Negative Space)",
      title: "The Power of Breathing Room",
      description: "In code architecture, modularity provides breathing room for services to scale independently. In typography and layout, whitespace lets the human mind grasp meaning without sensory fatigue."
    }
  ],

  projects: [
    {
      id: "komorebi",
      category: "Creative Dev & WebGL",
      title: "Komorebi Engine",
      subtitle: "Real-time collaborative audio-visual canvas with CRDTs and WebGL shaders",
      kanjiTag: "木漏れ日",
      featured: true,
      year: "2024",
      liveUrl: "https://example.com/komorebi",
      githubUrl: "https://github.com/example/komorebi",
      tech: ["WebGL", "Three.js", "Yjs (CRDT)", "WebRTC", "TypeScript", "Tailwind CSS"],
      summary: "A peer-to-peer digital canvas that transforms concurrent multi-user cursor gestures into harmonic generative audio and kinetic particle fields, syncing state at 60fps across distributed clients.",
      problem: "Traditional multiplayer whiteboards suffer from server round-trip latency and rigid SVG pipelines that choke beyond 500 simultaneous elements.",
      solution: "Engineered a local-first peer-to-peer CRDT pipeline using Yjs over WebRTC data channels, paired with GPU-instanced WebGL shaders capable of rendering 50,000 interactive particles at 60 FPS.",
      metrics: [
        { label: "P2P State Sync Latency", value: "< 14ms" },
        { label: "GPU Particle Count", value: "50,000+" },
        { label: "Frame Rate Stability", value: "60 FPS steady" }
      ]
    },
    {
      id: "kuroshio",
      category: "Systems & Cloud",
      title: "Kuroshio Flow",
      subtitle: "Ultra-low latency distributed message broker & telemetry pipeline",
      kanjiTag: "黒潮",
      featured: true,
      year: "2024",
      liveUrl: "https://example.com/kuroshio",
      githubUrl: "https://github.com/example/kuroshio",
      tech: ["Go", "Redis Cluster", "gRPC", "Docker", "Prometheus", "PostgreSQL"],
      summary: "High-throughput stream processing ingestion engine designed to buffer, deduplicate, and broadcast millions of sensor telemetry events per minute across edge workers.",
      problem: "Downstream analytical pipelines were getting overwhelmed during burst spikes, leading to packet drops and memory fragmentation in legacy Node.js workers.",
      solution: "Rebuilt the ingestion gateway in Go using non-blocking epoll worker pools, ring buffer ring-queues, and token-bucket backpressure algorithms integrated with Redis Streams.",
      metrics: [
        { label: "Throughput Capacity", value: "85k req/sec" },
        { label: "Memory Footprint", value: "48MB idle" },
        { label: "Zero-loss Failover", value: "100% test pass" }
      ]
    },
    {
      id: "satori-design",
      category: "Frontend Architecture",
      title: "Satori Design System",
      subtitle: "Tokenized, zero-runtime accessible design system for enterprise software",
      kanjiTag: "悟り",
      featured: true,
      year: "2023",
      liveUrl: "https://example.com/satori",
      githubUrl: "https://github.com/example/satori",
      tech: ["React 19", "TypeScript", "CSS Variables", "Radix UI", "Storybook", "Vitest"],
      summary: "An architectural component library serving 4 multi-tenant applications with sub-millisecond paint metrics, automated color contrast checks, and full keyboard navigation.",
      problem: "Fragmented UI codebases across teams resulted in duplicate 180kB CSS bundles, inconsistent focus states, and failing accessibility compliance audits.",
      solution: "Crafted a headless token architecture with CSS custom properties and compound primitives, achieving 100% WCAG AAA rating and reducing total bundle footprint by 62%.",
      metrics: [
        { label: "Bundle Size Saved", value: "62% drop" },
        { label: "A11y Audit Score", value: "100 / 100" },
        { label: "Production Consumers", value: "4 Micro-frontends" }
      ]
    },
    {
      id: "aura-gateway",
      category: "Systems & Cloud",
      title: "Aura Edge Gateway",
      subtitle: "Intelligent reverse proxy with distributed rate limiting & Wasm filters",
      kanjiTag: "気配",
      featured: false,
      year: "2023",
      liveUrl: "https://example.com/aura",
      githubUrl: "https://github.com/example/aura",
      tech: ["Node.js", "WebAssembly", "Cloudflare Workers", "Upstash Redis", "TypeScript"],
      summary: "Edge routing layer deploying lightweight WebAssembly security inspection filters to prevent scraping and abuse before traffic touches origin VPCs.",
      problem: "Origin databases were absorbing distributed scrapers bypassing Cloudflare layer-7 checks, spiking RDS compute costs.",
      solution: "Wrote custom Rust-compiled Wasm header signature inspectors that execute at edge PoPs in under 2ms, cutting unwanted origin traffic by 91%.",
      metrics: [
        { label: "Edge Filter Overhead", value: "< 2.1ms" },
        { label: "Scraper Traffic Filtered", value: "91.4%" },
        { label: "Origin Cost Reduction", value: "38%" }
      ]
    }
  ],

  techStack: [
    {
      category: "Core Languages & Runtimes",
      items: [
        { name: "TypeScript", level: "Production Fluent", context: "Strict mode, advanced generics, AST codegen" },
        { name: "Go (Golang)", level: "High Competency", context: "Goroutines, channels, microservices, gRPC" },
        { name: "JavaScript (ESNext)", level: "Deep Mastery", context: "Event loop, V8 engine internals, Web APIs" },
        { name: "SQL", level: "Production Fluent", context: "Query optimization, indexing, CTEs, schema migrations" }
      ]
    },
    {
      category: "Frontend & Creative Engineering",
      items: [
        { name: "React 19 / Next.js", level: "Architecture Lead", context: "RSC, Server Actions, suspense, custom hooks" },
        { name: "Tailwind CSS", level: "Deep Mastery", context: "Modern design tokens, responsive fluid layouts" },
        { name: "WebGL / Three.js", level: "Creative Craft", context: "Custom shaders, scene graph, physics & canvas" },
        { name: "State & Data Sync", level: "Advanced", context: "Zustand, TanStack Query, CRDTs (Yjs)" }
      ]
    },
    {
      category: "Backend, Data & Cloud Infrastructure",
      items: [
        { name: "Node.js / Express / Fastify", level: "Deep Mastery", context: "Event-driven APIs, stream processing" },
        { name: "PostgreSQL", level: "Production Lead", context: "Connection pooling, ACID guarantees, partitioning" },
        { name: "Redis", level: "Production Lead", context: "Sub-millisecond caching, pub/sub, distributed locking" },
        { name: "Docker & CI/CD", level: "Proficient", context: "Multi-stage builds, GitHub Actions, edge deployment" }
      ]
    }
  ],

  careerTimeline: [
    {
      period: "2023 — Present",
      role: "Senior Full-Stack & Systems Engineer",
      company: "Independent Architectural Engineering",
      location: "Remote",
      highlight: "Consulting for early-stage fintech and dev-tool startups on edge architectures, WebGL interactions, and high-concurrency microservices."
    },
    {
      period: "2021 — 2023",
      role: "Full-Stack Software Engineer",
      company: "CloudScale Technologies",
      location: "Bangalore / Hybrid",
      highlight: "Spearheaded the migration of monolith APIs to event-driven Go and Node services, slashing latency from 320ms to 48ms across key checkout endpoints."
    },
    {
      period: "2020 — 2021",
      role: "Frontend Engineer & UI Systems",
      company: "Nexus Labs",
      location: "New Delhi",
      highlight: "Built an internal design system component library adopted by 32 engineers, cutting feature turnaround time by 40%."
    }
  ]
};
