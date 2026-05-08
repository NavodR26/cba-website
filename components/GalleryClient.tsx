'use client'

import { useMemo, useState } from 'react'
import { urlFor } from '@/lib/sanity'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

type GalleryDoc = {
  _id: string
  eventTitle?: string
  date?: string
  description?: string
  images?: any[]
}

function formatDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function GalleryClient({ albums }: { albums: GalleryDoc[] }) {
  const [active, setActive] = useState<string>('All')
  const [index, setIndex] = useState(-1)

  const filteredAlbums = useMemo(() => {
    if (active === 'All') return albums
    return albums.filter((a) => (a.eventTitle || '') === active)
  }, [albums, active])

  const flatImages = useMemo(
    () =>
      filteredAlbums.flatMap((a) =>
        (a.images || []).map((img: any) => ({ img, album: a }))
      ),
    [filteredAlbums]
  )

  const slides = flatImages.map(({ img }) => ({
    src: urlFor(img).width(1600).url(),
  }))

  const albumTitles = useMemo(() => {
    const set = new Set<string>()
    albums.forEach((a) => a.eventTitle && set.add(a.eventTitle))
    return ['All', ...Array.from(set)]
  }, [albums])

  if (!albums || albums.length === 0) {
    return (
      <section className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 italic">
            No gallery items yet. Photos from upcoming events will appear here.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* FILTERS */}
      <section className="sticky top-[72px] z-20 bg-white/90 dark:bg-neutral-950/90 backdrop-blur border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          {albumTitles.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-transform duration-300 ${
                active === t
                  ? 'bg-[var(--maroon)] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 hover:-translate-y-0.5'
              } animate-fade-in-scale`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-900 min-h-[460px]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          {filteredAlbums.map((album) => {
            const startIdx = flatImages.findIndex(
              (f) => f.album._id === album._id
            )
            return (
              <div key={album._id}>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {album.eventTitle || 'Untitled'}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {formatDate(album.date)}
                      {album.images?.length
                        ? ` · ${album.images.length} photos`
                        : ''}
                    </p>
                    {album.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                        {album.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {(album.images || []).map((img: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setIndex(startIdx + i)}
                      className="group relative overflow-hidden rounded-xl aspect-square bg-gray-200 dark:bg-neutral-800 shadow-sm hover:-translate-y-1 transition-transform duration-300 animate-fade-in-scale"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <img
                        src={urlFor(img).width(600).url()}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                      <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-[var(--maroon)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6" />
                          <path d="M9 21H3v-6" />
                          <path d="M21 3l-7 7" />
                          <path d="M3 21l7-7" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </>
  )
}
