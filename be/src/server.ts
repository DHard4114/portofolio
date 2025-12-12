/**
 * @file server.ts
 * @description Express application setup and configuration
 * @module Server
 * 
 * Main entry point for the backend application.
 * Configures Express middleware, routes, and error handling.
 * Implements security best practices with Helmet, CORS, and rate limiting.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { apiReference } from '@scalar/express-api-reference'
import routes from './routes'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware'
import config from './config'
import { createLogger } from './utils/logger'
import { openApiSpec } from './config/openapi'

// Load environment variables
dotenv.config()

// Create logger
const logger = createLogger('Server')

// Create Express app
const app: Application = express()
const PORT = config.port

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for API documentation to work
  crossOriginEmbedderPolicy: false,
}))
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}))
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(morgan(config.isProduction ? 'combined' : 'dev')) // Logging

// API routes
app.use('/api', routes)

// API Documentation
app.use(
  '/docs',
  apiReference({
    theme: 'default',
    spec: {
      content: openApiSpec,
    },
  })
)

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Portfolio API Server - Daffa Hardhan',
    version: '1.0.0',
    documentation: '/docs',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      analytics: '/api/analytics',
    },
  })
})

// Error handlers
app.use(notFoundHandler)
app.use(errorHandler)

// // Start server
// app.listen(PORT, () => {
//   logger.info(`🚀 Server running on port ${PORT}`)
//   logger.info(`📝 Environment: ${config.nodeEnv}`)
//   logger.info(`🌐 Frontend URL: ${config.corsOrigin}`)
//   logger.info(`📚 API Documentation: http://localhost:${PORT}/docs`)
// })

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`)
    logger.info(`📝 Environment: ${config.nodeEnv}`)
    logger.info(`🌐 Frontend URL: ${config.corsOrigin}`)
  })
}

export default app
