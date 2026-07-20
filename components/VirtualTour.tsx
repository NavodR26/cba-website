'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

interface VideoChapter {
  title: string
  timestamp: number
}

interface ShowcaseItem {
  _key: string
  title: string
  description: string
  mediaType: 'image' | 'video' | '360tour' | 'floorMap'
  category?: string
  image?: any
  video?: any
  tour360Url?: string
  floorMap?: any
  brochure?: any
  qrCode?: any
  videoChapters?: VideoChapter[]
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Auto-play functionality
  useEffect(() => {
    if (loading || !showcase || !showcase.showcaseItems || showcase.showcaseItems.length === 0) return
    
    const items = showcase.showcaseItems
    const categories = ['all', ...new Set(items.map(item => item.category).filter((cat): cat is string => Boolean(cat)))]
    const filteredItems = selectedCategory === 'all' 
      ? items 
      : items.filter(item => item.category === selectedCategory)
    
    if (!isPlaying || isPaused || filteredItems.length <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, isPaused, selectedCategory, loading, showcase])

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  if (loading) return null

  if (!showcase || !showcase.showcaseItems || showcase.showcaseItems.length === 0) {
    console.log('[FacilityShowcase] No data:', showcase)
    return null
  }

  const items = showcase.showcaseItems
  const categories = ['all', ...new Set(items.map(item => item.category).filter((cat): cat is string => Boolean(cat)))]
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory)
  const currentItem = filteredItems[currentIndex]

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1))
  const handleResetZoom = () => {
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const handleChapterClick = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp
      videoRef.current.play()
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    handleResetZoom()
  }

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--cba-gold)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--cba-maroon)]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--cba-maroon)]" />
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--cba-maroon)]/10 to-[var(--cba-maroon)]/5 text-[var(--cba-maroon)] text-[11px] font-bold uppercase tracking-[0.2em] border border-[var(--cba-maroon)]/20">
              Explore
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--cba-maroon)]" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            {showcase.title}
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {showcase.description}
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--cba-maroon)] text-white shadow-md hover:shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[var(--cba-maroon)]/30'
                }`}
              >
                {category === 'all' ? 'All Facilities' : category}
              </button>
            ))}
          </div>
        )}

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
            className={`relative rounded-2xl overflow-hidden shadow-lg bg-gray-900 aspect-[16/9] md:aspect-[21/9] ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
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
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
              >
                {currentItem.mediaType === 'video' && currentItem.video ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={urlFor(currentItem.video).url()}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Video Chapters */}
                    {currentItem.videoChapters && currentItem.videoChapters.length > 0 && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-xl p-3">
                        <button
                          onClick={() => setShowChapters(!showChapters)}
                          className="text-white text-sm font-medium mb-2 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          Chapters
                        </button>
                        {showChapters && (
                          <div className="space-y-1">
                            {currentItem.videoChapters.map((chapter, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleChapterClick(chapter.timestamp)}
                                className="block w-full text-left text-white/80 hover:text-white text-xs py-1 px-2 rounded hover:bg-white/10 transition"
                              >
                                {chapter.title} - {Math.floor(chapter.timestamp / 60)}:{(chapter.timestamp % 60).toString().padStart(2, '0')}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : currentItem.mediaType === '360tour' && currentItem.tour360Url ? (
                  <iframe
                    src={currentItem.tour360Url}
                    title={currentItem.title}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : currentItem.mediaType === 'floorMap' && currentItem.floorMap ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={urlFor(currentItem.floorMap).width(1920).height(1080).url()}
                      alt={currentItem.title}
                      fill
                      className="object-cover"
                      priority={currentIndex === 0}
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md rounded-xl px-3 py-2">
                      <span className="text-white text-xs font-medium">Interactive Floor Map</span>
                    </div>
                  </div>
                ) : currentItem.image ? (
                  <Image
                    src={urlFor(currentItem.image).width(1920).height(1080).url()}
                    alt={currentItem.title}
                    fill
                    className="object-cover cursor-zoom-in"
                    priority={currentIndex === 0}
                    onClick={handleZoomIn}
                  />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {currentItem.title}
                    </h3>
                    <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
                      {currentItem.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {currentItem.brochure && (
                        <a
                          href={urlFor(currentItem.brochure).url()}
                          download
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-white/20 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Brochure
                        </a>
                      )}
                      {currentItem.qrCode && (
                        <button
                          onClick={() => {/* Show QR modal */}}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-white/20 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                          View QR Code
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {filteredItems.length > 1 && (
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

                {/* Zoom Controls */}
                {currentItem.mediaType === 'image' && (
                  <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 1}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Zoom out"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 3}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Zoom in"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      aria-label="Reset zoom"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
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
          {filteredItems.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {filteredItems.map((item, index) => (
                <button
                  key={item._key}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`relative w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-[var(--cba-maroon)] ring-offset-2 scale-105 shadow-md'
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
                  ) : item.mediaType === '360tour' ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  ) : item.mediaType === 'floorMap' && item.floorMap ? (
                    <Image
                      src={urlFor(item.floorMap).width(200).height(120).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
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
