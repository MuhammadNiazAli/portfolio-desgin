"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Github, Filter } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = ["All", "Full Stack", "Frontend", "Backend", "E-Commerce"];

const projects = [
  {
    id: 1,
    title: "ShopNova — E-Commerce Platform",
    desc: "A full-featured multi-vendor marketplace with real-time inventory management, Stripe payments, dynamic product filtering, and a powerful admin dashboard.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL", "Tailwind"],
    category: "E-Commerce",
    status: "Live",
    year: "2024",
    live: "#",
    github: "#",
    highlight: true,
    accentColor: "#00ff88",
  },
  {
    id: 2,
    title: "FlowBoard — SaaS Dashboard",
    desc: "Analytics and project management SaaS with multi-tenancy, role-based access control, real-time charts, and team collaboration features.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "Chart.js"],
    category: "Full Stack",
    status: "Live",
    year: "2024",
    live: "#",
    github: "#",
    highlight: true,
    accentColor: "#0088ff",
  },
  {
    id: 3,
    title: "ConnectSphere — Social Media App",
    desc: "Instagram-inspired platform with real-time messaging, stories, follow system, explore feed, and AWS S3 media uploads.",
    tags: ["Next.js", "Supabase", "Tailwind", "WebSockets", "AWS S3"],
    category: "Full Stack",
    status: "Live",
    year: "2023",
    live: "#",
    github: "#",
    highlight: false,
    accentColor: "#ff0088",
  },
  {
    id: 4,
    title: "TaskMaster — Project Management Tool",
    desc: "Trello-like kanban board with drag-and-drop, deadlines, team assignments, real-time updates, and notifications.",
    tags: ["React", "DnD Kit", "Node.js", "MongoDB", "Socket.io"],
    category: "Full Stack",
    status: "Live",
    year: "2023",
    live: "#",
    github: "#",
    highlight: false,
    accentColor: "#ff8800",
  },
  {
    id: 5,
    title: "WeatherNow — Weather App",
    desc: "Beautiful weather dashboard with 7-day forecasts, hourly data, location search, and animated weather icons powered by OpenWeather API.",
    tags: ["React", "TypeScript", "Tailwind", "OpenWeather API"],
    category: "Frontend",
    status: "Live",
    year: "2023",
    live: "#",
    github: "#",
    highlight: false,
    accentColor: "#0088ff",
  },
  {
    id: 6,
    title: "AuthAPI — Secure Auth Microservice",
    desc: "Production-ready authentication microservice with JWT, refresh tokens, OAuth (Google/GitHub), rate limiting, and email verification.",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT", "Redis", "Nodemailer"],
    category: "Backend",
    status: "Open Source",
    year: "2024",
    live: "#",
    github: "#",
    highlight: false,
    accentColor: "#00ff88",
  },
  {
    id: 7,
    title: "DevBlog — Markdown Blog Platform",
    desc: "Developer-focused blogging platform with MDX support, syntax highlighting, tags, search, and a clean reading experience.",
    tags: ["Next.js", "MDX", "Tailwind", "Vercel"],
    category: "Frontend",
    status: "Live",
    year: "2023",
    live: "#",
    github: "#",
    highlight: false,
    accentColor: "#ff0088",
  },
  {
    id: 8,
    title: "CryptoTrack — Crypto Portfolio Tracker",
    desc: "Real-time cryptocurrency portfolio tracker with price alerts, portfolio performance charts, and CoinGecko API integration.",
    tags: ["React", "TypeScript", "Recharts", "CoinGecko API", "Zustand"],
    category: "Frontend",
    status: "Live",
    year: "2024",
    live: "#",
    github: "#",
    highlight: false,
    accentColor: "#ff8800",
  },
];

const statusColors: Record<string, string> = {
  Live: "#00ff88",
  "Open Source": "#0088ff",
  "In Progress": "#ff8800",
};

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const COLORS = ["#00ff88", "#0088ff", "#ff8800", "#ff0088"];
    type P = { x: number; y: number; r: number; vx: number; vy: number; color: string; alpha: number };

    const particles: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
    }));

    function resize() { canvas!.width = window.innerWidth; canvas!.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const W = canvas!.width, H = canvas!.height;
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - d / 120) * 0.09;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, index,
}: { project: typeof projects[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-[#0a0a0f] border border-white/[0.07]
                 overflow-hidden hover:bg-[#0d0d15] transition-colors duration-300"
    >
      {/* colored top border — unique per card */}
      <span
        className="absolute inset-x-0 top-0 h-[1px] z-10"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
      />

      {/* subtle corner glow on hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${project.accentColor}, transparent 55%)` }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-8">
        {/* status row */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[2px] uppercase"
            style={{ color: statusColors[project.status] }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: statusColors[project.status], boxShadow: `0 0 6px ${statusColors[project.status]}` }}
            />
            {project.status}
          </span>

          <span className="font-mono text-[10px] text-white/25">{project.year}</span>

          {project.highlight && (
            <span
              className="ml-auto font-mono text-[9px] tracking-[2px] uppercase px-3 py-1 border"
              style={{ color: project.accentColor, borderColor: project.accentColor + "40", background: project.accentColor + "0d" }}
            >
              Featured
            </span>
          )}

          {!project.highlight && (
            <span className="ml-auto font-mono text-[10px] text-white/20 tracking-[2px] uppercase">
              {project.category}
            </span>
          )}
        </div>

        {/* title */}
        <h3
          className="font-display text-xl tracking-wide text-white mb-4
                     group-hover:transition-colors group-hover:duration-300"
          style={{ ["--hover-color" as string]: project.accentColor }}
        >
          <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300">
            {project.title}
          </span>
        </h3>

        {/* desc */}
        <p className="font-body text-white/45 text-sm leading-relaxed flex-1 mb-7 line-clamp-3">
          {project.desc}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wide px-3 py-1
                         border border-white/[0.08] text-white/35
                         hover:text-white/60 hover:border-white/20
                         transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="font-mono text-[10px] px-3 py-1 border border-white/[0.06] text-white/20">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* links */}
        <div className="flex items-center gap-4 pt-5 border-t border-white/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/g flex items-center gap-2 font-mono text-[11px] tracking-[2px]
                       uppercase text-white/30 hover:text-white transition-colors duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/l ml-auto flex items-center gap-2 font-mono text-[11px]
                       tracking-[2px] uppercase transition-colors duration-200"
            style={{ color: project.accentColor + "80" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = project.accentColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = project.accentColor + "80")}
          >
            Live Demo
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const totalProjects  = projects.length;
  const liveProjects   = projects.filter((p) => p.status === "Live").length;
  const featuredCount  = projects.filter((p) => p.highlight).length;
  const categoryCount  = new Set(projects.map((p) => p.category)).size;

  return (
    <div className="min-h-screen bg-black pt-24 overflow-x-hidden">
      <ParticleCanvas />

      {/* ── HERO ── */}
      <section className="relative py-28 grid-bg overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full
                        bg-[#00ff88]/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full
                        bg-[#0088ff]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs tracking-[5px] text-accent uppercase"
          >
            My Work
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white mt-3 mb-6"
          >
            SELECTED<br />
            <span className="gradient-text">PROJECTS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body text-white/50 text-lg max-w-2xl"
          >
            A collection of projects I&apos;ve built — ranging from full-stack SaaS
            applications to open-source tools and creative experiments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-16 flex items-center gap-4 font-mono text-[10px] tracking-[4px]
                       text-white/25 uppercase"
          >
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-white/25" />
            Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="relative z-10 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.07]">
          {[
            { num: totalProjects,  suffix: "+", label: "Total Projects"  },
            { num: liveProjects,   suffix: "",  label: "Live in Prod"    },
            { num: featuredCount,  suffix: "",  label: "Featured Works"  },
            { num: categoryCount,  suffix: "",  label: "Domains Covered" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="border-r border-b border-white/[0.07] last:border-r-0
                         [&:nth-child(2)]:lg:border-r [&:nth-child(3)]:border-b-0
                         [&:nth-child(4)]:border-b-0 px-8 py-10"
            >
              <span className="font-display text-5xl font-bold gradient-text">
                {s.num}{s.suffix}
              </span>
              <p className="font-mono text-[10px] tracking-[3px] text-white/35 uppercase mt-2">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <section className="relative z-10 py-8 border-y border-white/[0.05] bg-[#0a0a0f]/80 backdrop-blur-md mt-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
            <div className="flex items-center gap-[2px] bg-white/[0.03] border border-white/[0.06]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative flex-shrink-0 px-5 py-2.5 font-mono text-[11px] tracking-[2px]
                               uppercase transition-all duration-300 overflow-hidden
                               ${activeFilter === cat
                      ? "text-black"
                      : "text-white/35 hover:text-white/70"
                    }`}
                >
                  {activeFilter === cat && (
                    <motion.span
                      layoutId="filterActive"
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg, #00ff88, #00cc6a)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/[0.04]"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-white/[0.06] bg-[#0a0a0f]"
            >
              <p className="font-mono text-[11px] tracking-[4px] text-white/25 uppercase">
                No projects found
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}