/**
 * @file components/FeedSection.tsx
 * @description News, awards, and updates section with staggered animations
 * @module Components/FeedSection
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

// Data Feeds
const feeds = [
  {
    title: "1st Place Solo Guitar Competition",
    date: "May 2023",
    category: "Art & Music",
    image: "/GitarSolo.jpg", 
    description: "Secured 1st Place at the District level and 3rd Place at the Provincial level, demonstrating disciplined practice and artistic expression.",
    link: "https://drive.google.com/file/d/1AIaicZ3YU5elLOHoMXtU2TB0sozERE7V/view?usp=sharing"
  },
]

// Animation Variants - Typed correctly
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function FeedSection() {
  return (
    <section className="w-full">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-neutral-900 pb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-sm animate-pulse"></span>
              <span className="text-[10px] font-bold text-purple-500 tracking-[0.2em] uppercase">Updates</span>
           </div>
           <h2 className="text-4xl font-bold text-white tracking-tight font-serif leading-none">News & Awards</h2>
        </div>
        <p className="text-neutral-500 text-xs font-mono text-right max-w-xs hidden md:block">
           LATEST ACTIVITIES // <br/> ACHIEVEMENTS LOG
        </p>
      </div>
      
      {/* GRID LAYOUT */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {feeds.map((feed, idx) => (
          <FeedCard key={idx} feed={feed} />
        ))}
      </motion.div>
    </section>
  )
}

// --- SUB COMPONENT: FEED CARD ---

function FeedCard({ feed }: { feed: typeof feeds[0] }) {
  return (
    <motion.a
      variants={cardVariants}
      href={feed.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 hover:bg-neutral-900/60 transition-all duration-300 h-full"
    >
      {/* 1. Image Area */}
      <div className="relative h-48 w-full bg-neutral-950 overflow-hidden border-b border-neutral-800/50">
        {feed.image ? (
          <Image 
            src={feed.image} 
            alt={feed.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" 
          />
        ) : (
          // Fallback Visual (Abstract Pattern)
          <div className="w-full h-full flex items-center justify-center relative">
             {/* FIX: Updated to canonical class bg-size-[...] */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]"></div>
             <div className="flex flex-col items-center gap-2 opacity-30">
                <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-[10px] font-mono uppercase tracking-widest">No Visual</span>
             </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-[9px] uppercase font-bold tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/10 rounded shadow-lg">
            {feed.category}
          </span>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-5 flex flex-col flex-1 relative">
        {/* Date Line */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-purple-400">{feed.date}</span>
          <div className="h-px flex-1 bg-neutral-800 group-hover:bg-neutral-700 transition-colors"></div>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg text-white mb-2 leading-snug font-serif group-hover:text-purple-200 transition-colors">
          {feed.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3">
          {feed.description}
        </p>
        
        {/* Footer / Action */}
        <div className="mt-auto flex items-center justify-between border-t border-neutral-800/50 pt-4">
          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-neutral-400 transition-colors">Read Details</span>
          <div className="w-6 h-6 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-900/20 transition-all">
             <svg className="w-3 h-3 text-neutral-500 group-hover:text-purple-400 transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          </div>
        </div>
      </div>
    </motion.a>
  )
}