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
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { postAnalyticsVisit } from '../service/api'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  // Gunakan ref untuk mencegah double-fire di React Strict Mode (Development)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
        // Kirim data visit
        postAnalyticsVisit(pathname).catch(err => console.error(err))
        initialized.current = true
    }
  }, [pathname])

  return null
}