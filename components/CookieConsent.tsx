'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CONSENT_KEY = 'cba-cookie-consent'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY)

    if (savedConsent) {
      try {
        const { timestamp } = JSON.parse(savedConsent)
        const ageInHours = (Date.now() - timestamp) / (1000 * 60 * 60)
        if (ageInHours < 24) return
        localStorage.removeItem(CONSENT_KEY)
      } catch {
        localStorage.removeItem(CONSENT_KEY)
      }
    }

    const timer = window.setTimeout(() => setIsVisible(true), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  const saveChoice = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, timestamp: Date.now() }))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {!isMinimized ? (
        <motion.aside
          initial={{ opacity: 0, y: -18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed top-24 right-3 z-[9998] w-[calc(100%-1.5rem)] max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-[0_20px_60px_rgba(39,16,24,0.22)] backdrop-blur-xl sm:right-6 sm:w-[25rem]"
        >
          <div className="h-1 bg-gradient-to-r from-[#7a1f2a] via-[#c9a227] to-[#7a1f2a]" />
          <div className="relative p-5 sm:p-6">
            <button type="button" onClick={() => setIsMinimized(true)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[var(--maroon)] focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30" aria-label="Hide cookie preferences">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>

            <div className="flex gap-3 pr-8">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--maroon)] to-[#4c1320] text-[#f4d27c] shadow-lg shadow-[var(--maroon)]/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="M9.5 12.5c.8 1 2.2 1 3 0s2.2-1 3 0" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b7628]">Your privacy</p>
                <h3 className="mt-0.5 text-base font-semibold text-slate-900">A better CBA experience</h3>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-6 text-slate-600">We use essential cookies to keep the site secure and optional analytics to improve our services. You stay in control.</p>

            <div className="mt-4 flex items-center gap-3 text-xs font-medium">
              <Link href="/privacy-policy" className="text-[var(--maroon)] underline decoration-[var(--maroon)]/30 underline-offset-4 transition hover:text-[#9b7628]">Privacy Policy</Link>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <Link href="/terms-of-use" className="text-[var(--maroon)] underline decoration-[var(--maroon)]/30 underline-offset-4 transition hover:text-[#9b7628]">Terms of Use</Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button type="button" onClick={() => saveChoice('declined')} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#c9a227]/60 hover:bg-[#fffaf0] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30">Essential only</button>
              <button type="button" onClick={() => saveChoice('accepted')} className="rounded-xl bg-gradient-to-r from-[var(--maroon)] to-[#541522] px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[var(--maroon)]/25 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30">Accept all</button>
            </div>
          </div>
        </motion.aside>
      ) : (
        <motion.button
          type="button"
          initial={{ scale: 0.9, opacity: 0, y: -8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsMinimized(false)}
          className="fixed top-24 right-3 z-[9998] flex items-center gap-2 rounded-full border border-white/20 bg-[var(--maroon)] px-4 py-2.5 text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f4d27c]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
          <span className="text-xs font-semibold">Cookie settings</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
