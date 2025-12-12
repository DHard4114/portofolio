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
    <div className="fixed inset-0 -z-50 bg-[#050505] overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Dynamic Noise Layer */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.05), transparent 80%)`,
        }}
      />

      {/* Cyber-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      
      {/* Aurora Orbs */}
      <div className="absolute inset-0 blur-[140px] opacity-20">
        <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 20, repeat: Infinity }} 
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/30 rounded-full" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, 30, 0] }} transition={{ duration: 25, repeat: Infinity }} 
                    className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full" />
      </div>
    </div>
  )
}