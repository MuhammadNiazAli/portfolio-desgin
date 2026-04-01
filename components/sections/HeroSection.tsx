"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-accent/20 animate-spin-slow" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black grid-bg">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent2/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas — right side */}
      <div className="absolute inset-0 md:left-auto md:right-0 md:w-[55%] h-full opacity-90">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent tracking-[2px] uppercase">
              Available for Projects
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-wider mb-2">
              <span className="block text-white">MUHAMMAD</span>
              <span className="block gradient-text text-glow">NIAZ ALI</span>
            </h1>
          </motion.div>

          {/* Animated Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mt-4 mb-6"
          >
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-sm text-white/50">I am a</span>
            <span className="font-mono text-sm text-accent">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "Software Engineer",
                  2000,
                  "React / Next.js Expert",
                  2000,
                  "Node.js Developer",
                  2000,
                  "UI/UX Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-body text-white/50 text-base leading-relaxed max-w-lg mb-10"
          >
            I craft high-performance, visually stunning web applications using
            cutting-edge technologies. From pixel-perfect UIs to robust backend
            systems — I build it all.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/projects"
              className="group relative px-8 py-3.5 bg-accent text-black font-mono font-semibold text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2 px-8 py-3.5 border border-white/10 text-white font-mono text-sm rounded-full hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
            >
              <Download className="w-4 h-4 group-hover:text-accent transition-colors" />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-center gap-6"
          >
            <span className="font-mono text-xs text-white/20 tracking-[2px] uppercase">
              Find me on
            </span>
            {[
              { icon: Github, href: "https://github.com/niazali", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/niazali", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-accent transition-colors duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] tracking-[4px] text-white/20 uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
