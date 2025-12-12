/**
 * @file components/ContactSection.tsx
 * @description Contact form and availability
 * @module Components/ContactSection
 *
 * Contact form and current availability status for collaboration.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { postContact } from '@/service/api'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string | null }>({ type: null, msg: null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, msg: null })

    try {
      const res = await postContact(form)
      
      if (res.success) {
        setStatus({ type: 'success', msg: res.message || 'Transmission Successful.' })
        setForm({ name: '', email: '', subject: '', message: '' })
      }
    } catch (err) {
      // FIX: Menghapus 'any' dan menggunakan Type Checking yang aman
      const errorMessage = err instanceof Error ? err.message : 'Transmission Failed.'
      setStatus({ type: 'error', msg: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Kolom Kiri: Info & Availability */}
        <div className="lg:col-span-1">
             <h2 className="text-4xl font-bold text-neutral-200 tracking-tight mb-4 font-serif leading-tight">
                Let&apos;s Build Something <span className="text-white border-b-2 border-neutral-700 pb-1">Remarkable</span>.
             </h2>
             <p className="text-neutral-400 text-base leading-relaxed text-justify mb-8">
                Passionate about tackling complex challenges in Embedded Systems, IoT, and Full-stack Development. Open to exploring opportunities that push technological boundaries.
             </p>
             
             <div className="mt-8 border-t border-neutral-900 pt-8">
                <div className="text-xs font-bold text-neutral-500 uppercase mb-5 tracking-widest">Current Availability</div>
                <div className="flex flex-col gap-4">
                    
                    {/* Status 1: Internship (Highlight Hijau Halus) */}
                    <div className="flex items-center gap-3 text-sm font-medium text-white group w-fit">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-neutral-200 group-hover:text-white transition-colors">Seeking Full-time Internships</span>
                    </div>

                    {/* Status 2: Research (Monokrom) */}
                    <div className="flex items-center gap-3 text-sm font-medium text-neutral-500 group w-fit">
                         <div className="h-2 w-2 rounded-full border border-neutral-600 bg-neutral-800"></div>
                         <span className="group-hover:text-neutral-300 transition-colors">Research Collaborations</span>
                    </div>

                    {/* Status 3: Freelance (Monokrom) */}
                    <div className="flex items-center gap-3 text-sm font-medium text-neutral-500 group w-fit">
                         <div className="h-2 w-2 rounded-full border border-neutral-600 bg-neutral-800"></div>
                         <span className="group-hover:text-neutral-300 transition-colors">Freelance Projects</span>
                    </div>
                </div>
             </div>
        </div>

        {/* Kolom Kanan: Form with Floating Labels */}
        <form className="lg:col-span-2 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="relative group">
                    <input 
                        id="name" name="name" type="text" placeholder=" " 
                        value={form.name} onChange={handleChange} required
                        className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-neutral-200 focus:outline-none focus:border-white transition-colors placeholder-shown:border-neutral-800 placeholder-shown:text-neutral-600 focus:placeholder-shown:text-transparent"
                    />
                    <label htmlFor="name" className="absolute left-0 top-3 text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:font-bold pointer-events-none uppercase tracking-wider text-[10px]">
                        Your Name
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>
                </div>

                {/* Email Input */}
                <div className="relative group">
                    <input 
                        id="email" name="email" type="email" placeholder=" " 
                        value={form.email} onChange={handleChange} required
                        className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-neutral-200 focus:outline-none focus:border-white transition-colors placeholder-shown:border-neutral-800 placeholder-shown:text-neutral-600 focus:placeholder-shown:text-transparent"
                    />
                    <label htmlFor="email" className="absolute left-0 top-3 text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:font-bold pointer-events-none uppercase tracking-wider text-[10px]">
                        Email Address
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>
                </div>
            </div>

            {/* Subject Input */}
            <div className="relative group">
                <input
                    id="subject" name="subject" type="text" placeholder=" "
                    value={form.subject} onChange={handleChange} required
                    className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-neutral-200 focus:outline-none focus:border-white transition-colors placeholder-shown:border-neutral-800 placeholder-shown:text-neutral-600 focus:placeholder-shown:text-transparent"
                />
                <label htmlFor="subject" className="absolute left-0 top-3 text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:font-bold pointer-events-none uppercase tracking-wider text-[10px]">
                    Subject / Topic
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>
            </div>

            {/* Message Textarea */}
            <div className="relative group">
                <textarea
                    id="message" name="message" placeholder=" "
                    value={form.message} onChange={handleChange} minLength={10} required
                    className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-neutral-200 focus:outline-none focus:border-white transition-colors placeholder-shown:border-neutral-800 placeholder-shown:text-neutral-600 focus:placeholder-shown:text-transparent min-h-35 resize-none"
                />
                <label htmlFor="message" className="absolute left-0 top-3 text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:font-bold pointer-events-none uppercase tracking-wider text-[10px]">
                    Message Details
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>
            </div>

            {/* Submit Button & Status */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff', color: '#000000' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-neutral-900 border border-neutral-700 text-neutral-300 font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 disabled:opacity-50 w-full sm:w-auto hover:border-white"
                >
                    {loading ? 'SENDING...' : 'SEND MESSAGE'}
                </motion.button>
                
                <AnimatePresence>
                    {status.msg && (
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex items-center gap-2 text-sm px-4 py-2 rounded border ${
                                status.type === 'success' 
                                    ? 'border-emerald-900/50 text-emerald-500 bg-emerald-900/10' 
                                    : 'border-red-900/50 text-red-500 bg-red-900/10'
                            }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${status.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            {status.msg}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </form>
      </div>
    </section>
  )
}