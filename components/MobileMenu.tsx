'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/members', label: 'Members' },
  { href: '/members#directors', label: 'Board of Directors', child: true },
  { href: '/members#committee', label: 'Office Bearers', child: true },
  { href: '/members#partners', label: 'Partners', child: true },
  { href: '/brokers', label: 'Brokers Directory', child: true },
  { href: '/resources', label: 'Resources' },
  { href: '/resources#auction-calendar', label: 'Auction Calendar', child: true },
  { href: '/resources#downloads', label: 'Circulars & Downloads', child: true },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

type MobileMenuProps = {
  topbarHeight?: number
}

const MOBILE_NAV_HEIGHT = 72

export default function MobileMenu({ topbarHeight = 0 }: MobileMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuTop = topbarHeight + MOBILE_NAV_HEIGHT

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]"
      >
        <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
        <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 z-40 bg-gray-950/45 backdrop-blur-sm"
            style={{ top: `${menuTop}px`, bottom: 0 }}
          />

          <aside
            className="fixed right-0 z-40 flex w-full max-w-sm flex-col overflow-hidden bg-white shadow-2xl"
            style={{ top: `${menuTop}px`, height: `calc(100vh - ${menuTop}px)` }}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9">
                  <Image src="/logo.png" alt="CBA" fill className="object-contain" sizes="36px" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--maroon)]">Menu</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">CBA Navigation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {NAV.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : !item.child && pathname?.startsWith(item.href)

                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-3 transition ${
                      item.child ? 'ml-3 border-l border-gray-100 pl-5 text-sm font-medium' : 'text-base font-semibold'
                    } ${
                      active
                        ? 'bg-[var(--maroon)] text-white shadow-sm'
                        : item.child
                        ? 'text-gray-600 hover:bg-gray-50 hover:text-[var(--maroon)]'
                        : 'text-gray-900 hover:bg-gray-50 hover:text-[var(--maroon)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Colombo Brokers&apos; Association
              </p>
              <p className="mt-1 text-sm text-gray-600">Established 1904 - Colombo, Sri Lanka</p>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
