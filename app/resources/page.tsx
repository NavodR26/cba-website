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
  {
    title: 'Sri Lanka Inland Revenue',
    desc: 'Official tax authority',
    href: 'https://www.ird.gov.lk/',
  },
  {
    title: "Sri Lanka Tea Factory Owners' Association",
    desc: 'Tea factory industry representation',
    href: 'https://sltfoa.com/',
  },
]

function eventCategory(event: { title?: string; category?: string; type?: string }) {
  const value = `${event.title || ''} ${event.category || ''} ${event.type || ''}`.toLowerCase()
  if (value.includes('rubber')) return { label: 'Rubber', color: '#1f6f43', soft: 'rgba(31,111,67,0.1)' }
  if (value.includes('coconut')) return { label: 'Coconut', color: '#b67419', soft: 'rgba(182,116,25,0.12)' }
  if (value.includes('committee')) return { label: 'Committee', color: '#27548a', soft: 'rgba(39,84,138,0.1)' }
  if (value.includes('agm')) return { label: 'AGM', color: '#6d28d9', soft: 'rgba(109,40,217,0.12)' }
  if (value.includes('tea')) return { label: 'Tea', color: '#7a1f2a', soft: 'rgba(122,31,42,0.1)' }
  return { label: event.category || event.type || 'Event', color: '#555555', soft: 'rgba(85,85,85,0.1)' }
}

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
  const scheduledEvents = [...safeEvents]
    .filter((event) => event.start_date)
    .sort((a, b) => new Date(a.start_date!).getTime() - new Date(b.start_date!).getTime())

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
        <section id="auction-calendar" className="scroll-mt-32 bg-[#faf9f7] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-8 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--maroon)]/10 bg-[var(--maroon)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--maroon)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--cba-gold)]" />
                Live Calendar
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-[2.5rem]">
                Auction Schedule & Events
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Browse upcoming auctions, committee meetings and Association dates in one official schedule.
              </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)]">
              <div>
                <EventCalendarClient events={safeEvents} />
              </div>

              <aside className="space-y-5">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                  <CalendarStats events={safeEvents} />
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.06)] sm:p-6">
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--maroon)]">Schedule</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-950">Scheduled events</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">{scheduledEvents.length}</span>
                  </div>
                  <div className="space-y-1">
                    {scheduledEvents.slice(0, 5).map((e, i) => {
                      const category = eventCategory(e)
                      return (
                        <div key={`${e.title}-${i}`} className="group flex gap-3 border-t border-slate-100 py-3 first:border-t-0 first:pt-0">
                          <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-center" style={{ backgroundColor: category.soft }}>
                            <span className="text-sm font-bold leading-none" style={{ color: category.color }}>
                              {e.start_date ? new Date(e.start_date).toLocaleDateString('en-GB', { day: '2-digit' }) : '—'}
                            </span>
                            <span className="mt-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                              {e.start_date ? new Date(e.start_date).toLocaleDateString('en-GB', { month: 'short' }) : ''}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="flex items-start justify-between gap-2">
                              <p className="line-clamp-1 text-sm font-semibold text-slate-800">{e.title}</p>
                              <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: category.soft, color: category.color }}>
                                {category.label}
                              </span>
                            </div>
                            <div className="mt-1 opacity-80 transition-opacity group-hover:opacity-100">
                              <AddToCalendarLink event={e} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {scheduledEvents.length === 0 && <p className="py-5 text-sm text-slate-500">No scheduled events are available yet.</p>}
                  </div>
                </div>
              </aside>
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
