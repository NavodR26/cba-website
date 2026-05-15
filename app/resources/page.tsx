import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import SectionReveal from '@/components/SectionReveal'
import TradeStatistics from '@/components/TradeStatistics'
import { client } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "Resources | The Colombo Brokers' Association",
  description:
    "Resources, circulars and live trade statistics from the Colombo Brokers’ Association. A professional dashboard for auction market information.",
  openGraph: {
    title: "Resources | The Colombo Brokers' Association",
    description:
      "Resources, circulars and live trade statistics from the Colombo Brokers’ Association.",
  },
}

const IMPORTANT_LINKS = [
  {
    title: 'Sri Lanka Tea Board',
    desc: 'Official regulatory authority for tea',
    href: 'https://www.pureceylontea.com/',
  },
  {
    title: 'Colombo Tea Traders’ Association',
    desc: 'CTTA — Colombo tea traders representation',
    href: 'https://ctta.lk/',
  },
  {
    title: 'Tea Exporters Association',
    desc: 'TEA — exporter representation',
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
    desc: 'Trade & exports of Sri Lanka',
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

function formatDate(d: any) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatSize(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default async function ResourcesPage() {
  const [downloads, events] = await Promise.all([getDownloads(), getEvents()])
  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
  }))

  return (
    <main className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHero
        badge="Resources & Downloads"
        title="Resources & Downloads"
        description="Official circulars, downloadable reports, and merchandise trade statistics in a compact institutional format."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Resources' },
        ]}
      />

      <SectionReveal>
        <TradeStatistics />
      </SectionReveal>

      <SectionReveal>
        <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-10">
          {/* DOWNLOADS */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Downloads
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Latest circulars, notices and reports — published by the Association.
            </p>

            {downloads.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                Documents will appear here once published.
              </p>
            ) : (
              <ul className="space-y-3">
                {downloads.map((item: any, i: number) => (
                  <li
                    key={item._id}
                    className="group flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[var(--maroon)]/40 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 animate-fade-in-scale"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(item.date)}
                        {item.fileSize ? ` · ${formatSize(item.fileSize)}` : ''}
                      </p>
                    </div>
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download={item.fileName || true}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--maroon)] text-white hover:opacity-90 transition hover-scale"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v12" />
                        <path d="M7 10l5 5 5-5" />
                        <path d="M5 21h14" />
                      </svg>
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* IMPORTANT LINKS */}
          <aside className="lg:col-span-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Important Links
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Government and industry references.
            </p>

            <ul className="space-y-2">
              {IMPORTANT_LINKS.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[var(--maroon)]/40 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 hover-scale animate-fade-in-scale"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {l.title}
                      </p>
                      <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {l.desc}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      </SectionReveal>

      <Footer />
    </main>
  )
}
