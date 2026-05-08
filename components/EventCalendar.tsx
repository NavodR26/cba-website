'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
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

const CATEGORY_COLORS: Record<string, string> = {
  Tea: '#7a1f2a',
  Rubber: '#1f6f43',
  Coconut: '#b67419',
  Meeting: '#27548a',
  Default: '#555555',
}

function colorFor(cat?: string) {
  if (!cat) return CATEGORY_COLORS.Default
  const key = Object.keys(CATEGORY_COLORS).find((k) =>
    cat.toLowerCase().includes(k.toLowerCase())
  )
  return key ? CATEGORY_COLORS[key] : CATEGORY_COLORS.Default
}

function toIso(d: string | Date | undefined | null) {
  if (!d) return undefined
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString().slice(0, 10)
}

export default function EventCalendar({ events }: { events: EventType[] }) {
  const [selected, setSelected] = useState<EventType | null>(null)

  const formattedEvents = useMemo(
    () =>
      events
        .map((e) => {
          const start = toIso(e.start_date)
          if (!start) return null
          const color = colorFor(e.category || e.type)
          return {
            title: e.sale_no ? `${e.title} (Sale ${e.sale_no})` : e.title,
            start,
            end: toIso(e.end_date) || undefined,
            backgroundColor: color,
            borderColor: color,
            textColor: '#ffffff',
            extendedProps: e,
          }
        })
        .filter(Boolean) as any[],
    [events]
  )

  const legendItems = [
    { label: 'Tea Auction', color: CATEGORY_COLORS.Tea },
    { label: 'Rubber Auction', color: CATEGORY_COLORS.Rubber },
    { label: 'Coconut Auction', color: CATEGORY_COLORS.Coconut },
    { label: 'Meeting', color: CATEGORY_COLORS.Meeting },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Categories
        </span>
        {legendItems.map((l) => (
          <span key={l.label} className="flex items-center gap-2 text-xs text-gray-700">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: l.color }}
            />
            {l.label}
          </span>
        ))}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        height="auto"
        firstDay={1}
        fixedWeekCount={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        buttonText={{ today: 'Today' }}
        eventClick={(info) => {
          info.jsEvent.preventDefault()
          setSelected(info.event.extendedProps as EventType)
        }}
        eventDisplay="block"
        dayMaxEvents={3}
        moreLinkClassNames="cba-more-link"
      />

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-4 text-white"
              style={{ background: colorFor(selected.category || selected.type) }}
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

            <div className="px-6 py-5 space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-28 shrink-0">Date</span>
                <span>{new Date(selected.start_date).toDateString()}</span>
              </div>

              {selected.end_date && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-900 w-28 shrink-0">Day 2</span>
                  <span>{new Date(selected.end_date).toDateString()}</span>
                </div>
              )}

              {selected.time && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-900 w-28 shrink-0">Time</span>
                  <span>{selected.time}</span>
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
                  <span className="text-red-600">{selected.catalogue_close}</span>
                </div>
              )}

              {selected.notes && (
                <p className="pt-2 border-t border-gray-100 text-gray-600">
                  {selected.notes}
                </p>
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50 text-right">
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
