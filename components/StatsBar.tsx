import CountUp from './CountUp'
import Reveal from './Reveal'

const stats = [
  { value: 100, suffix: '+', label: 'Member Companies', sub: 'Across Sri Lanka' },
  { value: 4, suffix: '', label: 'Commodity Auctions', sub: 'Tea · Rubber · Coconut · Spices' },
  { value: 500, suffix: '+', label: 'Auctions Conducted', sub: 'Every year' },
  { value: 120, suffix: '+', label: 'Years of Excellence', sub: 'Since 1904' },
]

export default function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-[var(--maroon)] to-[#4a1119] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated mesh with enhanced effects */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-amber-300/10 blur-3xl animate-pulse"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300/30 rounded-full animate-float-particle"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-float-particle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-amber-200/25 rounded-full animate-float-particle" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, i) => (
          <Reveal key={item.label} delay={i * 100} distance={20}>
            <div className="md:border-r last:md:border-none border-white/15 md:px-4 group hover-lift">
              <div className="relative">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient group-hover:scale-105 transition-transform duration-300">
                  <CountUp end={item.value} suffix={item.suffix} />
                </h3>
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-300/0 via-amber-300/10 to-amber-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>
              </div>
              <p className="text-sm mt-2 font-medium group-hover:text-amber-100 transition-colors duration-300">{item.label}</p>
              <p className="text-xs mt-0.5 opacity-70 group-hover:opacity-90 transition-opacity duration-300">{item.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
