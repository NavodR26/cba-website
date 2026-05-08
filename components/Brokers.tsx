import { client, urlFor } from '@/lib/sanity'

async function getBrokers() {
  return await client.fetch(`*[_type == "broker"]`)
}

export default async function Brokers() {
  const brokers = await getBrokers()

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