'use client'

import { useMemo, useState } from 'react'
import { urlFor } from '@/lib/sanity'

type Broker = {
  _id: string
  companyName?: string
  description?: string
  logo?: any
  website?: string
  contact?: string
  commodities?: string[]
}

const COMMODITIES = ['All', 'Tea', 'Rubber', 'Coconut', 'Spices'] as const
type Commodity = (typeof COMMODITIES)[number]

function matchesCommodity(broker: Broker, c: Commodity) {
  if (c === 'All') return true
  // try a `commodities` array first, then look in description text
  const k = c.toLowerCase()
  const list = (broker.commodities || []).map((x) => x.toLowerCase())
  if (list.some((x) => x.includes(k))) return true
  return (broker.description || '').toLowerCase().includes(k)
}

export default function BrokersDirectoryClient({
  brokers,
}: {
  brokers: Broker[]
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Commodity>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return brokers.filter((b) => {
      if (!matchesCommodity(b, filter)) return false
      if (!q) return true
      return (
        (b.companyName || '').toLowerCase().includes(q) ||
        (b.description || '').toLowerCase().includes(q) ||
        (b.contact || '').toLowerCase().includes(q)
      )
    })
  }, [brokers, query, filter])

  return (
    <>
      {/* Search + Filter */}
      <div className="mb-8 grid sm:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brokers by name or description…"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30 focus:border-[var(--maroon)] transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {COMMODITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                filter === c
                  ? 'bg-[var(--maroon)] text-white shadow'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--maroon)] hover:text-[var(--maroon)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-5">
        Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
        of {brokers.length} firms
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            No brokers match your search.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <article
              key={item._id}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[var(--maroon)]/40 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {item.logo ? (
                    <img
                      src={urlFor(item.logo).width(120).url()}
                      className="object-contain w-full h-full p-2"
                      alt={item.companyName || ''}
                    />
                  ) : (
                    <span className="text-[var(--maroon)] font-bold text-lg">
                      {item.companyName?.charAt(0) || 'B'}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.companyName}
                  </h3>
                  {item.contact && (
                    <p className="text-xs text-gray-500 truncate">
                      {item.contact}
                    </p>
                  )}
                </div>
              </div>

              {item.description && (
                <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              )}

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                {item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--maroon)] hover:underline"
                  >
                    Visit Website
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">No website</span>
                )}
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] font-semibold">
                  Member
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
