/**
 * @file components/HeroSection.tsx
 * @description Main hero/identity section for portfolio
 * @module Components/HeroSection
 *
 * Displays avatar, name, and contact info in a professional hero section.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'
import Profil from "../public/Profil.jpg"

export default function HeroSection() {
  return (
    <section className="h-full flex flex-col font-sans relative pt-4">
      
      {/* 1. IDENTITY - CLEAN & CENTERED */}
      <div className="mb-10">
        
        {/* AVATAR - Minimalis & Professional */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 mb-8 group"
        >
          {/* Subtle Glow (Hanya muncul saat hover) */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          {/* Image */}
          <div className="relative w-full h-full rounded-full border border-neutral-800 bg-neutral-900 overflow-hidden z-10 group-hover:border-emerald-500/50 transition-colors">
             <Image 
               src={Profil} 
               alt="Daffa Hardhan" 
               fill 
               className="object-cover" 
               sizes="(max-width: 768px) 100vw, 33vw"
             />
          </div>

          {/* Status Dot */}
          {/* <div className="absolute bottom-1 right-1 z-20 flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center border border-neutral-800">
               <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
          </div> */}
        </motion.div>

        {/* TYPOGRAPHY */}
        <div className="space-y-2">
          <h1 className="text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.1]">
            Daffa <br/>
            <span className="font-sans font-bold text-neutral-500">Hardhan.</span>
          </h1>
          
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px w-8 bg-emerald-500/50"></div>
            <span className="text-sm font-mono text-emerald-400 uppercase tracking-widest">
              Computer Engineering @ UI
            </span>
          </div>
        </div>
      </div>

      {/* 2. CONTACT INFO - CLEAN ICONS */}
      <div className="flex flex-col gap-6 mb-12 pl-1">
        {[
          { 
            label: 'Location', 
            value: 'Depok, West Java, ID',
            // 'Serang, Banten, ID', 
            // Icon Map Pin (Standard Clean)
            icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' 
          },
          { 
            label: 'Email', 
            value: 'dapahardan@gmail.com', 
            href: 'mailto:dapahardan@gmail.com', 
            // Icon Envelope (Standard Clean)
            icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' 
          },
          { 
            label: 'Phone', 
            value: '+62 852 1604 2495', 
            href: 'tel:085216042495', 
            // Icon Phone Handset (Standard Clean)
            icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' 
          }
        ].map((item, idx) => (
          <div key={idx} className="group flex items-start gap-4">
            <div className="mt-1 w-5 h-5 flex items-center justify-center text-neutral-600 group-hover:text-emerald-500 transition-colors">
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-0.5">{item.label}</span>
              {item.href ? (
                <a href={item.href} className="text-sm text-neutral-300 font-medium hover:text-white transition-colors border-b border-transparent hover:border-emerald-500/50 w-fit pb-0.5">{item.value}</a>
              ) : (
                <span className="text-sm text-neutral-300 font-medium">{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. SOCIALS - Minimal Buttons */}
      <div className="flex gap-3 mb-10">
        <a href="https://linkedin.com/in/daffa-hardhan" target="_blank" className="px-5 py-2 bg-neutral-900 border border-neutral-800 rounded text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-600 transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
        </a>
        <a href="https://github.com/DHard4114" target="_blank" className="px-5 py-2 bg-neutral-900 border border-neutral-800 rounded text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-600 transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </a>
      </div>

      {/* 4. BIO - Modern Code Snippet style */}
      <div className="mt-auto">
        <div className="bg-neutral-900/30 border-l-2 border-emerald-500 pl-4 py-1">
          <p className="text-neutral-400 text-sm leading-relaxed font-sans text-justify">
              &quot;Forging robust digital architectures at the intersection of <span className="text-neutral-200 font-medium">Hardware</span> and <span className="text-neutral-200 font-medium">Software</span>. Obsessed with optimization, clean code, and scalable systems.&quot;
          </p>
        </div>
      </div>
    </section>
  )
}