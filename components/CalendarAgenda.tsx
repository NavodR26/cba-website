type Event = {
  title?: string
  start_date: string | null
  end_date?: string | null
  category?: string
  type?: string
  sale_no?: string
  catalogue_close?: string
  time?: string
  location?: string
}

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

function formatDay(d: any) {
  if (!d) return { day: '--', month: '---', weekday: '' }
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return { day: '--', month: '---', weekday: '' }
  return {
    day: date.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: date.toLocaleDateString('en-GB', { weekday: 'long' }),
  }
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

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export default function CalendarAgenda({ events }: { events: Event[] }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = events
    .filter((e) => {
      if (!e.start_date) return false
      const d = new Date(e.start_date)
      if (Number.isNaN(d.getTime())) return false
      return d >= today
    })
    .sort(
      (a, b) =>
        new Date(a.start_date as string).getTime() -
        new Date(b.start_date as string).getTime()
    )
    .slice(0, 8)

  const todaysEvents = upcoming.filter((e) =>
    isSameDay(new Date(e.start_date as string), today)
  )

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-8">
        {/* TODAY */}
        <div className="lg:col-span-1">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Today
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
            {today.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </h2>

          <div className="mt-5 space-y-3">
            {todaysEvents.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">
                  No events scheduled for today.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Check the agenda for upcoming dates.
                </p>
              </div>
            ) : (
              todaysEvents.map((e, i) => {
                const color = colorFor(e.title, e.category, e.type)
                return (
                  <article
                    key={i}
                    className="relative bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
                  >
                    <span
                      className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                      style={{ background: color }}
                    />
                    <p
                      className="text-[10px] uppercase tracking-wider font-bold"
                      style={{ color }}
                    >
                      {e.category || e.type || 'Event'}
                    </p>
                    <h3 className="mt-1 font-bold text-gray-900">
                      {e.title}
                      {e.sale_no && (
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          Sale {e.sale_no}
                        </span>
                      )}
                    </h3>
                    {e.time && (
                      <p className="mt-1 text-sm text-gray-600">
                        {formatTime(e.time)}
                      </p>
                    )}
                  </article>
                )
              })
            )}
          </div>
        </div>

        {/* AGENDA */}
        <div className="lg:col-span-2">
          <div className="flex items-end justify-between mb-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-bold uppercase tracking-wider">
                Agenda
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
                Next 8 events
              </h2>
            </div>
          </div>

          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No upcoming events.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 border border-gray-200 rounded-2xl bg-white overflow-hidden">
              {upcoming.map((e, i) => {
                const color = colorFor(e.title, e.category, e.type)
                const { day, month, weekday } = formatDay(e.start_date)
                return (
                  <li
                    key={i}
                    className="flex flex-col gap-4 p-4 hover:bg-gray-50 transition sm:flex-row sm:items-center sm:gap-5"
                  >
                    {/* date */}
                    <div className="flex w-full shrink-0 items-center gap-3 sm:block sm:w-16 sm:text-center">
                      <p className="text-2xl font-bold text-gray-900 leading-none">
                        {day}
                      </p>
                      <p className="text-[10px] tracking-widest text-gray-500 font-bold sm:mt-1">
                        {month}
                      </p>
                      <p className="text-[10px] text-gray-400 sm:mt-0.5">
                        {weekday.slice(0, 3)}
                      </p>
                    </div>

                    {/* color rail */}
                    <span
                      className="hidden self-stretch w-1 rounded-full sm:block"
                      style={{ background: color }}
                    />

                    {/* details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {e.title}
                        {e.sale_no && (
                          <span className="ml-2 text-xs font-normal text-gray-500">
                            Sale {e.sale_no}
                          </span>
                        )}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500">
                        {e.time && <span>{formatTime(e.time)}</span>}
                        {e.location && <span>· {e.location}</span>}
                        {e.catalogue_close && (
                          <span className="text-red-600 font-medium">
                            · Cat. close: {formatDate(e.catalogue_close)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* category pill */}
                    <span
                      className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full text-white shrink-0"
                      style={{ background: color }}
                    >
                      {e.category || e.type || 'Event'}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
