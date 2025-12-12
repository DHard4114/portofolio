/**
 * @file components/ExperienceSection.tsx
 * @description Professional and organizational experience
 * @module Components/ExperienceSection
 *
 * Timeline of work, research, and organizational experience.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: "Netlab UI",
    role: "Research Assistant",
    period: "Nov 2025 - Present",
    current: true,
    description: "Conducting research on advanced networking protocols and AI-driven digital systems within the Dept. of Electrical Engineering UI.",
  },
  {
    company: "Ikatan Mahasiswa Elektro (IME FTUI)",
    role: "Secretary Expert Staff",
    period: "Mar 2025 - Dec 2025",
    current: false,
    description: "Optimized administrative workflows and mentored junior staff in accountability reporting standards.",
  },
  {
    company: "National Electrical Summit UI 2024",
    role: "General Secretary",
    period: "Jul 2024 - Mar 2025",
    current: false,
    description: "Managed external correspondence and standardized operational documents for a national-level engineering summit.",
  }
]

export default function ExperienceSection() {
  return (
    <section className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Experience</h2>
      </div>

      <div className="border-l border-neutral-800 ml-3 space-y-12 relative">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline Dot */}
            <span className={`absolute -left-1.5 top-2.5 w-3 h-3 rounded-full border transition-all duration-300 z-10
              ${exp.current
                ? 'bg-blue-500 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                : 'bg-neutral-900 border-neutral-700 group-hover:border-neutral-500'}`}
            />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {exp.role}
              </h3>
              <span className="text-xs font-mono text-neutral-500">{exp.period}</span>
            </div>
            
            <div className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wide">
              {exp.company}
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-2xl">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}