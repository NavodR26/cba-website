import Link from 'next/link'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  breadcrumb?: { label: string; href?: string }[]
  badge?: string
  animated?: boolean
}

export default function PageHero({
  title,
  subtitle,
  description,
  breadcrumb,
  badge,
  animated = true,
}: PageHeroProps) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient orbs */}
      <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--maroon)]/5 -translate-y-1/3 translate-x-1/3 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-300/5 translate-y-1/3 -translate-x-1/3 blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Badge */}
        {badge && (
          <div className={animated ? 'animate-fade-in-scale' : ''}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs uppercase tracking-[0.3em] font-semibold shadow-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className={`mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 max-w-4xl ${
          animated ? 'animate-fade-in-scale' : ''
        }`} style={{ animationDelay: animated ? '0.1s' : '0s' }}>
          {title}
          {subtitle && (
            <>
              <br />
              <span className="bg-gradient-to-r from-[var(--maroon)] to-amber-600 bg-clip-text text-transparent">
                {subtitle}
              </span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className={`mt-6 text-lg text-gray-600 max-w-3xl leading-relaxed ${
            animated ? 'animate-fade-in-scale' : ''
          }`} style={{ animationDelay: animated ? '0.2s' : '0s' }}>
            {description}
          </p>
        )}

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className={`mt-8 flex flex-wrap gap-2 text-sm text-gray-600 ${
            animated ? 'animate-fade-in-scale' : ''
          }`} style={{ animationDelay: animated ? '0.3s' : '0s' }}>
            {breadcrumb.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="hover:text-gray-900 transition">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-semibold">{item.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="text-gray-400">›</span>}
              </div>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
