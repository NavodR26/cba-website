'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollParallax } from '@/hooks/useParallax';
import TradeRoutes from './TradeRoutes';

const particles = [
  { left: '8%', top: '23%', size: 3, delay: 0 },
  { left: '18%', top: '72%', size: 2, delay: 1.4 },
  { left: '32%', top: '15%', size: 2, delay: 2.2 },
  { left: '69%', top: '19%', size: 3, delay: 0.7 },
  { left: '83%', top: '63%', size: 2, delay: 2.8 },
  { left: '92%', top: '34%', size: 2, delay: 1.8 },
  { left: '45%', top: '45%', size: 4, delay: 3.2 },
  { left: '55%', top: '35%', size: 2, delay: 0.5 },
];

export function HeroParallax() {
  const { ref: heroRef, y: skylineY } = useScrollParallax(0.3);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.02]);
  const contentY = useTransform(scrollY, [0, 700], [0, -54]);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden cba-hero-height cba-hero-mesh" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Dynamic background with animated parallax */}
      <motion.div
        className="absolute inset-0 hero-kenburns"
        style={{ y: skylineY, scale, opacity }}
        animate={{ scale: [1.01, 1.0, 1.01] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/hero.png"
          alt="Colombo skyline with tea auction center"
          fill
          className="object-cover object-[58%_center] sm:object-center"
          priority
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Refined gradient overlay - more subtle while maintaining readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/92 via-[#0d1528]/75 to-[#0f1a30]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/60 via-transparent to-transparent" />

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

      {/* Wide-screen ambient glows give the skyline depth at its outer edges. */}
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />

      {/* Light ambient particles add depth without competing with the message. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="hero-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.18, 0.72, 0.18], scale: [1, 1.35, 1] }}
            transition={{ duration: 5 + index * 0.45, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto grid min-h-[calc(var(--cba-hero-min-height)-var(--navbar-height))] w-full max-w-[1440px] items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-16 lg:py-16"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }} className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-amber-300 to-transparent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-200/90">Est. 1904</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8 }} className="font-serif text-[clamp(2.45rem,3.8vw,4.2rem)] leading-[0.98] tracking-[-0.04em] text-white lg:whitespace-nowrap">
            The Colombo Brokers&apos;<br />
            <span className="bg-gradient-to-r from-[#f7d572] via-[#e8c86a] to-[#c8a45d] bg-clip-text text-transparent animate-shimmer">Association</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7 }} className="mt-6 max-w-lg text-sm leading-6 text-white/85 sm:text-[15px] sm:leading-7 font-light">
            Representing the highest standards of broking excellence across Sri Lanka&apos;s <span className="text-amber-200/80 font-medium">Tea, Rubber, Coconut and Spices</span> auctions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-8">
            <Link href="/about" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#f5d276]/50 bg-gradient-to-r from-[#d4aa52] via-[#f1cf75] to-[#c9973f] bg-[length:200%_100%] px-6 py-3 text-[13px] font-bold tracking-[0.01em] text-[#122039] shadow-[0_12px_30px_rgba(217,175,87,0.32)] transition-all duration-300 hover:bg-[position:100%_0] hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(217,175,87,0.48)] focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#0a0f1a]">
              <span className="relative z-10">Discover CBA</span>
              <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.7 }} className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
              Licensed auction authority
            </span>
            <span className="text-amber-300/90">Sri Lanka &middot; Global markets</span>
          </motion.div>
        </div>

        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28, duration: 0.85 }} className="hidden justify-self-end lg:block">
          <div className="cba-heritage-card group relative w-[350px] overflow-hidden rounded-[28px] p-8 text-center">
            {/* Premium gradient overlay */}
            <motion.div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,220,139,0.15),transparent_60%)]" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 6, repeat: Infinity }} />
            <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1a]/30" />
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-400/20 via-transparent to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div className="relative mx-auto h-52 w-52" animate={{ y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/25 to-transparent blur-3xl" />
              <Image src="/logo.png" alt="Colombo Brokers' Association emblem" fill sizes="208px" className="relative z-10 object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]" />
            </motion.div>
            
            <h2 className="relative mt-6 font-serif text-[1.65rem] font-semibold text-white tracking-tight">Institutional Heritage</h2>
            <div className="relative mx-auto my-4 h-0.5 w-12 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            <p className="relative text-sm font-semibold text-amber-200/90 tracking-wide uppercase">Market stewardship</p>
            <p className="relative mt-6 text-[13px] leading-7 text-white/80 font-light">A recognised institution for transparent, well-governed commodity auctions.</p>
            
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/30 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400/30 rounded-br-lg" />
          </div>
        </motion.aside>
      </motion.div>

    </section>
  );
}
