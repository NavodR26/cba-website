'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import type { AboutPageContent } from '@/lib/sanity'

type VisionMissionSectionProps = {
  content: AboutPageContent
}

export default function VisionMissionSection({ content }: VisionMissionSectionProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const visionRef = useRef(null)
  const visionInView = useInView(visionRef, { once: true })
  const missionRef = useRef(null)
  const missionInView = useInView(missionRef, { once: true })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  const [yearsCount, setYearsCount] = useState(0)
  const [commoditiesCount, setCommoditiesCount] = useState(0)
  const visionTitle = content.visionTitle?.trim() || 'Our Vision'
  const visionText = content.visionText?.trim() || "To champion a modern, transparent, and sustainable tea auction platform that strengthens Sri Lanka's position as the world's premier tea trading hub."
  const missionTitle = content.missionTitle?.trim() || 'Our Mission'
  const missionText = content.missionText?.trim() || "To foster a transparent, technology-driven, and sustainable marketplace that enhances stakeholder confidence, strengthens industry standards, and advances the global competitiveness of Sri Lanka's tea, rubber, coconut, and spice sectors."

  useEffect(() => {
    if (statsInView) {
      const animateCount = (target: number, setter: (val: number) => void) => {
        let current = 0
        const increment = target / 60
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setter(target)
            clearInterval(timer)
          } else {
            setter(Math.floor(current))
          }
        }, 16)
      }
      animateCount(120, setYearsCount)
      animateCount(4, setCommoditiesCount)
    }
  }, [statsInView])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(122,31,42,0.02),transparent_50%)]" />
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--maroon)]" />
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--maroon)]/10 to-[var(--maroon)]/5 text-[var(--maroon)] text-[11px] font-bold uppercase tracking-[0.2em] border border-[var(--maroon)]/20">
              Our Purpose
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--maroon)]" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Vision & Mission
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Guided by over a century of excellence, we continue to shape the future of Sri Lanka&apos;s auction trade with integrity and innovation.
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Vision Card */}
          <motion.article
            ref={visionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/80 group hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--maroon)]/15 to-[var(--maroon)]/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-[var(--maroon)] group-hover:to-[var(--maroon-dark)] group-hover:text-white transition-all duration-300">
              <svg className="w-7 h-7 text-[var(--maroon)] group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
              </svg>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              {visionTitle}
            </h3>
            <div className="w-10 h-1 bg-gradient-to-r from-[var(--maroon)] to-[var(--maroon-dark)] rounded-full mb-4" />
            <p className="text-gray-600 leading-relaxed text-sm">
              {visionText}
            </p>
            
            <div className="mt-5 pt-4 border-t border-gray-100">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--maroon)]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                </svg>
                Established 1904
              </span>
            </div>
          </motion.article>

          {/* Mission Card */}
          <motion.article
            ref={missionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/80 group hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-400/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-white transition-all duration-300">
              <svg className="w-7 h-7 text-amber-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
              </svg>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              {missionTitle}
            </h3>
            <div className="w-10 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mb-4" />
            <p className="text-gray-600 leading-relaxed text-sm">
              {missionText}
            </p>
            
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              {['Transparency', 'Standards', 'Technology', 'Sustainability'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        </div>

        {/* Stats Strip */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-gradient-to-r from-[var(--maroon)] to-[#5a1620] rounded-2xl p-5 md:p-6 shadow-lg"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                {yearsCount}+
              </p>
              <p className="text-[10px] md:text-xs text-amber-300 uppercase tracking-wider">
                Years of Excellence
              </p>
            </div>
            <div className="text-center border-l border-r border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                {commoditiesCount}
              </p>
              <p className="text-[10px] md:text-xs text-amber-300 uppercase tracking-wider">
                Commodities
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                Global
              </p>
              <p className="text-[10px] md:text-xs text-amber-300 uppercase tracking-wider">
                Reach
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
