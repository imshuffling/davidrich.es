const path = require('path')

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    // turn off source-maps
    config.merge({ devtool: false });
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators
    return new Promise((resolve, reject) => {
        const PortfolioPostTemplate = path.resolve('src/templates/portfolio-post.js')
        resolve(
            graphql(`
                {
                    allContentfulPortfolio (limit:100) {
                        edges {
                            node {
                                id
                                slug
                            }
                        }
                    }
                }
            `).then((result) => {
                if (result.errors) {
                    reject(result.errors)
                }
                result.data.allContentfulPortfolio.edges.forEach((edge) => {
                    createPage ({
                        path: edge.node.slug,
                        component: PortfolioPostTemplate,
                        context: {
                            slug: edge.node.slug
                        }
                    })
                })
                return
            })
        )
    })
}
