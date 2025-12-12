/**
 * @file components/EducationSection.tsx
 * @description Education background with cyberpunk timeline style
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
      // GPA dihapus untuk UI
      gpa: null, 
      period: "2023 - 2027 (Expected)",
      location: "Depok, Indonesia",
      current: true,
      highlights: [
        { 
          label: "Core Concentration", 
          desc: "Focused on Embedded Systems, Hardware-Software Co-design, and Industrial IoT Architecture." 
        },
        { 
          label: "Relevant Coursework", 
          desc: "Computer Networks (Cisco/CCNA), Digital System Design (FPGA/VHDL), Operating Systems, Data Structures & Algorithms, and Computer Organization." 
        },
        { 
          label: "Laboratory", 
          desc: "Active engagement in Digital Systems and Embedded Networking labs." 
        }
      ]
    },
    {
      school: "SMAN 1 Cikande",
      degree: "Mathematics and Natural Sciences",
      gpa: "Top 3 Academic Rank", // Ranking SMA tetap ditampilkan sebagai achievement
      period: "2020 - 2023",
      location: "Serang, Indonesia",
      current: false,
      highlights: [
        { 
          label: "Academic Achievement", 
          desc: "Quarterfinalist at OKTAN ITB 2022 (National Chemistry Competition, 2,000+ participants) and District Math Olympiad participant." 
        },
        { 
          label: "Non-Academic Awards", 
          desc: "1st Place (District) & 3rd Place (Province) in Solo Guitar Competition; 3rd Place in Provincial Debate Competition." 
        }
      ]
    }
  ]

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Education</h2>
        <p className="text-neutral-500 text-sm mt-2 font-sans">Academic background and qualifications.</p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative border-l border-neutral-800 ml-3 md:ml-4 space-y-12 pb-4">
        
        {educationData.map((edu, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* TIMELINE DOT (Animated) */}
            <span className={`absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-10 
              ${edu.current 
                ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_#10b981] scale-110' 
                : 'bg-neutral-900 border-neutral-600 group-hover:border-emerald-500 group-hover:bg-emerald-500/50'}`} 
            />
            
            {/* CONTENT CARD */}
            <div className="flex flex-col gap-1 mb-4">
               {/* HEAD: School & Date */}
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {edu.school}
                  </h3>
                  <div className="flex items-center gap-2">
                    {edu.current && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 animate-pulse">
                            ACTIVE
                        </span>
                    )}
                    <span className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1 rounded bg-neutral-900/50">
                        {edu.period}
                    </span>
                  </div>
               </div>

               {/* SUB: Degree & GPA (Conditional Render) */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm mt-1">
                  <span className="text-neutral-300 font-medium">{edu.degree}</span>
                  
                  {/* Hanya tampilkan GPA jika datanya ada (tidak null) */}
                  {edu.gpa && (
                    <>
                        <span className="hidden sm:inline text-neutral-700">|</span>
                        <span className="text-xs font-mono text-blue-400 bg-blue-900/10 px-2 py-0.5 rounded border border-blue-500/20 w-fit">
                            {edu.gpa}
                        </span>
                    </>
                  )}
               </div>
            </div>

            {/* HIGHLIGHTS LIST */}
            <div className="bg-neutral-900/20 border border-neutral-800/50 rounded-lg p-4 md:p-5 hover:border-neutral-700 transition-colors backdrop-blur-sm">
                <div className="space-y-3">
                    {edu.highlights.map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            {/* Bullet Icon */}
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-sm bg-neutral-700 group-hover:bg-emerald-500 transition-colors shrink-0"></div>
                            
                            <div className="text-sm text-neutral-400 leading-relaxed">
                                <strong className="text-neutral-300 font-medium mr-1">{item.label}:</strong>
                                {item.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  )
}