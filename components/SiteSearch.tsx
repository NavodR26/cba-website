'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const SEARCH_ITEMS = [
  { title: 'Home', href: '/', group: 'Pages', keywords: 'cba colombo brokers association home tea auctions' },
  { title: 'About CBA', href: '/about', group: 'Pages', keywords: 'history vision mission association about' },
  { title: 'Members', href: '/members', group: 'Pages', keywords: 'members directors committee partners brokers' },
  { title: 'Board of Directors', href: '/members#directors', group: 'Members', keywords: 'directors board leadership' },
  { title: 'Office Bearers', href: '/members#committee', group: 'Members', keywords: 'committee office bearers chairman leadership' },
  { title: 'Brokers Directory', href: '/brokers', group: 'Members', keywords: 'broker directory member firms companies' },
  { title: 'Resources & Calendar', href: '/resources', group: 'Pages', keywords: 'resources downloads circulars calendar auction schedule' },
  { title: 'Auction Calendar', href: '/resources#auction-calendar', group: 'Resources', keywords: 'auction events calendar schedule tea rubber coconut' },
  { title: 'Circulars & Downloads', href: '/resources#downloads', group: 'Resources', keywords: 'downloads circulars notices publications pdf' },
  { title: 'Industry Links', href: '/resources#industry-links', group: 'Resources', keywords: 'important links tea board ctta commerce central bank' },
  { title: 'Gallery', href: '/gallery', group: 'Pages', keywords: 'gallery photos events images' },
  { title: 'Contact', href: '/contact', group: 'Pages', keywords: 'contact phone email address map inquiry' },
]

export default function SiteSearch() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setOpen(false)
    setQuery('')
  }, [pathname])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return SEARCH_ITEMS.slice(0, 8)
    return SEARCH_ITEMS.filter((item) =>
      `${item.title} ${item.group} ${item.keywords}`.toLowerCase().includes(term)
    ).slice(0, 10)
  }, [query])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]"
        aria-label="Open site search"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span>Search</span>
        <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-400">Ctrl K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 h-full w-full bg-gray-950/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative mx-auto mt-24 w-[calc(100%-24px)] max-w-2xl overflow-hidden rounded-2xl border border-white/40 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <svg className="h-5 w-5 text-[var(--maroon)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, downloads, calendar, members..."
                className="h-11 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-200"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[56vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-gray-500">
                  No matching result found.
                </div>
              ) : (
                results.map((item) => (
                  <Link
                    key={`${item.group}-${item.href}-${item.title}`}
                    href={item.href}
                    className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-[var(--maroon)]/5"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-gray-900 group-hover:text-[var(--maroon)]">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-gray-500">{item.group}</span>
                    </span>
                    <svg className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[var(--maroon)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
