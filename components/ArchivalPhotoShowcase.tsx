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
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-bold uppercase tracking-widest">
            Heritage Collection
          </span>
        </div>

        <div className="relative">
          {/* Museum-style frame */}
          <div className="relative bg-white p-6 md:p-8 shadow-2xl rounded-sm max-w-2xl mx-auto">
            {/* Inner frame border */}
            <div className="border-4 border-gray-900/10 rounded-sm p-2">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="relative w-full text-left overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--maroon)]"
                aria-label="Expand archival photograph"
              >
                <div className="relative bg-gray-100" style={{ maxHeight: '500px' }}>
                  <Image
                    src="/img01.png"
                    alt="Historical colonial-era photograph of Ceylon tea trade"
                    width={800}
                    height={520}
                    className="w-full h-auto object-contain rounded-2xl"
                    style={{ maxHeight: '500px', objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </button>
            </div>

            {/* Museum plaque */}
            <div className="mt-6 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">
                Archival Photograph
              </p>
              <p className="text-sm text-gray-600 italic">
                Colonial-era Ceylon tea trade · Circa 1904
              </p>
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[var(--maroon)]/30" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--maroon)]/30" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[var(--maroon)]/30" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[var(--maroon)]/30" />
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
