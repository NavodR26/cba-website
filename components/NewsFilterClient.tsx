'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import NewsCard from '@/components/NewsCard'

interface NewsItem {
  _id: string
  title: string
  category: string
  source: string
  date: string
  summary: string
  content: string
  thumbnail?: string
  externalUrl?: string
}

interface NewsFilterClientProps {
  news: NewsItem[]
  categories: string[]
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  'Tea Market': { label: 'Tea Market', color: 'bg-amber-100 text-amber-700 border-amber-300', icon: '🍵' },
  'Energy': { label: 'Energy', color: 'bg-orange-100 text-orange-700 border-orange-300', icon: '⚡' },
  'Currency': { label: 'Currency', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: '💱' },
  'Export Trade': { label: 'Export Trade', color: 'bg-green-100 text-green-700 border-green-300', icon: '📦' },
  'Industry News': { label: 'Industry News', color: 'bg-purple-100 text-purple-700 border-purple-300', icon: '📰' },
}

export default function NewsFilterClient({ news, categories }: NewsFilterClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!activeCategory) return news
    return news.filter((item) => item.category === activeCategory)
  }, [news, activeCategory])

  const sortedCategories = categories.sort()

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
            activeCategory === null
              ? 'bg-[var(--maroon)] text-white shadow-lg'
              : 'border border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          All Updates
        </button>

        {sortedCategories.map((cat) => {
          const config = CATEGORY_CONFIG[cat] || { label: cat, color: 'bg-gray-100 text-gray-700 border-gray-300', icon: '📌' }
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? `${config.color} shadow-lg`
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {config.icon} {config.label}
            </button>
          )
        })}
      </div>

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-sm">
              No updates in this category yet.
            </p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <NewsCard item={item} config={CATEGORY_CONFIG[item.category]} />
            </motion.div>
          ))
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-500 text-center pt-6 border-t border-gray-200">
        Showing {filtered.length} of {news.length} update{news.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
