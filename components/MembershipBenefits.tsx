type Benefit = {
  title: string
  desc: string
  icon: React.ReactNode
}

const BENEFITS: Benefit[] = [
  {
    title: 'Industry Standing',
    desc: 'Be recognised under the authority vested by the Sri Lanka Tea Board — backed by 120+ years of credibility.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13l2 8-5.5-3-5.5 3 2-8" />
      </svg>
    ),
  },
  {
    title: 'Auction Access',
    desc: 'Direct participation in tea, rubber, coconut and spices auctions held under CBA supervision.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l8-8M14 14l7 7" />
        <rect x="9" y="3" width="11" height="6" rx="1" transform="rotate(45 9 3)" />
      </svg>
    ),
  },
  {
    title: 'Policy Voice',
    desc: 'Representation on regulatory matters affecting the auction industry — through the CBA committee.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-8v18L3 13z" />
        <path d="M11 11.5v6" />
      </svg>
    ),
  },
  {
    title: 'Network & Insight',
    desc: 'Access to circulars, reports, AGMs and a network of leading broker firms across the country.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <path d="M23 20v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

export default function MembershipBenefits() {
  return (
    <section
      id="benefits"
      className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
            Why Join
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Benefits of Membership
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Joining the Colombo Brokers&rsquo; Association connects your firm to a
            century of professional excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <article
              key={b.title}
              className="relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider text-gray-300">
                0{i + 1}
              </span>
              <div className="w-12 h-12 rounded-xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center mb-4 group-hover:bg-[var(--maroon)] group-hover:text-white transition">
                <div className="w-6 h-6">{b.icon}</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{b.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {b.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
