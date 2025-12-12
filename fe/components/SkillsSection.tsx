/**
 * @file components/SkillsSection.tsx
 * @description Technical proficiency and skills
 * @module Components/SkillsSection
 *
 * Lists technical skills and tools in categorized groups.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
"use client"
import React from 'react'

const skillCategories = [
  {
    title: "Software Development",
    skills: [
      "Next.js", "React", "TypeScript", "Node.js", 
      "Spring Boot", "Unity", "PostgreSQL", "MongoDB Atlas"
    ]
  },
  {
    title: "Embedded & IoT",
    skills: [
      "C++", "Python", "ESP32", "Arduino Uno", 
      "FPGA (VHDL)", "FreeRTOS", "Proteus", "MATLAB"
    ]
  },
  {
    title: "Network & Cybersecurity",
    skills: [
      "Kali Linux", "OWASP ZAP", "Wireshark", "Packet Tracer", 
      "VLAN / OSPF", "EIGRP", "ACL", "Tunneling"
    ]
  },
  {
    title: "DevOps, QA & Tools",
    skills: [
      "Git", "Docker", "Linux (Ubuntu)", "Trello (SDLC)", 
      "Swagger / Scalar", "JMeter", "IntelliJ IDEA", "BlueJ"
    ]
  }
]

export default function SkillsSection() {
  return (
    <section className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Technical Proficiency</h2>
        <p className="text-neutral-500 text-sm mt-2">Comprehensive toolset across hardware engineering, software development, and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-4 group">
            {/* Category Title dengan indikator garis kecil saat hover */}
            <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-white transition-colors duration-300"></span>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                {cat.title}
                </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <div 
                  key={sIdx} 
                  className="px-3 py-1.5 bg-neutral-900/50 border border-neutral-800 rounded-md text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-200 cursor-default select-none"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}