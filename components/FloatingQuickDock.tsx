'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ACTIONS = [
  { href: '/resources#auction-calendar', label: 'Calendar', short: 'Cal', icon: 'M3 5h18v17H3z M8 3v4M16 3v4M3 10h18' },
  { href: '/brokers', label: 'Brokers', short: 'Dir', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 10h2M13 10h2M9 14h2M13 14h2' },
  { href: '/resources#downloads', label: 'Downloads', short: 'Docs', icon: 'M12 3v12M7 10l5 5 5-5M5 21h14' },
  { href: '/contact', label: 'Contact', short: 'Call', icon: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z' },
]

export default function FloatingQuickDock() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Quick actions"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/60 bg-white/90 px-2 py-2 shadow-[0_20px_60px_rgba(17,24,39,0.18)] backdrop-blur-xl md:bottom-6 md:w-auto"
    >
      <div className="grid grid-cols-4 gap-1 md:flex md:items-center">
        {ACTIONS.map((item) => {
          const active = item.href === pathname || (item.href !== '/' && pathname?.startsWith(item.href.split('#')[0]))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex min-w-0 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition md:min-w-[84px] ${
                active
                  ? 'bg-[var(--maroon)] text-white'
                  : 'text-gray-600 hover:bg-[var(--maroon)]/8 hover:text-[var(--maroon)]'
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span className="truncate md:hidden">{item.short}</span>
              <span className="hidden truncate md:inline">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
