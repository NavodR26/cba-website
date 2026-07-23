'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { PointerEvent } from 'react'

type Resource = {
  title: string
  description: string
  href: string
  image: string
  featured?: boolean
}

const resources: Resource[] = [
  { title: 'Auction Calendar', description: 'Live auction dates, meetings and market activity.', href: '/resources', image: '/resources_hero.png', featured: true },
  { title: 'Committee', description: 'Meet the leadership guiding the association.', href: '/committee', image: '/members_hero.png' },
  { title: 'Brokers Directory', description: 'Explore our trusted member broker network.', href: '/brokers', image: '/members_hero.png' },
  { title: 'Announcements', description: 'Important notices and association updates.', href: '/#announcements', image: '/about_hero.png' },
  { title: 'Gallery', description: 'Moments from CBA events and milestones.', href: '/gallery', image: '/gallery_hero.png' },
  { title: 'Contact Us', description: 'Speak directly with the association team.', href: '/contact', image: '/contact_hero.png' },
]

export default function QuickActions() {
  const setPointerPosition = (event: PointerEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--resource-pointer-x', `${event.clientX - bounds.left}px`)
    card.style.setProperty('--resource-pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <section className="cba-resource-hub relative -mt-10 overflow-hidden px-4 pb-12 pt-[5.5rem] sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-16 lg:pt-28">
      <div className="cba-resource-hub__atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div className="cba-resource-hub__transition pointer-events-none absolute inset-x-0 top-0" aria-hidden />
      <motion.div aria-hidden className="cba-resource-hub__signal pointer-events-none absolute right-[8%] top-16 hidden h-36 w-36 rounded-full lg:block" animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.header initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }} className="mb-7 flex flex-col gap-5 border-b border-[#0a1b38]/10 pb-6 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8d2330]"><span className="h-px w-7 bg-current" />Quick access</p>
            <h2 className="mt-3 text-[clamp(2rem,3.4vw,3.25rem)] font-bold leading-none tracking-[-0.055em] text-[#091936]">Your connection to <span className="text-[#c99b2e]">the market.</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Essential CBA services, organised for faster access to people, dates and market information.</p>
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <span className="hidden text-right text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-slate-400 xl:block">Six essential<br />resources</span>
            <Link href="/resources" className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#8d2330] transition hover:text-[#5f1720]">View all resources <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/30 text-lg transition duration-300 group-hover:translate-x-1 group-hover:bg-[#8d2330] group-hover:text-white">&rarr;</span></Link>
          </div>
        </motion.header>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
          {resources.map((resource, index) => (
            <motion.div key={resource.title} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' } } }}>
              <Link href={resource.href} onPointerMove={setPointerPosition} className={`cba-resource-card group relative flex min-h-[208px] flex-col overflow-hidden rounded-2xl p-5 ${resource.featured ? 'cba-resource-card--featured' : ''}`}>
                <Image src={resource.image} alt="" fill sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw" className="cba-resource-card__image pointer-events-none object-cover" />
                <span className="cba-resource-card__overlay pointer-events-none absolute inset-0" aria-hidden />
                <span className="cba-resource-card__spotlight pointer-events-none absolute inset-0" aria-hidden />
                <div className="relative z-10 flex items-center justify-between border-b border-current/15 pb-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-60">CBA service</span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.14em] opacity-55">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="text-[15px] font-bold leading-tight tracking-[-0.025em]">{resource.title}</h3>
                  <p className="mt-2 text-[12px] leading-5 opacity-70">{resource.description}</p>
                  <span className="mt-4 flex items-center justify-between border-t border-current/15 pt-3 text-[10px] font-bold uppercase tracking-[0.14em]">Explore <span className="text-base transition-transform duration-300 group-hover:translate-x-1">&rarr;</span></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
