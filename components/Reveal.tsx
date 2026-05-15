'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  delay?: number // ms
  duration?: number // ms (visual only — animation duration is fixed in CSS)
  distance?: number // px — initial offset
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  threshold?: number // 0-1, percentage of element visible before triggering
}

/**
 * CSS-based reveal animation with IntersectionObserver.
 * Triggers when element comes into view during scroll.
 * Respects prefers-reduced-motion via globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  duration,
  distance = 24,
  direction = 'up',
  className = '',
  as = 'div',
  threshold = 0.1,
}: Props) {
  const Tag = as as any
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [threshold])

  const offset = (() => {
    if (direction === 'none') return '0,0,0'
    if (direction === 'up') return `0, ${distance}px, 0`
    if (direction === 'down') return `0, ${-distance}px, 0`
    if (direction === 'left') return `${distance}px, 0, 0`
    return `${-distance}px, 0, 0`
  })()

  const style: React.CSSProperties = {
    animationDelay: isVisible ? `${delay}ms` : '0ms',
    // expose start offset to CSS via custom property
    ['--reveal-from' as any]: `translate3d(${offset})`,
    ...(duration ? { animationDuration: `${duration}ms` } : {}),
  }

  return (
    <Tag 
      ref={ref} 
      className={`cba-reveal ${isVisible ? 'cba-reveal-visible' : ''} ${className}`} 
      style={style}
    >
      {children}
    </Tag>
  )
}
