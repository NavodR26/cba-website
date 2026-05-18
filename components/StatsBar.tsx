import CounterAnimation from './CounterAnimation'
import Reveal from './Reveal'

const stats = [
  { value: 100, suffix: '+', label: 'Member Companies', sub: 'Registered broking firms across Sri Lanka' },
  { value: 4, suffix: '', label: 'Commodity Auctions', sub: 'Tea, rubber, coconut and spices' },
  { value: 500, suffix: '+', label: 'Auctions Conducted', sub: 'Coordinated through the auction year' },
  { value: 120, suffix: '+', label: 'Years of Excellence', sub: 'Institutional service since 1904' },
]

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-[#681925] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_38%,rgba(251,191,36,0.12))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">
              Association impact
            </span>
            <h2 className="mt-5 text-2xl font-semibold leading-tight md:text-3xl">
              CBA at a glance
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
              A quick snapshot of the Association&apos;s member network, auction coverage and long-standing service to Sri Lanka&apos;s commodity trade.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => (
            <Reveal key={item.label} delay={i * 90} distance={18}>
              <article className="group h-full rounded-2xl border border-white/12 bg-white/[0.08] p-6 shadow-[0_22px_60px_rgba(30,5,10,0.22)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-100/90">
                  {item.label}
                </p>
                <div className="mt-5 flex items-end gap-2">
                  <h3 className="text-4xl font-bold tracking-tight text-amber-300 md:text-5xl">
                    <CounterAnimation end={item.value} suffix={item.suffix} duration={2000} />
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/72">
                  {item.sub}
                </p>
                <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 to-white/70 transition-all duration-700 group-hover:w-full"
                    style={{ width: `${Math.min(42 + i * 14, 92)}%` }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
