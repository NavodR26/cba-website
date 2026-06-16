import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import GalleryClient from '@/components/GalleryClient'
import PageHeroPremium from '@/components/PageHeroPremium'
import { client } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "Gallery | The Colombo Brokers' Association",
  description:
    "View event highlights, association moments and gallery albums from the Colombo Brokers' Association.",
  openGraph: {
    title: "Gallery | The Colombo Brokers' Association",
    description:
      "View event highlights, association moments and gallery albums from the Colombo Brokers' Association.",
  },
}

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
    <main id="main-content" className="cba-page-shell bg-white text-gray-900">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHeroPremium
        badge="Gallery"
        title="Moments from the Association"
        subtitle="Events, meetings and milestones from the Colombo Brokers' Association."
        backgroundImage="/gallery_hero.png"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' },
        ]}
      />

      <GalleryClient albums={albums} />

      <Footer />
    </main>
  )
}
