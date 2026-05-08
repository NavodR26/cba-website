'use client'

import Link from 'next/link'
import { useState } from 'react'

/**
 * Premium feature strip below the hero.
 * Left:  CBA gavel image (/cba-gavel.png) + caption
 * Right: 3 short value props (Authority · Heritage · Transparency)
 *
 * No nav-link duplication — that's the navbar's job.
 */
export default function HeritageStrip() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
      <div className="max-w-[1400px] mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-neutral-800 overflow-hidden">
        <div className="grid lg:grid-cols-5 items-stretch">
          <GavelPanel />

          <div className="lg:col-span-3 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-neutral-800">
            <Pillar
              title="Authority"
              text="The apex body for tea, rubber, coconut & spices auctions in Sri Lanka."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                  <path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" />
                </svg>
              }
            />
            <Pillar
              title="Heritage"
              text="120+ years of professional excellence and industry leadership."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.5 13l2 8-5.5-3-5.5 3 2-8" />
                </svg>
              }
            />
            <Pillar
              title="Transparency"
              text="Independent broker oversight ensuring fair market practices."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                </svg>
              }
              cta={{ label: 'Learn more', href: '/about' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function GavelPanel() {
  const [errored, setErrored] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  return (
    <div
      className="lg:col-span-2 relative bg-gradient-to-br from-[var(--maroon)] to-[#4a1119] flex items-center justify-center p-8 min-h-[280px]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        const rotateY = (px - 0.5) * 14
        const rotateX = (0.5 - py) * 12
        setTilt({ x: rotateX, y: rotateY })
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: '900px' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]"
      />
      <div
        className="relative text-center text-white w-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {errored ? (
          <FallbackGavel />
        ) : (
          <img
            src="/cba-gavel.png"
            alt="CBA ceremonial gavel"
            className="mx-auto object-contain drop-shadow-2xl max-h-[200px] md:max-h-[240px] cba-gavel-3d"
            onError={() => setErrored(true)}
          />
        )}
        <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-amber-300/90 font-semibold">
          The Symbol of CBA
        </p>
        <p className="mt-1 text-sm text-white/85 max-w-xs mx-auto">
          The auction gavel — emblem of fairness, authority and tradition since 1904.
        </p>
      </div>
    </div>
  )
}

function FallbackGavel() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-40 md:w-48 mx-auto drop-shadow-2xl"
      aria-label="CBA gavel"
    >
      <defs>
        <linearGradient id="gavelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect x="50" y="60" width="70" height="40" rx="6" fill="url(#gavelGrad)" />
      <rect x="118" y="76" width="55" height="8" rx="3" fill="url(#gavelGrad)" />
      <rect x="55" y="115" width="60" height="14" rx="3" fill="#7c2d12" />
    </svg>
  )
}

function Pillar({
  title,
  text,
  icon,
  cta,
}: {
  title: string
  text: string
  icon: React.ReactNode
  cta?: { label: string; href: string }
}) {
  return (
    <div className="p-7 flex flex-col">
      <div className="w-10 h-10 rounded-lg bg-[var(--maroon)]/10 text-[var(--maroon)] dark:text-amber-300 flex items-center justify-center mb-3">
        <div className="w-5 h-5">{icon}</div>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
        {text}
      </p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--maroon)] dark:text-amber-300 hover:underline"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  )
}
