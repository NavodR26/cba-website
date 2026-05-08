import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { client } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

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

      {/* HERO — premium image-overlay style */}
      <section className="cba-hero-mesh relative bg-[var(--maroon)] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero1.png"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--maroon)] via-[var(--maroon)]/95 to-[var(--maroon)]/70" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-24">
          <Reveal>
            <span className="cba-glass-panel inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              About the Association
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl animate-fade-in-scale">
              A century of service to Sri Lanka&rsquo;s
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent text-gradient ml-2">Auction Trade</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 text-white/85 max-w-2xl text-lg leading-relaxed">
              Founded in 1904, The Colombo Brokers&rsquo; Association is the
              apex body representing brokers in the tea, rubber, coconut and
              spices auction industries of Sri Lanka.
            </p>
          </Reveal>
          <nav className="mt-6 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">About CBA</span>
          </nav>
        </div>
      </section>

      {/* INTRO — split with floating stat card */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group hover-scale transition-transform duration-500">
              <img
                src="/hero1.png"
                alt="CBA building"
                className="w-full h-[460px] object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon)]/40 to-transparent" />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-5 md:p-6 ring-1 ring-gray-100 max-w-[200px] animate-fade-in-scale hover-lift transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-[var(--maroon)] leading-none">
                120+
              </p>
              <p className="text-xs uppercase tracking-wider text-gray-500 mt-2">
                Years of Excellence
              </p>
            </div>
            <div
              aria-hidden
              className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl bg-[var(--maroon)]/8 -z-10 hidden md:block"
            />
          </div>

          <div className="lg:col-span-7">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              Who we are
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              The apex body of the auction trade
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
              Established in 1904, the Colombo Brokers&rsquo; Association (CBA)
              serves as the apex body representing brokers in the tea, rubber,
              coconut and spices auctions of Sri Lanka.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              The Association plays a vital role in upholding transparency,
              efficiency and global competitiveness of the auction system,
              while strengthening the wider industry that auctions support.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
              <MiniStat value="1904" label="Founded" />
              <MiniStat value="100+" label="Member Firms" />
              <MiniStat value="4" label="Commodities" />
              <MiniStat value="500+" label="Auctions / yr" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
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

      {/* VISION + MISSION — premium two-card */}
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

      {/* HISTORY — vertical timeline (premium) */}
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
              Honouring the leaders who have shaped the Association across more
              than a century.
            </p>
          </div>

          {chairmen.length === 0 ? (
            <p className="text-center text-gray-400 text-sm italic">
              Past chairmen will be listed here soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chairmen.map((item: any, i: number) => (
                <article
                  key={item._id}
                  className="group relative bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 overflow-hidden animate-fade-in-scale"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--maroon)] via-[#a33a48] to-amber-300" />
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-block text-xs font-semibold tracking-wider text-[var(--maroon)] bg-[var(--maroon)]/10 px-2.5 py-1 rounded-full">
                        Chairman
                      </span>
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      {item.chairmanName}
                    </h3>
                    {item.company && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.company}
                      </p>
                    )}
                    {item.deputyChairman && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs uppercase tracking-wider text-gray-400">
                          Deputy Chairman
                        </p>
                        <p className="text-sm text-gray-700 mt-0.5">
                          {item.deputyChairman}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
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

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="animate-fade-in-scale hover-lift transition-transform duration-300">
      <p className="text-2xl font-bold text-[var(--maroon)]">{value}</p>
      <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
        {label}
      </p>
    </div>
  )
}
