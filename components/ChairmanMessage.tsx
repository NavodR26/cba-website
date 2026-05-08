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
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider animate-fade-in-scale">
            Leadership
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
            From the Chairman&rsquo;s Desk
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* PORTRAIT */}
          <div className="lg:col-span-5 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
            <div className="relative max-w-md mx-auto group">
              {/* Maroon offset frame with glow */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-gradient-to-br from-[var(--maroon)] to-[#4a1119] -z-10 group-hover:shadow-2xl group-hover:shadow-[var(--maroon)]/30 transition-all duration-500" />

              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 hover-scale">
                {data.photo ? (
                  <img
                    src={urlFor(data.photo).width(800).url()}
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
            <svg
              className="w-12 h-12 text-[var(--maroon)]/30 mb-4 hover:text-[var(--maroon)]/60 transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.6 5.4c-2.5 1.5-4.6 4-4.6 7.6v5h6v-6H7.4c.2-1.6 1.3-2.7 2.7-3.6L9.6 5.4zm9 0c-2.5 1.5-4.6 4-4.6 7.6v5h6v-6h-3.6c.2-1.6 1.3-2.7 2.7-3.6L18.6 5.4z" />
            </svg>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic font-light hover-lift">
              {data.message}
            </p>

            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-5">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {data.name}
                </p>
                <p className="text-sm text-[var(--maroon)] font-semibold mt-0.5">
                  {data.designation || 'Chairman, Colombo Brokers\' Association'}
                </p>
              </div>

              <div className="ml-auto">
                <Link
                  href="/members#committee"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--maroon)] text-white text-sm font-semibold hover:opacity-90 transition-all duration-300 hover-scale group"
                >
                  Meet the Committee
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
