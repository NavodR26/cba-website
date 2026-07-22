'use client'

import Image from 'next/image'

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
                <p className="mt-6 text-lg text-[#6F6F6F] max-w-2xl">Our ceremonies and auction practices have been at the heart of Sri Lanka&apos;s commodity trade for over a century. We continue to steward markets with professional rigor and institutional integrity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
