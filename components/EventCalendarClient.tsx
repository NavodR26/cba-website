'use client'

import MonthCalendar from './MonthCalendar'

export default function EventCalendarClient({ events }: { events: any[] }) {
  return <MonthCalendar events={events} />
}
