'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredGridProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  cols?: 1 | 2 | 3 | 4
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as any
    }
  }
}

export default function StaggeredGrid({
  children,
  className = '',
  staggerDelay = 0.1,
  cols = 1
}: StaggeredGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <motion.div
      className={`grid ${gridCols[cols]} gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          style={{ transitionDelay: `${index * staggerDelay}s` }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
