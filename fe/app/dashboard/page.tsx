"use client"
import { useEffect, useState, useCallback, useRef } from 'react'
import { getAnalyticsSummary, getSystemHealth } from '../../service/api'
import { AnalyticsSummary, ApiResponse, SystemHealth } from '../../types/api'
import NavBar from '../../components/NavBar'

// --- TYPE DEFINITIONS ---

// 1. Definisikan tipe respon Health yang spesifik.
// Karena backend /health mengembalikan { uptime: number } di root, bukan di dalam 'data'.
// Kita extend ApiResponse<SystemHealth> agar properti standar (success, message) tetap ada.
interface HealthResponse extends ApiResponse<SystemHealth> {
    uptime?: number;     // Handle jika ada di root
    timestamp?: string;  // Handle jika ada di root
}

interface MetricCardProps {
    label: string;
    value: string | number;
    color: string;
    className?: string;
}

// --- HELPER FUNCTIONS ---

const formatUptime = (totalSeconds: number) => {
    const safeSeconds = Math.max(0, totalSeconds);
    const days = Math.floor(safeSeconds / (3600 * 24));
    const hours = Math.floor((safeSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = Math.floor(safeSeconds % 60);

    const pad = (num: number) => num.toString().padStart(2, '0');
    
    if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const generateGraphData = (length: number) => Array.from({ length }, (_, i) => ({ label: i, value: Math.floor(Math.random() * 40) + 20 }))

const getSvgPath = (points: { value: number }[], width: number, height: number) => {
    if (points.length === 0) return ""
    const stepX = width / (points.length - 1)
    let path = `M 0 ${height - (points[0].value / 100) * height}`
    points.forEach((p, i) => { path += ` L ${i * stepX} ${height - (p.value / 100) * height}` })
    return path
}

const generateLog = () => {
    const methods = ['GET', 'POST', 'OPT'];
    const codes = [200, 201, 304];
    return `[${new Date().toLocaleTimeString()}] ${methods[Math.floor(Math.random()*methods.length)]} /api/v1 - ${codes[Math.floor(Math.random()*codes.length)]} OK`;
}

export default function DashboardPage() {
  // --- STATE ---
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [uptime, setUptime] = useState<number>(0)
  
  // Visual Effects State
  const [logs, setLogs] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState<string>('')
  const [graphData, setGraphData] = useState(generateGraphData(20))

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // 1. FUNGSI FETCH REAL DATA
  const fetchData = useCallback(async () => {
    try {
        // Parallel Request
        // Kita casting getSystemHealth ke Promise<HealthResponse> karena backend Anda mengembalikan struktur hybrid
        const [resAnalytics, resHealth] = await Promise.all([
            getAnalyticsSummary(),
            getSystemHealth() as unknown as Promise<HealthResponse> 
        ]);

        // 1. Handle Analytics Data
        if (resAnalytics.success && resAnalytics.data) {
            setData(resAnalytics.data);
        }

        // 2. Handle Uptime (Type Safe)
        // Cek 'uptime' di root level (backend spesifik) ATAU di dalam 'data' (standar wrapper)
        const realUptime = resHealth.uptime ?? resHealth.data?.uptime;

        if (typeof realUptime === 'number') {
            setUptime(Math.floor(realUptime));
        }

    } catch (error) {
        console.error("Dashboard Sync Error:", error);
    } finally {
        setLoading(false);
    }
  }, []);

  // 2. INITIAL MOUNT & POLLING
  useEffect(() => {
    fetchData();

    pollingRef.current = setInterval(() => {
        fetchData(); 
    }, 30000);

    return () => {
        if (pollingRef.current) clearInterval(pollingRef.current);
    }
  }, [fetchData]);
  
  // 3. VISUAL TICKER
  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
        setUptime(prev => prev + 1); // Client-side prediction increment
        setLogs(prev => [generateLog(), ...prev].slice(0, 8));
        setGraphData(prev => [...prev.slice(1), { label: Date.now(), value: Math.floor(Math.random() * 60) + 10 }]);
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (loading) return (
     <div className="min-h-screen bg-black flex flex-col gap-4 items-center justify-center font-mono text-emerald-500">
         <div className="w-12 h-12 border-4 border-emerald-900 border-t-emerald-500 rounded-full animate-spin"></div>
         <div className="text-xs animate-pulse tracking-widest">ESTABLISHING UPLINK...</div>
     </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-emerald-900 selection:text-white pb-24 md:pb-10">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

      <NavBar />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center">
          <span className="text-xs font-bold text-white tracking-widest">ANALYTICS</span>
          <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono text-emerald-500">LIVE</span>
          </div>
      </div>
      
      <main className="relative z-10 max-w-7xl mx-auto pt-20 md:pt-32 px-4 md:px-6">
        
        {/* HEADER DESKTOP */}
        <div className="hidden md:flex items-end justify-between mb-8 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[10px] font-bold text-emerald-500 tracking-[0.3em] uppercase">System Online</span>
            </div>
            <h1 className="text-4xl font-serif text-white">System <span className="text-neutral-500 font-sans font-bold">Metrics</span></h1>
            <p className="text-xs text-neutral-500 mt-2 font-mono uppercase">Node: ASIA-JKT-01 // {currentTime}</p>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Server Uptime</div>
             <div className="text-xl font-mono text-emerald-400 tabular-nums tracking-widest">{formatUptime(uptime)}</div>
          </div>
        </div>

        {/* RESPONSIVE GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* 1. METRICS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 lg:col-span-1">
                <MetricCard 
                    label="Total Visitors" 
                    value={data?.totalVisitors?.toLocaleString() ?? '0'} 
                    color="text-white" 
                />
                <MetricCard 
                    label="Page Views" 
                    value={data?.totalPageViews?.toLocaleString() ?? '0'} 
                    color="text-emerald-400" 
                />
                <MetricCard 
                    label="Unique IPs" 
                    value={data?.uniqueVisitors?.toLocaleString() ?? '0'} 
                    color="text-blue-400" 
                    className="col-span-2 md:col-span-1" 
                />
            </div>

            {/* 2. MAIN GRAPH */}
            <div className="lg:col-span-3 bg-neutral-900/10 border border-neutral-800 rounded-xl relative overflow-hidden h-64 md:h-auto min-h-62.5 md:min-h-87.5 flex flex-col justify-end group">
                <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-white/5 backdrop-blur-sm">
                        Network Throughput
                    </span>
                </div>
                
                <svg className="w-full h-3/4 absolute bottom-0 left-0 transition-opacity duration-1000 opacity-80 group-hover:opacity-100" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={`${getSvgPath(graphData, 100, 100)} L 100 100 L 0 100 Z`} fill="url(#gradientArea)" />
                    <path d={getSvgPath(graphData, 100, 100)} fill="none" stroke="#34d399" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                </svg>
                
                {/* Scanline FX */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 w-px bg-emerald-500/50 shadow-[0_0_15px_#34d399] animate-[scan_4s_linear_infinite] pointer-events-none"></div>
                <style jsx>{`@keyframes scan { 0% { left: 0; opacity: 0; } 50% { opacity: 1; } 100% { left: 100%; opacity: 0; } }`}</style>
            </div>

            {/* 3. TABLE */}
            <div className="lg:col-span-2 bg-neutral-900/20 border border-neutral-800 rounded-xl overflow-hidden flex flex-col h-64 md:h-80">
                 <div className="px-4 py-3 border-b border-neutral-800 bg-white/5 flex justify-between items-center">
                     <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Top Access Routes</span>
                     <div className="flex gap-1">
                         <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span>
                     </div>
                 </div>
                 <div className="flex-1 overflow-y-auto overflow-x-auto p-0 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                    <table className="w-full text-left border-collapse min-w-75">
                        <thead className="text-[9px] text-neutral-600 font-mono uppercase bg-neutral-900/90 backdrop-blur-sm sticky top-0 z-10">
                            <tr>
                                <th className="p-3 font-normal">Path</th>
                                <th className="p-3 font-normal text-right">Reqs</th>
                                <th className="p-3 font-normal text-right w-20">Load</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-mono text-neutral-300">
                            {(!data?.topPages || data.topPages.length === 0) ? (
                                <tr><td colSpan={3} className="p-4 text-center text-neutral-600 italic">No traffic data yet...</td></tr>
                            ) : (
                                data.topPages.map((page, idx) => {
                                    const total = data.totalPageViews || 1;
                                    const percentage = Math.round((page.count / total) * 100);
                                    
                                    return (
                                        <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                                            <td className="p-3 truncate max-w-37.5 font-medium text-emerald-50/80 group-hover:text-white transition-colors">
                                                {page.page}
                                            </td>
                                            <td className="p-3 text-right">{page.count}</td>
                                            <td className="p-3 text-right vertical-align-middle">
                                                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden ml-auto">
                                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                 </div>
            </div>

            {/* 4. LOGS */}
            <div className="lg:col-span-2 bg-black border border-neutral-800 rounded-xl flex flex-col font-mono text-[10px] h-64 md:h-80 shadow-inner overflow-hidden relative">
                 <div className="px-4 py-2 border-b border-neutral-900 bg-neutral-900/80 flex items-center justify-between z-20">
                    <span className="text-neutral-500 uppercase">Gateway Logs</span>
                    <div className="flex items-center gap-2">
                         <span className="text-[9px] text-neutral-600">SSH-2.0</span>
                         <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                 </div>
                 
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-size-[20px_20px] opacity-20 pointer-events-none z-0"></div>

                 <div className="flex-1 p-3 overflow-y-hidden flex flex-col justify-end relative z-10">
                     <div className="absolute top-0 left-0 w-full h-16 bg-linear-to-b from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
                     {logs.map((log, i) => (
                         <div key={i} className="mb-1 truncate text-neutral-500 border-l-2 border-transparent hover:border-emerald-500 hover:text-emerald-400 hover:pl-2 transition-all cursor-default font-mono">
                             <span className="text-neutral-700 mr-2 opacity-50">{`>`}</span>
                             <span className={log.includes('200') ? 'text-neutral-400' : 'text-yellow-600'}>{log}</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
      </main>
    </div>
  )
}

function MetricCard({ label, value, color, className = "" }: MetricCardProps) {
    return (
        <div className={`p-5 bg-neutral-900/40 border border-neutral-800 rounded-xl flex flex-col justify-between backdrop-blur-sm group hover:border-neutral-700 transition-colors ${className}`}>
            <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{label}</span>
                 <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                 </div>
            </div>
            <span className={`text-3xl md:text-4xl font-mono font-medium tracking-tighter ${color} drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
                {value}
            </span>
        </div>
    )
}