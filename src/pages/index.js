import React from 'react'
//import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default (props) => (
  <Layout>
      <section id='home' className="animated fadeIn">
        <div className="heading-wrap">
          <div>
            <h1 className="page-title">Hello I'm David.</h1>
            <h2 className="strap-line">
              A Front-end developer &amp; part-time hockey player from London.<br/>
              I like making things on the web, <AnchorLink offset='30' data-scroll href="#case-studies">view my portfolio</AnchorLink> or <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/imshuffling">follow me on Github.</a></h2>
            <h2 className="sub-strap-line">This site is built with <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org/">Gatsby.js</a> and powered by <a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/">Contentful.</a></h2>
          </div>
        </div>
        <section className="cards">
          {props.data.allContentfulPortfolio.edges.map((edge) => <PortfolioPost key={edge.node.id} node={edge.node} />)}
        </section>
      </section>
      </Layout>
    )

const PortfolioPost = ({ node }) => {
  //console.log(node)
  if (node.link !== null) {
    return (
      // <a href={node.link} className="item" id={node.slug} rel="noopener noreferrer" target="_BLANK">
      //     <Img style={{
      //       position: 'absolute',
      //       left: 0,
      //       top: 0,
      //       width: '100%',
      //       height: '100%'
      //     }}
      //     fixed={node.image.fixed} />
      //     {node.media !== null &&
      //       <video loop muted autoPlay playsInline>
      //         <source src={node.media.file.url} type="video/mp4" />
      //       </video>
      //     }
      //     <div className="item-inner">
      //       <span>{node.tag}</span>
      //       <h3>{node.title}</h3>
      //       <div className="item-inner__content" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
      //     </div>
      // </a>

      <a href={node.link} className="card">
        <div className="card__head">
          <div className="card__image" style={{
            backgroundImage: `url(${node.image.file.url})`,
          }} >
          {node.media !== null &&
          <video loop muted autoPlay playsInline>
            <source src={node.media.file.url} type="video/mp4" />
          </video>
          }
          </div>
          <div className="card__author">
            <div className="author">
            <div className="author__image"><img src={node.image.file.url} alt={node.title} /></div>
              <div className="author__content">
                <p className="author__header">{node.title}</p>
                <p className="author__subheader">{node.tag}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card__body">
          <h3 className="card__headline">{node.title}</h3>
          <div className="card__text" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
        </div>
      </a>
    )
  } else {
      return (
      <div className="card">
        <div className="card__head">
          <div className="card__image" style={{
            backgroundImage: `url(${node.image.file.url})`,
          }} >
          {node.media !== null &&
          <video loop muted autoPlay playsInline>
            <source src={node.media.file.url} type="video/mp4" />
          </video>
          }
          </div>
          <div className="card__author">
            <div className="author">
            <div className="author__image"><img src={node.image.file.url} alt={node.title} /></div>
              <div className="author__content">
                <p className="author__header">{node.title}</p>
                <p className="author__subheader">{node.tag}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card__body">
          <h3 className="card__headline">{node.title}</h3>
          <div className="card__text" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
        </div>
      </div>
    )
  }
}

export const pageQuery = graphql`
    query pageQuery {
        allContentfulPortfolio(
            filter: {
                node_locale: {eq: "en-GB"}
            },
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
                    content {
                      childMarkdownRemark {
                        html
                      }
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
