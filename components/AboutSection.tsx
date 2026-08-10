'use client'

import Link from 'next/link'
import type { AboutPageContent } from '@/lib/sanity'
import { motion } from 'framer-motion'

type AboutSectionProps = {
  content: AboutPageContent
}

export default function AboutSection({ content }: AboutSectionProps) {
  const visionTitle = content.visionTitle?.trim() || 'Vision'
  const visionText = content.visionText?.trim() || 'To champion a modern, transparent, and sustainable tea auction platform that strengthens Sri Lanka\'s position as the world\'s premier tea trading hub.'
  const missionTitle = content.missionTitle?.trim() || 'Mission'
  const missionText = content.missionText?.trim() || 'To foster a transparent, technology-driven, and sustainable marketplace that enhances stakeholder confidence, strengthens industry standards, and advances the global competitiveness of Sri Lanka\'s tea, rubber, coconut, and spice sectors.'

  // Truncate text for compact view
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--maroon)]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-amber-300/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--maroon)]/10 to-amber-300/10 border border-[var(--maroon)]/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--maroon)] animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--maroon)]">Our Purpose</span>
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Leading Sri Lanka&apos;s
            <span className="block bg-gradient-to-r from-[var(--maroon)] to-amber-600 bg-clip-text text-transparent"> Tea Auctions</span>
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            CBA stewards Sri Lanka&apos;s tea, rubber, coconut and spice markets with uncompromising integrity and professional excellence.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)] to-[#5a1620] rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />
            <div className="relative bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-100">
              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--maroon)] transition-colors duration-300">
                {visionTitle}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {truncateText(visionText, 100)}
              </p>

              {/* Decorative line */}
              <div className="mt-3 h-0.5 w-10 bg-gradient-to-r from-[var(--maroon)] to-amber-500 rounded-full group-hover:w-14 transition-all duration-500" />
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500" />
            <div className="relative bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-100">
              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                {missionTitle}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {truncateText(missionText, 100)}
              </p>

              {/* Decorative line */}
              <div className="mt-3 h-0.5 w-10 bg-gradient-to-r from-gray-900 to-amber-500 rounded-full group-hover:w-14 transition-all duration-500" />
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--maroon)] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--maroon)] transition-all hover:bg-[var(--maroon)] hover:text-white sm:px-8 sm:py-3 sm:text-[12px]"
          >
            View Full Vision & Mission
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
