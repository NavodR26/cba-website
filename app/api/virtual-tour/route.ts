import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const virtualTour = await client.fetch(`
      *[_type == "virtualTour" && isActive == true]
    `)
    return NextResponse.json(virtualTour)
  } catch (error) {
    console.error('Error fetching virtual tour:', error)
    return NextResponse.json([], { status: 500 })
  }
}
