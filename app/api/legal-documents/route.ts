import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const legalDocuments = await client.fetch(`
      *[_type == "legalDocument"] | order(_updatedAt desc) {
        _id,
        documentType,
        title,
        effectiveDate,
        "pdfUrl": pdfFile.asset->url
      }
    `)
    return NextResponse.json(legalDocuments || [])
  } catch (error) {
    console.error('Error fetching legal documents:', error)
    return NextResponse.json({ error: 'Failed to load legal documents' }, { status: 500 })
  }
}
