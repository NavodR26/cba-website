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

const TRUST_PILLARS = [
  ['Transparency', 'Ensuring fair and open auction practices'],
  ['Integrity', 'Upholding ethical standards in every transaction'],
  ['Excellence', 'Committed to quality and continuous improvement'],
  ['Trust', 'Building lasting industry relationships'],
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
        <section className="relative overflow-hidden bg-[#fdfcfb] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Image
            src="/aboutpg-bk1.png"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover object-center opacity-70"
            aria-hidden
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,252,251,0.94)_0%,rgba(253,252,251,0.78)_45%,rgba(253,252,251,0.32)_100%),radial-gradient(ellipse_at_12%_52%,rgba(122,31,42,0.06),transparent_29%)]" />
          <div aria-hidden className="absolute -left-28 bottom-12 h-72 w-72 rounded-full border border-[var(--maroon)]/10" />
          <div aria-hidden className="absolute right-[12%] top-12 h-80 w-80 rounded-full border border-[var(--maroon)]/10" />
          <div aria-hidden className="absolute left-[43%] top-[30%] h-20 w-20 opacity-40 [background-image:radial-gradient(var(--maroon)_1.1px,transparent_1.1px)] [background-size:10px_10px]" />
          <div aria-hidden className="absolute right-8 top-0 h-44 w-56 opacity-30 [background-image:radial-gradient(var(--maroon)_1px,transparent_1px)] [background-size:8px_8px]" />

          <div className="relative z-10 mx-auto max-w-[1420px]">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6 xl:pr-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--maroon)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--maroon)]">Who we are</span>
                </div>
                <h2 className="mt-5 max-w-[680px] [font-family:Georgia,serif] text-2xl leading-[1.1] tracking-[-0.02em] text-[#171927] sm:text-3xl xl:text-4xl">
                  Sri Lanka&apos;s trusted authority for <span className="text-[var(--maroon)]">commodity auctions</span>
                </h2>
                <div className="mt-4 h-px w-12 bg-[var(--maroon)]" />
                <div className="mt-4 max-w-[620px] space-y-4 text-[14px] leading-6 text-slate-600 sm:text-sm">
                  <p>
                    Established in <strong className="font-semibold text-[var(--maroon)]">1904</strong>, the Colombo Brokers&rsquo; Association (CBA) serves as the institutional authority vested with the responsibility to conduct the nation&apos;s most critical commodity auctions.
                  </p>
                  <p>
                    We maintain the highest standards of transparency, integrity and efficiency across tea, rubber, coconut and spice markets. Recognised by government, industry and international stakeholders as the trusted custodian of Sri Lanka&apos;s auction ecosystem.
                  </p>
                </div>

                <div className="mt-6 flex w-full max-w-[620px] overflow-hidden rounded-xl border border-gray-200/80 bg-white/85 shadow-[0_12px_30px_rgba(42,24,30,0.09)] backdrop-blur-sm">
                  <div className="relative min-w-[140px] overflow-hidden bg-gradient-to-br from-[var(--maroon)] to-[#561520] px-4 py-3 text-white sm:min-w-[160px]">
                    <div aria-hidden className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:9px_9px]" />
                    <p className="relative text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">Established</p>
                    <p className="relative mt-1 [font-family:Georgia,serif] text-3xl leading-none">1904</p>
                  </div>
                  <div className="flex items-center px-4 py-3 sm:px-6">
                    <span className="mr-4 hidden h-8 w-px bg-[var(--maroon)]/25 sm:block" />
                    <p className="text-[11px] font-bold uppercase leading-4 tracking-[0.17em] text-[var(--maroon)]">Over a century of<br />trust &amp; excellence</p>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[640px] lg:col-span-6 lg:max-w-none">
                <div className="absolute -inset-3 rounded-[40px] border border-[var(--maroon)]/10" />
                <div className="group relative aspect-[1.05/1] overflow-hidden rounded-[24px] bg-[#e8e2df] shadow-[0_20px_50px_rgba(53,31,35,0.19)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(53,31,35,0.25)] sm:aspect-[1.12/1]">
                <Image
                  src="/aboutpg-1.png"
                  alt="Auction gavel, Sri Lankan commodities and the Colombo skyline"
                  fill
                  sizes="(max-width: 1024px) 90vw, 46vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--maroon)]/20 via-transparent to-white/10" />
                <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-between bg-gradient-to-r from-[var(--maroon)]/95 to-[#5a1620]/85 px-5 py-3 text-white transition-transform duration-500 group-hover:translate-y-0">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Tea · Rubber · Coconut · Spices</span>
                  <span className="text-[11px] text-white/70">Sri Lanka</span>
                </div>
              </div>

                <div className="absolute -right-2 top-4 hidden w-44 overflow-hidden rounded-[20px] bg-gradient-to-br from-[var(--maroon)] to-[#5a1620] p-5 text-white shadow-[0_16px_35px_rgba(81,20,31,0.3)] xl:block">
                  <p className="text-[9px] font-semibold uppercase leading-4 tracking-[0.16em]">Over a century of integrity, transparency and market leadership</p>
                  <span className="mt-4 block h-px w-8 bg-white/60" />
                  <div aria-hidden className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full border border-white/20" />
                </div>
              </div>
            </div>

            <div className="mt-8 grid overflow-hidden rounded-[18px] border border-gray-200/80 bg-white/90 shadow-[0_12px_30px_rgba(42,24,30,0.08)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_PILLARS.map(([title, description], index) => (
                <article key={title} className={`px-5 py-4 ${index > 0 ? 'border-t border-gray-200/80 sm:border-l sm:border-t-0' : ''}`}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--maroon)]">{title}</h3>
                  <p className="mt-2 max-w-[220px] text-xs leading-4 text-slate-600">{description}</p>
                  <span className="mt-3 block h-px w-8 bg-[var(--maroon)]" />
                </article>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* VISION + MISSION - Premium Redesigned Section */}
      <VisionMissionSection content={aboutContent} />

      {/* CORE VALUES */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(122,31,42,0.03),transparent_50%)]" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--maroon)]" />
                <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--maroon)]/10 to-[var(--maroon)]/5 text-[var(--maroon)] text-[11px] font-bold uppercase tracking-[0.2em] border border-[var(--maroon)]/20">
                  Our Values
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--maroon)]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Guiding principles of excellence
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base">
                The values that define our approach — from auction floor protocols to industry leadership.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v, i) => (
                <article
                  key={v.title}
                  className="group relative bg-white rounded-2xl border border-gray-200/80 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 hover:border-[var(--maroon)]/30 animate-fade-in-scale"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/0 via-transparent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--maroon)]/10 to-[var(--maroon)]/5 text-[var(--maroon)] flex items-center justify-center mb-5 group-hover:from-[var(--maroon)] group-hover:to-[var(--maroon-dark)] group-hover:text-white transition-all duration-300 shadow-sm">
                    <div className="w-7 h-7">{v.icon}</div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl tracking-tight">{v.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--maroon)] via-[#5a1620] to-[#3d0f17] text-white relative overflow-hidden">
          <div aria-hidden className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-300/5 -translate-y-1/2 blur-3xl" />
          <div aria-hidden className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 translate-y-1/2 blur-2xl" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300/50" />
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-bold">
                  Official Authority
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                Mandated by the Sri Lanka Tea Board
              </h2>
              <p className="text-lg text-white/90 leading-relaxed font-medium mb-10">
                The formal mandate granted to oversee and conduct all licensed tea auctions nationwide. This responsibility is executed with utmost integrity, transparency and adherence to international best practices.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                  <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                  </svg>
                  <span className="text-sm font-semibold">Regulatory mandate</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                  <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                  </svg>
                  <span className="text-sm font-semibold">Government recognised</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                  <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-sm font-semibold">Industry standards</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <ArchivalPhotoShowcase />
      </SectionReveal>

      {/* Interactive Timeline */}
      <InteractiveTimeline />

      {/* Our Impact Section */}
      <OurImpact />

      {/* Facility Showcase */}
      <FacilityShowcase />

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-[1400px] mx-auto rounded-3xl bg-gradient-to-br from-[var(--maroon)] via-[#5a1620] to-[#3d0f17] text-white p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div
            aria-hidden
            className="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber-300/10 -translate-x-1/3 -translate-y-1/2 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 translate-y-1/2 blur-2xl"
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Discover our members and upcoming events
            </h2>
            <p className="text-white/80 max-w-xl mx-auto text-base mb-8">
              Explore the committee, broker firms and the live auction calendar.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/members"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--maroon)] font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Members
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/resources"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/15 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                View Calendar
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
