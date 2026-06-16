'use client'

import { useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useMouseTilt } from '@/hooks/useMouseTilt'
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

function GalleryImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Odd images go up, even go down
  const direction = index % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [`${direction * 40}px`, `${direction * -40}px`]);

  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useMouseTilt(6);
  const isDesktop = useIsDesktop();

  return (
    <motion.button
      ref={ref}
      style={{ y: isDesktop ? y : 0 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative overflow-hidden rounded-[1.5rem] aspect-square bg-gray-100 shadow-sm hover:-translate-y-1 transition-transform duration-300 animate-fade-in-scale parallax-container cba-gallery-protected"
    >
      <motion.img
        src={src}
        style={{
          rotateX, rotateY,
          width: '100%',
          borderRadius: '1.5rem',
          display: 'block',
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
      <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-[var(--maroon)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h6v6" />
          <path d="M21 3l-7 7" />
          <path d="M9 21H3v-6" />
          <path d="M3 21l7-7" />
        </svg>
      </span>
    </motion.button>
  );
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <p className="text-gray-500 italic">
            No gallery items yet. Photos from upcoming events will appear here.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* FILTERS */}
      <section className="sticky top-[72px] z-20 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          {albumTitles.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-transform duration-300 ${
                active === t
                  ? 'bg-[var(--maroon)] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:-translate-y-0.5'
              } animate-fade-in-scale`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white min-h-[460px]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          {filteredAlbums.map((album) => {
            const startIdx = flatImages.findIndex(
              (f) => f.album._id === album._id
            )
            return (
              <div key={album._id} className="rounded-[2rem] border border-gray-200 bg-white shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {album.eventTitle || 'Untitled'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(album.date)}
                      {album.images?.length
                        ? ` · ${album.images.length} photos`
                        : ''}
                    </p>
                    {album.description && (
                      <p className="text-sm text-gray-600 mt-3 max-w-2xl">
                        {album.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {(album.images || []).map((img: any, i: number) => (
                    <GalleryImage
                      key={i}
                      src={urlFor(img).width(600).url()}
                      index={startIdx + i}
                      onClick={() => setIndex(startIdx + i)}
                    />
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
