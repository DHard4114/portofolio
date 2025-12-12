/**
 * @file components/ClientRoot.tsx
 * @description Root wrapper for client-side analytics
 * @module Components/ClientRoot
 *
 * Wraps all pages with analytics tracking for client-side navigation.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import dynamic from 'next/dynamic'

// Import AnalyticsTracker (Dynamic import bagus agar tidak memblokir render awal, tapi import biasa juga oke)
const ClientAnalyticsTracker = dynamic(() => import('./AnalyticsTracker'), { 
  ssr: false // Analytics biasanya hanya butuh di sisi client (browser)
})

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Tracker ditaruh di sini agar selalu aktif di semua halaman */}
      <ClientAnalyticsTracker />
      
      {/* Halaman/Konten Website */}
      {children}
    </>
  )
}