/**
 * @file repositories/contact.repository.ts
 * @description Contact data access layer
 * @module Repositories/Contact
 * 
 * Handles all database operations for contact records.
 * Provides CRUD operations using Prisma ORM.
 * Abstracts database logic from business layer.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { prisma } from '../lib/prisma'
import { Contact, CreateContactDTO } from '../types'

export class ContactRepository {
  async create(data: CreateContactDTO): Promise<Contact> {
    return await prisma.contact.create({
      data,
    })
  }

  async findAll(): Promise<Contact[]> {
    return await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async findById(id: string): Promise<Contact | null> {
    return await prisma.contact.findUnique({
      where: { id },
    })
  }

  async delete(id: string): Promise<Contact> {
    return await prisma.contact.delete({
      where: { id },
    })
  }

  async count(): Promise<number> {
    return await prisma.contact.count()
  }
}
