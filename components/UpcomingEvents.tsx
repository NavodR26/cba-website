'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'
import AddToCalendarLink from '@/components/AddToCalendarLink'

export type SerializedEvent = {
  id?: string
  type?: string
  category?: string
  title?: string
  sale_no?: string
  start_date: string | null
  end_date?: string | null
  catalogue_close?: string
  time?: string
  location?: string
  notes?: string
}

type ParsedEvent = Omit<SerializedEvent, 'start_date' | 'end_date'> & { start_date: Date | null; end_date?: Date | null }

const categoryColors: Record<string, { primary: string; secondary: string }> = {
  Tea: { primary: '#7a1f2a', secondary: '#9c2a3a' },
  Rubber: { primary: '#1f7747', secondary: '#2f985b' },
  Coconut: { primary: '#b67419', secondary: '#d69439' },
  Spices: { primary: '#854d0e', secondary: '#a56d2e' },
  Meeting: { primary: '#27548a', secondary: '#37649a' },
}

function parseEvent(event: SerializedEvent): ParsedEvent {
  const { start_date, end_date, ...rest } = event
  return { ...rest, start_date: start_date ? new Date(start_date) : null, end_date: end_date ? new Date(end_date) : null }
}

function colorFor(...parts: (string | undefined)[]) {
  const text = parts.filter(Boolean).join(' ').toLowerCase()
  return Object.entries(categoryColors).find(([category]) => text.includes(category.toLowerCase()))?.[1] ?? { primary: '#475569', secondary: '#64748b' }
}

function formatDate(date: Date | null | undefined) {
  if (!date || Number.isNaN(date.getTime())) return 'Date to be confirmed'
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
}

function formatTime(time: string | undefined) {
  if (!time) return 'Time to be confirmed'
  if (!/^\d{4}-\d{2}-\d{2}T/.test(time)) return time
  const date = new Date(time)
  return Number.isNaN(date.getTime()) ? 'Time to be confirmed' : date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function dayMonth(date: Date | null | undefined) {
  if (!date || Number.isNaN(date.getTime())) return { day: '--', month: 'TBC' }
  return { day: date.toLocaleDateString('en-GB', { day: '2-digit' }), month: date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase() }
}

export default function UpcomingEvents({ initialEvents = [] }: { initialEvents?: SerializedEvent[] }) {
  const upcoming = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return initialEvents.map(parseEvent).filter((event) => event.start_date && !Number.isNaN(event.start_date.getTime()) && event.start_date >= today).sort((first, second) => first.start_date!.getTime() - second.start_date!.getTime()).slice(0, 6)
  }, [initialEvents])

  const auctionCount = upcoming.filter((event) => `${event.category} ${event.title}`.toLowerCase().includes('auction')).length
  const meetingCount = upcoming.filter((event) => `${event.category} ${event.title}`.toLowerCase().includes('meeting')).length
  const nextEvent = upcoming[0]

  return (
    <section className="cba-events-hub relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="cba-events-hub__ambient pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.header initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }} className="grid gap-6 border-b border-[#0a1b38]/10 pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8d2330]"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b82a3b]/40" /><span className="relative h-2 w-2 rounded-full bg-[#b82a3b]" /></span>Live events</p>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.35rem)] font-bold leading-none tracking-[-0.055em] text-[#091936]">Upcoming auctions <span className="text-[#c99b2e]">&amp; meetings.</span></h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"><span><strong className="text-[#091936]">{auctionCount}</strong> auctions scheduled</span><span className="h-1 w-1 rounded-full bg-[#c99b2e]" /><span><strong className="text-[#091936]">{meetingCount}</strong> meetings scheduled</span></div>
          </div>
          <Link href="/resources" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#8d2330] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(141,35,48,.2)] transition hover:-translate-y-0.5 hover:bg-[#681721]">View full calendar <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">&rarr;</span></Link>
        </motion.header>

        {nextEvent ? (
          <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,.94fr)_minmax(0,1.06fr)] lg:gap-7">
            <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="cba-events-featured relative overflow-hidden rounded-3xl p-6 text-white sm:p-8">
              <div className="cba-events-featured__art pointer-events-none absolute inset-0" aria-hidden />
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0c665]">Next on the calendar</p><h3 className="mt-3 max-w-md text-[clamp(1.65rem,2.6vw,2.35rem)] font-bold leading-tight tracking-[-0.04em]">{nextEvent.title || 'CBA event'}</h3></div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur-sm"><p className="text-2xl font-bold leading-none">{dayMonth(nextEvent.start_date).day}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white/70">{dayMonth(nextEvent.start_date).month}</p></div>
              </div>
              <div className="relative z-10 mt-7 grid gap-3 text-[13px] text-white/78 sm:grid-cols-2"><p className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15">◷</span>{formatTime(nextEvent.time)}</p><p className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15">◫</span>{formatDate(nextEvent.start_date)}</p></div>
              {nextEvent.catalogue_close && <p className="relative z-10 mt-5 inline-flex rounded-full border border-[#f0c665]/25 bg-[#f0c665]/10 px-3 py-2 text-[11px] font-semibold text-[#f4d27c]">Catalogue closes {formatDate(new Date(nextEvent.catalogue_close))}</p>}
              <div className="relative z-10 mt-7 flex flex-wrap gap-3"><Link href="/resources" className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8d2330] transition hover:bg-[#f7e6b8]">Event details <span className="text-lg">&rarr;</span></Link><AddToCalendarLink event={{ title: nextEvent.title || 'CBA Event', start_date: nextEvent.start_date, end_date: nextEvent.end_date, location: nextEvent.location, notes: nextEvent.notes }} /></div>
            </motion.article>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
              <div className="mb-3 flex items-center justify-between"><h3 className="text-[15px] font-bold tracking-[-0.02em] text-[#091936]">Next five events</h3><Link href="/resources" className="text-[11px] font-bold uppercase tracking-[0.11em] text-[#8d2330]">Calendar &rarr;</Link></div>
              <div className="space-y-2.5">
                {upcoming.slice(1, 6).map((event, index) => {
                  const colors = colorFor(event.title, event.category, event.type)
                  const date = dayMonth(event.start_date)
                  return <motion.div key={event.id || `${event.title}-${index}`} variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0, transition: { duration: 0.42 } } }}><Link href="/resources" className="cba-events-list-item group flex items-center gap-4 rounded-2xl p-3.5 sm:p-4"><span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-white shadow-sm" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}><strong className="text-[18px] leading-none">{date.day}</strong><span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.12em]">{date.month}</span></span><span className="min-w-0 flex-1"><strong className="block truncate text-[14px] text-[#0a1b38]">{event.title || 'CBA event'}</strong><span className="mt-1 block text-[11px] text-slate-500">{event.time ? formatTime(event.time) : 'Time to be confirmed'}</span></span><span className="hidden rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white sm:block" style={{ background: colors.primary }}>{event.category || event.type || 'Event'}</span><span className="text-lg text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-[#8d2330]">&rarr;</span></Link></motion.div>
                })}
              </div>
            </motion.div>
          </div>
        ) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center text-sm text-slate-500">No upcoming events are currently scheduled.</div>}
      </div>
    </section>
  )
}
