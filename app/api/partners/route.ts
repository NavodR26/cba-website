import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const partners = await client.fetch(`
      *[_type == "partnerInstitution"] | order(name asc)
    `)
    return NextResponse.json(partners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json([], { status: 500 })
  }
}
