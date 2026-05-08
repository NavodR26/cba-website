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
    <main className="cba-page-shell bg-white dark:bg-neutral-950 text-gray-800 dark:text-gray-200">
      <TopBar events={safeEvents} />
      <Navbar />

      {/* HERO */}
      <section className="cba-hero-mesh relative bg-[var(--maroon)] text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]"
        />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Gallery
          </h1>
          <p className="mt-3 text-white/85">
            Moments from our events, meetings, CSR activities and ceremonies.
          </p>
          <nav className="mt-4 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Gallery</span>
          </nav>
        </div>
      </section>

      <GalleryClient albums={albums} />

      <Footer />
    </main>
  )
}
