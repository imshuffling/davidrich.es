const path = require('path')

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   if (stage === 'build-javascript') {
//     // turn off source-maps
//     config.merge({ devtool: false });
//   }
// };

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   switch (stage) {
//     case `build-javascript`:
//        actions.setWebpackConfig({
//          plugins: [webpackFooPlugin],
//        })
//    }
// }

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions
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
