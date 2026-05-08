import Link from 'next/link'
import { getEvents } from '@/lib/events'

const CATEGORY_COLORS: Record<string, string> = {
  Tea: '#7a1f2a',
  Rubber: '#1f6f43',
  Coconut: '#b67419',
  Spices: '#854d0e',
  Meeting: '#27548a',
}

function colorFor(...parts: (string | undefined)[]) {
  const text = parts.filter(Boolean).join(' ').toLowerCase()
  if (!text) return '#555'
  const order = ['Meeting', 'Tea', 'Rubber', 'Coconut', 'Spices']
  for (const k of order) {
    if (text.includes(k.toLowerCase())) return CATEGORY_COLORS[k]
  }
  return '#555'
}

function formatDate(d: any) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(t: any) {
  if (!t) return ''
  if (typeof t !== 'string') return String(t)
  if (/^\d{4}-\d{2}-\d{2}T/.test(t)) {
    const d = new Date(t)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }
  return t
}

function dayMonth(d: any) {
  if (!d) return { day: '', month: '' }
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return { day: '', month: '' }
  return {
    day: date.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
  }
}

export default async function UpcomingEvents() {
  const events = await getEvents()
  const today = new Date()

  const upcoming = events
    .filter((e: any) => e.start_date && e.start_date >= today)
    .sort(
      (a: any, b: any) => a.start_date.getTime() - b.start_date.getTime()
    )
    .slice(0, 6)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              Schedule
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Upcoming Auctions &amp; Meetings
            </h2>
          </div>
          <Link
            href="/events"
            className="text-sm font-semibold text-[var(--maroon)] hover:underline shrink-0"
          >
            View full calendar →
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-12">
            No upcoming events at the moment.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((event: any, i: number) => {
              const { day, month } = dayMonth(event.start_date)
              const color = colorFor(event.title, event.category, event.type)
              return (
                <article
                  key={i}
                  className="group flex bg-white rounded-xl border border-gray-200 hover:border-[var(--maroon)]/40 hover:shadow-lg hover:-translate-y-0.5 transition overflow-hidden"
                >
                  <div
                    className="flex flex-col items-center justify-center px-5 py-4 text-white shrink-0 w-[88px]"
                    style={{ background: color }}
                  >
                    <span className="text-3xl font-bold leading-none">
                      {day}
                    </span>
                    <span className="text-[10px] tracking-widest mt-1 opacity-90">
                      {month}
                    </span>
                  </div>

                  <div className="flex-1 p-4 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {event.title}
                    </h3>
                    {event.sale_no && (
                      <p className="text-xs text-gray-500">
                        Sale {event.sale_no}
                      </p>
                    )}

                    <div className="mt-2 space-y-0.5 text-xs text-gray-500">
                      <p>{formatDate(event.start_date)}</p>
                      {event.end_date && (
                        <p>Day 2: {formatDate(event.end_date)}</p>
                      )}
                      {event.time && <p>{formatTime(event.time)}</p>}
                    </div>

                    {event.catalogue_close && (
                      <p className="mt-2 text-xs text-red-600 font-medium">
                        Cat. close: {formatDate(event.catalogue_close)}
                      </p>
                    )}

                    <span
                      className="inline-block mt-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full text-white"
                      style={{ background: color }}
                    >
                      {event.category || event.type || 'Event'}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
