'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'

interface ChairmanMessageProps {
  initialData?: {
    name: string
    message: string
    photo?: any
    designation: string
  }
}

export default function ChairmanMessage({ initialData }: ChairmanMessageProps) {
  const [data, setData] = useState<any>(initialData || null)

  useEffect(() => {
    if (initialData) return

    async function fetchChairman() {
      try {
        const response = await fetch('/api/chairman', { cache: 'no-store' })
        if (!response.ok) throw new Error('Failed to load chairman data')
        const chairman = await response.json()
        setData(chairman)
      } catch (error) {
        console.warn('Failed to fetch chairman data:', error)
        setData({
          name: 'Mr. Chairman',
          message: "Welcome to the Colombo Brokers' Association. We continue to uphold the highest standards of integrity and professionalism in Sri Lanka's commodity trading industry.",
          photo: null,
          designation: 'Chairman, Colombo Brokers\' Association',
        })
      }
    }
    fetchChairman()
  }, [initialData])

  if (!data) return <div>Loading...</div>

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
      <div className="relative max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Photo - smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
              {data.photo ? (
                <img
                  src={urlFor(data.photo).width(200).height(200).url()}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-[10px] font-semibold uppercase tracking-wider mb-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 8h10M7 12h6M7 16h10" />
              </svg>
              Chairman&rsquo;s Message
            </div>

            <blockquote className="text-gray-700 text-base leading-relaxed italic mb-4">
              &ldquo;{data.message}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{data.name}</p>
                <p className="text-xs text-[var(--maroon)] font-medium">{data.designation}</p>
              </div>
              <Link
                href="/members#committee"
                className="text-xs font-medium text-[var(--maroon)] hover:underline underline-offset-2"
              >
                View Committee →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
