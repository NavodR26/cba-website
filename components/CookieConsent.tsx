'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [legalDocuments, setLegalDocuments] = useState<any[]>([])

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cba-cookie-consent')
    if (!consent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    async function fetchLegalDocuments() {
      try {
        const response = await fetch('/api/legal-documents', { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setLegalDocuments(data || [])
        }
      } catch (error) {
        console.warn('Failed to fetch legal documents:', error)
      }
    }
    fetchLegalDocuments()
  }, [])

  const privacyPolicyDoc = legalDocuments.find((doc: any) => doc.documentType === 'privacyPolicy')
  const termsOfUseDoc = legalDocuments.find((doc: any) => doc.documentType === 'termsOfUse')

  const getPDFUrl = (doc: any) => {
    return doc?.pdfUrl || '/CBA_Privacy_Policy_Terms_of_Use.pdf'
  }

  const handleAccept = () => {
    localStorage.setItem('cba-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cba-cookie-consent', 'declined')
    setIsVisible(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleRestore = () => {
    setIsMinimized(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {!isMinimized ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.98) 100%)',
          }}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Content */}
              <div className="flex-1 max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--maroon)]/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--maroon)]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cookie Preferences
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies for analytics and functionality purposes.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <a
                    href={getPDFUrl(privacyPolicyDoc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--maroon)] hover:text-[var(--maroon-dark)] font-medium transition-colors duration-200 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href={getPDFUrl(termsOfUseDoc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--maroon)] hover:text-[var(--maroon-dark)] font-medium transition-colors duration-200 underline underline-offset-2"
                  >
                    Terms of Use
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 rounded-full bg-[var(--maroon)] text-white hover:bg-[var(--maroon-dark)] shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #7a1f2a 0%, #5a1620 100%)',
                  }}
                >
                  Accept All
                </button>
                <button
                  onClick={handleMinimize}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-400 hover:text-gray-600 lg:hidden"
                  aria-label="Minimize"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Minimized Button */
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleRestore}
          className="fixed bottom-6 right-6 z-[9998] bg-[var(--maroon)] text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #7a1f2a 0%, #5a1620 100%)',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-sm font-medium">Cookies</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
