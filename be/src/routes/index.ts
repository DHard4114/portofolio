/**
 * @file routes/index.ts
 * @description Main router configuration
 * @module Routes
 * 
 * Aggregates all route modules and provides a health check endpoint.
 * Acts as the central routing hub for the application.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Router, Request, Response } from 'express'
import contactRoutes from './contact.routes'
import analyticsRoutes from './analytics.routes'

const router = Router()

router.get('/health', (_req: Request, res: Response) => {
  const uptime = process.uptime(); // Mengambil durasi server nyala dalam detik (float)
  
  res.json({
    success: true,
    message: 'Server is running',
    uptime: uptime, // Kirim ke frontend
    timestamp: new Date().toISOString(),
  })
})

// API routes
router.use('/contact', contactRoutes)
router.use('/analytics', analyticsRoutes)

export default router
