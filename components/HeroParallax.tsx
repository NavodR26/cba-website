'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useScrollParallax } from '@/hooks/useParallax';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import TradeRoutes from './TradeRoutes';
import ScrollMouse from './ScrollMouse';

interface HeroParallaxProps {
  nextAuction?: { title: string; date: string; saleNo?: string }
}

const credibility = [
  ['Global', 'Market connections'],
  ['120+', 'Years of leadership'],
  ['4', 'Commodity sectors'],
  ['CBA', 'Institutional authority'],
]

export function HeroParallax({ nextAuction }: HeroParallaxProps) {
  const { ref: heroRef, y: skylineY } = useScrollParallax(0.3);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden cba-hero-height cba-hero-mesh" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Dynamic background with animated parallax */}
      <motion.div
        className="absolute inset-0 hero-kenburns"
        style={{ y: skylineY, scale, opacity }}
        animate={{ scale: [1.01, 1.0, 1.01] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src="/hero.png" alt="Colombo skyline" fill className="object-cover object-[58%_center] sm:object-center" priority />
      </motion.div>

      {/* Left overlay for text readability (reduced opacity) */}
      <div className="cba-hero-left-overlay" />

      {/* World map watermark (subtle) */}
      <svg className="cba-hero-worldmap" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="#000000">
          {/* Simplified dotted continents for watermark */}
          <g transform="translate(120,120)">
            <circle cx="80" cy="120" r="6" />
            <circle cx="110" cy="100" r="5" />
            <circle cx="140" cy="90" r="5" />
            <circle cx="180" cy="110" r="6" />
            <circle cx="220" cy="100" r="5" />
            <circle cx="260" cy="120" r="6" />
          </g>
          <g transform="translate(520,180)">
            <circle cx="60" cy="80" r="5" />
            <circle cx="90" cy="70" r="6" />
            <circle cx="120" cy="90" r="5" />
            <circle cx="150" cy="110" r="6" />
            <circle cx="180" cy="95" r="5" />
          </g>
          <g transform="translate(980,200)">
            <circle cx="60" cy="70" r="6" />
            <circle cx="95" cy="80" r="5" />
            <circle cx="130" cy="65" r="5" />
            <circle cx="170" cy="90" r="6" />
          </g>
        </g>
      </svg>

      {/* Trade route lines */}
      <TradeRoutes />

      {/* Decorative orbs removed to reduce visual noise */}

      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-6 flex flex-col justify-center text-left lg:text-left">
            <div className="cba-hero-text-panel relative p-2 sm:p-4">
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-slate-950/35 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md"
              >
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,212,76,0.45)]" />
                Established 1904
              </motion.div>

              <motion.h1
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-3xl cba-hero-title"
              >
                The Colombo Brokers&apos;
                <br />
                <motion.span
                  className="text-[var(--cba-gold)]"
                  animate={{
                    textShadow: ['0 0 18px rgba(201, 162, 39, 0.18)', '0 0 34px rgba(201, 162, 39, 0.45)', '0 0 18px rgba(201, 162, 39, 0.18)'],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  Association
                </motion.span>
              </motion.h1>

              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl cba-hero-sub"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', maxWidth: '560px' }}
              >
                Representing the highest standards of brokerage excellence across Sri Lanka&apos;s tea, rubber, coconut and spices auctions.
              </motion.p>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-5 border-y border-white/15 py-5 sm:grid-cols-4">
                {credibility.map(([value, label]) => (
                  <div key={label} className="border-l border-amber-300/60 pl-3 first:border-l-0 first:pl-0 sm:first:border-l sm:first:pl-3">
                    <p className="text-base font-bold text-white sm:text-lg">{value}</p>
                    <p className="mt-0.5 text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] text-white/55 sm:text-[10px]">{label}</p>
                  </div>
                ))}
              </div>

              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col gap-4 sm:flex-row cba-hero-buttons"
              >
                <MagneticButton strength={15} className="w-full sm:w-auto">
                  <Link
                    href="/resources"
                    className="relative inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-[var(--cba-gold)] px-8 text-sm font-bold text-slate-950 shadow-[0_16px_40px_rgba(201,162,39,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(201,162,39,0.35)] sm:w-auto"
                  >
                    View Auction Calendar
                    <span aria-hidden>→</span>
                  </Link>
                </MagneticButton>

                <MagneticButton strength={15} className="w-full sm:w-auto">
                  <Link
                    href="/about"
                    className="relative inline-flex h-[56px] w-full items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-slate-950 sm:w-auto"
                  >
                    About CBA
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </div>

          <div className="relative flex items-center justify-end lg:col-span-6">
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="cba-hero-right-card group w-full max-w-[520px]"
            >
              <div className="relative w-full p-7 sm:p-10 lg:p-12">
                <div className="relative pt-2">
                  <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-amber-400 to-amber-200" /></div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300">Premium Auction Insights</p>
                  <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Modern brokerage, delivered with authority.</h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-slate-200">Quick access to market updates, sales schedules and member resources for institutional trading professionals.</p>

                  <div className="mt-7 rounded-2xl border border-white/15 bg-slate-950/25 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Next scheduled auction</p>
                        <p className="mt-2 font-semibold text-white">{nextAuction?.title || 'View the upcoming auction calendar'}</p>
                      </div>
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]" />
                    </div>
                    {nextAuction && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                        <span className="rounded-full bg-white/10 px-3 py-1.5">{nextAuction.date}</span>
                        {nextAuction.saleNo && <span className="rounded-full bg-white/10 px-3 py-1.5">{nextAuction.saleNo}</span>}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-sm">
                    <Link href="/resources" className="inline-flex items-center gap-3 font-bold text-amber-300 transition hover:gap-4 hover:text-amber-200">Explore Resources <span aria-hidden>→</span></Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-slate-950/55 to-transparent" />
      <div aria-hidden className="absolute bottom-0 left-1/2 z-20 hidden h-20 w-px -translate-x-1/2 bg-gradient-to-b from-amber-300/20 to-amber-300 lg:block" />
      {/* Scroll mouse indicator (desktop only) */}
      <ScrollMouse />
    </section>
  );
}
