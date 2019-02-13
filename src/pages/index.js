import React from 'react'
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Helmet from 'react-helmet'

export default (props) => (
  <Layout>
      <Helmet>
        <body class='home'/>
      </Helmet>
      <section id='home' className="animated fadeIn">
        <div className="heading-wrap">
          <div>
            <h1 className="page-title">Hello I'm David.</h1>
            <h2 className="strap-line">
              <span style={{'--delay': '0.9s'}}>A</span> <span style={{'--delay': '0.9066666666666667s'}}>F</span><span style={{'--delay': '0.9133333333333333s'}}></span><span style={{'--delay': '0.92s'}}>r</span><span style={{'--delay': '0.9266666666666666s'}}>o</span><span style={{'--delay': '0.9333333333333333s'}}>n</span><span style={{'--delay': '0.9400000000000001s'}}>t</span><span style={{'--delay': '0.9466666666666667s'}}>-</span><span style={{'--delay': '0.9533333333333334s'}}>e</span><span style={{'--delay': '0.96s'}}>n</span><span style={{'--delay': '0.9666666666666667s'}}>d</span> <span style={{'--delay': '0.9733333333333334s'}}>d</span><span style={{'--delay': '0.98s'}}></span><span style={{'--delay': '0.9866666666666667s'}}>e</span><span style={{'--delay': '0.9933333333333334s'}}>v</span><span style={{'--delay': '1s'}}>e</span><span style={{'--delay': '1.0066666666666666s'}}>l</span><span style={{'--delay': '1.0133333333333334s'}}></span><span style={{'--delay': '1.02s'}}>o</span><span style={{'--delay': '1.0266666666666666s'}}>p</span><span style={{'--delay': '1.0333333333333334s'}}></span><span style={{'--delay': '1.04s'}}>e</span><span style={{'--delay': '1.0466666666666666s'}}>r</span> <span style={{'--delay': '1.0533333333333332s'}}>&amp;</span> <span style={{'--delay': '1.06s'}}>p</span><span style={{'--delay': '1.0666666666666667s'}}>a</span><span style={{'--delay': '1.0733333333333333s'}}>r</span><span style={{'--delay': '1.08s'}}></span><span style={{'--delay': '1.0866666666666667s'}}>t</span><span style={{'--delay': '1.0933333333333333s'}}>-</span><span style={{'--delay': '1.1s'}}>t</span><span style={{'--delay': '1.1066666666666667s'}}>i</span><span style={{'--delay': '1.1133333333333333s'}}>m</span><span style={{'--delay': '1.12s'}}>e</span> <span style={{'--delay': '1.1266666666666667s'}}>h</span><span style={{'--delay': '1.1333333333333333s'}}>o</span><span style={{'--delay': '1.1400000000000001s'}}>c</span><span style={{'--delay': '1.1466666666666667s'}}>k</span><span style={{'--delay': '1.1533333333333333s'}}>e</span><span style={{'--delay': '1.1600000000000001s'}}>y</span> <span style={{'--delay': '1.1666666666666667s'}}> </span><span style={{'--delay': '1.1733333333333333s'}}>p</span><span style={{'--delay': '1.1800000000000002s'}}>l</span><span style={{'--delay': '1.1866666666666668s'}}>a</span><span style={{'--delay': '1.1933333333333334s'}}>y</span><span style={{'--delay': '1.2s'}}>e</span><span style={{'--delay': '1.2066666666666666s'}}>r</span> <span style={{'--delay': '1.2133333333333334s'}}> </span><span style={{'--delay': '1.22s'}}>f</span><span style={{'--delay': '1.2266666666666666s'}}>r</span><span style={{'--delay': '1.2333333333333334s'}}>o</span><span style={{'--delay': '1.24s'}}>m</span> <span style={{'--delay': '1.2466666666666666s'}}> </span><span style={{'--delay': '1.2533333333333334s'}}>L</span><span style={{'--delay': '1.26s'}}>o</span><span style={{'--delay': '1.2666666666666666s'}}>n</span><span style={{'--delay': '1.2733333333333334s'}}>d</span><span style={{'--delay': '1.28s'}}>o</span><span style={{'--delay': '1.2866666666666666s'}}>n</span><span style={{'--delay': '1.2933333333333334s'}}>. </span><br/>

              <span style={{'--delay': '1.3s'}}>I</span> <span style={{'--delay': '1.3066666666666666s'}}> </span><span style={{'--delay': '1.3133333333333335s'}}>l</span><span style={{'--delay': '1.32s'}}>i</span><span style={{'--delay': '1.3266666666666667s'}}>k</span><span style={{'--delay': '1.3333333333333335s'}}>e</span> <span style={{'--delay': '1.34s'}}> </span><span style={{'--delay': '1.3466666666666667s'}}>m</span><span style={{'--delay': '1.3533333333333333s'}}>a</span><span style={{'--delay': '1.36s'}}>k</span><span style={{'--delay': '1.3666666666666667s'}}>i</span><span style={{'--delay': '1.3733333333333333s'}}>n</span><span style={{'--delay': '1.38s'}}>g</span><span style={{'--delay': '1.3866666666666667s'}}></span> <span style={{'--delay': '1.3933333333333333s'}}>t</span><span style={{'--delay': '1.4s'}}>h</span><span style={{'--delay': '1.4066666666666667s'}}>i</span><span style={{'--delay': '1.4133333333333333s'}}>n</span><span style={{'--delay': '1.42s'}}>g</span><span style={{'--delay': '1.4266666666666667s'}}>s</span> <span style={{'--delay': '1.4333333333333333s'}}> </span><span style={{'--delay': '1.44s'}}>o</span><span style={{'--delay': '1.4466666666666668s'}}>n</span> <span style={{'--delay': '1.4533333333333334s'}}> </span><span style={{'--delay': '1.46s'}}>t</span><span style={{'--delay': '1.4666666666666668s'}}>h</span><span style={{'--delay': '1.4733333333333334s'}}>e</span> <span style={{'--delay': '1.48s'}}> </span><span style={{'--delay': '1.4866666666666668s'}}>w</span><span style={{'--delay': '1.4933333333333334s'}}>e</span><span style={{'--delay': '1.5s'}}>b</span><span style={{'--delay': '1.5066666666666668s'}}>,</span> <span style={{'--delay': '1.5133333333333332s'}}> </span><AnchorLink offset='30' data-scroll href="#case-studies"><span style={{'--delay': '1.52s'}}>v</span><span style={{'--delay': '1.5266666666666668s'}}>i</span><span style={{'--delay': '1.5333333333333332s'}}>e</span><span style={{'--delay': '1.54s'}}>w</span> <span style={{'--delay': '1.5466666666666666s'}}> </span><span style={{'--delay': '1.5533333333333332s'}}>m</span><span style={{'--delay': '1.56s'}}>y</span> <span style={{'--delay': '1.5666666666666667s'}}> </span><span style={{'--delay': '1.5733333333333333s'}}>p</span><span style={{'--delay': '1.58s'}}>o</span><span style={{'--delay': '1.5866666666666667s'}}>r</span><span style={{'--delay': '1.5933333333333333s'}}>t</span><span style={{'--delay': '1.6s'}}>f</span><span style={{'--delay': '1.6066666666666667s'}}>o</span><span style={{'--delay': '1.6133333333333333s'}}>l</span><span style={{'--delay': '1.62s'}}>i</span><span style={{'--delay': '1.6266666666666667s'}}>o</span></AnchorLink> <span style={{'--delay': '1.6333333333333333s'}}> </span><span style={{'--delay': '1.6400000000000001s'}}>o</span><span style={{'--delay': '1.6466666666666667s'}}>r</span> <span style={{'--delay': '1.6533333333333333s'}}> </span><a target="_blank" rel="noopener noreferrer" href="https://www.github.com/imshuffling"><span style={{'--delay': '1.6600000000000001s'}}>f</span><span style={{'--delay': '1.6666666666666667s'}}>o</span><span style={{'--delay': '1.6733333333333333s'}}>l</span><span style={{'--delay': '1.6800000000000002s'}}>l</span><span style={{'--delay': '1.6866666666666665s'}}>o</span><span style={{'--delay': '1.6933333333333334s'}}>w</span> <span style={{'--delay': '1.7000000000000002s'}}> </span><span style={{'--delay': '1.7066666666666666s'}}>m</span><span style={{'--delay': '1.7133333333333334s'}}>e</span> <span style={{'--delay': '1.72s'}}> </span><span style={{'--delay': '1.7266666666666666s'}}>o</span><span style={{'--delay': '1.7333333333333334s'}}>n</span><span style={{'--delay': '1.74s'}}></span> <span style={{'--delay': '1.7466666666666666s'}}>G</span><span style={{'--delay': '1.7533333333333334s'}}>i</span><span style={{'--delay': '1.76s'}}>t</span><span style={{'--delay': '1.7666666666666666s'}}>h</span><span style={{'--delay': '1.7733333333333334s'}}>u</span><span style={{'--delay': '1.78s'}}>b</span><span style={{'--delay': '1.7866666666666666s'}}>.</span></a><br/>
            </h2>

            <h2>
              <span style={{'--delay': '1.7933333333333334s'}}>T</span><span style={{'--delay': '1.8s'}}>h</span><span style={{'--delay': '1.8066666666666666s'}}>i</span><span style={{'--delay': '1.8133333333333335s'}}>s</span> <span style={{'--delay': '1.82s'}}>s</span><span style={{'--delay': '1.8266666666666667s'}}>i</span><span style={{'--delay': '1.8333333333333335s'}}>t</span><span style={{'--delay': '1.8399999999999999s'}}>e</span> <span style={{'--delay': '1.8466666666666667s'}}>i</span><span style={{'--delay': '1.8533333333333335s'}}>s</span> <span style={{'--delay': '1.8599999999999999s'}}>b</span><span style={{'--delay': '1.8666666666666667s'}}>u</span><span style={{'--delay': '1.8733333333333335s'}}>i</span><span style={{'--delay': '1.88s'}}>l</span><span style={{'--delay': '1.8866666666666667s'}}>t</span> <span style={{'--delay': '1.8933333333333333s'}}>w</span><span style={{'--delay': '1.9s'}}>i</span><span style={{'--delay': '1.9066666666666667s'}}>t</span><span style={{'--delay': '1.9133333333333336s'}}>h</span> <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org/"><span style={{'--delay': '1.92s'}}>G</span><span style={{'--delay': '1.9266666666666667s'}}>a</span><span style={{'--delay': '1.9333333333333336s'}}>t</span><span style={{'--delay': '1.94s'}}>s</span><span style={{'--delay': '1.9466666666666668s'}}>b</span><span style={{'--delay': '1.9533333333333331s'}}>y</span><span style={{'--delay': '1.96s'}}>.</span><span style={{'--delay': '1.9666666666666668s'}}>j</span><span style={{'--delay': '1.9733333333333332s'}}>s</span></a> <span style={{'--delay': '1.98s'}}>a</span><span style={{'--delay': '1.9866666666666668s'}}>n</span><span style={{'--delay': '1.9933333333333332s'}}>d</span> <span style={{'--delay': '2s'}}>p</span><span style={{'--delay': '2.006666666666667s'}}>o</span><span style={{'--delay': '2.013333333333333s'}}>w</span><span style={{'--delay': '2.02s'}}>e</span><span style={{'--delay': '2.026666666666667s'}}>r</span><span style={{'--delay': '2.033333333333333s'}}>e</span><span style={{'--delay': '2.04s'}}>d</span> <span style={{'--delay': '2.046666666666667s'}}>b</span><span style={{'--delay': '2.0533333333333332s'}}>y</span> <a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/"><span style={{'--delay': '2.06s'}}>C</span><span style={{'--delay': '2.066666666666667s'}}>o</span><span style={{'--delay': '2.0733333333333333s'}}>n</span><span style={{'--delay': '2.08s'}}>t</span><span style={{'--delay': '2.086666666666667s'}}>e</span><span style={{'--delay': '2.0933333333333333s'}}>n</span><span style={{'--delay': '2.1s'}}>t</span><span style={{'--delay': '2.106666666666667s'}}>f</span><span style={{'--delay': '2.1133333333333333s'}}>u</span><span style={{'--delay': '2.12s'}}>l</span><span style={{'--delay': '2.1266666666666665s'}}>.</span></a>
            </h2>
          </div>
        </div>
        <section id="case-studies" className="control-width">
          {props.data.allContentfulPortfolio.edges.map((edge) => <PortfolioPost key={edge.node.id} node={edge.node} />)}
        </section>
      </section>
      </Layout>
    )

const PortfolioPost = ({ node }) => {

  //console.log(node)

  return (
      <div className="item" id={node.slug}>

        <Img style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }}
        fixed={node.image.fixed} />

        {node.media !== null &&
          <video loop muted autoPlay playsInline>
          	<source src={node.media.file.url} type="video/mp4" />
          </video>
        }

        <div className="item-inner">
          <span>{node.tag}</span>
          <h3>{node.title}</h3>
          <div className="item-inner__content" dangerouslySetInnerHTML={{__html:node.content.childMarkdownRemark.html}} />
        </div>
      </div>
  )
}

export const pageQuery = graphql`
    query pageQuery {
        allContentfulPortfolio(
            filter: {
                node_locale: {eq: "en-GB"},
                slug: { ne: null }
            },
            sort: {
                fields: [sortOrder], order: ASC
            }
        ) {
            edges {
                node {
                    id
                    title
                    tag
                    slug
                    sortOrder
                    createdAt(formatString: "MMMM DD, YYYY")
                    image {
                      fixed(width: 800) {
                          ...GatsbyContentfulFixed_withWebp
                      }
                    }
                    content {
                      childMarkdownRemark {
                        html
                      }
                    }
                    media {
                      file {
                        url
                      }
                    }
                }
            }
        }
    }
`
