import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Multiple reliable sources with fallback
const SOURCES = [
  'https://api.exchangerate-api.com/v4/latest/USD',
  'https://open.er-api.com/v6/latest/USD',
  'https://api.frankfurter.app/latest?from=USD&to=LKR',
]

export const revalidate = 300 // Update every 5 minutes to reduce API calls

export async function GET() {
  for (const url of SOURCES) {
    try {
      const response = await fetch(url, { 
        next: { revalidate },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })
      if (!response.ok) continue

      const data = await response.json()
      const rate = Number(data?.rates?.LKR)

      if (Number.isFinite(rate) && rate > 0) {
        return NextResponse.json({
          base: 'USD',
          quote: 'LKR',
          rate,
          source: url,
          updatedAt: data?.time_last_update_utc ?? data?.date ?? new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('[exchange-rate] source failed', url, error)
    }
  }

  return NextResponse.json(
    { error: 'USD/LKR exchange rate is temporarily unavailable' },
    { status: 503 }
  )
}
