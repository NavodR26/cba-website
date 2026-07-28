import './globals.css'
import type { Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import CursorDot from '@/components/CursorDot'
import ProtectCopy from '@/components/ProtectCopy'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import HeaderScrollController from '@/components/HeaderScrollController'
import GavelLoader from '@/components/GavelLoader'
import PageTransition from '@/components/PageTransition'
import BackToTop from '@/components/BackToTop'
import FloatingQuickDock from '@/components/FloatingQuickDock'
import CookieConsent from '@/components/CookieConsent'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata = {
  title: "The Colombo Brokers' Association | Sri Lanka Tea Auction Authority",
  description:
    "The Colombo Brokers' Association (CBA) is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka. Established 1904. Connecting brokers, advancing the tea industry.",
  keywords: ['Colombo Brokers Association', 'CBA', 'Sri Lanka tea auction', 'tea brokers', 'tea board', 'Colombo tea auction', 'Sri Lanka tea industry', 'tea trading', 'auction house'],
  authors: [{ name: 'The Colombo Brokers\' Association' }],
  creator: 'The Colombo Brokers\' Association',
  publisher: 'The Colombo Brokers\' Association',
  metadataBase: new URL('https://cbasl.lk'),
  alternates: {
    canonical: 'https://cbasl.lk',
  },
  openGraph: {
    title: "The Colombo Brokers' Association | Sri Lanka Tea Auction Authority",
    description:
      "Institutional auction authority, licensed by the Sri Lanka Tea Board to conduct Sri Lanka's tea auctions. Established 1904.",
    type: 'website',
    url: 'https://cbasl.lk',
    siteName: "The Colombo Brokers' Association",
    locale: 'en_LK',
    images: [
      {
        url: 'https://cbasl.lk/hero.png',
        width: 1200,
        height: 630,
        alt: 'Colombo Brokers Association - Sri Lanka Tea Auction Authority',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Colombo Brokers' Association | Sri Lanka Tea Auction Authority",
    description:
      "Institutional auction authority, licensed by the Sri Lanka Tea Board to conduct Sri Lanka's tea auctions.",
    images: ['https://cbasl.lk/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification',
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
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable} bg-white text-gray-800 font-sans antialiased overflow-x-hidden`}>
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
              url: 'https://cbasl.lk',
              logo: 'https://cbasl.lk/logo.png',
              description:
                "The Colombo Brokers' Association is the authority vested by the Sri Lanka Tea Board to conduct tea auctions in Sri Lanka.",
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  email: 'info@cbasl.lk',
                  areaServed: 'LK',
                  availableLanguage: ['English'],
                },
              ],
            }),
          }}
        />
        <PageTransition>
          <ErrorBoundary>
            <SmoothScroll>
              {children}
              <BackToTop />
              <FloatingQuickDock />
              <CookieConsent />
            </SmoothScroll>
          </ErrorBoundary>
        </PageTransition>
      </body>
    </html>
  )
}
