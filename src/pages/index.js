import React from 'react'
import Link from 'gatsby-link'
import Scrollchor from 'react-scrollchor';
import Img from "gatsby-image"

const IndexPage = (props) => {
    //console.log(props)
    return (
      <section id='home' className="animated fadeIn">
        <div className="control-width">
          <h1 className="page-title">Hello I'm David.</h1>
          <h2 className="strap-line">A Front-end developer&nbsp;&amp; part-time hockey player from London.<br />
            <span>I like making things on the web,&nbsp;
            <Scrollchor to="#case-studies" animate={{offset: -30, duration: 500}}>view my portfolio</Scrollchor>
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

/*const PortfolioPost = ({node}) => {
  return (
      <div className="item" id={node.slug} style={{
          backgroundImage: `url(${node.image.file.url})`
      }}>
        <div className="item-inner">
          <span>{node.tag}</span>
          <h3><Link to={node.slug}>{node.title}</Link></h3>
          <div className="item-inner__content" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
        </div>
      </div>
  )

  <div className="item" id={node.slug} style={{
      backgroundImage: `url(${node.image.file.url})`
  }}>
  <div className="item-inner__content" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
}*/

const PortfolioPost = ({node}) => {
  return (
      <div className="item" id={node.slug}>
      <Img sizes={node.image.sizes}/>
        <div className="item-inner">
          <span>{node.description}</span>
          <p><Link to={node.slug}>{node.title}</Link></p>
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
                        sizes(maxWidth: 999) {
                            ...GatsbyContentfulSizes
                        }
                        file {
                          url
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
