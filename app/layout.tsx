import './globals.css'
import type { Viewport } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import CursorDot from '@/components/CursorDot'
import ProtectCopy from '@/components/ProtectCopy'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import HeaderScrollController from '@/components/HeaderScrollController'
import GavelLoader from '@/components/GavelLoader'
import PageTransition from '@/components/PageTransition'
import BackToTop from '@/components/BackToTop'
import FloatingQuickDock from '@/components/FloatingQuickDock'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata = {
  title: "The Colombo Brokers' Association",
  description:
    "The Colombo Brokers' Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
  metadataBase: new URL('https://cba.lk'),
  openGraph: {
    title: "The Colombo Brokers' Association",
    description:
      "Institutional auction authority, licensed by the Sri Lanka Tea Board to conduct Sri Lanka's tea auctions.",
    type: 'website',
    url: 'https://cba.lk',
    images: [
      {
        url: 'https://cba.lk/hero.png',
        width: 1200,
        height: 630,
        alt: 'Colombo Brokers Association',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    sitemap: 'https://cba.lk/sitemap.xml',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#7a1f2a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} bg-white text-gray-800 font-sans antialiased overflow-x-hidden`}>
        <a href="#main-content" className="cba-skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <HeaderScrollController />
        <GavelLoader />
        <CursorDot />
        <ProtectCopy />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: "The Colombo Brokers' Association",
              url: 'https://cba.lk',
              logo: 'https://cba.lk/logo.png',
              description:
                "The Colombo Brokers' Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  email: 'info@cba.lk',
                  areaServed: 'LK',
                  availableLanguage: ['English'],
                },
              ],
            }),
          }}
        />
        <PageTransition>
          <SmoothScroll>
            {children}
            <BackToTop />
            <FloatingQuickDock />
          </SmoothScroll>
        </PageTransition>
      </body>
    </html>
  )
}
