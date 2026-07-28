import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const chairman = await client.fetch(`*[_type == "chairman"][0]`)
    return NextResponse.json(chairman || null)
  } catch (error) {
    console.error('Error fetching chairman:', error)
    return NextResponse.json({ error: 'Failed to load chairman data' }, { status: 500 })
  }
}
