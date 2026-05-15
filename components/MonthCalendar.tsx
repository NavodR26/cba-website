'use client'

import { useMemo, useState } from 'react'

type EventType = {
  title: string
  start_date: string | Date
  end_date?: string | Date | null
  catalogue_close?: string
  location?: string
  time?: string
  category?: string
  type?: string
  sale_no?: string
  notes?: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; soft: string }> = {
  Tea: { bg: '#7a1f2a', text: '#ffffff', soft: 'rgba(122,31,42,0.1)' },
  Rubber: { bg: '#1f6f43', text: '#ffffff', soft: 'rgba(31,111,67,0.1)' },
  Coconut: { bg: '#b67419', text: '#ffffff', soft: 'rgba(182,116,25,0.12)' },
  Committee: { bg: '#27548a', text: '#ffffff', soft: 'rgba(39,84,138,0.1)' },
  AGM: { bg: '#6d28d9', text: '#ffffff', soft: 'rgba(109,40,217,0.12)' },
  Default: { bg: '#555555', text: '#ffffff', soft: 'rgba(85,85,85,0.1)' },
}

function colorFor(...parts: (string | undefined)[]) {
  const text = parts.filter(Boolean).join(' ').toLowerCase()
  if (!text) return CATEGORY_COLORS.Default
  const order = ['AGM', 'Committee', 'Tea', 'Rubber', 'Coconut'] as const
  for (const k of order) {
    if (text.includes(k.toLowerCase())) return CATEGORY_COLORS[k]
  }
  return CATEGORY_COLORS.Default
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
function formatLong(d: any) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatTimeMaybe(t: any) {
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

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

function buildICS(e: EventType) {
  const start = new Date(e.start_date as any)
  const end = e.end_date ? new Date(e.end_date as any) : new Date(start)
  // All-day event format: YYYYMMDD
  const dateStr = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const endDate = new Date(end)
  endDate.setDate(endDate.getDate() + 1) // ICS DTEND is exclusive for all-day
  const summary = (e.sale_no ? `${e.title} (Sale ${e.sale_no})` : e.title)
    .replace(/\n/g, ' ')
  const desc = [
    e.category && `Category: ${e.category}`,
    e.location && `Location: ${e.location}`,
    e.time && `Time: ${e.time}`,
    e.notes,
  ]
    .filter(Boolean)
    .join('\\n')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CBA//Calendar//EN',
    'BEGIN:VEVENT',
    `UID:${dateStr(start)}-${Math.random().toString(36).slice(2)}@cba.lk`,
    `DTSTAMP:${dateStr(new Date())}T000000Z`,
    `DTSTART;VALUE=DATE:${dateStr(start)}`,
    `DTEND;VALUE=DATE:${dateStr(endDate)}`,
    `SUMMARY:${summary}`,
    desc && `DESCRIPTION:${desc}`,
    e.location && `LOCATION:${e.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')
}

function downloadICS(e: EventType) {
  const blob = new Blob([buildICS(e)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(e.title || 'event').replace(/[^\w-]+/g, '_')}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const ALL_CATEGORIES = ['Tea', 'Rubber', 'Coconut', 'Committee', 'AGM'] as const

export default function MonthCalendar({ events }: { events: EventType[] }) {
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState<Date>(startOfMonth(today))
  const [selected, setSelected] = useState<EventType | null>(null)
  const [enabled, setEnabled] = useState<Set<string>>(
    new Set(ALL_CATEGORIES as unknown as string[])
  )

  const monthLabel = cursor.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  function toggleCat(cat: string) {
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const visibleEvents = useMemo(() => {
    const activeCategories = Array.from(enabled)
    return events.filter((e) => {
      const text = `${e.title || ''} ${e.category || ''} ${e.type || ''}`.toLowerCase()
      for (const k of activeCategories) {
        if (text.includes(k.toLowerCase())) return true
      }
      return activeCategories.length === ALL_CATEGORIES.length
    })
  }, [events, enabled])

  // Build a 6-week grid (Mon-first)
  const grid = useMemo(() => {
    const first = startOfMonth(cursor)
    // Mon=0..Sun=6
    const offset = (first.getDay() + 6) % 7
    const start = new Date(first)
    start.setDate(first.getDate() - offset)

    const days: Date[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      days.push(d)
    }
    return days
  }, [cursor])

  // Map day -> events
  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventType[]>()
    for (const e of visibleEvents) {
      if (!e.start_date) continue
      const start = new Date(e.start_date as any)
      if (Number.isNaN(start.getTime())) continue
      const end = e.end_date ? new Date(e.end_date as any) : null
      const lastDay = end && !Number.isNaN(end.getTime()) ? end : start

      const cur = new Date(start)
      cur.setHours(0, 0, 0, 0)
      const last = new Date(lastDay)
      last.setHours(0, 0, 0, 0)

      while (cur <= last) {
        const key = cur.toDateString()
        const arr = map.get(key) || []
        arr.push(e)
        map.set(key, arr)
        cur.setDate(cur.getDate() + 1)
      }
    }
    return map
  }, [visibleEvents])

  const filterChips = [
    { label: 'Tea', color: CATEGORY_COLORS.Tea.bg },
    { label: 'Rubber', color: CATEGORY_COLORS.Rubber.bg },
    { label: 'Coconut', color: CATEGORY_COLORS.Coconut.bg },
    { label: 'Committee', color: CATEGORY_COLORS.Committee.bg },
    { label: 'AGM', color: CATEGORY_COLORS.AGM.bg },
  ]

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
      {/* HEADER */}
      <div className="px-4 py-5 flex flex-col gap-4 border-b border-gray-100 dark:border-neutral-800 md:px-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center gap-2 sm:gap-3 lg:w-auto">
          <button
            aria-label="Previous month"
            onClick={() => setCursor(addMonths(cursor, -1))}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-[var(--maroon)] transition flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            ‹
          </button>
          <h3 className="min-w-0 flex-1 text-center text-lg font-bold text-[var(--maroon)] dark:text-amber-300 sm:text-xl md:text-2xl lg:min-w-[180px]">
            {monthLabel}
          </h3>
          <button
            aria-label="Next month"
            onClick={() => setCursor(addMonths(cursor, 1))}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-[var(--maroon)] transition flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            ›
          </button>
          <button
            onClick={() => setCursor(startOfMonth(new Date()))}
            className="ml-1 hidden px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:border-[var(--maroon)] hover:text-[var(--maroon)] dark:hover:text-amber-300 transition sm:ml-2 sm:inline-flex sm:px-3.5"
          >
            Today
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {filterChips.map((l) => {
            const on = enabled.has(l.label)
            return (
              <button
                key={l.label}
                onClick={() => toggleCat(l.label)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                  on
                    ? 'border-transparent text-white'
                    : 'border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                }`}
                style={on ? { background: l.color } : undefined}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: on ? '#fff' : l.color }}
                />
                {l.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* WEEKDAYS */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-100 dark:border-neutral-800">
        {weekdays.map((w) => (
          <div
            key={w}
            className="py-3 text-center text-[11px] font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400"
          >
            {w}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-7">
          {grid.map((day, i) => {
            const inMonth = day.getMonth() === cursor.getMonth()
            const isToday = isSameDay(day, today)
            const dayEvents = eventsByDay.get(day.toDateString()) || []
            const visible = dayEvents.slice(0, 3)
            const more = dayEvents.length - visible.length

            return (
              <div
                key={i}
                className={`relative min-h-[86px] p-1.5 border-r border-b border-gray-100 dark:border-neutral-800 sm:min-h-[110px] sm:p-2 md:min-h-[120px] ${
                  inMonth
                    ? 'bg-white dark:bg-neutral-900'
                    : 'bg-gray-50/60 dark:bg-neutral-800/40'
                } ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center text-xs font-semibold ${
                      isToday
                        ? 'w-6 h-6 rounded-full bg-[var(--maroon)] text-white'
                        : inMonth
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>

                <div className="mt-1.5 space-y-1">
                  {visible.map((e, idx) => {
                    const c = colorFor(e.title, e.category, e.type)
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelected(e)}
                        className="w-full text-left truncate rounded px-1 py-0.5 text-[9px] font-medium hover:opacity-90 transition sm:px-1.5 sm:text-[10.5px]"
                        style={{ background: c.bg, color: c.text }}
                        title={e.title}
                      >
                        {e.sale_no ? `${e.title} · S${e.sale_no}` : e.title}
                      </button>
                    )
                  })}
                  {more > 0 && (
                    <button
                      onClick={() => setSelected(dayEvents[0])}
                      className="text-[9px] font-semibold text-[var(--maroon)] hover:underline sm:text-[10.5px]"
                    >
                      +{more} more
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-4 text-white"
              style={{
                background: colorFor(selected.title, selected.category, selected.type).bg,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">
                  {selected.title}
                  {selected.sale_no && (
                    <span className="ml-2 text-sm font-normal opacity-90">
                      (Sale {selected.sale_no})
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="text-white/80 hover:text-white text-xl leading-none -mt-0.5"
                >
                  ×
                </button>
              </div>
              {(selected.category || selected.type) && (
                <p className="mt-1 text-xs uppercase tracking-wider opacity-90">
                  {selected.category || selected.type}
                </p>
              )}
            </div>

            <div className="px-6 py-5 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-28 shrink-0">Date</span>
                <span>{formatLong(selected.start_date)}</span>
              </div>

              {selected.end_date && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-900 w-28 shrink-0">Day 2</span>
                  <span>{formatLong(selected.end_date)}</span>
                </div>
              )}

              {selected.time && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-900 w-28 shrink-0">Time</span>
                  <span>{formatTimeMaybe(selected.time)}</span>
                </div>
              )}

              {selected.location && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-900 w-28 shrink-0">Location</span>
                  <span>{selected.location}</span>
                </div>
              )}

              {selected.catalogue_close && (
                <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                  <span className="font-medium text-red-600 w-28 shrink-0">Cat. Close</span>
                  <span className="text-red-600">
                    {formatLong(selected.catalogue_close)}
                  </span>
                </div>
              )}

              {selected.notes && (
                <p className="pt-2 border-t border-gray-100 text-gray-600">
                  {selected.notes}
                </p>
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50 dark:bg-neutral-800/50 flex items-center justify-between gap-3">
              <button
                onClick={() => downloadICS(selected)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:border-[var(--maroon)] hover:text-[var(--maroon)] dark:hover:text-amber-300 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                Add to Calendar
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-1.5 text-sm rounded-md bg-[var(--maroon)] text-white hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
