'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'

interface PersonCardProps {
  item: any
  featured?: boolean
  chairmanData?: any
}

export default function PersonCard({ item, featured = false, chairmanData }: PersonCardProps) {
  const isChairman =
    (item.role || '').toLowerCase().includes('chairman') &&
    !(item.role || '').toLowerCase().includes('deputy') &&
    !(item.role || '').toLowerCase().includes('vice')
  const message = isChairman ? chairmanData?.message : undefined
  const [isMessageOpen, setIsMessageOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMessageOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <article
        className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl ${
          isChairman
            ? 'border-[var(--maroon)] ring-1 ring-[var(--maroon)]/20 shadow-md'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className={`relative shrink-0 overflow-hidden rounded-lg bg-gray-50 ${featured ? 'aspect-[4/3]' : 'aspect-square'}`}>
          {item.photo ? (
            <img
              src={urlFor(item.photo).width(400).height(featured ? 300 : 400).url()}
              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
              alt={item.name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-4xl font-bold text-gray-200">
              {item.name?.charAt(0) || '?'}
            </div>
          )}
          {item.role && (
            <div className="absolute left-2 top-2 z-10">
              <span className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${isChairman ? 'bg-[var(--maroon)] text-white' : 'border border-gray-100 bg-white/95 text-gray-700'}`}>
                {item.role}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-col px-1 text-center">
          <h3 className={`font-bold leading-tight text-gray-900 ${featured ? 'text-lg' : 'text-base'}`}>{item.name}</h3>
          {item.company && <p className="mt-1.5 line-clamp-2 text-xs text-gray-500">{item.company}</p>}
        </div>

        {message && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-3 border-t border-white/30 bg-gradient-to-t from-[var(--maroon)] via-[var(--maroon)]/95 to-[var(--maroon)]/70 p-5 pt-10 text-white opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200">
              <QuoteIcon /> Chairman&apos;s message
            </div>
            <p className="line-clamp-3 text-sm leading-relaxed text-white/90">{message}</p>
            <button
              type="button"
              onClick={() => setIsMessageOpen(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[var(--maroon)] shadow-sm transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--maroon)]"
              aria-label={`Read the full message from ${item.name}`}
            >
              Read full message <ArrowIcon />
            </button>
          </div>
        )}
      </article>

      <AnimatePresence>
        {isMessageOpen && message && (
          <MessageDialog name={item.name} message={message} onClose={() => setIsMessageOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

function MessageDialog({ name, message, onClose }: { name: string; message: string; onClose: () => void }) {
  return createPortal(
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-sm" onClick={onClose} aria-label="Close chairman's message" />
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="chairman-message-title"
        className="relative max-h-[min(42rem,calc(100vh-2rem))] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}
      >
        <div className="bg-gradient-to-r from-[var(--maroon)] to-[#a33a42] px-6 py-6 text-white sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div><div className="mb-2 text-amber-200"><QuoteIcon /></div><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">A note from</p><h2 id="chairman-message-title" className="mt-1 text-xl font-bold">{name}</h2></div>
            <button type="button" onClick={onClose} className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close message"><CloseIcon /></button>
          </div>
        </div>
        <div className="max-h-[calc(100vh-15rem)] overflow-y-auto px-6 py-7 sm:px-8"><p className="whitespace-pre-line text-[15px] leading-8 text-slate-700">{message}</p></div>
      </motion.section>
    </motion.div>,
    document.body
  )
}

function QuoteIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.2 17.5c-1.8 0-3.2-1.4-3.2-3.2 0-1.4.7-2.6 1.9-3.1.1-2.8 1.5-4.7 4.1-5.7l.8 1.7c-1.7.7-2.5 1.8-2.6 3.2h.1c1.8 0 3.1 1.4 3.1 3.3s-1.4 3.2-3.2 3.2Zm8.5 0c-1.8 0-3.2-1.4-3.2-3.2 0-1.4.7-2.6 1.9-3.1.1-2.8 1.5-4.7 4.1-5.7l.8 1.7c-1.7.7-2.5 1.8-2.6 3.2h.1c1.8 0 3.1 1.4 3.1 3.3s-1.4 3.2-3.2 3.2Z" /></svg> }
function ArrowIcon() { return <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg> }
function CloseIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg> }
