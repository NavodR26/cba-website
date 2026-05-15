'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { urlFor } from '@/lib/sanity'
import { useMouseTilt } from '@/hooks/useMouseTilt'
import { useIsDesktop } from '@/hooks/useIsDesktop'

interface ChairmanMessageProps {
  initialData?: {
    name: string
    message: string
    photo?: any
    designation: string
  }
}

export default function ChairmanMessage({ initialData }: ChairmanMessageProps) {
  const [data, setData] = useState<any>(initialData || null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);
  const textSlide = useTransform(scrollYProgress, [0, 0.5], ['30px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useMouseTilt(3);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (initialData) return

    async function fetchChairman() {
      try {
        const response = await fetch('/api/chairman', { cache: 'no-store' })
        if (!response.ok) throw new Error('Failed to load chairman data')
        const chairman = await response.json()
        setData(chairman)
      } catch (error) {
        console.warn('Failed to fetch chairman data:', error)
        setData({
          name: 'Mr. Chairman',
          message: "Welcome to the Colombo Brokers' Association. We continue to uphold the highest standards of integrity and professionalism in Sri Lanka's commodity trading industry.",
          photo: null,
          designation: 'Chairman, Colombo Brokers\' Association',
        })
      }
    }
    fetchChairman()
  }, [initialData])

  if (!data) return <div>Loading...</div>

  return (
    <section ref={sectionRef} className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 rounded-b-[3rem] bg-[var(--maroon)]/6 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-52 rounded-t-[3rem] bg-amber-200/6 blur-3xl"
      />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-[0.28em]">
            Chairman&rsquo;s Message
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900">
            From the Chairman&rsquo;s Desk
          </h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            A concise leadership statement with premium typographic balance and intentional spacing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(280px,1fr)_minmax(420px,1.35fr)] lg:items-center">
          <div className="mx-auto lg:mx-0 max-w-sm">
            <motion.div style={{ y: isDesktop ? photoY : 0 }}>
              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-100 shadow-[0_22px_70px_rgba(122,31,42,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/15 to-amber-200/15 blur-2xl opacity-90" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gray-100">
                  {data.photo ? (
                    <motion.img
                      src={urlFor(data.photo).width(720).url()}
                      alt={data.name}
                      onMouseMove={onMouseMove}
                      onMouseLeave={onMouseLeave}
                      style={{
                        rotateX, rotateY,
                        borderRadius: '2rem',
                        width: '100%',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.18))',
                      }}
                      className="w-full h-[320px] object-cover"
                    />
                  ) : (
                    <div className="flex h-[320px] items-center justify-center px-8 text-center text-gray-400">
                      <svg className="mx-auto h-20 w-20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ x: textSlide, opacity: textOpacity }}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[var(--maroon)]/10 text-[var(--maroon)] shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 8h10M7 12h6M7 16h10" />
                  </svg>
                </span>
                <span className="uppercase tracking-[0.28em] font-semibold text-[var(--maroon)]">
                  Trusted leadership
                </span>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-base leading-8 text-gray-700 italic tracking-wide">
                  {data.message}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-6">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{data.name}</p>
                  <p className="text-sm text-[var(--maroon)] font-semibold mt-1">{data.designation}</p>
                </div>

                <Link
                  href="/members#committee"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--maroon)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5d1928]"
                >
                  Meet the Committee
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
