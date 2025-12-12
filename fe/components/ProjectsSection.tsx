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
    category: "Application Security / Penetration Testing",
    description: "Blackbox penetration testing and remediation of two critical flaws (SQL Injection and IDOR) in a custom Node.js REST API with a PostgreSQL database.",
    tech: ["Node.js (Express)", "PostgreSQL", "SQLi", "IDOR", "Parameterized Queries", "Nmap", "cURL", "OWASP"],
    details: "Identified and exploited a **CRITICAL SQL Injection** (Tautology Attack) to bypass authentication and an **IDOR** flaw to access secret data via UUID enumeration. Remediation involved implementing **Parameterized Queries** to prevent SQLi and integrating **Object Level Authorization Checks** in the controller layer to mitigate IDOR, significantly raising the security posture.",
    demoLink: "https://github.com/DHard4114/PenetrationTesting_InsecureDirectObjectReference",
    imageURL: "/Pentest.png",
  },
  {
    title: "AimTention: 3D FPS Aim Trainer & Performance Tracker",
    year: "2024",
    category: "Game Development / Interactive Simulation",
    description: "A dedicated 3D game trainer built on Unity to enhance player aiming, reflexes, and precision for First-Person Shooter (FPS) games through various modes like Normal Mode and the high-speed Flick Mode.",
    tech: ["Unity 3D", "C#", "FPS Simulation", "Flick Mode", "Performance Metrics"],
    details: "Developed based on 'Realism and Relevance' design pillars, the game features a dynamic target spawning system and two core training modes. **Normal Mode** is a basic gridshot for speed and accuracy (two static targets). **Flick Mode** is a high-speed trainer (single, random, short-lifetime target) focused on reflexes. Results provide detailed metrics (Score, Accuracy, Shots Fired) for player motivation and progress tracking.",
    demoLink: "https://github.com/Tinkermannn/Aim-Tention",
    imageURL: "/AimTention.png",
  },
];


  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const p = projects[current];

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const shortDescription = truncateText(p.description, 120);
  const shortDetails = truncateText(p.details, 200);

  return (
    <>
      <section className="w-full">
        <div className="flex items-center justify-between mb-10">
           <div>
              <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Selected Projects</h2>
              <p className="text-neutral-500 mt-2 text-sm font-sans">Technical breakdown of recent work.</p>
           </div>
           
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
              <div 
                onClick={openModal}
                className="lg:col-span-5 bg-neutral-900 relative min-h-96 lg:min-h-125 border-b lg:border-b-0 lg:border-r border-neutral-800 overflow-hidden cursor-pointer group"
              >
                 <div className="absolute inset-0 bg-linear-to-br from-neutral-900 to-black"></div>
                 
                 {p.imageURL ? (
                      <div className="relative w-full h-full">
                          <Image
                             src={p.imageURL}
                             alt={`Screenshot of ${p.title}`}
                             fill={true}
                             sizes="(max-width: 1024px) 100vw, 40vw"
                             className="object-cover group-hover:scale-105 transition-transform duration-500"
                             priority={current === 0}
                          />
                      </div>
                 ) : (
                      <span className="relative z-10 text-9xl font-black text-neutral-700/50 select-none">
                         0{current + 1}
                      </span>
                 )}
                 
                 <div className="absolute bottom-6 left-6 z-20">
                    <a 
                      href={p.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-mono font-bold text-white bg-blue-600 px-4 py-1.5 rounded-full shadow-lg border border-blue-400/50 hover:bg-blue-500 transition-colors"
                    >
                      VIEW DEMO / REPO
                    </a>
                 </div>
                 
                 <div className="absolute top-6 right-6 z-20">
                   <button className="text-xs font-mono font-bold text-white bg-neutral-800/70 px-4 py-1.5 rounded-full border border-neutral-700/50 hover:bg-neutral-700/90 transition-colors backdrop-blur-sm">
                    SHOW DETAILS
                   </button>
                 </div>
              </div>

              <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col min-h-85 max-h-85 overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest font-sans">{p.category}</span>
                      <h3 className="text-3xl font-bold text-white leading-tight font-serif">{p.title}</h3>
                  </div>
                  <span className="text-sm font-mono text-neutral-500 border border-neutral-800 px-3 py-1 rounded-md">{p.year}</span>
                </div>
                
                <div className="space-y-8 overflow-hidden">
                  <div>
                      <h4 className="text-sm font-bold text-neutral-300 mb-3 uppercase tracking-wide text-[11px] font-sans">DESCRIPTION</h4>
                          <p className="text-neutral-400 leading-relaxed text-base text-justify font-sans line-clamp-3">
                            {shortDescription}
                          </p>
                  </div>
                  
                  <div>
                      <h4 className="text-sm font-bold text-neutral-300 mb-3 uppercase tracking-wide text-[11px] font-sans">TECHNICAL DETAIL</h4>
                          <p className="text-sm text-neutral-500 leading-relaxed border-l-2 border-neutral-800 pl-4 text-justify font-sans line-clamp-4">
                            {shortDetails}
                          </p>
                  </div>

                  <div className="mt-auto pt-8">
                      <div className="flex flex-wrap gap-3">
                          {p.tech.map((t, i) => (
                          <span key={i} className="text-xs font-mono font-medium text-neutral-300 bg-neutral-800/70 border border-neutral-700/50 px-3 py-2 rounded-lg hover:text-white hover:border-neutral-600 transition-colors cursor-default backdrop-blur-sm">
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden font-sans"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative h-96 md:h-125">
                {p.imageURL && (
                  <Image
                    src={p.imageURL}
                    alt={`Full size screenshot of ${p.title}`}
                    fill={true}
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>
              
              <div className="p-8 border-t border-neutral-800">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif">{p.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">{p.category}</span>
                      <span className="text-sm font-mono text-neutral-500">•</span>
                      <span className="text-sm font-mono text-neutral-500">{p.year}</span>
                    </div>
                  </div>
                  <a
                    href={p.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition-colors"
                  >
                    OPEN PROJECT
                  </a>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300 mb-3 uppercase tracking-wide">DESCRIPTION</h4>
                    <p className="text-neutral-300 leading-relaxed">{p.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300 mb-3 uppercase tracking-wide">TECHNICAL DETAIL</h4>
                    <p className="text-neutral-400 leading-relaxed">{p.details}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300 mb-3 uppercase tracking-wide">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-3">
                      {p.tech.map((t, i) => (
                        <span key={i} className="text-sm font-mono font-medium text-neutral-300 bg-neutral-800/70 border border-neutral-700/50 px-3 py-2 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}