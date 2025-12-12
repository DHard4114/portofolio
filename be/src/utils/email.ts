/**
 * @file utils/email.ts
 * @description Utility for sending email notifications (Nodemailer)
 * @module Utils/Email
 *
 * Provides a function to send email using Nodemailer.
 * Reads SMTP config from environment variables.
 *
 * @author Daffa Hardhan
 * @created 2025
 */

import nodemailer from 'nodemailer'

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const emailTo = process.env.CONTACT_NOTIFY_EMAIL

if (!smtpHost || !smtpUser || !smtpPass || !emailTo) {
  throw new Error('SMTP config or CONTACT_NOTIFY_EMAIL missing in environment variables')
}

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
})

export async function sendContactNotification({ name, email, subject, message }: { name: string, email: string, subject: string, message: string }) {
  const mailOptions = {
    from: `Portfolio Contact <${smtpUser}>`,
    to: emailTo,
    subject: `New Contact Form Submission: ${subject}`,
    text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    html: `<h3>New Contact Form Submission</h3><ul><li><b>Name:</b> ${name}</li><li><b>Email:</b> ${email}</li><li><b>Subject:</b> ${subject}</li></ul><p><b>Message:</b><br>${message.replace(/\n/g, '<br>')}</p>`
  }
  return transporter.sendMail(mailOptions)
}
