/**
 * @file app/layout.tsx
 * @description Root layout for Next.js app
 * @module App/Layout
 *
 * Sets up global fonts, styles, and client-side analytics wrapper.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
import type { Metadata } from "next";
import ClientRoot from '../components/ClientRoot'
import { Space_Grotesk, Cormorant_Garamond, JetBrains_Mono } from "next/font/google"; // Import font baru
import "./globals.css";

// 1. Font Utama (Headings, Buttons) - Kesan Teknikal & Modern
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// 2. Font Aksen (Nama, Quotes) - Kesan Mewah & Tajam
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// 3. Font Data (Dashboard, Terminal) - Kesan Hacker
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
  title: "Daffa Hardhan | Portfolio",
  description: "High-performance digital systems and embedded solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        // Masukkan variable font ke body class
        className={`${spaceGrotesk.variable} ${cormorant.variable} ${jetbrains.variable} antialiased bg-[#050505] font-sans`}
      >
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}