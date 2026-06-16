'use client'

import { useEffect } from 'react'

export default function ProtectCopy() {
  useEffect(() => {
    // Disable right-click
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault()
    }

    // Disable text selection
    const onSelectStart = (event: Event) => {
      event.preventDefault()
    }

    // Disable copy
    const onCopy = (event: ClipboardEvent) => {
      event.preventDefault()
    }

    // Disable cut
    const onCut = (event: ClipboardEvent) => {
      event.preventDefault()
    }

    // Disable drag start (prevents image download via drag)
    const onDragStart = (event: DragEvent) => {
      event.preventDefault()
    }

    // Disable keyboard shortcuts for copy/cut
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === 'c' || event.key === 'x' || event.key === 'a' || event.key === 'u' || event.key === 's' || event.key === 'p')
      ) {
        event.preventDefault()
      }
    }

    // Disable F12 and other developer tools shortcuts
    const onF12 = (event: KeyboardEvent) => {
      if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault()
      }
    }

    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('selectstart', onSelectStart)
    document.addEventListener('copy', onCopy)
    document.addEventListener('cut', onCut)
    document.addEventListener('dragstart', onDragStart)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keydown', onF12)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('selectstart', onSelectStart)
      document.removeEventListener('copy', onCopy)
      document.removeEventListener('cut', onCut)
      document.removeEventListener('dragstart', onDragStart)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keydown', onF12)
    }
  }, [])

  return null
}
