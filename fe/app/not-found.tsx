/**
 * @file app/not-found.tsx
 * @description Custom 404 "System Failure" page
 */
"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-red-900 selection:text-white">
      
      {/* Background Red Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center space-y-6 p-8 border border-red-900/30 bg-black/50 backdrop-blur-sm max-w-lg w-full relative"
      >
        {/* Decor Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>

        <h1 className="text-6xl font-black text-red-600 tracking-tighter glitch-text">404</h1>
        
        <div className="space-y-2 border-l-2 border-red-800 pl-4 text-left">
            <p className="text-red-400 text-xs uppercase tracking-widest">Critical Error</p>
            <p className="text-white text-lg font-bold">PAGE NOT FOUND</p>
            <p className="text-neutral-500 text-xs">The requested path does not exist in the current directory.</p>
        </div>

        <div className="pt-6">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-900/20 border border-red-800/50 text-red-500 hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest group">
                <span className="w-2 h-2 bg-red-500 group-hover:bg-white transition-colors"></span>
                Reboot System
            </Link>
        </div>
      </motion.div>

      {/* Decorative Code */}
      <div className="absolute bottom-10 left-10 text-[10px] text-red-900/50 font-mono hidden md:block">
        <p>ERR_CONNECTION_REFUSED</p>
        <p>Stack trace: 0x00045F3A</p>
        <p>Memory dump: ...</p>
      </div>
    </div>
  )
}