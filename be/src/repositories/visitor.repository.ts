/**
 * @file repositories/visitor.repository.ts
 * @description Visitor and analytics data access layer
 * @module Repositories/Visitor
 * 
 * Handles all database operations for visitor tracking and page views.
 * Provides methods for visitor CRUD, page view tracking, and analytics queries.
 * Includes data aggregation for analytics summaries.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { prisma } from '../lib/prisma'
import { CreateVisitorDTO, Visitor, PageViewStats } from '../types'

export class VisitorRepository {
  async create(data: CreateVisitorDTO): Promise<Visitor> {
    return await prisma.visitor.create({
      data,
    })
  }

  // Alias untuk service
  async createVisitor(data: CreateVisitorDTO): Promise<Visitor> {
    return this.create(data)
  }

  async findByIp(ipAddress: string): Promise<Visitor | null> {
    return await prisma.visitor.findFirst({
      where: { ipAddress },
    })
  }

  // Alias untuk service
  async findVisitorByIp(ipAddress: string): Promise<Visitor | null> {
    return this.findByIp(ipAddress)
  }

  async update(id: string): Promise<Visitor> {
    return await prisma.visitor.update({
      where: { id },
      data: {
        lastVisit: new Date(),
      },
    })
  }

  // Alias untuk service
  async updateLastVisit(id: string): Promise<Visitor> {
    return this.update(id)
  }

  async findAll(): Promise<Visitor[]> {
    return await prisma.visitor.findMany({
      orderBy: {
        lastVisit: 'desc',
      },
    })
  }

  async getTotalCount(): Promise<number> {
    return await prisma.visitor.count()
  }

  // Alias untuk service
  async getTotalVisitors(): Promise<number> {
    return this.getTotalCount()
  }

  async getUniqueVisitors(): Promise<number> {
    const uniqueIps = await prisma.visitor.groupBy({
      by: ['ipAddress'],
      _count: true,
    })
    return uniqueIps.length
  }

  async getTodayVisitors(): Promise<number> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return await prisma.visitor.count({
      where: {
        lastVisit: {
          gte: today,
        },
      },
    })
  }

  async createPageView(visitorId: string, page: string): Promise<void> {
    await prisma.pageView.create({
      data: {
        visitorId,
        page,
      },
    })
  }

  async getPageViews(): Promise<PageViewStats[]> {
    const pageViews = await prisma.pageView.groupBy({
      by: ['page'],
      _count: {
        page: true,
      },
    })

    return pageViews.map((pv: any) => ({
      page: pv.page,
      count: pv._count.page,
    }))
  }

  async getTotalPageViews(): Promise<number> {
    return await prisma.pageView.count()
  }

  async getTopPages(limit: number = 10): Promise<PageViewStats[]> {
    const pageViews = await prisma.pageView.groupBy({
      by: ['page'],
      _count: {
        page: true,
      },
      orderBy: {
        _count: {
          page: 'desc',
        },
      },
      take: limit,
    })

    return pageViews.map((pv: any) => ({
      page: pv.page,
      count: pv._count.page,
    }))
  }

  async deleteOlderThan(days: number): Promise<number> {
    const date = new Date()
    date.setDate(date.getDate() - days)

    const result = await prisma.visitor.deleteMany({
      where: {
        lastVisit: {
          lt: date,
        },
      },
    })

    return result.count
  }

  // Alias untuk service
  async deleteOldVisitors(days: number): Promise<number> {
    return this.deleteOlderThan(days)
  }
}
