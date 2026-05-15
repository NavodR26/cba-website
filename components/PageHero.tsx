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
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,31,42,0.055),transparent_42%,rgba(245,158,11,0.08))]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        {badge && (
          <div className={animated ? 'animate-fade-in-scale' : ''}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--maroon)]/10 bg-[var(--maroon)]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--maroon)] shadow-sm">
              {badge}
            </span>
          </div>
        )}

        <h1
          className={`mt-5 max-w-[calc(100vw-2rem)] text-2xl font-semibold leading-tight text-gray-900 min-[420px]:text-3xl sm:max-w-4xl sm:text-4xl md:text-5xl lg:text-5xl ${
            animated ? 'animate-fade-in-scale' : ''
          }`}
          style={{ animationDelay: animated ? '0.1s' : '0s', letterSpacing: 0 }}
        >
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

        {description && (
          <p
            className={`mt-4 max-w-[calc(100vw-2rem)] text-sm leading-relaxed text-gray-600 sm:max-w-3xl md:text-base ${
              animated ? 'animate-fade-in-scale' : ''
            }`}
            style={{ animationDelay: animated ? '0.2s' : '0s' }}
          >
            {description}
          </p>
        )}

        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className={`mt-8 flex flex-wrap gap-2 text-sm text-gray-600 ${
              animated ? 'animate-fade-in-scale' : ''
            }`}
            style={{ animationDelay: animated ? '0.3s' : '0s' }}
          >
            {breadcrumb.map((item, i) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-gray-900">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-gray-900">{item.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="text-gray-400">/</span>}
              </div>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
