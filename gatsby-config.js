module.exports = {
  siteMetadata: {
    title: `davidrich.es`,
  },
  pathPrefix: `/`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: "David Riches - Front end Developer, London",
          short_name: "davidrich.es",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#A864A8",
          display: "standalone",
          icons: [
            {
              // Everything in /static will be copied to an equivalent
              // directory in /public during development and build, so
              // assuming your favicons are in /static/favicons,
              // you can reference them here
              src: `/favicons/android-chrome-192x192.png`,
              sizes: `192x192`,
              type: `image/png`,
            },
            {
              src: `/favicons/android-chrome-512x512.png`,
              sizes: `512x512`,
              type: `image/png`,
            },
          ],
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
