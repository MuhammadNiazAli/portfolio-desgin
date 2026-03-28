"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import {
  Mail, MapPin, Clock, Github, Linkedin, Twitter, Send, ArrowRight,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "muhammadniazali@email.com",
    href: "mailto:muhammadniazali@email.com",
    color: "#00ff88",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pakistan (Remote Worldwide)",
    href: "#",
    color: "#0088ff",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: "#",
    color: "#ff8800",
  },
];

const socials = [
  { icon: Github,   href: "https://github.com/niazali",   label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/niazali", label: "LinkedIn" },
  { icon: Twitter,  href: "https://twitter.com/niazali",  label: "Twitter" },
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
            ctx.globalAlpha = (1 - d / 120) * 0.09;
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

// ─── INFO CARD ────────────────────────────────────────────────────────────────

function InfoCard({
  info, delay,
}: { info: typeof contactInfo[number]; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.a
      ref={ref}
      href={info.href}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-start gap-5 p-6 bg-[#0a0a0f]
                 border border-white/[0.07] overflow-hidden
                 hover:bg-[#0d0d15] transition-colors duration-300"
    >
      {/* colored top border */}
      <span
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, ${info.color}, transparent)` }}
      />
      {/* hover glow */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${info.color}, transparent 60%)` }}
      />

      <div
        className="w-11 h-11 flex items-center justify-center flex-shrink-0"
        style={{ background: info.color + "12", border: `1px solid ${info.color}28` }}
      >
        <info.icon className="w-5 h-5" style={{ color: info.color }} />
      </div>

      <div>
        <p className="font-mono text-[10px] tracking-[3px] text-white/30 uppercase mb-1">
          {info.label}
        </p>
        <p className="font-body text-white/70 text-sm group-hover:text-white transition-colors duration-200">
          {info.value}
        </p>
      </div>
    </motion.a>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const [formData, setFormData] = useState({
    name: "", email: "", service: "", budget: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    toast.success("Message sent! I'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", service: "", budget: "", message: "" });
  };

  const inputBase =
    `w-full px-5 py-3.5 bg-black/40 border border-white/[0.08] font-body text-white text-sm
     placeholder:text-white/20 focus:outline-none focus:border-[#00ff88]/50
     focus:ring-1 focus:ring-[#00ff88]/30 transition-all duration-300 rounded-none`;

  return (
    <div className="min-h-screen bg-black pt-24 overflow-x-hidden">
      <ParticleCanvas />

      {/* ── HERO ── */}
      <section className="relative py-28 grid-bg overflow-hidden">
        {/* ambient glows */}
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
            Let's Connect
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white mt-3 mb-6"
          >
            GET IN<br />
            <span className="gradient-text">TOUCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body text-white/50 text-lg max-w-xl"
          >
            Have a project in mind? Want to collaborate? Or just want to say hello?
            I&apos;d love to hear from you.
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

      {/* ── CONTACT CONTENT ── */}
      <section ref={ref} className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-[2px] bg-white/[0.04]">

            {/* ── LEFT COLUMN ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0a0a0f] p-10 space-y-10 relative overflow-hidden"
            >
              {/* section eyebrow */}
              <div className="flex items-center gap-5">
                <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
                  Contact Information
                </span>
                <span className="flex-1 h-px bg-white/[0.07] max-w-[120px]" />
              </div>

              {/* info cards */}
              <div className="space-y-[2px]">
                {contactInfo.map((info, i) => (
                  <InfoCard key={info.label} info={info} delay={i * 0.1} />
                ))}
              </div>

              {/* availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative border border-[#00ff88]/20 bg-[#00ff88]/[0.04] p-6 overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse
                                   shadow-[0_0_8px_#00ff88]" />
                  <span className="font-mono text-xs tracking-[3px] text-[#00ff88] uppercase">
                    Currently Available
                  </span>
                </div>
                <p className="font-body text-white/45 text-sm leading-relaxed">
                  I&apos;m actively taking on new freelance projects and collaborations.
                  Let&apos;s build something amazing together!
                </p>
              </motion.div>

              {/* socials */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <p className="font-mono text-[10px] tracking-[4px] text-white/25 uppercase mb-5">
                  Find Me Online
                </p>
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, href, label }, i) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="group relative w-12 h-12 border border-white/[0.08]
                                 flex items-center justify-center text-white/30
                                 hover:text-[#00ff88] hover:border-[#00ff88]/40
                                 overflow-hidden transition-colors duration-300"
                    >
                      <span className="absolute inset-0 bg-[#00ff88]/[0.06] opacity-0
                                       group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="w-4 h-4 relative z-10" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN — FORM ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[#0a0a0f] p-10 lg:p-12 overflow-hidden"
            >
              {/* colored top border */}
              <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#0088ff] via-[#00ff88] to-transparent" />

              {/* ambient form glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full
                              bg-[#00ff88]/5 blur-[80px] pointer-events-none" />

              {/* form header */}
              <div className="flex items-center gap-5 mb-10">
                <span className="font-mono text-[10px] tracking-[5px] text-accent uppercase">
                  Send a Message
                </span>
                <span className="flex-1 h-px bg-white/[0.07] max-w-[120px]" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* name + email */}
                <div className="grid sm:grid-cols-2 gap-[2px] bg-white/[0.04]">
                  <div className="bg-[#0a0a0f] p-1">
                    <label className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase block mb-2 ml-1">
                      Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={inputBase}
                      required
                    />
                  </div>
                  <div className="bg-[#0a0a0f] p-1">
                    <label className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase block mb-2 ml-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputBase}
                      required
                    />
                  </div>
                </div>

                {/* service + budget */}
                <div className="grid sm:grid-cols-2 gap-[2px] bg-white/[0.04]">
                  <div className="bg-[#0a0a0f] p-1">
                    <label className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase block mb-2 ml-1">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputBase + " cursor-pointer"}
                    >
                      <option value="" className="bg-black">Select service</option>
                      <option value="fullstack" className="bg-black">Full Stack Development</option>
                      <option value="frontend"  className="bg-black">Frontend / UI</option>
                      <option value="backend"   className="bg-black">Backend / API</option>
                      <option value="ecommerce" className="bg-black">E-Commerce</option>
                      <option value="other"     className="bg-black">Other</option>
                    </select>
                  </div>
                  <div className="bg-[#0a0a0f] p-1">
                    <label className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase block mb-2 ml-1">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputBase + " cursor-pointer"}
                    >
                      <option value="" className="bg-black">Select budget</option>
                      <option value="100-150"  className="bg-black">$100 – $150</option>
                      <option value="200-300"  className="bg-black">$200 – $300</option>
                      <option value="300-500"  className="bg-black">$300 – $500</option>
                      <option value="1000+"    className="bg-black">$1000+</option>
                    </select>
                  </div>
                </div>

                {/* message */}
                <div>
                  <label className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, goals, and timeline..."
                    rows={5}
                    className={inputBase + " resize-none"}
                    required
                  />
                </div>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.01 } : {}}
                  whileTap={!loading ? { scale: 0.99 } : {}}
                  className="relative w-full flex items-center justify-center gap-3 py-4
                             font-mono text-sm font-bold text-black overflow-hidden
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-shadow duration-300
                             hover:shadow-[0_0_40px_rgba(0,255,136,0.3)]"
                  style={{ background: "linear-gradient(135deg, #00ff88, #00cc6a)" }}
                >
                  {/* shimmer */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                <p className="text-center font-mono text-[10px] tracking-[2px] text-white/20">
                  I typically respond within 24 hours · All inquiries are confidential
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}