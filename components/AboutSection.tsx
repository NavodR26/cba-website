export default function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute -right-32 top-0 w-72 h-72 rounded-full bg-[var(--maroon)]/5 blur-3xl" />
      <div className="absolute -left-32 bottom-0 w-64 h-64 rounded-full bg-amber-300/5 blur-3xl" />

      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider animate-fade-in-scale">
          Institution
        </span>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
          Leading Sri Lanka&apos;s Auction Market
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg leading-relaxed animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          Since 1904, stewarding Sri Lanka&apos;s tea, rubber, coconut and spices markets with uncompromised integrity and professional excellence.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left mt-10 max-w-5xl mx-auto">
          {/* VISION */}
          <div className="p-8 rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white/90 to-gray-50/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon)]/0 via-transparent to-[var(--maroon)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--maroon)]/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--maroon)]/20 to-[var(--maroon)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-[var(--maroon)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[var(--maroon)] group-hover:translate-x-1 transition-transform duration-300">
                Vision
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To champion a modern, transparent, and sustainable tea auction platform that strengthens Sri Lanka's position as the world's premier tea trading hub.
              </p>
            </div>
          </div>

          {/* MISSION */}
          <div className="p-8 rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white/90 to-gray-50/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/0 via-transparent to-amber-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-300/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-300/20 to-amber-300/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[var(--maroon)] group-hover:translate-x-1 transition-transform duration-300">
                Mission
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To foster a transparent, technology-driven, and sustainable marketplace that enhances stakeholder confidence, strengthens industry standards, and advances the global competitiveness of Sri Lanka's tea, rubber, coconut, and spice sectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
