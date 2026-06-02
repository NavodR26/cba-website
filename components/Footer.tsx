'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const QUICK = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About CBA' },
  { href: '/members#committee', label: 'Committee' },
  { href: '/members#brokers', label: 'Brokers' },
  { href: '/events', label: 'Calendar' },
  { href: '/gallery', label: 'Gallery' },
]

const RESOURCES = [
  { href: '/events', label: 'Auction Calendar' },
  { href: '/#announcements', label: 'Circulars & Notices' },
  { href: '/#announcements', label: 'Downloads' },
  { href: '/contact', label: 'Important Links' },
]

function SocialIcon({ kind }: { kind: 'fb' | 'in' | 'yt' | 'mail' }) {
  const common = 'w-4 h-4'
  switch (kind) {
    case 'fb':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.3-1.5 1.6-1.5H16V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.4-3.7 3.9v2.5H7.5V14H10v8h3z" />
        </svg>
      )
    case 'in':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.2 22h3.6V8H1.2v14zM8.4 8h3.4v2h.05c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.5 4.4 5.7V22h-3.6v-6.4c0-1.5 0-3.5-2.1-3.5-2.2 0-2.5 1.7-2.5 3.4V22H8.4V8z" />
        </svg>
      )
    case 'yt':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M23 7.6s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C16.4 4 12 4 12 4s-4.4 0-7.9.3c-.5.1-1.4.1-2.2 1-.7.7-.9 2.3-.9 2.3S.8 9.5.8 11.4v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s4.4 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V8.5l5.7 3.2-5.7 3.2z" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
  }
}

export default function Footer() {
  const colVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    }),
  };

  const logoVariants = {
    hidden: { scale: 0.88 },
    visible: {
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-[var(--maroon)] via-[#5a1828] to-[var(--maroon)] text-gray-300 relative overflow-hidden">
      {/* Top accent line with animation */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 animate-shimmer" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-300/5 rounded-full blur-3xl animate-float-particle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--maroon)]/10 rounded-full blur-3xl animate-float-particle" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-12 gap-10">
        {/* BRAND */}
        <motion.div
          custom={0}
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <motion.div
            variants={logoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-5 group"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-white/10 border border-white/10 p-1.5 hover-scale">
              <Image
                src="/logo.png"
                alt="CBA"
                fill
                className="object-contain group-hover:rotate-12 transition-transform duration-300"
                sizes="96px"
              />
            </div>
            <div>
              <p className="font-bold text-white text-xl sm:text-2xl leading-tight transition-all duration-300 group-hover:text-amber-300">
                The Colombo Brokers&rsquo;
                <br />
                Association
              </p>
              <p className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-amber-300/80 group-hover:text-amber-300 transition-colors duration-300">
                Established 1904
              </p>
            </div>
          </motion.div>

          <p className="text-sm leading-relaxed text-gray-400 max-w-sm hover-lift">
            The Colombo Brokers&rsquo; Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.
          </p>

          <div className="flex items-center gap-2 mt-6">
            {(['fb', 'in', 'yt', 'mail'] as const).map((k, i) => (
              <a
                key={k}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[var(--maroon)] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover-scale group"
                aria-label={k}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <SocialIcon kind={k} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          custom={1}
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 hover:text-gradient transition-all duration-300">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {QUICK.map((l, i) => (
              <li key={l.label} className="animate-fade-in-scale" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <Link
                  href={l.href}
                  className="text-gray-400 hover:text-amber-300 transition-all duration-300 hover-lift group relative"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RESOURCES */}
        <motion.div
          custom={2}
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 hover:text-gradient transition-all duration-300">
            Resources
          </h3>
          <ul className="space-y-2.5 text-sm">
            {RESOURCES.map((l, i) => (
              <li key={l.label} className="animate-fade-in-scale" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                <Link
                  href={l.href}
                  className="text-gray-400 hover:text-amber-300 transition-all duration-300 hover-lift group relative"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          custom={3}
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 hover:text-gradient transition-all duration-300">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2 hover-lift group">
              <svg className="w-4 h-4 mt-0.5 text-amber-300/80 shrink-0 group-hover:text-amber-300 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="group-hover:text-gray-300 transition-colors duration-300">
                No. 52, 2nd Floor,
                <br />
                Navam Mawatha,
                <br />
                Colombo 02, Sri Lanka
              </span>
            </li>
            <li className="flex items-center gap-2 hover-lift group">
              <svg className="w-4 h-4 text-amber-300/80 group-hover:text-amber-300 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <a href="tel:+94112241387" className="hover:text-amber-300 transition-colors duration-300 hover-scale">
                +94 11 224 1387
              </a>
            </li>
            <li className="flex items-center gap-2 hover-lift group">
              <div className="hover-scale">
                <SocialIcon kind="mail" />
              </div>
              <a href="mailto:info@cba.lk" className="hover:text-amber-300 transition-colors duration-300 hover-scale">
                info@cba.lk
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 animate-fade-in-scale" style={{ animationDelay: '0.8s' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center md:text-left hover:text-gray-400 transition-colors duration-300">
            © {new Date().getFullYear()} The Colombo Brokers&rsquo; Association. All Rights Reserved.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
            <div className="flex items-center gap-5">
              <Link href="/contact" className="hover:text-amber-300 transition-colors duration-300 hover-lift">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-amber-300 transition-colors duration-300 hover-lift">Terms of Use</Link>
            </div>
            <div className="hidden md:block w-px h-3 bg-white/15" />
            <p className="text-[11px] text-gray-500 hover:text-gray-400 transition-colors duration-300">
              Powered by{' '}
              <a
                href="https://cenq.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gray-400 hover:text-amber-300 transition-colors duration-300 hover-scale"
              >
                CENQ TECHNOLOGIES
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
