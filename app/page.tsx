import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import HeritageStrip from '@/components/HeritageStrip'
import TraditionSection from '@/components/TraditionSection'
import ChairmanMessage from '@/components/ChairmanMessage'
import UpcomingEvents from '@/components/UpcomingEvents'
import StatsBar from '@/components/StatsBar'
import AnnouncementsGallery from '@/components/AnnouncementsGallery'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import AboutSection from '@/components/AboutSection'
import Reveal from '@/components/Reveal'
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
      <section className="cba-hero-mesh relative h-[75vh] min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero.png"
            className="w-full h-full object-cover scale-105 hero-kenburns"
            alt="Colombo skyline"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-[var(--maroon)]/32" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          <div aria-hidden className="hero-orb hero-orb-1" />
          <div aria-hidden className="hero-orb hero-orb-2" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className="max-w-2xl text-white">
            <Reveal>
              <span className="cba-glass-panel inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                Established 1904
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.04] tracking-tight">
                The Colombo Brokers&rsquo;
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Association
                </span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 text-base md:text-lg text-gray-200 max-w-xl leading-relaxed tracking-normal">
                The apex body representing brokers across Sri Lanka&rsquo;s tea, rubber, coconut and spices auction industries.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/events"
                  className="cba-btn-magnetic inline-flex items-center justify-center rounded-md bg-[var(--maroon)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-[#601822]"
                >
                  View Calendar
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  About CBA
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-[0.32em] uppercase">
          <span className="cba-scroll-hint">Scroll</span>
        </div>
      </section>

      <HeritageStrip />
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <ChairmanMessage />
      </Reveal>
      <Reveal>
        <UpcomingEvents />
      </Reveal>
      <Reveal>
        <TraditionSection />
      </Reveal>
      <StatsBar />
      <Reveal>
        <AnnouncementsGallery />
      </Reveal>
      <Reveal>
        <Newsletter />
      </Reveal>
      <Footer />
    </main>
  )
}
