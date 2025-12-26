import type { MetadataRoute } from 'next';

async function getPortfolioSlugs() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            portfolioCollection(limit: 100) {
              items {
                slug
                sys {
                  publishedAt
                }
              }
            }
          }
        `,
      }),
      next: { revalidate: 3600 },
    }
  );

  if (!result.ok) {
    return [];
  }

  const { data } = await result.json();
  return data.portfolioCollection.items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://davidrich.es';
  const portfolioItems = await getPortfolioSlugs();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/what-i-can-do`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...portfolioItems.map((item: { slug: string; sys: { publishedAt: string } }) => ({
      url: `${baseUrl}/portfolio/${item.slug}`,
      lastModified: new Date(item.sys.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
