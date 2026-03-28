"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center grid-bg">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-[150px] sm:text-[200px] leading-none gradient-text opacity-20">
            404
          </h1>
          <div className="-mt-8 mb-8">
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white mb-4">
              PAGE NOT FOUND
            </h2>
            <p className="font-body text-white/40 text-sm">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-black font-mono font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
