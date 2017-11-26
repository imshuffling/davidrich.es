module.exports = {
  siteMetadata: {
    title: `davidrich.es`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: `anjlutb8dq3v`,
      accessToken: `4bf9314dc5bdfbf380247aa3ab84d7da0e86d33a6089168eb32558d4f7096cda`
    },
  }, ],
}
