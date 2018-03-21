import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"
import AnchorLink from 'react-anchor-link-smooth-scroll'

const IndexPage = (props) => {
    //console.log(props)
    return (
      <section id='home' className="animated fadeIn">
        <div className="heading-wrap">
          <h1 className="page-title">Hello I'm David.</h1>
          <h2 className="strap-line">A Front-end developer&nbsp;&amp; part-time hockey player from London.<br />
            <span>I like making things on the web,&nbsp;
            <AnchorLink offset='30' href='#case-studies'>view my portfolio</AnchorLink>
            &nbsp;or&nbsp;
            <a target="_blank" rel="noopener" href="https://www.github.com/imshuffling">follow me on Github.</a></span>
          </h2>
          <h2>This site is built with <a target="_blank" rel="noopener" href="https://www.gatsbyjs.org/">Gatsby.js</a> and powered by <a target="_blank" rel="noopener" href="https://www.contentful.com/">Contentful.</a></h2>
        </div>
          <section id="case-studies" className="control-width">
            {props.data.allContentfulPortfolio.edges.map((edge) => <PortfolioPost key={edge.node.id} node={edge.node} />)}
          </section>
      </section>
    )
}

const PortfolioPost = ({node}) => {
  return (
      <div className="item" id={node.slug}>

      <Img style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      sizes={node.image.sizes} />

        <div className="item-inner">
          <span>{node.tag}</span>
          <h3>{node.title}</h3>
          <div className="item-inner__content" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
        </div>
      </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
    query pageQuery {
        allContentfulPortfolio(
            filter: {
                node_locale: {eq: "en-GB"}
            },
            sort: {
                fields: [createdAt], order: ASC
            }
        ) {
            edges {
                node {
                    id
                    title
                    tag
                    slug
                    createdAt(formatString: "MMMM DD, YYYY")
                    image {
                      sizes(maxWidth: 850) {
                          ...GatsbyContentfulSizes
                      }
                    }
                    content {
                      childMarkdownRemark {
                        html
                      }
                    }
                }
            }
        }
    }
`
