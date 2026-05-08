import { client } from '@/lib/sanity'

async function getAnnouncements() {
  try {
    return await client.fetch(`*[_type == "announcement"] | order(date desc)[0...5]`)
  } catch (error) {
    console.warn('Failed to fetch announcements:', error)
    return []
  }
}

export default async function Announcements() {
  const announcements = await getAnnouncements()

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-2xl font-bold mb-8">
          Latest Announcements
        </h2>

        <div className="space-y-4">
          {announcements.map((item: any) => (
            <div key={item._id} className="p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition">
              
              <h3 className="font-semibold">{item.title}</h3>
              
              <p className="text-sm text-gray-500">
                {new Date(item.date).toDateString()}
              </p>

              <p className="text-gray-600 mt-2">
                {item.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}