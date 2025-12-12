/**
 * @file components/FeedSection.tsx
 * @description News, awards, and updates section
 * @module Components/FeedSection
 *
 * Displays latest news, awards, and activities in a card grid.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import Image from "next/image"

// Data disesuaikan dengan profil Daffa (Achievement & Updates)
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

export default function FeedSection() {
  return (
    <section className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">News & Awards</h2>
        <p className="text-neutral-400 mt-2">Latest updates, achievements, and activities.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeds.map((feed, idx) => (
          <a
            href={feed.link}
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full bg-neutral-800 overflow-hidden">
              {feed.image ? (
                <Image 
                  src={feed.image} 
                  alt={feed.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ini memberitahu browser ukuran gambar yang tepat
                  className="object-cover..." 
                />
              ) : (
                // Fallback jika tidak ada gambar (Gradient Placeholder)
                <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-neutral-700 font-bold text-4xl opacity-20">NEWS</span>
                </div>
              )}
              
              {/* Badge Category */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-black/60 backdrop-blur-sm text-white border border-white/10 rounded">
                  {feed.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-neutral-500">{feed.date}</span>
                <div className="h-px w-4 bg-neutral-800"></div>
              </div>
              
              <h3 className="font-bold text-lg text-neutral-200 mb-2 leading-snug group-hover:text-white transition-colors">
                {feed.title}
              </h3>
              
              <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                {feed.description}
              </p>
              
              <div className="mt-auto flex items-center text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                Read Full Story 
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}