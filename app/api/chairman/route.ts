import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const chairman = await client.fetch(`*[_type == "chairman"][0]`)
    return NextResponse.json(chairman || null)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load chairman data' }, { status: 500 })
  }
}
