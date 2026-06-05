import Link from 'next/link'
import { client } from '@/lib/sanity'

async function getPastChairmen() {
  return await client.fetch(
    `*[_type == "pastChairman"] | order(year desc)[0...8]`
  )
}

export default async function PastChairmenStrip() {
  const list = await getPastChairmen()
  if (!list?.length) return null

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
              Heritage
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
              Past Chairmen
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A century of leaders who shaped the Association
            </p>
          </div>
          <Link
            href="/members"
            className="text-sm font-semibold text-[var(--maroon)] hover:underline"
          >
            View full history →
          </Link>
        </div>

        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-thin">
            {list.map((c: any) => (
              <article
                key={c._id}
                className="shrink-0 w-[220px] bg-white rounded-xl border border-gray-200 p-4 hover:border-[var(--maroon)]/40 hover:shadow-md transition"
              >
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--maroon)] bg-[var(--maroon)]/10 px-2 py-1 rounded-full">
                  {c.year}
                </span>
                <p className="mt-3 font-semibold text-gray-900 leading-tight">
                  {c.chairmanName}
                </p>
                {c.company && (
                  <p className="text-xs text-gray-500 mt-0.5">{c.company}</p>
                )}
                {c.deputyChairman && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">
                      Deputy
                    </p>
                    <p className="text-xs text-gray-700 mt-0.5 line-clamp-1">
                      {c.deputyChairman}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
