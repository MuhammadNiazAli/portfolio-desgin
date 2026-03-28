"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Globe, Server, Smartphone, ShoppingCart, Palette, Zap,
  ArrowRight, Check,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Globe,
    title: "Full Stack Web Development",
    desc: "End-to-end web applications from design to deployment. Robust, scalable solutions using the latest frameworks and best practices.",
    features: ["React / Next.js Frontend", "Node.js / Express Backend", "Database Design & Integration", "API Development & Integration", "Authentication & Security"],
    color: "#00ff88",
    price: "Starting $500",
  },
  {
    icon: Server,
    title: "Backend & API Development",
    desc: "Powerful backend systems and RESTful or GraphQL APIs that handle real-world scale with performance and reliability.",
    features: ["REST & GraphQL APIs", "Microservices Architecture", "Database Optimization", "Cloud Deployment (AWS/GCP)", "Real-time with WebSockets"],
    color: "#0088ff",
    price: "Starting $400",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Feature-rich online stores with smooth checkout, inventory management, payment gateways, and a powerful admin dashboard.",
    features: ["Stripe / PayPal Integration", "Product Management", "Order Tracking System", "Admin Dashboard", "SEO Optimization"],
    color: "#ff8800",
    price: "Starting $800",
  },
  {
    icon: Palette,
    title: "UI/UX Design & Frontend",
    desc: "Pixel-perfect, responsive interfaces that captivate users. I turn your ideas into visually stunning digital experiences.",
    features: ["Responsive Design", "Figma to Code", "Framer Motion Animations", "Dark/Light Mode", "Accessibility (WCAG)"],
    color: "#ff0088",
    price: "Starting $300",
  },
  {
    icon: Smartphone,
    title: "Progressive Web Apps",
    desc: "App-like experiences on the web — installable, offline-capable, and lightning fast with modern PWA standards.",
    features: ["Service Workers", "Offline Functionality", "Push Notifications", "App-like Experience", "Performance Optimization"],
    color: "#8800ff",
    price: "Starting $600",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    desc: "Audit and supercharge existing web applications for speed, Core Web Vitals, SEO rankings, and better conversion rates.",
    features: ["Lighthouse Audits", "Code Splitting & Lazy Loading", "CDN & Caching Strategy", "Image Optimization", "Core Web Vitals"],
    color: "#ffdd00",
    price: "Starting $200",
  },
];

const processSteps = [
  { step: "01", title: "Discovery",    desc: "We discuss your goals, requirements, and vision for the project." },
  { step: "02", title: "Planning",     desc: "I create a detailed roadmap, tech stack, and timeline for delivery." },
  { step: "03", title: "Development",  desc: "I build your project with regular updates and milestone check-ins." },
  { step: "04", title: "Delivery",     desc: "Final testing, deployment, handover, and post-launch support." },
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

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────

function ServiceCard({
  service, index,
}: { service: typeof services[number]; index: number }) {
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
                 overflow-hidden hover:bg-[#0d0d15] transition-colors duration-300"
    >
      {/* colored top border */}
      <span
        className="absolute inset-x-0 top-0 h-[1px] z-10"
        style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
      />

      {/* hover corner glow */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${service.color}, transparent 55%)` }}
      />

      {/* top-right glow orb */}
      <motion.span
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none blur-[50px]"
        style={{ background: service.color }}
        animate={{ opacity: hovered ? 0.15 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-9">

        {/* icon box */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-12 flex items-center justify-center mb-8 flex-shrink-0"
          style={{
            background: service.color + "12",
            border: `1px solid ${service.color}28`,
          }}
        >
          <service.icon className="w-5 h-5" style={{ color: service.color }} />
        </motion.div>

        {/* title */}
        <h3 className="font-display text-xl tracking-wide text-white mb-3 transition-colors duration-300"
          style={{ color: hovered ? service.color : undefined }}
        >
          {service.title}
        </h3>

        {/* desc */}
        <p className="font-body text-white/40 text-sm leading-relaxed mb-7">
          {service.desc}
        </p>

        {/* features */}
        <ul className="space-y-2.5 flex-1 mb-8">
          {service.features.map((f, fi) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.09 + fi * 0.07 + 0.2 }}
              className="flex items-center gap-3 font-mono text-[11px] tracking-wide text-white/40"
            >
              <Check className="w-3 h-3 flex-shrink-0" style={{ color: service.color }} />
              {f}
            </motion.li>
          ))}
        </ul>

        {/* price + cta */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
          <span className="font-mono text-sm font-bold" style={{ color: service.color }}>
            {service.price}
          </span>
          <Link
            href="/contact"
            className="group/btn flex items-center gap-1.5 font-mono text-[11px]
                       tracking-[2px] uppercase text-white/25
                       hover:text-white transition-colors duration-200"
          >
            Get Quote
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROCESS STEP ─────────────────────────────────────────────────────────────

function ProcessStep({
  step, isLast,
}: { step: typeof processSteps[number]; isLast: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* connector line */}
      {!isLast && (
        <span className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[-50%]
                         h-px bg-gradient-to-r from-white/10 to-transparent" />
      )}

      {/* step number box */}
      <div
        className="w-14 h-14 border border-white/[0.08] bg-[#0a0a0f] flex items-center
                   justify-center mx-auto mb-6 relative"
      >
        <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
        <span className="font-display text-2xl text-[#00ff88]">{step.step}</span>
      </div>

      <div className="text-center px-4">
        <h3 className="font-mono text-xs tracking-[3px] uppercase text-white mb-3">
          {step.title}
        </h3>
        <p className="font-body text-white/40 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

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
            What I Offer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white mt-3 mb-6"
          >
            MY<br />
            <span className="gradient-text">SERVICES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body text-white/50 text-lg max-w-2xl leading-relaxed"
          >
            I provide comprehensive web development services — from stunning frontends
            to powerful backends. Every service is delivered with quality, speed, and
            attention to detail.
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
            { num: "6",   suffix: "",  label: "Services Offered"  },
            { num: "3+",  suffix: "",  label: "Years Experience"  },
            { num: "20+", suffix: "",  label: "Projects Delivered" },
            { num: "24h", suffix: "",  label: "Response Time"     },
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

      {/* ── SERVICES GRID ── */}
      <section ref={ref} className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-5 mb-14">
            <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
              All Services
            </span>
            <span className="flex-1 h-px bg-white/[0.07] max-w-[200px]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/[0.04]">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section-padding bg-[#0a0a0f] border-t border-white/[0.05] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
                How I Work
              </span>
              <h2 className="font-display text-4xl lg:text-6xl tracking-wider text-white mt-2">
                MY<br />
                <span className="gradient-text">PROCESS</span>
              </h2>
            </div>
            <p className="font-body text-white/35 text-sm max-w-xs leading-relaxed sm:text-right">
              A clear and transparent workflow so you always know what to expect at every stage.
            </p>
          </div>

          {/* steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/[0.04]">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-[#0a0a0f] hover:bg-[#0d0d15]
                           transition-colors duration-300 p-10 overflow-hidden"
              >
                {/* top accent */}
                <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />

                {/* large ghost step number */}
                <span
                  className="absolute -bottom-4 -right-2 font-display text-[80px] font-bold
                             text-white/[0.03] select-none pointer-events-none leading-none"
                >
                  {step.step}
                </span>

                <div className="relative z-10">
                  <span className="font-display text-3xl text-[#00ff88] block mb-5">
                    {step.step}
                  </span>
                  <h3 className="font-mono text-xs tracking-[3px] uppercase text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-white/40 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-black border-t border-white/[0.05] relative z-10 overflow-hidden">
        {/* ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[600px] h-[300px] rounded-full bg-[#00ff88]/6 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[5px] text-accent uppercase"
          >
            Let's Collaborate
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-display text-5xl lg:text-7xl tracking-wider text-white mt-3 mb-10"
          >
            READY TO BUILD<br />
            <span className="gradient-text">SOMETHING GREAT?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-4
                         font-mono text-sm font-bold text-black overflow-hidden
                         hover:shadow-[0_0_40px_rgba(0,255,136,0.35)]
                         transition-shadow duration-300"
              style={{ background: "linear-gradient(135deg, #00ff88, #00cc6a)" }}
            >
              {/* shimmer */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Let&apos;s Talk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-10 py-4 font-mono text-sm
                         text-white/50 border border-white/[0.08] hover:border-white/20
                         hover:text-white transition-all duration-300"
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