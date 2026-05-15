import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import SectionReveal from '@/components/SectionReveal'
import EventCalendarClient from '@/components/EventCalendarClient'
import CalendarStats from '@/components/CalendarStats'
import CalendarAgenda from '@/components/CalendarAgenda'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "Auction Calendar | The Colombo Brokers' Association",
  description:
    "Premium auction scheduling for tea, rubber, coconut, committee meetings and AGM events. A professional calendar for Sri Lanka's commodity market.",
  openGraph: {
    title: "Auction Calendar | The Colombo Brokers' Association",
    description:
      "Premium auction scheduling for tea, rubber, coconut, committee meetings and AGM events.",
  },
}

export default async function EventsPage() {
  const events = await getEvents()

  const safeEvents = events.map((e: any) => ({
    ...e,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    end_date: e.end_date ? new Date(e.end_date).toISOString() : null,
  }))

  return (
    <main className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHero
        badge="Auction Schedule"
        title="Auction & Meeting"
        subtitle="Calendar"
        description="Schedule of tea, rubber, coconut and AGM events with a refined institutional agenda."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Calendar' },
        ]}
      />

      <SectionReveal>
        <CalendarStats events={safeEvents} />
      </SectionReveal>

      <SectionReveal>
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
                  Month View
                </span>
                <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                  Click any event for full details, including time, location and catalogue close. Add events directly to your personal calendar.
                </p>
              </div>
              <div className="rounded-[2rem] border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
                <EventCalendarClient events={safeEvents} />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">
                  Event legend
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[var(--maroon)]" />
                    <span className="text-sm text-gray-700">Tea Auctions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#1f6f43]" />
                    <span className="text-sm text-gray-700">Rubber Auctions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#b67419]" />
                    <span className="text-sm text-gray-700">Coconut Auctions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#27548a]" />
                    <span className="text-sm text-gray-700">Committee Meetings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#6d28d9]" />
                    <span className="text-sm text-gray-700">AGM Events</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">
                  Agenda view
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Upcoming events are shown below the calendar with more room for dates, sale numbers and catalogue close information.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      </SectionReveal>

      <CalendarAgenda events={safeEvents} />

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[1400px] mx-auto rounded-2xl bg-gradient-to-br from-[var(--maroon)] to-[#3d0f17] text-white p-8 md:p-12 relative overflow-hidden animate-fade-in-scale transition-all duration-300">
          <div
            aria-hidden
            className="absolute top-0 right-0 w-72 h-72 rounded-full bg-amber-300/10 -translate-y-1/2 translate-x-1/3"
          />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                Stay Updated
              </span>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">
                Never miss a sale
              </h2>
              <p className="mt-2 text-white/80 max-w-md text-sm leading-relaxed">
                Click the <strong className="text-amber-200">Add to Calendar</strong> button on any event to add it to your Google, Apple or Outlook calendar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/resources"
                className="px-7 py-3 bg-white text-[var(--maroon)] font-semibold rounded-lg hover:bg-amber-50 transition"
              >
                View Circulars
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 font-semibold rounded-lg transition"
              >
                Contact Secretariat
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
