import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

class PortfolioPost extends Component {
  render() {
      console.log(this.props)
      const { title, image, tag, content, largeMedia } = this.props.data.contentfulPortfolio
      return (
          <section id="portfolio-item" className="animated fadeIn">
              <p className="tag">{tag}</p>
              <h1 className="Page-title">{title}</h1>
              <Img sizes={image.sizes}/>
              <div dangerouslySetInnerHTML={{__html:content.childMarkdownRemark.html}} />
              <a className="back-to-home" href="/">Back to home</a>
          </section>
      )
  }
}

PortfolioPost.PropTypes = {
    data: PropTypes.object.isRequired
}

export default PortfolioPost

export const pageQuery = graphql`
    query PortfolioPostQuery($slug: String!){
        contentfulPortfolio(slug: {eq: $slug}) {
            title
            tag
            createdAt(formatString: "MMMM DD, YYYY")
            largeMedia {
              id
              file {
                url
              }
            }
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
`
