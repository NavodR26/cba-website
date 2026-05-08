import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import GalleryClient from '@/components/GalleryClient'
import { client } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

async function getAlbums() {
  return await client.fetch(
    `*[_type == "gallery"] | order(date desc){
      _id, eventTitle, date, description, images
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export default async function GalleryPage() {
  const [albums, events] = await Promise.all([getAlbums(), getEvents()])
  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
  }))

  return (
    <main className="cba-page-shell bg-white text-gray-900">
      <TopBar events={safeEvents} />
      <Navbar />

      {/* HERO */}
      <section className="cba-hero-mesh relative overflow-hidden bg-white text-slate-900">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.18),transparent_40%)]"
        />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_80px_rgba(122,31,42,0.08)] p-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs uppercase tracking-[0.3em] font-semibold">
              Gallery
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
              Captured moments of CBA excellence
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
              Discover the bright energy, community gatherings and memorable events that shape the Colombo Brokers' Association.
            </p>
            <nav className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition">Home</Link>
              <span className="mx-2">›</span>
              <span className="font-semibold text-slate-900">Gallery</span>
            </nav>
          </div>
        </div>
      </section>

      <GalleryClient albums={albums} />

      <Footer />
    </main>
  )
}
