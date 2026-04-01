"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Code2, Rocket, Heart, Coffee, ArrowRight, MapPin, GraduationCap, Briefcase, Globe } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "I write readable, maintainable, and scalable code following industry best practices.",
    color: "#00ff88",
  },
  {
    icon: Rocket,
    title: "Performance",
    desc: "Every application I build is optimized for speed, SEO, and exceptional user experience.",
    color: "#0088ff",
  },
  {
    icon: Heart,
    title: "Passion",
    desc: "I genuinely love what I do. That passion shows in every pixel and every line of code.",
    color: "#ff0088",
  },
  {
    icon: Coffee,
    title: "Dedication",
    desc: "I'm committed to delivering on time, communicating clearly, and going the extra mile.",
    color: "#ff8800",
  },
];

const timeline = [
  {
    year: "2023",
    title: "Started Web Development",
    desc: "Began learning HTML, CSS, JavaScript and fell in love with building for the web.",
    color: "#00ff88",
  },
  {
    year: "2025",
    title: "Mastered React & Node.js",
    desc: "Built dozens of full-stack projects, learned databases, APIs, and deployment workflows.",
    color: "#0088ff",
  },
  {
    year: "2026",
    title: "First Freelance Projects",
    desc: "Delivered real-world projects for clients across e-commerce, SaaS, and social platforms.",
    color: "#ff8800",
  },
];

const stats = [
  { num: 3,  suffix: "+", label: "Years Experience"   },
  { num: 20, suffix: "+", label: "Projects Delivered" },
  { num: 11, suffix: "+", label: "Technologies"       },
  { num: 24, suffix: "h", label: "Response Time"      },
];

const badges = [
  { emoji: <MapPin className="w-3.5 h-3.5" />, text: "Pakistan" },
  { emoji: <GraduationCap className="w-3.5 h-3.5" />, text: "CS Graduate" },
  { emoji: <Briefcase className="w-3.5 h-3.5" />, text: "Freelancer" },
  { emoji: <Globe className="w-3.5 h-3.5" />, text: "Remote Ready" },
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

    function resize() {
      canvas!.width = window.innerWidth;
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
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

// ─── COUNT-UP ────────────────────────────────────────────────────────────────

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 60, damping: 20 });
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

// ─── VALUE CARD ───────────────────────────────────────────────────────────────

function ValueCard({ value, index }: { value: typeof values[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-[#0a0a0f] border border-white/[0.07]
                 overflow-hidden hover:bg-[#0d0d15] transition-colors duration-300 p-6 sm:p-9"
    >
      <span
        className="absolute inset-x-0 top-0 h-[1px] z-10"
        style={{ background: `linear-gradient(90deg, ${value.color}, transparent)` }}
      />
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${value.color}, transparent 55%)` }}
      />
      <motion.span
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none blur-[50px]"
        style={{ background: value.color }}
        animate={{ opacity: hovered ? 0.15 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center mb-6 sm:mb-8"
          style={{ background: value.color + "12", border: `1px solid ${value.color}28` }}
        >
          <value.icon className="w-5 h-5" style={{ color: value.color }} />
        </motion.div>

        <h3
          className="font-display text-lg sm:text-xl tracking-wide text-white mb-2 sm:mb-3 transition-colors duration-300"
          style={{ color: hovered ? value.color : undefined }}
        >
          {value.title}
        </h3>
        <p className="font-body text-white/40 text-sm leading-relaxed">{value.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── TIMELINE ITEM ────────────────────────────────────────────────────────────

function TimelineItem({
  item, index, isLast,
}: { item: typeof timeline[number]; index: number; isLast: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 sm:gap-8 items-start group"
    >
      {/* year label */}
      <div className="flex-shrink-0 w-[60px] sm:w-[88px] text-right pt-1">
        <span className="font-mono text-xs sm:text-sm font-bold" style={{ color: item.color }}>
          {item.year}
        </span>
      </div>

      {/* dot + line */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.1 }}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0 relative z-10 mt-0.5"
          style={{ borderColor: item.color, background: "#000", boxShadow: `0 0 10px ${item.color}66` }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[40px] mt-2"
            style={{ background: `linear-gradient(180deg, ${item.color}40, transparent)` }}
          />
        )}
      </div>

      {/* content */}
      <div className="flex-1 pb-8 sm:pb-10 relative bg-[#0a0a0f] border border-white/[0.07] p-4 sm:p-6 overflow-hidden
                      group-hover:bg-[#0d0d15] transition-colors duration-300">
        <span
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
        />
        <h3 className="font-mono text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase text-white mb-2">
          {item.title}
        </h3>
        <p className="font-body text-white/40 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black pt-24 overflow-x-hidden">
      <ParticleCanvas />

      {/* ── HERO ── */}
      <section className="relative py-16 sm:py-20 md:py-28 grid-bg overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full
                        bg-[#00ff88]/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full
                        bg-[#0088ff]/10 blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs tracking-[5px] text-accent uppercase"
          >
            About Me
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-white mt-3 mb-8 sm:mb-10"
          >
            WHO<br />
            <span className="gradient-text">AM I?</span>
          </motion.h1>

          {/* ── TWO-COLUMN CONTENT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] bg-white/[0.04]">

            {/* LEFT — text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative bg-[#0a0a0f] p-6 sm:p-10 overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />

              <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
                Hey! I&apos;m{" "}
                <span className="text-[#00ff88] font-semibold">Muhammad Niaz Ali</span>,
                a passionate Full Stack Web Developer &amp; Software Engineer based in Pakistan.
                I specialize in building modern, scalable, and high-performance web applications
                that deliver real value to users and businesses.
              </p>
              <p className="font-body text-white/45 leading-relaxed mb-5 sm:mb-6">
                With 3+ years of hands-on experience, I&apos;ve worked across the full spectrum —
                from crafting pixel-perfect, interactive frontends with React and Next.js
                to architecting robust backend systems with Node.js, databases, and cloud infrastructure.
              </p>
              <p className="font-body text-white/45 leading-relaxed mb-8 sm:mb-10">
                I believe great software is not just functional — it&apos;s beautiful, fast, and delightful
                to use. Every project I take on gets my full dedication and creative energy.
              </p>

              {/* badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {badges.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-white/[0.08]
                               font-mono text-[10px] sm:text-[11px] tracking-[2px] text-white/40 uppercase
                               hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all duration-200"
                  >
                    <span className="text-[#00ff88]">{b.emoji}</span>
                    {b.text}
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/[0.06] flex items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5
                             font-mono text-xs sm:text-sm font-bold text-black
                             hover:shadow-[0_0_40px_rgba(0,255,136,0.35)]
                             transition-shadow duration-300"
                  style={{ background: "linear-gradient(135deg, #00ff88, #00cc6a)" }}
                >
                  Let&apos;s Work Together
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative bg-[#0a0a0f] p-6 sm:p-10 overflow-hidden flex items-center justify-center min-h-[320px] sm:min-h-[400px]"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#0088ff] to-transparent" />

              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: imageHovered ? 0.08 : 0.03 }}
                transition={{ duration: 0.4 }}
                style={{ background: "radial-gradient(circle at center, #00ff88, transparent 70%)" }}
              />

              {/* image frame */}
              <div className="relative w-[220px] sm:w-[260px] md:w-[300px] aspect-square">
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((cls, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-5 h-5 sm:w-6 sm:h-6 border-[#00ff88] z-20 ${cls}`}
                    animate={{ opacity: imageHovered ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}

                <motion.div
                  className="absolute inset-0 border border-white/[0.08]"
                  animate={{ borderColor: imageHovered ? "#00ff8840" : "rgba(255,255,255,0.08)" }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute inset-3 overflow-hidden"
                  animate={{ scale: imageHovered ? 1.02 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/assets/me.jpg"
                    alt="Muhammad Niaz Ali"
                    fill
                    sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-5 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="px-3 sm:px-4 py-1.5 bg-[#0a0a0f] border border-white/[0.08]
                                  font-mono text-[9px] sm:text-[10px] tracking-[3px] text-[#00ff88] uppercase">
                    Muhammad Niaz Ali
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10 sm:mt-16 flex items-center gap-4 font-mono text-[10px] tracking-[4px]
                       text-white/25 uppercase"
          >
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-white/25" />
            Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* ── STATS — 2×2 grid on mobile, 4-col on desktop ── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.07]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className={[
                "flex flex-col items-start px-5 sm:px-8 py-8 sm:py-10",
                // mobile: right border on even cols, bottom border on top row
                i % 2 === 0 ? "border-r border-white/[0.07]" : "",
                i < 2      ? "border-b border-white/[0.07]" : "",
                // desktop overrides
                i < 2      ? "lg:border-b-0" : "",
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

      {/* ── VALUES ── */}
      <section className="section-padding relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-5 mb-10 sm:mb-14">
            <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
              My Approach
            </span>
            <span className="flex-1 h-px bg-white/[0.07] max-w-[200px]" />
          </div>

          <div className="mb-8 sm:mb-10">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wider text-white">
              WHAT<br />
              <span className="gradient-text">DRIVES ME</span>
            </h2>
          </div>

          {/* 1-col mobile, 2-col sm, 4-col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/[0.04]">
            {values.map((v, i) => (
              <ValueCard key={v.title} value={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section-padding bg-[#0a0a0f] border-t border-white/[0.05] relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
                My Journey
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wider text-white mt-2">
                MY<br />
                <span className="gradient-text">TIMELINE</span>
              </h2>
            </div>
            <p className="font-body text-white/35 text-sm max-w-xs leading-relaxed sm:text-right">
              A journey of continuous learning, real-world building, and relentless growth.
            </p>
          </div>

          <div className="space-y-0 max-w-3xl w-full">
            {timeline.map((item, i) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={i}
                isLast={i === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-black border-t border-white/[0.05] relative z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full bg-[#00ff88]/6 blur-[100px]" />
        </div>

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[5px] text-accent uppercase"
          >
            Let&apos;s Collaborate
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-white mt-3 mb-8 sm:mb-10"
          >
            HAVE A PROJECT<br />
            <span className="gradient-text">IN MIND?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4
                         font-mono text-xs sm:text-sm font-bold text-black overflow-hidden
                         hover:shadow-[0_0_40px_rgba(0,255,136,0.35)]
                         transition-shadow duration-300 w-full sm:w-auto justify-center"
              style={{ background: "linear-gradient(135deg, #00ff88, #00cc6a)" }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4
                         font-mono text-xs sm:text-sm text-white/50 border border-white/[0.08]
                         hover:border-white/20 hover:text-white transition-all duration-300
                         w-full sm:w-auto"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}