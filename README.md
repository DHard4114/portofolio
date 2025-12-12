# Daffa Hardhan | Portfolio

![image](https://hackmd.io/_uploads/BJbH_tYG-g.png)

> **"Forging robust digital architectures at the intersection of Hardware and Software."**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Overview

This project serves as my digital headquarters and engineering playground. It goes beyond a standard static portfolio by implementing a **live, full-stack ecosystem**.

The system features a decoupled architecture (Frontend & Backend) to demonstrate scalable software design, complete with a custom-built **Real-time Analytics Command Center** that monitors traffic and server health without relying on third-party black-box solutions.

### Key Engineering Features

#### 1. Technical Luxury Design System (Frontend)
*   **Aesthetic:** A "Cyberpunk/High-Tech" visual identity utilizing *Space Grotesk*, *Cormorant Garamond*, and *JetBrains Mono*.
*   **Immersion:** Interactive aurora backgrounds, holographic avatar effects, and micro-interactions powered by **Framer Motion**.
*   **Performance:** Fully optimized Next.js 14 App Router with server-side rendering for critical content.

#### 2. Analytics Command Center (Dashboard)
A protected route (`/dashboard`) serving as a live monitoring console:
*   **Live Server Heartbeat:** Real-time server uptime ticker synced with the Node.js backend process.
*   **Custom Visualization:** Network traffic simulation rendered via raw SVG math (no heavy chart libraries).
*   **Privacy-First:** Visitor IPs are masked and logs are sanitized before display.

#### 3. Robust Backend Architecture
*   **Clean Architecture:** Strict separation of concerns into Controllers, Services, and Repositories.
*   **Security:** Hardened with Helmet, CORS policies, and Rate Limiting (DDOS protection).
*   **Documentation:** Auto-generated interactive API documentation via **Scalar** (OpenAPI 3.0).

---

## Tech Stack & Tools

### Frontend (`/fe`)
| Tech | Role |
| :--- | :--- |
| **Next.js 14** | Core Framework (App Router) |
| **TypeScript** | Strict Type Safety |
| **Tailwind CSS v4** | Styling Engine |
| **Framer Motion** | Animation Orchestration |
| **Lucide React** | Iconography |

### Backend (`/be`)
| Tech | Role |
| :--- | :--- |
| **Express.js** | Serverless-ready REST API |
| **Prisma ORM** | Database Access Layer |
| **PostgreSQL** | Relational Database (Cloud Hosted) |
| **Winston** | Structured Logging |
| **Scalar** | API Documentation UI |

---

## System Architecture

The project follows a monorepo-style structure to ensure separation of concerns while sharing type definitions conceptually.

```bash
portofolio/
├── fe/                          # Frontend Application (Client)
│   ├── src/
│   │   ├── app/                # App Router (Home, Dashboard)
│   │   ├── components/         # Reusable UI (Hero, Charts, Terminals)
│   │   ├── services/           # Type-safe API Client Wrappers
│   │   └── types/              # DTOs & Interfaces
│
└── be/                          # Backend API Service (Server)
    ├── src/
    │   ├── controllers/        # Request Handlers
    │   ├── services/           # Business Logic
    │   ├── repositories/       # Database Access Layer
    │   ├── routes/             # Endpoint Definitions
    │   ├── middlewares/        # Validation & Security
    │   └── config/             # OpenAPI & Env Config
    └── prisma/                 # Database Schema