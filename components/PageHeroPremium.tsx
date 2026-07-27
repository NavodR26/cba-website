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
    <section className="relative isolate min-h-[430px] overflow-hidden bg-slate-950 sm:min-h-[470px] lg:min-h-[540px]">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="hero-kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,27,0.94)_0%,rgba(8,15,27,0.78)_43%,rgba(8,15,27,0.30)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,10,19,0.75)_0%,transparent_42%)]" />
      </div>
      <div aria-hidden className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[var(--maroon)]/20 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 right-[12%] h-px w-[45%] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[430px] max-w-[1400px] items-end px-4 pb-10 pt-32 sm:min-h-[470px] sm:px-6 sm:pb-12 lg:min-h-[540px] lg:px-8 lg:pb-16">
        <div className="max-w-3xl">
          {badge && (
            <div className="animate-fade-in-scale">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md sm:px-4">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]" />
                {badge}
              </span>
            </div>
          )}

          <h1
            className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white min-[420px]:text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] animate-fade-in-scale"
            style={{ animationDelay: '0.1s', letterSpacing: 0 }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mt-5 max-w-2xl border-l-2 border-amber-300/80 pl-4 text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl animate-fade-in-scale"
              style={{ animationDelay: '0.15s' }}
            >
              {subtitle}
            </p>
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mt-7 flex flex-wrap items-center gap-2 text-xs text-slate-300 animate-fade-in-scale"
              style={{ animationDelay: '0.2s' }}
            >
              {breadcrumb.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.href ? (
                    <Link href={item.href} className="transition hover:text-white hover:underline underline-offset-4">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-white">{item.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && <span className="text-amber-300/70">/</span>}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}
