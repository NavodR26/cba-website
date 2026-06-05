type CalendarEvent = {
  title: string
  start_date?: string | Date | null
  end_date?: string | Date | null
  location?: string
  notes?: string
}

function toCalendarDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export default function AddToCalendarLink({ event }: { event: CalendarEvent }) {
  if (!event.start_date) return null
  const start = toCalendarDate(event.start_date)
  const end = toCalendarDate(event.end_date || event.start_date)
  if (!start || !end) return null

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.notes || 'CBA auction calendar event',
    location: event.location || 'Colombo Brokers Association',
  })

  return (
    <a
      href={`https://calendar.google.com/calendar/render?${params.toString()}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-bold text-gray-600 transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]"
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
      Calendar
    </a>
  )
}
