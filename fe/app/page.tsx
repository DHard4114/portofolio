/**
 * @file app/page.tsx
 * @description Main landing page for portfolio
 * @module App/Page
 *
 * Renders all main sections and orchestrates page-level animation.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"

import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import ProjectsSection from '../components/ProjectsSection'
import ExperienceSection from '../components/ExperienceSection'
import EducationSection from '../components/EducationSection'
import SkillsSection from '../components/SkillsSection'
import FeedSection from '../components/FeedSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import BackgroundFX from '../components/BackgroundFSX' // Import ini
import { motion, Variants } from 'framer-motion'

export default function Home() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.4, 0.25, 1] as const 
      }
    }
  }

  return (
    // Hapus bg-black disini karena sudah dihandle BackgroundFX
    <div className="relative min-h-screen selection:bg-emerald-500/30 selection:text-emerald-50">
      
      {/* BACKGROUND SUPER GILA DISINI */}
      <BackgroundFX />

      <NavBar />
      
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="pt-28 min-h-screen max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 xl:gap-20 px-6 lg:px-8"
      >
        {/* SIDEBAR */}
        <aside className="lg:relative">
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div variants={fadeInUp}>
              <HeroSection />
            </motion.div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-24 pb-20 w-full overflow-hidden">
          
          <motion.div variants={fadeInUp} id="experience" className="scroll-mt-32">
            <ExperienceSection />
          </motion.div>

          <motion.div variants={fadeInUp} id="education" className="scroll-mt-32 border-t border-neutral-800/50 pt-16">
            <EducationSection />
          </motion.div>

          <motion.div variants={fadeInUp} id="skills" className="scroll-mt-32 border-t border-neutral-800/50 pt-16">
            <SkillsSection />
          </motion.div>

          <motion.div variants={fadeInUp} id="projects" className="scroll-mt-32 border-t border-neutral-800/50 pt-16">
            <ProjectsSection />
          </motion.div>
          
          <motion.div variants={fadeInUp} id="feed" className="scroll-mt-32 border-t border-neutral-800/50 pt-16">
            <FeedSection />
          </motion.div>
          
          <motion.div variants={fadeInUp} id="contact" className="scroll-mt-32 border-t border-neutral-800/50 pt-16">
            <ContactSection />
          </motion.div>

        </div>
      </motion.main>
      
      <Footer />
    </div>
  )
}