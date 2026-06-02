'use client'

import { useEffect } from 'react'

const HIDE_AFTER = 96
const DELTA = 4
const TOP_EDGE = 92

export default function HeaderScrollController() {
  useEffect(() => {
    let lastY = window.scrollY || document.documentElement.scrollTop || 0
    let touchStartY = 0

    function currentY() {
      return window.scrollY || document.documentElement.scrollTop || 0
    }

    function showHeader() {
      document.body.classList.remove('cba-header-hidden')
    }

    function hideHeader() {
      if (currentY() > HIDE_AFTER) {
        document.body.classList.add('cba-header-hidden')
      }
    }

    function updateNearTop() {
      if (currentY() <= HIDE_AFTER) {
        document.body.classList.add('cba-header-near-top')
        showHeader()
      } else {
        document.body.classList.remove('cba-header-near-top')
      }
    }

    function onScroll() {
      const nextY = currentY()
      const delta = nextY - lastY

      updateNearTop()

      if (delta > DELTA) {
        hideHeader()
      } else if (delta < -DELTA) {
        showHeader()
      }

      lastY = nextY
    }

    function onWheel(event: WheelEvent) {
      updateNearTop()

      if (event.deltaY > DELTA) {
        hideHeader()
      } else if (event.deltaY < -DELTA) {
        showHeader()
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (event.clientY <= TOP_EDGE) showHeader()
    }

    function onKeyDown(event: KeyboardEvent) {
      if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) showHeader()
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) hideHeader()
    }

    function onTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0]?.clientY ?? 0
    }

    function onTouchMove(event: TouchEvent) {
      const nextTouchY = event.touches[0]?.clientY ?? touchStartY
      const delta = touchStartY - nextTouchY

      updateNearTop()

      if (delta > DELTA) {
        hideHeader()
      } else if (delta < -DELTA) {
        showHeader()
      }
    }

    updateNearTop()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      document.body.classList.remove('cba-header-hidden', 'cba-header-near-top')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return null
}
