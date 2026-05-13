import { NextResponse } from 'next/server'

const SOURCES = [
  'https://open.er-api.com/v6/latest/USD',
  'https://api.frankfurter.app/latest?from=USD&to=LKR',
]

export const revalidate = 300

export async function GET() {
  for (const url of SOURCES) {
    try {
      const response = await fetch(url, { next: { revalidate } })
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
