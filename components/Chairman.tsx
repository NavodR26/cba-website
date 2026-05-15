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
    <section className="relative bg-white py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-48 bg-[var(--maroon)]/5 blur-3xl" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto grid gap-10 lg:grid-cols-[minmax(320px,1fr)_minmax(480px,1.25fr)] items-center">
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(122,31,42,0.12)] bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/10 to-amber-100/10" />
          {data.photo ? (
            <img
              src={urlFor(data.photo).width(900).url()}
              alt={data.name}
              className="relative h-full w-full object-cover"
            />
          ) : (
            <div className="relative flex h-[420px] items-center justify-center text-gray-400">
              <span className="text-sm uppercase tracking-[0.35em]">Chairman image unavailable</span>
            </div>
          )}
        </div>

        <div className="relative">
          <span className="inline-flex items-center rounded-full border border-[var(--maroon)]/15 bg-[var(--maroon)]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--maroon)] shadow-sm">
            Chairman's Message
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            A measured, premium voice for every auction.
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-8">
            {data.message}
          </p>
          <div className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm">
            <p className="text-xl font-semibold text-gray-900">{data.name}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[var(--maroon)]">{data.designation}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
