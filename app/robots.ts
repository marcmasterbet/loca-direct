import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/espace'],
    },
    sitemap: 'https://www.loca-direct.fr/sitemap.xml',
  }
}
