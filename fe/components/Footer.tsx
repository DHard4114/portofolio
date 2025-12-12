/**
 * @file components/Footer.tsx
 * @description Professional footer for portfolio
 * @module Components/Footer
 *
 * Contains identity, navigation, and contact links for the portfolio site.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400 py-16 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Identity & Bio (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Daffa Hardhan</h3>
              <p className="text-neutral-500 text-sm">Computer Engineering Undergraduate</p>
            </div>
            
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Developing robust digital systems and embedded solutions. 
              Bridging the gap between hardware and software with precision.
            </p>

            <div className="flex items-center gap-2 text-sm text-neutral-300 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-300"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>
          </div>

          {/* Spacer Column */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Column 2: Navigation (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Sitemap</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors duration-200" />Home</li>
              <li><Link href="/#projects" className="hover:text-white transition-colors duration-200"/>Projects</li>
              {/* Tambahkan Link Dashboard disini */}
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2" />
                  Analytics
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              </li>
              <li><Link href="/#contact" className="hover:text-white transition-colors duration-200" />Contact</li>
            </ul>
          </div>

          {/* Column 3: Connect (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:dapahardan@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  dapahardan@gmail.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/daffa-hardhan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/DHard4114" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Location */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Daffa Hardhan. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>Serang, Banten, Indonesia</span>
          </div>
        </div>
        
      </div>
    </footer>
  )
}