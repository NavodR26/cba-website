'use client'

import { useEffect } from 'react'

export default function ProtectCopy() {
  useEffect(() => {
    const onCopy = (event: ClipboardEvent) => {
      event.preventDefault()
    }

    const onCut = (event: ClipboardEvent) => {
      event.preventDefault()
    }

    const onDragStart = (event: DragEvent) => {
      event.preventDefault()
    }

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault()
    }

    document.addEventListener('copy', onCopy)
    document.addEventListener('cut', onCut)
    document.addEventListener('dragstart', onDragStart)
    document.addEventListener('contextmenu', onContextMenu)

    return () => {
      document.removeEventListener('copy', onCopy)
      document.removeEventListener('cut', onCut)
      document.removeEventListener('dragstart', onDragStart)
      document.removeEventListener('contextmenu', onContextMenu)
    }
  }, [])

  return null}