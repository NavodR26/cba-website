import Image from 'next/image'

const storyPoints = [
  { number: '01', title: 'From coffee to tea', description: 'The coffee crisis of the 1870s created the conditions for a professional broking community as Ceylon’s plantation economy turned to tea.' },
  { number: '02', title: 'A trusted market link', description: 'Brokers connect producers and buyers with informed valuation, transparent auction practice and disciplined documentation.' },
  { number: '03', title: 'Care from sample to settlement', description: 'From estate samples and market reports to sale proceeds and settlement, the broker supports every stage of trade.' },
]

export default function CbaTeaTradeHeritage() {
  return (
    <section className="relative overflow-hidden bg-[#f8f4ed] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_8%_30%,rgba(122,31,42,0.10),transparent_25%),radial-gradient(circle_at_92%_80%,rgba(201,162,39,0.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3"><span className="h-px w-9 bg-[var(--maroon)]" /><span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--maroon)]">Our tea trade heritage</span></div>
            <h2 className="mt-5 max-w-lg font-[family-name:var(--font-georgia)] text-3xl leading-[1.08] tracking-[-0.02em] text-[#201a1a] sm:text-4xl">From a changing plantation economy to <span className="text-[var(--maroon)]">a trusted tea market</span></h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-stone-600">The Colombo Share Brokers Association was founded in 1896 and reconstituted as the Colombo Brokers&apos; Association in 1904. Its emergence followed the coffee crisis of the 1870s and Ceylon&apos;s transformation into a tea-producing economy.</p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-stone-600">Since then, CBA brokers have helped uphold the commercial discipline that enables tea to move confidently from estate to auction, buyer and export market.</p>
            <div className="mt-7 flex items-stretch overflow-hidden rounded-2xl border border-[#7a1f2a]/15 bg-white shadow-[0_14px_35px_rgba(62,37,31,0.09)]"><div className="bg-[var(--maroon)] px-5 py-4 text-white sm:px-6"><p className="text-[9px] font-bold uppercase tracking-[0.19em] text-white/70">Founded</p><p className="mt-1 font-[family-name:var(--font-georgia)] text-3xl leading-none">1896</p></div><div className="px-5 py-4 sm:px-6"><p className="text-[9px] font-bold uppercase tracking-[0.19em] text-[var(--maroon)]">Reconstituted as CBA</p><p className="mt-1 font-[family-name:var(--font-georgia)] text-3xl leading-none text-[#26201f]">1904</p></div></div>
          </div>
          <div className="relative lg:col-span-7"><div aria-hidden className="absolute -inset-3 rounded-[28px] border border-[var(--maroon)]/10" /><div className="group relative aspect-[4/3] overflow-hidden rounded-[22px] bg-stone-200 shadow-[0_22px_50px_rgba(62,37,31,0.18)]"><Image src="/images/about/cba-tea-trade-heritage.png" alt="Tea samples, a gavel and an auction ledger in a historic Colombo trade office" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" /><p className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur-sm">Tea, trust and trade</p></div></div>
        </div>
        <div className="mt-10 grid overflow-hidden rounded-2xl border border-[#7a1f2a]/10 bg-white shadow-[0_12px_30px_rgba(62,37,31,0.06)] md:grid-cols-3">{storyPoints.map((point, index) => <article key={point.number} className={`p-6 sm:p-7 ${index > 0 ? 'border-t border-[#7a1f2a]/10 md:border-l md:border-t-0' : ''}`}><span className="text-[10px] font-bold tracking-[0.18em] text-[#b3871f]">{point.number}</span><h3 className="mt-3 text-lg font-semibold text-[#26201f]">{point.title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{point.description}</p></article>)}</div>
        <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-stone-600">Today, the Association&apos;s central role is to support the preparation of tea for auction, the sale process and the final documentation for sellers and buyers. Working alongside the Ceylon Chamber of Commerce and the Colombo Tea Traders&apos; Association, CBA remains a vital link in Sri Lanka Tea Trade.</p>
      </div>
    </section>
  )
}
