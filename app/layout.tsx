import './globals.css'
import type { Viewport } from 'next'
import CursorDot from '@/components/CursorDot'
import ProtectCopy from '@/components/ProtectCopy'

export const metadata = {
  title: "The Colombo Brokers' Association",
  description:
    "The apex body representing brokers across Sri Lanka's tea, rubber, coconut and spices auction industries since 1904.",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7a1f2a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 font-sans antialiased">
        <CursorDot />
        <ProtectCopy />
        {children}
      </body>
    </html>
  )
}
