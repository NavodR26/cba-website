'use client'

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
    <section>
      <div className="border-b border-slate-100 bg-gradient-to-br from-white to-[#faf8f5] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Calendar overview
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{monthLabel}</p>
          </div>
          <div className="rounded-xl bg-[var(--maroon)] px-3 py-2 text-right text-white shadow-sm">
            <p className="text-xl font-bold leading-none">{total}</p>
            <p className="mt-0.5 text-[10px] font-medium text-white/75">
              Scheduled {total === 1 ? 'event' : 'events'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 divide-x divide-slate-100">
          {breakdown.map((b) => (
            <div key={b.key} className="flex min-w-0 flex-col gap-1 px-3 py-3 first:pl-5 last:pr-5 sm:px-4">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: b.color }}
              />
              <div className="min-w-0">
                <p className="text-lg font-bold leading-none text-slate-900">
                  {b.count}
                </p>
                <p className="mt-1 truncate text-[10px] font-medium text-slate-500">{b.key}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
