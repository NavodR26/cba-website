import Navbar from '@/components/Navbar'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import PageHeroPremium from '@/components/PageHeroPremium'
import MembersSubNav from '@/components/MembersSubNav'
import CommodityPillars from '@/components/CommodityPillars'
import MembershipBenefits from '@/components/MembershipBenefits'
import BrokersDirectoryClient from '@/components/BrokersDirectoryClient'
import PastChairmenGrid from '@/components/PastChairmenGrid'
import Reveal from '@/components/Reveal'
import { client, urlFor } from '@/lib/sanity'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "Members | The Colombo Brokers' Association",
  description:
    "Explore CBA member firms, board directors, office bearers, partner institutions and past chairmen.",
  openGraph: {
    title: "Members | The Colombo Brokers' Association",
    description:
      "Explore CBA member firms, board directors, office bearers, partner institutions and past chairmen.",
  },
}

async function getCommittee() {
  return await client.fetch(`*[_type == "committee"]`)
}
async function getBrokers() {
  return await client.fetch(`*[_type == "broker"]`)
}
async function getPartnerInstitutions() {
  return await client.fetch(`*[_type == "partnerInstitution"]`)
}

const BROKER_ORDER = [
  'John Keells PLC',
  'Forbes & Walker Tea Brokers (Pvt) Ltd',
  'Bartleet Produce Marketing (Pvt) Ltd',
  'Ceylon Tea Brokers PLC',
  'Eastern Brokers Ltd',
  'Mercantile Produce Brokers (Pvt) Ltd',
  'Asia Siyaka Commodities PLC',
  'Lanka Commodity Brokers Ltd',
]

function normalizeCompanyName(name?: string) {
  return (name || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\b(limited|ltd)\b/g, 'ltd')
    .replace(/\b(private|pvt)\b/g, 'pvt')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function sortBrokers(arr: any[]) {
  const rank = new Map(BROKER_ORDER.map((name, index) => [normalizeCompanyName(name), index]))

  return [...arr].sort((a, b) => {
    const aName = normalizeCompanyName(a.companyName)
    const bName = normalizeCompanyName(b.companyName)
    const aRank = rank.has(aName) ? rank.get(aName)! : 999
    const bRank = rank.has(bName) ? rank.get(bName)! : 999

    if (aRank !== bRank) return aRank - bRank
    return (a.companyName || '').localeCompare(b.companyName || '')
  })
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

function isChairmanRole(role?: string) {
  if (!role) return false
  const normalized = role.toLowerCase()
  return (
    (normalized.includes('chairman') && !normalized.includes('deputy') && !normalized.includes('vice')) ||
    normalized.includes('president')
  )
}

function sortCommittee(arr: any[]) {
  return [...arr].sort((a, b) => {
    const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : Number.MAX_SAFE_INTEGER
    const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder

    const ra = rankFor(a.role)
    const rb = rankFor(b.role)
    if (ra !== rb) return ra - rb
    return (a.name || '').localeCompare(b.name || '')
  })
}

export default async function MembersPage() {
  const [members, brokerRows, partnerInstitutions, events] = await Promise.all([
    getCommittee(),
    getBrokers(),
    getPartnerInstitutions(),
    getEvents(),
  ])
  const brokers = sortBrokers(brokerRows)
  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
  }))

  return (
    <main id="main-content" className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHeroPremium
        badge="Members & Directory"
        title="Leadership & Member Directory"
        subtitle="Connecting accredited brokerage firms and industry professionals across Sri Lanka."
        backgroundImage="/members_hero.png"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Members' },
        ]}
      />

      <MembersSubNav />

      <CommodityPillars />

      {/* LEADERSHIP SECTIONS */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100"
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
                The Leadership
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                Board of Directors &amp; Office Bearers
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
              const directors = sorted.filter(
                (m) => rankFor(m.role) === 999 || isChairmanRole(m.role)
              )
              const officers = sorted.filter(
                (m) => rankFor(m.role) < 999 && !isChairmanRole(m.role)
              )
              return (
                <div className="space-y-16">
                  {/* SECTION 1: BOARD OF DIRECTORS */}
                  {directors.length > 0 && (
                    <div id="directors" className="scroll-mt-32">
                      <Reveal>
                        <SectionDivider label="Board of Directors" maroon />
                      </Reveal>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

                  {/* SECTION 2: OFFICE BEARERS */}
                  {officers.length > 0 && (
                    <div id="committee" className="scroll-mt-32 pt-4">
                      <Reveal>
                        <SectionDivider label="Office Bearers" />
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
                </div>
              )
            })()
          )}
        </div>
      </section>

      {/* SECTION 3: SUPPORTING INSTITUTIONS */}
      <section
        id="partners"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 scroll-mt-32"
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
                Association Ecosystem
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                Supporting Institutions
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                Banks, audit firms, legal support, logistics, insurance, and other vital institutional partners driving our industry forward.
              </p>
            </div>
          </Reveal>

          {partnerInstitutions.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-8">
              Partner institutions will appear here soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {partnerInstitutions.map((item: any, i: number) => (
                <Reveal key={item._id} delay={i * 50}>
                  <PartnerCard 
                    name={item.name} 
                    category={item.category} 
                    logo={item.logo ? urlFor(item.logo).url() : undefined}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <MembershipBenefits />

      {/* MEMBER FIRMS (was "Brokers Directory") */}
      <section
        id="brokers"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100 scroll-mt-32"
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs font-semibold uppercase tracking-wider">
                Member Firms
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                Broker Companies
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                Leading broker firms specialising in Sri Lanka&rsquo;s tea, rubber,
                coconut and spices auctions.
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

    {/* PAST CHAIRMEN GRID */}
    <PastChairmenGrid />

      <Footer />
    </main>
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
    <div className="flex items-center gap-3 mb-8">
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

function PartnerCard({ name, category, logo }: { name: string; category: string; logo?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300 h-full">
      {logo ? (
        <img src={logo} alt={name} className="h-12 w-auto mb-4 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition" />
      ) : (
        <div className="h-12 w-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mb-4 shadow-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M9 3v18" />
          </svg>
        </div>
      )}
      <h3 className="text-sm font-bold text-gray-900 leading-tight">{name}</h3>
      <p className="text-xs text-gray-500 mt-1">{category}</p>
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
    <article className={`group relative bg-white rounded-xl border p-4 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full ${
      isChairman ? 'border-[var(--maroon)] ring-1 ring-[var(--maroon)]/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className={`relative overflow-hidden rounded-lg bg-gray-50 shrink-0 ${featured ? 'aspect-[4/3]' : 'aspect-square'}`}>
        {item.photo ? (
          <img
            src={urlFor(item.photo).width(400).height(featured ? 300 : 400).url()}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
            alt={item.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-200 font-bold bg-gradient-to-br from-gray-50 to-gray-100">
            {item.name?.charAt(0) || '?'}
          </div>
        )}
        {item.role && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`inline-flex px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md shadow-sm ${
              isChairman ? 'bg-[var(--maroon)] text-white' : 'bg-white/95 text-gray-700 border border-gray-100'
            }`}>
              {item.role}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow text-center px-1">
        <h3 className={`font-bold text-gray-900 leading-tight ${featured ? 'text-lg' : 'text-base'}`}>
          {item.name}
        </h3>
        {item.company && (
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
            {item.company}
          </p>
        )}
      </div>
    </article>
  )
}
