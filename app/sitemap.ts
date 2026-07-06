import type { MetadataRoute } from "next";
import { getPortfolioSlugs } from "@/utils/contentful";
import { SITE_URL } from "@/utils/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioItems = await getPortfolioSlugs();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/what-i-can-do`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...portfolioItems.map((item) => ({
      url: `${SITE_URL}/portfolio/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
