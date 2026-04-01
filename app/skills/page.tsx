"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    title: "Frontend",
    color: "#00ff88",
    skills: [
      { name: "React.js",    level: 95 },
      { name: "Next.js",     level: 93 },
      { name: "TypeScript",  level: 88 },
      { name: "JavaScript",  level: 92 },
    ],
  },
  {
    title: "Backend",
    color: "#0088ff",
    skills: [
      { name: "Node.js",    level: 90 },
      { name: "Express.js", level: 88 },
    ],
  },
  {
    title: "Database & Cloud",
    color: "#ff8800",
    skills: [
      { name: "MongoDB",  level: 88 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    title: "Tools & Others",
    color: "#ff0088",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "Vercel",       level: 90 },
    ],
  },
];

const techIcons = [
  { name: "React",       color: "#61DAFB" },
  { name: "Next.js",     color: "#ffffff" },
  { name: "TypeScript",  color: "#3178C6" },
  { name: "JavaScript",  color: "#F7DF1E" },
  { name: "Node.js",     color: "#339933" },
  { name: "Express.js",  color: "#E9D97F" },
  { name: "MongoDB",     color: "#47A248" },
  { name: "Firebase",    color: "#FFCA28" },
  { name: "Git",         color: "#F05032" },
  { name: "GitHub",      color: "#ffffff" },
  { name: "Vercel",      color: "#ffffff" },
];

const stats = [
  { num: 11, suffix: "+", label: "Technologies"    },
  { num: 4,  suffix: "",  label: "Core Domains"    },
  { num: 90, suffix: "%", label: "Avg Proficiency" },
  { num: 3,  suffix: "+", label: "Years Building"  },
];

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const COLORS = ["#00ff88", "#0088ff", "#ff8800", "#ff0088"];
    type Particle = { x: number; y: number; r: number; vx: number; vy: number; color: string; alpha: number };

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.55 + 0.2,
    }));

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
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
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - d / 120) * 0.1;
            ctx.lineWidth   = 0.5;
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

// ─── COUNT-UP ────────────────────────────────────────────────────────────────

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const raw        = useMotionValue(0);
  const smooth     = useSpring(raw, { stiffness: 60, damping: 20 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    raw.set(target);
  }, [inView, target, raw]);

  useEffect(() => {
    return smooth.on("change", (v) => {
      if (displayRef.current) displayRef.current.textContent = Math.floor(v).toString();
    });
  }, [smooth]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-bold gradient-text">
      <span ref={displayRef}>0</span>{suffix}
    </span>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────

function SkillBar({ name, level, color, index }: {
  name: string; level: number; color: string; index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs sm:text-sm text-white/70 tracking-wide">{name}</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[2px] bg-white/[0.06] rounded-full overflow-visible relative">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.4, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}55, ${color})` }}
        >
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
            style={{ background: color, boxShadow: `0 0 10px 3px ${color}99` }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SKILL CARD ───────────────────────────────────────────────────────────────

function SkillCard({ category, delay }: {
  category: typeof skillCategories[number]; delay: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#0a0a0f] border border-white/[0.07] overflow-hidden
                 group hover:bg-[#0d0d15] transition-colors duration-300 p-6 sm:p-10"
    >
      <span
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
      />
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${category.color}, transparent 60%)` }}
      />

      <div className="flex items-center gap-3 mb-7 sm:mb-9">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
          style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }}
        />
        <h2 className="font-mono text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-white">
          {category.title}
        </h2>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {category.skills.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            index={si}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 overflow-x-hidden">
      <ParticleCanvas />

      {/* ── HERO ── */}
      <section className="relative py-16 sm:py-20 md:py-28 grid-bg overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px]
                        rounded-full bg-[#00ff88]/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px]
                        rounded-full bg-[#0088ff]/10 blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs tracking-[5px] text-accent uppercase"
          >
            My Expertise
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-white mt-3 mb-5 sm:mb-6"
          >
            SKILLS &amp;<br />
            <span className="gradient-text">EXPERTISE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body text-white/50 text-sm sm:text-lg max-w-2xl leading-relaxed"
          >
            A comprehensive overview of the technologies, tools, and frameworks
            I&apos;ve mastered through real-world projects and continuous learning.
          </motion.p>

          {/* scroll hint — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="hidden sm:flex mt-14 sm:mt-16 items-center gap-4 font-mono text-[10px]
                       tracking-[4px] text-white/25 uppercase"
          >
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-white/25" />
            Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* ── STATS — 2×2 mobile, 4-col desktop ── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.07]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={[
                "flex flex-col px-5 sm:px-8 py-7 sm:py-10",
                i % 2 === 0          ? "border-r border-white/[0.07]" : "",
                i < 2                ? "border-b border-white/[0.07]" : "",
                i < 2                ? "lg:border-b-0"                : "",
                i < stats.length - 1 ? "lg:border-r border-white/[0.07]" : "lg:border-r-0",
              ].filter(Boolean).join(" ")}
            >
              <CountUp target={s.num} suffix={s.suffix} />
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[3px] text-white/35 uppercase mt-2">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SKILL BARS ── */}
      <section className="section-padding relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-5 mb-10 sm:mb-14">
            <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
              Proficiency Levels
            </span>
            <span className="flex-1 h-px bg-white/[0.07] max-w-[200px]" />
          </div>

          {/* 1-col mobile, 2-col sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-white/[0.04]">
            {skillCategories.map((cat, ci) => (
              <SkillCard key={cat.title} category={cat} delay={ci * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH PILLS ── */}
      <section className="section-padding bg-surface border-t border-white/5 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[4px] text-accent uppercase">
              Technologies
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white mt-2">
              TECH I WORK WITH
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {techIcons.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.055, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="relative px-4 sm:px-5 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs
                           tracking-widest border cursor-default overflow-hidden
                           bg-black/50 backdrop-blur-sm hover:bg-black/80 transition-colors duration-200"
                style={{ color: tech.color, borderColor: tech.color + "30" }}
              >
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: tech.color + "0d" }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}