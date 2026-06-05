import { client, urlFor } from '@/lib/sanity'

async function getChairman() {
  return await client.fetch(`*[_type == "chairman"][0]`)
}

export default async function Chairman() {
  const data = await getChairman()

  if (!data) {
    return (
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--maroon)]">
            Chairman’s Insight
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Leadership that shapes every auction.
          </h2>
          <p className="mt-5 text-gray-600 leading-relaxed">
            The Colombo Brokers’ Association continues to steward Sri Lanka’s auction heritage with care, transparency, and enduring trust.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50/50 to-white py-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[var(--maroon)]/5 to-transparent blur-3xl" aria-hidden="true" />
      <div className="absolute -right-40 top-32 w-80 h-80 rounded-full bg-amber-300/5 blur-3xl" aria-hidden="true" />
      
      <div className="max-w-[1300px] mx-auto grid gap-12 lg:grid-cols-[1fr_1.3fr] items-center relative z-10">
        {/* IMAGE */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/10 to-amber-100/10" />
          <div className="absolute inset-0 border border-white/20 rounded-3xl" />
          {data.photo ? (
            <img
              src={urlFor(data.photo).width(900).url()}
              alt={data.name}
              className="relative h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="relative flex h-[450px] items-center justify-center text-gray-400">
              <span className="text-sm uppercase tracking-[0.35em]">Chairman image unavailable</span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="relative">
          <span className="inline-flex items-center rounded-full border border-[var(--maroon)]/20 bg-[var(--maroon)]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--maroon)] shadow-sm">
            Leadership
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Message from the Chairman
          </h2>
          <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
            {data.message}
          </p>
          <div className="mt-10 rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white/80 to-gray-50/50 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-2xl font-bold text-gray-900">{data.name}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[var(--maroon)]">{data.designation}</p>
            <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[var(--maroon)] to-amber-300 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
