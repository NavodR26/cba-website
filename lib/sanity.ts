import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cr0yoj2y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface AboutPageContent {
  visionTitle?: string | null
  visionText?: string | null
  missionTitle?: string | null
  missionText?: string | null
}

const defaultAboutPageContent: AboutPageContent = {
  visionTitle: 'Our Vision',
  visionText:
    "To champion a modern, transparent, and sustainable tea auction platform that strengthens Sri Lanka's position as the world's premier tea trading hub.",
  missionTitle: 'Our Mission',
  missionText:
    "To foster a transparent, technology-driven, and sustainable marketplace that enhances stakeholder confidence, strengthens industry standards, and advances the global competitiveness of Sri Lanka's tea, rubber, coconut, and spice sectors.",
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const data = await client.fetch<AboutPageContent | null>(`*[_type == "aboutPage"][0]{
    visionTitle,
    visionText,
    missionTitle,
    missionText
  }`)

  return {
    visionTitle: data?.visionTitle?.trim() || defaultAboutPageContent.visionTitle,
    visionText: data?.visionText?.trim() || defaultAboutPageContent.visionText,
    missionTitle: data?.missionTitle?.trim() || defaultAboutPageContent.missionTitle,
    missionText: data?.missionText?.trim() || defaultAboutPageContent.missionText,
  }
}