/**
 * @file config/index.ts
 * @description Centralized application configuration
 * @module Config
 * 
 * This module provides a single source of truth for all application configuration.
 * It reads environment variables and provides default values for development.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

export const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuration
  corsOrigin: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Database configuration
  databaseUrl: process.env.DATABASE_URL || '',
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    contactMaxRequests: 5, // 5 requests per window for contact form
  },
  
  // Logging
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const

export default config
