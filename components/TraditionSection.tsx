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
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white parallax-container relative overflow-hidden">
      <div className="absolute -right-40 top-20 w-80 h-80 rounded-full bg-amber-300/5 blur-3xl" />
      <div className="absolute -left-32 bottom-0 w-72 h-72 rounded-full bg-[var(--maroon)]/5 blur-3xl" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-bold uppercase tracking-widest">
            Heritage
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Tradition Defined by the Gavel
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            The symbols, ceremonies and standards that bring institutional integrity to every auction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <motion.div style={{ y: isDesktop ? gavelY : 0 }}>
            <ArtefactCard
              src="/cba-gavel.png"
              label="The Auction Gavel"
              title="The Sound of Fair Trade"
              text="Encased in glass with the CBA crest, the gavel marks every sale closed under the Association's watch — a symbol of authority for generations."
              tone="light"
            />
          </motion.div>
          <motion.div style={{ y: isDesktop ? tieY : 0 }}>
            <ArtefactCard
              src="/cba-tie.png"
              label="CBA Regalia"
              title="Worn at Every Occasion"
              text="The CBA necktie — maroon and woven with the gavel motif — is worn at committee meetings, AGMs and auction events as a mark of institutional tradition."
              tone="maroon"
            />
          </motion.div>
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--maroon)] text-white font-semibold hover:bg-[var(--maroon)]/90 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Our Heritage
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
      ? 'bg-gradient-to-br from-[var(--maroon)]/5 to-white'
      : 'bg-gradient-to-br from-gray-50 to-white'

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className={`aspect-[4/3] flex items-center justify-center p-8 ${bg}`}>
        {errored ? (
          <div className="text-center text-gray-400">
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
              <code className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">
                public{src}
              </code>{' '}
              to display
            </p>
          </div>
        ) : (
          <motion.img
            src={src}
            alt={title}
            onError={() => setErrored(true)}
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
        <div className="p-7 border-t border-gray-100">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--maroon)] font-bold">
            {label}
          </span>
          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {text}
          </p>
        </div>
    </article>
  )
}

