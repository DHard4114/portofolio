/**
 * @file app/layout.tsx
 * @description Root layout for Next.js app
 * @module App/Layout
 * 
 * Sets up global fonts, styles, and wraps the application with ClientRoot
 * to provide the "System Boot" and "Cyber Cursor" experience.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */
import type { Metadata, Viewport } from "next";
import ClientRoot from '../components/ClientRoot'
import { Space_Grotesk, Cormorant_Garamond, JetBrains_Mono } from "next/font/google"; 
import "./globals.css";

// 1. Font Utama (Headings, Buttons) - Kesan Teknikal & Modern
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// 2. Font Aksen (Nama, Quotes) - Kesan Mewah & Tajam
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// 3. Font Data (Dashboard, Terminal) - Kesan Hacker
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daffa Hardhan | Engineering Portfolio",
  description: "Computer Engineering portfolio featuring Embedded Systems, IoT Architecture, and Full-stack solutions.",
  keywords: ["Computer Engineering", "IoT", "FPGA", "Web Development", "Portfolio", "Daffa Hardhan"],
  authors: [{ name: "Daffa Hardhan" }],
  icons: {
    icon: "/favicon.ico", // Pastikan ada favicon di folder public
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Mencegah zoom di mobile agar experience seperti native app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth no-scrollbar">
      <body
        className={`${spaceGrotesk.variable} ${cormorant.variable} ${jetbrains.variable} antialiased bg-[#050505] text-neutral-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-50 overflow-x-hidden`}
      >
        {/* 
          ClientRoot menangani:
          1. SystemBoot (Loading Screen)
          2. CyberCursor (Custom Mouse)
          3. AnalyticsTracker (Page Tracking)
        */}
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}