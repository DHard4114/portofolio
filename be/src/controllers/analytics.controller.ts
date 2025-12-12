/**
 * @file controllers/analytics.controller.ts
 * @description Analytics and visitor tracking HTTP handlers
 * @module Controllers/Analytics
 * 
 * Handles all HTTP requests related to visitor analytics and tracking.
 * Tracks page visits, generates analytics summaries, and manages data cleanup.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Request, Response, NextFunction } from 'express'
import { AnalyticsService } from '../services/analytics.service'

export class AnalyticsController {
  private analyticsService: AnalyticsService

  constructor() {
    this.analyticsService = new AnalyticsService()
  }

  trackVisit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ipAddress = req.ip || req.socket.remoteAddress || 'unknown'
      const userAgent = req.get('user-agent') || 'unknown'
      const { page } = req.body

      if (!page) {
        res.status(400).json({
          success: false,
          error: 'Page is required',
        })
        return
      }

      await this.analyticsService.trackVisit(ipAddress, userAgent, page)

      res.status(200).json({
        success: true,
        message: 'Visit tracked successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  getAnalyticsSummary = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const summary = await this.analyticsService.getAnalyticsSummary()

      res.status(200).json({
        success: true,
        data: summary,
      })
    } catch (error) {
      next(error)
    }
  }

  cleanupOldData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const days = parseInt(req.query.days as string) || 90
      const deletedCount = await this.analyticsService.cleanupOldData(days)

      res.status(200).json({
        success: true,
        message: `Cleaned up data older than ${days} days`,
        data: { deletedCount },
      })
    } catch (error) {
      next(error)
    }
  }
}
