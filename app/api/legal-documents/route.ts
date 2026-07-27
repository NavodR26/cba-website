import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const legalDocuments = await client.fetch(`*[_type == "legalDocument"]`)
    return NextResponse.json(legalDocuments || [])
  } catch {
    return NextResponse.json({ error: 'Failed to load legal documents' }, { status: 500 })
  }
}
