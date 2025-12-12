/**
 * @file components/BackgroundFSX.tsx
 * @description Animated background and effects
 * @module Components/BackgroundFSX
 *
 * Provides animated background layers and interactive effects.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { MouseEvent } from "react"

export default function BackgroundFX() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div 
      className="fixed inset-0 -z-50 h-full w-full bg-[#050505] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 1. LAYER BASE: STATIC NOISE (Agar tidak flat) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. LAYER AURORA: FLOATING ORBS */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1: Cyan/Blue (Top Left) */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0], 
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/20 blur-[120px]"
        />
        
        {/* Orb 2: Purple/Pink (Bottom Right) */}
        <motion.div 
          animate={{ 
            x: [0, -100, 50, 0], 
            y: [0, 50, -50, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[100px]"
        />

        {/* Orb 3: Emerald (Center - Technical Accent) */}
        <motion.div 
          animate={{ 
            x: [0, 50, -50, 0], 
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-emerald-900/10 blur-[150px]"
        />
      </div>

      {/* 3. LAYER GRID: INTERACTIVE PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px]">
      </div>

      {/* 4. LAYER SPOTLIGHT: Mouse Follower */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition duration-300 opacity-100 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.04),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 5. VIGNETTE: Dark edges to focus content */}
      <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-[#050505]/80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-transparent to-[#050505]/80 pointer-events-none"></div>
    </div>
  )
}