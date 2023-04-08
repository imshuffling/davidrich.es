import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import ContentModules from "../content-modules";
import { GatsbyImage } from "gatsby-plugin-image";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

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

  const breakpoints = useBreakpoint();

  const Bold = ({ children }) => <strong>{children}</strong>;
  const Text = ({ children }) => <h2>{children}</h2>;

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
        />
      ),
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

            {agency && (
              <div className="portfolio-info__item">
                <span>Agency</span>
                <span>
                  <strong>{agency}</strong>
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
                <div className="card__image">
                  <GatsbyImage
                    image={item.image.gatsbyImageData}
                    alt={item.title}
                    lazy="eager"
                    style={{
                      position: "unset",
                      height: "100%",
                    }}
                  />
                  {item.media && !breakpoints.sm && (
                    <video loop muted autoPlay playsInline controls="muted">
                      <source src={item.media.file.url} type="video/mp4" />
                      <track kind="captions" />
                    </video>
                  )}
                </div>
                <div className="card__details">
                  <div className="card__content">
                    {/* <span>{item.agency ? item.agency : "Mirum"}</span> */}
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
            width: 800
            formats: [AUTO, WEBP, AVIF]
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
                formats: [AUTO, WEBP, AVIF]
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
                formats: [AUTO, WEBP, AVIF]
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
          formats: [AUTO, WEBP, AVIF]
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
