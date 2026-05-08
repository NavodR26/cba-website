'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [email, setEmail] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    // Placeholder — connect to mailing service later
    setTimeout(() => {
      setStatus('done')
      setEmail('')
    }, 700)
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-[var(--maroon)] to-[#4a1119] text-white">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            Stay Informed
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            Get new circulars &amp; auction updates straight to your inbox.
          </h2>
          <p className="mt-3 text-white/80 text-sm leading-relaxed max-w-md">
            Subscribe to receive official announcements, downloadable PDFs and
            calendar alerts the moment they&rsquo;re published.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-3 md:p-2 flex flex-col sm:flex-row gap-3 sm:gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-xl bg-white/95 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button
            type="submit"
            disabled={status === 'sending' || status === 'done'}
            className="px-6 py-3 rounded-xl bg-amber-400 text-[#3b0f15] font-semibold text-sm hover:bg-amber-300 disabled:opacity-70 transition"
          >
            {status === 'done'
              ? 'Subscribed ✓'
              : status === 'sending'
              ? 'Subscribing…'
              : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}
