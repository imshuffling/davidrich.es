module.exports = {
  siteMetadata: {
    title: `David Riches - A Front-end developer & part-time hockey player from London.`,
    siteUrl: `https://davidrich.es`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-165591929-1",
        head: true,
      },
    },
    `@rhysforyou/gatsby-plugin-react-helmet-async`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/thanks/`]
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "David Riches",
        short_name: "davidrich.es",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#F40088",
        display: "minimal-ui",
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
        options: {
          spaceId: `anjlutb8dq3v`,
          accessToken: `4bf9314dc5bdfbf380247aa3ab84d7da0e86d33a6089168eb32558d4f7096cda`
        },
    },
    {
      resolve: 'gatsby-plugin-sri',
      options: {
        hash: 'sha512' // 'sha256', 'sha384' or 'sha512' ('sha512' = default)
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
        options: {
          headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
          allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
          mergeSecurityHeaders: true, // boolean to turn off the default security headers
          mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
          mergeCachingHeaders: true, // boolean to turn off the default caching headers
          transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
          generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
  ],
}
