import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import PortfolioCard from "@/components/PortfolioCard";
import Blocks from "@/blocks";
import type { Metadata } from "next";
import type { PortfolioItem } from "@/types/contentful";

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
  return data.portfolioCollection.items[0];
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
  const seoDescription = documentToPlainTextString(portfolioItem.body.json);

  return {
    title: portfolioItem.seoTitle,
    description: seoDescription,
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { portfolioItem: slug } = await params;
  const portfolioItem = await getPortfolioItem(slug);

  const {
    title,
    link,
    completed,
    agency,
    client,
    timeframe,
    body,
    footerCollection,
    blocksCollection,
  } = portfolioItem;

  return (
    <>
      <section className="portfolio-item">
        <div className="portfolio-item__content">
          <div
            className="portfolio-item__copy"
            data-aos="fade-in"
            data-aos-once="true"
          >
            <div className="portfolio-item__who">
              {agency ? agency : "Mirum"}
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
            <h2>{documentToReactComponents(body.json)}</h2>
          </div>
        </div>

        <div className="portfolio-wrapper">
          <div className="portfolio-info">
            {client && (
              <div
                className="portfolio-info__item"
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-delay="200"
              >
                <span>Client</span>
                <span>
                  <strong>{client}</strong>
                </span>
              </div>
            )}

            {completed && (
              <div
                className="portfolio-info__item"
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-delay="300"
              >
                <span>Completed</span>
                <span>
                  <strong>{completed}</strong>
                </span>
              </div>
            )}

            {timeframe && (
              <div
                className="portfolio-info__item"
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-delay="400"
              >
                <span>Timeframe</span>
                <span>
                  <strong>{timeframe}</strong>
                </span>
              </div>
            )}

            {link && (
              <div
                className="portfolio-info__item"
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-delay="500"
              >
                <span>Website</span>
                <span>
                  <strong>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://${link}`}
                    >
                      {link}
                    </a>
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>
        {blocksCollection && <Blocks blocksCollection={blocksCollection} />}
        {link && (
          <p>
            <span role="img" aria-label="Finger">
              👉{" "}
            </span>
            <a target="_blank" rel="noopener noreferrer" href={`//${link}`}>
              Visit website
            </a>
          </p>
        )}
      </section>
      {footerCollection && footerCollection.items.length > 0 && (
        <section className="other-projects">
          <h3>Other projects</h3>
          <div id="cards">
            {footerCollection.items.map((item, index) => (
              <PortfolioCard
                key={item.slug}
                item={item}
                index={index}
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
