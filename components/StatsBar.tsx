const stats = [
  { value: 100, suffix: '+', label: 'Member Companies', sub: 'Registered broking firms across Sri Lanka' },
  { value: 4, suffix: '', label: 'Commodity Auctions', sub: 'Tea, rubber, coconut and spices' },
  { value: 500, suffix: '+', label: 'Auctions Conducted', sub: 'Coordinated through the auction year' },
  { value: 120, suffix: '+', label: 'Years of Excellence', sub: 'Institutional service since 1904' },
]

export default function StatsBar() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 -mt-8 z-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(16,24,32,0.06)] border border-[rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center p-4">
                <div className="text-3xl font-semibold text-[#111827]">{item.value}{item.suffix}</div>
                <div className="mt-1 text-sm text-[#6F6F6F]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
