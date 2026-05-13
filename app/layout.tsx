import './globals.css'
import type { Viewport } from 'next'
import CursorDot from '@/components/CursorDot'
import ProtectCopy from '@/components/ProtectCopy'

export const metadata = {
  title: "The Colombo Brokers' Association",
  description:
    "The apex body representing brokers across Sri Lanka's tea, rubber, coconut and spices auction industries since 1904.",
  metadataBase: new URL('https://cba.lk'),
  openGraph: {
    title: "The Colombo Brokers' Association",
    description:
      "Premium institutional representation for Sri Lanka's tea, rubber, coconut and spices auction brokers.",
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
                "Premium institutional representation for Sri Lanka's tea, rubber, coconut and spices auction brokers.",
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
        {children}
      </body>
    </html>
  )
}
