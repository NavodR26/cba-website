'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useMouseTilt } from '@/hooks/useMouseTilt';
import { useMouseParallax } from '@/hooks/useParallax';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const cards = [
  {
    title: 'Authority',
    text: 'Every auction begins and ends with the CBA gavel, a quiet reminder that every price is set through fair market authority and transparent bidding.',
  },
  {
    title: 'Heritage',
    text: 'More than a tool, the gavel is a ceremonial link to a century of Sri Lanka’s tea auction heritage and the traditions we uphold.',
  },
  {
    title: 'Transparency',
    text: 'The gavel embodies the open, accountable auction process that members and buyers trust across every lot and every sale.',
  },
];

export default function GavelSymbolSection() {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useMouseTilt(8);
  const { x: driftX, y: driftY, onMouseMove: onDriftMove, onMouseLeave: onDriftLeave } = useMouseParallax(10);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isDesktop = useIsDesktop();

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-[0.3em]">
            Symbolic Motion
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            The Gavel in Motion
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A ceremonial emblem elevated by subtle motion, reinforcing the authority, heritage and trust of the Colombo Brokers&rsquo; Association.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            whileHover={isDesktop ? { y: -4 } : undefined}
            className="parallax-container"
          >
            <motion.div
              onMouseMove={isDesktop ? onDriftMove : undefined}
              onMouseLeave={isDesktop ? onDriftLeave : undefined}
              style={{ x: driftX, y: driftY, perspective: 900 }}
              className="will-change-transform"
            >
              <motion.div
                onMouseMove={isDesktop ? onMouseMove : undefined}
                onMouseLeave={isDesktop ? onMouseLeave : undefined}
                style={{ rotateX, rotateY, perspective: 800, transformStyle: 'preserve-3d' }}
                whileHover={isDesktop ? { scale: 1.045 } : undefined}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative inline-block rounded-[2rem] border border-gray-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-hidden"
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                  </div>
                )}
                <motion.img
                  src="/cba-gavel.png"
                  alt="CBA ceremonial gavel"
                  onLoad={handleImageLoad}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-[380px] object-contain"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.22))' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6"
          >
            {cards.map((item, index) => (
              <motion.article
                key={item.title}
                custom={index}
                variants={cardVariants}
                className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-7 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
