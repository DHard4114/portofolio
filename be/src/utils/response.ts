/**
 * @file utils/response.ts
 * @description Standardized API response utility
 * @module Utils/Response
 * 
 * Provides a consistent response format for all API endpoints.
 * Includes helper methods for common HTTP responses (success, error, created, etc.).
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Response } from 'express'

/**
 * Standard API response format
 */
export class ApiResponse<T = any> {
  public success: boolean
  public message?: string
  public data?: T
  public error?: string

  constructor(success: boolean, message?: string, data?: T, error?: string) {
    this.success = success
    this.message = message
    this.data = data
    this.error = error
  }

  /**
   * Send success response
   */
  static success<T>(res: Response, data?: T, message?: string, statusCode: number = 200): Response {
    return res.status(statusCode).json(
      new ApiResponse<T>(true, message, data)
    )
  }

  /**
   * Send error response
   */
  static error(res: Response, error: string, message?: string, statusCode: number = 500): Response {
    return res.status(statusCode).json(
      new ApiResponse(false, message, undefined, error)
    )
  }

  /**
   * Send created response
   */
  static created<T>(res: Response, data: T, message?: string): Response {
    return ApiResponse.success(res, data, message, 201)
  }

  /**
   * Send not found response
   */
  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return ApiResponse.error(res, message, undefined, 404)
  }

  /**
   * Send bad request response
   */
  static badRequest(res: Response, message: string = 'Bad request'): Response {
    return ApiResponse.error(res, message, undefined, 400)
  }

  /**
   * Send unauthorized response
   */
  static unauthorized(res: Response, message: string = 'Unauthorized'): Response {
    return ApiResponse.error(res, message, undefined, 401)
  }

  /**
   * Send forbidden response
   */
  static forbidden(res: Response, message: string = 'Forbidden'): Response {
    return ApiResponse.error(res, message, undefined, 403)
  }

  /**
   * Send too many requests response
   */
  static tooManyRequests(res: Response, message: string = 'Too many requests'): Response {
    return ApiResponse.error(res, message, undefined, 429)
  }
}
