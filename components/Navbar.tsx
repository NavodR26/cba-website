'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV } from '@/lib/navigation'
import MobileMenu from './MobileMenu'
import SiteSearch from './SiteSearch'

const NAV_HEIGHT = 4.5

type NavbarProps = {
  topbarHeight?: number
}

export default function Navbar({ topbarHeight = 44 }: NavbarProps) {
  const pathname = usePathname()
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const totalHeaderHeight = topbarHeight + NAV_HEIGHT
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`cba-site-navbar fixed left-4 right-4 z-50 max-w-[1400px] mx-auto w-full box-border transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-[20px] bg-white/95 border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl'
            : 'bg-transparent border-transparent shadow-none'
        }`}
        style={{
          top: `${topbarHeight + 1}px`,
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-[0.625rem] flex items-center justify-between gap-8 animate-fade-in-scale">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group hover-scale transition-all duration-300">
            <div className="relative w-[3rem] h-[3rem] sm:w-[3.5rem] sm:h-[3.5rem] md:w-[4rem] md:h-[4rem] p-1 rounded-2xl bg-gradient-to-br from-[var(--maroon)]/15 to-amber-100/15 shadow-[0_18px_40px_rgba(122,31,42,0.12)] group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/logo.png"
                alt="Colombo Brokers' Association"
                fill
                priority
                className="object-contain transition-transform duration-500 group-hover:-rotate-6"
                sizes="4rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
            </div>
            <div className="leading-tight">
              <p className={`font-semibold text-[1.125rem] sm:text-[1.25rem] md:text-[1.5rem] tracking-[0.04em] transition-all duration-300 group-hover:text-amber-400 ${scrolled ? 'text-[var(--maroon)]' : 'text-white'}`}>
                CBA
              </p>
              <p className={`hidden min-[380px]:block text-[0.5625rem] sm:text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-colors duration-300 group-hover:text-[var(--maroon)]/90 ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
                Colombo Brokers&apos; Association
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU — visible at lg+ */}
          <nav className="hidden lg:flex items-center gap-1 text-[0.875rem] font-medium flex-1 justify-center">
            {NAV.map((item, i) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href)
              return (
                <div
                  key={`${item.href}-${i}`}
                  className="relative"
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center gap-1 px-4 py-[0.625rem] rounded-xl transition-all duration-300 group ${active
                      ? 'text-[var(--maroon)] font-semibold bg-[var(--maroon)]/8'
                      : scrolled
                      ? 'text-gray-700 hover:text-[var(--maroon)] hover:bg-gray-100'
                      : 'text-white hover:text-amber-300 hover:bg-white/10'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.children && (
                      <svg
                        width="0.875rem"
                        height="0.875rem"
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
                  </Link>

                  {item.children && hoverIdx === i && (
                    <div className="absolute left-0 top-full pt-2 min-w-[20rem] animate-fade-in-scale">
                      <div className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl ring-1 ring-gray-200/50 overflow-hidden border border-gray-200/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                        {item.children.map((child, childIdx) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="relative block px-5 py-[0.875rem] hover:bg-gradient-to-r hover:from-[var(--maroon)]/8 hover:to-amber-100/8 transition-all duration-300 hover-lift border-b border-gray-100 last:border-b-0 group"
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
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <SiteSearch
            showTrigger
            triggerClassName="hidden lg:inline-flex items-center gap-2 rounded-full border border-gray-200/50 bg-gray-100/50 backdrop-blur-[10px] px-4 py-2 text-xs font-semibold shadow-sm transition hover:border-[var(--maroon)]/30 hover:bg-gray-200/50"
          />

          {/* MOBILE */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="relative flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]"
              aria-label="Open site search"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
            <MobileMenu topbarHeight={topbarHeight} />
          </div>
        </div>
      </header>

    </>
  )
}
