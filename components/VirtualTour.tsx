'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'

interface VirtualTour {
  _id: string
  title: string
  description: string
  embedUrl?: string
  thumbnail?: any
  isActive: boolean
}

export default function VirtualTour() {
  const [virtualTour, setVirtualTour] = useState<VirtualTour | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVirtualTour() {
      try {
        const response = await fetch('/api/virtual-tour', { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setVirtualTour(data[0] || null)
        }
      } catch (error) {
        console.error('Error fetching virtual tour:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVirtualTour()
  }, [])

  if (loading) return null

  if (!virtualTour || !virtualTour.isActive) return null

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Experience
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Virtual Tour
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
            {virtualTour.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video"
        >
          {virtualTour.embedUrl ? (
            <iframe
              src={virtualTour.embedUrl}
              title={virtualTour.title}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          ) : virtualTour.thumbnail ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img
                src={urlFor(virtualTour.thumbnail).width(1400).height(800).url()}
                alt={virtualTour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-[var(--maroon)] ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <p>Virtual tour coming soon</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
