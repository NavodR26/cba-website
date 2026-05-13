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

  const fallbackChairman = {
    name: "Mr. Chairman",
    message: "Welcome to the Colombo Brokers' Association. We continue to uphold the highest standards of integrity and professionalism in Sri Lanka's commodity trading industry.",
    portrait: null,
    designation: 'Chairman, Colombo Brokers\' Association',
  }

  const data = chairman || fallbackChairman

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px] rounded-b-[3rem] bg-[var(--maroon)]/6 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[320px] rounded-t-[3rem] bg-amber-200/6 blur-3xl"
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-[0.28em]">
            Chairman&rsquo;s Message
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900">
            From the Chairman&rsquo;s Desk
          </h2>
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A refined leadership statement with a compact composition, premium typographic rhythm and a stronger visual balance.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 mx-auto lg:mx-0 max-w-sm">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-[var(--maroon)]/15 to-amber-200/15 blur-2xl opacity-80 transition duration-500 group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-100 shadow-[0_24px_80px_rgba(122,31,42,0.09)]">
                {data.photo ? (
                  <img
                    src={urlFor(data.photo).width(900).url()}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[420px] items-center justify-center px-10 py-16 text-center text-gray-400">
                    <svg className="mx-auto h-20 w-20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 mb-6 text-sm text-gray-500">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[var(--maroon)]/10 text-[var(--maroon)] shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 8h10M7 12h6M7 16h10" />
                </svg>
              </span>
              <span className="uppercase tracking-[0.28em] font-semibold text-[var(--maroon)]">
                Trusted leadership
              </span>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-base md:text-lg leading-8 text-gray-700 italic tracking-wide">
                {data.message}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-6">
              <div>
                <p className="text-lg font-semibold text-gray-900">{data.name}</p>
                <p className="text-sm text-[var(--maroon)] font-semibold mt-1">{data.designation}</p>
              </div>

              <Link
                href="/members#committee"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--maroon)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5d1928]"
              >
                Meet the Committee
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
