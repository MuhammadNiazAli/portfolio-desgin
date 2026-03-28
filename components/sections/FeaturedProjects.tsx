"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "E-Commerce Platform",
    desc: "Full-featured online store with real-time inventory, Stripe payments, admin dashboard, and advanced filtering.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL"],
    color: "#00ff88",
    live: "#",
    github: "#",
  },
  {
    id: "02",
    title: "SaaS Dashboard",
    desc: "Analytics-rich SaaS application with multi-tenancy, role-based access, real-time charts, and REST API.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Redis"],
    color: "#0088ff",
    live: "#",
    github: "#",
  },
  {
    id: "03",
    title: "Social Media App",
    desc: "Instagram-like social platform with real-time messaging, stories, follow system, and media uploads.",
    tags: ["Next.js", "Supabase", "Tailwind", "WebSockets", "AWS S3"],
    color: "#ff0088",
    live: "#",
    github: "#",
  },
];

export default function FeaturedProjects() {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });

  return (
    <section 
      ref={ref} 
      className="relative py-20 md:py-28 bg-black overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff8822_1px,transparent_1px),linear-gradient(to_bottom,#00ff8822_1px,transparent_1px)] bg-[size:50px_50px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] text-accent uppercase mb-3"
            >
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white"
            >
              RECENT <span className="gradient-text">PROJECTS</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-accent transition-all duration-300 hover:gap-3"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4 md:space-y-px">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative bg-black/50 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Colored Border on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 0% 50%, ${project.color}15, transparent 70%)`
                }}
              />
              
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span
                      className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl opacity-20 group-hover:opacity-30 transition-all duration-300"
                      style={{ color: project.color }}
                    >
                      {project.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed mb-5 max-w-2xl">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-mono hover:border-white/20 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                      aria-label="View GitHub Repository"
                    >
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Border Animation */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ background: project.color }}
              />
              
              {/* Right Border Animation */}
              <div
                className="absolute top-0 right-0 w-[2px] h-0 group-hover:h-full transition-all duration-700 ease-out delay-100"
                style={{ background: project.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}