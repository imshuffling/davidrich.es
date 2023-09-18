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
            <span role="img" aria-label="Waving hand" className="wave">
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

        {/* {data.allContentfulCompanies.edges && (
          <Company node={data.allContentfulCompanies.edges[0].node} />
        )} */}

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
              <video loop muted autoPlay playsInline>
                <source src={item.media.file.url} type="video/mp4" />
                <track kind="captions" />
              </video>
            )}
          </div>
          <div className="card__details">
            <div className="card__content">
              {item.agency && <span>{item.agency}</span>}
              <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
              <div>View project</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

// const Company = ({ node }) => {
//   return (
//     <div className="company">
//       <h3>{node.administrativeTitle}</h3>
//       <div className="company_wrapper">
//         {node.companies.map((company, i) => (
//           <div className="item" key={i}>
//             <GatsbyImage
//               image={company.image.gatsbyImageData}
//               alt={company.title}
//               lazy="lazy"
//               objectFit="contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

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
    allContentfulCompanies {
      edges {
        node {
          administrativeTitle
          companies {
            title
            image {
              gatsbyImageData(
                height: 70
                formats: [AUTO, WEBP, AVIF]
                placeholder: BLURRED
                quality: 80
                aspectRatio: 4.3
              )
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
