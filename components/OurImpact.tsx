'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface ImpactStat { label: string; value: number | string; suffix: string; description: string }

const impactStats: ImpactStat[] = [
  { label: 'Annual Auction Value of Tea Exports', value: 1.5, suffix: 'B+', description: 'USD in trade volume' },
  { label: 'Member Companies', value: '8', suffix: '', description: 'Brokering companies under CBA' },
  { label: 'Weekly Auctions', value: '50', suffix: '', description: 'Auctions held across a year' },
]

const commodityStats = [
  { category: 'Rubber', value: '69.18', unit: "'000 MT", title: 'Rubber production', description: 'Sri Lanka production in 2024', tone: 'maroon' },
  { category: 'Rubber', value: '8.6', unit: "'000 MT", title: 'Rubber exports', description: 'Sri Lanka exports in 2024', tone: 'maroon' },
  { category: 'Spices', value: '39,617', unit: 'MT', title: 'Pepper production', description: 'Estimated production in 2024', tone: 'gold' },
  { category: 'Spices', value: '42,846', unit: 'ha', title: 'Pepper cultivation', description: 'Estimated cultivated extent in 2024', tone: 'gold' },
  { category: 'Spices', value: '8,761.51', unit: 'Rs/kg', title: 'Cardamom farmgate price', description: '2024 average price', tone: 'gold' },
]

export default function OurImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [animatedValues, setAnimatedValues] = useState<(number | string)[]>(impactStats.map(() => 0))

  useEffect(() => {
    if (!isInView) return
    impactStats.forEach((stat, index) => {
      if (typeof stat.value === 'string') {
        setAnimatedValues((previous) => previous.map((value, itemIndex) => itemIndex === index ? stat.value : value))
        return
      }
      const end = stat.value
      const startTime = performance.now()
      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / 1800, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setAnimatedValues((previous) => previous.map((value, itemIndex) => {
          if (itemIndex !== index) return value
          return end % 1 ? Number((eased * end).toFixed(1)) : Math.floor(eased * end)
        }))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    })
  }, [isInView])

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f7f5f1] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div aria-hidden className="absolute -left-28 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-[var(--maroon)]/10" />
      <div aria-hidden className="absolute -right-24 top-8 h-60 w-60 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--maroon)]/15 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--maroon)] shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Our Impact</span>
          <h2 className="mt-4 [font-family:Georgia,serif] text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">Driving Sri Lanka&apos;s Commodity Economy</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">CBA's role across Sri Lanka Tea Trade, rubber and spices, supported by the latest commodity data available to the Association.</p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(49,34,38,0.1)] md:grid md:grid-cols-3">
          {impactStats.map((stat, index) => (
            <motion.article key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -4 }} className={`group relative min-h-[205px] overflow-hidden p-7 transition-colors duration-300 hover:bg-[#fcfaf7] sm:p-8 ${index > 0 ? 'border-t border-slate-200 md:border-l md:border-t-0' : ''}`}>
              <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[var(--maroon)] to-amber-500 transition-all duration-500 group-hover:w-full" />
              <div className="flex h-full min-h-[141px] flex-col justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--maroon)]">CBA Impact</p><motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}><div className="flex items-baseline gap-1"><span className="text-5xl font-bold tracking-[-0.05em] text-slate-900 sm:text-6xl">{animatedValues[index]}</span><span className="text-3xl font-bold text-[var(--maroon)] sm:text-4xl">{stat.suffix}</span></div></motion.div><div><h3 className="mt-3 text-base font-semibold text-slate-900">{stat.label}</h3><p className="mt-1 text-sm text-slate-500">{stat.description}</p></div></div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }} className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_36px_rgba(49,34,38,0.08)]">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-end sm:px-7"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--maroon)]">Rubber &amp; spices at a glance</p><h3 className="mt-1 text-xl font-semibold text-slate-900">Latest available 2024 indicators</h3></div><p className="text-xs text-slate-500">National commodity figures</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5">
            {commodityStats.map((stat, index) => {
              const gold = stat.tone === 'gold'
              return <article key={stat.title} className={`group relative min-h-[210px] p-6 transition-colors hover:bg-[#fcfaf7] ${index > 0 ? 'border-t border-slate-200 sm:border-l sm:border-t-0' : ''} ${index === 2 ? 'lg:border-l' : ''}`}><span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] ${gold ? 'bg-amber-100 text-[#916b14]' : 'bg-[var(--maroon)]/8 text-[var(--maroon)]'}`}>{stat.category}</span><div className="mt-6 flex items-baseline gap-1"><span className="text-3xl font-bold tracking-[-0.04em] text-slate-900">{stat.value}</span><span className={`text-sm font-bold ${gold ? 'text-[#a97c18]' : 'text-[var(--maroon)]'}`}>{stat.unit}</span></div><h4 className="mt-5 text-sm font-semibold text-slate-900">{stat.title}</h4><p className="mt-1 text-xs leading-5 text-slate-500">{stat.description}</p></article>
            })}
          </div>
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-[11px] leading-5 text-slate-500 sm:px-7">Sources: Rubber Research Institute of Sri Lanka; Economic Research Unit, Department of Export Agriculture. Spice production and cultivated extent are estimates.</div>
        </motion.div>
      </div>
    </section>
  )
}
