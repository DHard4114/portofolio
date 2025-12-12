/**
 * @file components/EducationSection.tsx
 * @description Education background and highlights
 * @module Components/EducationSection
 *
 * Academic history and key educational achievements.
 *
 * @author Daffa Hardhan
 * @created 2025
 */
import React from 'react'

export default function EducationSection() {
  return (
    <section className="py-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Education</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Universitas Indonesia</h3>
        <p>Bachelor of Computer Engineering, 3.31/4.00</p>
        <p className="text-sm text-gray-500">Mar 2023 - Mar 2027 (Expected)</p>
        <ul className="list-disc ml-6 text-sm mt-1">
          <li>Developed EduMate, a modern learning platform for collaborative learning.</li>
          <li>Built DashCraft, an e-commerce store for DIY Kits.</li>
          <li>Final Project: Robot Arm Control System in VHDL on FPGA.</li>
          <li>Command Line RPG Game (.NET Core), OOP Battleship (C++), 2D Space War (Unity).</li>
          <li>Solar Panel Consultation System in C.</li>
          <li>Advanced network topologies: VLAN, OSPF, EIGRP, NAT, ACL, WAN, etc.</li>
          <li>SmartGuard: Industrial IoT predictive maintenance system (ESP32, FreeRTOS, Flask API, Blynk).</li>
          <li>EventFlow: Real-time event management platform (React, Node.js, WebSockets, PostgreSQL).</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">SMAN 1 Cikande</h3>
        <p>High School Diploma in Mathematics and Natural Sciences</p>
        <p className="text-sm text-gray-500">Jan 2020 - May 2023</p>
        <ul className="list-disc ml-6 text-sm mt-1">
          <li>Quarterfinalist at OKTAN ITB 2022 (2,000 participants).</li>
          <li>1st Place (District) & 3rd Place (Province) in Solo Guitar Competition.</li>
          <li>3rd Place (Province) in Four Pillars Debate Competition.</li>
          <li>Participant in Mathematics Olympiad (district).</li>
          <li>3rd Eligible Student in school academic ranking.</li>
        </ul>
      </div>
    </section>
  )
}
