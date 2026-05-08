'use client'

type Props = {
  children: React.ReactNode
  delay?: number // ms
  duration?: number // ms (visual only — animation duration is fixed in CSS)
  distance?: number // px — initial offset
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * Lightweight CSS-based reveal animation.
 * Runs on mount — guaranteed to display content (no IntersectionObserver).
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
}: Props) {
  const Tag = as as any

  const offset = (() => {
    if (direction === 'none') return '0,0,0'
    if (direction === 'up') return `0, ${distance}px, 0`
    if (direction === 'down') return `0, ${-distance}px, 0`
    if (direction === 'left') return `${distance}px, 0, 0`
    return `${-distance}px, 0, 0`
  })()

  const style: React.CSSProperties = {
    animationDelay: `${delay}ms`,
    // expose start offset to CSS via custom property
    ['--reveal-from' as any]: `translate3d(${offset})`,
    ...(duration ? { animationDuration: `${duration}ms` } : {}),
  }

  return (
    <Tag className={`cba-reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}
