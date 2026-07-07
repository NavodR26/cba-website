'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PastChairman {
  _id: string;
  year: string;
  chairmanName: string;
  company?: string;
  deputyChairman?: string;
}

export default function PastChairmenGrid() {
  const [allChairmen, setAllChairmen] = useState<PastChairman[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/past-chairmen', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load past chairmen');
        const data = await response.json();
        setAllChairmen(data);
      } catch (error) {
        console.error('Error loading past chairmen:', error);
        setAllChairmen([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const visibleChairmen = allChairmen.slice(0, visibleCount);
  const hasMore = visibleCount < allChairmen.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 10, allChairmen.length));
      setLoadingMore(false);
    }, 300);
  };

  if (loading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-[var(--maroon)]/20 border-t-[var(--maroon)] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!allChairmen?.length) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 scroll-mt-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-[0.25em]"
          >
            Heritage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-bold text-gray-900"
          >
            Past Chairmen of the Association
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            A record of leaders who shaped the Association over more than a century of institutional service.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleChairmen.map((c, i) => (
              <motion.article
                key={c._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min((i % 10) * 0.06, 0.4),
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:border-[var(--maroon)]/50 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/0 via-transparent to-amber-100/0 group-hover:from-[var(--maroon)]/8 group-hover:to-amber-100/8 transition-all duration-500 pointer-events-none" />

                {/* Year badge with animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: Math.min((i % 10) * 0.06 + 0.1, 0.5) }}
                  className="mb-3"
                >
                  <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--maroon)] bg-[var(--maroon)]/10 px-3 py-1.5 rounded-full">
                    {c.year}
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min((i % 10) * 0.06 + 0.15, 0.55) }}
                  className="font-semibold text-gray-900 leading-tight text-base mb-2"
                >
                  {c.chairmanName}
                </motion.h3>

                {c.company && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min((i % 10) * 0.06 + 0.2, 0.6) }}
                    className="text-xs text-gray-500 line-clamp-1"
                  >
                    {c.company}
                  </motion.p>
                )}

                {c.deputyChairman && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min((i % 10) * 0.06 + 0.25, 0.65) }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                      Deputy Chairman
                    </p>
                    <p className="text-xs text-gray-700 line-clamp-1">
                      {c.deputyChairman}
                    </p>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <motion.button
              onClick={handleLoadMore}
              onMouseEnter={() => {}}
              disabled={loadingMore}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--maroon)] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>View More</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* End indicator */}
        {!hasMore && visibleChairmen.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              All {allChairmen.length} chairmen displayed
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
