import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const facilityShowcase = await client.fetch(`
      *[_type == "facilityShowcase"][0]{
        title,
        description,
        showcaseItems[]{
          _key,
          title,
          description,
          mediaType,
          image,
          video,
          displayOrder
        }
      }
    `)
    
    if (!facilityShowcase) {
      return NextResponse.json(null)
    }
    
    // Sort items by displayOrder
    const sortedItems = (facilityShowcase.showcaseItems || []).sort((a: any, b: any) => 
      (a.displayOrder || 999) - (b.displayOrder || 999)
    )
    
    return NextResponse.json({
      ...facilityShowcase,
      showcaseItems: sortedItems
    })
  } catch (error) {
    console.error('Error fetching facility showcase:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
