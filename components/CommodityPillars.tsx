'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Pillar = {
  name: string
  tagline: string
  desc: string
  color: string
  image: string
}

const PILLARS: Pillar[] = [
  {
    name: 'Tea',
    tagline: 'Ceylon’s flagship export',
    desc: 'Centre of the largest tea auction by volume in the world — held weekly under CBA oversight.',
    color: '#7a1f2a',
    image: '/images/commodities/tea-auction.png',
  },
  {
    name: 'Rubber',
    tagline: 'Latex & raw rubber',
    desc: 'Sri Lanka is one of the world’s most respected origins for natural rubber, traded at CBA-supervised auctions.',
    color: '#1f6f43',
    image: '/images/commodities/rubber-auction.png',
  },
  {
    name: 'Coconut',
    tagline: 'Kernel & by-products',
    desc: 'Auctions covering desiccated coconut, oil, husk, fibre and shell — feeding industries across the globe.',
    color: '#b67419',
    image: '/images/commodities/coconut-auction.png',
  },
  {
    name: 'Spices',
    tagline: 'Cinnamon, pepper, cloves',
    desc: 'CBA-backed spice trade connects Sri Lanka’s renowned spice growers with global buyers through transparent auctions.',
    color: '#854d0e',
    image: '/images/commodities/spices-auction.png',
  },
]

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.article
      key={pillar.name}
      className="group relative min-h-[330px] overflow-hidden rounded-2xl bg-slate-900 shadow-[0_8px_30px_rgb(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Image src={pillar.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/55 to-slate-900/10" />
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: pillar.color }} />
      <div className="relative flex h-full min-h-[330px] flex-col justify-end p-6 sm:p-7">

      <motion.p
        className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {pillar.tagline}
      </motion.p>
      
      <motion.h3 
        className="mt-2 text-3xl font-bold tracking-tight text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {pillar.name}
      </motion.h3>
      
      <motion.p 
        className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/85"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {pillar.desc}
      </motion.p>

      <div className="mt-5 h-1 w-10 rounded-full" style={{ backgroundColor: pillar.color }} />
      </div>
    </motion.article>
  )
}

export default function CommodityPillars() {
  return (
    <section
      id="pillars"
      className="relative overflow-hidden bg-slate-50 py-16 scroll-mt-32 sm:py-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--maroon)]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block rounded-full border border-[var(--maroon)]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--maroon)] shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Industries Served
          </motion.span>
          <h2 className="mx-auto mt-4 max-w-[calc(100vw-2rem)] text-xl min-[420px]:text-2xl sm:max-w-3xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Four pillars of Sri Lanka&rsquo;s</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--maroon)] to-amber-600 bg-clip-text text-transparent">auction activity</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-[calc(100vw-2rem)] sm:max-w-2xl mx-auto leading-relaxed">
            Our member firms operate across all four commodities the Association
            has championed for over a century.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PILLARS.map((p, index) => (
            <PillarCard key={p.name} pillar={p} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
