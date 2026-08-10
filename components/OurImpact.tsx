'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ImpactStat {
  label: string
  value: number | string
  suffix: string
  description: string
}

const impactStats: ImpactStat[] = [
  { label: 'Commodity Export Volume', value: 95, suffix: '%', description: 'Of Sri Lanka total exports' },
  { label: 'Annual Auction Value of Tea Exports', value: 1.5, suffix: 'B+', description: 'USD in trade volume' },
  { label: 'Member Companies', value: '8', suffix: '', description: 'Brokering companies under CBA' },
  { label: 'Weekly Auctions', value: '50', suffix: '', description: 'Auctions held weekly for a year' },
]

export default function OurImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [animatedValues, setAnimatedValues] = useState<(number | string)[]>(impactStats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      impactStats.forEach((stat, index) => {
        // Skip animation for string values
        if (typeof stat.value === 'string') {
          setAnimatedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = stat.value
            return newValues
          })
          return
        }

        const end = stat.value as number
        const duration = 2000
        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          
          setAnimatedValues((prev) => {
            const newValues = [...prev]
            // Handle decimal numbers for values like 1.5
            if (end % 1 !== 0) {
              newValues[index] = parseFloat((easeProgress * end).toFixed(1))
            } else {
              newValues[index] = Math.floor(easeProgress * end)
            }
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

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f7f5f1] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div aria-hidden className="absolute -left-28 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-[var(--maroon)]/10" />
      <div aria-hidden className="absolute -right-24 top-8 h-60 w-60 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-9 max-w-2xl text-center sm:mb-11"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--maroon)]/15 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--maroon)] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Our Impact
          </span>
          <h2 className="mt-4 [font-family:Georgia,serif] text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
            Driving Sri Lanka&apos;s Economy
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Our contribution to the national tea industry and commodity trading sector
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(49,34,38,0.1)] md:grid md:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group relative min-h-[205px] overflow-hidden p-7 transition-colors duration-300 hover:bg-[#fcfaf7] sm:p-8 ${index > 0 ? 'border-t border-slate-200 md:border-l md:border-t-0' : ''} ${index === 2 ? 'lg:border-l' : ''}`}
            >
              <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[var(--maroon)] to-amber-500 transition-all duration-500 group-hover:w-full" />
              <div className="flex h-full min-h-[141px] flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--maroon)]">CBA Impact</p>
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-[-0.05em] text-slate-900 sm:text-6xl">
                    {animatedValues[index]}
                  </span>
                  <span className="text-3xl md:text-4xl font-bold text-[var(--maroon)]">
                    {stat.suffix}
                  </span>
                </div>
              </motion.div>

              <h3 className="mt-3 text-base font-semibold text-slate-900">{stat.label}</h3>
              <p className="mt-1 text-sm text-slate-500">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
