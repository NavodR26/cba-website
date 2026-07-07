// 'use client'

// import { useEffect, useState } from 'react'

// type EventLite = {
//   title: string
//   start_date: string | Date | null
//   category?: string
//   type?: string
//   sale_no?: string
// }

// function formatShort(d: string | Date | null) {
//   if (!d) return ''
//   const date = d instanceof Date ? d : new Date(d)
//   if (Number.isNaN(date.getTime())) return ''
//   return date.toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   })
// }

// function nowParts() {
//   const now = new Date()
//   return {
//     date: now.toLocaleDateString('en-GB', {
//       timeZone: 'Asia/Colombo',
//       weekday: 'short',
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     }),
//     time: now.toLocaleTimeString('en-GB', {
//       timeZone: 'Asia/Colombo',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     }),
//   }
// }

// function ColomboClock() {
//   const [parts, setParts] = useState(() => nowParts())

//   useEffect(() => {
//     // Keep the displayed time fresh without triggering sync setState in effect.
//     const id = setInterval(() => setParts(nowParts()), 30 * 1000)

//     return () => clearInterval(id)
//   }, [])

//   return (
//     <span
//       suppressHydrationWarning
//       className="flex items-center gap-2 text-xs text-white/90 tabular-nums whitespace-nowrap"
//     >
//       <svg
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="opacity-80"
//       >
//         <circle cx="12" cy="12" r="9" />
//         <path d="M12 7v5l3 2" />
//       </svg>
//       <span className="hidden md:inline">Colombo</span>
//       <span suppressHydrationWarning className="hidden sm:inline">{parts.date}</span>
//       <span className="opacity-60 hidden sm:inline">·</span>
//       <span suppressHydrationWarning className="font-semibold">{parts.time}</span>
//     </span>
//   )
// }

// export default function TopBar({ events }: { events: EventLite[] }) {
//   const today = new Date()

//   const upcoming = (events || [])
//     .filter((e) => e?.start_date && new Date(e.start_date) >= today)
//     .sort(
//       (a, b) =>
//         new Date(a.start_date ?? 0).getTime() -
//         new Date(b.start_date ?? 0).getTime()
//     )
//     .slice(0, 6)

//   const sequence = upcoming.length ? [...upcoming, ...upcoming] : []

//   return (
//     <div className="relative bg-gradient-to-r from-[var(--maroon)] via-[#5a1828] to-[var(--maroon)] text-white text-xs overflow-hidden group hover-glow transition-all duration-300">
//       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_40%_50%,rgba(255,193,7,0.1),transparent_50%)]"></div>
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-stretch min-h-[40px] relative z-10">
//         <div className="flex-1 min-w-0 flex items-center gap-3">
//           <span className="hidden md:flex items-center gap-2 shrink-0 pr-3 mr-3 border-r border-white/20 font-semibold uppercase tracking-wider animate-fade-in-scale">
//             <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 animate-pulse shadow-lg shadow-amber-300/50" />
//             Live
//           </span>

//           {sequence.length === 0 ? (
//             <span className="py-2.5 opacity-85 truncate animate-fade-in-scale">
//               Welcome to the Colombo Brokers&rsquo; Association
//             </span>
//           ) : (
//             <div className="overflow-hidden flex-1">
//               <div className="ticker-track flex whitespace-nowrap py-3">
//                 {sequence.map((e, i) => (
//                   <span key={i} className="flex items-center gap-2 mx-6 group/item hover:opacity-100 transition-opacity duration-300">
//                     <span className="font-semibold opacity-95 group-hover/item:text-amber-300 transition-colors duration-300">
//                       {e.category || e.type || 'Event'}:
//                     </span>
//                     <span className="group-hover/item:text-amber-100 transition-colors duration-300">{e.title}</span>
//                     {e.sale_no && (
//                       <span className="opacity-80 group-hover/item:opacity-100 transition-opacity duration-300">· Sale {e.sale_no}</span>
//                     )}
//                     <span className="opacity-50 group-hover/item:opacity-80 transition-opacity duration-300">·</span>
//                     <span className="opacity-95 group-hover/item:text-amber-200 font-medium transition-colors duration-300">
//                       {formatShort(e.start_date)}
//                     </span>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center pl-3 sm:pl-4 sm:ml-4 sm:border-l sm:border-white/20 shrink-0">
//           <ColomboClock />
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'

type EventLite = {
  title: string
  start_date: string | Date | null
  category?: string
  type?: string
  sale_no?: string
}

function formatShort(d: string | Date | null) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function nowParts() {
  const now = new Date()
  return {
    date: now.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Colombo',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    time: now.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Colombo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  }
}

function InfoWidget() {
  const [parts, setParts] = useState(() => nowParts())
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [rateLabel, setRateLabel] = useState<string>('loading')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setParts(nowParts()), 30 * 1000)
    return () => clearInterval(id)
  }, [])

  function formatRelativeTime(timestamp: number | null) {
    if (!timestamp) return 'loading'
    const diff = Date.now() - timestamp
    if (diff < 5000) return 'just now'
    if (diff < 60 * 1000) return `${Math.round(diff / 1000)}s ago`
    if (diff < 60 * 60 * 1000) return `${Math.round(diff / (60 * 1000))}m ago`
    return `${Math.round(diff / (60 * 60 * 1000))}h ago`
  }

  useEffect(() => {
    let isMounted = true
    let rateUpdatedAt: number | null = null

    async function fetchExchangeRate() {
      try {
        const response = await fetch('/api/exchange-rate', { cache: 'no-store' })
        if (!response.ok) return
        const data = await response.json()
        const rate = Number(data?.rate ?? data?.rates?.LKR)
        if (!Number.isFinite(rate)) return
        if (isMounted) {
          setExchangeRate(rate)
          rateUpdatedAt = Date.now()
        }
      } catch (error) {
        console.error('Unable to load USD/LKR rate', error)
      }
    }

    fetchExchangeRate()
    const intervalId = window.setInterval(fetchExchangeRate, 60 * 1000)
    
    const tick = window.setInterval(() => {
      if (rateUpdatedAt) {
        setRateLabel(formatRelativeTime(rateUpdatedAt))
      }
    }, 15 * 1000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
      window.clearInterval(tick)
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/80 group-hover:text-white transition-colors"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <span suppressHydrationWarning className="hidden sm:inline text-white/90 font-medium text-xs">
          {parts.time}
        </span>
        <span className="hidden md:inline text-white/70 text-xs">
          USD {exchangeRate !== null ? exchangeRate.toFixed(2) : '--'}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-white/60 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in-scale">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-xs font-medium">Colombo Time</span>
              <span className="text-gray-900 text-xs font-semibold">{parts.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-xs font-medium">Date</span>
              <span className="text-gray-900 text-xs font-semibold">{parts.date}</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-xs font-medium">USD/LKR</span>
              <span className="text-gray-900 text-xs font-semibold">
                {exchangeRate !== null ? exchangeRate.toFixed(2) : '--'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-xs font-medium">Updated</span>
              <span className="text-gray-500 text-xs">{rateLabel}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TopBar({ events }: { events: EventLite[] }) {
  const today = new Date()

  const upcoming = (events || [])
    .filter((e) => e?.start_date && new Date(e.start_date) >= today)
    .sort(
      (a, b) =>
        new Date(a.start_date ?? 0).getTime() -
        new Date(b.start_date ?? 0).getTime()
    )
    .slice(0, 6)

  const sequence = upcoming.length ? [...upcoming, ...upcoming] : []

  return (
    <div
      className="cba-site-topbar fixed left-0 right-0 top-0 z-50 w-full box-border bg-gradient-to-r from-[var(--maroon)] via-[#5a1828] to-[var(--maroon)] text-white text-xs overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_40%_50%,rgba(255,193,7,0.15),transparent_50%)]"></div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center h-[2.5rem] relative z-10">
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 animate-pulse shadow-lg shadow-amber-300/50" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Live</span>
          </div>

          {sequence.length === 0 ? (
            <span className="py-2 opacity-85 truncate text-white/90">
              Welcome to the Colombo Brokers&rsquo; Association
            </span>
          ) : (
            <div className="min-w-0 overflow-hidden flex-1">
              <div className="ticker-track flex whitespace-nowrap py-2">
                {sequence.map((e, i) => (
                  <span key={i} className="flex items-center gap-2 mx-6 group/item hover:opacity-100 transition-opacity duration-300">
                    <span className="font-semibold opacity-95 group-hover/item:text-amber-300 transition-colors duration-300 text-[11px]">
                      {e.category || e.type || 'Event'}:
                    </span>
                    <span className="group-hover/item:text-amber-100 transition-colors duration-300 text-[11px]">{e.title}</span>
                    {e.sale_no && (
                      <span className="opacity-80 group-hover/item:opacity-100 transition-opacity duration-300 text-[11px]">· Sale {e.sale_no}</span>
                    )}
                    <span className="opacity-40 group-hover/item:opacity-60 transition-opacity duration-300">·</span>
                    <span className="opacity-95 group-hover/item:text-amber-200 font-medium transition-colors duration-300 text-[11px]">
                      {formatShort(e.start_date)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {sequence.length > 0 && (
            <span className="min-w-0 truncate py-2 font-medium text-white/85 sm:hidden text-[11px]">
              Auction updates
            </span>
          )}
        </div>

        <div className="flex items-center pl-4 sm:ml-4 sm:border-l sm:border-white/20 shrink-0">
          <InfoWidget />
        </div>
      </div>
    </div>
  )
}
