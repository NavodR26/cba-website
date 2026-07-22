import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import TraditionSection from '@/components/TraditionSection'
import UpcomingEvents from '@/components/UpcomingEvents'
import AnnouncementsGallery from '@/components/AnnouncementsGallery'
import AboutSection from '@/components/AboutSection'
import SectionReveal from '@/components/SectionReveal'
import FooterAnimated from '@/components/FooterAnimated'
import Newsletter from '@/components/Newsletter'
import { HeroParallax } from '@/components/HeroParallax'
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

  console.log('[Home] Total events:', safeEvents.length)

  return (
    <main id="main-content" className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar topbarHeight={44} />

      {/* HERO */}
      <HeroParallax />

      {/* Essential member pathways. */}
      <SectionReveal>
        <QuickActions />
      </SectionReveal>

      <SectionReveal>
        <AboutSection content={aboutContent} />
      </SectionReveal>

      <SectionReveal>
        <UpcomingEvents initialEvents={safeEvents} />
      </SectionReveal>
      
      <SectionReveal>
        <TraditionSection />
      </SectionReveal>
      
      <SectionReveal>
        <AnnouncementsGallery />
      </SectionReveal>

      <Testimonials />

      <SectionReveal>
        <Newsletter />
      </SectionReveal>
      
      <FooterAnimated />
    </main>
  )
}
