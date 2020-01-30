import React from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


class PortfolioPost extends React.Component {
  render() {
    console.log(this.props.data.contentfulPortfolio)
    const { title, tag, body, media, image, fullPost } = this.props.data.contentfulPortfolio

    const Bold = ({ children }) => <strong>{children}</strong>
    const Text = ({ children }) => <p>{children}</p>

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
              <div dangerouslySetInnerHTML={{__html: `<img src="${fields.file['en-GB'].url}" alt="${fields.title['en-GB']}"/>`}} />,
        },
        renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
    }

      return (
        <Layout>
          <section className="portfolio-item">
              <div>
                <h1>{title}</h1>
                <span>{tag}</span>
                {documentToReactComponents(body.json, options)}
              </div>
            <div className="sections">
              {fullPost !== null &&
                <div className="section">{documentToReactComponents(fullPost.json, options)}</div>
              }
              {media !== null &&
                <div className="video-container section">
                    <video controls playsInline poster={image.file.url}>
                    <source src={media.file.url} type="video/mp4" />
                    </video>
                </div>
              }
              {media == null &&
                <div className="section">
                    <Img fluid={image.fluid} />
                </div>
              }
              {/* {link !== null &&
                <p><Link to={link}>View site</Link></p>
              } */}

              </div>

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
            fullPost {
                json
            }
            link
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