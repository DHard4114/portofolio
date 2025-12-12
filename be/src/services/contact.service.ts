/**
 * @file services/contact.service.ts
 * @description Contact business logic layer
 * @module Services/Contact
 * 
 * Contains business logic for contact form operations.
 * Handles validation, sanitization, and orchestrates repository calls.
 * Implements data validation rules and email format checking.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */


import { ContactRepository } from '../repositories/contact.repository'
import { Contact, CreateContactDTO } from '../types'
import { AppError, HttpStatus } from '../utils/errors'
import { createLogger } from '../utils/logger'
import { sendContactNotification } from '../utils/email'

const logger = createLogger('ContactService')

export class ContactService {
  private contactRepository: ContactRepository

  constructor() {
    this.contactRepository = new ContactRepository()
  }

  async createContact(data: CreateContactDTO): Promise<Contact> {
    try {
      // Validate input
      this.validateContactData(data)

      // Sanitize data
      const sanitizedData: CreateContactDTO = {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      }

      logger.info('Creating new contact', { email: sanitizedData.email })
      const contact = await this.contactRepository.create(sanitizedData)

      // Send notification email (async, but don't block response)
      sendContactNotification(sanitizedData).catch((err) => {
        logger.error('Failed to send contact notification email', err)
      })

      return contact
    } catch (error) {
      logger.error('Failed to create contact', error)
      throw error
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    try {
      return await this.contactRepository.findAll()
    } catch (error) {
      logger.error('Failed to get all contacts', error)
      throw new AppError('Failed to fetch contacts', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getContactById(id: string): Promise<Contact> {
    try {
      const contact = await this.contactRepository.findById(id)
      
      if (!contact) {
        throw new AppError('Contact not found', HttpStatus.NOT_FOUND)
      }

      return contact
    } catch (error) {
      if (error instanceof AppError) throw error
      logger.error('Failed to get contact by id', error)
      throw new AppError('Failed to fetch contact', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      const contact = await this.contactRepository.findById(id)
      
      if (!contact) {
        throw new AppError('Contact not found', HttpStatus.NOT_FOUND)
      }

      await this.contactRepository.delete(id)
      logger.info('Contact deleted', { id })
    } catch (error) {
      if (error instanceof AppError) throw error
      logger.error('Failed to delete contact', error)
      throw new AppError('Failed to delete contact', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getContactCount(): Promise<number> {
    try {
      return await this.contactRepository.count()
    } catch (error) {
      logger.error('Failed to get contact count', error)
      throw new AppError('Failed to count contacts', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private validateContactData(data: CreateContactDTO): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new AppError('Name is required', HttpStatus.BAD_REQUEST)
    }

    if (!data.email || data.email.trim().length === 0) {
      throw new AppError('Email is required', HttpStatus.BAD_REQUEST)
    }

    if (!this.isValidEmail(data.email)) {
      throw new AppError('Invalid email format', HttpStatus.BAD_REQUEST)
    }

    if (!data.subject || data.subject.trim().length === 0) {
      throw new AppError('Subject is required', HttpStatus.BAD_REQUEST)
    }

    if (!data.message || data.message.trim().length === 0) {
      throw new AppError('Message is required', HttpStatus.BAD_REQUEST)
    }

    if (data.message.trim().length < 10) {
      throw new AppError('Message must be at least 10 characters', HttpStatus.BAD_REQUEST)
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
