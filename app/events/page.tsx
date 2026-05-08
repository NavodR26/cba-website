import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import EventCalendarClient from '@/components/EventCalendarClient'
import CalendarStats from '@/components/CalendarStats'
import CalendarAgenda from '@/components/CalendarAgenda'
import Reveal from '@/components/Reveal'
import { getEvents } from '@/lib/events'

export default async function EventsPage() {
  const events = await getEvents()

  // Date objects don't survive the server -> client boundary as Dates;
  // serialize them to ISO strings so the client component handles them safely.
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
        badge="Live Schedule"
        title="Auction & Meeting Calendar"
        description="Live schedule of tea, rubber, coconut and spices auctions — including catalogue closures and committee meetings."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Calendar' },
        ]}
      />

      {/* MONTHLY STATS — overlapping the hero */}
      <CalendarStats events={safeEvents} />

      {/* CALENDAR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              Month View
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
              Browse by month
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
              Click any event for full details — including time, location and
              catalogue close. Add events directly to your personal calendar.
            </p>
          </div>
          <EventCalendarClient events={safeEvents} />
        </div>
      </section>

      {/* TODAY + AGENDA */}
      <CalendarAgenda events={safeEvents} />

      {/* SUBSCRIBE BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[1400px] mx-auto rounded-2xl bg-gradient-to-br from-[var(--maroon)] to-[#3d0f17] text-white p-10 md:p-12 relative overflow-hidden animate-fade-in-scale hover-glow transition-all duration-300">
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
              <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-tight animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
                Never miss a sale
              </h2>
              <p className="mt-2 text-white/80 max-w-md text-sm leading-relaxed animate-fade-in-scale" style={{ animationDelay: '180ms' }}>
                Click the <strong className="text-amber-200">Add to Calendar</strong> button on any event
                to add it to your Google, Apple or Outlook calendar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/resources"
                className="px-7 py-3 bg-white text-[var(--maroon)] font-semibold rounded-lg hover:bg-amber-50 transition hover-scale"
              >
                View Circulars
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 font-semibold rounded-lg transition hover-scale"
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
