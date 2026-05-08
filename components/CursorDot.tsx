'use client'

import { useEffect, useRef, useState } from 'react'

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [pop, setPop] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!coarse)
    if (coarse) return

    const move = (e: MouseEvent) => {
      if (!dotRef.current) return
      dotRef.current.style.left = `${e.clientX}px`
      dotRef.current.style.top = `${e.clientY}px`
    }

    const click = () => {
      setPop(false)
      window.requestAnimationFrame(() => setPop(true))
      window.setTimeout(() => setPop(false), 240)
    }

    const hide = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const show = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', click)
    window.addEventListener('mouseleave', hide)
    window.addEventListener('mouseenter', show)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', click)
      window.removeEventListener('mouseleave', hide)
      window.removeEventListener('mouseenter', show)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <div ref={dotRef} className={`cba-cursor-dot ${pop ? 'pop' : ''}`} />
}
