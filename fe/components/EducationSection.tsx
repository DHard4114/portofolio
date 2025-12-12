/**
 * @file components/EducationSection.tsx
 * @description Education timeline with circuit-board aesthetics and emerald theme
 * @module Components/EducationSection
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function EducationSection() {
  const educationData = [
    {
      school: "Universitas Indonesia",
      degree: "Bachelor of Computer Engineering",
      gpa: null, 
      period: "2023 - 2027",
      status: "Expected",
      location: "Depok, ID",
      current: true,
      highlights: [
        { 
          label: "Core Concentration", 
          desc: "Embedded Systems, Hardware-Software Co-design, Industrial IoT." 
        },
        { 
          label: "Key Coursework", 
          desc: "Network Eng (CCNA), FPGA Design (VHDL), OS, Data Structures." 
        },
        { 
          label: "Laboratory", 
          desc: "Digital Systems & Embedded Networking Labs." 
        }
      ]
    },
    {
      school: "SMAN 1 Cikande",
      degree: "Mathematics & Natural Sciences",
      gpa: "Top 3 Rank", 
      period: "2020 - 2023",
      status: "Graduated",
      location: "Serang, ID",
      current: false,
      highlights: [
        { 
          label: "Academic", 
          desc: "Quarterfinalist OKTAN ITB 2022 (National Chem), Math Olympiad." 
        },
        { 
          label: "Non-Academic", 
          desc: "1st Place Guitar Solo (District), 3rd Place Debate (Provincial)." 
        }
      ]
    }
  ]

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-12 border-b border-neutral-900 pb-6">
        <div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Education Protocol</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Academic Database</span>
            </div>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative pl-4 md:pl-0">
        
        {/* Main Vertical Line */}
        <div className="absolute left-0 md:left-8 top-2 bottom-0 w-px bg-neutral-800/50"></div>

        <div className="space-y-12">
            {educationData.map((edu, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-12 group"
            >
                {/* 1. TIMELINE NODE (Left Side) */}
                <div className="absolute left-0 md:left-8 -translate-x-1.25 top-0 md:top-6 flex items-center justify-center z-10">
                    <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 bg-[#050505] 
                        ${edu.current 
                            ? 'border-emerald-500 shadow-[0_0_10px_#10b981] scale-110' 
                            : 'border-neutral-600 group-hover:border-emerald-500 group-hover:scale-125'}`} 
                    />
                </div>

                {/* 2. DATE LABEL (Desktop: Left) */}
                <div className="hidden md:flex w-32 flex-col items-end justify-start pt-5 text-right shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono text-white font-bold">{edu.period}</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{edu.status}</span>
                </div>

                {/* 3. CONTENT CARD (Right Side) */}
                <div className="flex-1 relative pl-6 md:pl-0">
                    
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-7 -left-12 w-12 h-px bg-neutral-800 group-hover:bg-emerald-500/50 transition-colors"></div>
                    
                    <div className="relative bg-neutral-900/30 border border-neutral-800 p-6 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 hover:bg-neutral-900/50 transition-all duration-300">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 10 10" fill="none"><path d="M0 0H10V10" stroke="currentColor"/></svg>
                        </div>

                        {/* Mobile Date */}
                        <div className="md:hidden mb-2 flex items-center gap-2">
                            <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-900/20">{edu.period}</span>
                        </div>

                        {/* Header Info */}
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white font-serif tracking-tight mb-1 group-hover:text-emerald-200 transition-colors">
                                {edu.school}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                <span className="text-neutral-300 font-medium">{edu.degree}</span>
                                {edu.gpa && (
                                    <span className="text-xs font-mono text-emerald-400 bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        {edu.gpa}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            {edu.highlights.map((item, i) => (
                                <div key={i} className="flex gap-3 items-start p-2 -ml-2 rounded hover:bg-white/5 transition-colors">
                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-emerald-500 transition-colors shrink-0"></div>
                                    <div className="text-sm leading-relaxed">
                                        <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5 group-hover:text-emerald-500/80 transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="text-neutral-400">
                                            {item.desc}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}