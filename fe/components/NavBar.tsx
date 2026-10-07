"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/data/translations'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language].nav

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: t.home, href: '/', icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: t.experience, href: '/#experience', icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: t.projects, href: '/#projects', icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: t.skills, href: '/#skills', icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { name: t.contact, href: '/#contact', icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ]

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Top) --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-white/5 py-3' : 'bg-transparent border-transparent py-4'}`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-white group cursor-pointer font-serif">
               D<span className="text-neutral-600 group-hover:text-emerald-500 transition-colors">H.</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6 bg-neutral-900/50 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                {links.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors relative"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Language Switcher Button (Desktop) */}
              <button
                type="button"
                onClick={toggleLanguage}
                title={language === 'en' ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-neutral-900/60 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all font-mono text-[10px] tracking-wider cursor-pointer"
              >
                <span className={language === 'en' ? "text-emerald-400 font-bold" : "text-neutral-500 hover:text-neutral-300"}>EN</span>
                <span className="text-neutral-600">/</span>
                <span className={language === 'id' ? "text-emerald-400 font-bold" : "text-neutral-500 hover:text-neutral-300"}>ID</span>
              </button>
            </div>
        </div>
      </motion.nav>

      {/* --- MOBILE NAVIGATION (Bottom Dock) --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
        <div className="glass rounded-2xl p-2 flex items-center justify-around shadow-2xl shadow-black/50">
           {links.map((link) => (
             <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center w-12 h-12 gap-1 text-neutral-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={link.icon} />
                </svg>
                <span className="text-[8px] font-bold uppercase tracking-wide truncate max-w-11 text-center">{link.name}</span>
             </Link>
           ))}

           {/* Mobile Language Switcher */}
           <button 
             type="button"
             onClick={toggleLanguage}
             className="flex flex-col items-center justify-center w-11 h-12 gap-1 text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
             title={language === 'en' ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
           >
             <span className="font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/40 rounded px-1.5 py-0.5 bg-emerald-950/40">
               {language.toUpperCase()}
             </span>
             <span className="text-[7px] uppercase tracking-wider text-neutral-500">LANG</span>
           </button>
        </div>
      </div>
    </>
  )
}