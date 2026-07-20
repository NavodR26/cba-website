'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export default function ArchivalPhotoShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <section
      id="archives"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--maroon)]" />
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--maroon)]/10 to-[var(--maroon)]/5 text-[var(--maroon)] text-[11px] font-bold uppercase tracking-[0.2em] border border-[var(--maroon)]/20">
              Heritage Collection
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--maroon)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Archival Photographs
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
            A glimpse into our rich history spanning over a century of excellence
          </p>
        </div>

        <div className="relative">
          {/* Museum-style frame */}
          <div className="relative bg-white p-5 md:p-6 shadow-xl rounded-xl max-w-2xl mx-auto border border-gray-200/50">
            {/* Inner frame border */}
            <div className="border-2 border-gray-900/10 rounded-lg p-2">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="relative w-full text-left overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--maroon)] group"
                aria-label="Expand archival photograph"
              >
                <div className="relative bg-gray-100 rounded-lg" style={{ maxHeight: '400px' }}>
                  <Image
                    src="/img01.png"
                    alt="Historical colonial-era photograph of Ceylon tea trade"
                    width={800}
                    height={520}
                    className="w-full h-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <svg className="w-5 h-5 text-[var(--maroon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Museum plaque */}
            <div className="mt-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">
                Archival Photograph
              </p>
              <p className="text-sm text-gray-600 italic">
                Colonial-era Ceylon tea trade · Circa 1904
              </p>
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l border-[var(--maroon)]/20 rounded-tl-sm" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-[var(--maroon)]/20 rounded-tr-sm" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-[var(--maroon)]/20 rounded-bl-sm" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r border-[var(--maroon)]/20 rounded-br-sm" />
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: '/img01.png', alt: 'Historical colonial-era photograph of Ceylon tea trade activity' }]}
      />
    </section>
  )
}
