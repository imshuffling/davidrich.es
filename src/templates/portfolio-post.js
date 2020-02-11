import React from 'react'
import { graphql } from "gatsby"
//import Img from "gatsby-image"
import Layout from "../components/layout"
import Helmet from 'react-helmet';
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


class PortfolioPost extends React.Component {
  render() {
    console.log(this.props.data.contentfulPortfolio)
    const { title, body, media, image, fullPost, link, completed, client, timeframe, services } = this.props.data.contentfulPortfolio

    const Bold = ({ children }) => <strong>{children}</strong>
    const Text = ({ children }) => <p>{children}</p>

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
              <div dangerouslySetInnerHTML={{__html: `<img src="${fields.file['en-GB'].url}" width="${fields.file['en-GB'].details.image.width}" height="${fields.file['en-GB'].details.image.height}" loading="lazy" alt="${fields.title['en-GB']}"/>`}} />,
              // TODO - use gatsby image
        },
        renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
    }

      return (
        <Layout>
        <Helmet>
          <title>{title} - David Riches</title>
          <body className="portfolio" />
        </Helmet>
          <section className="portfolio-item">
                <div className="portfolio-item__content" style={{ backgroundImage: `linear-gradient(30deg, rgba(71, 26, 99, 0.85), rgba(75, 22, 76, 0.5)), url(${image.file.url})` }}>
                {media !== null &&
                      <video loop muted autoPlay playsInline>
                        <source src={media.file.url} type="video/mp4" />
                      </video>
                  }
                <div className="portfolio-item__copy" data-aos="fade-up" data-aos-once="true">
                  <div className="portfolio-item__who">Mirum</div>
                  <h1>{title}</h1>
                  {documentToReactComponents(body.json, options)}
                </div>
              </div>

              <div className="portfolio-wrapper">
                <div className="portfolio-info">
                  {client !== null &&
                    <div className="portfolio-info__item">
                      <span>Client</span>
                      <span><strong>{client}</strong></span>
                    </div>
                  }

                  {completed !== null &&
                    <div className="portfolio-info__item">
                      <span>Completed</span>
                      <span><strong>{completed}</strong></span>
                    </div>
                  }

                  {timeframe !== null &&
                    <div className="portfolio-info__item">
                      <span>Timeframe</span>
                      <span><strong>{timeframe}</strong></span>
                    </div>
                  }

                  {link !== null &&
                    <div className="portfolio-info__item">
                      <span>Website</span>
                      <span><strong><a target="_blank" rel="noopener noreferrer" href={`https://www.${link}`}>{link}</a></strong></span>
                    </div>
                  }
              </div>
            </div>

            <div className="sections">
              <div className="section__services">
                <div>
                <h4>Services</h4>
                {services !== null &&
                  <>
                    {services.map((item, i) =>
                      <div key={item.id}>{item}</div>
                    )}
                  </>
                  }
                </div>
              </div>
              {fullPost !== null &&
                <div className="section__text"><div>{documentToReactComponents(fullPost.json, options)}</div></div>
              }
              {/* {media == null &&
                <div className="section">
                    <Img fluid={image.fluid} />
                </div>
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
            body {
                json
            }
            fullPost {
                json
            }
            completed
            services
            client
            timeframe
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