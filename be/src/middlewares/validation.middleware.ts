/**
 * @file middlewares/validation.middleware.ts
 * @description Input validation middleware
 * @module Middlewares/Validation
 * 
 * Validates incoming request data before processing.
 * Currently implements contact form validation with email format
 * and message length checks.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../utils/response'

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, subject, message } = req.body

  // Check required fields
  if (!name || !email || !subject || !message) {
    ApiResponse.badRequest(res, 'All fields are required')
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    ApiResponse.badRequest(res, 'Invalid email format')
    return
  }

  // Validate message length
  if (message.trim().length < 10) {
    ApiResponse.badRequest(res, 'Message must be at least 10 characters')
    return
  }

  next()
}
