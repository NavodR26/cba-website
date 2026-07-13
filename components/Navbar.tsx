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
  const [activeSection, setActiveSection] = useState<string>('')
  const totalHeaderHeight = topbarHeight + NAV_HEIGHT
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy for section highlighting on homepage
  useEffect(() => {
    if (!isHomepage) return

    const sections = document.querySelectorAll('section[id]')
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [isHomepage])

  return (
    <>
      <header
        className={`cba-site-navbar fixed z-50 max-w-[1400px] mx-auto w-[92%] left-4 right-4 box-border transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-[18px] bg-white/95 border border-[var(--cba-border)] shadow-[0_10px_30px_rgba(0,0,0,0.09)] rounded-[24px]'
            : 'backdrop-blur-[18px] bg-[rgba(255,255,255,0.06)] border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.12)] rounded-[24px]'
        }`}
        style={{
          top: `${topbarHeight + 1}px`,
          left: '4%',
          right: '4%'
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-[0.625rem] flex items-center justify-between gap-8 animate-fade-in-scale">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group hover-scale transition-all duration-300">
            <div className="relative w-[4.25rem] h-[4.25rem] sm:w-[4.75rem] sm:h-[4.75rem] md:w-[5rem] md:h-[5rem] p-1 rounded-[12px] bg-gradient-to-br from-[var(--cba-maroon)]/12 to-[var(--cba-gold)]/12 shadow-[0_18px_40px_rgba(122,31,42,0.12)] group-hover:scale-102 transition-transform duration-500">
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
              <p className={`font-semibold text-[1.25rem] sm:text-[1.35rem] md:text-[1.5rem] tracking-[0.04em] transition-all duration-300 group-hover:text-[var(--cba-gold)] ${scrolled ? 'text-[var(--cba-maroon)]' : 'text-slate-50'}`}>
                CBA
              </p>
              <p className={`hidden min-[380px]:block text-[0.5625rem] sm:text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-colors duration-300 group-hover:text-[var(--cba-maroon)]/90 ${scrolled ? 'text-gray-600' : 'text-slate-200'}`}>
                Colombo Brokers&apos; Association
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU — visible at lg+ */}
          <nav className="hidden lg:flex items-center gap-2 text-[0.95rem] font-normal flex-1 justify-center">
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
                    className={`relative inline-flex items-center gap-1 px-5 py-2 rounded-full transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--cba-maroon)] focus:ring-offset-2 ${active
                      ? scrolled
                        ? 'text-[var(--cba-maroon)] font-semibold bg-gradient-to-r from-[rgba(122,31,42,0.08)] to-[rgba(200,164,93,0.04)] shadow-sm'
                        : 'text-white font-semibold bg-white/10 backdrop-blur-md shadow-sm'
                      : scrolled
                      ? 'text-gray-700 hover:text-[var(--cba-maroon)] hover:bg-gray-100/80'
                      : 'text-slate-50 hover:text-[var(--cba-gold)] hover:bg-white/6'
                      }`}
                  >
                    <span className="relative z-10 cba-link-grow">{item.label}</span>
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
                      <div className="backdrop-blur-2xl bg-white/95 rounded-2xl shadow-2xl ring-1 ring-gray-200/40 overflow-hidden border border-gray-200/40">
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
            triggerClassName="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 backdrop-blur-[8px] px-4 py-2 text-xs font-semibold shadow-sm transition hover:border-[var(--maroon)]/30 hover:bg-white/12"
          />

          {/* MOBILE */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="relative flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)] focus:outline-none focus:ring-2 focus:ring-[var(--cba-maroon)] focus:ring-offset-2"
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
