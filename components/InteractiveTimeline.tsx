'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timelineEvents: TimelineEvent[] = [
  { year: '1904', title: 'Foundation', description: 'The Colombo Brokers\' Association was established to regulate tea auctions in Sri Lanka.' },
  { year: '1915', title: 'Growth Phase', description: 'Expanded operations to include rubber and coconut auctions.' },
  { year: '1950', title: 'Modernization', description: 'Introduced modern auction practices and standardized procedures.' },
  { year: '1980', title: 'Industry Leadership', description: 'Recognized as the premier authority for commodity trading in Sri Lanka.' },
  { year: '2000', title: 'Digital Era', description: 'Implemented electronic trading systems and digital record-keeping.' },
  { year: '2024', title: '120 Years', description: 'Celebrating over a century of excellence and continued innovation.' },
]

export default function InteractiveTimeline() {
  const containerRef = useRef(null)
  useInView(containerRef, { once: false, margin: '-100px' })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1000px] mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            A Legacy of Excellence
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
            Over 120 years of shaping Sri Lanka&apos;s commodity trading industry
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[var(--maroon)] to-amber-300" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="inline-block text-2xl font-bold text-[var(--maroon)] mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--maroon)] border-4 border-white shadow-lg z-10" />

                {/* Empty Space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
