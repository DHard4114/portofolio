/**
 * @file controllers/contact.controller.ts
 * @description Contact form HTTP request handlers
 * @module Controllers/Contact
 * 
 * Handles all HTTP requests related to contact form submissions.
 * Includes CRUD operations with proper validation and error handling.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { Request, Response, NextFunction } from 'express'
import { ContactService } from '../services/contact.service'
import { CreateContactDTO } from '../types'

export class ContactController {
  private contactService: ContactService

  constructor() {
    this.contactService = new ContactService()
  }

  createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactData: CreateContactDTO = req.body
      const contact = await this.contactService.createContact(contactData)

      res.status(201).json({
        success: true,
        message: 'Contact message received successfully',
        data: contact,
      })
    } catch (error) {
      next(error)
    }
  }

  getAllContacts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contacts = await this.contactService.getAllContacts()

      res.status(200).json({
        success: true,
        data: contacts,
      })
    } catch (error) {
      next(error)
    }
  }

  getContactById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const contact = await this.contactService.getContactById(id)

      res.status(200).json({
        success: true,
        data: contact,
      })
    } catch (error) {
      next(error)
    }
  }

  deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await this.contactService.deleteContact(id)

      res.status(200).json({
        success: true,
        message: 'Contact deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  getContactCount = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const count = await this.contactService.getContactCount()

      res.status(200).json({
        success: true,
        data: { count },
      })
    } catch (error) {
      next(error)
    }
  }
}
