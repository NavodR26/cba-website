"use client"

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [inFooter, setInFooter] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const footerThreshold = documentHeight - windowHeight - 300 // 300px before footer

      setVisible(scrollY > 400)
      setInFooter(scrollY > footerThreshold)
    }
    window.addEventListener('scroll', onScroll)
    onScroll() // Initial check
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 md:bottom-6 z-[60] p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
        inFooter 
          ? 'bg-white text-[var(--maroon)] hover:bg-gray-100' 
          : 'bg-[var(--maroon)] text-white hover:bg-[#7f222a]'
      }`}
      style={{ paddingBottom: 'max(0.75rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))' }}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
