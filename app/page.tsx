import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import TraditionSection from '@/components/TraditionSection'
import UpcomingEvents from '@/components/UpcomingEvents'
import StatsBar from '@/components/StatsBar'
import AnnouncementsGallery from '@/components/AnnouncementsGallery'
import AboutSection from '@/components/AboutSection'
import SectionReveal from '@/components/SectionReveal'
import FooterAnimated from '@/components/FooterAnimated'
import Newsletter from '@/components/Newsletter'
import { HeroParallax } from '@/components/HeroParallax'
import HomeFeatures from '@/components/HomeFeatures'
import QuickActions from '@/components/QuickActions'
import Testimonials from '@/components/Testimonials'
import { getEvents } from '@/lib/events'
import { getAboutPageContent } from '@/lib/sanity'

export default async function Home() {
  const [events, aboutContent] = await Promise.all([getEvents(), getAboutPageContent()])

  const safeEvents = events.map((e: any) => ({
    ...e,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    end_date: e.end_date ? new Date(e.end_date).toISOString() : null,
  }))

  const nextAuction = safeEvents
    .filter((event: any) => event.start_date && new Date(event.start_date).getTime() >= Date.now())
    .sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0]

  console.log('[Home] Total events:', safeEvents.length)
  console.log('[Home] Next auction:', nextAuction)

  return (
    <main id="main-content" className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar topbarHeight={44} />

      {/* HERO */}
      <HeroParallax
        nextAuction={nextAuction ? {
          title: nextAuction.title || nextAuction.category || nextAuction.type || 'Upcoming Auction',
          date: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(nextAuction.start_date)),
          saleNo: nextAuction.sale_no ? `Sale ${nextAuction.sale_no}` : undefined,
        } : undefined}
      />

      {/* Overlapping features section */}
      <SectionReveal>
        {/* Lazy-load to keep initial paint light */}
        {/* @ts-ignore */}
        <HomeFeatures />
      </SectionReveal>

      <SectionReveal>
        <AboutSection content={aboutContent} />
      </SectionReveal>

      {/* Quick Actions */}
      <SectionReveal>
        <QuickActions />
      </SectionReveal>

      <SectionReveal>
        <UpcomingEvents initialEvents={safeEvents} />
      </SectionReveal>
      
      <SectionReveal>
        <TraditionSection />
      </SectionReveal>
      
      <SectionReveal>
        <StatsBar />
      </SectionReveal>

      {/* Testimonials */}
      <Testimonials />

      <SectionReveal>
        <AnnouncementsGallery />
      </SectionReveal>
      
      <SectionReveal>
        <Newsletter />
      </SectionReveal>
      
      <FooterAnimated />
    </main>
  )
}
