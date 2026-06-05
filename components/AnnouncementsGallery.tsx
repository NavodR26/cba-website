import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'

async function getAnnouncements() {
  try {
    return await client.fetch(
      `*[_type == "announcement"] | order(date desc)[0...5]{
        _id, title, date, description,
        "fileUrl": file.asset->url,
        "fileName": file.asset->originalFilename
      }`
    )
  } catch (error) {
    console.warn('Failed to fetch announcements:', error)
    return []
  }
}

async function getGallery() {
  try {
    return await client.fetch(
      `*[_type == "gallery"] | order(date desc)[0...4]{
        _id, eventTitle, date, description, images
      }`
    )
  } catch (error) {
    console.warn('Failed to fetch gallery:', error)
    return []
  }
}

function formatDate(d: any) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

export default async function AnnouncementsGallery() {
  const announcements = await getAnnouncements()
  const galleries = await getGallery()

  // Flatten all images from all gallery albums
  const allImages = galleries.flatMap((gallery: any) => gallery.images || []).slice(0, 4)

  return (
    <section
      id="announcements"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto grid gap-10 lg:grid-cols-2">
        {/* ANNOUNCEMENTS */}
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Latest Announcements
            </h2>
            <Link
              href="/resources"
              className="text-sm font-semibold text-[var(--maroon)] hover:underline"
            >
              View all →
            </Link>
          </div>

          {announcements.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No announcements yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {announcements.map((item: any) => (
                <li
                  key={item._id}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[var(--maroon)]/40 hover:shadow-md transition min-w-0"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center shrink-0">
                    <DocIcon />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base truncate">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDate(item.date)}
                    </p>
                  </div>

                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download={item.fileName || true}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--maroon)] text-white whitespace-nowrap hover:opacity-90 transition"
                    >
                      <DownloadIcon /> PDF
                    </a>
                  ) : (
                    <span className="shrink-0 text-xs text-gray-400 italic px-2">
                      No file
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* GALLERY */}
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Gallery Highlights
            </h2>
            <Link
              href="/gallery"
              className="text-sm font-semibold text-[var(--maroon)] hover:underline"
            >
              View all →
            </Link>
          </div>

          {allImages.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allImages.map((img: any, i: number) => (
                <figure
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 aspect-[4/3] group"
                >
                  <img
                    src={urlFor(img).width(800).url()}
                    className="w-full h-full object-contain transition duration-500 group-hover:scale-[1.02]"
                    alt=""
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                </figure>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">
              No gallery items yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
