export default function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] dark:text-amber-300 text-xs font-semibold uppercase tracking-wider animate-fade-in-scale">
          About
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
          About CBA
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          Since 1904, the Colombo Brokers&rsquo; Association has been the institutional pillar
          connecting producers and buyers, maintaining the integrity and smooth
          operation of Sri Lanka's vital commodity trades.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left mt-12 max-w-5xl mx-auto">
          <div className="p-7 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-900/50 hover-lift hover-glow group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/0 to-[var(--maroon)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-[var(--maroon)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-[var(--maroon)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-[var(--maroon)] dark:text-amber-300 group-hover:translate-x-1 transition-transform duration-300">
                Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                To be the leading authority in promoting a transparent, efficient
                and globally competitive auction system.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-900/50 hover-lift hover-glow group overflow-hidden relative" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/0 to-amber-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-amber-300/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-[var(--maroon)] dark:text-amber-300 group-hover:translate-x-1 transition-transform duration-300">
                Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                To uphold integrity, enhance industry standards, and support the
                sustainable growth of Sri Lanka&rsquo;s tea, rubber, coconut and
                spices auction sectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
