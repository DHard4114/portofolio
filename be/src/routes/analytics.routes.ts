/**
 * @file routes/analytics.routes.ts
 * @description Analytics API route definitions
 * @module Routes/Analytics
 * 
 * Defines all endpoints for visitor tracking and analytics.
 * Includes routes for visit tracking, summary generation, and data cleanup.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Router } from 'express'
import { AnalyticsController } from '../controllers/analytics.controller'

const router = Router()
const analyticsController = new AnalyticsController()

// Track visit
router.post('/visit', analyticsController.trackVisit)

// Get analytics summary
router.get('/summary', analyticsController.getAnalyticsSummary)

// Cleanup old data (admin route)
router.delete('/cleanup', analyticsController.cleanupOldData)

export default router
