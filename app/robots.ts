import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/__forms.html'],
    },
    sitemap: 'https://davidrich.es/sitemap.xml',
  };
}
