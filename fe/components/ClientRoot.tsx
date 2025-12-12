/**
 * @file components/ClientRoot.tsx
 * @description Root wrapper for client-side analytics and global UI effects
 * @module Components/ClientRoot
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Dynamic Imports (SSR false agar tidak error di server)
const ClientAnalyticsTracker = dynamic(() => import('./AnalyticsTracker'), { ssr: false })
const CyberCursor = dynamic(() => import('./CyberCursor'), { ssr: false })
const SystemBoot = dynamic(() => import('./SystemBoot'), { ssr: false })

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  // Mencegah scroll saat loading screen aktif
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [loading])

  return (
    <>
      {/* 1. Analytics Tracker */}
      <ClientAnalyticsTracker />
      
      {/* 2. Custom Cursor (WAJIB ADA DISINI AGAR MUNCUL) */}
      <CyberCursor />

      {/* 3. Boot Sequence Overlay */}
      <AnimatePresence mode="wait">
        {loading && <SystemBoot onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* 4. Main Content */}
      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
         {children}
      </div>
    </>
  )
}