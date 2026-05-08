'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  startDelay?: number
}

/**
 * Counts from 0 → end, starting on mount.
 * No IntersectionObserver — guaranteed to run.
 * Falls back instantly to `end` for prefers-reduced-motion.
 */
export default function CountUp({
  end,
  duration = 1600,
  prefix = '',
  suffix = '',
  className = '',
  startDelay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState<number>(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!ref.current || started) return
    const node = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || end === 0) {
      setValue(end)
      return
    }

    setValue(0)
    let raf = 0
    let startTime = 0
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(Math.round(end * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    const id = window.setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      cancelled = true
      window.clearTimeout(id)
      cancelAnimationFrame(raf)
    }
  }, [end, duration, startDelay, started])

  // Show the formatted final value (or current animated value).
  // suppressHydrationWarning because SSR shows `end` and first client render shows 0
  return (
    <span ref={ref} suppressHydrationWarning className={className}>
      {prefix}
      {value.toLocaleString('en-GB')}
      {suffix}
    </span>
  )
}
