import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { GatsbyImage } from "gatsby-plugin-image";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

const Index = ({ data }) => {
  return (
    <Layout>
      <section>
        <div id="strapline">
          <h1>
            Hello I'm David.{" "}
            <span role="img" aria-label="Waving hand" class="wave">
              👋
            </span>
          </h1>
          <h2>
            <span className="intro">
              A Front-end developer &amp; part-time hockey player{" "}
              <span role="img" aria-label="Hockey stick">
                🏑
              </span>{" "}
              from London.
            </span>
            I like making things on the web,{" "}
            <AnchorLink offset="30" data-scroll href="#cards">
              view my portfolio
            </AnchorLink>{" "}
            or{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.github.com/imshuffling"
            >
              follow me on Github.
            </a>
          </h2>
          <h3>
            This site is built with{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.gatsbyjs.org/"
            >
              Gatsby.js
            </a>{" "}
            and powered by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.contentful.com/"
            >
              Contentful.
            </a>
          </h3>
        </div>
        <div id="cards">
          {data.allContentfulFeaturedProjects.edges.map((edge, i) => (
            <PortfolioPost key={i} node={edge.node} />
          ))}
        </div>

        {data.allContentfulSideProjects.edges && (
          <div id="side-projects">
            <h2>Side projects</h2>
            <div className="side-projects-wrapper">
              {data.allContentfulSideProjects.edges.map((edge, i) => (
                <SideProjects key={i} node={edge.node} />
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

const PortfolioPost = ({ node }) => {
  const breakpoints = useBreakpoint();

  return (
    <>
      {node.item.map((item, i) => (
        <Link to={`/${item.slug}`} className="card" key={i}>
          <div className="card__image">
            <GatsbyImage
              image={item.image.gatsbyImageData}
              alt={item.image.file.fileName}
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
              {item.agency && <span>{item.agency}</span>}
              <h2>{item.title}</h2>
              <div>View project</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

const SideProjects = ({ node }) => {
  return (
    <div className="item" key={node.id}>
      <div>
        <h3 className="item__title">{node.title}</h3>
        {node.description && (
          <div
            className="item__content"
            dangerouslySetInnerHTML={{
              __html: node.description.childMarkdownRemark.html,
            }}
          />
        )}
      </div>

      {node.link && (
        <span>
          <a target="_blank" rel="noopener noreferrer" href={node.link}>
            View Site
          </a>
        </span>
      )}

      {node.githubUrl && !node.link && (
        <span>
          <a target="_blank" rel="noopener noreferrer" href={node.githubUrl}>
            View Repo
          </a>
        </span>
      )}
    </div>
  );
};

export default Index;

export const pageQuery = graphql`
  query pageQuery {
    allContentfulPortfolio {
      edges {
        node {
          id
          title
          otherProjects
          createdAt(formatString: "MMMM DD, YYYY")
          body {
            raw
          }
        }
      }
    }
    allContentfulFeaturedProjects {
      edges {
        node {
          item {
            id
            title
            slug
            agency
            otherProjects
            image {
              gatsbyImageData(
                width: 800
                formats: [AUTO, WEBP, AVIF]
                placeholder: BLURRED
                quality: 80
                aspectRatio: 1.1
              )
              file {
                url
              }
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
        }
      }
    }
    allContentfulSideProjects {
      edges {
        node {
          __typename
          id
          title
          link
          githubUrl
          description {
            childMarkdownRemark {
              id
              html
            }
          }
        }
      }
    }
  }
`;
