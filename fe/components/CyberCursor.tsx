/**
 * @file components/CyberCursor.tsx
 * @description Hybrid cursor: Instant Dot + Smooth Ring (No Lag)
 * @module Components/CyberCursor
 * @author Daffa Hardhan
 * @created 2025
 */

"use client"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CyberCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false) 

  // 1. Raw Mouse Values (Untuk Titik Tengah - INSTAN)
  const mouseX = useMotionValue(-100) 
  const mouseY = useMotionValue(-100)

  // 2. Smooth Spring Values (Untuk Lingkaran Luar - SEDIKIT DELAY BIAR KEREN)
  // Konfigurasi mass: 0.1 membuat spring sangat ringan dan cepat
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 } 
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      // Offset agar kursor ada di tengah
      mouseX.set(e.clientX) 
      mouseY.set(e.clientY)
      
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')

      setIsHovered(!!isInteractive)
    }

    const handleMouseOut = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", moveMouse)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseOut)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", moveMouse)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseOut)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  return (
    <>
      {/* 1. DOT (INSTANT TRACKING) */}
      <motion.div
        className="fixed top-0 left-0 z-100000 pointer-events-none"
        style={{
          x: mouseX, // Menggunakan raw value
          y: mouseY,
          translateX: "-50%", // Center fix
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className={`w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] transition-transform duration-200 ${isHovered ? 'scale-0' : 'scale-100'}`}></div>
      </motion.div>

      {/* 2. RING (SMOOTH TRAILING) */}
      <motion.div
        className="fixed top-0 left-0 z-99999 pointer-events-none"
        style={{
          x: ringX, // Menggunakan spring value
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0, 
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 40 : 20,
            height: isHovered ? 40 : 20,
            backgroundColor: isHovered ? "rgba(16, 185, 129, 0.1)" : "transparent",
            borderColor: isHovered ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.3)",
            rotate: isHovered ? 45 : 0 // Efek putar saat hover
          }}
          className="rounded-full border border-emerald-500/50 backdrop-blur-[1px] flex items-center justify-center relative transition-all duration-300 ease-out"
        >
            {/* Crosshair lines */}
            <div className={`absolute w-full h-px bg-emerald-500/50 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute h-full w-px bg-emerald-500/50 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        </motion.div>

        {/* Label Text */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
              opacity: isHovered ? 1 : 0, 
              x: isHovered ? 30 : 20 
          }}
          className="absolute top-1 left-2 bg-emerald-900/80 border border-emerald-500/30 text-emerald-100 text-[9px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
        >
          LINK DETECTED
        </motion.div>
      </motion.div>
    </>
  )
}