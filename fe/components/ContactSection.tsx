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
// Import API
import { postContact } from '@/service/api'
// Import Types dari file types/api.ts yang baru
import { CreateContactDTO, StatusState } from '@/types/api' 
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/data/translations'

export default function ContactSection() {
  const { language } = useLanguage()
  const t = translations[language].contact

  // Gunakan Tipe yang lebih aman
  const [form, setForm] = useState<CreateContactDTO>({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({ type: null, msg: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, msg: null })

    const mailtoUrl = `mailto:dapahardan@gmail.com?subject=${encodeURIComponent(
      form.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`

    try {
      if (process.env.NEXT_PUBLIC_API_BASE_URL) {
        const res = await postContact(form)
        if (res.success) {
          setStatus({ type: 'success', msg: res.message || t.form.successApi })
          setForm({ name: '', email: '', subject: '', message: '' })
          setLoading(false)
          return
        }
      }
      window.location.href = mailtoUrl
      setStatus({ type: 'success', msg: t.form.successMailto })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      window.location.href = mailtoUrl
      setStatus({ type: 'success', msg: t.form.successMailto })
      setForm({ name: '', email: '', subject: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  // Helper Function: Menggunakan Floating Label yang sudah diperbaiki
  const renderInput = (id: keyof CreateContactDTO, label: string, type: string, isTextArea: boolean = false) => (
    <div className="relative group">
        {isTextArea ? (
            <textarea
                id={id} name={id} placeholder=" "
                value={form[id] as string} onChange={handleChange} minLength={10} required
                className="peer w-full bg-transparent border-b border-neutral-800 py-5 text-neutral-200 focus:outline-none focus:border-white transition-colors 
                placeholder-shown:border-neutral-800 placeholder-shown:text-neutral-600 focus:placeholder-shown:text-transparent min-h-25 resize-none autofill:bg-transparent! autofill:text-neutral-200!"
            />
        ) : (
            <input 
                id={id} name={id} type={type} placeholder=" " 
                value={form[id] as string} onChange={handleChange} required
                className="peer w-full bg-transparent border-b border-neutral-800 py-5 text-neutral-200 focus:outline-none focus:border-white transition-colors placeholder-shown:border-neutral-800 placeholder-shown:text-neutral-600 focus:placeholder-shown:text-transparent autofill:bg-transparent! autofill:text-neutral-200!"
            />
        )}
        <label 
            htmlFor={id} 
            className="absolute left-0 top-3 text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:font-bold peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs pointer-events-none uppercase tracking-wider text-xs"
        >
            {label}
        </label>
        {/* Indikator Fokus (Garis Tebal di Bawah) */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 peer-focus:w-full"></div>
    </div>
  );

  return (
    <section className="w-full">
      {/* Autofill fix: force dark background and light text for autofilled fields */}
      <style jsx global>{`
        input:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          box-shadow: 0 0 0 1000px transparent inset !important;
          background-color: transparent !important;
          -webkit-text-fill-color: #fff !important;
          color: #fff !important;
          caret-color: #fff !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          box-shadow: 0 0 0 1000px transparent inset !important;
          background-color: transparent !important;
          -webkit-text-fill-color: #fff !important;
          color: #fff !important;
        }
      `}</style>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Kolom Kiri: Info & Availability */}
        <div className="lg:col-span-1">
             <h2 className="text-4xl font-bold text-neutral-200 tracking-tight mb-4 font-serif leading-tight">
                {t.headingLine1} <span className="text-white border-b-2 border-neutral-700 pb-1">{t.headingLine2}</span>
             </h2>
             <p className="text-neutral-400 text-base leading-relaxed text-justify mb-8">
                {t.description}
             </p>
             
             <div className="mt-8 border-t border-neutral-900 pt-8">
                <div className="text-xs font-bold text-neutral-500 uppercase mb-5 tracking-widest">{t.availabilityTitle}</div>
                <div className="flex flex-col gap-4">
                    {t.availabilities.map((item, idx) => (
                      item.highlight ? (
                        <div key={idx} className="flex items-center gap-3 text-sm font-medium text-white group w-fit">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-neutral-200 group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                      ) : (
                        <div key={idx} className="flex items-center gap-3 text-sm font-medium text-neutral-500 group w-fit">
                            <div className="h-2 w-2 rounded-full border border-neutral-600 bg-neutral-800"></div>
                            <span className="group-hover:text-neutral-300 transition-colors">{item.label}</span>
                        </div>
                      )
                    ))}
                </div>
             </div>
        </div>

        {/* Kolom Kanan: Form yang ringkas menggunakan renderInput */}
        <form className="lg:col-span-2 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderInput('name', t.form.nameLabel, 'text')}
                {renderInput('email', t.form.emailLabel, 'email')}
            </div>

            {renderInput('subject', t.form.subjectLabel, 'text')}
            {renderInput('message', t.form.messageLabel, 'text', true)}

            {/* Submit Button & Status */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff', color: '#000000' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 disabled:opacity-50 w-full sm:w-auto hover:bg-neutral-200 cursor-pointer"
                >
                    {loading ? t.form.sendingBtn : t.form.submitBtn}
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