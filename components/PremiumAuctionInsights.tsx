'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type AuctionEvent = {
  title?: string
  start_date?: string | null
  sale_no?: string
}

export default function PremiumAuctionInsights({ nextEvent }: { nextEvent?: AuctionEvent }) {
  const hasEvent = nextEvent?.title && nextEvent?.start_date

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.6,
      },
    }),
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-full"
    >
      {/* CARD CONTAINER WITH PREMIUM GLASS EFFECT */}
      <div className="relative h-full rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.3)] overflow-hidden group">
        
        {/* Logo Watermark - Premium Placement */}
        <div className="absolute -top-20 -right-20 w-48 h-48 opacity-8 group-hover:opacity-12 transition-opacity duration-500">
          <Image
            src="/logo.png"
            alt="CBA seal watermark"
            fill
            className="object-contain"
            sizes="192px"
          />
        </div>

        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(201, 162, 39, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(201, 162, 39, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(201, 162, 39, 0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
          
          {/* TOP SECTION - Header with Gold accent */}
          <div>
            {/* Golden line accent */}
            <motion.div
              variants={contentVariants}
              custom={0}
              className="w-16 h-1 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full mb-4"
              aria-hidden
            />

            {/* Premium Label */}
            <motion.div
              variants={contentVariants}
              custom={1}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-300">
                Premium Auction Insights
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={contentVariants}
              custom={2}
              className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3"
            >
              Modern brokering,<br />delivered with authority.
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={contentVariants}
              custom={3}
              className="text-sm text-white/75 leading-relaxed mb-6"
            >
              Quick access to market updates, sales schedules and member resources for institutional trading professionals.
            </motion.p>
          </div>

          {/* MIDDLE SECTION - Auction Details Card */}
          {hasEvent && (
            <motion.div
              variants={contentVariants}
              custom={4}
              className="relative"
            >
              <div className="rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm p-4 sm:p-5">
                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                </div>

                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/50 mb-2 block">
                  Next Scheduled Auction
                </span>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {nextEvent.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-semibold text-white/70">📅</span>
                    <span className="text-xs font-medium text-white">
                      {formatDate(nextEvent.start_date)}
                    </span>
                  </div>
                  
                  {nextEvent.sale_no && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                      <span className="text-xs font-semibold text-white/70">📊</span>
                      <span className="text-xs font-medium text-white">
                        Sale {nextEvent.sale_no}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* BOTTOM SECTION - CTA Link */}
          <motion.div
            variants={contentVariants}
            custom={5}
          >
            <Link
              href="/resources"
              className="group/link inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors duration-300"
            >
              <span>Explore Resources</span>
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Premium border glow effect on hover */}
        <motion.div
          whileHover={{
            boxShadow: [
              '0 0 0 0 rgba(201, 162, 39, 0.1)',
              '0 0 0 20px rgba(201, 162, 39, 0)',
            ]
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          aria-hidden
        />
      </div>
    </motion.div>
  )
}
