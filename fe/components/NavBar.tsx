/**
 * @file components/NavBar.tsx
 * @description Responsive navigation bar for portfolio
 * @module Components/NavBar
 *
 * Provides navigation links and dashboard trigger for the portfolio site.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link' // Import Link dari next/link

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: 'Experience', href: '/#experience' }, // Pakai /# agar bisa dari halaman dashboard balik ke home
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between font-serif">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white group cursor-pointer">
          D<span className="text-neutral-600 group-hover:text-emerald-500 transition-colors">H.</span>
        </Link>
        
        <div className="flex items-center gap-8">
          {/* NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DASHBOARD TRIGGER (THE COOL PART) */}
          <Link href="/dashboard">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900/50 border border-neutral-800 rounded-full hover:border-emerald-500/50 hover:bg-neutral-900 transition-all cursor-pointer group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono font-medium text-neutral-400 group-hover:text-emerald-400 transition-colors">
                    SYSTEM: ONLINE
                </span>
            </div>
          </Link>

        </div>
      </div>
    </nav>
  )
}