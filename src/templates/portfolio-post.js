import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"

class PortfolioPost extends React.Component {
  render() {
      //console.log(this.props)
      const { title, tag, content } = this.props.data.contentfulPortfolio
      return (
        <Layout>
          <section id="portfolio-item">
              <h1 className="Page-title">{title}</h1>
              <p>{tag}</p>
              <div dangerouslySetInnerHTML={{__html:content.childMarkdownRemark.html}} />
          </section>
          </Layout>
      )
  }
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
