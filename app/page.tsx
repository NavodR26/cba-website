import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import HeritageStrip from '@/components/HeritageStrip'
import TraditionSection from '@/components/TraditionSection'
import Chairman from '@/components/Chairman'
import UpcomingEvents from '@/components/UpcomingEvents'
import StatsBar from '@/components/StatsBar'
import AnnouncementsGallery from '@/components/AnnouncementsGallery'
import AboutSection from '@/components/AboutSection'
import SectionReveal from '@/components/SectionReveal'
import TradeStatistics from '@/components/TradeStatistics'
import FooterAnimated from '@/components/FooterAnimated'
import Newsletter from '@/components/Newsletter'
import { HeroParallax } from '@/components/HeroParallax'
import { getEvents } from '@/lib/events'

export default async function Home() {
  const events = await getEvents()

  const safeEvents = events.map((e: any) => ({
    ...e,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    end_date: e.end_date ? new Date(e.end_date).toISOString() : null,
  }))

  return (
    <main className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar topbarHeight={44} />

      {/* HERO */}
      <HeroParallax />

      <SectionReveal>
        <HeritageStrip />
      </SectionReveal>
      <SectionReveal>
        <AboutSection />
      </SectionReveal>
      <SectionReveal>
        <TradeStatistics preview />
      </SectionReveal>
      <SectionReveal>
        <Chairman />
      </SectionReveal>
      <SectionReveal>
        <UpcomingEvents />
      </SectionReveal>
      <SectionReveal>
        <TraditionSection />
      </SectionReveal>
      <SectionReveal>
        <StatsBar />
      </SectionReveal>
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
