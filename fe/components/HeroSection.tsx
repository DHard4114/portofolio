/**
 * @file components/HeroSection.tsx
 * @description Main hero identity section
 * @module Components/HeroSection
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React from 'react'
import Image from "next/image"
import { motion, Variants } from 'framer-motion'
import Profil from "../public/Profil.jpg"

// Animation Variants - Typed correctly
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" // Fixed type inference
    } 
  }
}

export default function HeroSection() {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-center font-sans relative pt-10 md:pt-4"
    >
      
      {/* 1. HEADER IDENTITY */}
      <div className="mb-8 md:mb-10">
        {/* AVATAR & STATUS */}
        <motion.div variants={itemVariants} className="relative w-28 h-28 md:w-32 md:h-32 mb-6 md:mb-8 group cursor-default">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-50 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500"></div>
          
          {/* Image Container */}
          <div className="relative w-full h-full rounded-full border border-neutral-800 bg-neutral-900 overflow-hidden z-10 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all">
             <Image 
               src={Profil} 
               alt="Daffa Hardhan" 
               fill 
               className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
               priority 
               sizes="(max-width: 768px) 100px, 128px"
             />
          </div>

          {/* Status Indicator Badge */}
          <div className="absolute -bottom-1 -right-1 z-20 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </div>
             <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Open</span>
          </div>
        </motion.div>

        {/* TYPOGRAPHY */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-[3.5rem] leading-[0.9] md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium text-white tracking-tighter">
            Daffa <br className="md:hidden"/>
            <span className="font-sans font-bold text-neutral-600 block md:inline">Hardhan.</span>
          </h1>
          
          <div className="flex items-center gap-3 pt-3">
            <div className="h-px w-8 bg-emerald-500/50"></div>
            <span className="text-xs md:text-sm font-mono text-emerald-400 uppercase tracking-widest">
              Computer Engineering @ UI
            </span>
          </div>
        </motion.div>
      </div>

      {/* 2. BIO SUMMARY */}
      <motion.div variants={itemVariants} className="mb-8 md:mb-10">
         <p className="text-neutral-400 text-sm leading-relaxed text-justify max-w-md border-l-2 border-neutral-800 pl-4 hover:border-emerald-500/50 transition-colors">
            Bridging the gap between <span className="text-white font-medium">Hardware</span> and <span className="text-white font-medium">Software</span>. 
            Passionate about Embedded Systems, IoT Architecture, and scalable Full-stack solutions.
         </p>
      </motion.div>

      {/* 3. CONTACT DATA GRID */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 mb-8 md:mb-10">
        <ContactItem 
          label="Location" 
          value="Depok, West Java, ID" 
          icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
        />
        <ContactItem 
          label="Email" 
          value="dapahardan@gmail.com" 
          href="mailto:dapahardan@gmail.com" 
          icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
        />
        <ContactItem 
          label="Phone / WA" 
          value="+62 852-1604-2495" 
          href="https://wa.me/6285216042495" 
          icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
        />
      </motion.div>

      {/* 4. SOCIAL ACTIONS */}
      <motion.div variants={itemVariants} className="flex gap-3 mb-10 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        <SocialButton href="https://linkedin.com/in/daffa-hardhan" label="LinkedIn" />
        <SocialButton href="https://github.com/DHard4114" label="GitHub" />
        <SocialButton href="https://www.instagram.com/dapahardan/" label="Instagram" />
      </motion.div>

    </motion.section>
  )
}

// --- SUB COMPONENTS ---

function ContactItem({ label, value, href, icon }: { label: string, value: string, href?: string, icon: string }) {
    // Fix: Moved content to a variable instead of a component definition inside render
    const content = (
        <div className="flex items-center gap-4 p-2 -ml-2 rounded-lg hover:bg-neutral-900/50 transition-colors group cursor-pointer sm:cursor-default">
            <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon} /></svg>
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">{label}</span>
                <span className="text-sm text-neutral-300 font-medium font-mono group-hover:text-white transition-colors">{value}</span>
            </div>
        </div>
    )

    return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content
}

function SocialButton({ href, label }: { href: string, label: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" 
           className="px-5 py-2.5 rounded text-xs font-bold border bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all flex items-center gap-2 whitespace-nowrap group">
            <span>{label}</span>
            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
    )
}