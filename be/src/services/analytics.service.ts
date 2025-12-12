/**
 * @file services/analytics.service.ts
 * @description Analytics business logic layer
 * @module Services/Analytics
 * 
 * Contains business logic for visitor tracking and analytics.
 * Handles visitor creation, page view tracking, and analytics aggregation.
 * Manages data cleanup for old visitor records.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { VisitorRepository } from '../repositories/visitor.repository'
import { AnalyticsSummary } from '../types'
import { AppError, HttpStatus } from '../utils/errors'
import { createLogger } from '../utils/logger'

const logger = createLogger('AnalyticsService')

export class AnalyticsService {
  private visitorRepository: VisitorRepository

  constructor() {
    this.visitorRepository = new VisitorRepository()
  }

  async trackVisit(ipAddress: string, userAgent: string, page: string): Promise<void> {
    try {
      // Find or create visitor
      let visitor = await this.visitorRepository.findVisitorByIp(ipAddress)

      if (!visitor) {
        visitor = await this.visitorRepository.createVisitor({
          ipAddress,
          userAgent,
        })
        logger.debug('New visitor created', { ipAddress })
      } else {
        await this.visitorRepository.updateLastVisit(visitor.id)
        logger.debug('Visitor updated', { ipAddress })
      }

      // Create page view
      await this.visitorRepository.createPageView(visitor.id, page)
      logger.debug('Page view tracked', { page, visitorId: visitor.id })
    } catch (error) {
      logger.error('Failed to track visit', error)
      throw new AppError('Failed to track visit', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    try {
      const [totalVisitors, totalPageViews, uniqueVisitors, topPages] = await Promise.all([
        this.visitorRepository.getTotalVisitors(),
        this.visitorRepository.getTotalPageViews(),
        this.visitorRepository.getUniqueVisitors(),
        this.visitorRepository.getTopPages(10),
      ])

      return {
        totalVisitors,
        totalPageViews,
        uniqueVisitors,
        topPages,
      }
    } catch (error) {
      logger.error('Failed to get analytics summary', error)
      throw new AppError('Failed to fetch analytics', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async cleanupOldData(days: number = 90): Promise<number> {
    try {
      const deletedCount = await this.visitorRepository.deleteOldVisitors(days)
      logger.info('Old data cleaned up', { days, deletedCount })
      return deletedCount
    } catch (error) {
      logger.error('Failed to cleanup old data', error)
      throw new AppError('Failed to cleanup data', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
