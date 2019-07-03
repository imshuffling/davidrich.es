import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default (props) => (
  <Layout>
    <section id='home' className="animated fadeIn">
      <div className="heading-wrap">
        <h1 className="page-title">Hello I'm David.</h1>
        <h2 className="strap-line">
          A Front-end developer &amp; part-time hockey player from London.<br/>
          I like making things on the web, <AnchorLink offset='30' data-scroll href="#cards">view my portfolio</AnchorLink> or <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/imshuffling">follow me on Github.</a></h2>
        <h2 className="sub-strap-line">This site is built with <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org/">Gatsby.js</a> and powered by <a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/">Contentful.</a></h2>
      </div>
      <section id="cards">
        {props.data.allContentfulPortfolio.edges.map((edge) => <PortfolioPost key={edge.node.id} node={edge.node} />)}
      </section>
    </section>
  </Layout>
)

const PortfolioPost = ({ node }) => {
  console.log(node)

  const Bold = ({ children }) => <strong>{children}</strong>
  const Text = ({ children }) => <p>{children}</p>

  const options = {
      renderMark: {
          [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      },
  }


  return (
    <div className="card">
      <div className="card__head">
        <div className="card__image" style={{
          backgroundImage: `url(${node.image.file.url})`,
        }}>
        {node.media !== null &&
          <video loop muted autoPlay playsInline>
            <source src={node.media.file.url} type="video/mp4" />
          </video>
        }
        </div>
        <div className="card__author">
          <div className="author">
            <div className="author__content">
              <p className="author__header">{node.title}</p>
              <p className="author__subheader">{node.tag}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card__body">
        <h3 className="card__headline">{node.title}</h3>
        <div className="card__text">{documentToReactComponents(node.body.json, options)}</div>
      </div>

      <div className={"card__foot " + (node.link ? 'show' : 'hidden')}>
        <span className="card__link">
          {node.link !== null &&
            <a href={node.link} rel="noopener noreferrer" target="_blank">View site</a>
          }
        </span>
      </div>
    </div>
  )
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
                    link
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
