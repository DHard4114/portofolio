/**
 * @file routes/contact.routes.ts
 * @description Contact API route definitions
 * @module Routes/Contact
 * 
 * Defines all endpoints for contact form operations.
 * Includes middleware for rate limiting and validation.
 * Public routes for form submission, admin routes for management.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Router } from 'express'
import { ContactController } from '../controllers/contact.controller'
import { validateContactForm } from '../middlewares/validation.middleware'
import { contactRateLimiter } from '../middlewares/rateLimit.middleware'

const router = Router()
const contactController = new ContactController()

// Public routes
router.post('/', contactRateLimiter, validateContactForm, contactController.createContact)

// Admin routes (should be protected with auth in production)
router.get('/', contactController.getAllContacts)
router.get('/count', contactController.getContactCount)
router.get('/:id', contactController.getContactById)
router.delete('/:id', contactController.deleteContact)

export default router
