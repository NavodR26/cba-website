'use client'

function formatDate(d: any) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function Ticker({ events }: any) {
  const today = new Date()
  const upcoming = (events || [])
    .filter((e: any) => e?.start_date && new Date(e.start_date) >= today)
    .sort(
      (a: any, b: any) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    )
    .slice(0, 8)

  if (!upcoming.length) return null

  // Render twice for seamless loop
  const sequence = [...upcoming, ...upcoming]

  return (
    <div className="bg-[var(--maroon)] text-white text-sm overflow-hidden border-y border-white/10">
      <div className="flex items-center">
        <div className="hidden sm:flex items-center gap-2 shrink-0 px-5 py-2.5 bg-black/15 font-semibold uppercase tracking-wider text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Live Updates
        </div>

        <div className="ticker-track flex whitespace-nowrap">
          {sequence.map((e: any, i: number) => (
            <span key={i} className="flex items-center gap-3 mx-8 py-2.5">
              <span className="font-medium">{e.title}</span>
              <span className="text-white/70">·</span>
              <span className="text-white/85">{formatDate(e.start_date)}</span>
              {e.sale_no && (
                <>
                  <span className="text-white/70">·</span>
                  <span className="text-white/85">Sale {e.sale_no}</span>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
