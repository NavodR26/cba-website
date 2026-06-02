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

function ColomboClock() {
  const [parts, setParts] = useState(() => nowParts())

  useEffect(() => {
    // Keep the displayed time fresh without triggering sync setState in effect.
    const id = setInterval(() => setParts(nowParts()), 30 * 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <span
      suppressHydrationWarning
      className="flex items-center gap-2 text-xs text-white/90 tabular-nums whitespace-nowrap"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-80"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      <span className="hidden md:inline">Colombo</span>
      <span suppressHydrationWarning className="hidden sm:inline">{parts.date}</span>
      <span className="opacity-60 hidden sm:inline">·</span>
      <span suppressHydrationWarning className="font-semibold">{parts.time}</span>
    </span>
  )
}

export default function TopBar({ events }: { events: EventLite[] }) {
  const today = new Date()
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [rateUpdatedAt, setRateUpdatedAt] = useState<number | null>(null)
  const [rateLabel, setRateLabel] = useState<string>('loading rate')

  const upcoming = (events || [])
    .filter((e) => e?.start_date && new Date(e.start_date) >= today)
    .sort(
      (a, b) =>
        new Date(a.start_date ?? 0).getTime() -
        new Date(b.start_date ?? 0).getTime()
    )
    .slice(0, 6)

  const sequence = upcoming.length ? [...upcoming, ...upcoming] : []

  function formatRelativeTime(timestamp: number | null) {
    if (!timestamp) return 'loading rate'
    const diff = Date.now() - timestamp
    if (diff < 5000) return 'just now'
    if (diff < 60 * 1000) return `${Math.round(diff / 1000)}s ago`
    if (diff < 60 * 60 * 1000) return `${Math.round(diff / (60 * 1000))}m ago`
    return `${Math.round(diff / (60 * 60 * 1000))}h ago`
  }

  useEffect(() => {
    let isMounted = true

    async function fetchExchangeRate() {
      const endpoints = ['/api/exchange-rate']

      for (const url of endpoints) {
        try {
          const response = await fetch(url, { cache: 'no-store' })
          if (!response.ok) continue

          const data = await response.json()
          const rate = Number(data?.rate ?? data?.rates?.LKR)

          if (!Number.isFinite(rate)) continue

          if (isMounted) {
            setExchangeRate(rate)
            setRateUpdatedAt(Date.now())
          }
          return
        } catch (error) {
          console.error('Unable to load USD/LKR rate from', url, error)
        }
      }

      if (isMounted) {
        setRateLabel('temporarily unavailable')
      }
    }

    fetchExchangeRate()
    const intervalId = window.setInterval(fetchExchangeRate, 60 * 1000)
    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (exchangeRate === null) return
    if (!rateUpdatedAt) return

    setRateLabel(formatRelativeTime(rateUpdatedAt))
    const tick = window.setInterval(() => {
      setRateLabel(formatRelativeTime(rateUpdatedAt))
    }, 15 * 1000)

    return () => window.clearInterval(tick)
  }, [exchangeRate, rateUpdatedAt])

  return (
    <div
      className="cba-site-topbar fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-[var(--maroon)] via-[#5a1828] to-[var(--maroon)] text-white text-xs overflow-hidden group shadow-lg"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_40%_50%,rgba(255,193,7,0.1),transparent_50%)]"></div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center h-11 relative z-10">
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2 shrink-0 pr-3 mr-3 border-r border-white/20 font-semibold uppercase tracking-wider animate-fade-in-scale">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 animate-pulse shadow-lg shadow-amber-300/50" />
            Live
          </span>

          {sequence.length === 0 ? (
            <span className="py-2.5 opacity-85 truncate animate-fade-in-scale">
              Welcome to the Colombo Brokers&rsquo; Association
            </span>
          ) : (
            <div className="min-w-0 overflow-hidden flex-1">
              <div className="ticker-track flex whitespace-nowrap py-3">
                {sequence.map((e, i) => (
                  <span key={i} className="flex items-center gap-2 mx-6 group/item hover:opacity-100 transition-opacity duration-300">
                    <span className="font-semibold opacity-95 group-hover/item:text-amber-300 transition-colors duration-300">
                      {e.category || e.type || 'Event'}:
                    </span>
                    <span className="group-hover/item:text-amber-100 transition-colors duration-300">{e.title}</span>
                    {e.sale_no && (
                      <span className="opacity-80 group-hover/item:opacity-100 transition-opacity duration-300">· Sale {e.sale_no}</span>
                    )}
                    <span className="opacity-50 group-hover/item:opacity-80 transition-opacity duration-300">·</span>
                    <span className="opacity-95 group-hover/item:text-amber-200 font-medium transition-colors duration-300">
                      {formatShort(e.start_date)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {sequence.length > 0 && (
            <span className="min-w-0 truncate py-2.5 font-medium text-white/85 sm:hidden">
              Auction updates
            </span>
          )}
        </div>

        <div className="flex items-center pl-3 sm:pl-4 sm:ml-4 sm:border-l sm:border-white/20 shrink-0 gap-3 sm:gap-4">
          <ColomboClock />

          <div className="text-right flex-col text-xs text-white/90 whitespace-nowrap">
            <span className="font-semibold text-white">
              USD/LKR {exchangeRate !== null ? exchangeRate.toFixed(2) : '--'}
            </span>
            <span className="opacity-70 text-[10px] leading-snug mt-0.5 block">
              {exchangeRate !== null ? rateLabel || 'just now' : rateLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
