/**
 * @file service/api.tsx
 * @description Frontend API Client Service
 * @module Service/API
 * 
 * Centralized API client for communicating with the backend.
 * Includes strict typing, error handling, and environment configuration.
 */

import { ApiResponse, Contact, ContactCount, CreateContactDTO, SystemHealth, AnalyticsSummary, DeletedCount } from '../types/api'

// 1. Config: Gunakan Environment Variable untuk fleksibilitas deploy
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL



// --- HELPER FUNCTION ---

/**
 * Wrapper untuk fetch agar handling error lebih rapi
 * Otomatis throw error jika status != 2xx
 */
async function fetchClient<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`
  
  try {
    const res = await fetch(url, options)
    const json = await res.json()

    if (!res.ok) {
      // Ambil pesan error dari backend atau default
      const errorMessage = json.error || json.message || 'Something went wrong'
      throw new Error(errorMessage)
    }

    return json as ApiResponse<T>
  } catch (error) {
    // Re-throw error agar bisa ditangkap di Component (try-catch)
    throw error
  }
}

// --- CONTACT API METHODS ---

export async function postContact(form: CreateContactDTO) {
  return fetchClient<Contact>('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
}

export async function getContacts() {
  return fetchClient<Contact[]>('/contact')
}

export async function getContactCount() {
  return fetchClient<ContactCount>('/contact/count')
}

export async function getContactById(id: string) {
  return fetchClient<Contact>(`/contact/${id}`)
}

export async function deleteContact(id: string) {
  return fetchClient<void>(`/contact/${id}`, { 
    method: 'DELETE' 
  })
}

// --- ANALYTICS API METHODS ---

export async function getSystemHealth() {
  return fetchClient<SystemHealth>('/health') // Panggil endpoint root/health yang sudah ada di routes/index.ts backend (atau sesuaikan pathnya)
  // Note: Di backend Anda endpointnya '/api/health' (karena app.use('/api', routes))
  // Tapi di routes/index.ts definisi '/health' ada di luar 'routes', 
  // Cek server.ts: app.use('/api', routes). Di routes/index.ts: router.get('/health'...)
  // Jadi URL nya adalah: http://localhost:5000/api/health
}

export async function postAnalyticsVisit(page: string) {
  return fetchClient<void>('/analytics/visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page }),
  })
}

export async function getAnalyticsSummary() {
  return fetchClient<AnalyticsSummary>('/analytics/summary')
}

export async function cleanupAnalytics(days: number = 90) {
  // Menggunakan query params untuk days
  return fetchClient<DeletedCount>(`/analytics/cleanup?days=${days}`, {
    method: 'DELETE'
  })
}