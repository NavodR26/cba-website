'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'directors', label: 'Directors' },
  { id: 'committee', label: 'Officers' },
  { id: 'partners', label: 'Partners' },
  { id: 'brokers', label: 'Firms' },
]

export default function MembersSubNav() {
  const [active, setActive] = useState<string>('pillars')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="sticky top-[68px] sm:top-[80px] z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-1 overflow-x-auto py-2 -mb-px scrollbar-thin">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                active === s.id
                  ? 'bg-[var(--maroon)] text-white shadow'
                  : 'text-gray-600 hover:text-[var(--maroon)] hover:bg-gray-50'
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
