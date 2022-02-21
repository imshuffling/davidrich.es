import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PortfolioCard from "../../components/PortfolioCard";
import ContentModules from "../../content-modules";
import Head from "next/head";
import Favicon from "../../components/Favicon";

export default function PortfolioItem({ portfolioItem }) {
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
      <Head>
        <title>{title} - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Favicon />
      </Head>
      <section className="portfolio-item">
        <div className="portfolio-item__content">
          <div
            className="portfolio-item__copy"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div className="portfolio-item__who">
              {agency ? agency : "Mirum"}
            </div>
            <h1>{title}</h1>
            <h2>{documentToReactComponents(body.json)}</h2>
          </div>
        </div>

        <div
          className="portfolio-wrapper"
          data-aos="fade-in"
          data-aos-once="true"
          data-aos-delay="500"
        >
          <div className="portfolio-info">
            {client && (
              <div className="portfolio-info__item">
                <span>Client</span>
                <span>
                  <strong>{client}</strong>
                </span>
              </div>
            )}

            {completed && (
              <div className="portfolio-info__item">
                <span>Completed</span>
                <span>
                  <strong>{completed}</strong>
                </span>
              </div>
            )}

            {timeframe && (
              <div className="portfolio-info__item">
                <span>Timeframe</span>
                <span>
                  <strong>{timeframe}</strong>
                </span>
              </div>
            )}

            {link && (
              <div className="portfolio-info__item">
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
        {blocksCollection && (
          <ContentModules blocksCollection={blocksCollection} />
        )}
        {link && (
          <p>
            <span role="img" alt="Finger emoji" aria-label="Finger">
              👉{" "}
            </span>
            <a target="_blank" rel="noopener noreferrer" href={`//${link}`}>
              Visit website
            </a>
          </p>
        )}
      </section>
      {footerCollection && (
        <section className="other-projects">
          <h3>Other projects</h3>
          <div id="cards">
            {footerCollection.items.map((item) => (
              <PortfolioCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  const { portfolioItem } = params;

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
                body {
                  json
                }
                slug
                link
                completed
                agency
                client
                timeframe
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
        variables: {
          slug: portfolioItem,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const [portfolioData] = data.portfolioCollection.items;

  return {
    props: { portfolioItem: portfolioData },
  };
}

export const getStaticPaths = async () => {
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
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const portfolioSlugs = data.portfolioCollection.items;

  const paths = portfolioSlugs.map(({ slug }) => {
    return {
      params: { portfolioItem: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
