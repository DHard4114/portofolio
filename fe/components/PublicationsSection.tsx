/**
 * @file components/PublicationsSection.tsx
 * @description State-of-the-art publications showcase with 3D tilt, HUD navigation, and holographic modals.
 * @module Components/PublicationsSection
 * @author Daffa Hardhan
 * @created 2025
 */

"use client"
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

// --- CONSTANTS ---
const publications = [
    {
      title: "JAILBREAK-R1: Gemma 3 Red Teaming",
      year: "Dec 2025",
      category: "AI Safety / Reinforcement Learning",
      status: "Conference Paper",
      description: "Framework Red Teaming otomatis pertama yang memungkinkan pelatihan adversarial pada model Gemma 3 menggunakan hardware kelas konsumen (Tesla T4). Menggabungkan Unsloth 4-bit quantization dan algoritma GRPO untuk mengeliminasi kebutuhan memori Critic network yang masif.",
      tech: ["Python", "PyTorch", "Unsloth", "GRPO", "TRL", "Gemma 3"],
      details: "Penelitian ini menjembatani **Resource Gap** dalam audit keamanan AI. Kami memperkenalkan **JAILBREAK-R1**, sebuah pipeline yang mengintegrasikan **Unsloth (4-bit NF4)** dan **Group Relative Policy Optimization (GRPO)** untuk memangkas penggunaan VRAM hingga **50%**. \n\nMetodologi menggunakan **Three-Stage Curriculum**: \n1. **Cold Start** (Imitation Learning dengan <think> tags), \n2. **Warm-up Exploration** (Diversity Rewards), \n3. **Hardening** (Adversarial Training). \n\nHasil: Mencapai **82% Attack Success Rate (ASR)** dengan output bahasa alami (Low Perplexity), mengungguli metode GCG dan AutoDAN, serta valid dijalankan pada **Single GPU 15GB**.",
      demoLink: "https://github.com/GanendrPratama/Jailbreak_Gemma_Research",
      imageURL: "/JailbreakR1_Architecture.png",
    },
    {
    title: "Stabilitas Massa-Pegas-Damper (RK4)",
      year: "2025",
      category: "Numerical Analysis",
      description: "Studi komputasi yang menganalisis stabilitas sistem dinamis orde dua. Mengimplementasikan algoritma Runge-Kutta Orde 4 (RK4) untuk menyelesaikan persamaan diferensial non-linear.",
      tech: ["MATLAB", "Simulink", "LaTeX", "Numerical Methods", "PID Control"],
      details: "Penelitian ini berfokus pada implementasi metode numerik **Runge-Kutta Orde 4 (RK4)** untuk menyelesaikan persamaan diferensial biasa (ODE) yang merepresentasikan sistem mekanik Massa-Pegas-Damper. Simulasi dilakukan untuk membandingkan respon sistem (**Settling Time, Overshoot**) saat menggunakan kontroler PID versus tanpa kontroler. Hasil menunjukkan bahwa RK4 memberikan akurasi tinggi dalam domain waktu diskrit, memungkinkan tuning parameter PID yang presisi.",
      demoLink: "https://github.com/DHard4114/ProyekUAS_2306161763_Daffa",
      imageURL: "/Metode Runge-Kutta.png", 
    },
    {
    title: "Implementasi Metode Newton-Raphson untuk Analisis Stabilitas Sistem Kontrol",
      year: "2025",
      category: "Numerical Computing / Control Systems",
      description: "Pengembangan perangkat lunak berbasis C untuk menganalisis stabilitas sistem massa-pegas-damper orde dua. Menggunakan metode Newton-Raphson dengan strategi adaptif untuk menentukan akar persamaan karakteristik secara presisi.",
      tech: ["C Language", "Newton-Raphson", "Control Theory", "Numerical Analysis", "Python Viz"],
      details: "Penelitian ini berfokus pada analisis numerik persamaan karakteristik **s² + 4s + (1 + K) = 0** dengan variasi parameter gain **K ∈ [0, 10]**. Implementasi algoritma mampu mengklasifikasikan sistem menjadi **Overdamped (K < 3)**, **Critically Damped (K = 3)**, dan **Underdamped (K > 3)** secara otomatis. Validasi terhadap solusi analitik menunjukkan **error relatif maksimum 6.03 × 10⁻⁷**, dengan konvergensi rata-rata dalam **5.5 iterasi**. Sistem terbukti memiliki stabilitas absolut pada seluruh rentang parameter uji.",
      demoLink: "https://github.com/Yogaarsyad/TugasPemrogramanB_Kelompok_3",
      imageURL: "/NewtonRapshon.png",
    },
];

// --- HELPER FUNCTION: PARSE BOLD TEXT ---
const parseBoldText = (text: string) => {
  if (!text) return "";
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="text-white font-bold font-sans">{part}</strong>;
    }
    return part;
  });
};

export default function PublicationsSection() {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- HANDLERS ---
  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev === publications.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? publications.length - 1 : prev - 1));
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // --- KEYBOARD NAV ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
          if (e.key === 'Escape') closeModal();
          return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, closeModal, isModalOpen]);

  const p = publications[current];

  return (
    <>
      <section className="w-full relative z-10 perspective-2000">
        
        {/* HUD HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-800 pb-6 relative">
           {/* Progress Line */}
           <motion.div 
             className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
             initial={{ width: "0%" }}
             animate={{ width: `${((current + 1) / publications.length) * 100}%` }}
             transition={{ duration: 0.5 }}
           />

           <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-800'}`}></span>
                    ))}
                 </div>
                 <span className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase">
                    Research Archive // {current + 1 < 10 ? `0${current + 1}` : current + 1}
                 </span>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight font-serif leading-none">
                Scientific Research
              </h2>
           </div>
           
           {/* HUD CONTROLS */}
           <div className="flex items-center gap-4">
              <div className="text-[10px] font-mono text-neutral-600 hidden md:block">
                 NAV_CONTROLS [← →]
              </div>
              <div className="flex gap-1">
                  <NavButton onClick={handlePrev} icon="←" />
                  <NavButton onClick={handleNext} icon="→" />
              </div>
           </div>
        </div>

        {/* 3D TILT CARD */}
        <div className="relative group">
          <AnimatePresence mode="wait">
            <PublicationCard 
                key={current} 
                pub={p} 
                openModal={openModal} 
            />
          </AnimatePresence>
        </div>

      </section>

      {/* --- IMMERSIVE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <PublicationModal pub={p} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  )
}

// --- SUB COMPONENTS ---

// 1. 3D Tilt Card Component
function PublicationCard({ pub, openModal }: { pub: typeof publications[0], openModal: () => void }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [0, 100], [2, -2]); 
    const rotateY = useTransform(x, [0, 100], [-2, 2]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            onClick={openModal}
            className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-800 bg-[#080808] overflow-hidden shadow-2xl cursor-none lg:h-137.5 relative group/card"
        >
            {/* Holographic Border Glow */}
            <div className="absolute inset-0 border border-transparent group-hover/card:border-emerald-500/20 transition-colors duration-500 pointer-events-none z-20"></div>

            {/* LEFT: VISUAL (7 Cols) */}
            <div className="lg:col-span-7 relative h-64 md:h-96 lg:h-full overflow-hidden bg-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-800">
                {pub.imageURL ? (
                    <Image
                        src={pub.imageURL}
                        alt={pub.title}
                        fill
                        className="object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                        <span className="text-8xl font-black text-neutral-800 select-none">DOC</span>
                    </div>
                )}
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-size-[4px_4px] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none opacity-50"></div>
                
                {/* Floating "Open" Cursor (Only visible on hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Access Document</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: INFO (5 Cols) */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-[#080808] relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none"></div>

                <div className="relative z-10 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 text-[9px] font-bold text-emerald-400 bg-emerald-900/10 border border-emerald-500/20 rounded uppercase tracking-wider">
                                {pub.category}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-600">{pub.year}</span>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-white font-serif leading-none mb-4 group-hover/card:text-emerald-100 transition-colors">
                            {pub.title}
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed border-l border-neutral-800 pl-4 line-clamp-4">
                            {pub.description}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">Methodology / Stack</span>
                        <div className="flex flex-wrap gap-2">
                            {pub.tech.slice(0, 5).map((t, i) => (
                                <span key={i} className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-mono hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-neutral-900 flex items-center justify-between group/btn">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest group-hover/card:text-white transition-colors">Read Full Paper</span>
                    <div className="w-8 h-8 flex items-center justify-center border border-neutral-800 bg-neutral-900 group-hover/card:bg-white group-hover/card:text-black transition-all rounded-full">
                        <svg className="w-3 h-3 transform -rotate-45 group-hover/card:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// 2. Nav Button Component
function NavButton({ onClick, icon }: { onClick: () => void, icon: string }) {
    return (
        <button onClick={onClick} className="w-10 h-10 border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-emerald-500/50 transition-all active:scale-95">
            <span className="font-mono text-lg">{icon}</span>
        </button>
    )
}

// 3. Modal Component
function PublicationModal({ pub, onClose }: { pub: typeof publications[0], onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
            </div>

            {/* Modal Content */}
            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-[#090909] border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 via-blue-500 to-purple-500 z-30"></div>

                {/* Left: Image (Scrollable on mobile) */}
                <div className="w-full md:w-1/2 bg-black relative min-h-75 border-b md:border-b-0 md:border-r border-neutral-800 group">
                    {pub.imageURL ? (
                        <Image src={pub.imageURL} alt={pub.title} fill className="object-contain p-8" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-700 font-mono">NO_IMAGE_DATA</div>
                    )}
                    
                    {/* Floating Links */}
                    {pub.demoLink && (
                        <div className="absolute bottom-6 left-6 right-6">
                            <a href={pub.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-emerald-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                Read Full Document
                            </a>
                        </div>
                    )}
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-8 lg:p-10 overflow-y-auto bg-[#090909] relative">
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-neutral-800 hover:bg-red-900/20 hover:border-red-500/50 hover:text-red-500 text-neutral-500 transition-all rounded-full z-20">
                        ✕
                    </button>

                    <div className="space-y-8 mt-4">
                        <div>
                            <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-2 block">{pub.category} /{pub.year}</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif leading-tight">{pub.title}</h2>
                        </div>

                        <div className="h-px w-full bg-neutral-800"></div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Abstract
                            </h4>
                            <p className="text-neutral-300 text-sm leading-relaxed text-justify">{pub.description}</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-1 bg-blue-500 rounded-full"></span> Technical Detail
                            </h4>
                            {/* INTEGRATED BOLD PARSING */}
                            <p className="text-neutral-300 text-sm leading-relaxed text-justify">
                                {parseBoldText(pub.details)}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-1 bg-purple-500 rounded-full"></span> Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {pub.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 border border-neutral-800 text-[10px] font-mono text-neutral-400 uppercase">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}