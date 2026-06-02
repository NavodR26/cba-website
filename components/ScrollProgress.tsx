'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="cba-scroll-progress fixed top-0 left-0 right-0 z-[9999] pointer-events-none overflow-hidden">
      <motion.div
        className="cba-scroll-progress__fill h-full w-full origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}
