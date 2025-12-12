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


import express from 'express'
import routes from './routes'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware'
import config from './config'
import { createLogger } from './utils/logger'

// Tidak perlu dotenv.config() di Vercel, sudah otomatis

const logger = createLogger('Server')
const app = express()
const PORT = config.port

// Middleware
// (Jika ingin pakai helmet/cors/morgan, import dan aktifkan lagi di sini)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api', routes)

// API Documentation (Scalar) di-nonaktifkan agar tidak error ESM di Vercel
// Untuk dokumentasi API, jalankan Scalar secara lokal/dev saja.

// Root endpoint
app.get('/', (_req, res) => {
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
