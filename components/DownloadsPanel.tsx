'use client'

import { useMemo, useState } from 'react'

type DownloadItem = {
  _id: string
  title: string
  description?: string
  date?: string
  fileUrl: string
  fileName?: string
  fileSize?: number
}

function formatDate(d: any) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatSize(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function DownloadsPanel({ downloads }: { downloads: DownloadItem[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return downloads
    return downloads.filter((item) =>
      `${item.title} ${item.description || ''} ${item.fileName || ''}`.toLowerCase().includes(term)
    )
  }, [downloads, query])

  if (downloads.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
        <p className="text-sm italic text-gray-400">Documents will appear here once published.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search downloads</span>
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search circulars and downloads"
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-[var(--maroon)] focus:bg-white focus:ring-2 focus:ring-[var(--maroon)]/15"
          />
        </label>
        <p className="shrink-0 text-xs font-semibold text-gray-500">
          {filtered.length} of {downloads.length} shown
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No download matched your search.
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((item, i) => (
            <li
              key={item._id}
              className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-transform duration-300 hover:-translate-y-0.5 hover:border-[var(--maroon)]/40 hover:shadow-md"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--maroon)]/10 text-[var(--maroon)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                {item.description && <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{item.description}</p>}
                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(item.date)}
                  {item.fileSize ? ` - ${formatSize(item.fileSize)}` : ''}
                </p>
              </div>
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                download={item.fileName || true}
                className="inline-flex shrink-0 items-center gap-1 rounded bg-[var(--maroon)] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                Get
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
