/**
 * @file components/ClientRoot.tsx
 * @description Root wrapper for client-side analytics and global UI effects
 * @module Components/ClientRoot
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import dynamic from 'next/dynamic'
import { LanguageProvider } from '@/context/LanguageContext'

// Dynamic Imports (SSR false agar tidak error di server)
const CyberCursor = dynamic(() => import('./CyberCursor'), { ssr: false })

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {/* 1. Custom Cursor */}
      <CyberCursor />

      {/* 2. Main Content */}
      <div>
        {children}
      </div>
    </LanguageProvider>
  )
}