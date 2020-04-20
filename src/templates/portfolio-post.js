import React from 'react'
import { Link, graphql } from "gatsby"
//import Img from "gatsby-image"
import Layout from "../components/layout"
import Helmet from 'react-helmet';
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ContentModules from '../content-modules';

class PortfolioPost extends React.Component {
  render() {
    console.log(this.props.data.contentfulPortfolio)
    const { title, body, link, completed, client, timeframe, blocks, footer } = this.props.data.contentfulPortfolio

    const Bold = ({ children }) => <strong>{children}</strong>
    const Text = ({ children }) => <h2>{children}</h2>

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
              <div dangerouslySetInnerHTML={{__html: `<img data-aos="fade-in" data-aos-once="true" src="${fields.file['en-GB'].url}" width="${fields.file['en-GB'].details.image.width}" height="${fields.file['en-GB'].details.image.height}" loading="lazy" alt="${fields.title['en-GB']}"/>`}} />,
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
              <div className="portfolio-item__content">
                <div className="portfolio-item__copy" data-aos="fade-up" data-aos-once="true">
                  <div className="portfolio-item__who">Mirum</div>
                  <h1>{title}</h1>
                  {documentToReactComponents(body.json, options)}
                </div>
              </div>

              <div className="portfolio-wrapper" data-aos="fade-in" data-aos-once="true" data-aos-delay="500">

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

                  {/* {services !== null &&
                    <div className="portfolio-info__item">
                      <span>Stack</span>
                      <ul>
                        {services.map((item, i) =>
                          <li><span key={item.id}><strong>{item}</strong></span></li>
                        )}
                      </ul>
                    </div>
                  } */}
              </div>
            </div>
            {blocks && <ContentModules blocks={blocks} />}
            {link !== null &&
              <p><span role="img" alt="Finger emoji" aria-label="Finger">👉 </span><a target="_blank" rel="noopener noreferrer" href={`https://www.${link}`}>Visit website</a></p>
            }
          </section>

          <section className="other-projects">
            <h3>Other projects</h3>
            <div id="cards">
              {footer.map((item, i) =>
                <Link to={`/portfolio/${item.slug}`} className="card" key={item.id}>
                    <div className="card__image" style={{
                      backgroundImage: `url(${item.image.file.url})`,
                    }}>
                    {item.media !== null &&
                      <video loop muted autoPlay playsInline>
                        <source src={item.media.file.url} type="video/mp4" />
                      </video>
                    }
                    </div>
                    <div className="card__details">
                        <div className="card__content">
                          <h3>{item.title}</h3>
                          <span>View project</span>
                        </div>
                    </div>
                </Link>
              )}
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
            footer {
              id
              title
              slug
              image {
                file {
                  url
                }
              }
              body {
                json
              }
              media {
                file {
                  url
                }
              }
            }
            blocks {
              __typename
              ... on Node {
                ... on ContentfulImage {
                  image {
                    fluid(maxWidth: 1200) {
                      ...GatsbyContentfulFluid
                    }
                    file {
                      url
                    }
                  }
                }
                ... on ContentfulTextLeft {
                  id
                  title
                  body {
                    id
                    childMarkdownRemark {
                      id
                      html
                    }
                  }
                }
                ... on ContentfulTextArea {
                  id
                  title
                  centerText
                  body {
                    id
                    childMarkdownRemark {
                      id
                      html
                    }
                  }
                }
                ... on ContentfulTwoColumn {
                  image {
                    file {
                      url
                    }
                  }
                  imageFirst
                  body {
                    id
                    childMarkdownRemark {
                      id
                      html
                    }
                  }
                }
              }
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