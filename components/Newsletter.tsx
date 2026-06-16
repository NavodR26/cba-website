'use client'

import Link from 'next/link'

export default function Newsletter() {
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
            Email alerts for official announcements and calendar updates are coming soon. In the meantime, browse the
            latest circulars and auction schedule on the Resources page.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300/20 text-amber-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Newsletter subscription — coming soon</p>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                We are preparing our official mailing service. Until then, check Resources for new circulars and PDF
                downloads as they are published.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/resources#downloads"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#3b0f15] transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Browse Circulars
                </Link>
                <Link
                  href="/resources#auction-calendar"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View Calendar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
