"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/MuhammadNiazAli", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-niaz-ali-109167397/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/ali_niaz92115", label: "Twitter" },
  { icon: Mail, href: "mailto:mrniazali132@gmail.com", label: "Email" },
];

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/3 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff8822_1px,transparent_1px),linear-gradient(to_bottom,#00ff8822_1px,transparent_1px)] bg-[size:40px_40px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-10 md:mb-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block group">
              <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-white via-accent to-accent2 bg-clip-text text-transparent group-hover:from-accent group-hover:via-accent2 group-hover:to-accent transition-all duration-300">
                NIAZ ALI
              </span>
            </Link>
            <p className="text-white/40 text-sm font-body leading-relaxed max-w-xs">
              Full Stack Developer & Software Engineer building modern, scalable,
              and visually stunning web experiences with cutting-edge technologies.
            </p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-mono text-accent font-medium">
                Available for freelance
              </span>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-xs sm:text-sm tracking-[2px] sm:tracking-[3px] text-white/40 uppercase mb-5 md:mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links.map((link, i) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white transition-all duration-300 text-sm font-body"
                  >
                    <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300 ease-out" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-xs sm:text-sm tracking-[2px] sm:tracking-[3px] text-white/40 uppercase mb-5 md:mb-6">
              Get in Touch
            </h4>
            <a
              href="mailto:mrniazali132@gmail.com"
              className="group flex items-center gap-2 mb-6 hover:gap-3 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-white/70 group-hover:text-accent transition-colors text-sm font-mono break-all">
                mrniazali132@gmail.com
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
            </a>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  viewport={{ once: true }}
                  className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 rounded-full flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-[10px] sm:text-xs font-mono flex items-center gap-1">
            © {currentYear} Muhammad Niaz Ali.
            <span className="hidden sm:inline">All rights reserved.</span>
          </p>
          <div className="flex items-center gap-3 text-white/30 text-[10px] sm:text-xs font-mono">
            <span>Built with</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-accent animate-pulse" />
            </span>
            <span>Next.js · TypeScript · Tailwind · Three.js</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}