/**
 * @file utils/logger.ts
 * @description Context-based logging utility
 * @module Utils/Logger
 * 
 * Provides structured logging with timestamps and context information.
 * Supports different log levels (info, error, warn, debug) with automatic
 * timestamping and context tagging for better debugging.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

/**
 * Logger utility for consistent logging across the application
 */
export class Logger {
  private context: string

  constructor(context: string) {
    this.context = context
  }

  /**
   * Log info message
   */
  info(message: string, ...args: any[]): void {
    console.log(`[${this.getTimestamp()}] [INFO] [${this.context}]`, message, ...args)
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | any): void {
    console.error(`[${this.getTimestamp()}] [ERROR] [${this.context}]`, message)
    if (error) {
      if (error instanceof Error) {
        console.error('Stack:', error.stack)
      } else {
        console.error('Details:', error)
      }
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, ...args: any[]): void {
    console.warn(`[${this.getTimestamp()}] [WARN] [${this.context}]`, message, ...args)
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${this.getTimestamp()}] [DEBUG] [${this.context}]`, message, ...args)
    }
  }

  /**
   * Get current timestamp
   */
  private getTimestamp(): string {
    return new Date().toISOString()
  }
}

/**
 * Create a logger instance for a specific context
 */
export const createLogger = (context: string): Logger => {
  return new Logger(context)
}
