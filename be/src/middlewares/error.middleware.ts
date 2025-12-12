/**
 * @file middlewares/error.middleware.ts
 * @description Global error handling middleware
 * @module Middlewares/Error
 * 
 * Centralized error handling for the entire application.
 * Catches all errors and formats them into standardized responses.
 * Includes separate handlers for 404 Not Found errors.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/errors'
import { ApiResponse } from '../utils/response'
import { createLogger } from '../utils/logger'

const logger = createLogger('ErrorHandler')

export const errorHandler = (
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log error
  logger.error('Error occurred:', error)

  // Handle AppError
  if (error instanceof AppError) {
    ApiResponse.error(res, error.message, undefined, error.statusCode)
    return
  }

  // Handle generic errors
  ApiResponse.error(res, error.message || 'Internal Server Error', undefined, 500)
}

export const notFoundHandler = (_req: Request, res: Response): void => {
  ApiResponse.notFound(res, 'Endpoint not found')
}
