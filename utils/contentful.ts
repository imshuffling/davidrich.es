import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { enrichBlocks, enrichImage, enrichItems } from "@/utils/contentfulImage";
import type { PortfolioItem, Service, SideProject } from "@/types/contentful";

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

async function query<T>(graphql: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: graphql, variables }),
    next: { revalidate: 3600, tags: ["contentful"] },
  });

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
            otherProjects
            body { json }
            media { url }
            image {
              url(transform: { width: 800, height: 800 })
              fileName
              width
              height
            }
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
  const data = await query<{
    featuredProjectsCollection: { items: { itemCollection: { items: PortfolioItem[] } }[] };
    sideProjectsCollection: { items: SideProject[] };
  }>(HOME_QUERY);

  const items = data.featuredProjectsCollection.items[0]?.itemCollection.items ?? [];

  const portfolioCollection = await Promise.all(
    items.map(async (item) => ({
      ...item,
      description: item.body ? documentToPlainTextString(item.body.json) : undefined,
      image: await enrichImage(item.image, "card"),
    })),
  );

  return {
    portfolioCollection,
    sideProjectsCollection: data.sideProjectsCollection.items,
  };
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
        completed
        agency
        client
        timeframe
        industry
        blocksCollection {
          items {
            __typename
            ... on Image {
              image { url fileName width height }
            }
            ... on Video {
              image { url fileName width height }
              video { fileName url }
            }
            ... on TextLeft { title body }
            ... on TextArea { centerText title body }
            ... on TwoColumn {
              image { url fileName width height }
              imageFirst
              body
            }
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
  const data = await query<{ portfolioCollection: { items: PortfolioItem[] } }>(
    PORTFOLIO_QUERY,
    { slug },
  );
  const item = data.portfolioCollection.items[0];
  if (!item) return undefined;

  if (item.blocksCollection?.items) {
    item.blocksCollection.items = await enrichBlocks(item.blocksCollection.items);
  }
  if (item.footerCollection?.items) {
    item.footerCollection.items = await enrichItems(item.footerCollection.items, "card");
  }
  return item;
}

export async function getPortfolioSlugs(): Promise<string[]> {
  try {
    const data = await query<{ portfolioCollection: { items: { slug: string }[] } }>(`
      query {
        portfolioCollection {
          items { slug }
        }
      }
    `);
    return data.portfolioCollection.items.map((i) => i.slug);
  } catch {
    return [];
  }
}

export async function getOgImageForPortfolio(item: PortfolioItem) {
  const firstImageBlock = item.blocksCollection?.items.find(
    (block) => block.__typename === "Image",
  );
  if (!firstImageBlock) return undefined;
  return enrichImage(firstImageBlock.image, "og");
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
  const data = await query<{ servicesCollection: { items: Service[] } }>(SERVICES_QUERY);
  return data.servicesCollection.items;
}
