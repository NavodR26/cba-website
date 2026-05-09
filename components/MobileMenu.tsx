// 'use client'

// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// const NAV = [
//   { href: '/', label: 'Home' },
//   { href: '/about', label: 'About' },
//   { href: '/about#past', label: 'Past Chairmen', child: true },
//   { href: '/members', label: 'Members' },
//   { href: '/members#committee', label: 'Committee', child: true },
//   { href: '/members#brokers', label: 'Brokers Directory', child: true },
//   { href: '/events', label: 'Calendar' },
//   { href: '/resources', label: 'Resources' },
//   { href: '/#announcements', label: 'Announcements', child: true },
//   { href: '/gallery', label: 'Gallery' },
//   { href: '/contact', label: 'Contact' },
// ]

// export default function MobileMenu() {
//   const pathname = usePathname()
//   const [open, setOpen] = useState(false)

//   // Close on route change
//   useEffect(() => {
//     setOpen(false)
//   }, [pathname])

//   // Lock body scroll
//   useEffect(() => {
//     if (open) {
//       const prev = document.body.style.overflow
//       document.body.style.overflow = 'hidden'
//       return () => {
//         document.body.style.overflow = prev
//       }
//     }
//   }, [open])

//   // Esc to close
//   useEffect(() => {
//     if (!open) return
//     function onKey(e: KeyboardEvent) {
//       if (e.key === 'Escape') setOpen(false)
//     }
//     window.addEventListener('keydown', onKey)
//     return () => window.removeEventListener('keydown', onKey)
//   }, [open])

//   return (
//     <>
//       {/* Hamburger button — always visible on mobile */}
//       <button
//         type="button"
//         aria-label={open ? 'Close menu' : 'Open menu'}
//         aria-expanded={open}
//         onClick={() => setOpen((v) => !v)}
//         className="cba-mobile-toggle"
//         style={{
//           display: 'inline-flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: 48,
//           height: 48,
//           borderRadius: 10,
//           border: '2px solid var(--maroon)',
//           background: 'var(--maroon)',
//           color: '#ffffff',
//           cursor: 'pointer',
//           padding: 0,
//           flexShrink: 0,
//           touchAction: 'manipulation',
//           boxShadow: '0 2px 8px rgba(122, 31, 42, 0.2)',
//           transition: 'all 0.3s ease',
//         }}
//       >
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//           <path d="M3 6h18" />
//           <path d="M3 12h18" />
//           <path d="M3 18h18" />
//         </svg>
//       </button>

//       {/* Render overlay only when open — completely separate from header */}
//       {open && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           style={{
//             position: 'fixed',
//             inset: 0,
//             zIndex: 9999,
//             display: 'flex',
//             justifyContent: 'flex-end',
//           }}
//         >
//           {/* Backdrop */}
//           <div
//             onClick={() => setOpen(false)}
//             style={{
//               position: 'absolute',
//               inset: 0,
//               background: 'rgba(0,0,0,0.55)',
//               backdropFilter: 'blur(2px)',
//             }}
//           />

//           {/* Drawer */}
//           <aside
//             style={{
//               position: 'relative',
//               width: '80%',
//               maxWidth: 360,
//               height: '100%',
//               background: '#ffffff',
//               boxShadow: '-15px 0 40px rgba(0,0,0,0.3)',
//               display: 'flex',
//               flexDirection: 'column',
//               animation: 'cba-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//             }}
//           >
//             {/* Header */}
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: '20px 20px',
//                 borderBottom: '2px solid #f3f4f6',
//                 flexShrink: 0,
//                 background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
//               }}
//             >
//               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <div style={{ position: 'relative', width: 40, height: 40 }}>
//                   <Image
//                     src="/logo.png"
//                     alt="CBA"
//                     fill
//                     sizes="40px"
//                     style={{ objectFit: 'contain' }}
//                   />
//                 </div>
//                 <p
//                   style={{
//                     margin: 0,
//                     fontWeight: 800,
//                     fontSize: 20,
//                     color: 'var(--maroon)',
//                     letterSpacing: '0.5px',
//                   }}
//                 >
//                   Menu
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 aria-label="Close menu"
//                 onClick={() => setOpen(false)}
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   width: 44,
//                   height: 44,
//                   borderRadius: 10,
//                   border: 'none',
//                   background: '#f3f4f6',
//                   color: 'var(--maroon)',
//                   cursor: 'pointer',
//                   padding: 0,
//                   fontWeight: 'bold',
//                   transition: 'all 0.2s ease',
//                 }}
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                 >
//                   <path d="M6 6l12 12" />
//                   <path d="M6 18L18 6" />
//                 </svg>
//               </button>
//             </div>

//             {/* Links */}
//             <nav
//               style={{
//                 flex: 1,
//                 overflowY: 'auto',
//                 padding: '16px 12px 24px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 4,
//               }}
//             >
//               {NAV.map((item) => {
//                 const isChild = !!item.child
//                 const active =
//                   item.href === '/'
//                     ? pathname === '/'
//                     : !isChild && pathname?.startsWith(item.href)
//                 return (
//                   <Link
//                     key={item.href + item.label}
//                     href={item.href}
//                     onClick={() => setOpen(false)}
//                     style={{
//                       display: 'block',
//                       padding: isChild ? '10px 16px 10px 40px' : '14px 16px',
//                       borderRadius: 12,
//                       fontSize: isChild ? 14 : 16,
//                       fontWeight: isChild ? 500 : 700,
//                       color: active
//                         ? '#ffffff'
//                         : isChild
//                         ? '#6b7280'
//                         : '#1f2937',
//                       background: active ? 'var(--maroon)' : '#f9fafb',
//                       textDecoration: 'none',
//                       transition: 'all 0.2s ease',
//                       boxShadow: active ? '0 2px 8px rgba(122, 31, 42, 0.15)' : 'none',
//                     }}
//                   >
//                     {item.label}
//                   </Link>
//                 )
//               })}

//               <div
//                 style={{
//                   marginTop: 16,
//                   padding: '16px',
//                   borderTop: '1px solid #f3f4f6',
//                 }}
//               >
//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: 10,
//                     letterSpacing: '0.2em',
//                     textTransform: 'uppercase',
//                     color: '#9ca3af',
//                   }}
//                 >
//                   Colombo Brokers&rsquo; Assoc.
//                 </p>
//                 <p
//                   style={{
//                     margin: '4px 0 0',
//                     fontSize: 12,
//                     color: '#6b7280',
//                   }}
//                 >
//                   Established 1904 · Colombo, Sri Lanka
//                 </p>
//               </div>
//             </nav>
//           </aside>
//         </div>
//       )}

//     </>
//   )
// }


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

type MobileMenuProps = {
  topbarHeight?: number
}

const MOBILE_NAV_HEIGHT = 72

export default function MobileMenu({ topbarHeight = 0 }: MobileMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuTop = topbarHeight + MOBILE_NAV_HEIGHT

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
        className="relative w-11 h-11 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300 hover:shadow-md hover:border-gray-300"
      >
        <span className={`absolute w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
        <span className={`absolute w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`absolute w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
      </button>

      {/* Overlay with smooth animation */}
      {open && (
        <>
          {/* Backdrop with blur */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            style={{
              top: `${menuTop}px`,
              bottom: 0,
              animation: 'fadeIn 0.25s ease-out',
            }}
          />

          {/* Drawer Menu */}
          <aside
            className="fixed right-0 z-40 w-full max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden"
            style={{
              top: `${menuTop}px`,
              height: `calc(100vh - ${menuTop}px)`,
              animation: 'slideInRight 0.3s cubic-bezier(0.32, 0.72, 0.3, 1)',
            }}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7">
                  <Image
                    src="/logo.png"
                    alt="CBA"
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <h2 className="font-bold text-lg text-[var(--maroon)]">Menu</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
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
                    className={`block rounded-lg px-4 py-3 transition-all duration-200 ${
                      isChild ? 'text-sm font-medium pl-10' : 'text-base font-semibold'
                    } ${
                      active
                        ? 'bg-gradient-to-r from-[var(--maroon)]/10 to-amber-100/5 text-[var(--maroon)] border-l-3 border-[var(--maroon)]'
                        : isChild
                        ? 'text-gray-600 hover:bg-gray-50'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-4 bg-gradient-to-t from-gray-50 to-transparent">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Colombo Brokers&rsquo; Assoc.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Established 1904 · Colombo, Sri Lanka
              </p>
            </div>
          </aside>
        </>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
