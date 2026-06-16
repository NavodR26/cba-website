import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHeroPremium from '@/components/PageHeroPremium'
import SectionReveal from '@/components/SectionReveal'
import CalendarStats from '@/components/CalendarStats'
import EventCalendarClient from '@/components/EventCalendarClient'
import AddToCalendarLink from '@/components/AddToCalendarLink'
import DownloadsPanel from '@/components/DownloadsPanel'
import { client } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "Resources & Calendar | The Colombo Brokers' Association",
  description:
    "Resources, circulars and live trade statistics from the Colombo Brokers' Association in one modern dashboard.",
  openGraph: {
    title: "Resources & Calendar | The Colombo Brokers' Association",
    description:
      "Resources, circulars and live trade statistics from the Colombo Brokers' Association.",
  },
}

const IMPORTANT_LINKS = [
  {
    title: 'Sri Lanka Tea Board',
    desc: 'Official regulatory authority for tea',
    href: 'https://www.pureceylontea.com/',
  },
  {
    title: "Colombo Tea Traders' Association",
    desc: 'CTTA - Colombo tea traders representation',
    href: 'https://ctta.lk/',
  },
  {
    title: 'Tea Exporters Association',
    desc: 'TEA - exporter representation',
    href: 'https://www.teasrilanka.org/',
  },
  {
    title: 'Rubber Development Department',
    desc: 'Government department for rubber',
    href: 'https://www.rubberdev.gov.lk/',
  },
  {
    title: 'Coconut Development Authority',
    desc: 'Sri Lanka coconut industry',
    href: 'https://cda.lk/',
  },
  {
    title: 'Department of Commerce',
    desc: 'Trade and exports of Sri Lanka',
    href: 'https://www.doc.gov.lk/',
  },
  {
    title: 'Central Bank of Sri Lanka',
    desc: 'Economic and statistical data',
    href: 'https://www.cbsl.gov.lk/',
  },
]

async function getDownloads() {
  return await client.fetch(
    `*[_type == "announcement" && defined(file)] | order(date desc){
      _id, title, description, date,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      "fileSize": file.asset->size
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export default async function ResourcesPage() {
  const [downloads, events] = await Promise.all([getDownloads(), getEvents()])
  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    end_date: e.end_date ? new Date(e.end_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
    location: e.location,
    notes: e.notes,
  }))

  return (
    <main id="main-content" className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHeroPremium
        badge="Resources & Calendar"
        title="Resources, Circulars & Market Information"
        subtitle="Access official circulars, schedules, reports and market intelligence resources."
        backgroundImage="/resources_hero.png"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Resources' },
        ]}
      />

      <SectionReveal>
        <section id="auction-calendar" className="scroll-mt-32 bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-[var(--maroon)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--maroon)]">
                Live Calendar
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                Auction Schedule & Events
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Official calendar with scheduled auctions and committee meetings.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <EventCalendarClient events={safeEvents} />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--maroon)]">
                    Event Categories
                  </p>
                  <CalendarStats events={safeEvents} />
                </div>

                <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--maroon)]">
                    Upcoming
                  </p>
                  <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                    {safeEvents.slice(0, 6).map((e, i) => (
                      <div key={`${e.title}-${i}`} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-xs">
                            {e.start_date && (
                              <p className="font-semibold text-gray-900">
                                {new Date(e.start_date).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                })}
                              </p>
                            )}
                            <p className="line-clamp-1 text-gray-600">{e.title}</p>
                          </div>
                          <span className="inline-flex shrink-0 items-center rounded bg-[var(--maroon)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                            {e.category || e.type || 'Event'}
                          </span>
                        </div>
                        <div className="mt-2">
                          <AddToCalendarLink event={e} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="downloads" className="scroll-mt-32 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-[var(--maroon)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--maroon)]">
                Publications
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                Circulars & Downloads
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Search the latest official circulars and documents from the Association.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2.5fr_1fr]">
              <DownloadsPanel downloads={downloads} />

              <aside id="industry-links" className="scroll-mt-32">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--maroon)]">
                    Industry Links
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">Resources</h3>
                </div>

                <ul className="space-y-2">
                  {IMPORTANT_LINKS.map((l, i) => (
                    <li key={`${l.href}-${i}`}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group block rounded-lg border border-gray-200 bg-white p-3 transition-transform duration-300 hover:-translate-y-0.5 hover:border-[var(--maroon)]/40 hover:shadow-md"
                      >
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold leading-snug text-gray-900">{l.title}</p>
                          <svg className="h-2.5 w-2.5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </div>
                        <p className="line-clamp-2 text-[11px] text-gray-500">{l.desc}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </SectionReveal>

      <Footer />
    </main>
  )
}
