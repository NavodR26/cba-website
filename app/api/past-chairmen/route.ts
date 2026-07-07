import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const pastChairmen = await client.fetch(
      `*[_type == "pastChairman"] | order(year desc)`
    )
    return NextResponse.json(pastChairmen || [])
  } catch (error) {
    console.error('Error fetching past chairmen:', error)
    return NextResponse.json({ error: 'Failed to load past chairmen data' }, { status: 500 })
  }
}
