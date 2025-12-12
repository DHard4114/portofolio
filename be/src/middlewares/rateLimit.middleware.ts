/**
 * @file middlewares/rateLimit.middleware.ts
 * @description Rate limiting middleware
 * @module Middlewares/RateLimit
 * 
 * Implements in-memory rate limiting to prevent abuse.
 * Configurable time windows and request limits per IP address.
 * Includes specialized rate limiter for contact form (stricter limits).
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../utils/response'
import config from '../config'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export const rateLimiter = (
  windowMs: number = config.rateLimit.windowMs,
  maxRequests: number = config.rateLimit.maxRequests
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const now = Date.now()

    // Initialize or reset if window expired
    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs,
      }
      next()
      return
    }

    // Increment count
    store[ip].count++

    // Check if limit exceeded
    if (store[ip].count > maxRequests) {
      const resetIn = Math.ceil((store[ip].resetTime - now) / 1000)
      ApiResponse.tooManyRequests(res, `Please try again in ${resetIn} seconds`)
      return
    }

    next()
  }
}

// Contact form specific rate limiter (stricter)
export const contactRateLimiter = rateLimiter(
  config.rateLimit.windowMs,
  config.rateLimit.contactMaxRequests
)
