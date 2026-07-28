'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV, QUICK_ACCESS } from '@/lib/navigation'

type MobileMenuProps = {
  topbarHeight?: number
}

export default function MobileMenu({ topbarHeight = 44 }: MobileMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('cba-mobile-menu-open')
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove('cba-mobile-menu-open')
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

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    const base = href.split('#')[0]
    return pathname?.startsWith(base)
  }

  function toggleSection(href: string) {
    setExpanded((current) => (current === href ? null : href))
  }

  const menuOverlay = open ? (
    <div className="cba-mobile-menu-root fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 h-full w-full bg-gray-950/50 backdrop-blur-[2px] transition-opacity"
        onClick={() => setOpen(false)}
      />

      <div
        className="cba-mobile-menu-panel absolute inset-y-0 right-0 flex w-full max-w-[min(100%,22rem)] flex-col bg-white shadow-[-8px_0_40px_rgba(0,0,0,0.12)]"
        style={{
          paddingTop: `max(${topbarHeight + 8}px, env(safe-area-inset-top))`,
          paddingBottom: 'env(safe-area-inset-bottom)',
          animation: 'cba-slide-in 280ms cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <Image src="/logo.png" alt="CBA" fill className="object-contain" sizes="40px" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-[var(--maroon)]">CBA</p>
              <p className="truncate text-[10px] uppercase tracking-[0.16em] text-gray-400">
                Colombo Brokers&apos; Association
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12" />
              <path d="M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Menu
          </p>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = isActive(item.href)
              const hasChildren = Boolean(item.children?.length)
              const isExpanded = expanded === item.href

              if (!hasChildren) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center rounded-xl px-4 text-[15px] font-semibold transition ${
                        active
                          ? 'bg-[var(--maroon)] text-white shadow-md'
                          : 'text-gray-900 hover:bg-gray-50 hover:text-[var(--maroon)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }

              return (
                <li key={item.href} className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50/70">
                  <button
                    type="button"
                    onClick={() => toggleSection(item.href)}
                    className={`flex w-full min-h-12 items-center justify-between gap-3 px-4 text-left text-[15px] font-semibold transition ${
                      active ? 'text-[var(--maroon)]' : 'text-gray-900'
                    }`}
                    aria-expanded={isExpanded}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <ul className="space-y-0.5 border-t border-gray-100 bg-white px-2 py-2">
                      {item.children!.map((child) => (
                        <li key={`${item.href}-${child.label}`}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-3 transition hover:bg-[var(--maroon)]/5"
                          >
                            <span className="block text-sm font-semibold text-gray-900">{child.label}</span>
                            {child.desc && (
                              <span className="mt-0.5 block text-xs text-gray-500">{child.desc}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="my-6 border-t border-gray-200" />

          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Quick Access
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {QUICK_ACCESS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-center text-xs font-semibold text-gray-700 transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="cba-mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="cba-mobile-toggle relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]"
      >
        <span
          className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`}
        />
        <span
          className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'opacity-0 scale-0' : 'opacity-100'}`}
        />
        <span
          className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`}
        />
      </button>

      {mounted && menuOverlay ? createPortal(menuOverlay, document.body) : null}
    </>
  )
}
