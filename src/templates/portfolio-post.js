import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

class PortfolioPost extends Component {
  render() {
      console.log(this.props)
      const { title, image, tag, content, largeMedia } = this.props.data.contentfulPortfolio
      return (
          <section id="portfolio-item">
              <h1 className="Page-title">{title}</h1>
              <p>{tag}</p>
              <Img resolutions={image.resolutions}/>
              <div dangerouslySetInnerHTML={{__html:content.childMarkdownRemark.html}} />
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
            image {
                resolutions(width: 960) {
                    ...GatsbyContentfulResolutions
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
