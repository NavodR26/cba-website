'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

type NavChild = { href: string; label: string; desc?: string }
type NavItem = { href: string; label: string; children?: NavChild[] }

const NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'About CBA', desc: 'Vision, mission & history' },
      { href: '/about#past', label: 'Past Chairmen', desc: 'Honouring our leaders' },
    ],
  },
  {
    href: '/members',
    label: 'Members',
    children: [
      { href: '/members#directors', label: 'Board of Directors', desc: 'Directorship' },
      { href: '/members#committee', label: 'Office Bearers', desc: 'Leadership' },
      { href: '/members#partners', label: 'Partners', desc: 'Supporting institutions' },
      { href: '/members#brokers', label: 'Brokers Directory', desc: 'Member firms' },
    ],
  },
  { href: '/events', label: 'Calendar' },
  {
    href: '/resources',
    label: 'Resources',
    children: [
      { href: '/resources', label: 'Downloads', desc: 'Circulars & PDFs' },
      { href: '/#announcements', label: 'Announcements', desc: 'Latest notices' },
      { href: '/resources', label: 'Important Links', desc: 'Industry references' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const NAV_HEIGHT = 72

type NavbarProps = {
  topbarHeight?: number
}

export default function Navbar({ topbarHeight = 44 }: NavbarProps) {
  const pathname = usePathname()
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const totalHeaderHeight = topbarHeight + NAV_HEIGHT

  return (
    <>
      <header
        className="fixed left-0 right-0 z-50 backdrop-blur-[18px] bg-white/95 border-b border-white/20 shadow-lg hover-glow transition-all duration-300"
        style={{ top: `${topbarHeight}px` }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center gap-4 animate-fade-in-scale">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group hover-scale transition-all duration-300">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 p-1 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--maroon)]/15 to-amber-100/15 shadow-[0_18px_40px_rgba(122,31,42,0.12)] group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/logo.png"
                alt="Colombo Brokers' Association"
                fill
                priority
                className="object-contain transition-transform duration-500 group-hover:-rotate-6"
                sizes="80px"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20" />
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-[var(--maroon)] text-xl sm:text-2xl md:text-3xl tracking-[0.04em] transition-all duration-300 group-hover:text-amber-400">
                CBA
              </p>
              <p className="hidden min-[380px]:block text-[9px] sm:text-[11px] md:text-xs text-gray-600 uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-colors duration-300 group-hover:text-[var(--maroon)]/90">
                Colombo Brokers&apos; Association
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU — visible at lg+ */}
          <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
            {NAV.map((item, i) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href)
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center gap-1 px-4 py-2.5 rounded-lg transition-all duration-300 group ${active
                      ? 'text-[var(--maroon)] font-semibold'
                      : 'text-gray-700 hover:text-[var(--maroon)]'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.children && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${hoverIdx === i ? 'rotate-180' : ''
                          }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                    {active && (
                      <span className="absolute left-4 right-4 -bottom-1 h-1 bg-gradient-to-r from-[var(--maroon)] via-[var(--maroon)]/80 to-amber-400 rounded-full shadow-md shadow-[var(--maroon)]/30"></span>
                    )}
                    {/* Hover background */}
                    <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${active
                      ? 'bg-gradient-to-r from-[var(--maroon)]/8 to-amber-100/8'
                      : 'bg-gradient-to-r from-transparent via-[var(--maroon)]/3 to-transparent opacity-0 group-hover:opacity-100'
                      } -z-10`}></div>
                  </Link>

                  {item.children && hoverIdx === i && (
                    <div className="absolute left-0 top-full pt-3 min-w-[280px] animate-fade-in-scale">
                      <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl ring-1 ring-white/30 overflow-hidden border border-white/40">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                        {item.children.map((child, childIdx) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="relative block px-5 py-3.5 hover:bg-gradient-to-r hover:from-[var(--maroon)]/8 hover:to-amber-100/8 transition-all duration-300 hover-lift border-b border-white/30 last:border-b-0 group"
                            style={{ animationDelay: `${childIdx * 50}ms` }}
                          >
                            <p className="font-semibold text-gray-900 text-sm group-hover:text-[var(--maroon)] transition-colors duration-300">
                              {child.label}
                            </p>
                            {child.desc && (
                              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                                {child.desc}
                              </p>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--maroon)]/0 via-[var(--maroon)] to-[var(--maroon)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* MOBILE — only shown below lg */}
          <div className="lg:hidden">
            <MobileMenu topbarHeight={topbarHeight} />
          </div>
        </div>
      </header>

      {pathname !== '/' && (
        <div style={{ height: `${totalHeaderHeight}px` }} aria-hidden="true" />
      )}
    </>
  )
}
