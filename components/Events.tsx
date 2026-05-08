'use client'

import { motion } from 'framer-motion'

const events = [
  { date: 'May 12, 2026', title: 'Colombo Tea Auction' },
  { date: 'May 20, 2026', title: 'Committee Meeting' },
]

export default function Events() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-2xl font-bold mb-8 text-center">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">{event.date}</p>
              <h3 className="text-lg font-semibold mt-2">
                {event.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}