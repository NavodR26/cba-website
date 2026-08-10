import Image from 'next/image'

const milestones = [
  ['1910', 'Sri Lanka’s First Rubber Auction', 'The Colombo Brokers’ Association was instrumental in establishing the first rubber auction, held on 4 November 1910.'],
  ['1950', 'Return to the Auction Floor', 'After the war years, the first crepe rubber auction was held on 2 June at the Ceylon Chamber of Commerce with the Colombo Rubber Traders’ Association.'],
  ['1981', 'First Sheet Rubber Auction', 'The first sheet rubber auction was held on 30 April, after the end of the Rubber/Rice Pact with the People’s Republic of China.'],
  ['1984', 'Colombo Spice Auction', 'Working with the Spices & Allied Products Traders’ Association, CBA began the Colombo Spice Auction for cardamom and cloves, later opening it to all spices and allied products.'],
]

export default function RubberSpicesHeritage() {
  return (
    <section className="relative overflow-hidden bg-[#173a2a] px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-12">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_9%_18%,rgba(201,162,39,0.16),transparent_25%),radial-gradient(circle_at_88%_85%,rgba(148,67,35,0.22),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-7 lg:grid-cols-5 lg:gap-10">
        <div className="relative order-2 overflow-hidden rounded-2xl border border-white/15 bg-black/10 shadow-[0_14px_35px_rgba(0,0,0,0.24)] lg:order-1 lg:col-span-2">
          <div className="relative aspect-[4/3]">
            <Image src="/images/commodities/rubber-spices-heritage.png" alt="Natural rubber, cardamom, cloves, cinnamon and an auction gavel" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#10251b]/45 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-2.5 py-1.5 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#f1cf67]" /><p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/90">Natural rubber &amp; Sri Lankan spices</p></div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-3">
          <div className="flex items-center gap-3"><span className="h-px w-8 bg-[#d4af37]" /><span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#f1cf67]">Beyond tea</span></div>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-georgia)] text-2xl leading-tight sm:text-3xl lg:text-[2.1rem]">A Legacy in <span className="text-[#f1cf67]">Rubber &amp; Spices</span></h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">For more than a century, CBA brokers have brought producers, exporters, local industries and traders together through transparent, well-managed markets.</p>
          <div className="mt-4 grid max-w-2xl gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5"><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#f1cf67]">Market Stewardship</p><p className="mt-1 text-[11px] leading-4 text-white/70">Quality standards, trade guidance and practical support for dispute resolution.</p></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5"><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#f1cf67]">Industry Partnership</p><p className="mt-1 text-[11px] leading-4 text-white/70">Ongoing market insight and dialogue with CRTA and SAPPTA.</p></div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-7 max-w-[1180px]">
        <div className="mb-2 flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">Key milestones</p><p className="text-[10px] text-[#f1cf67]">1910 — 1984</p></div>
        <div className="grid divide-y divide-white/10 overflow-hidden rounded-xl border border-white/12 bg-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          {milestones.map(([year, title, description], index) => <article key={year} className="group relative px-4 py-3.5 transition hover:bg-white/[0.07]"><span aria-hidden className="absolute left-4 top-0 hidden h-px w-8 bg-[#f1cf67] xl:block" /><div className="flex items-baseline gap-3"><p className="text-lg font-semibold text-[#f1cf67]">{year}</p><span className="text-[10px] text-white/30">0{index + 1}</span></div><h3 className="mt-1 text-xs font-semibold text-white">{title}</h3><p className="mt-1 text-[11px] leading-4 text-white/65">{description}</p></article>)}
        </div>
      </div>
    </section>
  )
}
