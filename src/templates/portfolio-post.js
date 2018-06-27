import React from 'react'
import PropTypes from 'prop-types'

class PortfolioPost extends React.Component {
  render() {
      //console.log(this.props)
      const { title, tag, content } = this.props.data.contentfulPortfolio
      return (
          <section id="portfolio-item">
              <h1 className="Page-title">{title}</h1>
              <p>{tag}</p>
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
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`
