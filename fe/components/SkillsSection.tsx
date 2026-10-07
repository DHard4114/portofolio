/**
 * @file components/SkillsSection.tsx
 * @description Interactive Tech Matrix with holographic hover effects
 * @module Components/SkillsSection
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { translations, SkillCategoryData } from '@/data/translations'

export default function SkillsSection() {
  const { language } = useLanguage()
  const t = translations[language].skills
  const skillCategories = t.categories

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-12 border-b border-neutral-900 pb-6">
        <div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-serif">{t.heading}</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.subBadge}</span>
            </div>
        </div>
        <div className="hidden md:block text-right">
            <span className="text-[10px] font-mono text-neutral-600 block">{t.domainCount}</span>
            <span className="text-[10px] font-mono text-neutral-500 block">{t.domainSub}</span>
        </div>
      </div>

      {/* MATRIX GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, idx) => (
          <TechModule key={idx} data={cat} />
        ))}
      </div>
    </section>
  )
}

// --- SUB COMPONENT ---

function TechModule({ data }: { data: SkillCategoryData }) {

    const [hovered, setHovered] = useState(false)

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative bg-neutral-900/20 border border-neutral-800 p-6 overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500"
        >
            {/* Background Scanline (Only visible on hover) */}
            <div className={`absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(16,185,129,0.05),transparent)] -translate-y-full transition-transform duration-1000 ${hovered ? 'translate-y-full' : ''} pointer-events-none`}></div>
            
            {/* Module Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-[9px] font-mono text-neutral-500 block mb-1">ID: {data.id}</span>
                    <h3 className="text-xl font-bold text-white font-serif tracking-tight group-hover:text-emerald-400 transition-colors">{data.title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{data.desc}</p>
                </div>
                {/* Decoration Icon */}
                <div className="w-8 h-8 border border-neutral-800 flex items-center justify-center bg-neutral-900 group-hover:bg-emerald-900/20 group-hover:border-emerald-500/30 transition-all">
                    <div className={`w-1.5 h-1.5 rounded-sm ${hovered ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-neutral-700'}`}></div>
                </div>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 relative z-10">
                {data.skills.map((skill, i) => (
                    <div 
                        key={i} 
                        className="px-3 py-1.5 bg-black border border-neutral-800 text-[10px] font-mono text-neutral-300 uppercase hover:border-emerald-500/50 hover:text-white hover:bg-emerald-900/10 transition-all cursor-default select-none flex items-center gap-2"
                    >
                        <span className="w-1 h-1 bg-neutral-700 rounded-full group-hover:bg-emerald-500 transition-colors"></span>
                        {skill}
                    </div>
                ))}
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700 group-hover:border-emerald-500 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-700 group-hover:border-emerald-500 transition-colors"></div>
        </motion.div>
    )
}