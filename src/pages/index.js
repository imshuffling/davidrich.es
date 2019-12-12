import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default (props) => (
  <Layout>
    <section>
        <h1>Hello I'm David. <span role="img" aria-label="Waving hand">👋</span></h1>
        <h2>
          <span className="intro">A Front-end developer &amp; part-time hockey player <span role="img" aria-label="Hockey stick">🏑</span> from London. <span role="img" aria-label="United Kingdom Union Jack">🇬🇧</span></span>
          I like making things on the web, <AnchorLink offset='30' data-scroll href="#cards">view my portfolio</AnchorLink> or <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/imshuffling">follow me on Github.</a></h2>
        <h3>This site is built with <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org/">Gatsby.js</a> and powered by <a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/">Contentful.</a></h3>
      <div id="cards">
        {props.data.allContentfulPortfolio.edges.map((edge) => <PortfolioPost key={edge.node.id} node={edge.node} />)}
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

  if (node.otherProjects == null) {
    return (
      <div className="card">
          <div className="card__image" style={{
            backgroundImage: `url(${node.image.file.url})`,
          }}>
          {node.media !== null &&
            <video loop muted autoPlay playsInline>
              <source src={node.media.file.url} type="video/mp4" />
            </video>
          }
          </div>
          <div className="card__details">
              <div className="card__content">
                <h3>{node.title}</h3>
                {documentToReactComponents(node.body.json, options)}
              </div>
          </div>
      </div>
    )
  } else {
    return (
      ''
    )
  }
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
      },
      renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  }

  if (node.otherProjects !== null) {
    return (
      <div>
        <h3>{node.title}</h3>
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
        allContentfulPortfolio(
            sort: {
                fields: [sortOrder], order: ASC
            }
        ) {
            edges {
                node {
                    id
                    title
                    tag
                    slug
                    sortOrder
                    otherProjects
                    createdAt(formatString: "MMMM DD, YYYY")
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
`
