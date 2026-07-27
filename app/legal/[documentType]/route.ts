import { client } from '@/lib/sanity'

const documentTypes = {
  'privacy-policy': 'privacyPolicy',
  'terms-of-use': 'termsOfUse',
} as const

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ documentType: string }> }
) {
  const { documentType } = await params
  const legalType = documentTypes[documentType as keyof typeof documentTypes]

  if (!legalType) return new Response('Document not found.', { status: 404 })

  const document = await client.fetch<{ pdfUrl?: string } | null>(
    `*[_type == "legalDocument" && documentType == $legalType][0]{ "pdfUrl": pdfFile.asset->url }`,
    { legalType }
  )

  if (!document?.pdfUrl) return new Response('Document not found.', { status: 404 })

  try {
    const pdf = await fetch(document.pdfUrl)
    if (!pdf.ok || !pdf.body) return new Response('Unable to load the document.', { status: 502 })

    return new Response(pdf.body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${documentType}.pdf"`,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new Response('Unable to load the document.', { status: 502 })
  }
}
