/**
 * @file components/ProjectsSection.tsx
 * @description Project showcase with navigation
 * @module Components/ProjectsSection
 *
 * Displays selected projects with animated navigation.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ProjectsSection() {
  const projects = [
    {
      title: "EduMate",
      year: "2025",
      category: "LMS Platform",
      description: "Comprehensive Learning Management System enabling collaborative education.",
      tech: ["Next.js 14", "TypeScript", "Tailwind", "Neon DB", "PostgreSQL"],
      details: "Built with a focus on performance using SSR and Server Components. Features robust JWT Authentication, real-time assignment tracking, and gamified progress systems.",
    },
    {
      title: "DashCraft",
      year: "2025",
      category: "E-Commerce",
      description: "Premium Digital Storefront for DIY Engineering Kits.",
      tech: ["React", "Node.js", "Express", "PostgreSQL"],
      details: "A full-featured e-commerce solution handling inventory management, secure payment gateway integration, and user order history.",
    },
    {
      title: "SmartGuard",
      year: "2025",
      category: "Industrial IoT",
      description: "Predictive Maintenance System for Industrial Machinery.",
      tech: ["ESP32", "C++", "FreeRTOS", "Flask API", "Blynk"],
      details: "IoT ecosystem detecting vibration anomalies in real-time. Sends telemetry data to a Python backend for analysis, preventing costly hardware failures.",
    },
    {
      title: "EventFlow",
      year: "2025",
      category: "Real-time Ops",
      description: "Event Monitoring Dashboard with AI Analytics.",
      tech: ["React", "WebSockets", "Mapbox GL", "Gemini AI"],
      details: "Real-time geolocation tracking of personnel. Integrates Generative AI to summarize incident reports and suggest rapid response strategies.",
    }
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const p = projects[current];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-10">
         <div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Selected Projects</h2>
            <p className="text-neutral-500 mt-2 text-sm">Technical breakdown of recent work.</p>
         </div>
         
         {/* Navigation Buttons */}
         <div className="flex gap-2">
            <button onClick={handlePrev} className="group w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <button onClick={handleNext} className="group w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
         </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/20"
          >
            {/* Left: Visual / Number (Placeholder for Screenshot) */}
            <div className="lg:col-span-5 bg-neutral-900 relative min-h-75 lg:min-h-112.5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-800 p-8 group overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               <span className="relative z-10 text-9xl font-black text-neutral-800/50 select-none group-hover:scale-110 transition-transform duration-700">
                 0{current + 1}
               </span>
               <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-xs font-mono text-neutral-400 bg-black/50 px-3 py-1 rounded-full border border-neutral-800">
                    VIEW DEMO / REPO
                  </span>
               </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{p.category}</span>
                    <h3 className="text-3xl font-bold text-white leading-tight">{p.title}</h3>
                 </div>
                 <span className="text-sm font-mono text-neutral-500 border border-neutral-800 px-3 py-1 rounded-md">{p.year}</span>
              </div>
              
              <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide text-[10px]">Description</h4>
                    <p className="text-neutral-400 leading-relaxed text-lg">{p.description}</p>
                </div>
                
                <div>
                    <h4 className="text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide text-[10px]">Technical Detail</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed border-l-2 border-neutral-800 pl-4">
                        {p.details}
                    </p>
                </div>

                <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-2">
                        {p.tech.map((t, i) => (
                        <span key={i} className="text-xs font-mono font-medium text-neutral-400 bg-neutral-800/50 border border-neutral-800 px-3 py-1.5 rounded hover:text-white hover:border-neutral-600 transition-colors cursor-default">
                            {t}
                        </span>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}