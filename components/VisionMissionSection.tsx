'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { AboutPageContent } from '@/lib/sanity'

type VisionMissionSectionProps = { content: AboutPageContent }

const principles = ['Transparency', 'Standards', 'Technology', 'Sustainability']

export default function VisionMissionSection({ content }: VisionMissionSectionProps) {
  const reduceMotion = useReducedMotion()
  const visionTitle = content.visionTitle?.trim() || 'Our Vision'
  const visionText = content.visionText?.trim() || "To be the leading authority for Sri Lanka's auctions, recognized globally for integrity, transparency, excellence, and the sustainable advancement of the Tea, Rubber, Coconut, and Spice sectors."
  const missionTitle = content.missionTitle?.trim() || 'Our Mission'
  const missionText = content.missionText?.trim() || "To lead Sri Lanka's auctions with integrity, transparency, and excellence while fostering collaboration, advancing sustainable trade, and creating lasting value for the Tea, Rubber, Coconut, and Spice sectors."

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section className="relative overflow-hidden bg-[#f8f6f2] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[72px]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(122,31,42,0.07),transparent_30%),radial-gradient(ellipse_at_88%_78%,rgba(185,132,61,0.12),transparent_28%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--maroon)]/20 to-transparent" />

      <div className="relative mx-auto max-w-[1240px]">
        <motion.header {...reveal()} className="relative mx-auto mb-0 max-w-[1160px] overflow-hidden rounded-t-2xl border border-slate-200/80 bg-[#fdfbf7] px-5 py-9 text-center sm:px-8 sm:py-10">
          <Image src="/images/about/vision-integrity.png" alt="" fill sizes="1160px" className="pointer-events-none object-cover object-left opacity-25" />
          <Image src="/images/about/mission-auction.png" alt="" fill sizes="1160px" className="pointer-events-none object-cover object-right opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,251,247,0.9),rgba(253,251,247,0.7)_48%,rgba(253,251,247,0.9))]" />
          <div className="relative flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-600/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a77b3b]">Our purpose</p>
            <span className="h-px w-8 bg-amber-600/60" />
          </div>
          <h2 className="relative mt-3 [font-family:Georgia,serif] text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[2.7rem]">
            Vision <span className="text-[var(--maroon)]">&amp;</span> Mission
          </h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
            Guided by over a century of excellence, we shape the future of Sri Lanka&apos;s auction trade with integrity and innovation.
          </p>
        </motion.header>

        <motion.div {...reveal(0.12)} className="relative mx-auto max-w-[1080px] rounded-b-2xl border border-t-0 border-slate-200/90 bg-white shadow-[0_22px_55px_rgba(45,32,37,0.16)]">
          <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
            <article className="group relative z-10 min-h-[330px] overflow-hidden rounded-tl-2xl bg-slate-950 p-7 text-white sm:p-9 lg:mr-[-38px] lg:min-h-[365px] lg:rounded-bl-2xl lg:p-11 lg:[clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]">
              <Image src="/images/about/vision-integrity.png" alt="" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-center opacity-50 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(122,31,42,0.98),rgba(122,31,42,0.88)_52%,rgba(122,31,42,0.72))]" />
              <div aria-hidden className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(135deg,transparent_49.5%,rgba(255,255,255,0.55)_50%,transparent_50.5%)] [background-size:15px_15px]" />
              <div className="relative flex h-full flex-col">
                <SectionLabel text={visionTitle} light />
                <p className="mt-5 max-w-[31ch] [font-family:Georgia,serif] text-xl leading-[1.55] text-white sm:text-[1.35rem]">{visionText}</p>
                <div className="mt-auto pt-7">
                  <span className="block h-px w-10 bg-amber-300/80" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200">Established 1904</p>
                  <p className="mt-1 text-xs text-white/65">Over 120 years of trusted service</p>
                </div>
              </div>
            </article>

            <article className="relative min-h-[330px] overflow-hidden rounded-br-2xl bg-[#fdfcf9] p-7 sm:p-9 lg:min-h-[365px] lg:pl-20 lg:pr-11 lg:py-11">
              <Image src="/images/about/mission-auction.png" alt="" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-right opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,252,249,0.98),rgba(253,252,249,0.76))]" />
              <div aria-hidden className="absolute -right-20 bottom-[-6rem] h-64 w-64 rounded-full border border-[var(--maroon)]/10" />
              <div className="relative flex h-full flex-col">
                <SectionLabel text={missionTitle} />
                <p className="mt-5 max-w-[36ch] [font-family:Georgia,serif] text-xl leading-[1.55] text-slate-700 sm:text-[1.35rem]">{missionText}</p>
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--maroon)]/15 pt-5">
                  {principles.map((principle, index) => (
                    <span key={principle} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                      {index > 0 && <i className="hidden h-4 w-px bg-[var(--maroon)]/25 sm:block" />}
                      {principle}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
          <div aria-hidden className="absolute left-[46%] top-1/2 z-20 hidden h-[78%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-amber-300 to-transparent lg:block" />
        </motion.div>
      </div>
    </section>
  )
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div>
      <p className={`text-[10px] font-bold uppercase tracking-[0.24em] ${light ? 'text-amber-200' : 'text-[var(--maroon)]'}`}>{text}</p>
      <span className={`mt-3 block h-px w-9 ${light ? 'bg-amber-300/80' : 'bg-[#b98a45]'}`} />
    </div>
  )
}
