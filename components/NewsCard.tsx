import Link from 'next/link'

interface NewsCardProps {
  item: {
    _id: string
    title: string
    category: string
    source: string
    date: string
    summary: string
    thumbnail?: string
    externalUrl?: string
  }
  config?: {
    label: string
    color: string
    icon: string
  }
}

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function NewsCard({ item, config }: NewsCardProps) {
  const hasLink = Boolean(item.externalUrl)
  const innerContent = (
    <>
      {/* Thumbnail */}
      {item.thumbnail && (
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Category Badge */}
        {config && (
          <div className={`inline-flex w-fit px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold border ${config.color} mb-3`}>
            {config.icon} {config.label}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-3 mb-3 group-hover:text-[var(--maroon)] transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {item.summary}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
          <span className="font-medium">{item.source}</span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>

        {/* External link indicator */}
        {hasLink && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center group-hover:bg-[var(--maroon)] group-hover:text-white transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        )}
      </div>
    </>
  )

  const classes = "group relative h-full rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"

  if (hasLink && item.externalUrl) {
    return (
      <Link href={item.externalUrl} className={`${classes} block cursor-pointer`}>
        {innerContent}
      </Link>
    )
  }

  return (
    <article className={classes}>
      {innerContent}
    </article>
  )
}
