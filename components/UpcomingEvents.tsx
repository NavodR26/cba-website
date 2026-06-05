'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getEvents } from '@/lib/events'
import AddToCalendarLink from '@/components/AddToCalendarLink'

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

export default function UpcomingEvents() {
  const [upcoming, setUpcoming] = useState<any[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const events = await getEvents()
      const today = new Date()
      const filtered = events
        .filter((e: any) => e.start_date && e.start_date >= today)
        .sort((a: any, b: any) => a.start_date.getTime() - b.start_date.getTime())
        .slice(0, 6)
      setUpcoming(filtered)
    }
    fetchEvents()
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    }),
  };

  const dateVariants = {
    hidden: { scale: 0.6, opacity: 0 },
    visible: (i: number) => ({
      scale: 1, opacity: 1,
      transition: {
        delay: i * 0.08 + 0.15,
        type: 'spring' as const,
        stiffness: 300,
        damping: 18,
      },
    }),
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute -left-32 top-0 w-72 h-72 rounded-full bg-[var(--maroon)]/5 blur-3xl" />
      <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-amber-300/5 blur-3xl" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-bold uppercase tracking-widest">
              Live Events
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Upcoming Auctions & Meetings
            </h2>
            <p className="mt-1 text-sm text-gray-500">Next 6 scheduled events in the official calendar</p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[var(--maroon)] hover:bg-[var(--maroon)]/90 px-4 py-2 rounded-full transition shrink-0"
          >
            View Calendar
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-12">
            No upcoming events at the moment.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {upcoming.map((event: any, i: number) => {
              const { day, month } = dayMonth(event.start_date)
              const color = colorFor(event.title, event.category, event.type)
              return (
                <motion.article
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  className="group flex bg-white rounded-2xl border border-gray-200/80 hover:border-[var(--maroon)]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="flex flex-col items-center justify-center px-5 py-4 text-white shrink-0 w-[92px] bg-gradient-to-br"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                  >
                    <motion.span custom={i} variants={dateVariants} className="text-3xl font-bold leading-none">
                      {day}
                    </motion.span>
                    <span className="text-[10px] tracking-widest mt-1 opacity-95 font-semibold">
                      {month}
                    </span>
                  </div>

                  <div className="flex-1 p-5 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate text-sm">
                      {event.title}
                    </h3>
                    {event.sale_no && (
                      <p className="text-xs text-gray-500 mt-1">
                        Sale {event.sale_no}
                      </p>
                    )}

                    <div className="mt-3 space-y-0.5 text-xs text-gray-600">
                      <p className="font-medium">{formatDate(event.start_date)}</p>
                      {event.end_date && (
                        <p className="text-gray-500">Day 2: {formatDate(event.end_date)}</p>
                      )}
                      {event.time && <p>{formatTime(event.time)}</p>}
                    </div>

                    {event.catalogue_close && (
                      <p className="mt-2 text-xs text-amber-600 font-semibold">
                        📋 Cat. close: {formatDate(event.catalogue_close)}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className="inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: color }}
                      >
                        {event.category || event.type || 'Event'}
                      </span>
                      <AddToCalendarLink event={event} />
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
