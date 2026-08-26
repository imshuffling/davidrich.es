import { cacheLife, cacheTag } from "next/cache";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { BLOCKS_FRAGMENT, enrichBlocks } from "@/blocks/registry";
import { enrichImage, enrichItems } from "@/utils/contentfulImage";
import { deriveSeo } from "@/utils/metadata";
import { sanitize } from "@/utils/sanitize";
import type { ContentfulImage, PortfolioItem, Service, SideProject } from "@/types/contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_KEY = process.env.CONTENTFUL_ACCESS_KEY;
if (!SPACE_ID || !ACCESS_KEY) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_KEY environment variable");
}

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/master`;
const QUERY_TIMEOUT_MS = 8000;

async function query<T>(graphql: string, variables?: Record<string, unknown>): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), QUERY_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: graphql, variables }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Contentful ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Contentful GraphQL: ${JSON.stringify(json.errors).slice(0, 200)}`);
  }
  return json.data as T;
}

const HOME_QUERY = `
  query {
    featuredProjectsCollection(limit: 10) {
      items {
        itemCollection {
          items {
            title
            slug
            client
            agency
            industry
            body { json }
            media { url }
            image { url fileName width height }
          }
        }
      }
    }
    sideProjectsCollection(limit: 10) {
      items {
        title
        description
        link
        githubUrl
      }
    }
  }
`;

export async function getHome(): Promise<{
  portfolioCollection: PortfolioItem[];
  sideProjectsCollection: SideProject[];
}> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  const data = await query<{
    featuredProjectsCollection: { items: { itemCollection: { items: PortfolioItem[] } }[] };
    sideProjectsCollection: { items: SideProject[] };
  }>(HOME_QUERY);

  const items = data.featuredProjectsCollection.items[0]?.itemCollection.items ?? [];

  const portfolioCollection = await Promise.all(
    items.map(async (item, index) => ({
      ...item,
      body: undefined,
      title: sanitize(item.title) ?? item.title,
      // Only the first (large) card renders a description
      description:
        index === 0 && item.body ? documentToPlainTextString(item.body.json) : undefined,
      image: await enrichImage(item.image, "card"),
    })),
  );

  const sideProjectsCollection = data.sideProjectsCollection.items.map((p) => ({
    ...p,
    title: sanitize(p.title) ?? p.title,
    description: sanitize(p.description),
  }));

  return { portfolioCollection, sideProjectsCollection };
}

const PORTFOLIO_QUERY = `
  query GetPortfolioItem($slug: String!) {
    portfolioCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        seoTitle
        body { json }
        slug
        link
        agency
        client
        industry
        services
        sys {
          publishedAt
          firstPublishedAt
        }
        blocksCollection {
          items {
            __typename
            ${BLOCKS_FRAGMENT}
          }
        }
        footerCollection {
          items {
            title
            slug
            link
            agency
            industry
            image { url fileName width height }
            media { url }
          }
        }
      }
    }
  }
`;

export async function getPortfolio(slug: string): Promise<PortfolioItem | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  const data = await query<{ portfolioCollection: { items: PortfolioItem[] } }>(
    PORTFOLIO_QUERY,
    { slug },
  );
  const item = data.portfolioCollection.items[0];
  if (!item) return undefined;

  const [blocks, footerItems] = await Promise.all([
    item.blocksCollection?.items ? enrichBlocks(item.blocksCollection.items) : undefined,
    item.footerCollection?.items ? enrichItems(item.footerCollection.items, "card") : undefined,
  ]);

  return {
    ...item,
    title: sanitize(item.title) ?? item.title,
    ...(blocks && { blocksCollection: { items: blocks } }),
    ...(footerItems && {
      footerCollection: {
        items: footerItems.map((p) => ({ ...p, title: sanitize(p.title) ?? p.title })),
      },
    }),
  };
}

export interface PortfolioSlugEntry {
  slug: string;
  publishedAt?: string;
}

export async function getPortfolioSlugs(): Promise<PortfolioSlugEntry[]> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  const data = await query<{
    portfolioCollection: { items: { slug: string; sys?: { publishedAt?: string } }[] };
  }>(`
    query {
      portfolioCollection(limit: 100) {
        items {
          slug
          sys { publishedAt }
        }
      }
    }
  `);
  return data.portfolioCollection.items.map((i) => ({
    slug: i.slug,
    publishedAt: i.sys?.publishedAt,
  }));
}

export interface PortfolioSeo {
  plainTitle: string;
  description: string;
  pageUrl: string;
  ogImage?: ContentfulImage;
}

export async function portfolioSeo(slug: string): Promise<PortfolioSeo | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  const item = await getPortfolio(slug);
  if (!item) return undefined;

  const firstImageBlock = item.blocksCollection?.items.find(
    (block) => block.__typename === "Image",
  );
  return {
    ...deriveSeo(item),
    ...(firstImageBlock && { ogImage: await enrichImage(firstImageBlock.image, "og") }),
  };
}

const SERVICES_QUERY = `
  {
    servicesCollection {
      items {
        title
        body { json }
      }
    }
  }
`;

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  const data = await query<{ servicesCollection: { items: Service[] } }>(SERVICES_QUERY);
  return data.servicesCollection.items;
}
