type Event = {
  start_date: string | null
  end_date?: string | null
  category?: string
  type?: string
  title?: string
}

const CATEGORIES = [
  { key: 'Tea', color: '#7a1f2a' },
  { key: 'Rubber', color: '#1f6f43' },
  { key: 'Coconut', color: '#b67419' },
  { key: 'Committee', color: '#27548a' },
  { key: 'AGM', color: '#6d28d9' },
] as const

function isThisMonth(d: string | null) {
  if (!d) return false
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return false
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
}

function matchCat(e: Event, k: string) {
  const text = [e.title, e.category, e.type].filter(Boolean).join(' ').toLowerCase()
  return text.includes(k.toLowerCase())
}

export default function CalendarStats({ events }: { events: Event[] }) {
  const thisMonth = events.filter((e) => isThisMonth(e.start_date))
  const total = thisMonth.length

  const breakdown = CATEGORIES.map((c) => ({
    ...c,
    count: thisMonth.filter((e) => matchCat(e, c.key)).length,
  }))

  const monthLabel = new Date().toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 animate-fade-in-scale">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden hover-glow transition-all duration-300">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
              This Month
            </p>
            <p className="text-lg font-bold text-gray-900">{monthLabel}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-2xl font-bold text-[var(--maroon)] leading-none animate-fade-in-scale">{total}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Scheduled {total === 1 ? 'event' : 'events'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-gray-100">
          {breakdown.map((b, i) => (
            <div key={b.key} className="px-3 py-3 flex items-center gap-2 hover-lift transition-transform duration-300 animate-fade-in-scale" style={{ animationDelay: `${i * 60}ms` }}>
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: b.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xl font-bold text-gray-900 leading-none">
                  {b.count}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{b.key}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
