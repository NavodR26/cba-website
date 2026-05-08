import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import MembersSubNav from '@/components/MembersSubNav'
import CommodityPillars from '@/components/CommodityPillars'
import MembershipBenefits from '@/components/MembershipBenefits'
import BrokersDirectoryClient from '@/components/BrokersDirectoryClient'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'
import { client, urlFor } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

async function getCommittee() {
  return await client.fetch(`*[_type == "committee"]`)
}
async function getBrokers() {
  return await client.fetch(
    `*[_type == "broker"] | order(companyName asc)`
  )
}

// Office-bearer rank (lower = higher seniority).
const ROLE_RANK: { match: string; rank: number }[] = [
  { match: 'chairman', rank: 0 },
  { match: 'president', rank: 0 },
  { match: 'deputy chairman', rank: 1 },
  { match: 'vice chairman', rank: 2 },
  { match: 'vice president', rank: 2 },
  { match: 'secretary general', rank: 3 },
  { match: 'honorary secretary', rank: 4 },
  { match: 'secretary', rank: 5 },
  { match: 'treasurer', rank: 6 },
  { match: 'convener', rank: 7 },
  { match: 'convenor', rank: 7 },
]

function rankFor(role?: string) {
  if (!role) return 999
  const r = role.toLowerCase()
  let best = 999
  for (const { match, rank } of ROLE_RANK) {
    if (r.includes(match) && rank < best) best = rank
  }
  return best
}

function sortCommittee(arr: any[]) {
  return [...arr].sort((a, b) => {
    const ra = rankFor(a.role)
    const rb = rankFor(b.role)
    if (ra !== rb) return ra - rb
    return (a.name || '').localeCompare(b.name || '')
  })
}

export default async function MembersPage() {
  const [members, brokers, events] = await Promise.all([
    getCommittee(),
    getBrokers(),
    getEvents(),
  ])
  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
  }))

  return (
    <main className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHero
        badge="Members & Directory"
        title="Committee Members & Broker Directory"
        description="Meet the leadership committee driving the Association forward and explore our member broking firms across Sri Lanka's commodity auction industries."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Members' },
        ]}
      />

      <MembersSubNav />

      <CommodityPillars />

      {/* OFFICE BEARERS + BOARD OF DIRECTORS */}
      <section
        id="committee"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-32"
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
                The Leadership
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                Office Bearers &amp; Board of Directors
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                Representing the leading broker firms that uphold the standards
                of the Association.
              </p>
            </div>
          </Reveal>

          {members.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-8">
              Leadership members will appear here soon.
            </p>
          ) : (
            (() => {
              const sorted = sortCommittee(members)
              const officers = sorted.filter((m) => rankFor(m.role) < 999)
              const directors = sorted.filter((m) => rankFor(m.role) === 999)
              return (
                <div className="space-y-14">
                  {/* OFFICE BEARERS */}
                  {officers.length > 0 && (
                    <div>
                      <Reveal>
                        <SectionDivider label="Office Bearers" maroon />
                      </Reveal>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {officers.map((item: any, i: number) => (
                          <Reveal
                            key={item._id}
                            delay={i * 70}
                            distance={20}
                          >
                            <PersonCard item={item} featured />
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BOARD OF DIRECTORS */}
                  {directors.length > 0 && (
                    <div>
                      <Reveal>
                        <SectionDivider label="Board of Directors" />
                      </Reveal>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {directors.map((item: any, i: number) => (
                          <Reveal
                            key={item._id}
                            delay={i * 50}
                            distance={20}
                          >
                            <PersonCard item={item} />
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()
          )}
        </div>
      </section>

      <MembershipBenefits />

      {/* MEMBER FIRMS (was "Brokers Directory") */}
      <section
        id="brokers"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-32"
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
                Member Firms
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                Broker Companies
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                Leading broker firms specialising in Sri Lanka&rsquo;s tea, rubber,
                coconut and spices auction industries.
              </p>
            </div>
          </Reveal>

          {brokers.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-12">
              Broker firms will be listed here soon.
            </p>
          ) : (
            <Reveal>
              <BrokersDirectoryClient brokers={brokers} />
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Stat({
  value,
  suffix = '',
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  return (
    <div>
      <p className="text-3xl md:text-5xl font-bold text-[var(--maroon)] leading-none">
        <CountUp end={value} suffix={suffix} />
      </p>
      <p className="text-xs uppercase tracking-wider text-gray-500 mt-2">
        {label}
      </p>
    </div>
  )
}

function SectionDivider({
  label,
  maroon = false,
}: {
  label: string
  maroon?: boolean
}) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span
        className={`h-px flex-1 ${
          maroon
            ? 'bg-gradient-to-r from-transparent via-[var(--maroon)]/30 to-transparent'
            : 'bg-gray-200'
        }`}
      />
      <span
        className={`text-xs font-bold uppercase tracking-[0.25em] ${
          maroon ? 'text-[var(--maroon)]' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
      <span
        className={`h-px flex-1 ${
          maroon
            ? 'bg-gradient-to-r from-transparent via-[var(--maroon)]/30 to-transparent'
            : 'bg-gray-200'
        }`}
      />
    </div>
  )
}

function PersonCard({
  item,
  featured = false,
}: {
  item: any
  featured?: boolean
}) {
  const isChairman =
    (item.role || '').toLowerCase().includes('chairman') &&
    !(item.role || '').toLowerCase().includes('deputy') &&
    !(item.role || '').toLowerCase().includes('vice')

  return (
    <article
      className={`group relative bg-white rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
        isChairman
          ? 'border-[var(--maroon)] ring-2 ring-[var(--maroon)]/15'
          : featured
          ? 'border-[var(--maroon)]/20'
          : 'border-gray-200'
      }`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {item.photo ? (
          <img
            src={urlFor(item.photo).width(featured ? 600 : 400).url()}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
            alt={item.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300 font-bold">
            {item.name?.charAt(0) || '?'}
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Subtle shine on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-700"
        />

        {/* Role pill */}
        {item.role && (
          <span
            className={`absolute top-3 left-3 inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow ${
              isChairman
                ? 'bg-[var(--maroon)] text-white'
                : 'bg-white/95 text-[var(--maroon)]'
            }`}
          >
            {item.role}
          </span>
        )}

        {/* Name + company overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p
            className={`text-white font-bold leading-tight ${
              featured ? 'text-lg' : 'text-base'
            }`}
          >
            {item.name}
          </p>
          {item.company && (
            <p className="text-white/85 text-xs mt-1 line-clamp-1">
              {item.company}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
