import './globals.css'
import type { Viewport } from 'next'
import CursorDot from '@/components/CursorDot'
import ProtectCopy from '@/components/ProtectCopy'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import GavelLoader from '@/components/GavelLoader'
import PageTransition from '@/components/PageTransition'

export const metadata = {
  title: "The Colombo Brokers' Association",
  description:
    "The Colombo Brokers’ Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
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
      <body className="bg-white text-gray-800 font-sans antialiased overflow-x-hidden">
        <ScrollProgress />
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
              sameAs: [
                'https://www.facebook.com/',
                'https://twitter.com/',
              ],
              description:
                "The Colombo Brokers' Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
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
          </SmoothScroll>
        </PageTransition>
      </body>
    </html>
  )
}
