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

  // Home page already has the full Quick Actions section — skip the dock there.
  if (pathname === '/') return null

  return (
    <nav
      aria-label="Quick actions"
      className="cba-floating-quick-dock fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/20 bg-white/30 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] md:bottom-6 md:w-auto"
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom, 0px))', minHeight: '60px' }}
    >
      <div className="grid grid-cols-4 gap-1 md:flex md:items-center h-full">
        {ACTIONS.map((item) => {
          const active = item.href === pathname || (item.href !== '/' && pathname?.startsWith(item.href.split('#')[0]))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold transition-all duration-300 md:min-w-[84px] ${
                active
                  ? 'bg-gradient-to-br from-[var(--maroon)] to-[#5b1728] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gradient-to-br hover:from-[var(--maroon)]/10 hover:to-[var(--maroon)]/5 hover:text-[var(--maroon)] hover:-translate-y-0.5'
              }`}
            >
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
