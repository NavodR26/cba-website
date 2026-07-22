'use client'

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

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--maroon)]/10 to-amber-300/10 border border-[var(--maroon)]/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--maroon)] animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--maroon)]">Our Purpose</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Leading Sri Lanka&apos;s
            <span className="block bg-gradient-to-r from-[var(--maroon)] to-amber-600 bg-clip-text text-transparent"> Tea Auctions</span>
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            CBA stewards Sri Lanka&apos;s tea, rubber, coconut and spice markets with uncompromising integrity and professional excellence.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)] to-[#5a1620] rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />
            <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--maroon)] to-[#5a1620] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                </svg>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--maroon)] transition-colors duration-300">
                {visionTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {visionText}
              </p>

              {/* Decorative line */}
              <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-[var(--maroon)] to-amber-500 rounded-full group-hover:w-16 transition-all duration-500" />
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
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500" />
            <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                </svg>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                {missionTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {missionText}
              </p>

              {/* Decorative line */}
              <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-gray-900 to-amber-500 rounded-full group-hover:w-16 transition-all duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
