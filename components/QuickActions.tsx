'use client'

import { motion, useAnimation, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect, type PointerEvent } from 'react'

type Resource = {
  title: string
  description: string
  href: string
  image: string
}

const resources: Resource[] = [
  { title: 'Auction Calendar', description: 'Live auction dates, meetings and market activity.', href: '/resources', image: '/resources_hero.png' },
  { title: 'Committee', description: 'Meet the leadership guiding the association.', href: '/committee', image: '/members_hero.png' },
  { title: 'Brokers Directory', description: 'Explore our trusted member broker network.', href: '/brokers', image: '/members_hero.png' },
  { title: 'Announcements', description: 'Important notices and association updates.', href: '/#announcements', image: '/about_hero.png' },
  { title: 'Gallery', description: 'Moments from CBA events and milestones.', href: '/gallery', image: '/gallery_hero.png' },
  { title: 'Contact Us', description: 'Speak directly with the association team.', href: '/contact', image: '/contact_hero.png' },
]

export default function QuickActions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const x = useMotionValue(0)

  const setPointerPosition = (event: PointerEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--resource-pointer-x', `${event.clientX - bounds.left}px`)
    card.style.setProperty('--resource-pointer-y', `${event.clientY - bounds.top}px`)
  }

  // Gesture-based interactions (drag to scroll)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    const x = e.touches[0].pageX - (scrollContainerRef.current.offsetLeft || 0)
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Auto-snap to nearest card on scroll end with debouncing
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollContainerRef.current || isDragging) return
      
      const container = scrollContainerRef.current
      const scrollLeft = container.scrollLeft
      const cardWidth = 340 // 320px card + 20px gap
      
      // Find nearest card position
      const nearestCardIndex = Math.round(scrollLeft / cardWidth)
      const targetScroll = nearestCardIndex * cardWidth
      
      // Only snap if we're not already at the target position
      if (Math.abs(scrollLeft - targetScroll) > 20) {
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        })
      }
    }, 150)
  }

  // Strong magnetic pull effect on card hover
  const handleCardHover = (index: number, cardElement: HTMLAnchorElement | null) => {
    if (!scrollContainerRef.current || !cardElement) return
    
    const container = scrollContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const cardRect = cardElement.getBoundingClientRect()
    
    const cardLeft = cardRect.left
    const cardRight = cardRect.right
    const containerLeft = containerRect.left
    const containerRight = containerRect.right
    
    // If card is partially visible at edges, scroll to center it
    if (cardLeft < containerLeft + 120 || cardRight > containerRight - 120) {
      const cardWidth = 340
      const targetScroll = index * cardWidth - (container.clientWidth - 320) / 2
      const maxScroll = container.scrollWidth - container.clientWidth
      container.scrollTo({
        left: Math.max(0, Math.min(maxScroll, targetScroll)),
        behavior: 'smooth'
      })
    }
  }

  // Magnetic pull on mouse release with auto-snap
  const handleMouseUpWithMagnetic = () => {
    setIsDragging(false)
    // Trigger scroll end check immediately after release
    setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const scrollLeft = container.scrollLeft
        const cardWidth = 340
        const nearestCardIndex = Math.round(scrollLeft / cardWidth)
        const targetScroll = nearestCardIndex * cardWidth
        
        if (Math.abs(scrollLeft - targetScroll) > 20) {
          container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  }

  return (
    <section className="cba-resource-hub relative -mt-10 overflow-hidden px-4 pb-8 pt-[4.5rem] sm:px-6 sm:pb-10 sm:pt-20 lg:px-8 lg:pb-12 lg:pt-24">
      <div className="cba-resource-hub__atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div className="cba-resource-hub__transition pointer-events-none absolute inset-x-0 top-0" aria-hidden />
      <motion.div aria-hidden className="cba-resource-hub__signal pointer-events-none absolute right-[8%] top-16 hidden h-36 w-36 rounded-full lg:block" animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.header initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }} className="mb-5 flex flex-col gap-4 border-b border-[#0a1b38]/10 pb-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8d2330]"><span className="h-px w-7 bg-current" />Quick access</p>
            <h2 className="mt-2 text-[clamp(2rem,3.4vw,3.25rem)] font-bold leading-none tracking-[-0.055em] text-[#091936]">Your connection to <span className="text-[#c99b2e]">the market.</span></h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Essential CBA services, organised for faster access to people, dates and market information.</p>
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <span className="hidden text-right text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-slate-400 xl:block">Six essential<br />resources</span>
            <Link href="/resources" className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#8d2330] transition hover:text-[#5f1720]">View all resources <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/30 text-lg transition duration-300 group-hover:translate-x-1 group-hover:bg-[#8d2330] group-hover:text-white">&rarr;</span></Link>
          </div>
        </motion.header>

        {/* Horizontal scroll with snap & magnetic pull */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.14 }} 
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          ref={scrollContainerRef}
          className={`horizontal-scroll-container flex gap-5 overflow-x-auto pb-4 pt-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUpWithMagnetic}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onScroll={handleScroll}
        >
          {resources.map((resource, index) => (
            <motion.div 
              key={resource.title} 
              variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
              animate={{
                width: expandedCard === index ? '420px' : '320px',
                height: expandedCard === index ? '220px' : '180px',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <Link 
                ref={(el) => {
                  if (el) {
                    el.dataset.index = index.toString()
                  }
                }}
                href={resource.href} 
                onPointerMove={setPointerPosition}
                onMouseEnter={(e) => {
                  setExpandedCard(index)
                  handleCardHover(index, e.currentTarget)
                }}
                onMouseLeave={() => setExpandedCard(null)}
                className="cba-compact-card group relative flex h-full flex-col overflow-hidden rounded-2xl"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image 
                  src={resource.image} 
                  alt="" 
                  fill 
                  sizes="(min-width: 1280px) 420px, (min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw" 
                  className="cba-compact-card__image pointer-events-none object-cover" 
                />
                <span className="cba-compact-card__overlay pointer-events-none absolute inset-0" aria-hidden />
                <span className="cba-compact-card__spotlight pointer-events-none absolute inset-0" aria-hidden />
                
                {/* Progressive disclosure content */}
                <motion.div 
                  className="relative z-10 flex h-full flex-col justify-end p-5"
                  initial={false}
                  animate={{
                    opacity: expandedCard === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-[15px] font-semibold leading-tight tracking-[-0.02em] text-white"
                    animate={{
                      fontSize: expandedCard === index ? '17px' : '15px',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {resource.title}
                  </motion.h3>
                  <motion.p 
                    className="mt-1.5 text-[12px] leading-5 text-white/85"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: expandedCard === index ? 1 : 0.85,
                      height: expandedCard === index ? 'auto' : 'auto',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {resource.description}
                  </motion.p>
                  <motion.div 
                    className="mt-3 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: expandedCard === index ? 1 : 1,
                      y: expandedCard === index ? 0 : 0,
                    }}
                    transition={{ duration: 0.3, delay: expandedCard === index ? 0.1 : 0 }}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                      {expandedCard === index ? 'Explore now' : ''}
                    </span>
                    <svg className="h-4 w-4 text-white/90 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="mt-4 flex justify-center gap-2">
          {resources.map((_, index) => (
            <motion.div
              key={index}
              className="h-1.5 w-8 rounded-full bg-slate-200"
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 0.5 }}
              animate={{
                backgroundColor: expandedCard === index ? '#c99b2e' : 'rgba(0,0,0,0.1)',
                width: expandedCard === index ? '32px' : '24px',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
