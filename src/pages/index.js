import React from 'react'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default (props) => (
  <Layout>
    <section>
      <div id="strapline">
        <h1>Hello I'm David. <span role="img" aria-label="Waving hand">👋</span></h1>
        <h2>
          <span className="intro">A Front-end developer &amp; part-time hockey player <span role="img" aria-label="Hockey stick">🏑</span> from London. <span role="img" aria-label="United Kingdom Union Jack">🇬🇧</span></span>
          I like making things on the web, <AnchorLink offset='30' data-scroll href="#cards">view my portfolio</AnchorLink> or <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/imshuffling">follow me on Github.</a>
        </h2>
        <h3>This site is built with <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org/">Gatsby.js</a> and powered by <a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/">Contentful.</a></h3>
      </div>
      <div id="cards">
        {props.data.allContentfulFeaturedProjects.edges.map((edge) => <PortfolioPost key={edge.node.id} node={edge.node} />)}
      </div>
      <div id="other-projects">
        <h2>Side Projects</h2>
        {props.data.allContentfulPortfolio.edges.map((edge) => <OtherProjects key={edge.node.id} node={edge.node} />)}
      </div>
    </section>
  </Layout>
)

const PortfolioPost = ({ node }) => {

    const Bold = ({ children }) => <strong>{children}</strong>
    const Text = ({ children }) => <p>{children}</p>

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        },
        renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
    }
    // console.log({node})
    return (
      <>
        {node.item.map((item, i) =>
          <div className="card" key={item.id}>
            <Link to={`/portfolio/${item.slug}`}>
              <div className="card__image" style={{
                backgroundImage: `url(${item.image.file.url})`,
              }}>
              {item.media !== null &&
                <video loop muted autoPlay playsInline>
                  <source src={item.media.file.url} type="video/mp4" />
                </video>
              }
              </div>
              <div className="card__details">
                  <div className="card__content">
                    <h3>{item.title}</h3>
                    {documentToReactComponents(item.body.json, options)}
                  </div>
              </div>
            </Link>
          </div>
        )}
      </>
    )
}


const OtherProjects = ({ node }) => {

  const Bold = ({ children }) => <strong>{children}</strong>
  const Text = ({ children }) => <p>{children}</p>

  const options = {
      renderMark: {
          [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
          [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
            <div dangerouslySetInnerHTML={{__html: `<img src="${fields.file['en-GB'].url}" alt="${fields.title['en-GB']}"/>`}} />,
      },
      renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  }

  //console.log(node.body.json)

  if (node.otherProjects === true) {
    return (
      <div key={node.id}>
        <h4>{node.title}</h4>
        {documentToReactComponents(node.body.json, options)}
      </div>
    )
  } else {
    return (
      ''
    )
  }
}

export const pageQuery = graphql`
    query pageQuery {
        allContentfulPortfolio {
            edges {
                node {
                    id
                    title
                    slug
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
`
