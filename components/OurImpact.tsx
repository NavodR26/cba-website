'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ImpactStat {
  label: string
  value: number
  suffix: string
  description: string
  icon: string
}

const impactStats: ImpactStat[] = [
  { label: 'Tea Export Volume', value: 95, suffix: '%', description: 'Of Sri Lanka total exports', icon: 'leaf' },
  { label: 'Annual Auction Value', value: 2, suffix: 'B+', description: 'USD in trade volume', icon: 'trending-up' },
  { label: 'Member Companies', value: 50, suffix: '+', description: 'Licensed brokerage firms', icon: 'building' },
  { label: 'Weekly Auctions', value: 52, suffix: '', description: 'Consistent trading schedule', icon: 'calendar' },
]

export default function OurImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [animatedValues, setAnimatedValues] = useState(impactStats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      impactStats.forEach((stat, index) => {
        const end = stat.value
        const duration = 2000
        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          
          setAnimatedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = Math.floor(easeProgress * end)
            return newValues
          })

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      })
    }
  }, [isInView])

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      leaf: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
      'trending-up': (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      building: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="2" x2="9" y2="22" />
          <line x1="15" y1="2" x2="15" y2="22" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      ),
      calendar: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    }
    return icons[iconName] || icons.leaf
  }

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Driving Sri Lanka&apos;s Economy
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
            Our contribution to the national tea industry and commodity trading sector
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--maroon)]/10 to-amber-100/10 text-[var(--maroon)] mb-6"
              >
                {getIcon(stat.icon)}
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">
                    {animatedValues[index]}
                  </span>
                  <span className="text-3xl md:text-4xl font-bold text-[var(--maroon)]">
                    {stat.suffix}
                  </span>
                </div>
              </motion.div>

              <h3 className="mt-3 text-base font-semibold text-gray-900">{stat.label}</h3>
              <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
