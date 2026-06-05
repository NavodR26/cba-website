import Link from 'next/link'

type Action = {
  title: string
  desc: string
  href: string
  icon: React.ReactNode
}

const ITEMS: Action[] = [
  {
    title: 'Auction Calendar',
    desc: 'Tea, rubber & coconut sales',
    href: '/resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: 'Committee',
    desc: 'Office bearers & members',
    href: '/committee',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 20v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Brokers Directory',
    desc: 'Member firms profiles',
    href: '/brokers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" />
      </svg>
    ),
  },
  {
    title: 'Announcements',
    desc: 'Circulars & notices',
    href: '/#announcements',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 11l18-8v18L3 13z" />
        <path d="M11 11.5v6" />
      </svg>
    ),
  },
  {
    title: 'Gallery',
    desc: 'Photos & event coverage',
    href: '/gallery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    title: 'Contact Us',
    desc: 'Get in touch',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
]

export default function QuickActions() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
      <div className="max-w-[1400px] mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-neutral-800 p-2 md:p-3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative flex md:flex-col items-center md:text-center gap-3 md:gap-2 px-4 py-5 md:py-6 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition ${
                i < ITEMS.length - 1
                  ? 'md:border-r border-gray-100 dark:border-neutral-800'
                  : ''
              }`}
            >
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center shrink-0 group-hover:bg-[var(--maroon)] group-hover:text-white transition">
                <div className="w-5 h-5 md:w-5.5 md:h-5.5">{item.icon}</div>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm md:text-[13px] text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <p className="hidden md:block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
