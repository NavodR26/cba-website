'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV } from '@/lib/navigation'
import MobileMenu from './MobileMenu'
import SiteSearch from './SiteSearch'

type NavbarProps = {
  topbarHeight?: number
}

export default function Navbar({ topbarHeight = 44 }: NavbarProps) {
  const pathname = usePathname()
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const isHomepage = pathname === '/'
  const isHomeHeroNav = isHomepage && !scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // The homepage hero has its own bottom-edge quick navigation. The normal
  // site header returns after the visitor begins scrolling.
  if (isHomeHeroNav) return null

  return (
    <>
      <header
        className={`cba-site-navbar fixed z-50 mx-auto box-border transition-all duration-500 ${
          isHomeHeroNav
            ? 'cba-home-nav w-full border-y border-slate-200/90 bg-white/95 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-2xl'
            : scrolled
            ? 'rounded-[18px] border border-[var(--cba-border)] bg-white/95 shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-[18px]'
            : 'w-[90%] max-w-[1320px] rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.06)] shadow-[0_14px_30px_rgba(0,0,0,0.12)] backdrop-blur-[18px]'
        }`}
        style={{
          top: `${topbarHeight + 1}px`,
          left: isHomeHeroNav ? '0' : '5%',
          right: isHomeHeroNav ? '0' : '5%'
        }}
      >
        <div className={`flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-7 animate-fade-in-scale ${isHomepage && !scrolled ? 'py-2 lg:py-2.5' : 'py-3'}`}>
          <Link href="/" className={`group flex shrink-0 items-center transition-all duration-300 ${isHomepage ? 'gap-2.5' : 'gap-7'}`}>
            {!isHomepage && (
              <div className="relative h-10 w-10 shrink-0 scale-[1.65] drop-shadow-[0_6px_14px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-[1.7]">
                <Image
                  src="/logo.png"
                  alt="Colombo Brokers' Association emblem"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
            )}
            <div className="leading-tight">
              <p className={`font-semibold tracking-[0.08em] transition-all duration-300 group-hover:text-[var(--cba-gold)] ${isHomeHeroNav ? 'text-[1.25rem] lg:text-[1.4rem]' : 'text-[1.35rem] lg:text-[1.5rem]'} ${isHomeHeroNav || scrolled ? 'text-slate-950' : 'text-slate-50'}`}>
                CBA
              </p>
              <p className={`hidden min-[380px]:block uppercase tracking-[0.14em] transition-colors duration-300 group-hover:text-[var(--cba-maroon)]/90 ${isHomeHeroNav ? 'text-[0.5rem] lg:text-[0.56rem]' : 'text-[0.6rem] lg:text-[0.65rem]'} ${isHomeHeroNav || scrolled ? 'text-slate-500' : 'text-slate-200'}`}>
                Colombo Brokers&apos; Association
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU — visible at lg+ */}
          <nav className={`hidden flex-1 items-center justify-center gap-1 text-[0.84rem] font-normal lg:flex ${isHomeHeroNav ? 'mx-5' : ''}`} aria-label="Primary navigation">
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
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-flex items-center gap-1 rounded-xl px-3.5 py-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--cba-maroon)] focus:ring-offset-2 ${active
                      ? isHomeHeroNav
                        ? 'text-slate-950 font-semibold after:absolute after:inset-x-3.5 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--cba-gold)]'
                        : scrolled
                        ? 'text-[var(--cba-maroon)] font-semibold bg-gradient-to-r from-[rgba(122,31,42,0.08)] to-[rgba(200,164,93,0.04)] shadow-sm'
                        : 'text-white font-semibold bg-white/12 ring-1 ring-white/10 backdrop-blur-md shadow-sm'
                      : scrolled
                      ? 'text-gray-700 hover:text-[var(--cba-maroon)] hover:bg-gray-100/80'
                      : isHomeHeroNav
                      ? 'text-slate-700 hover:text-[var(--cba-maroon)] hover:bg-slate-100'
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
            triggerClassName={`hidden lg:inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.7rem] font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cba-gold)] ${isHomeHeroNav ? 'border border-slate-200 bg-white text-slate-800 shadow-[0_5px_16px_rgba(15,23,42,0.08)] hover:border-[var(--cba-gold)] hover:text-[var(--cba-maroon)]' : scrolled ? 'border border-gray-200 bg-gray-50 text-gray-700 hover:border-[var(--maroon)]/30 hover:bg-white' : 'border border-white/10 bg-white/6 text-white backdrop-blur-[8px] hover:border-amber-200/40 hover:bg-white/12'}`}
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
