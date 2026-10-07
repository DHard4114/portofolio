/**
 * @file data/translations.ts
 * @description Complete hardcoded bilingual dictionary (EN & ID) for the portfolio.
 * Strict adherence to manual translation without machine translation libraries.
 */

export interface ProjectData {
  title: string
  year: string
  category: string
  description: string
  tech: string[]
  details: string
  demoLink?: string
  imageURL: string
}

export interface ExperienceModuleData {
  title: string
  period: string
  category: string
  company: string
  role: string
  description: string
  tech: string[]
  details: string
  imageURL: string
  demoLink?: string
}

export interface OrgExperienceData {
  company: string
  role: string
  period: string
  current: boolean
  location: string
  description: string
}

export interface SkillCategoryData {
  id: string
  title: string
  desc: string
  skills: string[]
}

export interface EducationData {
  school: string
  degree: string
  gpa: string | null
  period: string
  status: string
  location: string
  current: boolean
  highlights: {
    label: string
    desc: string
  }[]
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      experience: "Exp",
      skills: "Skills",
      contact: "Contact",
      availableForWork: "AVAILABLE FOR WORK",
      langToggleText: "EN",
      langToggleAlt: "Switch to Indonesian",
    },
    hero: {
      status: "Open",
      firstName: "Daffa",
      lastName: "Hardhan.",
      subRole: "Computer Engineering @ UI",
      bioText: "Bridging the gap between **Hardware** and **Software**. Passionate about Embedded Systems, IoT Architecture, and scalable Full-stack solutions.",
      locationLabel: "Location",
      locationValue: "Depok, West Java, ID",
      emailLabel: "Email",
      phoneLabel: "Phone / WA",
    },
    projects: {
      hudPrefix: "Project //",
      sectionTitle: "Featured Projects",
      navControls: "NAV_CONTROLS [← →]",
      viewProject: "View Project",
      viewDetails: "View Details",
      coreTechnologies: "Core Technologies",
      modalOverview: "Overview",
      modalTechDetail: "Technical Detail",
      modalStack: "Stack",
      modalViewCode: "View Source Code",
      items: [
        {
          title: "Lab-Ku",
          year: "2026",
          category: "AI-Powered Learning Management System",
          description: "Smart LMS utilizing the Gemini API for automated curriculum generation and interactive quizzes, secured with OAuth.",
          tech: ["Next.js", "Gemini API", "Google OAuth", "Tailwind CSS", "Framer Motion"],
          details: "Lab-Ku streamlines educator workflows through **Gemini AI Integration** that generates comprehensive lesson modules and quiz question banks instantly from concise prompts. User data integrity is strictly enforced via **OAuth**, providing a seamless, secure authentication lifecycle for both educators and students.",
          demoLink: "https://lab-ku.vercel.app/",
          imageURL: "/Lab-Ku.png",
        },
        {
          title: "QuizLive: Private Cloud IaaS",
          year: "2026",
          category: "Cloud Infrastructure & DevOps",
          description: "Enterprise Private Cloud IaaS implementation powered by Apache CloudStack and KVM hypervisor hosting an isolated real-time quiz platform.",
          tech: ["Apache CloudStack", "KVM", "Ubuntu Server", "PM2 Cluster", "Node.js", "Socket.IO"],
          details: "Architected an **Enterprise-grade Private Cloud** infrastructure from the ground up using KVM and nested virtualization. Configured **Isolated Guest Networks, Source NAT, and Port Forwarding** via Virtual Routers. The system reliably hosts an interactive Node.js backend orchestrated in **PM2 Cluster Mode** to guarantee high availability and internal load balancing.",
          demoLink: "https://github.com/DHard4114/CloudStack-5",
          imageURL: "/cloudstack.png",
        },
        {
          title: "EventFlow: Crowd Safety Ecosystem",
          year: "2025",
          category: "System Architect & Full-Stack",
          description: "A collaborative crowd safety platform integrating real-time telemetry and incident reporting. Directed the engineering team across Backend and Web Dashboard layers.",
          tech: ["Node.js", "React.js", "Socket.io", "PostgreSQL", "Mapbox", "System Design"],
          details: "As **Project Lead**, spearheaded the system architecture. On the technical side, engineered the core REST and WebSocket services achieving **<8s telemetry latency**. Co-developed the Organizer Web Dashboard, implementing live Mapbox spatial visualization and incident queues with responsive real-time data sync.",
          demoLink: "https://github.com/DHard4114/EventFlow",
          imageURL: "/EventFlow.png",
        },
        {
          title: "SmartGuard: Predictive Maint.",
          year: "2025",
          category: "Industrial IoT",
          description: "IoT system for real-time machine vibration monitoring and automated emergency cutoff using ESP32 and FreeRTOS.",
          tech: ["ESP32", "MPU6050", "FreeRTOS", "Flask API"],
          details: "Sensor nodes sample tri-axial vibration profiles, triggering immediate relay cutoffs and audible alarms when thresholds breach. Sensor logs are dispatched to an event cloud dashboard, executing **edge computing** for fail-safe industrial safety response.",
          demoLink: "https://github.com/DHard4114/IOT22-SmartGuard-Industrial-Predictive-Maintenance-System",
          imageURL: "/SmartGuard1.jpg",
        },
        {
          title: "Penetration Testing & Fix",
          year: "2025",
          category: "Cybersecurity",
          description: "Blackbox penetration testing and comprehensive remediation of critical SQL Injection and IDOR vulnerabilities in a Node.js REST API.",
          tech: ["Node.js", "PostgreSQL", "SQLi", "IDOR", "OWASP"],
          details: "Identified and exploited a **CRITICAL SQL Injection** flaw (Tautology Attack) to bypass auth barriers alongside an **Insecure Direct Object Reference (IDOR)** vector exposing confidential records via UUID enumeration. Remediation involved **Parameterized Queries** and robust **Object-Level Authorization Checks** in the service layer.",
          demoLink: "https://github.com/DHard4114/PenetrationTesting_InsecureDirectObjectReference",
          imageURL: "/Pentest.png",
        },
        {
          title: "Multi-Campus Network Arch",
          year: "2025",
          category: "Network Engineering",
          description: "Designed a resilient multi-campus enterprise network topology using Cisco hierarchical 3-layer architecture (Core, Distribution, Access).",
          tech: ["Cisco Packet Tracer", "VLAN", "OSPF", "STP"],
          details: "Implemented VLAN segmentation, Inter-VLAN Routing, and Spanning Tree Protocol (STP) for loop-free topological redundancy and rapid failover. Integrated essential enterprise services including central DNS, Web hosts, and Mail servers.",
          demoLink: "https://github.com/DHard4114/Multi-Campus-Enterprise-Network-Deployment",
          imageURL: "/Topologi1.png",
        },
        {
          title: "Robotic Arm Control System",
          year: "2024",
          category: "FPGA / Digital System",
          description: "Robotic arm controller implemented in VHDL on FPGA, featuring autonomous 3D spatial navigation, Euclidean distance logic, and FSM orchestration.",
          tech: ["VHDL", "FPGA", "ModelSim", "Quartus"],
          details: "Engineered around the primary **'RobotArmFPGA' entity**, integrating an asynchronous Input Decoder and synchronous Navigator unit for hardware-accelerated Euclidean distance calculations. Motion execution states are managed with a strict Finite State Machine (FSM).",
          demoLink: "https://github.com/DHard4114/PA27_PSD",
          imageURL: "/ArmRobot.jpg",
        },
        {
          title: "AimTention: FPS Trainer",
          year: "2024",
          category: "Game Development",
          description: "Specialized 3D training game engineered in Unity to refine player target acquisition, reflexes, and flick precision for competitive FPS titles.",
          tech: ["Unity 3D", "C#", "FPS Simulation", "Flick Mode"],
          details: "Designed upon 'Realism and Relevance' ergonomic pillars. Features **Normal Mode** (precision gridshots) and **Flick Mode** (rapid reflex tracking) paired with granular session analytics and accuracy feedback.",
          demoLink: "https://github.com/Tinkermannn/Aim-Tention",
          imageURL: "/AimTention.png",
        },
      ] as ProjectData[],
    },
    experience: {
      hudPrefix: "Work Experience //",
      sectionTitle: "End-to-End System Migration",
      companySubtitle: "Universitas Indonesia (Jan 2026 - Present)",
      navControls: "NAV_CONTROLS [← →]",
      viewDetail: "View System Detail",
      inspectModule: "Inspect Module",
      coreTechnologies: "Core Technologies",
      accessSite: "Access sinergi1.ui.ac.id",
      modalOverview: "System Overview",
      modalTechDetail: "Architecture & Engineering Detail",
      modalStack: "Tech Stack",
      orgHistoryTitle: "Organizational & Leadership History",
      modules: [
        {
          title: "Proxmox VE Server Cluster & Infrastructure Migration",
          period: "Jan 2026 - Present",
          category: "Server Virtualization & Bare-Metal Infra",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Complete infrastructure migration to the new dedicated server environment powered by Proxmox VE hypervisor, ensuring workload isolation, storage resilience, and campus telemetry uptime.",
          tech: ["Proxmox VE", "KVM Hypervisor", "LXC Containers", "ZFS Storage", "Linux Cluster", "Virtual Networking"],
          details: "Architected and executed the **Full New Server Infrastructure Migration** utilizing **Proxmox Virtual Environment (VE)** as the core virtualization hypervisor for sinergi1.ui.ac.id. Configured **LXC containers** and **KVM virtual machines**, high-performance storage pools, virtual network bridging/VLAN segmentation, and isolated resource allocation (vCPU/RAM) to sustain high-cadence sensor telemetry pipelines, PostgreSQL databases, and the web application interface with zero service disruption.",
          imageURL: "/proxmox-newserver.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Commercial Reconciliation & Register Billing",
          period: "Jan 2026 - Present",
          category: "Financial Telemetry & Audit",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Official campus financial energy audit system reading physical EDMI chip register accumulators to reconcile monthly commercial utility bills exceeding Rp 566.5M across 13 faculties.",
          tech: ["EDMI Protocol", "Billing Engine", "Next.js", "PostgreSQL", "WBP/LWBP Audit", "Tailwind CSS"],
          details: "Engineered the **Automated Commercial Reconciliation** module comparing physical hardware accumulators (EDMI Register Chips) against hourly operational load profiles. Audits university-wide monthly electricity billing of **Rp 566,549,061.84**, segmenting peak tariff **WBP (18:00-22:00: Rp 87.6M)** from off-peak **LWBP (22:00-18:00: Rp 478.8M)**, and tracking **Peak Demand of 2,656.400 kW** across all 13 academic faculties.",
          imageURL: "/register-billing.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Real-Time Telemetry & Active Power Stream",
          period: "Jan 2026 - Present",
          category: "Real-Time Sensor & Waveform Pipeline",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Low-latency (<45s cadence) telemetry pipeline streaming instant active power and substation electrical vector diagnostics with automated anomaly warning alarms.",
          tech: ["WebSocket", "Real-Time Telemetry", "Alarm Automation", "Vector Diagnostics", "TypeScript", "Tailwind CSS"],
          details: "Real-time telemetry pipeline polling substation vector sensors at **45-second intervals**. Monitors **Total Active Power (392.10 kW)**, daily load envelope (avg 174.09 kW, peak 404.30 kW), **Frequency (50.03 Hz)**, **Internal Enclosure Temperature (34.0°C)**, and **Power Factor (0.965)**. Integrated with an **Automated Alarm Engine** flagging anomalies such as *Lid Tamper*, *Asymmetric Power*, *Incorrect Phase Rotation*, and *Pulsing Output Overflow*.",
          imageURL: "/dashbord-2.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Historical Analytics & 3-Phase Load Profiling",
          period: "Jan 2026 - Present",
          category: "Load Profiling & 3-Phase Electrical Math",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Comprehensive analytical platform evaluating hourly load curves and 3-Phase voltage/current balance to maximize transformer efficiency and campus grid stability.",
          tech: ["3-Phase Math", "Time-Series Analytics", "Load Balancing", "Vector Analysis", "Data Visualization"],
          details: "Developed time-series analytics visualizing historical hourly consumption (total active usage of **1,607.00 kWh**, peak load of **374.00 kWh** at 10:00). Computes **3-Phase Voltage/Current Balance (R-S-T)** with an average line voltage of **235.3 V** (Phase R: 235.0 V, Phase S: 236.6 V, Phase T: 234.3 V) and **Power Factor 0.990** to safeguard facility transformers from unbalanced thermal degradation.",
          imageURL: "/dashbord-3.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Energy Consumption & Carbon Emissions Dashboard",
          period: "Jan 2026 - Present",
          category: "Campus EMS & ESG Sustainability",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Unified console tracking daily electricity consumption, real-time operational utility expenditure forecasts, and campus-wide carbon footprint metrics.",
          tech: ["ESG Modeling", "Carbon Footprint", "Next.js", "Predictive Cost", "Tailwind CSS"],
          details: "Delivers a *single pane of glass* for campus management to monitor granular building-level electricity consumption (such as the Rectorate Central Building). Aggregates **Daily Energy Consumption (1,607.00 kWh)**, translates into an **Estimated Daily Utility Cost (Rp 2,273,921.07)**, and calculates the **Carbon Emission Footprint (1,285.6 kg CO2)** using standardized emissions models in support of *Green Campus UI*.",
          imageURL: "/dashbord-1.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Substation Management & Campus Meter Fleet",
          period: "Jan 2026 - Present",
          category: "Infrastructure & Fleet Management",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Centralized catalog mapping 37 electrical substation meters, hardware parameters, device provisioning, and maintenance lifecycle states.",
          tech: ["Fleet Management", "Substation Routing", "Device Registration", "Hardware Inventory", "Status Tracking"],
          details: "Orchestrates the operational inventory database of all metering equipment across Universitas Indonesia encompassing **37 substation units & fleet meters**. Displays real-time device health (**18 active normal meters / 48.6% of fleet**, **19 scheduled under maintenance**, **0 units offline**). Powers zoning by area (Rectorate, FKM, FIK, FTUI, FEB) with rapid device onboarding, chip serial validation, and deep-linked live telemetry feeds.",
          imageURL: "/fleet-meter.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
      ] as ExperienceModuleData[],
      otherExperiences: [
        {
          company: "Ikatan Mahasiswa Elektro (IME FTUI)",
          role: "Secretary Expert Staff",
          period: "Mar 2025 - Dec 2025",
          current: false,
          location: "Depok, ID",
          description: "Optimized administrative workflows and mentored junior staff in accountability reporting standards. Streamlined organizational documentation protocols.",
        },
        {
          company: "National Electrical Summit UI 2024",
          role: "General Secretary",
          period: "Jul 2024 - Mar 2025",
          current: false,
          location: "Depok, ID",
          description: "Managed external correspondence and standardized operational documents for a national-level engineering summit. Coordinated cross-divisional communication channels.",
        },
      ] as OrgExperienceData[],
    },
    skills: {
      heading: "Technical Proficiency",
      subBadge: "Core Technical Stack",
      domainCount: "4 DOMAINS",
      domainSub: "HARDWARE & SOFTWARE",
      categories: [
        {
          id: "01",
          title: "LANGUAGES & CORE",
          desc: "Polyglot Programming Foundation",
          skills: ["JavaScript", "TypeScript", "C", "C++", "C#", "Java", ".NET", "Python", "Assembly"],
        },
        {
          id: "02",
          title: "WEB & GAME ENGINE",
          desc: "Frontend, Backend & Interactive 3D",
          skills: ["Next.js 15", "React", "Vite", "Node.js (Express)", "JWT Auth", "Socket.io", "Prisma ORM", "Unity 3D", "Tailwind"],
        },
        {
          id: "03",
          title: "DATA & INFRA",
          desc: "Database, Cloud & DevOps Architecture",
          skills: ["PostgreSQL", "PostGIS", "Neon DB", "MongoDB", "Docker", "Linux/Unix", "Git", "CI/CD"],
        },
        {
          id: "04",
          title: "HARDWARE & SEC",
          desc: "Embedded Systems & Cybersecurity",
          skills: ["ESP32", "Arduino", "FPGA (VHDL)", "FreeRTOS", "MQTT", "BLE", "LORA", "Kali Linux", "Wireshark", "Packet Tracer", "OWASP"],
        },
      ] as SkillCategoryData[],
    },
    education: {
      heading: "Education",
      subBadge: "Academic Background",
      items: [
        {
          school: "Universitas Indonesia",
          degree: "Bachelor of Computer Engineering",
          gpa: null,
          period: "2023 - 2027",
          status: "Expected",
          location: "Depok, ID",
          current: true,
          highlights: [
            {
              label: "Core Concentration",
              desc: "Embedded Systems, Hardware-Software Co-design, Industrial IoT.",
            },
            {
              label: "Key Coursework",
              desc: "Network Eng (CCNA), FPGA Design (VHDL), OS, Data Structures.",
            },
            {
              label: "Laboratory",
              desc: "Digital Systems & Embedded Networking Labs.",
            },
          ],
        },
        {
          school: "SMAN 1 Cikande",
          degree: "Mathematics & Natural Sciences",
          gpa: "Top 3 Rank",
          period: "2020 - 2023",
          status: "Graduated",
          location: "Serang, ID",
          current: false,
          highlights: [
            {
              label: "Academic",
              desc: "Quarterfinalist OKTAN ITB 2022 (National Chem), Math Olympiad.",
            },
            {
              label: "Non-Academic",
              desc: "1st Place Guitar Solo (District), 3rd Place Guitar Solo (Province).",
            },
          ],
        },
      ] as EducationData[],
    },
    contact: {
      headingLine1: "Let's Build Something",
      headingLine2: "Remarkable.",
      description: "Passionate about tackling complex challenges in Embedded Systems, IoT, and Full-stack Development. Open to exploring opportunities that push technological boundaries.",
      availabilityTitle: "Current Availability",
      availabilities: [
        { label: "Seeking Full-time Internships", highlight: true },
        { label: "Research Collaborations", highlight: false },
        { label: "Freelance Projects", highlight: false },
      ],
      form: {
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        subjectLabel: "Subject / Topic",
        messageLabel: "Message Details",
        submitBtn: "SEND MESSAGE",
        sendingBtn: "SENDING...",
        successApi: "Message Sent Successfully.",
        successMailto: "Message prepared in Email Client.",
      },
    },
    footer: {
      brandSub: "COMPUTER ENGINEERING @ UNIVERSITAS INDONESIA",
      status: "OPEN TO WORK & COLLABORATION",
      navColTitle: "NAVIGATION",
      connectColTitle: "CONNECT",
      links: {
        home: "HOME",
        projects: "PROJECTS",
        experience: "EXPERIENCE",
        skills: "SKILLS",
        contact: "CONTACT",
      },
      locationBadge: "DEPOK, INDONESIA",
    },
  },

  id: {
    nav: {
      home: "Beranda",
      projects: "Proyek",
      experience: "Pengalaman",
      skills: "Keahlian",
      contact: "Kontak",
      availableForWork: "TERBUKA UNTUK KERJA",
      langToggleText: "ID",
      langToggleAlt: "Ganti ke Bahasa Inggris",
    },
    hero: {
      status: "Tersedia",
      firstName: "Daffa",
      lastName: "Hardhan.",
      subRole: "Teknik Komputer @ UI",
      bioText: "Menghubungkan <strong class=\"text-white font-medium\">Hardware</strong> dan <strong class=\"text-white font-medium\">Software</strong>. Berdedikasi pada Embedded Systems, Arsitektur IoT, dan solusi Full-stack berskala besar.",
      locationLabel: "Lokasi",
      locationValue: "Depok, Jawa Barat, ID",
      emailLabel: "Email",
      phoneLabel: "Telepon / WA",
    },
    projects: {
      hudPrefix: "Proyek //",
      sectionTitle: "Proyek Unggulan",
      navControls: "KONTROL_NAV [← →]",
      viewProject: "Buka Proyek",
      viewDetails: "Lihat Detail",
      coreTechnologies: "Teknologi Utama",
      modalOverview: "Ringkasan",
      modalTechDetail: "Detail Teknis",
      modalStack: "Tech Stack",
      modalViewCode: "Lihat Kode Sumber",
      items: [
        {
          title: "Lab-Ku",
          year: "2026",
          category: "LMS Berbasis AI",
          description: "LMS cerdas yang memanfaatkan Gemini API untuk automasi pembuatan materi dan kuis, serta sistem autentikasi aman menggunakan OAuth.",
          tech: ["Next.js", "Gemini API", "Google OAuth", "Tailwind CSS", "Framer Motion"],
          details: "Lab-Ku memaksimalkan efisiensi pengajar dengan **Integrasi Gemini AI** yang mampu men-generate modul ajar dan soal kuis secara instan dari input topik sederhana. Keamanan data pengguna dijamin melalui **OAuth**, memberikan proses login yang seamless dan aman bagi guru maupun siswa.",
          demoLink: "https://lab-ku.vercel.app/",
          imageURL: "/Lab-Ku.png",
        },
        {
          title: "QuizLive: Private Cloud IaaS",
          year: "2026",
          category: "Infrastruktur Cloud & DevOps",
          description: "Implementasi Enterprise Private Cloud IaaS berbasis Apache CloudStack dan KVM hypervisor untuk menghosting platform kuis real-time terisolasi.",
          tech: ["Apache CloudStack", "KVM", "Ubuntu Server", "PM2 Cluster", "Node.js", "Socket.IO"],
          details: "Merancang infrastruktur **Enterprise-grade Private Cloud** dari nol menggunakan arsitektur KVM dan nested virtualization. Mengonfigurasi **Isolated Guest Network, Source NAT, dan Port Forwarding** melalui Virtual Router. Sistem ini secara aman menghosting *backend* kuis interaktif yang ditenagai oleh Node.js dan diorkestrasi menggunakan **PM2 Cluster Mode** untuk menjamin *high availability* dan *internal load balancing*.",
          demoLink: "https://github.com/DHard4114/CloudStack-5",
          imageURL: "/cloudstack.png",
        },
        {
          title: "EventFlow: Crowd Safety Ecosystem",
          year: "2025",
          category: "System Architect & Full-Stack",
          description: "Platform keamanan kerumunan kolaboratif dengan pelacakan real-time dan pelaporan AI. Memimpin tim rekayasa pada Backend dan Dashboard Web.",
          tech: ["Node.js", "React.js", "Socket.io", "PostgreSQL", "Mapbox", "System Design"],
          details: "Sebagai **Project Lead**, mengarahkan visi arsitektural. Secara teknis, membangun core Backend (REST API & WebSockets) dengan latensi **<8 detik**. Ikut mengembangkan Dashboard Web Pengelola dengan visualisasi spasial Mapbox real-time dan sinkronisasi status insiden yang responsif.",
          demoLink: "https://github.com/DHard4114/EventFlow",
          imageURL: "/EventFlow.png",
        },
        {
          title: "SmartGuard: Predictive Maint.",
          year: "2025",
          category: "Industrial IoT",
          description: "Sistem IoT pemantau getaran mesin real-time dan pemutus daya otomatis menggunakan mikrokontroler ESP32 dan FreeRTOS.",
          tech: ["ESP32", "MPU6050", "FreeRTOS", "Flask API"],
          details: "Node sensor mendeteksi getaran abnormal, gateway memicu saklar relay dan buzzer darurat, serta mencatat insiden ke cloud dashboard. Menerapkan konsep **edge computing** untuk respons keselamatan industri secara langsung.",
          demoLink: "https://github.com/DHard4114/IOT22-SmartGuard-Industrial-Predictive-Maintenance-System",
          imageURL: "/SmartGuard1.jpg",
        },
        {
          title: "Penetration Testing & Fix",
          year: "2025",
          category: "Keamanan Siber",
          description: "Blackbox penetration testing dan remediasi menyeluruh atas kerentanan kritis SQL Injection serta IDOR pada REST API Node.js.",
          tech: ["Node.js", "PostgreSQL", "SQLi", "IDOR", "OWASP"],
          details: "Mengidentifikasi dan mengeksploitasi celah **CRITICAL SQL Injection** (Tautology Attack) untuk melewati autentikasi serta kerentanan **IDOR** guna mengakses data privat melalui enumerasi UUID. Remediasi dilakukan dengan mengimplementasikan **Parameterized Queries** dan **Object Level Authorization Checks** di lapisan controller.",
          demoLink: "https://github.com/DHard4114/PenetrationTesting_InsecureDirectObjectReference",
          imageURL: "/Pentest.png",
        },
        {
          title: "Multi-Campus Network Arch",
          year: "2025",
          category: "Rekayasa Jaringan",
          description: "Merancang arsitektur jaringan multi-kampus yang skalabel dan redundan menggunakan hierarki 3 lapis Cisco (Core, Distribution, Access).",
          tech: ["Cisco Packet Tracer", "VLAN", "OSPF", "STP"],
          details: "Menerapkan segmentasi VLAN, Inter-VLAN Routing, dan Spanning Tree Protocol (STP) untuk redundansi dan pemulihan cepat (fast failover). Mengintegrasikan layanan inti terpusat seperti Web, DNS, dan server Email.",
          demoLink: "https://github.com/DHard4114/Multi-Campus-Enterprise-Network-Deployment",
          imageURL: "/Topologi1.png",
        },
        {
          title: "Robotic Arm Control System",
          year: "2024",
          category: "FPGA / Sistem Digital",
          description: "Pengontrol lengan robotik berbasis VHDL pada FPGA dengan navigasi 3D otonom, kalkulasi jarak Euclidean, dan kendali Finite State Machine.",
          tech: ["VHDL", "FPGA", "ModelSim", "Quartus"],
          details: "Dikembangkan sebagai Proyek Akhir. Arsitektur berpusat pada entitas **'RobotArmFPGA'**, mengintegrasikan Dekoder Input asinkron dan unit Navigator sinkron untuk logika jarak Euclidean secara real-time yang dikendalikan oleh Finite State Machine (FSM).",
          demoLink: "https://github.com/DHard4114/PA27_PSD",
          imageURL: "/ArmRobot.jpg",
        },
        {
          title: "AimTention: FPS Trainer",
          year: "2024",
          category: "Pengembangan Game",
          description: "Game simulator 3D di Unity untuk melatih refleks, presisi bidikan, dan kecepatan pemain dalam genre game kompetitif FPS.",
          tech: ["Unity 3D", "C#", "FPS Simulation", "Flick Mode"],
          details: "Dirancang berdasarkan pilar 'Realism and Relevance'. Memiliki **Normal Mode** (latihan gridshot) dan **Flick Mode** (latihan refleks cepat) yang dilengkapi statistik analitik akurasi setelah pertandingan.",
          demoLink: "https://github.com/Tinkermannn/Aim-Tention",
          imageURL: "/AimTention.png",
        },
      ] as ProjectData[],
    },
    experience: {
      hudPrefix: "Pengalaman Kerja //",
      sectionTitle: "Migrasi Sistem End-to-End",
      companySubtitle: "Universitas Indonesia (Jan 2026 - Sekarang)",
      navControls: "KONTROL_NAV [← →]",
      viewDetail: "Lihat Detail Sistem",
      inspectModule: "Inspeksi Modul",
      coreTechnologies: "Teknologi Utama",
      accessSite: "Buka sinergi1.ui.ac.id",
      modalOverview: "Ringkasan Sistem",
      modalTechDetail: "Arsitektur & Detail Rekayasa",
      modalStack: "Tech Stack",
      orgHistoryTitle: "Pengalaman Organisasi & Kepemimpinan",
      modules: [
        {
          title: "Migrasi Server Baru & Virtualisasi Proxmox VE",
          period: "Jan 2026 - Sekarang",
          category: "Virtualisasi Server & Infrastruktur Bare-Metal",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Media migrasi infrastruktur komputasi penuh ke klaster server baru menggunakan hypervisor Proxmox VE untuk menjamin isolasi beban kerja, ketahanan sistem, dan uptime telemetri kampus.",
          tech: ["Proxmox VE", "KVM Hypervisor", "LXC Containers", "ZFS Storage", "Linux Cluster", "Virtual Networking"],
          details: "Merancang dan mengeksekusi **Migrasi Penuh ke Server Baru** dengan **Proxmox Virtual Environment (VE)** sebagai fondasi virtualisasi server sinergi1.ui.ac.id. Mengonfigurasi isolasi container **LXC** dan mesin virtual **KVM**, optimasi storage pool berkinerja tinggi, virtual networking (Linux Bridge & VLAN), serta alokasi resource vCPU/RAM terisolasi guna menopang seluruh pipeline telemetri sensor, database PostgreSQL, dan aplikasi web kampus tanpa downtime.",
          imageURL: "/proxmox-newserver.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Rekonsiliasi Komersial & Register Billing",
          period: "Jan 2026 - Sekarang",
          category: "Audit Finansial & Telemetri Energi",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Sistem audit finansial energi resmi kampus UI berbasis Stand Akumulator Register Chip EDMI untuk rekonsiliasi tagihan komersial senilai Rp 566.5M+/bulan di 13 fakultas.",
          tech: ["EDMI Protocol", "Billing Engine", "Next.js", "PostgreSQL", "WBP/LWBP Audit", "Tailwind CSS"],
          details: "Mengimplementasikan modul **Rekonsiliasi Komersial Otomatis** yang membandingkan Stand Akumulator Fisik (Chip Register EDMI) terhadap Profil Beban Operasional per jam. Mengaudit tagihan resmi bulanan kampus senilai **Rp 566.549.061,84**, memisahkan beban **WBP (Waktu Beban Puncak 18:00-22:00: Rp 87.6M)** dan **LWBP (Luar Waktu Beban Puncak 22:00-18:00: Rp 478.8M)**, serta memonitor **Peak Demand 2.656.400 kW** secara terintegrasi di 13 fakultas.",
          imageURL: "/register-billing.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Telemetri Real-Time & Stream Daya Aktif",
          period: "Jan 2026 - Sekarang",
          category: "Sensor Real-Time & Pemrosesan Sinyal",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Pipeline stream daya aktif instan dan diagnostik sensor listrik gardu dengan interval latensi rendah (<45 detik) dilengkapi sistem alarm & peringatan anomali otomatis.",
          tech: ["WebSocket", "Real-Time Telemetry", "Alarm Automation", "Vector Diagnostics", "TypeScript", "Tailwind CSS"],
          details: "Arsitektur telemetri real-time yang membaca sensor dan vektor listrik langsung gardu dengan interval update **45 detik**. Memonitor **Total Daya Aktif (392,10 kW)**, profil beban harian (rata-rata 174,09 kW, puncak 404,30 kW), **Frekuensi (50,03 Hz)**, **Suhu Internal Gardu (34,0°C)**, dan **Power Factor (0,965)**. Dilengkapi **Mesin Alarm Otomatis** untuk mendeteksi anomali kritis seperti *Lid Tamper*, *Asymmetric Power*, *Incorrect Phase Rotation*, dan *Pulsing Output Overflow*.",
          imageURL: "/dashbord-2.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Analisis Historis & Profil Beban 3-Fasa",
          period: "Jan 2026 - Sekarang",
          category: "Profil Beban & Matematika Listrik 3-Fasa",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Analisis komprehensif profil beban energi per jam dan keseimbangan tegangan/arus 3-Fasa untuk menjamin efisiensi trafo dan kestabilan distribusi daya kampus.",
          tech: ["3-Phase Math", "Time-Series Analytics", "Load Balancing", "Vector Analysis", "Data Visualization"],
          details: "Mengembangkan modul visualisasi dan analitik beban historis per jam (total konsumsi aktif **1.607,00 kWh**, beban puncak **374,00 kWh** pada jam 10:00). Mengintegrasikan kalkulasi **Keseimbangan Fasa 3-Fasa (R-S-T)** dengan rata-rata tegangan **235,3 V** (Fasa R: 235,0 V, Fasa S: 236,6 V, Fasa T: 234,3 V) serta **Power Factor 0,990** untuk evaluasi efisiensi distribusi daya fasilitas.",
          imageURL: "/dashbord-3.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Dashboard Konsumsi Energi & Emisi Karbon",
          period: "Jan 2026 - Sekarang",
          category: "EMS Kampus & Keberlanjutan ESG",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Konsol terpadu monitoring konsumsi energi harian, estimasi biaya operasional real-time, dan kalkulasi jejak emisi karbon di seluruh gedung universitas.",
          tech: ["ESG Modeling", "Carbon Footprint", "Next.js", "Predictive Cost", "Tailwind CSS"],
          details: "Menyediakan *single pane of glass* bagi pengelola kampus untuk memantau konsumsi energi listrik secara granular per area/gedung (seperti Rektorat). Mengkalkulasi **Total Konsumsi Harian (1.607,00 kWh)**, mengonversi langsung menjadi **Estimasi Tagihan Harian (Rp 2.273.921,07)**, serta menghitung **Jejak Emisi Karbon (1.285,6 kg CO2)** dengan faktor emisi terstandarisasi untuk mendukung inisiatif *Green Campus UI*.",
          imageURL: "/dashbord-1.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
        {
          title: "Manajemen Gardu & Fleet Meter Kampus",
          period: "Jan 2026 - Sekarang",
          category: "Manajemen Infrastruktur & Fleet Meter",
          company: "Universitas Indonesia (sinergi1.ui.ac.id)",
          role: "End-to-End System Migration Engineer",
          description: "Katalog terpusat pemetaan 37 unit gardu & meter listrik, konfigurasi operasional, registrasi perangkat baru, dan pemantauan status pemeliharaan fasilitas.",
          tech: ["Fleet Management", "Substation Routing", "Device Registration", "Hardware Inventory", "Status Tracking"],
          details: "Mengorkestrasi basis data operasional seluruh armada meter di Universitas Indonesia yang mencakup **37 unit gardu & fleet**. Memetakan status perangkat secara langsung (**18 unit meter aktif normal / 48,6% armada**, **19 unit dalam jadwal maintenance**, **0 unit offline**). Mendukung manajemen per area (Rektorat, FKM, FIK, FTUI, FEB) dengan fitur registrasi gardu baru, konfigurasi serial number chip, dan integrasi link telemetri langsung.",
          imageURL: "/fleet-meter.png",
          demoLink: "https://sinergi1.ui.ac.id",
        },
      ] as ExperienceModuleData[],
      otherExperiences: [
        {
          company: "Ikatan Mahasiswa Elektro (IME FTUI)",
          role: "Staf Ahli Sekretaris",
          period: "Mar 2025 - Des 2025",
          current: false,
          location: "Depok, ID",
          description: "Mengoptimalkan alur kerja administratif dan membimbing staf muda dalam standar laporan pertanggungjawaban organisasi. Menstandarkan protokol dokumentasi.",
        },
        {
          company: "National Electrical Summit UI 2024",
          role: "Sekretaris Jenderal",
          period: "Jul 2024 - Mar 2025",
          current: false,
          location: "Depok, ID",
          description: "Mengelola korespondensi eksternal dan standardisasi berkas operasional untuk konferensi teknik tingkat nasional. Mengoordinasikan komunikasi lintas divisi.",
        },
      ] as OrgExperienceData[],
    },
    skills: {
      heading: "Keahlian Teknis",
      subBadge: "Fondasi & Stack Teknis",
      domainCount: "4 DOMAIN",
      domainSub: "HARDWARE & SOFTWARE",
      categories: [
        {
          id: "01",
          title: "BAHASA & DASAR",
          desc: "Fondasi Pemrograman Polyglot",
          skills: ["JavaScript", "TypeScript", "C", "C++", "C#", "Java", ".NET", "Python", "Assembly"],
        },
        {
          id: "02",
          title: "WEB & GAME ENGINE",
          desc: "Frontend, Backend & 3D Interaktif",
          skills: ["Next.js 15", "React", "Vite", "Node.js (Express)", "JWT Auth", "Socket.io", "Prisma ORM", "Unity 3D", "Tailwind"],
        },
        {
          id: "03",
          title: "DATA & INFRASTRUKTUR",
          desc: "Arsitektur Database, Cloud & DevOps",
          skills: ["PostgreSQL", "PostGIS", "Neon DB", "MongoDB", "Docker", "Linux/Unix", "Git", "CI/CD"],
        },
        {
          id: "04",
          title: "HARDWARE & KEAMANAN",
          desc: "Sistem Tertanam & Keamanan Siber",
          skills: ["ESP32", "Arduino", "FPGA (VHDL)", "FreeRTOS", "MQTT", "BLE", "LORA", "Kali Linux", "Wireshark", "Packet Tracer", "OWASP"],
        },
      ] as SkillCategoryData[],
    },
    education: {
      heading: "Pendidikan",
      subBadge: "Latar Belakang Akademis",
      items: [
        {
          school: "Universitas Indonesia",
          degree: "Sarjana Teknik Komputer (S.T.)",
          gpa: null,
          period: "2023 - 2027",
          status: "Sedang Ditempuh",
          location: "Depok, ID",
          current: true,
          highlights: [
            {
              label: "Konsentrasi Utama",
              desc: "Embedded Systems, Hardware-Software Co-design, Industrial IoT.",
            },
            {
              label: "Mata Kuliah Kunci",
              desc: "Rekayasa Jaringan (CCNA), Desain FPGA (VHDL), Sistem Operasi, Struktur Data.",
            },
            {
              label: "Laboratorium",
              desc: "Laboratorium Sistem Digital & Jaringan Tertanam.",
            },
          ],
        },
        {
          school: "SMAN 1 Cikande",
          degree: "Matematika dan Ilmu Pengetahuan Alam (MIPA)",
          gpa: "Peringkat 3 Besar",
          period: "2020 - 2023",
          status: "Lulus",
          location: "Serang, ID",
          current: false,
          highlights: [
            {
              label: "Akademik",
              desc: "Perempatfinalis OKTAN ITB 2022 (Kimia Tingkat Nasional), Olimpiade Matematika.",
            },
            {
              label: "Non-Akademik",
              desc: "Juara 1 Solo Gitar (Tingkat Kabupaten), Juara 3 Solo Gitar (Tingkat Provinsi).",
            },
          ],
        },
      ] as EducationData[],
    },
    contact: {
      headingLine1: "Mari Ciptakan Sesuatu yang",
      headingLine2: "Luar Biasa.",
      description: "Bersemangat menghadapi tantangan kompleks di bidang Embedded Systems, IoT, dan Full-stack Development. Terbuka mengeksplorasi peluang inovatif bersama.",
      availabilityTitle: "Ketersediaan Saat Ini",
      availabilities: [
        { label: "Mencari Magang Full-time", highlight: true },
        { label: "Kolaborasi Riset", highlight: false },
        { label: "Proyek Freelance", highlight: false },
      ],
      form: {
        nameLabel: "Nama Lengkap",
        emailLabel: "Alamat Email",
        subjectLabel: "Subjek / Topik",
        messageLabel: "Pesan / Detail Kebutuhan",
        submitBtn: "KIRIM PESAN",
        sendingBtn: "MENGIRIM...",
        successApi: "Pesan Berhasil Terkirim.",
        successMailto: "Pesan disiapkan di Email Client.",
      },
    },
    footer: {
      brandSub: "TEKNIK KOMPUTER @ UNIVERSITAS INDONESIA",
      status: "TERBUKA UNTUK KERJA & KOLABORASI",
      navColTitle: "NAVIGASI",
      connectColTitle: "KONTAK",
      links: {
        home: "BERANDA",
        projects: "PROYEK",
        experience: "PENGALAMAN",
        skills: "KEAHLIAN",
        contact: "KONTAK",
      },
      locationBadge: "DEPOK, INDONESIA",
    },
  },
} as const
