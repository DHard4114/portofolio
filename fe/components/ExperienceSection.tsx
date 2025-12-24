/**
 * @file components/ExperienceSection.tsx
 * @description Professional experience timeline with circuit-board aesthetics
 * @module Components/ExperienceSection
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: "Netlab UI - Universitas Indonesia",
    role: "Research Assistant - NLP Team 2",
    period: "Nov 2025 - Present",
    current: true,
    location: "Depok, ID",
    description: "Spearheading research on AI Safety and Automated Red Teaming for Open-Weights LLMs. Co-developed 'JAILBREAK-R1', a resource-efficient Reinforcement Learning framework utilizing GRPO and Unsloth to democratize safety audits on consumer-grade hardware.",
  },
  {
    company: "Ikatan Mahasiswa Elektro (IME FTUI)",
    role: "Secretary Expert Staff",
    period: "Mar 2025 - Dec 2025",
    current: false, // Set true jika ingin efek pulse aktif
    location: "Depok, ID",
    description: "Optimized administrative workflows and mentored junior staff in accountability reporting standards. Streamlined organizational documentation protocols.",
  },
  {
    company: "National Electrical Summit UI 2024",
    role: "General Secretary",
    period: "Jul 2024 - Mar 2025",
    current: false,
    location: "Depok, ID",
    description: "Managed external correspondence and standardized operational documents for a national-level engineering summit. Coordinated cross-divisional communication channels.",
  }
]

export default function ExperienceSection() {
  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-12 border-b border-neutral-900 pb-6">
        <div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Experience Log</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Career Trajectory</span>
            </div>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative pl-4 md:pl-0">
        
        {/* Main Vertical Line */}
        <div className="absolute left-0 md:left-8 top-2 bottom-0 w-px bg-neutral-800/50"></div>

        <div className="space-y-12">
            {experiences.map((exp, idx) => (
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
                        ${exp.current 
                            ? 'border-emerald-500 shadow-[0_0_10px_#10b981]' 
                            : 'border-neutral-600 group-hover:border-blue-500 group-hover:scale-125'}`} 
                    />
                </div>

                {/* 2. DATE LABEL (Desktop: Left, Mobile: Hidden/Merged) */}
                <div className="hidden md:flex w-32 flex-col items-end justify-start pt-5 text-right shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono text-white font-bold">{exp.period.split('-')[0].trim()}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{exp.period.split('-')[1]?.trim() || 'Present'}</span>
                </div>

                {/* 3. CONTENT CARD (Right Side) */}
                <div className="flex-1 relative pl-6 md:pl-0">
                    
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-7 -left-12 w-12 h-px bg-neutral-800 group-hover:bg-blue-500/50 transition-colors"></div>
                    
                    <div className="relative bg-neutral-900/30 border border-neutral-800 p-6 rounded-lg backdrop-blur-sm hover:border-blue-500/30 hover:bg-neutral-900/50 transition-all duration-300">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 text-blue-500" viewBox="0 0 10 10" fill="none"><path d="M0 0H10V10" stroke="currentColor"/></svg>
                        </div>

                        {/* Mobile Date (Visible only on mobile) */}
                        <div className="md:hidden mb-2 text-[10px] font-mono text-blue-400">
                            {exp.period}
                        </div>

                        {/* Role & Company */}
                        <h3 className="text-xl font-bold text-white font-serif tracking-tight mb-1 group-hover:text-blue-200 transition-colors">
                            {exp.role}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{exp.company}</span>
                            <span className="text-neutral-700">•</span>
                            <span className="text-[10px] font-mono text-neutral-500">{exp.location}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-neutral-400 leading-relaxed text-justify border-l-2 border-neutral-800 pl-4 group-hover:border-blue-500/30 transition-colors">
                            {exp.description}
                        </p>
                    </div>
                </div>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}