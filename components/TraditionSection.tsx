'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMouseTilt } from '@/hooks/useMouseTilt'
import { useIsDesktop } from '@/hooks/useIsDesktop'

/**
 * "Tradition & Symbols" section.
 * If /cba-gavel.png and /cba-tie.png are saved to public/, they are used.
 * Otherwise a tasteful placeholder shows instead.
 */
export default function TraditionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Gavel drifts UP as you scroll down (opposite direction)
  const gavelY = useTransform(scrollYProgress, [0, 1], ['60px', '-60px']);
  // Tie drifts DOWN — opposing motion = sense of depth
  const tieY = useTransform(scrollYProgress, [0, 1], ['-40px', '40px']);

  const isDesktop = useIsDesktop();

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900 parallax-container">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
            Tradition &amp; Symbols
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Crafted by tradition, defined by the gavel
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Symbols carry memory. The CBA gavel, our crest and our colours stand for
            over a century of fair, transparent auctioning in Sri Lanka.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div style={{ y: isDesktop ? gavelY : 0 }}>
            <ArtefactCard
              src="/cba-gavel.png"
              label="The Auction Gavel"
              title="The Sound of a Fair Trade"
              text="Encased in glass and engraved with the CBA crest, the gavel marks every sale closed under the watch of the Association — a symbol of authority that has carried the colombo auction floor for generations."
              tone="light"
            />
          </motion.div>
          <motion.div style={{ y: isDesktop ? tieY : 0 }}>
            <ArtefactCard
              src="/cba-tie.png"
              label="CBA Regalia"
              title="Worn at every official occasion"
              text="The CBA necktie — maroon, woven with the gavel motif and the Association's 1904 crest — is presented to members and worn at committee meetings, AGMs and auction events as a mark of tradition."
              tone="maroon"
            />
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[var(--maroon)] text-white font-semibold hover:opacity-90 transition"
          >
            Read our story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ArtefactCard({
  src,
  label,
  title,
  text,
  tone,
}: {
  src: string
  label: string
  title: string
  text: string
  tone: 'light' | 'maroon'
}) {
  const [errored, setErrored] = useState(false)
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useMouseTilt(6);

  const bg =
    tone === 'maroon'
      ? 'bg-gradient-to-br from-[var(--maroon)]/5 to-white dark:from-[var(--maroon)]/20 dark:to-neutral-900'
      : 'bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900'

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className={`aspect-[4/3] flex items-center justify-center p-8 ${bg}`}>
        {errored ? (
          <div className="text-center text-gray-400 dark:text-gray-500">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="mt-3 text-xs italic">
              Save{' '}
              <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-neutral-800 rounded text-[10px]">
                public{src}
              </code>{' '}
              to display
            </p>
          </div>
        ) : (
          <motion.img
            src={src}
            alt={title}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              rotateX, rotateY,
              width: '100%',
              filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.5))',
            }}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
          />
        )}
      </div>
      <div className="p-7 border-t border-gray-100 dark:border-neutral-800">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--maroon)] dark:text-amber-300 font-bold">
          {label}
        </span>
        <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {text}
        </p>
      </div>
    </article>
  )
}
