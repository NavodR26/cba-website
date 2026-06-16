'use client'

import Image from 'next/image'
import Link from 'next/link'

interface PageHeroPremiumProps {
  title: string
  subtitle?: string
  badge?: string
  backgroundImage: string
  breadcrumb?: { label: string; href?: string }[]
}

export default function PageHeroPremium({
  title,
  subtitle,
  badge,
  backgroundImage,
  breadcrumb,
}: PageHeroPremiumProps) {
  return (
    <section className="relative overflow-hidden h-[520px] lg:h-[570px] xl:h-[620px] 2xl:max-h-[650px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Professional Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,10,20,0.82)] via-[rgba(5,10,20,0.58)] to-[rgba(5,10,20,0.25)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 h-full flex items-center pt-20 sm:px-6 lg:px-8">
        <div className="max-w-[650px]">
          {badge && (
            <div className="animate-fade-in-scale">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--maroon)]/30 bg-[var(--maroon)]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-lg backdrop-blur-sm">
                {badge}
              </span>
            </div>
          )}

          <h1
            className="mt-5 text-3xl font-semibold leading-tight text-white min-[420px]:text-4xl sm:text-5xl md:text-[48px] lg:text-[52px] xl:text-[56px] animate-fade-in-scale"
            style={{ animationDelay: '0.1s', letterSpacing: 0 }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mt-4 text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed text-gray-200 animate-fade-in-scale"
              style={{ animationDelay: '0.15s' }}
            >
              {subtitle}
            </p>
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <nav
              className="mt-6 flex flex-wrap gap-2 text-[14px] sm:text-[15px] text-gray-300 animate-fade-in-scale"
              style={{ animationDelay: '0.2s' }}
            >
              {breadcrumb.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.href ? (
                    <Link href={item.href} className="transition hover:text-white hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-white">{item.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && <span className="text-gray-500">/</span>}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}
