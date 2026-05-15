'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  depth?: boolean
}

export default function SectionReveal({
  children,
  className = '',
  threshold = 0.15,
  delay = 0,
  depth = true,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  if (shouldReduceMotion) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0.3,
        y: -20,
        scale: 0.98,
      }}
      viewport={{ once: true, amount: threshold, margin: '-50px' }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay / 1000,
      }}
      style={{
        perspective: depth ? '1000px' : undefined,
        transformStyle: depth ? 'preserve-3d' : undefined,
      }}
    >
      {children}
    </motion.div>
  )
}
