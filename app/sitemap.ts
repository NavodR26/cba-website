import { MetadataRoute } from 'next'

const BASE_URL = 'https://cba.lk'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/members`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },
  ]
}
