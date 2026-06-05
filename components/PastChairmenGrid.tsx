import { client } from '@/lib/sanity'

async function getPastChairmen() {
  return await client.fetch(
    `*[_type == "pastChairman"] | order(year desc)`
  )
}

export default async function PastChairmenGrid() {
  const list = await getPastChairmen()
  if (!list?.length) return null

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 scroll-mt-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Heritage
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Past Chairmen of the Association
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
            A record of leaders who shaped the Association over more than a century of institutional service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((c: any, i: number) => (
            <article
              key={c._id}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:border-[var(--maroon)]/40 hover:shadow-md transition-all duration-300 animate-fade-in-scale"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="mb-4">
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--maroon)] bg-[var(--maroon)]/10 px-2.5 py-1 rounded-full">
                  {c.year}
                </span>
              </div>
              <p className="font-semibold text-gray-900 leading-tight text-sm">
                {c.chairmanName}
              </p>
              {c.company && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                  {c.company}
                </p>
              )}
              {c.deputyChairman && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                    Deputy
                  </p>
                  <p className="text-xs text-gray-700 mt-1 line-clamp-1">
                    {c.deputyChairman}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
