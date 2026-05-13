import { client, urlFor } from '@/lib/sanity'

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

async function getBrokers() {
  return await client.fetch(`*[_type == "broker"]`)
}

export default async function Brokers() {
  const brokers = sortBrokers(await getBrokers())

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-2xl font-bold mb-8 text-center">
          Member Broker Companies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {brokers.map((item: any) => (
            <div key={item._id} className="flex justify-center p-4 hover:scale-105 transition">
              {item.logo && (
                <img
                  src={urlFor(item.logo).width(150).url()}
                  alt={item.companyName}
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}