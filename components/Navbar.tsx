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
      { href: '/members#committee', label: 'Committee', desc: 'Office bearers' },
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

export default function Navbar() {
  const pathname = usePathname()
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/75 dark:bg-neutral-950/75 border-b border-white/20 dark:border-neutral-800/50 shadow-sm hover-glow transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center gap-4 animate-fade-in-scale">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group hover-scale transition-all duration-300">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-[68px] md:h-[68px] shrink-0 p-1 rounded-xl bg-gradient-to-br from-[var(--maroon)]/10 to-amber-100/10 group-hover:from-[var(--maroon)]/20 group-hover:to-amber-100/20 transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Colombo Brokers' Association"
              fill
              priority
              className="object-contain group-hover:rotate-12 transition-transform duration-500"
              sizes="68px"
            />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-[var(--maroon)] text-lg sm:text-xl md:text-2xl tracking-wide transition-all duration-300 group-hover:text-amber-400">
              CBA
            </p>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 tracking-[0.18em] uppercase hidden sm:block transition-colors duration-300 group-hover:text-[var(--maroon)]/70">
              Colombo Brokers&rsquo; Assoc. · Est. 1904
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
                  className={`relative inline-flex items-center gap-1 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
                    active
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
                      className={`transition-transform duration-300 ${
                        hoverIdx === i ? 'rotate-180' : ''
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                  {active && (
                    <span className="absolute left-4 right-4 -bottom-1 h-1 bg-gradient-to-r from-[var(--maroon)] via-[var(--maroon)]/80 to-amber-400 rounded-full shadow-md shadow-[var(--maroon)]/30" />
                  )}
                  {/* Hover background */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-[var(--maroon)]/8 to-amber-100/8'
                      : 'bg-gradient-to-r from-transparent via-[var(--maroon)]/3 to-transparent opacity-0 group-hover:opacity-100'
                  } -z-10`}></div>
                </Link>

                {item.children && hoverIdx === i && (
                  <div className="absolute left-0 top-full pt-3 min-w-[280px] animate-fade-in-scale">
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-2xl ring-1 ring-white/30 dark:ring-neutral-700/30 overflow-hidden border border-white/40 dark:border-neutral-700/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                      {item.children.map((child, childIdx) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="relative block px-5 py-3.5 hover:bg-gradient-to-r hover:from-[var(--maroon)]/8 hover:to-amber-100/8 transition-all duration-300 hover-lift border-b border-white/20 dark:border-neutral-700/30 last:border-b-0 group"
                          style={{ animationDelay: `${childIdx * 50}ms` }}
                        >
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-[var(--maroon)] transition-colors duration-300">
                            {child.label}
                          </p>
                          {child.desc && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
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
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
