import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHeroPremium from '@/components/PageHeroPremium'
import SectionReveal from '@/components/SectionReveal'
import ArchivalPhotoShowcase from '@/components/ArchivalPhotoShowcase'
import { getEvents } from '@/lib/events'
import VisionMissionSection from '@/components/VisionMissionSection'
import { getAboutPageContent } from '@/lib/sanity'
import InteractiveTimeline from '@/components/InteractiveTimeline'
import OurImpact from '@/components/OurImpact'
import FacilityShowcase from '@/components/VirtualTour'

export const metadata = {
  title: "About CBA | The Colombo Brokers' Association",
  description:
    "The Colombo Brokers' Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka. Learn about our heritage, mission and leadership.",
  openGraph: {
    title: "About CBA | The Colombo Brokers' Association",
    description:
      "The Colombo Brokers' Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
  },
}

const VALUES = [
  {
    title: 'Integrity',
    desc: 'Every auction we oversee runs on transparent, verifiable rules — no compromises.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Heritage',
    desc: 'Over a century of unbroken service to Sri Lanka’s commodity export activity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13l2 8-5.5-3-5.5 3 2-8" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'Setting the professional benchmark for the broking community in the region.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
      </svg>
    ),
  },
  {
    title: 'Stewardship',
    desc: 'Protecting the interests of growers, buyers and the wider auction ecosystem.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l9-9 9 9-9 9-9-9z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
]

export default async function AboutPage() {
  let events: any[] = []
  const aboutContent = await getAboutPageContent()

  try {
    events = await getEvents()
  } catch (error) {
    console.error('Error fetching About page data:', error)
  }

  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
  }))

  return (
    <main id="main-content" className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHeroPremium
        badge="About the Association"
        title="A Century of Trusted Auction Leadership"
        subtitle="Delivering expert broking representation to Sri Lanka’s tea, rubber, coconut and spice auctions since 1904."
        backgroundImage="/about_hero.png"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About CBA' },
        ]}
      />

          <SectionReveal>
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_90px_rgba(122,31,42,0.12)] group hover:-translate-y-1 transition-transform duration-500">
              <Image
                src="/hero1.png"
                alt="CBA building"
                width={1200}
                height={460}
                className="w-full h-[460px] object-cover transition duration-700 group-hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon)]/45 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-5 md:p-6 ring-1 ring-gray-100 max-w-[220px] animate-fade-in-scale hover:-translate-y-1 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-[var(--maroon)] leading-none">
                120+
              </p>
              <p className="text-xs uppercase tracking-[0.26em] text-gray-500 mt-2">
                Years of Excellence
              </p>
            </div>

            <div
              aria-hidden
              className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[var(--maroon)]/10 blur-[1px] -z-10 hidden md:block"
            />
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
                Who we are
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                The institutional authority of Sri Lanka&apos;s tea, rubber, coconut and spices auctions
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg font-medium">
                Established in 1904, the Colombo Brokers&rsquo; Association (CBA) serves as the institutional authority vested with the responsibility to conduct Sri Lanka&rsquo;s most critical commodity auctions.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We maintain the highest standards of transparency, integrity and efficiency in the auction of tea, rubber, coconut and related commodities. The Association is recognised by government, industry and international stakeholders as the trusted custodian of Sri Lanka&rsquo;s tea, rubber, coconut and spices auctions.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MiniStat value="1904" label="Founded" accent />
                <MiniStat value="100+" label="Member Firms" />
                <MiniStat value="4" label="Commodities" />
                <MiniStat value="500+" label="Auctions / yr" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* CORE VALUES */}
      <SectionReveal>
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              What we stand for
            </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                The institutional authority of Sri Lanka&apos;s tea, rubber, coconut and spices auctions
              </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              The principles that guide every decision the Association makes —
              from auction floor rules to industry advocacy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                className="group relative bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 hover-glow animate-fade-in-scale"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center mb-4 group-hover:bg-[var(--maroon)] group-hover:text-white transition duration-300">
                  <div className="w-6 h-6">{v.icon}</div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* AUTHORITY SECTION */}
      <SectionReveal>
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[var(--maroon)]/95 to-[#5a1620] text-white relative overflow-hidden">
          <div aria-hidden className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-300/5 -translate-y-1/2" />
          <div aria-hidden className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 translate-y-1/2" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-bold mb-4">
                Official Authority
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                Authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka
              </h2>
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                This authority represents the formal mandate granted by the Sri Lanka Tea Board to the Colombo Brokers&rsquo; Association to oversee and conduct all licensed tea auctions in Sri Lanka. This responsibility is executed with utmost integrity, transparency and adherence to international best practices.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/20">
                  <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                  </svg>
                  <span className="text-sm font-semibold">Regulatory mandate</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/20">
                  <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                  </svg>
                  <span className="text-sm font-semibold">Government recognised</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/20">
                  <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm font-semibold">120+ years heritage</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* VISION + MISSION - Premium Redesigned Section */}
      <VisionMissionSection content={aboutContent} />

      {/* Interactive Timeline */}
      <InteractiveTimeline />

      {/* Our Impact Section */}
      <OurImpact />

      {/* Facility Showcase */}
      <FacilityShowcase />

      <SectionReveal>
        <ArchivalPhotoShowcase />
      </SectionReveal>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[1400px] mx-auto rounded-2xl bg-gradient-to-br from-[var(--maroon)] to-[#3d0f17] text-white p-8 md:p-10 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute top-0 left-0 w-72 h-72 rounded-full bg-amber-300/10 -translate-x-1/3 -translate-y-1/2"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold">
              Want to learn more about our members and activities?
            </h2>
            <p className="mt-2 text-white/80 max-w-xl mx-auto text-sm">
              Explore the committee, broker firms and the upcoming auction
              calendar.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/members"
                className="px-7 py-3 bg-white text-[var(--maroon)] font-semibold rounded-lg hover:bg-amber-50 transition"
              >
                Explore Members
              </Link>
              <Link
                href="/resources"
                className="px-7 py-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 font-semibold rounded-lg transition"
              >
                View Calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function MiniStat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className={`rounded-3xl border ${accent ? 'border-[var(--maroon)]/15 bg-[var(--maroon)]/5' : 'border-gray-200 bg-gray-50'} p-5 transition hover:-translate-y-1 hover:shadow-lg duration-300 animate-fade-in-scale`}>
      <p className={`text-3xl md:text-4xl font-bold ${accent ? 'text-[var(--maroon)]' : 'text-gray-900'}`}>
        {value}
      </p>
      <p className="text-xs uppercase tracking-[0.26em] text-gray-500 mt-2">
        {label}
      </p>
    </div>
  )
}
