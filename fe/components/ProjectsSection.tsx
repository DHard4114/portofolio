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
import { useState, useEffect, useCallback } from 'react' // Import useCallback
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

export default function ProjectsSection() {
  const projects = [
    {
      title: "Robotic Arm Control System in VHDL",
      year: "2024",
      category: "FPGA / Digital System",
      description: "A robotic arm controller implemented in VHDL on FPGA, featuring autonomous 3D navigation, Euclidean distance calculation, and FSM-based control.",
      tech: ["VHDL", "FPGA", "ModelSim", "Quartus"],
      details: "Developed as the Final Project. The architecture uses the 'RobotArmFPGA' entity, integrating an asynchronous Input Decoder and a synchronous Navigator module for real-time Euclidean distance logic. Control is managed by a Finite State Machine (FSM). Validated using ModelSim waveforms before synthesis in Quartus.",
      demoLink: "https://github.com/DHard4114/PA27_PSD",
      imageURL: "/ArmRobot.jpg",
    },
    {
      title: "SmartGuard: Predictive Maintenance",
      year: "2025",
      category: "Industrial IoT",
      description: "IoT system for real-time machine vibration monitoring and automatic safety shutdown.",
      tech: ["ESP32", "MPU6050", "FreeRTOS", "Flask API"],
      details: "Sensor node detects abnormal vibration, gateway triggers relay/buzzer, and logs incidents to cloud dashboard.",
      demoLink: "https://github.com/DHard4114/IOT22-SmartGuard-Industrial-Predictive-Maintenance-System",
      imageURL: "/SmartGuard1.jpg",
    },
    {
      title: "Multi-Campus Network Deployment",
      year: "2025",
      category: "Network Engineering",
      description: "Designed a scalable, redundant network for 3 campuses using Cisco 3-layer architecture (Core, Distribution, Access).",
      tech: ["Cisco Packet Tracer", "VLAN", "OSPF", "STP", "VLSM"],
      details: "Implemented VLANs, Inter-VLAN Routing, and Spanning Tree Protocol for segmentation, redundancy, and fast failover. Integrated core services (Web, DNS, Email).",
      demoLink: "https://github.com/DHard4114/Multi-Campus-Enterprise-Network-Deployment",
      imageURL: "/Topologi1.png",
    },
    {
      title: "Penetration Testing & Remediation",
      year: "2025",
      category: "Application Security",
      description: "Blackbox penetration testing and remediation of two critical flaws (SQL Injection and IDOR) in a custom Node.js REST API with a PostgreSQL database.",
      tech: ["Node.js", "PostgreSQL", "SQLi", "IDOR", "OWASP"],
      details: "Identified and exploited a **CRITICAL SQL Injection** (Tautology Attack) to bypass authentication and an **IDOR** flaw to access secret data via UUID enumeration. Remediation involved implementing **Parameterized Queries** to prevent SQLi and integrating **Object Level Authorization Checks** in the controller layer to mitigate IDOR, significantly raising the security posture.",
      demoLink: "https://github.com/DHard4114/PenetrationTesting_InsecureDirectObjectReference",
      imageURL: "/Pentest.png",
    },
    {
      title: "AimTention: 3D FPS Aim Trainer",
      year: "2024",
      category: "Game Development",
      description: "A dedicated 3D game trainer built on Unity to enhance player aiming, reflexes, and precision for First-Person Shooter (FPS) games.",
      tech: ["Unity 3D", "C#", "FPS Simulation", "Flick Mode"],
      details: "Developed based on 'Realism and Relevance' design pillars, the game features a dynamic target spawning system and two core training modes. **Normal Mode** is a basic gridshot for speed and accuracy. **Flick Mode** is a high-speed trainer focused on reflexes. Results provide detailed metrics (Score, Accuracy, Shots Fired).",
      demoLink: "https://github.com/Tinkermannn/Aim-Tention",
      imageURL: "/AimTention.png",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FIX: Definisikan fungsi handler SEBELUM useEffect agar bisa dipanggil di dalamnya
  // Gunakan useCallback untuk menghindari re-render yang tidak perlu
  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [projects.length]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, closeModal]);

  const p = projects[current];

  // Helper untuk memotong teks
  // const truncateText = (text: string, maxLength: number) => {
  //   if (text.length <= maxLength) return text;
  //   return text.substring(0, maxLength) + '...';
  // };

  return (
    <>
      <section className="w-full relative z-10">
        
        {/* SECTION HEADER & NAV */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="w-2 h-2 bg-blue-500 rounded-sm animate-pulse"></span>
                 <span className="text-[10px] font-bold text-blue-500 tracking-[0.2em] uppercase">Showcase // {current + 1 < 10 ? `0${current + 1}` : current + 1}</span>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight font-serif leading-none">Selected Projects</h2>
           </div>
           
           <div className="flex gap-3">
              <button onClick={handlePrev} className="group px-4 py-2 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-neutral-600 transition-all flex items-center gap-2">
                  <span className="text-neutral-500 group-hover:text-white text-xs font-mono font-bold">PREV</span>
              </button>
              <button onClick={handleNext} className="group px-4 py-2 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-neutral-600 transition-all flex items-center gap-2">
                  <span className="text-neutral-500 group-hover:text-white text-xs font-mono font-bold">NEXT</span>
              </button>
           </div>
        </div>

        {/* MAIN CARD DISPLAY */}
        <div className="relative group perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              // FIX: Tinggi konsisten, sudut rounded
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm rounded-none lg:rounded-2xl overflow-hidden shadow-2xl h-auto lg:h-125"
            >
              
              {/* LEFT: IMAGE & ACTION */}
              <div 
                onClick={openModal}
                // FIX: Gunakan canonical class h-64 md:h-96
                className="lg:col-span-7 relative h-64 md:h-96 lg:h-full border-b lg:border-b-0 lg:border-r border-neutral-800 overflow-hidden cursor-pointer group/image"
              >
                 {/* Image */}
                 <div className="absolute inset-0 transition-transform duration-700 group-hover/image:scale-105">
                     {p.imageURL ? (
                          <Image
                             src={p.imageURL}
                             alt={`Screenshot of ${p.title}`}
                             fill={true}
                             sizes="(max-width: 1024px) 100vw, 60vw"
                             className="object-cover opacity-80 group-hover/image:opacity-100 transition-opacity duration-500"
                             priority={true}
                          />
                     ) : (
                          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                             <span className="text-neutral-800 text-9xl font-black">NULL</span>
                          </div>
                     )}
                 </div>
                 
                 {/* Overlay Gradient */}
                 <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent opacity-90"></div>
                 <div className="absolute inset-0 bg-linear-to-r from-neutral-900/50 via-transparent to-transparent opacity-60"></div>
                 
                 {/* Scanline Effect - FIX: Canonical Class bg-size */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] pointer-events-none opacity-40"></div>

                 {/* Click Indication */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 transform translate-y-4 group-hover/image:translate-y-0 transition-transform">
                        <span className="text-xs font-bold text-white tracking-widest uppercase">Expand View</span>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    </div>
                 </div>

                 {/* Bottom Actions */}
                 <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end z-20">
                     <div className="flex gap-2">
                        {p.demoLink && (
                            <a 
                                href={p.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 bg-white hover:bg-neutral-200 text-black text-[10px] font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                Source Code
                            </a>
                        )}
                     </div>
                 </div>
              </div>

              {/* RIGHT: INFO PANEL - FIX: Padding Konsisten & Flex Layout */}
              <div className="lg:col-span-5 p-8 flex flex-col relative overflow-hidden bg-neutral-950 h-full">
                 {/* Background Grid - FIX: Canonical Class bg-size */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

                 <div className="relative z-10 flex-1 flex flex-col justify-between">
                    <div>
                        <span className="inline-block px-2 py-1 bg-blue-900/20 border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-widest rounded mb-3">
                            {p.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-serif leading-tight mb-4 line-clamp-2">
                            {p.title}
                        </h3>
                        {/* FIX: Line clamp lebih agresif agar tinggi tidak jebol */}
                        <p className="text-sm text-neutral-400 leading-relaxed text-justify border-l-2 border-neutral-800 pl-4 line-clamp-4">
                            {p.description}
                        </p>
                    </div>

                    <div className="mt-6">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                            {/* FIX: Batasi tech stack max 6 item agar rapi */}
                            {p.tech.slice(0, 6).map((t, i) => (
                                <span key={i} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-mono rounded hover:border-neutral-600 transition-colors cursor-default">
                                    {t}
                                </span>
                            ))}
                            {p.tech.length > 6 && (
                                <span className="px-3 py-1.5 text-neutral-500 text-[10px] font-mono">+ {p.tech.length - 6}</span>
                            )}
                        </div>
                    </div>
                    
                    <button 
                        onClick={openModal}
                        className="mt-6 w-full py-3 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                    >
                        Read Case Study
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                 </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- ENHANCED MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12"
          >
            {/* Backdrop Blur & Dim */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
                onClick={closeModal}
            >
                {/* Decorative Grid Pattern - FIX: Canonical Class bg-size */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] opacity-20"></div>
            </div>

            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-[#0A0A0A] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* MODAL HEADER (Sticky) */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0A0A0A]/90 backdrop-blur z-20 shrink-0">
                  <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">PROJECT_ID: {current + 1 < 10 ? `0${current + 1}` : current + 1}</span>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="p-2 hover:bg-neutral-800 rounded-full transition-colors group"
                  >
                      <svg className="w-5 h-5 text-neutral-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
              </div>

              {/* MODAL BODY (Scrollable Layout) */}
              <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
                  
                  {/* LEFT: MEDIA (Sticky on Desktop) */}
                  <div className="w-full md:w-1/2 lg:w-3/5 bg-neutral-900 relative min-h-64 md:min-h-full border-b md:border-b-0 md:border-r border-neutral-800">
                      {p.imageURL ? (
                          <div className="relative w-full h-full">
                              <Image
                                src={p.imageURL}
                                alt={p.title}
                                fill
                                className="object-contain p-4 md:p-8"
                                sizes="(max-width: 768px) 100vw, 60vw"
                              />
                              {/* Overlay Gradient for readability if needed */}
                              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                          </div>
                      ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-800">NO MEDIA</div>
                      )}
                  </div>

                  {/* RIGHT: CONTENT (Scrollable) */}
                  <div className="w-full md:w-1/2 lg:w-2/5 overflow-y-auto bg-[#0A0A0A]">
                      <div className="p-6 md:p-8 lg:p-10 space-y-8">
                          
                          {/* Title Area */}
                          <div className="space-y-2">
                              <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                                  <span>{p.category}</span>
                                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                  <span>{p.year}</span>
                              </div>
                              <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif leading-tight">
                                  {p.title}
                              </h2>
                          </div>

                          {/* Quick Actions */}
                          {p.demoLink && (
                              <a 
                                href={p.demoLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                              >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                  Access Source Code
                              </a>
                          )}

                          <div className="h-px w-full bg-neutral-800"></div>

                          {/* Detail Sections */}
                          <div className="space-y-6">
                              <div className="space-y-3">
                                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                      <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span>
                                      Overview
                                  </h4>
                                  <p className="text-neutral-300 leading-relaxed text-sm text-justify">
                                      {p.description}
                                  </p>
                              </div>

                              <div className="space-y-3">
                                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                      <span className="w-1 h-4 bg-blue-500 rounded-sm"></span>
                                      Technical Architecture
                                  </h4>
                                  <p className="text-neutral-300 leading-relaxed text-sm text-justify">
                                      {p.details}
                                  </p>
                              </div>

                              <div className="space-y-3">
                                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                      <span className="w-1 h-4 bg-purple-500 rounded-sm"></span>
                                      Tech Stack
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                      {p.tech.map((t, i) => (
                                          <span key={i} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono rounded hover:border-neutral-700 transition-colors">
                                              {t}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>

              {/* MODAL FOOTER (Status Bar) */}
              <div className="bg-neutral-950 border-t border-neutral-900 py-2 px-6 flex justify-between items-center text-[9px] font-mono text-neutral-600 uppercase shrink-0">
                  <div>STATUS: ARCHIVED</div>
                  <div className="flex gap-4">
                      <span>SECURE CONNECTION</span>
                      <span>VER: 1.0.2</span>
                  </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}