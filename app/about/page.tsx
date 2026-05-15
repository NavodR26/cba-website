import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import SectionReveal from '@/components/SectionReveal'
import { client } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "About CBA | The Colombo Brokers' Association",
  description:
    "The Colombo Brokers’ Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka. Learn about our heritage, mission and leadership.",
  openGraph: {
    title: "About CBA | The Colombo Brokers' Association",
    description:
      "The Colombo Brokers’ Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
  },
}

async function getPastChairmen() {
  return await client.fetch(`*[_type == "pastChairman"] | order(year desc)`)
}

const HISTORY = [
  {
    year: '1904',
    title: 'Foundation',
    text: 'CBA founded to formalise broker representation in colonial-era tea trade.',
  },
  {
    year: '1947',
    title: 'Independence Era',
    text: 'Expanded membership and industry reach following Sri Lanka’s independence.',
  },
  {
    year: '1972',
    title: 'Standardisation',
    text: 'Introduced standardised auction practices for tea, rubber and coconut.',
  },
  {
    year: '1990',
    title: 'Industry Collaboration',
    text: 'Strengthened collaboration with regulators and government stakeholders.',
  },
  {
    year: '2020',
    title: 'Digital Era',
    text: 'Embracing digital transformation across the auction system.',
  },
]

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
    desc: 'Over a century of unbroken service to Sri Lanka’s commodity export trade.',
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
  const [chairmen, events] = await Promise.all([getPastChairmen(), getEvents()])
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
        badge="About the Association"
        title="A century of steady auction leadership"
        subtitle="Institutional Authority"
        description="Authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About CBA' },
        ]}
      />

      {/* INTRO — split with floating stat card */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_90px_rgba(122,31,42,0.12)] group hover:-translate-y-1 transition-transform duration-500">
              <img
                src="/hero1.png"
                alt="CBA building"
                className="w-full h-[460px] object-cover transition duration-700 group-hover:scale-105"
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
                The institutional authority of Sri Lanka's auction market
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg font-medium">
                Established in 1904, the Colombo Brokers&rsquo; Association (CBA) serves as the institutional authority vested with the responsibility to conduct Sri Lanka&rsquo;s most critical commodity auctions.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We maintain the highest standards of transparency, integrity and efficiency in the auction of tea, rubber, coconut and related commodities. The Association is recognised by government, industry and international stakeholders as the trusted custodian of Sri Lanka&rsquo;s auction market.
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              What we stand for
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Our Core Values
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[var(--maroon)]/95 to-[#5a1620] text-white relative overflow-hidden">
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

      {/* VISION + MISSION */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-6">
          <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--maroon)] via-[#5a1620] to-[#3d0f17] text-white p-10 md:p-12 hover-scale hover-glow animate-fade-in-scale transition-transform duration-300">
            <div
              aria-hidden
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-300/10 -translate-y-1/2 translate-x-1/3"
            />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                </svg>
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-300 font-bold mb-2">
                Our Vision
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                The leading authority of the auction trade
              </h3>
              <p className="mt-4 text-white/85 leading-relaxed">
                To be the leading authority promoting a transparent, efficient
                and globally competitive auction system in Sri Lanka.
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-10 md:p-12 shadow-sm hover-scale hover-glow animate-fade-in-scale transition-transform duration-300">
            <div
              aria-hidden
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--maroon)]/5 -translate-y-1/2 translate-x-1/3"
            />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-[var(--maroon)]/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-[var(--maroon)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                </svg>
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--maroon)] font-bold mb-2">
                Our Mission
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
                Integrity, standards & sustainable growth
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                To uphold integrity, enhance industry standards, and support the
                sustainable growth of Sri Lanka&rsquo;s tea, rubber, coconut and
                spices sectors.
              </p>
            </div>
          </article>
        </div>
        </section>
      </SectionReveal>

      {/* HISTORY — vertical timeline (premium) */}
      <SectionReveal>
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              The Journey
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Our History
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Five defining moments across more than a century of service.
            </p>
          </div>

          <ol className="relative space-y-10">
            {/* Vertical rail */}
            <span
              aria-hidden
              className="absolute left-[14px] sm:left-1/2 top-0 bottom-0 w-px bg-[var(--maroon)]/15"
            />

            {HISTORY.map((h, i) => {
              const isLeft = i % 2 === 0
              return (
                <li
                  key={h.year}
                  className="relative pl-10 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 items-start"
                >
                  {/* Dot */}
                  <span className="absolute left-2 sm:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--maroon)] ring-4 ring-white shadow" />

                  {/* Card */}
                  <div className={isLeft ? 'sm:col-start-1' : 'sm:col-start-2 sm:row-start-1'}>
                    <div className={`relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 ${isLeft ? 'sm:mr-8' : 'sm:ml-8'} animate-fade-in-scale`} style={{ animationDelay: `${i * 90}ms` }}>
                      <span
                        aria-hidden
                        className={`hidden sm:block absolute top-6 w-8 h-px bg-[var(--maroon)]/35 ${isLeft ? '-right-8' : '-left-8'}`}
                      />
                      <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[var(--maroon)] bg-[var(--maroon)]/10 px-2.5 py-1 rounded-full">
                        {h.year}
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-gray-900">
                        {h.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                        {h.text}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>
      </SectionReveal>

      {/* HERITAGE MILESTONE — 150 Years showcase */}
      <SectionReveal>
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-300/8 blur-3xl -translate-y-1/2 translate-x-1/4"
        />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 text-[var(--maroon)] text-xs font-bold uppercase tracking-widest animate-fade-in-scale">
              ✨ Milestone Moment
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-bold text-gray-900 animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
              150 Years of Excellence
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
              Since 1867, the Colombo Brokers&rsquo; Association has stood as the pinnacle of integrity and excellence in Sri Lanka&rsquo;s auction trade.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative group animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
                {/* Frame effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-[var(--maroon)]/10 to-amber-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4 md:p-6 border border-amber-100/50 group-hover:border-amber-200 transition-all duration-300">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src="/img01.png"
                      alt="150 Years of Ceylon Brokers' Association"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-2xl flex items-center justify-center border-4 border-white animate-fade-in-scale" style={{ animationDelay: '500ms' }}>
                  <div className="text-center">
                    <p className="text-xs md:text-sm font-bold text-[var(--maroon)] uppercase tracking-wider">150</p>
                    <p className="text-[10px] md:text-xs font-semibold text-[var(--maroon)] uppercase">Years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Heritage Facts */}
            <div className="space-y-5 lg:mt-0 mt-8">
              <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z" />
                    <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1a2 2 0 01-2-2v-2H3a1 1 0 110-2h1V9H3a1 1 0 010-2h1V5a2 2 0 012-2v-1a1 1 0 010-2h2V2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Founded</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1867</p>
                <p className="text-xs text-gray-500 mt-2">Era of colonial auction trade</p>
              </div>

              <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: '450ms' }}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Commodities</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">4 Major</p>
                <p className="text-xs text-gray-500 mt-2">Tea, rubber, coconut, spices</p>
              </div>

              <div className="group relative bg-gradient-to-br from-[var(--maroon)] to-[#5a1620] rounded-2xl border border-[var(--maroon)]/30 p-6 text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: '500ms' }}>
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">Legacy</p>
                <p className="text-lg font-bold mt-1">Trusted Authority</p>
                <p className="text-xs text-white/70 mt-2">Guiding South Asia&rsquo;s auction trade</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* PAST CHAIRMEN */}
      <section
        id="past"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-24"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              Heritage
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Past Chairmen
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              A compact, professional record of the Association&rsquo;s leadership.
            </p>
          </div>

          {chairmen.length === 0 ? (
            <p className="text-center text-gray-400 text-sm italic">
              Past chairmen will be listed here soon.
            </p>
          ) : (
            <div className="relative">
              <div className="hidden md:block absolute left-10 top-8 bottom-8 w-px bg-gradient-to-b from-[var(--maroon)] to-amber-300/70" />
              <div className="space-y-5 md:pl-20">
                {chairmen.map((item: any, i: number) => (
                  <article
                    key={item._id}
                    className="group relative rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-xl hover:-translate-y-1 duration-300 overflow-hidden animate-fade-in-scale"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="md:absolute md:-left-5 md:top-6 md:flex md:items-center">
                      <div className="hidden md:block w-3 h-3 rounded-full bg-[var(--maroon)] ring-8 ring-white shadow-lg" />
                    </div>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-[var(--maroon)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--maroon)]">
                            Chairman
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">
                          {item.chairmanName}
                        </h3>
                        {item.company && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.company}
                          </p>
                        )}
                      </div>
                      {item.deputyChairman && (
                        <div className="rounded-3xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">
                          <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
                            Deputy Chairman
                          </p>
                          <p className="mt-2 font-semibold text-gray-900">
                            {item.deputyChairman}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-[1400px] mx-auto rounded-2xl bg-gradient-to-br from-[var(--maroon)] to-[#3d0f17] text-white p-10 md:p-14 text-center relative overflow-hidden">
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
                href="/events"
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
