'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const features = [
  {
    number: '01',
    title: 'Market Operations',
    desc: 'Efficient, trusted facilitation of Sri Lanka’s globally recognised commodity auctions.',
    icon: (
      <path d="M4 19h16M6 16V9m4 7V5m4 11v-4m4 4V7" />
    ),
  },
  {
    number: '02',
    title: '120+ Years of Heritage',
    desc: 'A continuous tradition of professional leadership and institutional excellence.',
    icon: (
      <><circle cx="12" cy="8" r="5" /><path d="M8.5 12 7 21l5-3 5 3-1.5-9" /></>
    ),
  },
  {
    number: '03',
    title: 'Market Transparency',
    desc: 'Independent broker oversight supporting fair practices and confident pricing.',
    icon: (
      <><path d="M12 3 4 7v5c0 4.8 3.4 8 8 9 4.6-1 8-4.2 8-9V7l-8-4Z" /><path d="m9 12 2 2 4-4" /></>
    ),
  },
]

export default function HomeFeatures() {
  return (
    <section className="relative z-20 px-4 pb-12 pt-3 sm:px-6 sm:pb-16 sm:pt-5 lg:px-8 lg:pb-20 lg:pt-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/95 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:p-4 lg:rounded-[36px] lg:p-5"
      >
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="group relative min-h-[360px] overflow-hidden rounded-[24px] bg-slate-950 lg:min-h-[430px]">
            <Image
              src="/cba-gavel-top.png"
              alt="The CBA auction gavel"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/5" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300">Our Heritage</span>
              </div>
              <h2 className="max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[34px]">
                The gavel remains our symbol of fairness, authority and tradition.
              </h2>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-200">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">Established 1904</span>
                <span className="text-white/55">Stewarding Sri Lanka&apos;s auction markets</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-[24px] bg-slate-50 p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--cba-maroon)]">Built on trust</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">A century of leadership, made relevant today.</h2>
              </div>
              <p className="max-w-[280px] text-sm leading-6 text-slate-500">Professional standards that keep every auction credible, transparent and globally connected.</p>
            </div>

            <div className="mt-4 grid flex-1 gap-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group/card grid grid-cols-[48px_1fr_auto] items-center gap-4 rounded-[20px] border border-slate-200 bg-white px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--cba-maroon)]/20 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:px-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--cba-maroon)]/8 text-[var(--cba-maroon)] transition group-hover/card:bg-[var(--cba-maroon)] group-hover/card:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                      {feature.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">{feature.desc}</p>
                  </div>
                  <span className="hidden text-sm font-bold text-slate-300 sm:block">{feature.number}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
