'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollParallax } from '@/hooks/useParallax';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export function HeroParallax() {
  const { ref: heroRef, y: skylineY } = useScrollParallax(0.3);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Background with soft animated parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: skylineY }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src="/hero.png" alt="Colombo skyline" fill className="object-cover object-center" priority />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(249,168,37,0.12),transparent_18%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />

      <div className="absolute right-10 top-28 hidden xl:block w-72 h-72 rounded-full bg-[#7a1f2a]/20 blur-3xl" />
      <div className="absolute left-10 top-36 hidden lg:block w-36 h-36 rounded-full bg-amber-400/10 blur-2xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 py-24">
          <div className="lg:col-span-6 flex flex-col justify-center text-left lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/65 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(245,212,76,0.55)]" />
              Established 1904
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-serif font-black text-white leading-tight max-w-3xl"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 4.2rem)' }}
            >
              The Colombo Brokers&apos;
              <br />
              <motion.span
                className="text-[#C9A227]"
                animate={{
                  textShadow: ['0 0 18px rgba(201, 162, 39, 0.18)', '0 0 34px rgba(201, 162, 39, 0.45)', '0 0 18px rgba(201, 162, 39, 0.18)'],
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                Association
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Representing the highest standard of brokerage excellence across Sri Lanka&apos;s tea, rubber, coconut and spices auction industries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton strength={15}>
                <Link
                  href="/resources"
                  className="relative inline-flex items-center justify-center rounded-full bg-[var(--maroon)] px-7 py-3 text-sm font-semibold text-white transition duration-300 shadow-lg shadow-[0_18px_70px_rgba(122,31,42,0.35)] hover:-translate-y-0.5 hover:bg-[#6d1624] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                >
                  View Calendar
                </Link>
              </MagneticButton>

              <MagneticButton strength={15}>
                <Link
                  href="/about"
                  className="relative inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/50 hover:bg-white/15"
                >
                  About CBA
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-end relative">
            <div className="w-full max-w-[32rem] rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.22)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(201,169,110,0.14),transparent_20%)] pointer-events-none" />
              <div className="relative w-full p-6 sm:p-8">
                <div className="absolute -left-16 top-8 h-24 w-24 rounded-full border border-white/20 bg-white/10 blur-2xl" />
                <div className="absolute -right-12 bottom-10 h-24 w-24 rounded-full border border-amber-300/20 bg-amber-300/5 blur-2xl" />
                <div className="relative pt-10">
                  <div className="h-2 w-16 rounded-full bg-gradient-to-r from-amber-300 via-transparent to-transparent mb-6" />
                  <p className="font-medium text-white/80 uppercase tracking-[0.28em] text-xs mb-3">Premium Auction Insights</p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">Modern brokerage, delivered with authority.</h2>
                  <p className="mt-4 max-w-xs text-sm text-white/70">Quick access to market updates, sales schedules, and member resources for institutional trading professionals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
