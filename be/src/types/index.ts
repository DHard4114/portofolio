/**
 * @file types/index.ts
 * @description TypeScript type definitions and interfaces
 * @module Types
 * 
 * Central location for all TypeScript interfaces used across the application.
 * Includes types for Contact, Visitor, Analytics, and their DTOs.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

// Contact types
export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

export interface CreateContactDTO {
  name: string
  email: string
  subject: string
  message: string
}

// Visitor types
export interface Visitor {
  id: string
  ipAddress: string | null
  userAgent: string | null
  firstVisit: Date
  lastVisit: Date
}

export interface CreateVisitorDTO {
  ipAddress?: string
  userAgent?: string
}

// PageView types
export interface PageView {
  id: string
  visitorId: string
  page: string
  visitedAt: Date
}

export interface CreatePageViewDTO {
  visitorId: string
  page: string
}

// Analytics types
export interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  todayVisitors: number
}

export interface PageViewStats {
  page: string
  count: number
}

export interface AnalyticsSummary {
  totalVisitors: number
  totalPageViews: number
  uniqueVisitors: number
  topPages: Array<{
    page: string
    count: number
  }>
}
