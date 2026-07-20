'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'

interface Testimonial {
  _id: string
  name: string
  designation: string
  company: string
  quote: string
  category?: string
  photo?: any
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials', { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (loading || testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--maroon)]/5 via-white to-amber-50/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--maroon)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-bold uppercase tracking-[0.2em]">
            Industry Voices
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
            What Leaders Say About CBA
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Insights from industry leaders who have worked with the Colombo Brokers&apos; Association
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl p-10 md:p-16"
        >
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 text-[var(--maroon)]/5">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Category Badge */}
          {current.category && (
            <motion.div
              key={`category-${currentIndex}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--maroon)] to-[#5d1928] text-white text-xs font-semibold uppercase tracking-wider">
                {current.category}
              </span>
            </motion.div>
          )}

          {/* Testimonial Content */}
          <div className="relative z-10">
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-800 leading-relaxed italic mb-10 font-medium"
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>

            <motion.div
              key={`author-${currentIndex}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
            >
              {current.photo ? (
                <div className="relative">
                  <img
                    src={urlFor(current.photo).width(120).height(120).url()}
                    alt={current.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-[var(--maroon)]/10 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--maroon)] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--maroon)] to-[#5d1928] flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  {current.name.charAt(0)}
                </div>
              )}
              <div className="text-center sm:text-left">
                <p className="font-bold text-gray-900 text-xl">{current.name}</p>
                <p className="text-[var(--maroon)] font-semibold text-base mt-1">{current.designation}</p>
                <p className="text-gray-600 text-sm mt-1">{current.company}</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'var(--maroon)', color: 'white' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-[var(--maroon)] w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'var(--maroon)', color: 'white' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
