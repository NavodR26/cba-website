import { client, urlFor } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

async function getChairman() {
  return await client.fetch(`*[_type == "chairman"][0]`)
}

const CATEGORY_COLORS: Record<string, string> = {
  Tea: '#7a1f2a',
  Rubber: '#1f6f43',
  Coconut: '#b67419',
  Meeting: '#27548a',
}

function colorFor(...parts: (string | undefined)[]) {
  const text = parts.filter(Boolean).join(' ').toLowerCase()
  if (!text) return '#555'
  const order = ['Meeting', 'Tea', 'Rubber', 'Coconut']
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

// Handles both ISO timestamps ("1899-12-30T09:55:28.000Z" from Excel sheets)
// and free-form strings ("8.30 a.m") from the API.
function formatTime(t: any) {
  if (!t) return ''
  if (typeof t !== 'string') return String(t)
  // ISO timestamp -> extract clock time
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

export default async function EventsChairman() {
  const events = await getEvents()
  const chairman = await getChairman()

  const today = new Date()

  const upcoming = events
    .filter((e: any) => e.start_date && e.start_date >= today)
    .sort(
      (a: any, b: any) =>
        a.start_date.getTime() - b.start_date.getTime()
    )

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10">
        {/* LEFT - EVENTS */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <a
              href="/resources"
              className="text-sm font-semibold text-[var(--maroon)] hover:underline"
            >
              View all →
            </a>
          </div>

          <div className="space-y-3">
            {upcoming.slice(0, 5).map((event: any, i: number) => {
              const { day, month } = dayMonth(event.start_date)
              const color = colorFor(event.title, event.category, event.type)
              return (
                <div
                  key={i}
                  className="group flex bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-[var(--maroon)]/40 hover:shadow-md transition overflow-hidden"
                >
                  {/* Date block */}
                  <div
                    className="flex flex-col items-center justify-center px-5 py-4 text-white shrink-0 w-20"
                    style={{ background: color }}
                  >
                    <span className="text-2xl font-bold leading-none">{day}</span>
                    <span className="text-[10px] tracking-widest mt-1 opacity-90">
                      {month}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {event.title}
                        {event.sale_no && (
                          <span className="ml-2 text-xs font-normal text-gray-500">
                            Sale {event.sale_no}
                          </span>
                        )}
                      </h3>

                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>{formatDate(event.start_date)}</span>
                        {event.end_date && (
                          <span>· Day 2: {formatDate(event.end_date)}</span>
                        )}
                        {event.time && (
                          <span>· {formatTime(event.time)}</span>
                        )}
                      </div>

                      {event.catalogue_close && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium">
                          Catalogue close: {formatDate(event.catalogue_close)}
                        </p>
                      )}
                    </div>

                    <span
                      className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full text-white shrink-0"
                      style={{ background: color }}
                    >
                      {event.category || event.type || 'Event'}
                    </span>
                  </div>
                </div>
              )
            })}

            {upcoming.length === 0 && (
              <p className="text-sm text-gray-400 italic">
                No upcoming events.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT - CHAIRMAN */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
          <div className="p-7 md:p-8">
            <div className="flex items-center gap-2 text-[var(--maroon)] dark:text-amber-300 mb-3">
              <span className="text-3xl leading-none font-serif">&ldquo;</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Chairman&rsquo;s Message
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-6">
              {chairman?.message ||
                'A message from our Chairman will appear here once published in the CMS.'}
            </p>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-neutral-700 flex items-center gap-4">
              {chairman?.photo && (
                <img
                  src={urlFor(chairman.photo).width(120).url()}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--maroon)]/20"
                  alt={chairman.name}
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {chairman?.name || 'Chairman'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {chairman?.designation || 'Chairman, CBA'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
