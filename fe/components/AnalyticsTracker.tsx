/**
 * @file components/AnalyticsTracker.tsx
 * @description Tracks page visits for analytics
 * @module Components/AnalyticsTracker
 *
 * Tracks and posts page visits to backend analytics API.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation' // Wajib pakai ini di Next.js App Router
import { postAnalyticsVisit } from '../service/api'

export default function AnalyticsTracker() {
  const pathname = usePathname() // Mendeteksi perubahan URL

  useEffect(() => {
    // Pastikan pathname ada sebelum tracking
    if (pathname) {
      // Kirim data ke API
      postAnalyticsVisit(pathname)
        .catch(err => console.error("Analytics Error:", err))
    }
  }, [pathname]) // Dependency: Jalankan ulang setiap 'pathname' berubah

  return null // Komponen ini tidak merender UI apa-apa
}