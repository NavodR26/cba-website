"use client"

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 md:bottom-6 z-[60] bg-[var(--maroon)] hover:bg-[#7f222a] text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      style={{ paddingBottom: 'max(0.75rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))' }}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
