import { Suspense } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import PortfolioFooter from "@/components/PortfolioFooter";
import PortfolioContent from "@/components/PortfolioContent";
import type { Metadata } from "next";
import type { PortfolioItem, ContentfulBlock } from "@/types/contentful";
import { getBlurDataURL } from "@/utils/getBlurDataURL";

type Props = {
  params: Promise<{ portfolioItem: string }>;
};

async function getPortfolioItem(slug: string): Promise<PortfolioItem> {
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
          query GetPortfolioItem($slug: String!) {
            portfolioCollection(
              where: {
                slug: $slug
              },
              limit: 1
            ) {
              items {
                title
                seoTitle
                body {
                  json
                }
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
                      __typename
                      image {
                        url
                        fileName
                        width
                        height
                      }
                    }
                    ... on Video {
                      __typename
                      image {
                        url
                        fileName
                        width
                        height
                      }
                      video {
                        fileName
                        url
                      }
                    }
                    ... on TextLeft {
                      __typename
                      title
                      body
                    }
                    ... on TextArea {
                      __typename
                      centerText
                      title
                      body
                    }
                    ... on TwoColumn {
                      __typename
                      image {
                        url
                        fileName
                        width
                        height
                      }
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
                    image {
                      url
                      width
                      height
                    }
                    media {
                      url
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!result.ok) {
    console.error(result);
    throw new Error('Failed to fetch portfolio item');
  }

  const { data } = await result.json();
  const item = data.portfolioCollection.items[0] as PortfolioItem;

  // Generate blur data URLs for images in blocks
  if (item.blocksCollection?.items) {
    item.blocksCollection.items = await Promise.all(
      item.blocksCollection.items.map(async (block: ContentfulBlock) => {
        if (block.__typename === "Image" && block.image) {
          return {
            ...block,
            image: {
              ...block.image,
              blurDataURL: await getBlurDataURL(block.image.url),
            },
          };
        }
        if (block.__typename === "TwoColumn" && block.image) {
          return {
            ...block,
            image: {
              ...block.image,
              blurDataURL: await getBlurDataURL(block.image.url),
            },
          };
        }
        if (block.__typename === "Video" && block.image) {
          return {
            ...block,
            image: {
              ...block.image,
              blurDataURL: await getBlurDataURL(block.image.url),
            },
          };
        }
        return block;
      })
    );
  }

  // Generate blur data URLs for footer images
  if (item.footerCollection?.items) {
    item.footerCollection.items = await Promise.all(
      item.footerCollection.items.map(async (footerItem) => ({
        ...footerItem,
        image: {
          ...footerItem.image,
          blurDataURL: await getBlurDataURL(footerItem.image.url),
        },
      }))
    );
  }

  return item;
}

export async function generateStaticParams() {
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
            portfolioCollection {
              items {
                slug
              }
            }
          }
        `,
      }),
    }
  );

  if (!result.ok) {
    return [];
  }

  const { data } = await result.json();
  const portfolioSlugs = data.portfolioCollection.items;

  return portfolioSlugs.map(({ slug }: { slug: string }) => ({
    portfolioItem: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { portfolioItem: slug } = await params;
  const portfolioItem = await getPortfolioItem(slug);
  const plainText = documentToPlainTextString(portfolioItem.body.json);
  const seoDescription = plainText.slice(0, 160);

  return {
    title: portfolioItem.seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `https://davidrich.es/portfolio/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://davidrich.es/portfolio/${slug}`,
      title: portfolioItem.seoTitle || portfolioItem.title,
      description: seoDescription,
      images: portfolioItem.image
        ? [
            {
              url: portfolioItem.image.url,
              width: portfolioItem.image.width,
              height: portfolioItem.image.height,
              alt: portfolioItem.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: portfolioItem.seoTitle || portfolioItem.title,
      description: seoDescription,
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { portfolioItem: slug } = await params;

  return (
    <>
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioContentWrapper slug={slug} />
      </Suspense>
      <Suspense fallback={<OtherProjectsSkeleton />}>
        <PortfolioFooterWrapper slug={slug} />
      </Suspense>
    </>
  );
}

async function PortfolioContentWrapper({ slug }: { slug: string }) {
  const portfolioItem = await getPortfolioItem(slug);
  return <PortfolioContent dataPromise={Promise.resolve(portfolioItem)} />;
}

async function PortfolioFooterWrapper({ slug }: { slug: string }) {
  const portfolioItem = await getPortfolioItem(slug);
  return <PortfolioFooter footerPromise={Promise.resolve(portfolioItem.footerCollection)} />;
}

function PortfolioSkeleton() {
  return (
    <section className="portfolio-item" style={{ opacity: 0.5 }}>
      <div className="portfolio-item__content">
        <div className="portfolio-item__copy">
          <div
            style={{
              width: "80px",
              height: "16px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          />
          <div
            style={{
              width: "60%",
              height: "48px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
              marginBottom: "24px",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "80px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      <div className="portfolio-wrapper">
        <div className="portfolio-info">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="portfolio-info__item">
              <div
                style={{
                  width: "60px",
                  height: "16px",
                  background: "var(--text-color)",
                  opacity: 0.1,
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  width: "100px",
                  height: "20px",
                  background: "var(--text-color)",
                  opacity: 0.1,
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "40px 0" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: "400px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
              marginBottom: "40px",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function OtherProjectsSkeleton() {
  return (
    <section className="other-projects">
      <h3>Other projects</h3>
      <div id="cards" style={{ opacity: 0.5 }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </section>
  );
}
