import { client, urlFor } from '@/lib/sanity'

async function getChairman() {
  return await client.fetch(`*[_type == "chairman"][0]`)
}

export default async function Chairman() {
  const data = await getChairman()

  if (!data) return null

  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        {data.photo && (
          <img
            src={urlFor(data.photo).width(400).url()}
            alt={data.name}
            className="rounded-lg shadow-lg"
          />
        )}

        {/* Content */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Chairman’s Message
          </h2>

          <p className="text-gray-600 mb-4">
            {data.message}
          </p>

          <p className="font-semibold text-[var(--maroon)]">
            {data.name}
          </p>

          <p className="text-sm text-gray-500">
            {data.designation}
          </p>
        </div>

      </div>
    </section>
  )
}