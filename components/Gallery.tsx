'use client'

import { motion } from 'framer-motion'
import { client, urlFor } from '@/lib/sanity'
import { useEffect, useState } from 'react'

export default function Gallery() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    client.fetch(`*[_type == "gallery"]`).then(setData)
  }, [])

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-2xl font-bold mb-8 text-center">
          Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item) =>
            item.images?.map((img: any, i: number) => (
              <motion.img
                key={i}
                src={urlFor(img).width(400).url()}
                alt=""
                className="rounded-lg hover:scale-105 transition"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              />
            ))
          )}
        </div>

      </div>
    </section>
  )
}