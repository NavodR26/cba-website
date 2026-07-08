'use client'

import Image from 'next/image'
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
    <section className="px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-[linear-gradient(180deg,#fffaf6, #fbf7f2)] p-12 shadow-[0_30px_80px_rgba(16,24,32,0.06)] border border-[rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-[45%] flex items-center justify-center">
            <Image
              src="/cba-gavel-top.png"
              alt="auction gavel"
              width={420}
              height={240}
              className="max-w-[420px] w-full object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <div className="w-full lg:w-[55%]">
            <div className="relative">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/cba-gavel-top.png')`, backgroundSize: '40%', backgroundRepeat: 'no-repeat', backgroundPosition: '10% 10%', filter: 'grayscale(1)', transform: 'scale(1.02)' }} />
              <div className="relative p-6">
                <h3 className="text-sm font-semibold tracking-[0.18em] text-[var(--cba-maroon)] uppercase">The symbol of CBA</h3>
                <h2 className="mt-6 text-3xl lg:text-4xl font-serif font-semibold text-[#111827]">The auction gavel — emblem of fairness, authority and tradition since 1904</h2>
                <p className="mt-6 text-lg text-[#6F6F6F] max-w-2xl">Our ceremonies and auction practices have been at the heart of Sri Lanka's commodity trade for over a century. We continue to steward markets with professional rigor and institutional integrity.</p>
              </div>
            </div>
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
          <Image
            src="/cba-gavel.png"
            alt="CBA ceremonial gavel"
            width={320}
            height={260}
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
      <div className="w-10 h-10 rounded-lg bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center mb-3">
        <div className="w-5 h-5">{icon}</div>
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed flex-1">
        {text}
      </p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--maroon)] hover:underline"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  )
}
