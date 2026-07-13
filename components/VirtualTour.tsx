'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

interface ShowcaseItem {
  _key: string
  title: string
  description: string
  mediaType: 'image' | 'video'
  image?: any
  video?: any
  displayOrder: number
}

interface FacilityShowcase {
  title: string
  description: string
  showcaseItems: ShowcaseItem[]
}

export default function FacilityShowcase() {
  const [showcase, setShowcase] = useState<FacilityShowcase | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  useEffect(() => {
    async function fetchShowcase() {
      try {
        const response = await fetch('/api/virtual-tour', { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setShowcase(data)
        }
      } catch (error) {
        console.error('Error fetching facility showcase:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchShowcase()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (loading) return null

  if (!showcase || !showcase.showcaseItems || showcase.showcaseItems.length === 0) {
    console.log('[FacilityShowcase] No data:', showcase)
    return null
  }

  const items = showcase.showcaseItems
  const currentItem = items[currentIndex]

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPaused || items.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, isPaused, currentIndex, items.length])

  const slideVariants: any = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--cba-gold)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--cba-maroon)]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--cba-maroon)]/10 text-[var(--cba-maroon)] text-xs font-semibold uppercase tracking-wider">
            Explore
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {showcase.title}
          </h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {showcase.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-[16/9] md:aspect-[21/9]"
            onTouchStart={(e) => {
              setTouchStart(e.touches[0].clientX)
            }}
            onTouchMove={(e) => {
              if (touchStart !== null) {
                const diff = touchStart - e.touches[0].clientX
                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    nextSlide()
                  } else {
                    prevSlide()
                  }
                  setTouchStart(null)
                }
              }
            }}
            onTouchEnd={() => setTouchStart(null)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {currentItem.mediaType === 'video' && currentItem.video ? (
                  <video
                    src={urlFor(currentItem.video).url()}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : currentItem.image ? (
                  <Image
                    src={urlFor(currentItem.image).width(1920).height(1080).url()}
                    alt={currentItem.title}
                    fill
                    className="object-cover"
                    priority={currentIndex === 0}
                  />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {currentItem.title}
                    </h3>
                    <p className="text-base text-white/80 max-w-2xl leading-relaxed">
                      {currentItem.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-20"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-20"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPaused(prev => !prev)}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20"
                  aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                >
                  {isPaused ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {items.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {items.map((item, index) => (
                <button
                  key={item._key}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-[var(--cba-maroon)] ring-offset-2 scale-105 shadow-lg'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {item.mediaType === 'video' && item.video ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : item.image ? (
                    <Image
                      src={urlFor(item.image).width(200).height(120).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
