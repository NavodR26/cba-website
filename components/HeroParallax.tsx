'use client';
import { motion, useTransform } from 'framer-motion';
import { useScrollParallax } from '@/hooks/useParallax';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export function HeroParallax() {
  const { ref: heroRef, y: skylineY, scrollYProgress } = useScrollParallax(0.3);

  return (
    <section ref={heroRef} className="relative min-h-[75vh] w-full flex items-start pt-20 pb-8 overflow-hidden sm:pt-24 lg:pt-28 lg:pb-12">
      {/* Full background image with enhanced parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: skylineY }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/hero.png"
          alt="Colombo skyline"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-[#7a1f2a]/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dot grid on left */}
      <div className="hidden lg:block absolute left-0 top-0 h-full w-[60%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]" />

      {/* Grid layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left side */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-slate-950/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider w-fit shadow-[0_0_18px_rgba(0,0,0,0.25)] backdrop-blur-sm"
          >
            <motion.span
              className="text-amber-300"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              •
            </motion.span>
            <span className="text-white">Established 1904</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.4rem)' }}
          >
            The Colombo Brokers'
            <br />
            <motion.span
              className="text-[#C9A227]"
              animate={{ 
                textShadow: ['0 0 20px rgba(201, 162, 39, 0.3)', '0 0 40px rgba(201, 162, 39, 0.6)', '0 0 20px rgba(201, 162, 39, 0.3)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Association
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-white/70 max-w-[30rem] leading-relaxed text-lg"
          >
            The apex body representing brokers across Sri Lanka's tea, rubber, coconut and spices auction industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex gap-4"
          >
            <MagneticButton strength={15}>
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-full bg-[#7a1f2a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6a1a23] shadow-lg hover:shadow-xl"
              >
                View Calendar
              </Link>
            </MagneticButton>
            <MagneticButton strength={15}>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/50 backdrop-blur-sm"
              >
                About CBA
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right side - empty for spacing */}
        <div className="lg:col-span-4"></div>
      </div>
    </section>
  );
}