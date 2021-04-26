import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import ContentModules from "../content-modules";
import { GatsbyImage } from "gatsby-plugin-image";

const PortfolioPost = ({ data }) => {
  const {
    title,
    body,
    link,
    completed,
    agency,
    client,
    timeframe,
    blocks,
    footer,
  } = data.contentfulPortfolio;

  const Bold = ({ children }) => <strong>{children}</strong>;
  const Text = ({ children }) => <h2>{children}</h2>;

  // <div
  //   dangerouslySetInnerHTML={{
  //     __html: `<img data-aos="fade-in" data-aos-once="true" src="${fields.file["en-GB"].url}" width="${fields.file["en-GB"].details.image.width}" height="${fields.file["en-GB"].details.image.height}" loading="lazy" alt="${fields.title["en-GB"]}"/>`
  //   }}
  // />

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: { fields },
        },
      }) => (
        <GatsbyImage
          src={fields.file["en-GB"].url}
          alt={fields.file["en-GB"].fileName}
        /> // Not sure if this is working... still in testing
      ),
      // TODO - use gatsby image
    },
    renderText: (text) =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
  };

  return (
    <Layout>
      <Helmet>
        <title>{title} - David Riches</title>
      </Helmet>
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
            {renderRichText(body, options)}
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
        {blocks && <ContentModules blocks={blocks} />}
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

      {footer && (
        <section className="other-projects">
          <h3>Other projects</h3>
          <div id="cards">
            {footer.map((item, i) => (
              <Link to={`/${item.slug}`} className="card" key={item.id}>
                <div
                  className="card__image"
                >
                  <GatsbyImage
                    image={item.image.gatsbyImageData}
                    alt={item.image.file.fileName}
                    lazy="eager"
                    style={{
                      transform: "scale(1.3)",
                    }}
                    layout="fullWidth"
                  />
                  {item.media && (
                    <video loop muted autoPlay playsInline>
                      <source src={item.media.file.url} type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="card__details">
                  <div className="card__content">
                    <span>{item.agency ? item.agency : "Mirum"}</span>
                    <h2>{item.title}</h2>
                    <div>View project</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PortfolioPost;

export const pageQuery = graphql`
  query PortfolioPostQuery($slug: String!) {
    contentfulPortfolio(slug: { eq: $slug }) {
      title
      body {
        raw
      }
      footer {
        id
        title
        slug
        agency
        image {
              gatsbyImageData(
              width: 1000
              formats: [WEBP]
              placeholder: BLURRED
              quality: 80
              aspectRatio: 1.1
            )
        }
        body {
          raw
        }
        media {
          file {
            url
          }
        }
      }
      blocks {
        __typename
        ... on Node {
          ... on ContentfulImage {
            image {
              title
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [WEBP]
                placeholder: BLURRED
              )
              description
              file {
                url
                fileName
              }
            }
            lazyLoad
          }
          ... on ContentfulVideo {
            image {
              description
              file {
                url
                fileName
              }
            }
            video {
              description
              file {
                url
              }
            }
          }
          ... on ContentfulTextLeft {
            id
            title
            body {
              id
              childMarkdownRemark {
                id
                html
              }
            }
          }
          ... on ContentfulTextArea {
            id
            title
            centerText
            body {
              id
              childMarkdownRemark {
                id
                html
              }
            }
          }
          ... on ContentfulTwoColumn {
            image {
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [WEBP]
                placeholder: BLURRED
              )
              description
              file {
                url
                fileName
              }
            }
            imageFirst
            body {
              id
              childMarkdownRemark {
                id
                html
              }
            }
          }
        }
      }
      completed
      services
      agency
      client
      timeframe
      link
      image {
        file {
          url
        }
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [WEBP]
          placeholder: BLURRED
        )
      }
      media {
        file {
          url
        }
      }
    }
  }
`;
