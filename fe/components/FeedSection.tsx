/**
 * @file components/FeedSection.tsx
 * @description News section with interactive spotlight cards and holographic aesthetics
 * @module Components/FeedSection
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import Image from "next/image"
import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion"

// Data Feeds
const feeds = [
  {
    id: "LOG_01",
    title: "1st Place Solo Guitar Competition",
    date: "May 2023",
    category: "Art & Music",
    image: "/GitarSolo.jpg", 
    description: "Secured 1st Place at the District level and 3rd Place at the Provincial level, demonstrating disciplined practice and artistic expression.",
    link: "https://drive.google.com/file/d/1AIaicZ3YU5elLOHoMXtU2TB0sozERE7V/view?usp=sharing"
  },
  // Placeholder untuk tes grid (bisa di-uncomment jika ada data baru)
  /*
  {
    id: "LOG_02",
    title: "System Upgrade v2.0",
    date: "Dec 2025",
    category: "Development",
    image: "", 
    description: "Successfully deployed the new portfolio architecture with enhanced security protocols and real-time analytics.",
    link: "#"
  }
  */
]

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

export default function FeedSection() {
  return (
    <section className="w-full">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-900 pb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-sm animate-pulse shadow-[0_0_10px_#a855f7]"></span>
              <span className="text-[10px] font-bold text-purple-500 tracking-[0.2em] uppercase">Data Stream</span>
           </div>
           <h2 className="text-4xl font-bold text-white tracking-tight font-serif leading-none">News & Awards</h2>
        </div>
        <div className="hidden md:block text-right">
           <span className="text-[10px] font-mono text-neutral-600 block">ENCRYPTED CONNECTION</span>
           <span className="text-[10px] font-mono text-neutral-600 block">SYNCING...</span>
        </div>
      </div>
      
      {/* GRID LAYOUT */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group/grid"
      >
        {feeds.map((feed, idx) => (
          <SpotlightCard key={idx} feed={feed} />
        ))}
      </motion.div>
    </section>
  )
}

// --- SUB COMPONENT: SPOTLIGHT CARD ---

function SpotlightCard({ feed }: { feed: typeof feeds[0] }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.a
      variants={cardVariants}
      href={feed.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className="group/card relative flex flex-col h-full bg-neutral-900/20 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors duration-300"
    >
      {/* 1. Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/card:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. Image Area with Holographic FX */}
      <div className="relative h-56 w-full bg-black overflow-hidden border-b border-neutral-800 z-0">
        {feed.image ? (
          <>
            <Image 
              src={feed.image} 
              alt={feed.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-70 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out grayscale group-hover/card:grayscale-0" 
            />
            {/* Scanline/Noise Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_3px] pointer-events-none opacity-40 mix-blend-overlay"></div>
          </>
        ) : (
          // Fallback Visual
          <div className="w-full h-full flex items-center justify-center relative">
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]"></div>
             <div className="flex flex-col items-center gap-2 opacity-30">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">IMAGE_NOT_FOUND</span>
             </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/20 rounded">
            {feed.category}
          </span>
        </div>

        {/* ID Tag */}
        <div className="absolute top-4 right-4 z-20">
            <span className="text-[8px] font-mono text-white/50 bg-black/50 px-1 rounded">{feed.id}</span>
        </div>
      </div>

      {/* 3. Content Area */}
      <div className="p-6 flex flex-col flex-1 relative z-20">
        {/* Tech Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-600 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-600 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono text-purple-400 bg-purple-900/10 px-2 py-0.5 rounded border border-purple-500/20">{feed.date}</span>
          <div className="h-px flex-1 bg-neutral-800 group-hover/card:bg-neutral-700 transition-colors"></div>
        </div>
        
        <h3 className="font-bold text-xl text-white mb-3 leading-snug font-serif group-hover/card:text-purple-200 transition-colors">
          {feed.title}
        </h3>
        
        <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3">
          {feed.description}
        </p>
        
        {/* Footer / Action */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800/50">
          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest group-hover/card:text-white transition-colors">Access Record</span>
          <div className="flex items-center gap-1 group/icon">
             <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover/card:bg-purple-500 transition-colors"></span>
             <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover/card:bg-purple-500 transition-colors delay-75"></span>
             <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover/card:bg-purple-500 transition-colors delay-100"></span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}