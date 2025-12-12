/**
 * @file components/SystemBoot.tsx
 * @description Cinematic boot sequence preloader
 * @module Components/SystemBoot
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const BOOT_SEQUENCE = [
  "INITIALIZING KERNEL...",
  "LOADING ASSETS...",
  "ESTABLISHING SECURE CONNECTION...",
  "MOUNTING FILE SYSTEM...",
  "SYSTEM READY."
]

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const [logIndex, setLogIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 1. Text Sequence Timer
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOT_SEQUENCE.length - 1) return prev + 1
        return prev
      })
    }, 400) // Speed of text updates

    // 2. Progress Bar Timer
    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(progressInterval)
                clearInterval(logInterval)
                setTimeout(onComplete, 500) // Delay before closing
                return 100
            }
            return prev + 2 // Speed of loading bar
        })
    }, 30)

    return () => {
      clearInterval(logInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center font-mono cursor-wait"
    >
      <div className="w-64 space-y-4">
        {/* LOGS */}
        <div className="h-20 flex flex-col justify-end items-start overflow-hidden">
            {BOOT_SEQUENCE.slice(0, logIndex + 1).map((log, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: i === logIndex ? 1 : 0.5, x: 0 }}
                    className={`text-[10px] tracking-widest ${i === logIndex ? 'text-emerald-500' : 'text-neutral-600'}`}
                >
                    {`> ${log}`}
                </motion.div>
            ))}
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                style={{ width: `${progress}%` }}
            />
        </div>
        
        {/* PERCENTAGE */}
        <div className="flex justify-between text-[10px] text-neutral-500">
            <span>BIOS_V.2.0.5</span>
            <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  )
}