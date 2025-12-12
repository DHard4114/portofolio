/**
 * @file components/Footer.tsx
 * @description Ultra-enhanced footer with glitch effects, marquee, and ambient motion.
 * @module Components/Footer
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"

// --- CONSTANTS ---
const TECH_STACK = [
  "NEXT.JS 15", "REACT", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION", 
  "VERCEL", "POSTGRESQL", "PRISMA", "NODE.JS", "THREE.JS", "WEBGL"
]

// --- ANIMATION VARIANTS (Typed Correctly) ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden font-sans border-t border-white/5">
      
      {/* 1. AMBIENT BACKGROUND FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern - FIXED: Canonical Class */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        
        {/* Moving Glow Orbs */}
        <motion.div 
          animate={{ x: [0, 100, 0], opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-900/20 blur-[100px] rounded-full"
        />
        
        {/* Animated Top Border (Scanline) */}
        <div className="absolute top-0 left-0 w-full h-px bg-neutral-900 overflow-hidden">
            <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-linear-to-r from-transparent via-emerald-500/50 to-transparent"
            />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* 2. MAIN GRID CONTENT */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20"
        >
          
          {/* BRAND COL */}
          <motion.div variants={fadeInUp} className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-4xl font-bold text-white tracking-tighter font-serif">
                Daffa <span className="text-neutral-600 italic">Hardhan.</span>
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-2 tracking-widest">
                ENGINEERING & CREATIVE ARCHITECTURE
              </p>
            </div>
            
            <StatusBadge />
          </motion.div>

          {/* NAV COL [01] */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-[0.2em] mb-6 font-mono border-b border-emerald-900/30 pb-2 w-fit">
              [01] SYSTEM NAV
            </h4>
            <ul className="space-y-2">
              <ScrambleLink href="/" label="HOME MODULE" />
              <ScrambleLink href="/#projects" label="PROJECT ARCHIVE" />
              <ScrambleLink href="/dashboard" label="ANALYTICS CONSOLE" highlight />
              <ScrambleLink href="/#contact" label="TRANSMISSION" />
            </ul>
          </motion.div>

          {/* NAV COL [02] */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.2em] mb-6 font-mono border-b border-blue-900/30 pb-2 w-fit">
              [02] EXTERNAL LINKS
            </h4>
            <ul className="space-y-2">
              <ScrambleLink href="mailto:dapahardan@gmail.com" label="MAIL SYSTEM" external />
              <ScrambleLink href="https://linkedin.com/in/daffa-hardhan" label="LINKEDIN PROFILER" external />
              <ScrambleLink href="https://github.com/DHard4114" label="GITHUB REPO" external />
              <ScrambleLink href="https://instagram.com/daffahardhan" label="INSTAGRAM FEED" external />
            </ul>
          </motion.div>
        </motion.div>

        {/* 3. BOTTOM BAR WITH MARQUEE */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-neutral-600 uppercase tracking-wider relative overflow-hidden"
        >
          
          <div className="flex items-center gap-4 z-10 bg-black pr-4">
            <span>© {currentYear} DH. INC.</span>
            <span className="hidden md:inline text-neutral-800">|</span>
            <span>WEST JAVA, ID</span>
          </div>

          {/* Infinite Marquee for Tech Stack */}
          <div className="absolute left-0 md:left-auto md:right-0 w-full md:w-1/2 overflow-hidden mask-fade-sides">
             <motion.div 
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="flex whitespace-nowrap gap-8"
             >
                {/* Duplicated content for seamless loop */}
                {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                    <span key={i} className="flex items-center gap-2 text-neutral-700">
                        <span className="w-1 h-1 bg-neutral-800 rounded-full"></span>
                        {tech}
                    </span>
                ))}
             </motion.div>
          </div>

        </motion.div>
        
      </div>
    </footer>
  )
}

// --- SUB COMPONENTS ---

// 1. Scramble Text Link Component
function ScrambleLink({ href, label, external = false, highlight = false }: { href: string, label: string, external?: boolean, highlight?: boolean }) {
  const [displayText, setDisplayText] = useState(label)
  
  // Scramble Effect Logic
  useEffect(() => {
    // Reset text when label changes (cleanup)
    setDisplayText(label);
  }, [label]);

  const scramble = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let iteration = 0
    
    const interval = setInterval(() => {
      // FIX: Removed unused 'prev' argument
      setDisplayText(() => 
        label.split("").map((letter, index) => {
          if (index < iteration) return label[index]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join("")
      )
      
      if (iteration >= label.length) clearInterval(interval)
      iteration += 1 / 2 // Speed of decryption
    }, 30)
  }

  return (
    <li>
      <Link 
        href={href} 
        target={external ? "_blank" : "_self"}
        onMouseEnter={scramble}
        className={`group flex items-center gap-3 text-xs font-medium transition-all duration-300 ${highlight ? 'text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
      >
        <span className={`w-1.5 h-1.5 rounded-sm transition-all duration-300 ${highlight ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-neutral-800 group-hover:bg-white'}`}></span>
        <span className="font-mono tracking-tight">{displayText}</span>
        {external && (
            <svg className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        )}
      </Link>
    </li>
  )
}

// 2. Animated Status Badge
function StatusBadge() {
    return (
        <div className="inline-flex items-center gap-3 px-4 py-2 border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm rounded-full group cursor-default hover:border-emerald-500/30 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">All Systems Normal</span>
                <span className="text-[8px] font-mono text-neutral-500 mt-0.5 group-hover:text-emerald-500 transition-colors">UPTIME: 99.9%</span>
            </div>
        </div>
    )
}