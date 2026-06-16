type Pillar = {
  name: string
  tagline: string
  desc: string
  color: string
  accent: string
  icon: React.ReactNode
}

const PILLARS: Pillar[] = [
  {
    name: 'Tea',
    tagline: 'Ceylon’s flagship export',
    desc: 'Centre of the largest tea auction by volume in the world — held weekly under CBA oversight.',
    color: '#7a1f2a',
    accent: 'rgba(122,31,42,0.08)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28c0-6 6-10 16-10s16 4 16 10v6c0 8-7 14-16 14s-16-6-16-14z" />
        <path d="M48 30c4 0 8 2 8 8s-4 8-8 8" />
        <path d="M28 18c-2-4 0-8 4-10M36 18c2-4 0-8-4-10" />
      </svg>
    ),
  },
  {
    name: 'Rubber',
    tagline: 'Latex & raw rubber',
    desc: 'Sri Lanka is one of the world’s most respected origins for natural rubber, traded at CBA-supervised auctions.',
    color: '#1f6f43',
    accent: 'rgba(31,111,67,0.08)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8C20 8 12 18 12 30c0 14 12 26 20 26s20-12 20-26C52 18 44 8 32 8z" />
        <path d="M32 8v48M22 22c4 4 16 4 20 0M20 38c6 6 18 6 24 0" />
      </svg>
    ),
  },
  {
    name: 'Coconut',
    tagline: 'Kernel & by-products',
    desc: 'Auctions covering desiccated coconut, oil, husk, fibre and shell — feeding industries across the globe.',
    color: '#b67419',
    accent: 'rgba(182,116,25,0.08)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="36" r="20" />
        <path d="M22 32c2-2 4-2 6 0M36 32c2-2 4-2 6 0M24 44c4 4 12 4 16 0" />
        <path d="M32 16c-4-6-12-8-16-4M32 16c4-6 12-8 16-4" />
      </svg>
    ),
  },
  {
    name: 'Spices',
    tagline: 'Cinnamon, pepper, cloves',
    desc: 'CBA-backed spice trade connects Sri Lanka’s renowned spice growers with global buyers through transparent auctions.',
    color: '#854d0e',
    accent: 'rgba(133,77,14,0.08)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 50c0-8 6-14 14-14s14 6 14 14H14z" />
        <circle cx="22" cy="20" r="3" />
        <circle cx="32" cy="14" r="3" />
        <circle cx="42" cy="20" r="3" />
        <circle cx="48" cy="30" r="3" />
        <circle cx="16" cy="30" r="3" />
        <path d="M22 23l4 8M32 17l0 14M42 23l-4 8M48 33l-6 4M16 33l6 4" />
      </svg>
    ),
  },
]

export default function CommodityPillars() {
  return (
    <section
      id="pillars"
      className="py-10 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Industries Served
          </span>
          <h2 className="mx-auto mt-3 max-w-[calc(100vw-2rem)] text-xl min-[420px]:text-2xl sm:max-w-3xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            <span>Four pillars of Sri Lanka&rsquo;s</span>
            <br />
            <span>auction activity</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-[calc(100vw-2rem)] sm:max-w-2xl mx-auto">
            Our member firms operate across all four commodities the Association
            has championed for over a century.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <article
              key={p.name}
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition overflow-hidden"
            >
              {/* corner blob */}
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-40 group-hover:opacity-100 transition"
                style={{ background: p.accent }}
              />

              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: p.accent, color: p.color }}
              >
                <div className="w-7 h-7">{p.icon}</div>
              </div>

              <p
                className="relative text-[10px] uppercase tracking-[0.2em] font-bold mb-1"
                style={{ color: p.color }}
              >
                {p.tagline}
              </p>
              <h3 className="relative text-2xl font-bold text-gray-900">
                {p.name}
              </h3>
              <p className="relative mt-3 text-sm text-gray-600 leading-relaxed">
                {p.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
