import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'

async function getChairman() {
  try {
    return await client.fetch(`*[_type == "chairman"][0]`)
  } catch (error) {
    console.warn('Failed to fetch chairman data:', error)
    return null
  }
}

export default async function ChairmanMessage() {
  const chairman = await getChairman()

  // Fallback data when Sanity is unavailable
  const fallbackChairman = {
    name: "Mr. Chairman",
    message: "Welcome to the Colombo Brokers' Association. We continue to uphold the highest standards of integrity and professionalism in Sri Lanka's commodity trading industry.",
    portrait: null
  }

  const data = chairman || fallbackChairman

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Decorative background shapes */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--maroon)]/5 -translate-y-1/3 translate-x-1/3 animate-pulse"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-300/5 translate-y-1/3 -translate-x-1/3 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-[0.28em] animate-fade-in-scale">
            Chairman&rsquo;s Message
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
            From the Chairman&rsquo;s Desk
          </h2>
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
            A refined leadership statement with crisp styling, clear purpose and premium presentation for every screen.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* PORTRAIT */}
          <div className="lg:col-span-5 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
            <div className="relative max-w-md mx-auto group">
              {/* Maroon offset frame with glow */}
              <div className="absolute -top-5 -left-5 w-full h-full rounded-[2rem] bg-gradient-to-br from-[var(--maroon)]/20 to-transparent -z-10 blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-700" />

              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_30px_90px_rgba(122,31,42,0.12)] bg-gray-100 border border-gray-200 hover-scale transition duration-500">
                {data.photo ? (
                  <img
                    src={urlFor(data.photo).width(900).url()}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="lg:col-span-7 animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center gap-3 mb-6 text-sm text-gray-500">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[var(--maroon)]/10 text-[var(--maroon)] shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 8h10M7 12h6M7 16h10" />
                </svg>
              </span>
              <span className="uppercase tracking-[0.28em] font-semibold text-[var(--maroon)]">
                Trusted leadership.
              </span>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic font-light tracking-wide">
                {data.message}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-8">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {data.name}
                </p>
                <p className="text-sm text-[var(--maroon)] font-semibold mt-1">
                  {data.designation || 'Chairman, Colombo Brokers\' Association'}
                </p>
              </div>

              <Link
                href="/members#committee"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--maroon)] text-white text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Meet the Committee
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
