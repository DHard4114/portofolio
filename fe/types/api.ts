
/**
 * Interface untuk data yang dikirimkan melalui form kontak (DTO).
 */
export interface CreateContactDTO {
    name: string
    email: string
    subject: string
    message: string
}

/**
 * Interface untuk status pesan yang ditampilkan di UI.
 */
export interface StatusState {
    type: 'success' | 'error' | null;
    msg: string | null;
}

// --- API Response Types ---

/**
 * Standard wrapper untuk semua response API.
 */
export interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
    error?: string
}

/**
 * Interface untuk model data Kontak.
 */
export interface Contact {
    id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
}

export interface ContactCount {
    count: number
}

export interface AnalyticsSummary {
    totalVisitors: number
    totalPageViews: number
    uniqueVisitors: number
    topPages: Array<{
        page: string
        count: number
    }>
}

export interface SystemHealth {
    uptime: number
    message: string
    timestamp: string
}

export interface DeletedCount {
    deletedCount: number
}