import React from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
// import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

class PortfolioPost extends React.Component {
  render() {
    // console.log(children)
    const { title, tag, body, media, image } = this.props.data.contentfulPortfolio

      return (
        <Layout>
          <section className="portfolio-item">
              <div>
                <h1>{title}</h1>
                <span>{tag}</span>
                {documentToReactComponents(body.json)}
              </div>
              {media !== null &&
                <video controls playsInline poster={image.file.url}>
                  <source src={media.file.url} type="video/mp4" />
                </video>
              }
              {media == null &&
                <Img fluid={image.fluid} />
              }
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
            body {
                json
            }
            image {
                file {
                  url
                }
                fluid(maxWidth: 850) {
                    ...GatsbyContentfulFluid_withWebp
                }
              }
            media {
                file {
                    url
                }
            }
        }
    }
`