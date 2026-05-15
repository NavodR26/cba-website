'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
}

export default function ParallaxImage({ src, alt, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Move the image down slightly as we scroll down to create parallax
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#111]">
      <motion.img
        style={{ y, opacity }}
        src={src}
        alt={alt}
        className={`w-full h-[120%] object-cover absolute top-0 -mt-[10%] scale-105 ${className}`}
      />
    </div>
  )
}
