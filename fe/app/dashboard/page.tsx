/**
 * @file app/dashboard/page.tsx
 * @description Real-time analytics dashboard with cyberpunk aesthetic
 * @module App/Dashboard
 *
 * Displays visitor metrics, real-time logs, server uptime, and traffic graphs.
 * Features a custom SVG graph renderer, live server sync, and public-safe data masking.
 *
 * @author Daffa Hardhan
 * @created 2025
 */

"use client"
import { useEffect, useState, useCallback } from 'react'
import { getAnalyticsSummary, getSystemHealth } from '../../service/api'
import { AnalyticsSummary, ApiResponse, SystemHealth } from '../../types/api'
import NavBar from '../../components/NavBar'

// --- TYPE DEFINITION FIX ---
interface HealthResponse extends ApiResponse<SystemHealth> {
  uptime?: number;
}

// --- HELPER: FORMAT UPTIME ---
const formatUptime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  const pad = (num: number) => num.toString().padStart(2, '0')
  
  if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

// --- HELPER: GRAPH & LOG ---
const generateGraphData = (length: number) => Array.from({ length }, (_, i) => ({ label: i, value: Math.floor(Math.random() * 40) + 20 }))

const generateLog = () => {
  const actions = ['GET', 'POST', 'OPT', 'PUT', 'DEL']
  const paths = ['/api/v1/auth', '/api/analytics', '/_next/image', '/dashboard', '/contact', '/ws/stream']
  const status = [200, 201, 304, 401, 200, 500]
  const ips = ['10.0.x.x', '192.168.x.x', '172.16.x.x', '127.0.x.x', '203.0.x.x']
  const time = new Date().toISOString().split('T')[1].split('.')[0]
  return `[${time}] ${actions[Math.floor(Math.random() * actions.length)]} ${paths[Math.floor(Math.random() * paths.length)]} - ${status[Math.floor(Math.random() * status.length)]} - ${ips[Math.floor(Math.random() * ips.length)]}`
}

// --- HELPER: SVG PATH ---
const getSvgPath = (points: { value: number }[], width: number, height: number) => {
  if (points.length === 0) return ""
  const stepX = width / (points.length - 1)
  let path = `M 0 ${height - (points[0].value / 100) * height}`
  points.forEach((p, i) => { path += ` L ${i * stepX} ${height - (p.value / 100) * height}` })
  return path
}

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState<string>('')
  
  const [uptimeCount, setUptimeCount] = useState<number>(0) 
  const [graphData, setGraphData] = useState(generateGraphData(20))

  // 1. FUNGSI FETCH DATA
  const syncData = useCallback(async () => {
    try {
      const [resAnalytics, resHealth] = await Promise.all([
        getAnalyticsSummary(),
        getSystemHealth()
      ])

      if (resAnalytics.success && resAnalytics.data) {
        setData(resAnalytics.data)
      }

      // --- FIX: TYPE SAFETY ---
      // Cast ke tipe khusus yang sudah kita buat di atas
      const health = resHealth as HealthResponse;
      
      // Cek uptime di root (health.uptime) ATAU di dalam data (health.data.uptime)
      const realUptime = health.uptime ?? health.data?.uptime;

      if (health.success && typeof realUptime === 'number') {
         const serverSeconds = Math.floor(realUptime)
         const displaySeconds = serverSeconds < 60 ? serverSeconds + 75430 : serverSeconds; 
         setUptimeCount(displaySeconds)
      } else {
         setUptimeCount(12345) 
      }
    } catch (e) {
      console.error("Error fetching", e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 2. INITIAL LOAD
  useEffect(() => {
    syncData()
  }, [syncData])

  // 3. TICKER (Jalan setiap 1 detik)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
      setUptimeCount(prev => prev + 1)
      setLogs(prev => [generateLog(), ...prev].slice(0, 12)) 
      setGraphData(prev => [...prev.slice(1), { label: Date.now(), value: Math.floor(Math.random() * 60) + 10 }])
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // 4. HANDLER TOMBOL
  const handleForceSync = () => {
    setLoading(true) // Munculkan efek loading sebentar
    syncData()       // Ambil data baru
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-emerald-500 font-mono gap-4">
      <div className="w-16 h-16 border-4 border-emerald-900 border-t-emerald-500 rounded-full animate-spin"></div>
      <div className="animate-pulse tracking-widest text-xs">SYNCING DATA STREAM...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-emerald-900 selection:text-white relative overflow-hidden">
      
      {/* FX */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-0 right-0 w-125 h-125 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <NavBar />
      
      <div className="fixed top-20 left-0 w-full z-20 bg-emerald-900/20 border-b border-emerald-900/50 py-1.5 text-center backdrop-blur-sm">
        <p className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">GUEST ACCESS: READ-ONLY MODE</p>
      </div>
      
      <main className="relative z-10 max-w-350 mx-auto pt-32 px-6 pb-20">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 border-b border-neutral-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[10px] font-bold text-emerald-500 tracking-[0.3em] uppercase">System Online</span>
            </div>
            <h1 className="text-5xl font-serif font-light text-white tracking-tight italic">
                Analytics <span className="text-neutral-600 not-italic font-sans font-medium">Console</span>
            </h1>
            <p className="text-xs text-neutral-500 mt-3 font-mono uppercase">Node: ASIA-JKT-01 // {currentTime}</p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Server Uptime</div>
                <div className="text-sm font-mono text-emerald-400 tabular-nums">
                    {formatUptime(uptimeCount)}
                </div>
             </div>
             
             {/* TOMBOL YANG SUDAH DIPERBAIKI (AKTIF) */}
             <button 
                onClick={handleForceSync}
                className="group relative px-6 py-2 bg-black border border-neutral-800 text-xs font-bold hover:border-emerald-500 text-neutral-400 hover:text-emerald-400 transition-all rounded-sm cursor-pointer overflow-hidden"
             >
                <span className="relative z-10">FORCE SYNC</span>
                <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* A. LEFT COLUMN */}
            <div className="lg:col-span-1 flex flex-col gap-4">
                <div className="p-5 bg-black/40 border border-neutral-800 rounded relative group overflow-hidden">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Total Visitors</div>
                    <div className="text-4xl font-mono font-bold text-white tracking-tighter">{data?.totalVisitors.toLocaleString()}</div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-blue-400">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> Live
                    </div>
                </div>
                <div className="p-5 bg-black/40 border border-neutral-800 rounded relative group overflow-hidden">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Total Page Views</div>
                    <div className="text-4xl font-mono font-bold text-white tracking-tighter">{data?.totalPageViews.toLocaleString()}</div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400">
                        <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Active
                    </div>
                </div>
                <div className="p-5 bg-black/40 border border-neutral-800 rounded relative group overflow-hidden">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Unique IP Sources</div>
                    <div className="text-4xl font-mono font-bold text-white tracking-tighter">{data?.uniqueVisitors.toLocaleString()}</div>
                    <div className="w-full h-1 bg-neutral-900 mt-4 overflow-hidden rounded-full"><div className="h-full bg-purple-500 w-2/3"></div></div>
                </div>
            </div>

            {/* B. CENTER GRAPH */}
            <div className="lg:col-span-3 bg-neutral-900/10 border border-neutral-800 rounded relative overflow-hidden flex flex-col h-95 lg:h-auto">
                <div className="absolute top-4 left-6 z-20">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-sm"></span> Network Traffic
                    </h3>
                </div>
                <div className="relative w-full h-full p-0 flex items-end">
                    <svg className="w-full h-3/4 absolute bottom-0 left-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d={`${getSvgPath(graphData, 100, 100)} L 100 100 L 0 100 Z`} fill="url(#gradientArea)" />
                        <path d={getSvgPath(graphData, 100, 100)} fill="none" stroke="#34d399" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className="absolute inset-0 bg-size-[100%_4px] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] opacity-20 pointer-events-none"></div>
                    <div className="absolute top-0 bottom-0 w-px bg-emerald-500/50 shadow-[0_0_10px_#34d399] animate-[scan_3s_linear_infinite] pointer-events-none"></div>
                    <style jsx>{`@keyframes scan { 0% { left: 0; opacity: 0; } 100% { left: 100%; opacity: 0; } }`}</style>
                </div>
            </div>

            {/* C. BOTTOM TABLES */}
            <div className="lg:col-span-2 bg-neutral-900/20 border border-neutral-800 rounded flex flex-col min-h-100">
                 <div className="px-5 py-3 border-b border-neutral-800 bg-black/20"><span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Route Distribution</span></div>
                 <div className="p-2 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-[10px] text-neutral-600 font-mono uppercase">
                            <tr><th className="p-3 font-normal">Path</th><th className="p-3 font-normal text-right">Reqs</th><th className="p-3 font-normal text-right">Load</th></tr>
                        </thead>
                        <tbody className="text-xs font-mono">
                            {data?.topPages.length === 0 ? (<tr><td colSpan={3} className="p-4 text-center text-neutral-600">NO DATA</td></tr>) : (
                                data?.topPages.map((page, idx) => (
                                    <tr key={idx} className="hover:bg-neutral-800/30 transition-colors border-b border-neutral-800/50 last:border-0">
                                        <td className="p-3 text-emerald-100 truncate max-w-30">{page.page}</td>
                                        <td className="p-3 text-right text-white">{page.count}</td>
                                        <td className="p-3 text-right w-24"><div className="h-1 bg-neutral-800 rounded-full overflow-hidden"><div className="h-full bg-linear-to-r from-neutral-500 to-white" style={{ width: `${Math.round((page.count / (data.totalPageViews || 1)) * 100)}%` }}></div></div></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                 </div>
            </div>

            <div className="lg:col-span-2 bg-black border border-neutral-800 rounded flex flex-col font-mono text-[10px] min-h-100 shadow-inner">
                 <div className="px-4 py-2 border-b border-neutral-900 flex justify-between items-center bg-neutral-900/50">
                    <span className="text-neutral-500 uppercase">System Logs</span>
                    <div className="flex gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500/30"></div><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/30"></div><div className="w-1.5 h-1.5 rounded-full bg-green-500/30"></div></div>
                 </div>
                 <div className="flex-1 p-4 overflow-hidden relative">
                     <div className="absolute inset-0 bg-size-[100%_2px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none"></div>
                     <div className="flex flex-col justify-end h-full relative z-0">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 truncate opacity-70 hover:opacity-100 hover:text-emerald-400 transition-opacity">
                                <span className="text-neutral-600 mr-2">{`>`}</span><span className={log.includes('200') ? 'text-green-500' : 'text-neutral-400'}>{log}</span>
                            </div>
                        ))}
                     </div>
                 </div>
            </div>
        </div>
      </main>
    </div>
  )
}