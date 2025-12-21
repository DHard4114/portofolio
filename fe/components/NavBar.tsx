"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: 'Home', href: '/', icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: 'Projects', href: '/#projects', icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: 'Exp', href: '/#experience', icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: 'Research', href: '/#publications', icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { name: 'Contact', href: '/#contact', icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    
  ]

  const isDashboard = pathname === '/dashboard'

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Top) --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent border-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-white group cursor-pointer font-serif">
               D<span className="text-neutral-600 group-hover:text-emerald-500 transition-colors">H.</span>
            </Link>
            
            <div className="flex items-center gap-8">
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

              <Link href="/dashboard">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer group ${isDashboard ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-neutral-900/50 border-white/10 hover:border-emerald-500/50'}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-medium text-neutral-300 group-hover:text-emerald-400 transition-colors">
                        SYS: ONLINE
                    </span>
                </div>
              </Link>
            </div>
        </div>
      </motion.nav>

      {/* --- MOBILE NAVIGATION (Bottom Dock) --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <div className="glass rounded-2xl p-2 flex items-center justify-between shadow-2xl shadow-black/50">
           {links.map((link) => (
             <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center w-14 h-12 gap-1 text-neutral-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={link.icon} />
                </svg>
                <span className="text-[9px] font-bold uppercase tracking-wide">{link.name}</span>
             </Link>
           ))}
           <div className="h-8 w-px bg-white/10 mx-1"></div>
           <Link href="/dashboard" className="flex flex-col items-center justify-center w-14 h-12 gap-1 text-emerald-500/80 hover:text-emerald-400">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
               <span className="text-[9px] font-bold">DASH</span>
           </Link>
        </div>
      </div>
    </>
  )
}