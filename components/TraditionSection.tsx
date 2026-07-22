'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { PointerEvent } from 'react'

const artefacts = [
  {
    label: 'The auction gavel',
    title: <>The sound of<br /><em>fair trade</em></>,
    description: 'At every close, the gavel marks a sale conducted under the Association\'s standards - decisive, transparent and trusted.',
    image: '/cba-gavel.png',
    imageClass: 'right-[-4%] top-[8%] h-[83%] w-[58%] sm:right-[-1%] sm:w-[56%]',
    accent: 'bg-[#0d284d]',
  },
  {
    label: 'CBA regalia',
    title: <>A shared mark<br />of <em>purpose</em></>,
    description: 'Worn at meetings, AGMs and auction events, the maroon tie connects every generation of CBA stewardship.',
    image: '/cba-tie.png',
    imageClass: 'right-[1%] top-[7%] h-[84%] w-[47%] sm:right-[3%] sm:w-[45%]',
    accent: 'bg-[#8d2330]',
  },
]

export default function TraditionSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fbfaf8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(201,155,46,0.08),transparent_25%),linear-gradient(135deg,rgba(141,35,48,0.025),transparent_45%)]" />
      <div aria-hidden className="absolute right-0 top-0 h-full w-full bg-[url('/home_heritage_bk.png')] bg-[length:auto_100%] bg-right-top bg-no-repeat opacity-[0.16] [mask-image:linear-gradient(90deg,transparent_35%,black_72%,transparent_100%)]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(97,72,45,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(97,72,45,0.035)_1px,transparent_1px)] [background-size:56px_56px]" />
      <motion.div aria-hidden className="absolute -right-12 top-20 h-44 w-44 rounded-full border border-[#8d2330]/15" animate={{ scale: [1, 1.16, 1], opacity: [0.25, 0.7, 0.25] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute -right-4 top-28 h-28 w-28 rounded-full border border-[#c99b4a]/30" animate={{ scale: [1.12, 0.96, 1.12], opacity: [0.25, 0.65, 0.25] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative mx-auto max-w-[1320px]">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="max-w-[34rem]">
          <p className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b9873a]"><span className="h-px w-6 bg-[#c99b4a]" />CBA heritage collection</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#162a4b] sm:text-5xl">Made for the moment,<br /><em className="font-normal text-[#bd914d]">the market is called.</em></h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">The objects that embody fairness, authority and the enduring standards of the Colombo Brokers&apos; Association.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-9 lg:gap-6">
          {artefacts.map((artefact) => <HeritageCard key={artefact.label} {...artefact} />)}
        </motion.div>
      </div>
    </section>
  )
}

function HeritageCard({ label, title, description, image, imageClass, accent }: typeof artefacts[number]) {
  const updateLight = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--heritage-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--heritage-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <motion.article onPointerMove={updateLight} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }} className="group relative min-h-[18.5rem] overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_15px_34px_rgba(43,34,26,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#c99b4a]/45 hover:shadow-[0_22px_45px_rgba(95,57,42,0.14)] sm:min-h-[19.5rem] sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(201,155,74,0.11),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0)_45%,rgba(246,240,230,0.56))]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(230px_circle_at_var(--heritage-x,50%)_var(--heritage-y,50%),rgba(201,155,74,0.16),transparent_68%)]" />
      <div aria-hidden className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
      <div aria-hidden className="absolute right-[-6%] top-[-25%] h-72 w-72 rounded-full border border-[#c99b4a]/15" />
      <div aria-hidden className="absolute right-[8%] top-[18%] h-44 w-44 rounded-full border border-[#c99b4a]/10" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-y-0 z-[2] w-20 -translate-x-32 bg-gradient-to-r from-transparent via-white/60 to-transparent" animate={{ x: ['-10rem', '45rem'] }} transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }} />

      <div className="relative z-10 flex h-full max-w-[52%] flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#162a4b] shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#c99b4a]" />{label}</span>
        <h3 className="mt-5 font-serif text-[1.9rem] font-semibold leading-[0.95] tracking-[-0.035em] text-[#162a4b] sm:text-[2.15rem]">{title}</h3>
        <div className="mt-4 h-px w-8 bg-[#c99b4a]" />
        <p className="mt-3 text-[12px] leading-[1.45] text-slate-600 sm:text-[13px] sm:leading-5">{description}</p>
        <Link href="/about" className="group/link mt-auto inline-flex w-fit items-center gap-3 pt-5 text-[11px] font-bold text-[#8d2330] transition hover:text-[#5c1620]">Discover the story <span className="text-lg font-normal text-[#bd914d] transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span></Link>
      </div>

      <motion.div whileHover={{ y: -5, scale: 1.025 }} transition={{ duration: 0.45 }} className={`absolute z-10 ${imageClass}`}>
        <Image src={image} alt="" fill sizes="(min-width: 768px) 27vw, 46vw" className="object-contain drop-shadow-[0_18px_20px_rgba(64,42,30,0.18)]" />
      </motion.div>
      <div aria-hidden className="absolute bottom-5 right-5 flex items-center gap-2"><span className="hidden text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:inline">Collection</span><span className="h-2 w-2 rounded-full bg-[#8d2330]" /><span className="h-2 w-2 rounded-full bg-slate-200" /><span className="h-2 w-2 rounded-full bg-slate-200" /></div>
    </motion.article>
  )
}
