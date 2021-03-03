import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout.js";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default ({ data }) => (
  <Layout>
    <section>
      <div id="strapline">
        <h1>
          Hello I'm David.{" "}
          <span role="img" aria-label="Waving hand">
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
      <div id="side-projects">
        <h2>Side projects</h2>
        {data.allContentfulPortfolio.edges.map((edge, i) => (
          <OtherProjects key={i} node={edge.node} />
        ))}
      </div>
    </section>
  </Layout>
);

const PortfolioPost = ({ node }) => {
  return (
    <>
      {node.item.map((item, i) => (
        <Link to={`/${item.slug}`} className="card" key={i}>
          <div
            className="card__image"
            style={{
              backgroundImage: `url(${item.image.file.url})`
            }}
          >
            {item.media !== null && (
              <video loop muted autoPlay playsInline>
                <source src={item.media.file.url} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="card__details">
            <div className="card__content">
              <span>Mirum</span>
              <h2>{item.title}</h2>
              <div>View project</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

const OtherProjects = ({ node }) => {
  if (node.otherProjects) {
    return (
      <div className="item" key={node.id}>
        <h4 className="item__title h3">{node.title}</h4>
        <div className="item__content">
          {documentToReactComponents(node.body.json)}
        </div>
      </div>
    );
  }
  return null;
};

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
            json
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
            otherProjects
            image {
              file {
                url
              }
            }
            body {
              json
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
  }
`;
