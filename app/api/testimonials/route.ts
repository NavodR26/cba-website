import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const testimonials = await client.fetch(`
      *[_type == "testimonial"] | order(displayOrder asc)
    `)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json([], { status: 500 })
  }
}
