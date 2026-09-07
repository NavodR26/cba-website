'use client'

import { motion } from 'framer-motion'

interface TimelineEvent { year: string; title: string; description: string; type: 'tea' | 'market' }

const timelineEvents: TimelineEvent[] = [
  { year: '1870s', title: 'The coffee crisis', description: 'The devastating coffee crisis created the conditions for Ceylon\'s transformation into a tea-producing economy and the emergence of professional broking expertise.', type: 'tea' },
  { year: '1883', title: 'First tea auction in Sri Lanka', description: 'Sri Lanka commenced its first tea auction, marking the beginning of a legacy that would shape the nation\'s tea industry for generations.', type: 'tea' },
  { year: '1896', title: 'Colombo Share Brokers Association founded', description: 'A professional association for brokers was established as commercial activity around plantation produce expanded in colonial Ceylon.', type: 'tea' },
  { year: '1904', title: 'Colombo Brokers Association established', description: 'The organisation was reconstituted as CBA, establishing brokers as an integral part of the country\'s commercial ethics and auction ecosystem.', type: 'tea' },
  { year: '1910', title: 'First rubber auction', description: 'CBA was instrumental in establishing Sri Lanka\'s first rubber auction, held on 4 November, expanding our commodity expertise beyond tea.', type: 'market' },
  { year: '1950', title: 'Rubber auction resumes', description: 'The first post-war crepe rubber auction was held with the Colombo Rubber Traders Association, rebuilding market infrastructure after global conflict.', type: 'market' },
  { year: '1981', title: 'First sheet rubber auction', description: 'The first sheet rubber auction was held after the end of the Rubber/Rice Pact, demonstrating market resilience and adaptability.', type: 'market' },
  { year: '1984', title: 'Colombo Spice Auction launched', description: 'CBA began the Colombo Spice Auction with SAPPTA, initially for cardamom and cloves, later expanding to all spices and allied products.', type: 'market' },
  { year: '2000s', title: 'Digital transformation era', description: 'CBA embraced digital auction systems and electronic bidding platforms while maintaining traditional auction integrity and market discipline.', type: 'tea' },
  { year: 'Today', title: 'Sri Lanka\'s trusted auction authority', description: 'Mandated by the Sri Lanka Tea Board, CBA continues to lead the nation\'s tea, rubber, coconut and spice auctions with unwavering integrity and excellence.', type: 'tea' },
]

export default function InteractiveTimeline() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fcfaf8] to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_12%,rgba(122,31,42,0.045),transparent_30%),radial-gradient(ellipse_at_92%_70%,rgba(201,162,39,0.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1060px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3"><span className="h-px w-10 bg-[var(--maroon)]" /><span className="rounded-full border border-[var(--maroon)]/15 bg-[var(--maroon)]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--maroon)]">Our journey</span><span className="h-px w-10 bg-[var(--maroon)]" /></div>
          <h2 className="mt-5 font-[family-name:var(--font-georgia)] text-3xl tracking-[-0.02em] text-[#24201f] sm:text-4xl">The story of <span className="text-[var(--maroon)]">Colombo Brokers Association</span></h2>
        </motion.div>

        <div className="relative">
          <div aria-hidden className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-[var(--maroon)] via-[#c9a227] to-[var(--maroon)] md:block" />
          <div className="space-y-7 md:space-y-10">
            {timelineEvents.map((event, index) => {
              const teaEvent = event.type === 'tea'
              return (
                <motion.article key={event.year} initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: index * 0.06 }} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`relative w-full md:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-3' : 'md:ml-auto md:pl-3'}`}>
                    <div className={`group relative overflow-hidden rounded-2xl border p-5 shadow-[0_10px_28px_rgba(55,31,28,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(55,31,28,0.12)] sm:p-6 ${teaEvent ? 'border-[var(--maroon)]/18 bg-white' : 'border-stone-200 bg-[#fdfcfb]'}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${teaEvent ? 'from-[var(--maroon)]/5 via-transparent to-transparent' : 'from-[#c9a227]/5 via-transparent to-transparent'} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                      <div className="relative flex items-start justify-between gap-4"><span className={`font-[family-name:var(--font-georgia)] text-3xl leading-none ${teaEvent ? 'text-[var(--maroon)]' : 'text-[#a57b1c]'}`}>{event.year}</span><span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] ${teaEvent ? 'bg-[var(--maroon)]/8 text-[var(--maroon)]' : 'bg-[#c9a227]/10 text-[#8c681b]'}`}>{teaEvent ? 'Tea Trade' : 'Rubber & Spices'}</span></div>
                      <h3 className="relative mt-4 text-lg font-semibold leading-snug text-[#282322]">{event.title}</h3><p className="relative mt-2 text-sm leading-6 text-stone-600">{event.description}</p>
                    </div>
                  </div>
                  <div aria-hidden className={`absolute left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(55,31,28,0.2)] md:block ${teaEvent ? 'bg-[var(--maroon)]' : 'bg-[#c9a227]'}`} />
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
