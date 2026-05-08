'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/about#past', label: 'Past Chairmen', child: true },
  { href: '/members', label: 'Members' },
  { href: '/members#committee', label: 'Committee', child: true },
  { href: '/members#brokers', label: 'Brokers Directory', child: true },
  { href: '/events', label: 'Calendar' },
  { href: '/resources', label: 'Resources' },
  { href: '/#announcements', label: 'Announcements', child: true },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Esc to close
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
      {/* Hamburger button — always visible on mobile */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="cba-mobile-toggle"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          background: '#f9fafb',
          color: '#374151',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          touchAction: 'manipulation',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </svg>
      </button>

      {/* Render overlay only when open — completely separate from header */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Drawer */}
          <aside
            style={{
              position: 'relative',
              width: '85%',
              maxWidth: 380,
              height: '100%',
              background: '#fff',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'cba-slide-in 0.25s ease-out',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #f3f4f6',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative', width: 36, height: 36 }}>
                  <Image
                    src="/logo.png"
                    alt="CBA"
                    fill
                    sizes="36px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'var(--maroon)',
                  }}
                >
                  Menu
                </p>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: 'none',
                  background: '#f3f4f6',
                  color: '#374151',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px 12px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {NAV.map((item) => {
                const isChild = !!item.child
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : !isChild && pathname?.startsWith(item.href)
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: isChild ? '8px 16px 8px 36px' : '12px 16px',
                      borderRadius: 10,
                      fontSize: isChild ? 14 : 16,
                      fontWeight: isChild ? 500 : 600,
                      color: active
                        ? 'var(--maroon)'
                        : isChild
                        ? '#6b7280'
                        : '#1f2937',
                      background: active ? 'rgba(122,31,42,0.1)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div
                style={{
                  marginTop: 16,
                  padding: '16px',
                  borderTop: '1px solid #f3f4f6',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#9ca3af',
                  }}
                >
                  Colombo Brokers&rsquo; Assoc.
                </p>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: 12,
                    color: '#6b7280',
                  }}
                >
                  Established 1904 · Colombo, Sri Lanka
                </p>
              </div>
            </nav>
          </aside>
        </div>
      )}

    </>
  )
}
