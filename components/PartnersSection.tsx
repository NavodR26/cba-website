'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'

interface Partner {
  _id: string
  name: string
  category: string
  description: string
  logo?: any
  website?: string
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch('/api/partners', { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setPartners(data)
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPartners()
  }, [])

  if (loading) return null

  if (partners.length === 0) return null

  const categories = [...new Set(partners.map(p => p.category))]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Partners
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Our Partners & Collaborations
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
            Working together with leading institutions to advance the industry
          </p>
        </motion.div>

        {categories.map((category, categoryIndex) => (
          <div key={category} className="mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--maroon)]" />
              {category}
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners
                .filter(p => p.category === category)
                .map((partner, index) => (
                  <motion.a
                    key={partner._id}
                    href={partner.website || '#'}
                    target={partner.website ? '_blank' : undefined}
                    rel={partner.website ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-full h-24 flex items-center justify-center mb-4 bg-gray-50 rounded-xl overflow-hidden">
                      {partner.logo ? (
                        <img
                          src={urlFor(partner.logo).width(200).height(100).url()}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm font-medium">
                          {partner.name}
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {partner.description}
                    </p>
                  </motion.a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
